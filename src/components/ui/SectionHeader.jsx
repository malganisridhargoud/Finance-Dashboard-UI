import { motion } from "framer-motion";

export default function SectionHeader({ title, description, action }) {
  return (
    <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
      <div className="flex items-start gap-3">
        {/* Pulsing Blue Dot */}
        <motion.div
          className="mt-2 rounded-full flex-shrink-0"
          style={{
            width: 8,
            height: 8,
            background: "#2563EB",
            boxShadow: "0 0 8px rgba(37,99,235,0.5)",
          }}
          animate={{
            scale: [0.8, 1.3, 0.8],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
        <div>
          <h2
            className="text-xl font-bold"
            style={{ color: "var(--color-text-primary)" }}
          >
            {title}
          </h2>
          {description && (
            <p className="mt-1 text-sm" style={{ color: "var(--color-text-muted)" }}>
              {description}
            </p>
          )}
          {/* Animated Underline */}
          <motion.div
            className="mt-2 h-[2px] rounded-full"
            style={{
              background: "linear-gradient(90deg, #2563EB, transparent)",
            }}
            initial={{ width: 0 }}
            animate={{ width: 60 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.34, 1.56, 0.64, 1] }}
          />
        </div>
      </div>
      {action && <div>{action}</div>}
    </div>
  );
}