import { useMemo } from "react";
import { motion } from "motion/react";
import { boundedClaim } from "../data/mathExamples";

export function EvidenceConsole() {
  const timestamp = useMemo(() => new Date().toISOString(), []);
  const lines = [
    ["claim", `composed safety lies in [${boundedClaim.safetyLower}%, ${boundedClaim.safetyUpper}%] under stated assumptions`],
    ["policy hash", boundedClaim.policyHash],
    ["dataset hash", boundedClaim.datasetHash],
    ["interval", `safety [${boundedClaim.safetyLower}%, ${boundedClaim.safetyUpper}%] / risk [${boundedClaim.riskLower}%, ${boundedClaim.riskUpper}%]`],
    ["witnesses", `${boundedClaim.witnessLowerHash} / ${boundedClaim.witnessUpperHash}`],
    ["non-claims", "not a certificate; not deployment proof; not universal truth"],
    ["timestamp", timestamp],
  ];

  return (
    <div className="evidence-console">
      <div className="console-topline">
        <span>GHOST RECEIPT</span>
        <strong>bounded claim assembled</strong>
      </div>
      <div className="console-lines">
        {lines.map(([key, value], index) => (
          <motion.div
            key={key}
            className="console-line"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + index * 0.18, duration: 0.38 }}
          >
            <span>{key}</span>
            <strong>{value}</strong>
          </motion.div>
        ))}
      </div>
      <motion.p
        className="final-line"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.8, duration: 0.6 }}
      >
        Evidence, not vibes.
      </motion.p>
    </div>
  );
}
