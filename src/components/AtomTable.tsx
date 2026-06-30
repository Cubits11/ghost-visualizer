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
}> = [
  {
    key: "p00",
    className: "atom-shared-miss",
    label: "shared miss",
    symbol: "p00",
  },
  {
    key: "p01",
    className: "atom-b",
    label: "B only blocks",
    symbol: "p01",
  },
  {
    key: "p10",
    className: "atom-a",
    label: "A only blocks",
    symbol: "p10",
  },
  {
    key: "p11",
    className: "atom-both-block",
    label: "both block",
    symbol: "p11",
  },
];

export function AtomTable({ counts, total, title, compact = false }: AtomTableProps) {
  return (
    <div className={`atom-table${compact ? " is-compact" : ""}`}>
      {title ? <h4>{title}</h4> : null}
      <div className="atom-grid" role="table" aria-label={title ?? "Block atom table"}>
        {cells.map((cell) => (
          <div key={cell.key} className={`atom-cell ${cell.className}`} role="cell">
            <span>{cell.label}</span>
            <strong>{cell.symbol}</strong>
            <em>{atomPercent(counts[cell.key], total)}</em>
          </div>
        ))}
      </div>
    </div>
  );
}
