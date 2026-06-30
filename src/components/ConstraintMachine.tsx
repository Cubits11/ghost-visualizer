import { motion } from "motion/react";
import { IntervalBand } from "./IntervalBand";

export function ConstraintMachine() {
  const inputs = ["marginals", "composition rule", "declared constraints"];

  return (
    <div className="constraint-machine">
      <div className="machine-inputs">
        {inputs.map((input, index) => (
          <motion.div
            key={input}
            className="machine-token"
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 + index * 0.16, duration: 0.5 }}
          >
            <span>input</span>
            <strong>{input}</strong>
          </motion.div>
        ))}
      </div>

      <motion.div
        className="machine-core"
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.55, duration: 0.6 }}
      >
        <div className="press-line press-line-a" />
        <div className="press-line press-line-b" />
        <div className="machine-aperture">
          <span>ATOM LP</span>
          <strong>min / max c^T p</strong>
        </div>
        <div className="machine-rails">
          <span>{"p >= 0"}</span>
          <span>sum p = 1</span>
          <span>P(A fail) = 10%</span>
          <span>P(B fail) = 10%</span>
        </div>
      </motion.div>

      <div className="machine-output">
        <IntervalBand lower={90} upper={100} point={99} label="composed safety" />
        <div className="bound-tags">
          <span>lower witness exists</span>
          <span>upper witness exists</span>
        </div>
      </div>
    </div>
  );
}
