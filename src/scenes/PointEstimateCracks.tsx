import { motion, useReducedMotion } from "motion/react";
import { IntervalBand } from "../components/IntervalBand";
import { boundedClaim, independenceBaselineSafety } from "../data/mathExamples";

const fractures = [
  "M178 38 L162 106 L184 151 L171 214 L196 304",
  "M171 143 L106 116 L72 148",
  "M180 154 L236 123 L286 139",
  "M174 213 L117 258 L89 317",
  "M188 219 L255 258 L302 333",
  "M162 105 L214 77 L244 39",
];

export function PointEstimateCracks() {
  const reducedMotion = useReducedMotion();
  const stageDuration = reducedMotion ? 0 : 3.55;
  const revealDelay = reducedMotion ? 0 : 2.65;

  return (
    <div className="scene-layout point-crack-layout">
      <div className="crack-zone" aria-label="Point estimate becomes interval">
        <motion.div
          className="point-estimate-field"
          initial={reducedMotion ? false : { opacity: 0, scale: 0.86 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: reducedMotion ? 0 : 0.85, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div
            className="point-estimate point-estimate-base"
            initial={reducedMotion ? false : { opacity: 0, scale: 0.92 }}
            animate={{
              opacity: reducedMotion ? 0.18 : [0, 1, 1, 0.28],
              scale: reducedMotion ? 0.96 : [0.92, 1, 1.035, 0.96],
              filter: reducedMotion
                ? "blur(0px)"
                : ["blur(8px)", "blur(0px)", "blur(0px)", "blur(1px)"],
            }}
            transition={{
              duration: stageDuration,
              times: [0, 0.2, 0.58, 1],
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <span>point estimate</span>
            <strong>{independenceBaselineSafety}%</strong>
          </motion.div>

          <motion.div
            className="point-estimate estimate-shard estimate-shard-left"
            aria-hidden="true"
            initial={reducedMotion ? false : { opacity: 0, x: 0, rotate: 0 }}
            animate={
              reducedMotion
                ? { opacity: 0 }
                : { opacity: [0, 0, 0.92, 0], x: [0, 0, -58, -118], rotate: [0, 0, -2, -5] }
            }
            transition={{
              duration: stageDuration,
              times: [0, 0.42, 0.68, 1],
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <span>point estimate</span>
            <strong>{independenceBaselineSafety}%</strong>
          </motion.div>
          <motion.div
            className="point-estimate estimate-shard estimate-shard-right"
            aria-hidden="true"
            initial={reducedMotion ? false : { opacity: 0, x: 0, rotate: 0 }}
            animate={
              reducedMotion
                ? { opacity: 0 }
                : { opacity: [0, 0, 0.92, 0], x: [0, 0, 62, 126], rotate: [0, 0, 2, 5] }
            }
            transition={{
              duration: stageDuration,
              times: [0, 0.42, 0.68, 1],
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <span>point estimate</span>
            <strong>{independenceBaselineSafety}%</strong>
          </motion.div>

          <svg className="fracture-map" viewBox="0 0 360 360" aria-hidden="true">
            {fractures.map((path, index) => (
              <motion.path
                key={path}
                d={path}
                pathLength="1"
                initial={reducedMotion ? false : { pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: reducedMotion ? 0.72 : [0, 1, 0.92, 0.25] }}
                transition={{
                  delay: reducedMotion ? 0 : 0.78 + index * 0.08,
                  duration: reducedMotion ? 0 : 0.86,
                  ease: [0.22, 1, 0.36, 1],
                }}
              />
            ))}
          </svg>

          <motion.div
            className="interval-born"
            initial={reducedMotion ? false : { opacity: 0, scaleX: 0.16 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ delay: revealDelay, duration: reducedMotion ? 0 : 0.82, ease: [0.22, 1, 0.36, 1] }}
          >
            <strong>{boundedClaim.safetyLower}%</strong>
            <span />
            <strong>{boundedClaim.safetyUpper}%</strong>
          </motion.div>
        </motion.div>

        <motion.p
          className="crack-thesis"
          initial={reducedMotion ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: reducedMotion ? 0 : 3.08, duration: reducedMotion ? 0 : 0.5 }}
        >
          A point estimate hides the feasible set.
        </motion.p>
      </div>

      <motion.div
        className="interval-reveal"
        initial={reducedMotion ? false : { opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: reducedMotion ? 0 : 3.34, duration: reducedMotion ? 0 : 0.65 }}
      >
        <IntervalBand
          lower={boundedClaim.safetyLower}
          upper={boundedClaim.safetyUpper}
          label="honest composed safety interval"
        />
        <p>An interval says what the evidence permits.</p>
      </motion.div>
    </div>
  );
}
