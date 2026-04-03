import { motion } from "framer-motion";
import { useFinanceStore } from "../../store/useFinanceStore";

export default function RoleToggle() {
  const role = useFinanceStore((s) => s.role);
  const setRole = useFinanceStore((s) => s.setRole);

  return (
    <div
      style={{
        position: "relative",
        display: "flex",
        alignItems: "center",
        gap: 1,
        borderRadius: 10,
        padding: 3,
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      <motion.div
        style={{
          position: "absolute",
          height: "calc(100% - 6px)",
          width: "calc(50% - 3px)",
          top: 3,
          borderRadius: 8,
          background: "#2563EB",
          boxShadow: "0 1px 8px rgba(37,99,235,0.3)",
        }}
        animate={{
          left: role === "viewer" ? 3 : "calc(50%)",
        }}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 30,
        }}
      />

      {["viewer", "admin"].map((r) => (
        <button
          key={r}
          onClick={() => setRole(r)}
          style={{
            position: "relative",
            zIndex: 1,
            borderRadius: 8,
            padding: "7px 18px",
            fontSize: 12,
            fontWeight: 500,
            color: role === r ? "#fff" : "#6E6E73",
            flex: 1,
            cursor: "pointer",
            background: "none",
            border: "none",
            outline: "none",
            textTransform: "capitalize",
            transition: "color 0.2s",
          }}
        >
          {r}
        </button>
      ))}
    </div>
  );
}