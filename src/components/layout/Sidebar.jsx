import { NavLink, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { useFinanceStore } from "../../store/useFinanceStore";
import Badge from "../ui/Badge";

const navItems = [
  {
    to: "/",
    label: "Dashboard",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
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
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    ),
  },
  {
    to: "/insights",
    label: "Insights",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 12a9 9 0 1 1-9-9" />
        <path d="M21 3v6h-6" />
        <path d="m3 12 4-4 4 6 4-8 4 4" />
      </svg>
    ),
  },
];

const sidebarVariants = {
  initial: { x: -80, opacity: 0 },
  animate: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.6, ease: [0.34, 1.56, 0.64, 1] },
  },
};

export default function Sidebar() {
  const location = useLocation();
  const role = useFinanceStore((s) => s.role);

  return (
    <motion.aside
      className="fixed left-0 top-0 bottom-0 z-50 flex flex-col items-center py-6 px-3 group"
      style={{
        width: 72,
        background: "rgba(10, 10, 15, 0.85)",
        borderRight: "1px solid rgba(255,255,255,0.05)",
        backdropFilter: "blur(24px)",
      }}
      variants={sidebarVariants}
      initial="initial"
      animate="animate"
    >
      {/* Logo Mark */}
      <motion.div
        className="flex items-center justify-center mb-8 rounded-2xl"
        style={{
          width: 44,
          height: 44,
          background: "linear-gradient(135deg, #2563EB, #06B6D4)",
          boxShadow: "0 4px 20px rgba(37, 99, 235, 0.3)",
        }}
        whileHover={{ scale: 1.1, rotate: 5 }}
        whileTap={{ scale: 0.95 }}
      >
        <span className="text-white font-black text-lg">F</span>
      </motion.div>

      {/* Nav Items */}
      <nav className="flex flex-col gap-2 flex-1">
        {navItems.map((item) => {
          const isActive = location.pathname === item.to;
          return (
            <NavLink key={item.to} to={item.to}>
              <motion.div
                className="relative flex items-center justify-center rounded-xl cursor-pointer"
                style={{
                  width: 48,
                  height: 48,
                  color: isActive ? "#fff" : "#64748B",
                  background: isActive
                    ? "rgba(37, 99, 235, 0.15)"
                    : "transparent",
                }}
                whileHover={{
                  background: isActive
                    ? "rgba(37, 99, 235, 0.2)"
                    : "rgba(255,255,255,0.05)",
                  color: "#fff",
                  scale: 1.05,
                }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                {item.icon}
                {isActive && (
                  <motion.div
                    className="absolute left-0 rounded-full"
                    style={{
                      width: 3,
                      height: 20,
                      background: "#2563EB",
                      boxShadow: "0 0 10px #2563EB, 0 0 20px rgba(37,99,235,0.4)",
                    }}
                    layoutId="sidebar-indicator"
                    transition={{
                      type: "spring",
                      stiffness: 350,
                      damping: 30,
                    }}
                  />
                )}
              </motion.div>
            </NavLink>
          );
        })}
      </nav>

      {/* Bottom Role Indicator */}
      <div className="flex flex-col items-center gap-3">
        <div
          className="rounded-full"
          style={{
            width: 36,
            height: 36,
            background: "linear-gradient(135deg, #1E293B, #334155)",
            border: "1px solid rgba(255,255,255,0.1)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 14,
            color: "#94A3B8",
          }}
        >
          {role === "admin" ? "A" : "V"}
        </div>
      </div>
    </motion.aside>
  );
}
