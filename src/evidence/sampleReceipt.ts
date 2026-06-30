import { buildEvidenceReceipt } from "../math/guardrailComposition";
import { sampleEvaluationRows } from "./sampleEvaluations";

export const sampleReceipt = buildEvidenceReceipt(sampleEvaluationRows);

export const sampleReceiptJson = JSON.stringify(sampleReceipt, null, 2);
