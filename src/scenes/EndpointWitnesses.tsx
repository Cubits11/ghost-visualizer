import { WitnessCard } from "../components/WitnessCard";
import { sampleReceipt } from "../evidence/sampleReceipt";

const lowerWitness = sampleReceipt.witnesses.find((witness) => witness.kind === "lower-bound");
const upperWitness = sampleReceipt.witnesses.find((witness) => witness.kind === "upper-bound");

export function EndpointWitnesses() {
  if (!lowerWitness || !upperWitness) {
    return null;
  }

  return (
    <div className="scene-layout endpoint-witnesses-layout">
      <div className="witness-grid">
        <WitnessCard
          title="Lower-bound safety witness"
          subtitle="shared miss endpoint"
          witness={lowerWitness}
        />
        <WitnessCard
          title="Upper-bound safety witness"
          subtitle="separated miss endpoint"
          witness={upperWitness}
        />
      </div>
    </div>
  );
}
