import { AbsoluteFill } from "remotion";
import { boundedClaim, toyExample } from "../data/mathExamples";
import {
  AtomTablePanel,
  ClaimBoundaryCard,
  DotGrid100,
  EvidenceArtifactPanel,
  EvidenceReceiptPanel,
  GuardrailShield,
  NonClaimPanel,
  RemotionIntervalBand,
  ScoreObject,
} from "./primitives";

export function ComponentShowcase() {
  const enter = 1;
  const snap = 1;

  return (
    <AbsoluteFill className="vis001-frame component-showcase">
      <div className="render-field" />
      <div className="showcase-header">
        <span>VIS-001 component system</span>
        <strong>frame-rendered primitives</strong>
      </div>
      <div className="showcase-grid">
        <section className="showcase-cell score-showcase">
          <ScoreObject
            label="ScoreObject"
            value={`${toyExample.guardrailACatches}%`}
            caption="marginal score; overlap not reported"
            tone="evidence"
            progress={enter}
          />
          <div className="guardrail-mini-row">
            <GuardrailShield
              label="Guardrail A"
              value="90%"
              caption="marginal only"
              progress={enter}
            />
            <GuardrailShield
              label="Guardrail B"
              value="90%"
              caption="marginal only"
              progress={enter}
            />
          </div>
        </section>
        <section className="showcase-cell dot-showcase">
          <DotGrid100
            title="DotGrid100"
            subtitle="p00 shared-miss default"
            overlapFailures={toyExample.maxOverlap}
            variant="shared"
            revealProgress={snap}
            compact
          />
        </section>
        <section className="showcase-cell atom-showcase">
          <AtomTablePanel />
        </section>
        <section className="showcase-cell interval-showcase">
          <RemotionIntervalBand
            lower={boundedClaim.safetyLower}
            upper={boundedClaim.safetyUpper}
            point={90}
            label="IntervalBand"
            lowerLabel="lower witness"
            upperLabel="upper witness"
            caption="Witness labels remain visible on still frames."
            progress={snap}
          />
        </section>
        <section className="showcase-cell artifact-showcase">
          <EvidenceArtifactPanel progress={enter} />
        </section>
        <section className="showcase-cell receipt-showcase">
          <EvidenceReceiptPanel progress={enter} />
          <NonClaimPanel progress={enter} />
        </section>
      </div>
      <div className="showcase-footer">
        <ClaimBoundaryCard progress={enter} />
      </div>
    </AbsoluteFill>
  );
}
