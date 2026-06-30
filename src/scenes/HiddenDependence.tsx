import { motion } from "motion/react";
import { DotWorld } from "../components/DotWorld";
import { ScoreCard } from "../components/ScoreCard";

export function HiddenDependence() {
  return (
    <div className="scene-layout hidden-dependence-layout">
      <div className="dependence-backdrop" aria-hidden="true">
        <DotWorld
          title="shared failure layer"
          subtitle="hidden behind the polished cards"
          overlapFailures={10}
          variant="shared"
          compact
          showStats={false}
        />
      </div>

      <motion.div
        className="dependence-score-layer"
        initial={{ opacity: 1, y: 0 }}
        animate={{ opacity: 0.82, y: -4 }}
        transition={{ delay: 0.35, duration: 0.7 }}
      >
        <ScoreCard label="Guardrail A" value="90%" caption="visible marginal" delay={0} />
        <ScoreCard label="Guardrail B" value="90%" caption="visible marginal" delay={0.08} />
      </motion.div>

      <motion.div
        className="dependence-question"
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.62 }}
      >
        <span>Do they fail together?</span>
      </motion.div>
    </div>
  );
}
