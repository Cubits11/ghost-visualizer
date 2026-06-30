import type { CSSProperties } from "react";
import { sampleReceipt } from "../evidence/sampleReceipt";

const configYaml = [
  "policy_id: demo-policy-two-guardrail-or-v0",
  "dataset_id: demo-dataset-harmful-100-two-guardrails-v0",
  "composition_rule: OR",
  "metric: P(A OR B blocks | Y=harmful)",
  "independence_assumption: false",
].join("\n");

const runJson = JSON.stringify(
  {
    run_id: "ghost-demo-run-001",
    generated_at: sampleReceipt.generatedAt,
    harmful_rows: sampleReceipt.harmful.n,
    guardrails: {
      A_block_rate: sampleReceipt.harmful.marginalA,
      B_block_rate: sampleReceipt.harmful.marginalB,
    },
    observed_or_block_rate: sampleReceipt.harmful.composedOrBlockRate,
    blockOverlap: sampleReceipt.harmful.blockOverlap,
    sharedMissRate: sampleReceipt.harmful.sharedMissRate,
  },
  null,
  2,
);

const receiptJson = JSON.stringify(
  {
    schemaVersion: sampleReceipt.schemaVersion,
    boundedClaim: sampleReceipt.boundedClaim,
    atomCounts: sampleReceipt.harmful.atomCounts,
    invariantSatisfied: sampleReceipt.harmful.invariantSatisfied,
  },
  null,
  2,
);

const witnessesJson = JSON.stringify(
  sampleReceipt.witnesses.map((witness) => ({
    id: witness.id,
    kind: witness.kind,
    atomCounts: witness.atomCounts,
    composedOrBlockRate: witness.composedOrBlockRate,
    composedOrPassRate: witness.composedOrPassRate,
  })),
  null,
  2,
);

const nonClaimsJson = JSON.stringify(
  {
    non_claims: sampleReceipt.nonClaims,
  },
  null,
  2,
);

const artifacts = [
  {
    name: "config.yaml",
    role: "claim scope",
    body: configYaml,
  },
  {
    name: "run.json",
    role: "observed run",
    body: runJson,
  },
  {
    name: "receipt.json",
    role: "bounded claim",
    body: receiptJson,
  },
  {
    name: "endpoint_witnesses.json",
    role: "claim boundary",
    body: witnessesJson,
  },
  {
    name: "non_claims.json",
    role: "blocked assertions",
    body: nonClaimsJson,
  },
];

export function EvidenceArtifactStack() {
  return (
    <div className="artifact-stack" aria-label="Evidence artifact stack">
      {artifacts.map((artifact, index) => (
        <article
          key={artifact.name}
          className="artifact-file"
          style={{ "--artifact-index": index } as CSSProperties}
        >
          <header>
            <span>{artifact.name}</span>
            <strong>{artifact.role}</strong>
          </header>
          <pre>
            <code>{artifact.body}</code>
          </pre>
        </article>
      ))}
    </div>
  );
}
