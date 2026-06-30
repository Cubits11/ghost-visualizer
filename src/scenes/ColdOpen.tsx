import { motion } from "motion/react";
import { ScoreCard } from "../components/ScoreCard";

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

      <div className="score-stack">
        <ScoreCard label="Guardrail A" value="90%" caption="individual score" delay={0.1} />
        <ScoreCard label="Guardrail B" value="90%" caption="individual score" delay={0.22} />
        <ScoreCard
          label="Combined"
          value="99%"
          caption="independence baseline"
          tone="evidence"
          delay={0.36}
        />
      </div>

      <motion.div
        className="quiet-warning"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.05, duration: 0.8 }}
      >
        <span>A score can feel like truth.</span>
      </motion.div>
    </div>
  );
}
