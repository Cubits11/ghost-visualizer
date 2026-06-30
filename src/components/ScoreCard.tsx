import { motion } from "motion/react";

interface ScoreCardProps {
  label: string;
  value: string;
  caption?: string;
  tone?: "safe" | "warning" | "evidence" | "truth";
  delay?: number;
}

export function ScoreCard({ label, value, caption, tone = "safe", delay = 0 }: ScoreCardProps) {
  return (
    <motion.article
      className={`score-card tone-${tone}`}
      initial={{ opacity: 0, y: 18, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay, duration: 0.58, ease: [0.22, 1, 0.36, 1] }}
    >
      <span>{label}</span>
      <strong>{value}</strong>
      {caption ? <p>{caption}</p> : null}
    </motion.article>
  );
}
