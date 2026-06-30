import { WitnessCard } from "../components/WitnessCard";
import {
  lowerSafetyWitness,
  toyExample,
  upperSafetyWitness,
} from "../data/mathExamples";

export function EndpointWitnesses() {
  return (
    <div className="scene-layout endpoint-witnesses-layout">
      <div className="witness-grid">
        <WitnessCard
          title="Lower-bound safety witness"
          subtitle="shared blind spot endpoint"
          atoms={lowerSafetyWitness}
          overlapFailures={toyExample.maxOverlap}
          safety={90}
          risk={10}
        />
        <WitnessCard
          title="Upper-bound safety witness"
          subtitle="separated failure endpoint"
          atoms={upperSafetyWitness}
          overlapFailures={toyExample.minOverlap}
          safety={100}
          risk={0}
        />
      </div>
    </div>
  );
}
