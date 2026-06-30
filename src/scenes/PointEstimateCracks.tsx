import { motion } from "motion/react";
import { IntervalBand } from "../components/IntervalBand";
import { boundedClaim } from "../data/mathExamples";

export function PointEstimateCracks() {
  return (
    <div className="scene-layout point-crack-layout">
      <div className="crack-zone" aria-label="Point estimate becomes interval">
        <motion.div
          className="point-estimate"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: [0, 1, 1, 0.22], scale: [0.9, 1, 1.04, 0.92], x: [0, 0, -10, 12] }}
          transition={{ duration: 1.7, times: [0, 0.28, 0.58, 1], ease: [0.22, 1, 0.36, 1] }}
        >
          <span>point estimate</span>
          <strong>99%</strong>
          <i className="crack crack-a" />
          <i className="crack crack-b" />
          <i className="crack crack-c" />
        </motion.div>
      </div>

      <motion.div
        className="interval-reveal"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.05, duration: 0.65 }}
      >
        <IntervalBand
          lower={boundedClaim.safetyLower}
          upper={boundedClaim.safetyUpper}
          point={99}
          label="honest composed safety interval"
        />
        <p>An interval says what the evidence permits.</p>
      </motion.div>
    </div>
  );
}
