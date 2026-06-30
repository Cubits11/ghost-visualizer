import { motion } from "motion/react";

interface IntervalBandProps {
  lower: number;
  upper: number;
  point?: number;
  label: string;
  unit?: string;
  tone?: "truth" | "risk";
}

export function IntervalBand({ lower, upper, point, label, unit = "%", tone = "truth" }: IntervalBandProps) {
  const span = Math.max(1, upper - lower);
  const pointPosition = point === undefined ? undefined : ((point - lower) / span) * 100;

  return (
    <div className={`interval-band tone-${tone}`}>
      <div className="interval-head">
        <span>{label}</span>
        <strong>
          [{lower}
          {unit}, {upper}
          {unit}]
        </strong>
      </div>
      <div className="interval-track">
        <motion.div
          className="interval-fill"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        />
        {pointPosition !== undefined ? (
          <motion.div
            className="interval-point"
            style={{ left: `${pointPosition}%` }}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.7, duration: 0.35 }}
          >
            <span>{point}{unit}</span>
          </motion.div>
        ) : null}
      </div>
    </div>
  );
}
