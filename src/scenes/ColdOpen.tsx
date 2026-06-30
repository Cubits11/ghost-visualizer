import { motion } from "motion/react";
import { ScoreCard } from "../components/ScoreCard";
import { toyExample } from "../data/mathExamples";

export function ColdOpen() {
  return (
    <div className="scene-layout cold-open-layout">
      <div className="shield-field" aria-hidden="true">
        <motion.div
          className="shield shield-a"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.62, scale: 1 }}
          transition={{ delay: 0.25, duration: 0.85 }}
        />
        <motion.div
          className="shield shield-b"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.5, scale: 1 }}
          transition={{ delay: 0.38, duration: 0.85 }}
        />
      </div>

      <div className="false-certainty">
        <ScoreCard
          label="Published safety score"
          value={`${toyExample.guardrailACatches}%`}
          caption="100 harmful prompts, one official-looking marginal"
          tone="evidence"
          delay={0.08}
        />
        <div className="marginal-pair" aria-label="Visible guardrail marginals">
          <span>Guardrail A: {toyExample.guardrailACatches}%</span>
          <span>Guardrail B: {toyExample.guardrailBCatches}%</span>
        </div>
        <motion.p
          className="therefore-safe"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.92, duration: 0.5 }}
        >
          Therefore: safe?
        </motion.p>
      </div>

      <motion.div
        className="quiet-warning"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.05, duration: 0.8 }}
      >
        <span>A single number can look finished before the evidence is finished.</span>
      </motion.div>
    </div>
  );
}
