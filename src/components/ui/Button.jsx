import { motion } from "framer-motion";

const variantStyles = {
  primary: {
    background: "#2563EB",
    color: "#fff",
    border: "none",
    hover: { background: "#3B82F6" },
  },
  secondary: {
    background: "transparent",
    color: "var(--color-text-secondary)",
    border: "1px solid var(--color-border)",
    hover: { background: "rgba(255,255,255,0.04)", color: "#F5F5F7", borderColor: "rgba(255,255,255,0.12)" },
  },
  ghost: {
    background: "transparent",
    color: "var(--color-text-muted)",
    border: "none",
    hover: { background: "rgba(255,255,255,0.04)", color: "#F5F5F7" },
  },
  danger: {
    background: "transparent",
    color: "#F87171",
    border: "1px solid rgba(248,113,113,0.15)",
    hover: { background: "rgba(248,113,113,0.08)" },
  },
};

export default function Button({ children, variant = "primary", onClick, className, ...props }) {
  const styles = variantStyles[variant] || variantStyles.primary;

  return (
    <motion.button
      onClick={onClick}
      style={{
        padding: "7px 14px",
        borderRadius: 8,
        fontSize: 12,
        fontWeight: 500,
        cursor: "pointer",
        outline: "none",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 6,
        background: styles.background,
        color: styles.color,
        border: styles.border,
        letterSpacing: "-0.01em",
      }}
      whileHover={styles.hover}
      whileTap={{ scale: 0.97 }}
      transition={{ duration: 0.15 }}
      {...props}
    >
      {children}
    </motion.button>
  );
}