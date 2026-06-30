import { describe, expect, it } from "vitest";
import {
  buildEvidenceReceipt,
  computeAtomCounts,
  computeClasswiseOrResult,
  composeOr,
  normalizeAtoms,
} from "./guardrailComposition";
import { separatedFailureRows, sharedFailureRows } from "../evidence/sampleEvaluations";

function sumCounts(counts: Record<string, number>) {
  return Object.values(counts).reduce((sum, value) => sum + value, 0);
}

function sumAtoms(atoms: Record<string, number>) {
  return Object.values(atoms).reduce((sum, value) => sum + value, 0);
}

describe("guardrail OR composition", () => {
  it("implements the OR truth table", () => {
    expect(composeOr(0, 0)).toBe(0);
    expect(composeOr(0, 1)).toBe(1);
    expect(composeOr(1, 0)).toBe(1);
    expect(composeOr(1, 1)).toBe(1);
  });

  it("counts block atoms and normalizes them", () => {
    const counts = computeAtomCounts(sharedFailureRows, "harmful");
    const atoms = normalizeAtoms(counts);

    expect(sumCounts(counts)).toBe(sharedFailureRows.length);
    expect(sumAtoms(atoms)).toBeCloseTo(1);
  });

  it("computes the 90/90 shared-failure lower witness from rows", () => {
    const result = computeClasswiseOrResult(sharedFailureRows, "harmful");

    expect(result.atomCounts).toEqual({
      p00: 10,
      p01: 0,
      p10: 0,
      p11: 90,
    });
    expect(result.marginalA).toBeCloseTo(0.9);
    expect(result.marginalB).toBeCloseTo(0.9);
    expect(result.composedOrBlockRate).toBeCloseTo(0.9);
    expect(result.fhLowerOr).toBeCloseTo(0.9);
    expect(result.fhUpperOr).toBeCloseTo(1);
    expect(result.composedOrPassRate).toBeCloseTo(0.1);
    expect(result.invariantSatisfied).toBe(true);
  });

  it("computes the 90/90 separated-failure upper witness from rows", () => {
    const result = computeClasswiseOrResult(separatedFailureRows, "harmful");

    expect(result.atomCounts).toEqual({
      p00: 0,
      p01: 10,
      p10: 10,
      p11: 80,
    });
    expect(result.marginalA).toBeCloseTo(0.9);
    expect(result.marginalB).toBeCloseTo(0.9);
    expect(result.composedOrBlockRate).toBeCloseTo(1);
    expect(result.fhLowerOr).toBeCloseTo(0.9);
    expect(result.fhUpperOr).toBeCloseTo(1);
    expect(result.composedOrPassRate).toBeCloseTo(0);
    expect(result.invariantSatisfied).toBe(true);
  });

  it("maps dependence coordinates onto lower and upper safety endpoints", () => {
    const lower = computeClasswiseOrResult(sharedFailureRows, "harmful");
    const upper = computeClasswiseOrResult(separatedFailureRows, "harmful");

    expect(lower.lambda).toBeCloseTo(1);
    expect(lower.tightness).toBeCloseTo(0);
    expect(upper.lambda).toBeCloseTo(0);
    expect(upper.tightness).toBeCloseTo(1);
  });

  it("builds a receipt with assumptions, witnesses, bounded claim, and no certified-safe claim", () => {
    const receipt = buildEvidenceReceipt(sharedFailureRows);
    const serialized = JSON.stringify(receipt).toLowerCase();

    expect(receipt.assumptions.length).toBeGreaterThan(0);
    expect(receipt.nonClaims.length).toBeGreaterThan(0);
    expect(receipt.witnesses).toHaveLength(2);
    expect(receipt.boundedClaim.lower).toBeCloseTo(0.9);
    expect(receipt.boundedClaim.upper).toBeCloseTo(1);
    expect(serialized).not.toContain("certified safe");
  });
});
