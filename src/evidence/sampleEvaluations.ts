import type { Binary, EvaluationRow } from "../math/guardrailComposition";

export const SAMPLE_HARMFUL_COUNT = 100;
export const SAMPLE_GUARDRAIL_FAILURES = 10;
export const SAMPLE_SHARED_FAILURE_OVERLAP = 10;

const PROMPT_FAMILIES = [
  "jailbreak",
  "malware",
  "fraud",
  "privacy",
  "self-harm",
  "weapons",
  "biosecurity",
  "harassment",
] as const;

type SampleParams = {
  failureOverlap: number;
  idPrefix?: string;
};

function clampFailureOverlap(value: number) {
  return Math.min(SAMPLE_GUARDRAIL_FAILURES, Math.max(0, Math.round(value)));
}

function idFor(index: number, prefix: string) {
  return `${prefix}-${String(index + 1).padStart(3, "0")}`;
}

function missNote(guardrailA: Binary, guardrailB: Binary) {
  if (guardrailA === 0 && guardrailB === 0) {
    return "shared miss: neither guardrail blocked this harmful example";
  }

  if (guardrailA === 0) {
    return "A missed; B blocked";
  }

  if (guardrailB === 0) {
    return "B missed; A blocked";
  }

  return "both guardrails blocked";
}

export function buildSampleEvaluations({
  failureOverlap,
  idPrefix = "harmful-sample",
}: SampleParams): EvaluationRow[] {
  const overlap = clampFailureOverlap(failureOverlap);
  const uniqueMissCount = SAMPLE_GUARDRAIL_FAILURES - overlap;
  const sharedMisses = new Set<number>(Array.from({ length: overlap }, (_, index) => index));
  const aOnlyMisses = new Set<number>(
    Array.from({ length: uniqueMissCount }, (_, index) => SAMPLE_GUARDRAIL_FAILURES + index),
  );
  const bOnlyMisses = new Set<number>(
    Array.from(
      { length: uniqueMissCount },
      (_, index) => SAMPLE_GUARDRAIL_FAILURES * 2 + index,
    ),
  );

  return Array.from({ length: SAMPLE_HARMFUL_COUNT }, (_, index) => {
    const aMisses = sharedMisses.has(index) || aOnlyMisses.has(index);
    const bMisses = sharedMisses.has(index) || bOnlyMisses.has(index);
    const guardrailA: Binary = aMisses ? 0 : 1;
    const guardrailB: Binary = bMisses ? 0 : 1;

    return {
      id: idFor(index, idPrefix),
      label: "harmful",
      promptFamily: PROMPT_FAMILIES[index % PROMPT_FAMILIES.length],
      guardrailA,
      guardrailB,
      notes: missNote(guardrailA, guardrailB),
    };
  });
}

// In this dataset, 1 means blocked/flagged and 0 means allowed/missed.
// For harmful examples, safety is P(Z=1 | Y=harmful), where Z = A OR B.
// The default v0 sample uses the lower-safety endpoint: both guardrails miss the
// same 10 harmful examples, so each marginal is 90% while OR safety is 90%.
export const sampleEvaluationRows = buildSampleEvaluations({
  failureOverlap: SAMPLE_SHARED_FAILURE_OVERLAP,
  idPrefix: "harmful-shared",
});

export const sharedFailureRows = sampleEvaluationRows;

export const separatedFailureRows = buildSampleEvaluations({
  failureOverlap: 0,
  idPrefix: "harmful-separated",
});
