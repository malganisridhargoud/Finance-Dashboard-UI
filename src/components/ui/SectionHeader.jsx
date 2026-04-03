import { motion } from "framer-motion";

export default function SectionHeader({ title, description, action }) {
  return (
    <div
      style={{
        marginBottom: 20,
        display: "flex",
        flexWrap: "wrap",
        alignItems: "flex-end",
        justifyContent: "space-between",
        gap: 12,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        {/* Blue dot */}
        <motion.div
          style={{
            width: 6,
            height: 6,
            borderRadius: "50%",
            background: "var(--color-primary)",
            flexShrink: 0,
          }}
          animate={{
            opacity: [0.5, 1, 0.5],
          }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        />
        <div>
          <h2
            style={{
              fontSize: 17,
              fontWeight: 600,
              letterSpacing: "-0.02em",
              color: "var(--color-text-primary)",
            }}
          >
            {title}
          </h2>
          {description && (
            <p
              style={{
                marginTop: 2,
                fontSize: 12,
                fontWeight: 400,
                color: "var(--color-text-muted)",
              }}
            >
              {description}
            </p>
          )}
        </div>
      </div>
      {action && <div>{action}</div>}
    </div>
  );
}