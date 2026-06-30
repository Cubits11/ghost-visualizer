import type { CSSProperties, ReactNode } from "react";
import { AtomTable } from "../components/AtomTable";
import { EvidenceArtifactStack } from "../components/EvidenceArtifactStack";
import { boundedClaim, toyExample } from "../data/mathExamples";
import { sampleReceipt } from "../evidence/sampleReceipt";
import type { AtomKey } from "../math/guardrailComposition";
import { clamp01 } from "./timeline";

type DotKind = "neutral" | "aOnly" | "bOnly" | "shared";

const separatedA = [0, 1, 2, 10, 11, 12, 20, 21, 30, 31];
const separatedB = [68, 69, 78, 79, 87, 88, 89, 97, 98, 99];
const sharedBoth = [44, 45, 54, 55, 43, 46, 53, 56, 34, 65];
const sharedA = [33, 35, 42, 47, 52, 57, 63, 64, 66, 75];
const sharedB = [24, 25, 36, 37, 48, 58, 62, 67, 74, 76];

function makeKindSet(overlapFailures: number, variant: "separated" | "shared") {
  const both = Math.min(toyExample.maxOverlap, Math.max(toyExample.minOverlap, overlapFailures));
  const aOnly = toyExample.guardrailAFailures - both;
  const bOnly = toyExample.guardrailBFailures - both;

  return {
    shared: variant === "shared" ? new Set(sharedBoth.slice(0, both)) : new Set<number>(),
    aOnly:
      variant === "separated"
        ? new Set(separatedA.slice(0, aOnly))
        : new Set(sharedA.slice(0, aOnly)),
    bOnly:
      variant === "separated"
        ? new Set(separatedB.slice(0, bOnly))
        : new Set(sharedB.slice(0, bOnly)),
  };
}

function dotKind(index: number, sets: ReturnType<typeof makeKindSet>): DotKind {
  if (sets.shared.has(index)) {
    return "shared";
  }

  if (sets.aOnly.has(index)) {
    return "aOnly";
  }

  if (sets.bOnly.has(index)) {
    return "bOnly";
  }

  return "neutral";
}

export function FrameLayer({
  children,
  opacity,
  className = "",
  style,
}: {
  children: ReactNode;
  opacity: number;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <div
      className={`frame-layer ${className}`}
      style={{ opacity: clamp01(opacity), pointerEvents: "none", ...style }}
    >
      {children}
    </div>
  );
}

export function ScoreObject({
  label,
  value,
  caption,
  tone = "evidence",
  progress = 1,
  large = false,
}: {
  label: string;
  value: string;
  caption?: string;
  tone?: "evidence" | "truth" | "danger" | "warning";
  progress?: number;
  large?: boolean;
}) {
  const p = clamp01(progress);

  return (
    <article
      className={`remotion-score tone-${tone}${large ? " is-large" : ""}`}
      style={{
        opacity: p,
        transform: `translateY(${(1 - p) * 34}px) scale(${0.96 + p * 0.04})`,
      }}
    >
      <span>{label}</span>
      <strong>{value}</strong>
      {caption ? <p>{caption}</p> : null}
    </article>
  );
}

export function GuardrailShield({
  label,
  value,
  caption,
  progress = 1,
}: {
  label: string;
  value: string;
  caption: string;
  progress?: number;
}) {
  const p = clamp01(progress);

  return (
    <div
      className="guardrail-shield"
      style={{
        opacity: p,
        transform: `translateY(${(1 - p) * 22}px)`,
      }}
    >
      <div className="shield-mark" aria-hidden="true">
        <span />
      </div>
      <div>
        <span>{label}</span>
        <strong>{value}</strong>
        <em>{caption}</em>
      </div>
    </div>
  );
}

export function DotGrid100({
  title,
  subtitle,
  overlapFailures,
  variant,
  revealProgress = 1,
  compact = false,
}: {
  title: string;
  subtitle: string;
  overlapFailures: number;
  variant: "separated" | "shared";
  revealProgress?: number;
  compact?: boolean;
}) {
  const sets = makeKindSet(overlapFailures, variant);
  const sharedCount = variant === "shared" ? overlapFailures : 0;
  const size = 276;
  const gap = 25;
  const offset = 25;

  return (
    <article className={`remotion-dot-world${compact ? " is-compact" : ""}`}>
      <header>
        <div>
          <h3>{title}</h3>
          <p>{subtitle}</p>
        </div>
        <div className="risk-chip">
          <span>sharedMissRate</span>
          <strong>{sharedCount}%</strong>
        </div>
      </header>
      <svg viewBox={`0 0 ${size} ${size}`} role="img" aria-label={title}>
        {Array.from({ length: 100 }, (_, index) => {
          const col = index % 10;
          const row = Math.floor(index / 10);
          const kind = dotKind(index, sets);
          const p = clamp01(revealProgress * 1.35 - index / 100);

          return (
            <circle
              key={`${index}-${kind}`}
              className={`remotion-dot dot-${kind}`}
              cx={offset + col * gap}
              cy={offset + row * gap}
              r={kind === "shared" ? 7.4 : kind === "neutral" ? 4.6 : 5.8}
              style={{
                opacity: 0.12 + p * 0.88,
                transform: `scale(${0.68 + p * 0.32})`,
                transformOrigin: `${offset + col * gap}px ${offset + row * gap}px`,
              }}
            />
          );
        })}
      </svg>
      <footer>
        <span>A misses {toyExample.guardrailAFailures}%</span>
        <span>B misses {toyExample.guardrailBFailures}%</span>
        <span>{variant === "shared" ? "aligned shared misses" : "separated misses"}</span>
      </footer>
    </article>
  );
}

