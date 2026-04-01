import { motion } from "framer-motion";
import Button from "./Button";

export default function EmptyState({
  title = "No data found",
  description = "Try changing filters or add a new transaction.",
  actionLabel,
  onAction,
}) {
  return (
    <motion.div
      className="glass-card p-10 text-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Floating SVG Illustration */}
      <motion.div
        className="mx-auto mb-5"
        style={{ width: 80, height: 80 }}
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      >
        <svg
          viewBox="0 0 80 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          width="80"
          height="80"
        >
          {/* Box */}
          <rect
            x="20"
            y="28"
            width="40"
            height="32"
            rx="4"
            stroke="#2563EB"
            strokeWidth="1.5"
            fill="rgba(37,99,235,0.05)"
          />
          {/* Lid */}
          <path
            d="M16 28 L40 16 L64 28"
            stroke="#2563EB"
            strokeWidth="1.5"
            fill="none"
            strokeLinecap="round"
          />
          {/* Particles */}
          <motion.circle
            cx="30"
            cy="20"
            r="2"
            fill="#2563EB"
            animate={{ opacity: [0.2, 0.8, 0.2], y: [0, -4, 0] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0 }}
          />
          <motion.circle
            cx="50"
            cy="14"
            r="1.5"
            fill="#06B6D4"
            animate={{ opacity: [0.3, 0.7, 0.3], y: [0, -5, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
          />
          <motion.circle
            cx="42"
            cy="10"
            r="1"
            fill="#3B82F6"
            animate={{ opacity: [0.2, 0.9, 0.2], y: [0, -3, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, delay: 0.3 }}
          />
        </svg>
      </motion.div>

      <h3
        className="text-lg font-bold"
        style={{ color: "var(--color-text-primary)" }}
      >
        {title}
      </h3>
      <p className="mt-2 text-sm" style={{ color: "var(--color-text-muted)" }}>
        {description}
      </p>
      {actionLabel && onAction ? (
        <div className="mt-6">
          <Button onClick={onAction}>{actionLabel}</Button>
        </div>
      ) : null}
    </motion.div>
  );
}