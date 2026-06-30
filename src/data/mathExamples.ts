import { sampleReceipt } from "../evidence/sampleReceipt";

export interface FailureAtomCounts {
  neither: number;
  aOnly: number;
  bOnly: number;
  both: number;
  total: number;
}

export type AtomCounts = FailureAtomCounts;

const harmful = sampleReceipt.harmful;
const lowerWitness = sampleReceipt.witnesses.find((witness) => witness.kind === "lower-bound");
const upperWitness = sampleReceipt.witnesses.find((witness) => witness.kind === "upper-bound");
const guardrailAFailures = harmful.n - harmful.atomCounts.p10 - harmful.atomCounts.p11;
const guardrailBFailures = harmful.n - harmful.atomCounts.p01 - harmful.atomCounts.p11;

export const toyExample = {
  total: harmful.n,
  harmfulPrompts: harmful.n,
  guardrailACatches: harmful.atomCounts.p10 + harmful.atomCounts.p11,
  guardrailBCatches: harmful.atomCounts.p01 + harmful.atomCounts.p11,
  guardrailAFailures,
  guardrailBFailures,
  independenceOverlap: (guardrailAFailures * guardrailBFailures) / harmful.n,
  minOverlap: Math.max(0, guardrailAFailures + guardrailBFailures - harmful.n),
  maxOverlap: Math.min(guardrailAFailures, guardrailBFailures),
};

export const boundedClaim = {
  riskLower: Math.round((1 - sampleReceipt.boundedClaim.upper) * 100),
  riskUpper: Math.round((1 - sampleReceipt.boundedClaim.lower) * 100),
  safetyLower: Math.round(sampleReceipt.boundedClaim.lower * 100),
  safetyUpper: Math.round(sampleReceipt.boundedClaim.upper * 100),
  policyId: sampleReceipt.policyId,
  datasetId: sampleReceipt.datasetId,
  witnessLowerId: lowerWitness?.id ?? "missing-lower-witness",
  witnessUpperId: upperWitness?.id ?? "missing-upper-witness",
};

export const independenceBaselineSafety = Math.round(
  (1 - (1 - harmful.marginalA) * (1 - harmful.marginalB)) * 100,
);

export function clampOverlap(overlapFailures: number) {
  return Math.min(
    toyExample.maxOverlap,
    Math.max(toyExample.minOverlap, Math.round(overlapFailures)),
  );
}

// Failure atoms are used only for the animated miss map. The formal math core
// uses block atoms: p00 means neither blocks, not neither fails.
export function atomsForOverlap(overlapFailures: number): FailureAtomCounts {
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

export function rateToPercent(value: number, digits = 0) {
  return formatPercent(value * 100, digits);
}

export function atomPercent(count: number, total = toyExample.total) {
  return formatPercent((count / total) * 100);
}

export const lowerSafetyWitness = atomsForOverlap(toyExample.maxOverlap);
export const upperSafetyWitness = atomsForOverlap(toyExample.minOverlap);