export function RemotionIntervalBand({
  lower,
  upper,
  point,
  label,
  lowerLabel,
  upperLabel,
  caption,
  progress = 1,
  pointProgress = progress,
}: {
  lower: number;
  upper: number;
  point?: number;
  label: string;
  lowerLabel: string;
  upperLabel: string;
  caption: string;
  progress?: number;
  pointProgress?: number;
}) {
  const p = clamp01(progress);
  const pointP = clamp01(pointProgress);
  const span = Math.max(1, upper - lower);
  const pointPosition = point === undefined ? undefined : ((point - lower) / span) * 100;

  return (
    <div className="remotion-interval-band">
      <div className="interval-head">
        <span>{label}</span>
        <strong>
          [{lower}%, {upper}%]
        </strong>
      </div>
      <div className="interval-track">
        <span className="interval-endpoint interval-endpoint-lower" />
        <span className="interval-endpoint interval-endpoint-upper" />
        <div className="interval-fill" style={{ transform: `scaleX(${p})` }} />
        {pointPosition !== undefined ? (
          <div
            className="interval-point"
            style={{
              left: `${pointPosition}%`,
              opacity: pointP,
              transform: `translate(-50%, -50%) scale(${pointP})`,
            }}
          >
            <span>{point}%</span>
          </div>
        ) : null}
      </div>
      <div className="interval-labels">
        <span>{lowerLabel}</span>
        <span>{upperLabel}</span>
      </div>
      <p>{caption}</p>
    </div>
  );
}

export function AtomTablePanel({
  counts = sampleReceipt.harmful.atomCounts,
  total = sampleReceipt.harmful.n,
  title = "Harmful-class block atoms",
}: {
  counts?: Record<AtomKey, number>;
  total?: number;
  title?: string;
}) {
  return <AtomTable counts={counts} total={total} title={title} compact />;
}

export function EvidenceReceiptPanel({ progress = 1 }: { progress?: number }) {
  const p = clamp01(progress);
  const lines = [
    ["metric", sampleReceipt.boundedClaim.metric],
    ["blockOverlap", `${Math.round(sampleReceipt.harmful.blockOverlap * 100)}% p11 both-block overlap`],
    [
      "sharedMissRate",
      `${Math.round(sampleReceipt.harmful.sharedMissRate * 100)}% p00 shared miss danger cell`,
    ],
    ["witnesses", `${sampleReceipt.witnesses.length} endpoint witnesses attached`],
    ["nonClaims", `${sampleReceipt.nonClaims.length} blocked assertions`],
  ];

  return (
    <article
      className="receipt-panel"
      style={{
        opacity: p,
        transform: `translateY(${(1 - p) * 26}px)`,
      }}
    >
      <div className="receipt-topline">
        <span>GHOST RECEIPT</span>
        <strong>bounded claim assembled</strong>
      </div>
      <p>{sampleReceipt.boundedClaim.statement}</p>
      <div className="receipt-lines">
        {lines.map(([key, value], index) => {
          const lineP = clamp01(p * 1.35 - index * 0.12);

          return (
            <div
              className="receipt-line"
              key={key}
              style={{
                opacity: lineP,
                transform: `translateX(${(1 - lineP) * 18}px)`,
              }}
            >
              <span>{key}</span>
              <strong>{value}</strong>
            </div>
          );
        })}
      </div>
    </article>
  );
}

export function EvidenceArtifactPanel({ progress = 1 }: { progress?: number }) {
  const p = clamp01(progress);

  return (
    <div
      className="artifact-panel"
      style={{
        opacity: p,
        transform: `translateX(${(1 - p) * 34}px)`,
      }}
    >
      <EvidenceArtifactStack />
    </div>
  );
}

export function NonClaimPanel({ progress = 1 }: { progress?: number }) {
  const p = clamp01(progress);

  return (
    <article
      className="non-claim-panel"
      style={{
        opacity: p,
        transform: `translateY(${(1 - p) * 18}px)`,
      }}
    >
      <header>
        <span>NON-CLAIMS</span>
        <strong>the receipt refuses these assertions</strong>
      </header>
      <div>
        {sampleReceipt.nonClaims.slice(0, 4).map((claim, index) => {
          const claimP = clamp01(p * 1.25 - index * 0.1);

          return (
            <span
              key={claim}
              style={{
                opacity: claimP,
                transform: `translateY(${(1 - claimP) * 10}px)`,
              }}
            >
              {claim}
            </span>
          );
        })}
      </div>
    </article>
  );
}

export function ClaimBoundaryCard({ progress = 1 }: { progress?: number }) {
  return (
    <article className="claim-boundary-card" style={{ opacity: clamp01(progress) }}>
      <span>Corrected VIS-001 semantics</span>
      <strong>p00 is the danger cell.</strong>
      <p>
        p11 is both-block overlap. Missing overlap is treated as aligned shared misses for risk
        review until evidence proves otherwise.
      </p>
      <RemotionIntervalBand
        lower={boundedClaim.safetyLower}
        upper={boundedClaim.safetyUpper}
        label="composed safety permitted by evidence"
        lowerLabel="lower witness: aligned shared misses"
        upperLabel="upper witness: separated misses"
        caption="The interval carries witness labels because a bound needs inspectable endpoints."
        progress={progress}
      />
    </article>
  );
}
