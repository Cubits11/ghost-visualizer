import { ArrowLeft, Download, FileJson, ShieldCheck } from "lucide-react";
import { AtomTable } from "../components/AtomTable";
import { IntervalBand } from "../components/IntervalBand";
import { WitnessCard } from "../components/WitnessCard";
import { sampleEvaluationRows } from "../evidence/sampleEvaluations";
import { sampleReceipt, sampleReceiptJson } from "../evidence/sampleReceipt";
import type { EvidenceReceipt } from "../math/guardrailComposition";

interface EvidenceModeProps {
  onBackToStory: () => void;
}

const receipt: EvidenceReceipt = sampleReceipt;
const harmfulTotal =
  receipt.harmful.atomCounts.p00 +
  receipt.harmful.atomCounts.p01 +
  receipt.harmful.atomCounts.p10 +
  receipt.harmful.atomCounts.p11;
const receiptHref = `data:application/json;charset=utf-8,${encodeURIComponent(sampleReceiptJson)}`;

function percent(value: number, digits = 0) {
  return `${(value * 100).toFixed(digits)}%`;
}

function countRowsByFamily() {
  return sampleEvaluationRows.reduce<Record<string, number>>((acc, row) => {
    const family = row.promptFamily ?? "unlabeled";
    acc[family] = (acc[family] ?? 0) + 1;
    return acc;
  }, {});
}

const promptFamilies = Object.entries(countRowsByFamily());

export function EvidenceMode({ onBackToStory }: EvidenceModeProps) {
  return (
    <div className="evidence-mode">
      <header className="evidence-topbar">
        <div>
          <p className="eyebrow">Ghost Visualizer</p>
          <h1>Evidence Mode</h1>
        </div>
        <div className="evidence-actions">
          <button type="button" className="mode-button" onClick={onBackToStory}>
            <ArrowLeft aria-hidden="true" />
            Story
          </button>
          <a className="mode-button" href={receiptHref} download="sample-receipt.json">
            <Download aria-hidden="true" />
            Receipt JSON
          </a>
        </div>
      </header>

      <main className="evidence-lab">
        <section className="evidence-hero" aria-labelledby="evidence-title">
          <div className="evidence-hero-copy">
            <p className="scene-kicker">empirical receipt v0</p>
            <h2 id="evidence-title">{receipt.title}</h2>
            <p>{receipt.boundedClaim.statement}</p>
          </div>
          <div className="receipt-id-panel" aria-label="Receipt identifiers">
            <span>schema {receipt.schemaVersion}</span>
            <strong>{receipt.datasetId}</strong>
            <em>{receipt.generatedAt}</em>
          </div>
        </section>

        <section className="evidence-strip" aria-label="Dataset summary">
          <div>
            <span>rows</span>
            <strong>{receipt.harmful.n}</strong>
            <em>harmful examples</em>
          </div>
          <div>
            <span>guardrail A</span>
            <strong>{percent(receipt.harmful.marginalA)}</strong>
            <em>observed block rate</em>
          </div>
          <div>
            <span>guardrail B</span>
            <strong>{percent(receipt.harmful.marginalB)}</strong>
            <em>observed block rate</em>
          </div>
          <div>
            <span>observed OR</span>
            <strong>{percent(receipt.harmful.composedOrBlockRate)}</strong>
            <em>block rate</em>
          </div>
          <div>
            <span>risk</span>
            <strong>{percent(receipt.harmful.composedOrPassRate)}</strong>
            <em>shared miss rate</em>
          </div>
        </section>

        <section className="evidence-grid evidence-grid-primary">
          <div className="evidence-panel atom-panel">
            <div className="panel-heading">
              <FileJson aria-hidden="true" />
              <div>
                <p className="scene-kicker">block atoms from rows</p>
                <h3>Observed Atom Table</h3>
              </div>
            </div>
            <AtomTable
              counts={receipt.harmful.atomCounts}
              total={harmfulTotal}
              title="A/B block decisions"
            />
          </div>

          <div className="evidence-panel interval-panel">
            <div className="panel-heading">
              <ShieldCheck aria-hidden="true" />
              <div>
                <p className="scene-kicker">Frechet-Hoeffding OR bound</p>
                <h3>Bounded Claim</h3>
              </div>
            </div>
            <IntervalBand
              lower={receipt.boundedClaim.lower * 100}
              upper={receipt.boundedClaim.upper * 100}
              point={receipt.harmful.composedOrBlockRate * 100}
              label="harmful OR block rate"
            />
            <dl className="evidence-metrics">
              <div>
                <dt>lambda</dt>
                <dd>{receipt.harmful.lambda === undefined ? "n/a" : receipt.harmful.lambda.toFixed(2)}</dd>
              </div>
              <div>
                <dt>tightness</dt>
                <dd>
                  {receipt.harmful.tightness === undefined
                    ? "n/a"
                    : receipt.harmful.tightness.toFixed(2)}
                </dd>
              </div>
              <div>
                <dt>invariant</dt>
                <dd>{receipt.harmful.invariantSatisfied ? "satisfied" : "failed"}</dd>
              </div>
            </dl>
          </div>
        </section>

        <section className="evidence-section" aria-labelledby="witness-title">
          <div className="section-heading">
            <p className="scene-kicker">endpoint witnesses</p>
            <h3 id="witness-title">Inspectable Worlds</h3>
          </div>
          <div className="witness-grid">
            {receipt.witnesses.map((witness) => (
              <WitnessCard
                key={witness.id}
                title={witness.kind === "lower-bound" ? "Lower-bound safety" : "Upper-bound safety"}
                subtitle={witness.kind === "lower-bound" ? "max shared miss" : "min shared miss"}
                witness={witness}
              />
            ))}
          </div>
        </section>

        <section className="evidence-grid">
          <div className="evidence-panel">
            <div className="section-heading">
              <p className="scene-kicker">assumptions</p>
              <h3>What The Receipt Uses</h3>
            </div>
            <ul className="evidence-list">
              {receipt.assumptions.map((assumption) => (
                <li key={assumption}>{assumption}</li>
              ))}
            </ul>
          </div>

          <div className="evidence-panel">
            <div className="section-heading">
              <p className="scene-kicker">non-claims</p>
              <h3>What It Does Not Say</h3>
            </div>
            <ul className="evidence-list">
              {receipt.nonClaims.map((nonClaim) => (
                <li key={nonClaim}>{nonClaim}</li>
              ))}
            </ul>
          </div>
        </section>

        <section className="evidence-section evidence-sample" aria-labelledby="families-title">
          <div className="section-heading">
            <p className="scene-kicker">dataset shape</p>
            <h3 id="families-title">Prompt Families In The Sample</h3>
          </div>
          <div className="family-list">
            {promptFamilies.map(([family, count]) => (
              <span key={family}>
                {family} <strong>{count}</strong>
              </span>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
