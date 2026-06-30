import { motion } from "motion/react";
import { DotWorld } from "../components/DotWorld";
import { ScoreCard } from "../components/ScoreCard";
import { toyExample } from "../data/mathExamples";

export function HiddenDependence() {
  return (
    <div className="scene-layout hidden-dependence-layout">
      <div className="dependence-backdrop" aria-hidden="true">
        <DotWorld
          title="shared miss layer"
          subtitle="the hidden variable is overlap"
          overlapFailures={toyExample.maxOverlap}
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
        <ScoreCard
          label="Guardrail A"
          value={`${toyExample.guardrailACatches}%`}
          caption="visible marginal"
          delay={0}
        />
        <ScoreCard
          label="Guardrail B"
          value={`${toyExample.guardrailBCatches}%`}
          caption="visible marginal"
          delay={0.08}
        />
      </motion.div>

      <motion.div
        className="dependence-question"
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.62 }}
      >
        <span>Hidden variable: overlap</span>
      </motion.div>
    </div>
  );
}
