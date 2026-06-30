import type { EndpointWitness } from "../math/guardrailComposition";
import { AtomTable } from "./AtomTable";
import { DotWorld } from "./DotWorld";

interface WitnessCardProps {
  title: string;
  subtitle: string;
  witness: EndpointWitness;
}

function percent(value: number) {
  return `${Math.round(value * 100)}%`;
}

export function WitnessCard({ title, subtitle, witness }: WitnessCardProps) {
  const overlapFailures = Math.round(witness.atomCounts.p00);
  const total =
    witness.atomCounts.p00 + witness.atomCounts.p01 + witness.atomCounts.p10 + witness.atomCounts.p11;

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
        <AtomTable counts={witness.atomCounts} total={total} compact />
      </div>

      <footer>
        <span>safety {percent(witness.composedOrBlockRate)}</span>
        <span>risk {percent(witness.composedOrPassRate)}</span>
        <span>constraints satisfied</span>
      </footer>
    </article>
  );
}
