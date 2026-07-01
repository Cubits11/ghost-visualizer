import {
  AbsoluteFill,
  Easing,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { boundedClaim, toyExample } from "../data/mathExamples";
import {
  artifactImpact,
  clampedInterpolate,
  fractureSnap,
  intervalInevitable,
  mechanicalSort,
  officialEnter,
} from "./motion";
import {
  AtomTablePanel,
  ClaimBoundaryCard,
  DotGrid100,
  EvidenceArtifactPanel,
  EvidenceReceiptPanel,
  FrameLayer,
  GuardrailShield,
  NonClaimPanel,
  RemotionIntervalBand,
  ScoreObject,
  ViewerQuestion,
} from "./primitives";
import { cue, hold, seconds } from "./timeline";

function layerOpacity(
  frame: number,
  startSec: number,
  endSec: number,
  fps: number,
  fadeSec = 0.7,
) {
  const enter = cue(frame, startSec, fadeSec, fps, officialEnter);
  const exit =
    1 - cue(frame, endSec - fadeSec, fadeSec, fps, Easing.in(Easing.cubic));
  return Math.min(enter, exit);
}

function CrackOverlay({ progress }: { progress: number }) {
  const paths = [
    "M 930 238 L 894 380 L 934 486 L 908 612 L 972 802",
    "M 912 408 L 742 356 L 650 430",
    "M 938 470 L 1092 386 L 1224 432",
    "M 912 614 L 782 702 L 706 820",
    "M 966 620 L 1116 714 L 1228 850",
  ];

  return (
    <svg className="crack-overlay" viewBox="0 0 1920 1080" aria-hidden="true">
      {paths.map((path, index) => {
        const p = Math.max(0, Math.min(1, progress * 1.25 - index * 0.09));

        return (
          <path
            key={path}
            d={path}
            pathLength={1}
            style={{
              strokeDasharray: 1,
              strokeDashoffset: 1 - p,
              opacity: p,
            }}
          />
        );
      })}
    </svg>
  );
}

export function ShatteringPointEstimateScene() {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const falseCertaintyOpacity = layerOpacity(frame, 0, 15, fps, 0.8);
  const hiddenOpacity = layerOpacity(frame, 13.8, 24, fps, 0.7);
  const worldsOpacity = layerOpacity(frame, 20, 38, fps, 0.9);
  const intervalOpacity = layerOpacity(frame, 34, 52, fps, 0.9);
  const receiptOpacity = layerOpacity(frame, 48, 60.6, fps, 0.7);
  const finalBoundaryOpacity = layerOpacity(frame, 57.7, 60.6, fps, 0.55);

  const blackField = cue(frame, 0, 1.4, fps, officialEnter);
  const officialScore = cue(frame, 2.6, 1.4, fps, officialEnter);
  const guardrailEnter = cue(frame, 6, 1.4, fps, officialEnter);
  const therefore = cue(frame, 9, 1.0, fps, officialEnter);
  const pausePressure = hold(frame, 12, 15, fps)
    ? clampedInterpolate(
        frame,
        [seconds(12, fps), seconds(15, fps)],
        [0, 1],
        Easing.linear,
      )
    : frame > seconds(15, fps)
      ? 1
      : 0;
  const hiddenVariable = cue(frame, 14.2, 1.2, fps, mechanicalSort);
  const crack = clampedInterpolate(
    frame,
    [seconds(18, fps), seconds(20, fps)],
    [0, 1],
    fractureSnap,
  );
  const worldReveal = cue(frame, 22, 5.6, fps, mechanicalSort);
  const intervalReveal = cue(frame, 36, 5.2, fps, intervalInevitable);
  const receiptSnap = cue(frame, 50, 2.2, fps, artifactImpact);

  const scoreScale = interpolate(officialScore, [0, 1], [0.88, 1]);
  const fieldDim = interpolate(blackField, [0, 1], [0.4, 1]);
  const assumptionY = interpolate(hiddenVariable, [0, 1], [34, 0]);

  return (
    <AbsoluteFill className="vis001-frame">
      <div className="render-field" style={{ opacity: fieldDim }} />
      <div className="film-grain" />

      <FrameLayer opacity={falseCertaintyOpacity} className="cold-open-render">
        <ViewerQuestion progress={officialScore}>
          Question: what does the score leave out?
        </ViewerQuestion>
        <div className="scene-number">
          <span>VIS-001</span>
          <strong>The Shattering Point Estimate</strong>
        </div>
        <div
          className="official-score-wrap"
          style={{ transform: `scale(${scoreScale})` }}
        >
          <ScoreObject
            label="Published safety score"
            value={`${toyExample.guardrailACatches}%`}
            caption="100 harmful prompts; overlap not reported"
            tone="evidence"
            large
            progress={officialScore}
          />
        </div>
        <div className="guardrail-pair">
          <GuardrailShield
            label="Guardrail A"
            value={`${toyExample.guardrailACatches}%`}
            caption="marginal only"
            progress={guardrailEnter}
          />
          <GuardrailShield
            label="Guardrail B"
            value={`${toyExample.guardrailBCatches}%`}
            caption="marginal only"
            progress={Math.max(0, guardrailEnter - 0.08) / 0.92}
          />
        </div>
        <div
          className="therefore-safe"
          style={{
            opacity: therefore,
            transform: `translateY(${(1 - therefore) * 22}px)`,
          }}
        >
          Therefore: safe?
        </div>
        <div className="pause-pressure" style={{ opacity: pausePressure }}>
          the inference hangs
        </div>
      </FrameLayer>

      <FrameLayer opacity={hiddenOpacity} className="hidden-render">
        <ViewerQuestion progress={hiddenVariable}>
          Question: where do the misses land?
        </ViewerQuestion>
        <div
          className="hidden-assumption-card"
          style={{
            opacity: hiddenVariable,
            transform: `translateY(${assumptionY}px)`,
          }}
        >
          <span>Hidden variable</span>
          <strong>where the misses overlap</strong>
          <p>Two guardrails can miss different prompts — or the same ones.</p>
          <div className="claim-boundary-pair">
            <div>
              <span>Known from scores</span>
              <strong>A misses 10 · B misses 10</strong>
            </div>
            <div>
              <span>Hidden until overlap is measured</span>
              <strong>same misses or different misses?</strong>
            </div>
          </div>
          <div className="atom-callout-grid">
            <span className="atom-callout is-danger">
              Shared Miss <em>p00 · neither guardrail catches it</em>
            </span>
            <span>
              A Only <em>p10</em>
            </span>
            <span>
              B Only <em>p01</em>
            </span>
            <span>
              Both Block <em>p11 · confirmed block overlap</em>
            </span>
          </div>
        </div>
        <div className="crack-title" style={{ opacity: crack }}>
          Crack.
        </div>
      </FrameLayer>

      <FrameLayer
        opacity={Math.max(falseCertaintyOpacity, hiddenOpacity)}
        className="crack-layer"
      >
        <CrackOverlay progress={crack} />
      </FrameLayer>

      <FrameLayer opacity={worldsOpacity} className="worlds-render">
        <ViewerQuestion progress={worldReveal}>
          Question: can the same scores hide different risk?
        </ViewerQuestion>
        <div className="section-copy">
          <span>Same scores. Different miss overlap. Different risk.</span>
          <strong>
            If overlap is unreported, both worlds remain possible.
          </strong>
          <p>The honest claim must keep the aligned-miss world possible.</p>
        </div>
        <div className="world-panels-render">
          <DotGrid100
            title="World A"
            subtitle="separated misses"
            overlapFailures={toyExample.minOverlap}
            variant="separated"
            revealProgress={worldReveal}
          />
          <DotGrid100
            title="World B"
            subtitle="aligned misses"
            overlapFailures={toyExample.maxOverlap}
            variant="shared"
            revealProgress={Math.max(0, worldReveal - 0.08) / 0.92}
          />
        </div>
        <div className="world-footer-line">
          <div>
            <span>fixed</span>
            <strong>A misses 10 · B misses 10</strong>
          </div>
          <div>
            <span>hidden</span>
            <strong>shared misses can be 0 or 10</strong>
          </div>
          <div>
            <span>risk consequence</span>
            <strong>separated misses → fewer shared escapes · aligned misses → dangerous concentration</strong>
          </div>
        </div>
      </FrameLayer>

      <FrameLayer opacity={intervalOpacity} className="interval-render">
        <ViewerQuestion progress={intervalReveal}>
          Question: what claim is still supported?
        </ViewerQuestion>
        <div className="interval-main">
          <div className="section-copy">
            <span>Supported claim boundary</span>
            <strong>The score cannot choose between these worlds.</strong>
            <p>Until overlap is measured, the supported claim is a range.</p>
          </div>
          <div className="interval-boundary-cues">
            <span>
              <em>Supported claim</em>
              a range
            </span>
            <span>
              <em>Not claimed</em>
              a single exact composed score
            </span>
          </div>
          <RemotionIntervalBand
            lower={boundedClaim.safetyLower}
            upper={boundedClaim.safetyUpper}
            point={toyExample.guardrailACatches}
            label="composed harmful-block rate"
            lowerLabel="lower witness: aligned misses"
            upperLabel="upper witness: separated misses"
            caption="The endpoints are possible worlds still allowed by the evidence."
            progress={intervalReveal}
            pointProgress={cue(frame, 41.2, 0.7, fps, artifactImpact)}
            pointLabel="single score"
            pointState="rejected"
            lockLabels={{
              point: "single score rejected",
              range: "range supported",
            }}
          />
        </div>
        <div
          className="atom-table-wrap"
          style={{
            opacity: cue(frame, 39.5, 1.1, fps, officialEnter),
            transform: `translateY(${(1 - cue(frame, 39.5, 1.1, fps, officialEnter)) * 18}px)`,
          }}
        >
          <div className="bridge-line">
            The score tells us how many. The overlap tells us where.
          </div>
          <AtomTablePanel title="Four block outcomes" />
        </div>
      </FrameLayer>

      <FrameLayer opacity={receiptOpacity} className="receipt-render">
        <ViewerQuestion progress={receiptSnap}>
          Question: what evidence travels with the claim?
        </ViewerQuestion>
        <div className="receipt-grid-render">
          <EvidenceReceiptPanel progress={receiptSnap} />
          <EvidenceArtifactPanel
            progress={cue(frame, 51.1, 2.2, fps, artifactImpact)}
          />
          <NonClaimPanel progress={cue(frame, 53.5, 1.4, fps, officialEnter)} />
        </div>
      </FrameLayer>

      <FrameLayer opacity={finalBoundaryOpacity} className="final-boundary">
        <ClaimBoundaryCard progress={cue(frame, 58, 0.8, fps, officialEnter)} />
      </FrameLayer>

      <FrameLayer
        opacity={cue(frame, 60.2, 0.8, fps, officialEnter)}
        className="private-demo-bumper"
      >
        <div>
          <ViewerQuestion className="is-bumper">
            Question: can a reviewer audit the story without narration?
          </ViewerQuestion>
          <span>Private demo build</span>
          <strong>
            What to judge: clarity · credibility · artifact realism
          </strong>
        </div>
      </FrameLayer>
    </AbsoluteFill>
  );
}
