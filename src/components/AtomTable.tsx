import type { AtomKey } from "../math/guardrailComposition";
import { atomPercent } from "../data/mathExamples";

interface AtomTableProps {
  counts: Record<AtomKey, number>;
  total: number;
  title?: string;
  compact?: boolean;
}

const cells: Array<{
  key: AtomKey;
  className: string;
  label: string;
  symbol: string;
  description: string;
}> = [
  {
    key: "p00",
    className: "atom-shared-miss",
    label: "Shared Miss",
    symbol: "p00",
    description: "neither guardrail catches it · danger cell",
  },
  {
    key: "p01",
    className: "atom-b",
    label: "B Only",
    symbol: "p01",
    description: "only B blocks",
  },
  {
    key: "p10",
    className: "atom-a",
    label: "A Only",
    symbol: "p10",
    description: "only A blocks",
  },
  {
    key: "p11",
    className: "atom-both-block",
    label: "Both Block",
    symbol: "p11",
    description: "both guardrails catch it · confirmed block overlap",
  },
];

export function AtomTable({
  counts,
  total,
  title,
  compact = false,
}: AtomTableProps) {
  return (
    <div className={`atom-table${compact ? " is-compact" : ""}`}>
      {title ? <h4>{title}</h4> : null}
      <div
        className="atom-grid"
        role="table"
        aria-label={title ?? "Block atom table"}
      >
        {cells.map((cell) => (
          <div
            key={cell.key}
            className={`atom-cell ${cell.className}`}
            role="cell"
          >
            <span>{cell.symbol}</span>
            <strong>{cell.label}</strong>
            <em>
              {cell.description} · {atomPercent(counts[cell.key], total)}
            </em>
          </div>
        ))}
      </div>
    </div>
  );
}
