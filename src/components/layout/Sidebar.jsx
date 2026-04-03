import { NavLink, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { useFinanceStore } from "../../store/useFinanceStore";

const navItems = [
  {
    to: "/",
    label: "Dashboard",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7" rx="1.5" />
        <rect x="14" y="3" width="7" height="7" rx="1.5" />
        <rect x="3" y="14" width="7" height="7" rx="1.5" />
        <rect x="14" y="14" width="7" height="7" rx="1.5" />
      </svg>
    ),
  },
  {
    to: "/transactions",
    label: "Transactions",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    ),
  },
  {
    to: "/insights",
    label: "Insights",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 3v18h18" />
        <path d="m7 17 4-8 4 4 4-6" />
      </svg>
    ),
  },
];

export default function Sidebar() {
  const location = useLocation();
  const role = useFinanceStore((s) => s.role);

  return (
    <motion.aside
      style={{
        position: "fixed",
        left: 0,
        top: 0,
        bottom: 0,
        zIndex: 50,
        width: 220,
        background: "rgba(0, 0, 0, 0.65)",
        borderRight: "1px solid rgba(255,255,255,0.06)",
        backdropFilter: "blur(40px)",
        WebkitBackdropFilter: "blur(40px)",
        display: "flex",
        flexDirection: "column",
        padding: "24px 12px",
      }}
      initial={{ x: -220, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {/* Logo */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "0 8px", marginBottom: 32 }}>
        <div
          style={{
            width: 32,
            height: 32,
            borderRadius: 8,
            background: "linear-gradient(135deg, #2563EB, #3B82F6)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 2px 12px rgba(37,99,235,0.3)",
          }}
        >
          <span style={{ color: "#fff", fontWeight: 700, fontSize: 14 }}>F</span>
        </div>
        <span style={{ fontSize: 15, fontWeight: 600, color: "#F5F5F7", letterSpacing: "-0.02em" }}>
          Finance
        </span>
      </div>

      {/* Nav */}
      <nav style={{ display: "flex", flexDirection: "column", gap: 2, flex: 1 }}>
        <p style={{ fontSize: 10, fontWeight: 600, color: "#6E6E73", textTransform: "uppercase", letterSpacing: "0.08em", padding: "0 12px", marginBottom: 8 }}>
          Menu
        </p>
        {navItems.map((item) => {
          const isActive = location.pathname === item.to;
          return (
            <NavLink key={item.to} to={item.to} style={{ textDecoration: "none" }}>
              <motion.div
                style={{
                  position: "relative",
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  padding: "9px 12px",
                  borderRadius: 10,
                  cursor: "pointer",
                  color: isActive ? "#F5F5F7" : "#6E6E73",
                  background: isActive ? "rgba(37,99,235,0.12)" : "transparent",
                  fontSize: 13,
                  fontWeight: isActive ? 600 : 500,
                  letterSpacing: "-0.01em",
                }}
                whileHover={{
                  background: isActive ? "rgba(37,99,235,0.15)" : "rgba(255,255,255,0.04)",
                  color: "#F5F5F7",
                }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.15 }}
              >
                {isActive && (
                  <motion.div
                    style={{
                      position: "absolute",
                      left: 0,
                      top: "50%",
                      transform: "translateY(-50%)",
                      width: 3,
                      height: 16,
                      borderRadius: 2,
                      background: "#2563EB",
                      boxShadow: "0 0 8px rgba(37,99,235,0.5)",
                    }}
                    layoutId="nav-indicator"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                {item.icon}
                {item.label}
              </motion.div>
            </NavLink>
          );
        })}
      </nav>

      {/* Bottom */}
      <div style={{ padding: "0 8px" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            padding: "10px 12px",
            borderRadius: 10,
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <div
            style={{
              width: 28,
              height: 28,
              borderRadius: "50%",
              background: role === "admin" ? "rgba(37,99,235,0.15)" : "rgba(255,255,255,0.06)",
              border: `1px solid ${role === "admin" ? "rgba(37,99,235,0.25)" : "rgba(255,255,255,0.08)"}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 11,
              fontWeight: 600,
              color: role === "admin" ? "#60A5FA" : "#6E6E73",
            }}
          >
            {role === "admin" ? "A" : "V"}
          </div>
          <div>
            <p style={{ fontSize: 11, fontWeight: 600, color: "#F5F5F7" }}>
              {role === "admin" ? "Admin" : "Viewer"}
            </p>
            <p style={{ fontSize: 10, color: "#6E6E73" }}>
              {role === "admin" ? "Full access" : "Read only"}
            </p>
          </div>
        </div>
      </div>
    </motion.aside>
  );
}
