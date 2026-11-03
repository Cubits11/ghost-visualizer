import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

import {
  CC_TOLERANCE,
  CcRefusal,
  composeCC,
  type CcRefusalReason,
} from "./ccKernel";
import {
  computeClasswiseOrResult,
  computeFrechetHoeffdingOrBounds,
} from "./guardrailComposition";
import { sharedFailureRows, separatedFailureRows } from "../evidence/sampleEvaluations";

/**
 * Step 0 — the CC ↔ visualizer conformance membrane.
 *
 * This runs the vendored `cc-kernel-v1` corpus against the visualizer's own
 * TypeScript kernel. Passing means the two compute the same intervals on these
 * cases; per the SPEC it means nothing more than that. The point is negative:
 * if the visualizer ever drifts from the reference kernel's arithmetic, a case
 * here fails instead of a seductive wrong number reaching a viewer.
 */

const CORPUS_DIR = new URL("./conformance/cc-kernel-v1/", import.meta.url);

function corpusUrl(name: string): URL {
  return new URL(name, CORPUS_DIR);
}

function rawSha256(name: string): string {
  return createHash("sha256").update(readFileSync(corpusUrl(name))).digest("hex");
}

function loadJson<T>(name: string): T {
  return JSON.parse(readFileSync(corpusUrl(name), "utf8")) as T;
}

/**
 * Raw-byte digests of the exact vendored corpus this suite was written against,
 * copied from cc-framework@bf5740c (conformance/cc-kernel-v1, clean tree) on
 * 2026-10-28. See PROVENANCE.md in the corpus directory — including the note
 * that cc-framework's own manifest.json digests (SHA-256 of canonical-minified
 * JSON) match adversarial.json but NOT composition.json upstream.
 */
const PINNED_RAW_SHA256: Record<string, string> = {
  "composition.json":
    "469484269d10d9b3dd90254c995bf5be486cd773f1175be74c6b3150ef8bdacf",
  "adversarial.json":
    "5d9ee31fc9a47e6b93da3fc1ced76c4a84a89e89593417f712ac46771842989a",
};

type AcceptCase = {
  id: string;
  description: string;
  input: { marginals: Record<string, number | string>; event: string; dependence: string };
  expect: {
    binding_event: string | null;
    independence_point: number;
    lower: number;
    understatement_factor: number | null;
    upper: number;
    width: number;
  };
};

type RejectCase = {
  id: string;
  description: string;
  input: { marginals: Record<string, number | string>; event: string; dependence: string };
  expect_refusal: CcRefusalReason;
};

type AcceptCorpus = { case_count: number; cases: AcceptCase[]; tolerance: number };
type RejectCorpus = { case_count: number; cases: RejectCase[] };
type Manifest = { corpus: string; total_cases: number; tolerance: number };

const composition = loadJson<AcceptCorpus>("composition.json");
const adversarial = loadJson<RejectCorpus>("adversarial.json");
const manifest = loadJson<Manifest>("manifest.json");

/** SPEC §5: a corpus runner maps the JSON string "NaN" to real NaN before
 *  calling the kernel. The kernel itself never accepts a string. */
function materializeMarginals(
  marginals: Record<string, number | string>,
): Record<string, number> {
  const out: Record<string, number> = {};
  for (const [name, value] of Object.entries(marginals)) {
    out[name] = value === "NaN" ? Number.NaN : (value as number);
  }
  return out;
}

function expectClose(actual: number, expected: number): void {
  expect(Math.abs(actual - expected)).toBeLessThanOrEqual(CC_TOLERANCE);
}

describe("cc-kernel-v1 corpus is vendored at its pinned bytes", () => {
  it.each(Object.keys(PINNED_RAW_SHA256))("%s is unmodified", (name) => {
    expect(rawSha256(name)).toBe(PINNED_RAW_SHA256[name]);
  });

  it("covers the whole census: 24 accept + 8 reject = 32", () => {
    expect(composition.cases).toHaveLength(composition.case_count);
    expect(adversarial.cases).toHaveLength(adversarial.case_count);
    expect(composition.case_count + adversarial.case_count).toBe(manifest.total_cases);
    expect(manifest.total_cases).toBe(32);
  });

  it("uses the SPEC-declared 1e-12 tolerance", () => {
    expect(composition.tolerance).toBe(CC_TOLERANCE);
    expect(manifest.tolerance).toBe(CC_TOLERANCE);
  });
});

describe("cc-kernel-v1 accept cases reproduce every expected field", () => {
  it.each(composition.cases.map((c) => [c.id, c] as const))("%s", (_id, testCase) => {
    const result = composeCC({
      marginals: materializeMarginals(testCase.input.marginals),
      event: testCase.input.event,
      dependence: testCase.input.dependence,
    });

    expectClose(result.lower, testCase.expect.lower);
    expectClose(result.upper, testCase.expect.upper);
    expectClose(result.width, testCase.expect.width);
    expectClose(result.independence_point, testCase.expect.independence_point);

    if (testCase.expect.understatement_factor === null) {
      expect(result.understatement_factor).toBeNull();
    } else {
      expect(result.understatement_factor).not.toBeNull();
      expectClose(result.understatement_factor as number, testCase.expect.understatement_factor);
    }

    // binding_event is compared exactly (SPEC §8).
    expect(result.binding_event).toBe(testCase.expect.binding_event);
  });
});

describe("cc-kernel-v1 reject cases refuse with the named reason", () => {
  it.each(adversarial.cases.map((c) => [c.id, c] as const))("%s", (_id, testCase) => {
    let thrown: unknown;
    try {
      composeCC({
        marginals: materializeMarginals(testCase.input.marginals),
        event: testCase.input.event,
        dependence: testCase.input.dependence,
      });
    } catch (error) {
      thrown = error;
    }

    expect(thrown).toBeInstanceOf(CcRefusal);
    expect((thrown as CcRefusal).reason).toBe(testCase.expect_refusal);
  });
});

describe("membrane: the visualizer OR pipeline agrees with the kernel", () => {
  // The essay's two-guardrail OR pipeline (1 = block) and the CC kernel
  // (1 = failure) frame the indicator differently, but the composed-event
  // interval is the same union bound. These assertions are the contract: the
  // visualizer presents kernel arithmetic, it does not re-derive it.
  it.each([
    ["shared-failure 90/90 rows", sharedFailureRows],
    ["separated-failure 90/90 rows", separatedFailureRows],
  ] as const)("%s: Fréchet OR bounds match composeCC union", (_label, rows) => {
    const pipeline = computeClasswiseOrResult(rows, "harmful");
    const kernel = composeCC({
      marginals: { A: pipeline.marginalA, B: pipeline.marginalB },
      event: "any",
      dependence: "unconstrained",
    });

    expectClose(pipeline.fhLowerOr, kernel.lower);
    expectClose(pipeline.fhUpperOr, kernel.upper);
    expectClose(pipeline.fhWidthOr, kernel.width);
  });

  it("the standalone OR-bounds helper matches the kernel across a grid", () => {
    const grid = [0, 0.1, 0.25, 0.5, 0.7, 0.9, 1];
    for (const a of grid) {
      for (const b of grid) {
        const helper = computeFrechetHoeffdingOrBounds(a, b);
        const kernel = composeCC({ marginals: { A: a, B: b }, event: "any" });
        expectClose(helper.lower, kernel.lower);
        expectClose(helper.upper, kernel.upper);
      }
    }
  });
});
