/**
 * cc-kernel-v1 — a spec-faithful TypeScript implementation of the CC composition
 * kernel: bound the probability of a composed binary event from the marginal
 * probabilities of its parts, under unknown dependence.
 *
 * This file is deliberately NOT a second mathematical authority. The reference
 * authority is the `cc-framework` Python kernel; this port exists only so the
 * visualizer can render kernel-consistent numbers and *fail loudly* if it ever
 * drifts from them. It was written from the normative specification vendored at
 * `./conformance/cc-kernel-v1/SPEC.md`, and from the case corpus beside it —
 * never from the reference Python source, exactly as the SPEC requires:
 *
 *   "An implementer works from this document and `cases/`, never from the Python
 *    source. [...] agreement between it and the reference would establish nothing."
 *
 * It is held to the spec by `ccKernel.conformance.test.ts`, which runs the full
 * vendored corpus (24 accept + 8 reject = 32 cases) within the declared 1e-12
 * tolerance. If this implementation and the corpus ever disagree, that test is
 * the alarm — not something to silence by weakening a case.
 *
 * CC convention: a marginal is the probability that an event *occurs*, and for a
 * guardrail an occurrence is a FAILURE / unsafe pass, not a success.
 */

export const CC_KERNEL_CORPUS = "cc-kernel-v1" as const;

/** Numeric tolerance, declared by the corpus manifest (SPEC §7). */
export const CC_TOLERANCE = 1e-12;

export type CcEventKind = "all" | "any";

export type CcDependence =
  | "unconstrained"
  | "independent"
  | "comonotone"
  | "countermonotone";

export type CcInput = {
  /** Event name -> marginal probability of occurrence. */
  marginals: Record<string, number>;
  /** "all"/"any" or a documented alias (SPEC §1.3). */
  event: string;
  /** SPEC §1.4. Absent is treated as the honest default "unconstrained"; an
   *  unrecognized *value* is refused rather than defaulted. */
  dependence?: string;
};

export type CcResult = {
  corpus: typeof CC_KERNEL_CORPUS;
  event: CcEventKind;
  dependence: CcDependence;
  n: number;
  /** Sharp (or stipulated) interval for the composed event probability. */
  lower: number;
  upper: number;
  width: number;
  /** Comparison baseline only — never an answer (SPEC §3). */
  independence_point: number;
  independence_regret: number;
  /** upper / independence_point, or null when the baseline is 0 (SPEC §3). */
  understatement_factor: number | null;
  /** The event the upper bound turns on, or null (SPEC §4). */
  binding_event: string | null;
};

export type CcRefusalReason =
  | "marginal_out_of_range"
  | "marginal_not_finite"
  | "no_events"
  | "unknown_event_kind"
  | "unknown_dependence"
  | "countermonotone_undefined";

/** A fail-closed refusal (SPEC §5). The kernel refuses; it never defaults. */
export class CcRefusal extends Error {
  readonly reason: CcRefusalReason;

  constructor(reason: CcRefusalReason, message?: string) {
    super(message ?? reason);
    this.name = "CcRefusal";
    this.reason = reason;
    // Keep instanceof working when compiled down to ES5-era targets.
    Object.setPrototypeOf(this, CcRefusal.prototype);
  }
}

const EVENT_ALIASES: Record<string, CcEventKind> = {
  all: "all",
  and: "all",
  AND: "all",
  intersection: "all",
  any: "any",
  or: "any",
  OR: "any",
  union: "any",
};

const DEPENDENCE_VALUES: ReadonlySet<CcDependence> = new Set([
  "unconstrained",
  "independent",
  "comonotone",
  "countermonotone",
]);

function clip01(value: number): number {
  return Math.min(1, Math.max(0, value));
}

/** Product over an array with an explicit left fold, so floating-point
 *  association matches a plain `reduce` — the baseline is a comparison, and we
 *  keep it bit-stable rather than clever. */
function product(values: number[]): number {
  return values.reduce((acc, x) => acc * x, 1);
}

/**
 * Compose marginals into a bound (or a stipulated point) for the named event.
 * Throws {@link CcRefusal} for any input the SPEC says must be refused.
 */
