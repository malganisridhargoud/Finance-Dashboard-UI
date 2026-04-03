import { motion } from "framer-motion";

const toneStyles = {
  neutral: {
    bg: "rgba(28, 28, 30, 0.65)",
    border: "rgba(255,255,255,0.08)",
  },
  positive: {
    bg: "rgba(37,99,235,0.08)",
    border: "rgba(37,99,235,0.15)",
  },
  negative: {
    bg: "rgba(255,59,48,0.08)",
    border: "rgba(255,59,48,0.12)",
  },
  warning: {
    bg: "rgba(255,149,0,0.08)",
    border: "rgba(255,149,0,0.12)",
  },
};

export default function InsightCard({ title, value, detail, tone = "neutral" }) {
  const style = toneStyles[tone] || toneStyles.neutral;

  return (
    <motion.div
      className="relative overflow-hidden"
      style={{
        background: style.bg,
        border: `1px solid ${style.border}`,
        borderRadius: "var(--radius-card)",
        backdropFilter: "blur(20px)",
        padding: "20px 22px",
      }}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
      whileHover={{ scale: 1.01 }}
    >
      <p
        style={{
          fontSize: 12,
          fontWeight: 500,
          color: "var(--color-text-muted)",
          letterSpacing: "0.02em",
          textTransform: "uppercase",
        }}
      >
        {title}
      </p>
      <div
        style={{
          marginTop: 6,
          fontSize: 20,
          fontWeight: 600,
          letterSpacing: "-0.02em",
          color: "var(--color-text-primary)",
        }}
      >
        {value}
      </div>
      <p
        style={{
          marginTop: 6,
          fontSize: 11,
          fontWeight: 400,
          color: "var(--color-text-muted)",
          lineHeight: 1.5,
        }}
      >
        {detail}
      </p>
    </motion.div>
  );
}