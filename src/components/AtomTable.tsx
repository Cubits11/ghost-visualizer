import { AtomCounts, atomPercent } from "../data/mathExamples";

interface AtomTableProps {
  atoms: AtomCounts;
  title?: string;
  compact?: boolean;
}

export function AtomTable({ atoms, title, compact = false }: AtomTableProps) {
  return (
    <div className={`atom-table${compact ? " is-compact" : ""}`}>
      {title ? <h4>{title}</h4> : null}
      <div className="atom-grid" role="table" aria-label={title ?? "Atom table"}>
        <div className="atom-cell atom-neither" role="cell">
          <span>neither fails</span>
          <strong>p00</strong>
          <em>{atomPercent(atoms.neither)}</em>
        </div>
        <div className="atom-cell atom-b" role="cell">
          <span>B only</span>
          <strong>p01</strong>
          <em>{atomPercent(atoms.bOnly)}</em>
        </div>
        <div className="atom-cell atom-a" role="cell">
          <span>A only</span>
          <strong>p10</strong>
          <em>{atomPercent(atoms.aOnly)}</em>
        </div>
        <div className="atom-cell atom-both" role="cell">
          <span>both fail</span>
          <strong>p11</strong>
          <em>{atomPercent(atoms.both)}</em>
        </div>
      </div>
    </div>
  );
}