export function composeCC(input: CcInput): CcResult {
  // §1.3 — event kind (checked first: it is the shape of the question).
  const event = EVENT_ALIASES[input.event];
  if (!event) {
    throw new CcRefusal("unknown_event_kind", `unknown event kind: ${String(input.event)}`);
  }

  // §1.4 — dependence. Missing -> honest default; present-but-unknown -> refuse.
  const dependenceRaw = input.dependence ?? "unconstrained";
  if (!DEPENDENCE_VALUES.has(dependenceRaw as CcDependence)) {
    throw new CcRefusal("unknown_dependence", `unknown dependence: ${String(dependenceRaw)}`);
  }
  const dependence = dependenceRaw as CcDependence;

  // §1.2 — at least one event.
  const names = Object.keys(input.marginals);
  if (names.length === 0) {
    throw new CcRefusal("no_events", "marginals mapping is empty");
  }

  // §1.2 / §5 — every marginal finite and in range. A non-number (e.g. the
  // JSON string "NaN" that a corpus runner has not mapped) is treated as not
  // finite: the kernel never accepts a string as a probability.
  const p: number[] = [];
  for (const name of names) {
    const value = input.marginals[name];
    if (typeof value !== "number" || !Number.isFinite(value)) {
      throw new CcRefusal("marginal_not_finite", `marginal "${name}" is not a finite number`);
    }
    if (value < 0 || value > 1) {
      throw new CcRefusal("marginal_out_of_range", `marginal "${name}"=${value} outside [0, 1]`);
    }
    p.push(value);
  }

  const n = p.length;

  // §6 — countermonotonicity is strictly bivariate.
  if (dependence === "countermonotone" && n !== 2) {
    throw new CcRefusal(
      "countermonotone_undefined",
      "countermonotone is defined only for exactly two events",
    );
  }

  const sum = p.reduce((a, b) => a + b, 0);
  const minP = Math.min(...p);
  const maxP = Math.max(...p);

  // §3 — independence baseline, reported on every result whatever the regime.
  const independence_point =
    event === "all" ? product(p) : 1 - product(p.map((x) => 1 - x));

  // The interval, by dependence regime.
  let lower: number;
  let upper: number;
  switch (dependence) {
    case "unconstrained":
      // §2 — sharp Fréchet–Hoeffding bounds.
      if (event === "all") {
        lower = Math.max(0, sum - (n - 1));
        upper = minP;
      } else {
        lower = maxP;
        upper = Math.min(1, sum);
      }
      break;
    case "independent":
      // §1.4 / §3 — a degenerate interval at the product baseline.
      lower = independence_point;
      upper = independence_point;
      break;
    case "comonotone":
      // §1.4 / §6 — the upper Fréchet corner, as a degenerate interval.
      lower = event === "all" ? minP : maxP;
      upper = lower;
      break;
    case "countermonotone":
      // §6 — bivariate only (n === 2 guaranteed above).
      lower = event === "all" ? Math.max(0, sum - 1) : Math.min(1, sum);
      upper = lower;
      break;
  }

  // §2 — clip to absorb floating-point excursions at the boundary.
  lower = clip01(lower);
  upper = clip01(upper);

  const width = Math.max(0, upper - lower);
  const independence_regret = upper - independence_point;
  const understatement_factor =
    independence_point === 0 ? null : upper / independence_point;

  // §4 — binding_event: only under an unconstrained bound.
  let binding_event: string | null = null;
  if (dependence === "unconstrained") {
    if (event === "all") {
      // §4.1 / §4.3 — the argmin binds, unless two or more tie at the minimum.
      const atMin = names.filter((_, i) => Math.abs(p[i] - minP) <= CC_TOLERANCE);
      binding_event = atMin.length === 1 ? atMin[0] : null;
    } else {
      // §4.2 — a union's upper bound is a sum; only a lone event binds.
      binding_event = n === 1 ? names[0] : null;
    }
  }

  return {
    corpus: CC_KERNEL_CORPUS,
    event,
    dependence,
    n,
    lower,
    upper,
    width,
    independence_point,
    independence_regret,
    understatement_factor,
    binding_event,
  };
}
