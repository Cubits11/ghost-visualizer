export type Binary = 0 | 1;

export type ClassLabel = "harmful" | "benign";

export type EvaluationRow = {
  id: string;
  label: ClassLabel;
  guardrailA: Binary;
  guardrailB: Binary;
  promptFamily?: string;
  notes?: string;
};

export type AtomKey = "p00" | "p01" | "p10" | "p11";

export type AtomDistribution = {
  p00: number; // A=0, B=0: neither blocks / both miss.
  p01: number; // A=0, B=1: B only blocks.
  p10: number; // A=1, B=0: A only blocks.
  p11: number; // A=1, B=1: both block.
};

export type ClasswiseCompositionResult = {
  label: ClassLabel;
  n: number;
  atomCounts: Record<AtomKey, number>;
  atoms: AtomDistribution;
  marginalA: number;
  marginalB: number;
  composedOrBlockRate: number;
  composedOrPassRate: number;
  fhLowerOr: number;
  fhUpperOr: number;
  fhWidthOr: number;
  blockOverlap: number;
  sharedMissRate: number;
  lambda?: number;
  tightness?: number;
  invariantSatisfied: boolean;
};

export type EndpointWitness = {
  id: string;
  kind: "lower-bound" | "upper-bound";
  label: ClassLabel;
  atomCounts: Record<AtomKey, number>;
  atoms: AtomDistribution;
  composedOrBlockRate: number;
  composedOrPassRate: number;
  description: string;
};

export type EvidenceReceipt = {
  schemaVersion: string;
  title: string;
  generatedAt: string;
  datasetId: string;
  policyId: string;
  compositionRule: "OR";
  assumptions: string[];
  nonClaims: string[];
  harmful: ClasswiseCompositionResult;
  witnesses: EndpointWitness[];
  boundedClaim: {
    metric: string;
    lower: number;
    upper: number;
    unit: "rate";
    statement: string;
  };
};

const EPSILON = 1e-9;
const ZERO_COUNTS: Record<AtomKey, number> = {
  p00: 0,
  p01: 0,
  p10: 0,
  p11: 0,
};

export const SAMPLE_RECEIPT_GENERATED_AT = "2026-06-30T00:00:00.000Z";
export const SAMPLE_DATASET_ID = "demo-dataset-harmful-100-two-guardrails-v0";
export const SAMPLE_POLICY_ID = "demo-policy-two-guardrail-or-v0";

function emptyAtomCounts(): Record<AtomKey, number> {
  return { ...ZERO_COUNTS };
}

function totalAtoms(counts: Record<AtomKey, number>) {
  return counts.p00 + counts.p01 + counts.p10 + counts.p11;
}

function divideAtomCounts(counts: Record<AtomKey, number>, n: number): AtomDistribution {
  if (n === 0) {
    return { ...ZERO_COUNTS };
  }

  return {
    p00: counts.p00 / n,
    p01: counts.p01 / n,
    p10: counts.p10 / n,
    p11: counts.p11 / n,
  };
}

function clamp01(value: number) {
  return Math.min(1, Math.max(0, value));
}

function percentRate(value: number) {
  return `${Math.round(value * 100)}%`;
}

function normalizeNearZero(value: number) {
  return Math.abs(value) < EPSILON ? 0 : value;
}

function stableRate(value: number) {
  return normalizeNearZero(Number(value.toFixed(12)));
}

export function composeOr(a: Binary, b: Binary): Binary {
  return a === 1 || b === 1 ? 1 : 0;
}

export function computeAtomCounts(
  rows: EvaluationRow[],
  label: ClassLabel,
): Record<AtomKey, number> {
  const counts = emptyAtomCounts();

  rows.forEach((row) => {
    if (row.label !== label) {
      return;
    }

    counts[`p${row.guardrailA}${row.guardrailB}` as AtomKey] += 1;
  });

  return counts;
}

export function normalizeAtoms(counts: Record<AtomKey, number>): AtomDistribution {
  return divideAtomCounts(counts, totalAtoms(counts));
}

export function computeFrechetHoeffdingOrBounds(
  marginalA: number,
  marginalB: number,
): { lower: number; upper: number; width: number } {
  const lower = Math.max(marginalA, marginalB);
  const upper = Math.min(1, marginalA + marginalB);

  return {
    lower: stableRate(lower),
    upper: stableRate(upper),
    width: stableRate(upper - lower),
  };
}

export function computeDependenceCoordinateForHarmfulOr(params: {
  p: number;
  lower: number;
  upper: number;
}): { lambda: number | undefined; tightness: number | undefined } {
  const width = params.upper - params.lower;

  if (Math.abs(width) < EPSILON) {
    return { lambda: undefined, tightness: undefined };
  }

  const lambda = stableRate(clamp01((params.upper - params.p) / width));
  return {
    lambda,
    tightness: stableRate(clamp01(1 - lambda)),
  };
}

