import { useMemo } from "react";
import { motion } from "framer-motion";
import { categorySet, sortSet, typeSet } from "../../data/mockData";
import { useFinanceStore } from "../../store/useFinanceStore";

export default function TransactionToolbar() {
  const filters = useFinanceStore((s) => s.filters);
  const setFilter = useFinanceStore((s) => s.setFilter);
  const resetFilters = useFinanceStore((s) => s.resetFilters);
  const transactions = useFinanceStore((s) => s.transactions);

  const categoryOptions = useMemo(() => {
    const categories = new Set(transactions.map((t) => t.category));
    return ["All", ...Array.from(categories).sort()];
  }, [transactions]);

  const activeFilters = [
    filters.search && "search",
    filters.type !== "All" && "type",
    filters.category !== "All" && "category",
  ].filter(Boolean).length;

  const inputStyle = {
    background: "rgba(28,28,30,0.6)",
    border: "1px solid var(--color-border)",
    color: "var(--color-text-primary)",
    borderRadius: 10,
    padding: "9px 14px",
    fontSize: 13,
    fontWeight: 400,
    outline: "none",
    transition: "all 0.25s ease",
    width: "100%",
  };

  return (
    <motion.div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
        gap: 10,
        padding: 16,
        borderRadius: "var(--radius-card)",
        background: "var(--color-surface-card)",
        border: "1px solid var(--color-border)",
        backdropFilter: "blur(20px)",
      }}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <div style={{ gridColumn: "span 2" }}>
        <input
          value={filters.search}
          onChange={(e) => setFilter("search", e.target.value)}
          placeholder="Search transactions..."
          className="input-glow"
          style={inputStyle}
        />
      </div>

      <select
        value={filters.type}
        onChange={(e) => setFilter("type", e.target.value)}
        className="input-glow"
        style={{ ...inputStyle, cursor: "pointer" }}
      >
        {typeSet.map((item) => (
          <option key={item} value={item}>
            {item === "All" ? "All Types" : item}
          </option>
        ))}
      </select>

      <select
        value={filters.category}
        onChange={(e) => setFilter("category", e.target.value)}
        className="input-glow"
        style={{ ...inputStyle, cursor: "pointer" }}
      >
        {categoryOptions.map((item) => (
          <option key={item} value={item}>
            {item === "All" ? "All Categories" : item}
          </option>
        ))}
      </select>

      <select
        value={filters.sort}
        onChange={(e) => setFilter("sort", e.target.value)}
        className="input-glow"
        style={{ ...inputStyle, cursor: "pointer" }}
      >
        {sortSet.map((item) => (
          <option key={item.value} value={item.value}>
            {item.label}
          </option>
        ))}
      </select>

      <motion.button
        onClick={resetFilters}
        style={{
          ...inputStyle,
          gridColumn: "1 / -1",
          background: "rgba(255,255,255,0.02)",
          color: "var(--color-text-muted)",
          cursor: "pointer",
          fontWeight: 500,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 6,
        }}
        whileHover={{
          background: "rgba(37,99,235,0.06)",
          color: "#60A5FA",
          borderColor: "rgba(37,99,235,0.15)",
        }}
        whileTap={{ scale: 0.98 }}
      >
        Reset filters
        {activeFilters > 0 && (
          <motion.span
            style={{
              width: 18,
              height: 18,
              borderRadius: "50%",
              background: "#2563EB",
              color: "#fff",
              fontSize: 10,
              fontWeight: 700,
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 500, damping: 25 }}
          >
            {activeFilters}
          </motion.span>
        )}
      </motion.button>
    </motion.div>
  );
}