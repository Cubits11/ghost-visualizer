import { useMemo } from "react";
import { motion, useReducedMotion } from "motion/react";
import { boundedClaim } from "../data/mathExamples";
import { sampleReceipt } from "../evidence/sampleReceipt";

const rejectedClaims = ["safe", "guaranteed", "deployment proof", "universal truth"];

export function EvidenceConsole() {
  const reducedMotion = useReducedMotion();
  const timestamp = useMemo(() => new Date().toISOString(), []);
  const witnessIds = sampleReceipt.witnesses.map((witness) => witness.id).join(" / ");
  const lines = [
    ["assumptions", `${sampleReceipt.assumptions.length} stated assumptions`],
    [
      "interval",
      `safety [${boundedClaim.safetyLower}%, ${boundedClaim.safetyUpper}%] / risk [${boundedClaim.riskLower}%, ${boundedClaim.riskUpper}%]`,
    ],
    ["witnesses", witnessIds],
    ["non-claims", `${sampleReceipt.nonClaims.length} explicit non-claims`],
    ["demo ids", `${sampleReceipt.policyId} / ${sampleReceipt.datasetId}`],
    ["timestamp", timestamp],
  ];
  const claim = sampleReceipt.boundedClaim.statement;

  return (
    <div className="receipt-theater">
      <div className="rejected-claims" aria-hidden="true">
        {rejectedClaims.map((text, index) => (
          <motion.div
            key={text}
            className={`non-claim non-claim-${index + 1}`}
            initial={reducedMotion ? false : { opacity: 0, x: 0, y: 0, scale: 0.9 }}
            animate={
              reducedMotion
                ? { opacity: 0.78, scale: 1 }
                : {
                    opacity: [0, 1, 1],
                    x: index % 2 === 0 ? [0, 78, 16] : [0, -86, -16],
                    y: index < 2 ? [0, 8, -4] : [0, -8, 5],
                    scale: [0.9, 1, 0.96],
                  }
            }
            transition={{
              delay: reducedMotion ? 0 : 0.78 + index * 0.42,
              duration: reducedMotion ? 0 : 0.82,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <span>{text}</span>
            <motion.strong
              initial={reducedMotion ? false : { opacity: 0, scale: 0.62, rotate: -6 }}
              animate={{ opacity: 1, scale: 1, rotate: -6 }}
              transition={{
                delay: reducedMotion ? 0 : 1.18 + index * 0.42,
                duration: reducedMotion ? 0 : 0.24,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              NON-CLAIM
            </motion.strong>
          </motion.div>
        ))}
      </div>

      <motion.div
        className="claim-boundary"
        initial={reducedMotion ? false : { opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: reducedMotion ? 0 : 0.18, duration: reducedMotion ? 0 : 0.58 }}
      >
        <div className="evidence-console">
          <div className="console-topline">
            <span>GHOST RECEIPT</span>
            <strong>bounded claim assembled</strong>
          </div>
          <motion.p
            className="receipt-main-claim"
            initial={reducedMotion ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: reducedMotion ? 0 : 0.62, duration: reducedMotion ? 0 : 0.44 }}
          >
            {claim}
          </motion.p>
          <div className="console-lines">
            {lines.map(([key, value], index) => (
              <motion.div
                key={key}
                className="console-line"
                initial={reducedMotion ? false : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: reducedMotion ? 0 : 1.18 + index * 0.17,
                  duration: reducedMotion ? 0 : 0.34,
                }}
              >
                <span>{key}</span>
                <strong>{value}</strong>
              </motion.div>
            ))}
          </div>
          <motion.p
            className="final-line"
            initial={reducedMotion ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: reducedMotion ? 0 : 2.55, duration: reducedMotion ? 0 : 0.54 }}
          >
            EVIDENCE, NOT VIBES
          </motion.p>
        </div>
      </motion.div>
    </div>
  );
}