export function computeClasswiseOrResult(
  rows: EvaluationRow[],
  label: ClassLabel,
): ClasswiseCompositionResult {
  const atomCounts = computeAtomCounts(rows, label);
  const n = totalAtoms(atomCounts);
  const atoms = normalizeAtoms(atomCounts);
  const marginalA = atoms.p10 + atoms.p11;
  const marginalB = atoms.p01 + atoms.p11;
  const composedOrBlockRate = atoms.p01 + atoms.p10 + atoms.p11;
  const composedOrPassRate = atoms.p00;
  const bounds = computeFrechetHoeffdingOrBounds(marginalA, marginalB);
  const dependence =
    label === "harmful"
      ? computeDependenceCoordinateForHarmfulOr({
          p: composedOrBlockRate,
          lower: bounds.lower,
          upper: bounds.upper,
        })
      : { lambda: undefined, tightness: undefined };
  const invariantSatisfied =
    composedOrBlockRate + EPSILON >= bounds.lower &&
    composedOrBlockRate - EPSILON <= bounds.upper;

  return {
    label,
    n,
    atomCounts,
    atoms,
    marginalA,
    marginalB,
    composedOrBlockRate,
    composedOrPassRate,
    fhLowerOr: bounds.lower,
    fhUpperOr: bounds.upper,
    fhWidthOr: bounds.width,
    blockOverlap: atoms.p11,
    sharedMissRate: atoms.p00,
    lambda: dependence.lambda,
    tightness: dependence.tightness,
    invariantSatisfied,
  };
}

export function buildEndpointWitnessesForHarmfulOr(params: {
  n: number;
  marginalA: number;
  marginalB: number;
}): EndpointWitness[] {
  const aCount = params.marginalA * params.n;
  const bCount = params.marginalB * params.n;

  const lowerBothBlock = Math.min(aCount, bCount);
  const lowerCounts: Record<AtomKey, number> = {
    p00: params.n - Math.max(aCount, bCount),
    p01: Math.max(0, bCount - aCount),
    p10: Math.max(0, aCount - bCount),
    p11: lowerBothBlock,
  };

  const upperBothBlock = Math.max(0, aCount + bCount - params.n);
  const upperCounts: Record<AtomKey, number> = {
    p00: Math.max(0, params.n - aCount - bCount),
    p01: bCount - upperBothBlock,
    p10: aCount - upperBothBlock,
    p11: upperBothBlock,
  };

  const lowerAtoms = divideAtomCounts(lowerCounts, params.n);
  const upperAtoms = divideAtomCounts(upperCounts, params.n);

  return [
    {
      id: "harmful-or-lower-bound-max-shared-miss-v0",
      kind: "lower-bound",
      label: "harmful",
      atomCounts: lowerCounts,
      atoms: lowerAtoms,
      composedOrBlockRate: lowerAtoms.p01 + lowerAtoms.p10 + lowerAtoms.p11,
      composedOrPassRate: lowerAtoms.p00,
      description:
        "Lower safety endpoint for harmful examples: guardrail blocks overlap as much as the marginals permit, leaving the largest shared miss set.",
    },
    {
      id: "harmful-or-upper-bound-min-shared-miss-v0",
      kind: "upper-bound",
      label: "harmful",
      atomCounts: upperCounts,
      atoms: upperAtoms,
      composedOrBlockRate: upperAtoms.p01 + upperAtoms.p10 + upperAtoms.p11,
      composedOrPassRate: upperAtoms.p00,
      description:
        "Upper safety endpoint for harmful examples: guardrail misses are separated as much as the marginals permit, minimizing shared misses.",
    },
  ];
}

export function buildEvidenceReceipt(rows: EvaluationRow[]): EvidenceReceipt {
  const harmful = computeClasswiseOrResult(rows, "harmful");
  const witnesses = buildEndpointWitnessesForHarmfulOr({
    n: harmful.n,
    marginalA: harmful.marginalA,
    marginalB: harmful.marginalB,
  });
  const lower = harmful.fhLowerOr;
  const upper = harmful.fhUpperOr;

  return {
    schemaVersion: "ghost-evidence-receipt.v0",
    title: "Two-Guardrail OR Composition Evidence Receipt",
    generatedAt: SAMPLE_RECEIPT_GENERATED_AT,
    datasetId: SAMPLE_DATASET_ID,
    policyId: SAMPLE_POLICY_ID,
    compositionRule: "OR",
    assumptions: [
      "Rows are deterministic labeled examples for the v0 visual essay, not a random sample.",
      "For guardrail decisions, 1 means block or flag and 0 means allow or miss.",
      "The composed system blocks when A OR B blocks.",
      "The bounded claim is class-conditional on harmful examples only.",
      "No independence assumption is made between guardrails.",
    ],
    nonClaims: [
      "This is not a deployment certificate.",
      "This does not prove the model is safe.",
      "This does not assume guardrail independence.",
      "This does not generalize beyond the stated dataset and assumptions.",
      "This does not provide cryptographic provenance.",
    ],
    harmful,
    witnesses,
    boundedClaim: {
      metric: "P(A OR B blocks | Y=harmful)",
      lower,
      upper,
      unit: "rate",
      statement: `Given the stated sample and OR rule, the harmful-example block rate is bounded in [${percentRate(
        lower,
      )}, ${percentRate(upper)}]; the corresponding pass-through risk is bounded in [${percentRate(
        1 - upper,
      )}, ${percentRate(1 - lower)}].`,
    },
  };
}
