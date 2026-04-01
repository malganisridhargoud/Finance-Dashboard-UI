import { motion } from "framer-motion";

export default function Button({
  children,
  variant = "primary",
  className = "",
  ...props
}) {
  const styles = {
    primary: {
      background: "linear-gradient(135deg, #2563EB, #1D4ED8)",
      color: "#fff",
      boxShadow: "0 4px 20px rgba(37,99,235,0.3), 0 0 0 1px rgba(37,99,235,0.2)",
    },
    secondary: {
      background: "rgba(255,255,255,0.05)",
      color: "#E2E8F0",
      border: "1px solid rgba(255,255,255,0.1)",
    },
    danger: {
      background: "linear-gradient(135deg, #DC2626, #B91C1C)",
      color: "#fff",
      boxShadow: "0 4px 20px rgba(220,38,38,0.25)",
    },
    ghost: {
      background: "transparent",
      color: "#E2E8F0",
      border: "1px solid rgba(255,255,255,0.08)",
    },
  };

  return (
    <motion.button
      className={`relative overflow-hidden inline-flex items-center justify-center rounded-xl px-5 py-2.5 text-sm font-semibold tracking-wide disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
      style={{
        ...styles[variant],
        cursor: "pointer",
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
      }}
      whileHover={{
        scale: 1.04,
        boxShadow:
          variant === "primary"
            ? "0 8px 30px rgba(37,99,235,0.45), 0 0 0 1px rgba(37,99,235,0.3)"
            : variant === "danger"
            ? "0 8px 30px rgba(220,38,38,0.35)"
            : "0 4px 20px rgba(255,255,255,0.06)",
      }}
      whileTap={{ scale: 0.97 }}
      {...props}
    >
      {children}
    </motion.button>
  );
}