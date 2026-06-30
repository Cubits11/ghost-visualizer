import { AtomCounts } from "../data/mathExamples";
import { AtomTable } from "./AtomTable";
import { DotWorld } from "./DotWorld";

interface WitnessCardProps {
  title: string;
  subtitle: string;
  atoms: AtomCounts;
  overlapFailures: number;
  safety: number;
  risk: number;
}

export function WitnessCard({
  title,
  subtitle,
  atoms,
  overlapFailures,
  safety,
  risk,
}: WitnessCardProps) {
  return (
    <article className="witness-card">
      <header>
        <div>
          <p className="scene-kicker">{subtitle}</p>
          <h3>{title}</h3>
        </div>
        <span className="stamp">verified</span>
      </header>

      <div className="witness-body">
        <DotWorld
          title={title}
          overlapFailures={overlapFailures}
          variant={overlapFailures === 0 ? "separated" : "shared"}
          compact
          showStats={false}
        />
        <AtomTable atoms={atoms} compact />
      </div>

      <footer>
        <span>safety {safety}%</span>
        <span>risk {risk}%</span>
        <span>constraints satisfied</span>
      </footer>
    </article>
  );
}
