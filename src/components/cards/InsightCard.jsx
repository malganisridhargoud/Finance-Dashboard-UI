import { motion } from "framer-motion";

const toneStyles = {
  neutral: {
    bg: "rgba(255,255,255,0.03)",
    border: "rgba(255,255,255,0.08)",
    icon: "○",
  },
  positive: {
    bg: "rgba(37,99,235,0.06)",
    border: "rgba(37,99,235,0.15)",
    icon: "↑",
  },
  negative: {
    bg: "rgba(239,68,68,0.06)",
    border: "rgba(239,68,68,0.12)",
    icon: "↓",
  },
  warning: {
    bg: "rgba(245,158,11,0.06)",
    border: "rgba(245,158,11,0.12)",
    icon: "△",
  },
};

export default function InsightCard({ title, value, detail, tone = "neutral" }) {
  const style = toneStyles[tone] || toneStyles.neutral;

  return (
    <motion.div
      className="relative overflow-hidden rounded-[20px] p-6 border-glow-animate"
      style={{
        background: style.bg,
        border: `1px solid ${style.border}`,
        backdropFilter: "blur(24px)",
      }}
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
      whileHover={{
        scale: 1.02,
        boxShadow: "0 8px 30px rgba(37,99,235,0.08)",
      }}
    >
      {/* Tone Icon */}
      <motion.span
        className="absolute top-4 right-4 text-lg opacity-30"
        animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        {style.icon}
      </motion.span>

      <p className="text-sm font-medium" style={{ color: "var(--color-text-secondary)" }}>
        {title}
      </p>
      <div
        className="mt-2 text-2xl font-bold"
        style={{ color: "var(--color-text-primary)" }}
      >
        {value}
      </div>
      <p className="mt-2 text-sm" style={{ color: "var(--color-text-muted)" }}>
        {detail}
      </p>
    </motion.div>
  );
}