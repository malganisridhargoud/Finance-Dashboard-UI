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
    background: "rgba(10,10,15,0.6)",
    border: "1px solid var(--color-border)",
    color: "var(--color-text-primary)",
    borderRadius: 12,
    padding: "10px 16px",
    fontSize: 14,
    outline: "none",
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
  };

  return (
    <motion.div
      className="grid gap-3 rounded-[20px] p-5 lg:grid-cols-5"
      style={{
        background: "var(--color-surface-card)",
        border: "1px solid var(--color-border)",
        backdropFilter: "blur(24px)",
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
    >
      <input
        value={filters.search}
        onChange={(e) => setFilter("search", e.target.value)}
        placeholder="Search transactions..."
        className="lg:col-span-2 input-glow"
        style={{
          ...inputStyle,
          "::placeholder": { color: "var(--color-text-muted)" },
        }}
      />

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
        className="lg:col-span-5 relative overflow-hidden text-sm font-semibold"
        style={{
          ...inputStyle,
          background: "rgba(255,255,255,0.03)",
          color: "var(--color-text-secondary)",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 8,
        }}
        whileHover={{
          background: "rgba(37,99,235,0.08)",
          borderColor: "rgba(37,99,235,0.2)",
          color: "#60A5FA",
        }}
        whileTap={{ scale: 0.98 }}
      >
        Reset filters
        {activeFilters > 0 && (
          <motion.span
            className="inline-flex items-center justify-center rounded-full text-xs font-bold"
            style={{
              width: 20,
              height: 20,
              background: "#2563EB",
              color: "#fff",
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