import { motion, useReducedMotion } from "motion/react";
import { IntervalBand } from "./IntervalBand";
import { boundedClaim, toyExample } from "../data/mathExamples";

const inputs = [
  {
    label: "marginals",
    detail: `P(A miss) = ${toyExample.guardrailAFailures}%, P(B miss) = ${toyExample.guardrailBFailures}%`,
  },
  {
    label: "composition rule",
    detail: "system fails only if both miss",
  },
  {
    label: "declared constraints",
    detail: "nonnegative atoms, sums, assumptions",
  },
];

const possibleWorlds = Array.from({ length: 56 }, (_, index) => {
  const angle = index * 2.399963229728653;
  const radiusX = 86 + (index % 7) * 8;
  const radiusY = 42 + (index % 5) * 6;
  const startX = Math.cos(angle) * radiusX;
  const startY = Math.sin(angle) * radiusY;
  const lane = (index % 5) - 2;

  return {
    id: index,
    startX,
    startY,
    midX: startX * 0.72,
    midY: startY * 0.74,
    tightX: startX * 0.52 + lane * 5,
    tightY: startY * 0.56,
    finalX: startX * 0.38 + lane * 7,
    finalY: startY * 0.42,
    endpoint: index % 23 === 0 ? "lower" : index % 19 === 0 ? "upper" : "interior",
  };
});

export function ConstraintMachine() {
  const reducedMotion = useReducedMotion();

  return (
    <div className="constraint-machine">
      <div className="machine-inputs">
        {inputs.map((input, index) => (
          <motion.div
            key={input.label}
            className="machine-token"
            initial={reducedMotion ? false : { opacity: 0, x: -24 }}
            animate={{
              opacity: 1,
              x: 0,
              borderColor: [
                "oklch(74% 0.03 248 / 0.18)",
                "oklch(74% 0.13 210 / 0.6)",
                "oklch(74% 0.03 248 / 0.18)",
              ],
            }}
            transition={{
              delay: reducedMotion ? 0 : 0.2 + index * 0.56,
              duration: reducedMotion ? 0 : 0.68,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <span>input 0{index + 1}</span>
            <strong>{input.label}</strong>
            <em>{input.detail}</em>
            <motion.i
              aria-hidden="true"
              className="machine-token-beam"
              initial={reducedMotion ? false : { scaleX: 0, opacity: 0 }}
              animate={{ scaleX: reducedMotion ? 1 : [0, 1, 0.18], opacity: reducedMotion ? 0.35 : [0, 1, 0.22] }}
              transition={{
                delay: reducedMotion ? 0 : 0.44 + index * 0.56,
                duration: reducedMotion ? 0 : 0.75,
                ease: [0.22, 1, 0.36, 1],
              }}
            />
          </motion.div>
        ))}
      </div>

      <motion.div
        className="machine-core"
        initial={reducedMotion ? false : { opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: reducedMotion ? 0 : 0.55, duration: reducedMotion ? 0 : 0.6 }}
      >
        <div className="press-line press-line-a" />
        <div className="press-line press-line-b" />
        <div className="machine-aperture">
          <span>FEASIBLE WORLDS</span>
          <strong>all joint worlds compatible with evidence</strong>
        </div>
        <div className="world-cloud" aria-hidden="true">
          <motion.div
            className="feasible-hull"
            initial={reducedMotion ? false : { opacity: 0, scaleX: 1.25, scaleY: 1.05 }}
            animate={{ opacity: 1, scaleX: 0.72, scaleY: 0.64 }}
            transition={{ delay: reducedMotion ? 0 : 1.05, duration: reducedMotion ? 0 : 2.7, ease: [0.22, 1, 0.36, 1] }}
          />
          {possibleWorlds.map((world) => (
            <motion.span
              key={world.id}
              className={`world-particle world-particle-${world.endpoint}`}
              initial={
                reducedMotion
                  ? false
                  : { opacity: 0, x: world.startX, y: world.startY, scale: 0.72 }
              }
              animate={{
                opacity: 1,
                x: reducedMotion
                  ? world.finalX
                  : [world.startX, world.midX, world.tightX, world.finalX],
                y: reducedMotion
                  ? world.finalY
                  : [world.startY, world.midY, world.tightY, world.finalY],
                scale: reducedMotion ? 1 : [0.72, 0.86, 0.96, 1],
              }}
              transition={{
                delay: reducedMotion ? 0 : 0.82 + (world.id % 9) * 0.018,
                duration: reducedMotion ? 0 : 3.15,
                times: [0, 0.36, 0.68, 1],
                ease: [0.22, 1, 0.36, 1],
              }}
            />
          ))}
          <motion.div
            className="scan-bar scan-min"
            initial={reducedMotion ? false : { opacity: 0, x: -146 }}
            animate={reducedMotion ? { opacity: 0.78, x: -84 } : { opacity: [0, 1, 1, 0.72], x: [-146, -22, -84, -84] }}
            transition={{ delay: reducedMotion ? 0 : 3.45, duration: reducedMotion ? 0 : 1.25, ease: [0.22, 1, 0.36, 1] }}
          >
            <span>min</span>
          </motion.div>
          <motion.div
            className="scan-bar scan-max"
            initial={reducedMotion ? false : { opacity: 0, x: 146 }}
            animate={reducedMotion ? { opacity: 0.78, x: 84 } : { opacity: [0, 1, 1, 0.72], x: [146, 22, 84, 84] }}
            transition={{ delay: reducedMotion ? 0 : 3.68, duration: reducedMotion ? 0 : 1.25, ease: [0.22, 1, 0.36, 1] }}
          >
            <span>max</span>
          </motion.div>
          <motion.div
            className="endpoint-lock endpoint-lock-lower"
            initial={reducedMotion ? false : { opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: reducedMotion ? 0 : 4.62, duration: reducedMotion ? 0 : 0.36 }}
          >
            {boundedClaim.safetyLower}%
          </motion.div>
          <motion.div
            className="endpoint-lock endpoint-lock-upper"
            initial={reducedMotion ? false : { opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: reducedMotion ? 0 : 4.8, duration: reducedMotion ? 0 : 0.36 }}
          >
            {boundedClaim.safetyUpper}%
          </motion.div>
        </div>
        <div className="machine-rails">
          <span>{"p >= 0"}</span>
          <span>sum p = 1</span>
          <span>P(A miss) = {toyExample.guardrailAFailures}%</span>
          <span>P(B miss) = {toyExample.guardrailBFailures}%</span>
        </div>
        <p className="machine-caption">Bounding every world still compatible with the evidence.</p>
      </motion.div>

      <motion.div
        className="machine-output"
        initial={reducedMotion ? false : { opacity: 0, x: 18 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: reducedMotion ? 0 : 4.88, duration: reducedMotion ? 0 : 0.56 }}
      >
        <IntervalBand
          lower={boundedClaim.safetyLower}
          upper={boundedClaim.safetyUpper}
          label="composed safety"
          caption="The solver returns a bound, not a point, until overlap is specified."
        />
        <div className="bound-tags">
          {["lower witness exists", "upper witness exists"].map((tag, index) => (
            <motion.span
              key={tag}
              initial={reducedMotion ? false : { opacity: 0.35, x: 8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: reducedMotion ? 0 : 5.24 + index * 0.22, duration: reducedMotion ? 0 : 0.34 }}
            >
              {tag}
            </motion.span>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
