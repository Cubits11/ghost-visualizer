import { motion } from "motion/react";
import { atomsForOverlap, atomPercent, composedRisk, composedSafety } from "../data/mathExamples";

type DotKind = "neither" | "aOnly" | "bOnly" | "both";

interface DotWorldProps {
  title: string;
  subtitle?: string;
  overlapFailures: number;
  variant?: "separated" | "shared";
  compact?: boolean;
  showStats?: boolean;
}

const separatedA = [0, 1, 2, 10, 11, 12, 20, 21, 30, 31];
const separatedB = [68, 69, 78, 79, 87, 88, 89, 97, 98, 99];
const sharedBoth = [44, 45, 54, 55, 43, 46, 53, 56, 34, 65];
const sharedA = [33, 35, 42, 47, 52, 57, 63, 64, 66, 75];
const sharedB = [24, 25, 36, 37, 48, 58, 62, 67, 74, 76];

function makeKindSet(overlapFailures: number, variant: "separated" | "shared") {
  const atoms = atomsForOverlap(overlapFailures);
  const both =
    variant === "separated" ? new Set<number>() : new Set(sharedBoth.slice(0, atoms.both));
  const aOnly =
    variant === "separated"
      ? new Set(separatedA.slice(0, atoms.aOnly))
      : new Set(sharedA.slice(0, atoms.aOnly));
  const bOnly =
    variant === "separated"
      ? new Set(separatedB.slice(0, atoms.bOnly))
      : new Set(sharedB.slice(0, atoms.bOnly));

  return { both, aOnly, bOnly };
}

function kindFor(index: number, sets: ReturnType<typeof makeKindSet>): DotKind {
  if (sets.both.has(index)) {
    return "both";
  }

  if (sets.aOnly.has(index)) {
    return "aOnly";
  }

  if (sets.bOnly.has(index)) {
    return "bOnly";
  }

  return "neither";
}

export function DotWorld({
  title,
  subtitle,
  overlapFailures,
  variant = "shared",
  compact = false,
  showStats = true,
}: DotWorldProps) {
  const atoms = atomsForOverlap(overlapFailures);
  const sets = makeKindSet(overlapFailures, variant);
  const size = 236;
  const gap = 22;
  const offset = 19;

  return (
    <article className={`dot-world${compact ? " is-compact" : ""}`}>
      <header>
        <div>
          <h3>{title}</h3>
          {subtitle ? <p>{subtitle}</p> : null}
        </div>
        {showStats ? (
          <div className="risk-chip">
            <span>co-fail</span>
            <strong>{atomPercent(atoms.both)}</strong>
          </div>
        ) : null}
      </header>

      <svg viewBox={`0 0 ${size} ${size}`} role="img" aria-label={title}>
        <defs>
          <filter id={`ember-${title.replace(/\W/g, "")}`} x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="2.8" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        {Array.from({ length: 100 }, (_, index) => {
          const col = index % 10;
          const row = Math.floor(index / 10);
          const kind = kindFor(index, sets);

          return (
            <motion.circle
              key={`${index}-${kind}`}
              className={`dot dot-${kind}`}
              cx={offset + col * gap}
              cy={offset + row * gap}
              r={kind === "neither" ? 4.2 : kind === "both" ? 6.8 : 5.6}
              filter={kind === "both" ? `url(#ember-${title.replace(/\W/g, "")})` : undefined}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.003, duration: 0.3 }}
            />
          );
        })}
      </svg>

      {showStats ? (
        <footer>
          <span>A fails 10%</span>
          <span>B fails 10%</span>
          <span>risk {composedRisk(overlapFailures)}%</span>
          <span>safety {composedSafety(overlapFailures)}%</span>
        </footer>
      ) : null}
    </article>
  );
}
