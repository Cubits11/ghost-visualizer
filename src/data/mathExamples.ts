export interface AtomCounts {
  neither: number;
  aOnly: number;
  bOnly: number;
  both: number;
  total: number;
}

export const toyExample = {
  total: 100,
  harmfulPrompts: 100,
  guardrailACatches: 90,
  guardrailBCatches: 90,
  guardrailAFailures: 10,
  guardrailBFailures: 10,
  independenceOverlap: 1,
  minOverlap: 0,
  maxOverlap: 10,
};

export const boundedClaim = {
  riskLower: 0,
  riskUpper: 10,
  safetyLower: 90,
  safetyUpper: 100,
  policyHash: "policy-demo-a13f9c8b",
  datasetHash: "toy-harmful-prompts-100-4d2e91",
  witnessLowerHash: "witness-safety-lower-bc90",
  witnessUpperHash: "witness-safety-upper-fa100",
};

export function clampOverlap(overlapFailures: number) {
  return Math.min(
    toyExample.maxOverlap,
    Math.max(toyExample.minOverlap, Math.round(overlapFailures)),
  );
}

export function atomsForOverlap(overlapFailures: number): AtomCounts {
  const both = clampOverlap(overlapFailures);
  const aOnly = toyExample.guardrailAFailures - both;
  const bOnly = toyExample.guardrailBFailures - both;
  const neither = toyExample.total - both - aOnly - bOnly;

  return {
    neither,
    aOnly,
    bOnly,
    both,
    total: toyExample.total,
  };
}

export function composedRisk(overlapFailures: number) {
  return clampOverlap(overlapFailures);
}

export function composedSafety(overlapFailures: number) {
  return toyExample.total - composedRisk(overlapFailures);
}

export function formatPercent(value: number, digits = 0) {
  return `${value.toFixed(digits)}%`;
}

export function atomPercent(count: number, total = toyExample.total) {
  return formatPercent((count / total) * 100);
}

export const lowerSafetyWitness = atomsForOverlap(toyExample.maxOverlap);
export const upperSafetyWitness = atomsForOverlap(toyExample.minOverlap);
