import { motion } from "framer-motion";
import { useFinanceStore } from "../../store/useFinanceStore";

export default function RoleToggle() {
  const role = useFinanceStore((s) => s.role);
  const setRole = useFinanceStore((s) => s.setRole);

  return (
    <div
      className="relative flex items-center gap-1 rounded-xl p-1"
      style={{
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      {/* Sliding Pill Indicator */}
      <motion.div
        className="absolute rounded-lg"
        style={{
          height: "calc(100% - 8px)",
          width: "calc(50% - 4px)",
          top: 4,
          background: "linear-gradient(135deg, #2563EB, #1D4ED8)",
          boxShadow: "0 2px 12px rgba(37,99,235,0.35)",
        }}
        animate={{
          left: role === "viewer" ? 4 : "calc(50%)",
        }}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 30,
        }}
      />

      <button
        onClick={() => setRole("viewer")}
        className="relative z-10 rounded-lg px-5 py-2 text-sm font-semibold transition-colors duration-200"
        style={{
          color: role === "viewer" ? "#fff" : "#64748B",
          flex: 1,
          cursor: "pointer",
        }}
      >
        Viewer
      </button>
      <button
        onClick={() => setRole("admin")}
        className="relative z-10 rounded-lg px-5 py-2 text-sm font-semibold transition-colors duration-200"
        style={{
          color: role === "admin" ? "#fff" : "#64748B",
          flex: 1,
          cursor: "pointer",
        }}
      >
        Admin
      </button>
    </div>
  );
}