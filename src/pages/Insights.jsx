import { useMemo } from "react";
import { motion } from "framer-motion";
import { useFinanceStore } from "../store/useFinanceStore";
import {
  getCategoryBreakdown,
  getInsights,
  getMonthlyTrend,
  getTotals,
} from "../utils/finance";
import InsightCard from "../components/cards/InsightCard";
import BalanceTrendChart from "../components/charts/BalanceTrendChart";
import SpendingBreakdownChart from "../components/charts/SpendingBreakdownChart";
import SectionHeader from "../components/ui/SectionHeader";

const stagger = {
  animate: { transition: { staggerChildren: 0.06 } },
};

const fadeUp = {
  initial: { opacity: 0, y: 16 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

export default function Insights() {
  const transactions = useFinanceStore((s) => s.transactions);

  const totals = useMemo(() => getTotals(transactions), [transactions]);
  const trendData = useMemo(() => getMonthlyTrend(transactions), [transactions]);
  const categoryData = useMemo(() => getCategoryBreakdown(transactions), [transactions]);
  const insights = useMemo(() => getInsights(transactions), [transactions]);

  const last = trendData[trendData.length - 1];
  const prev = trendData[trendData.length - 2];

  const comparisonText =
    last && prev
      ? `Balance moved by ₹${Math.abs(last.balance - prev.balance).toLocaleString("en-IN")} from last month.`
      : "Add more data to unlock monthly comparison.";

  return (
    <motion.div
      style={{ display: "flex", flexDirection: "column", gap: 28 }}
      variants={stagger}
      initial="initial"
      animate="animate"
    >
      {/* Hero */}
      <motion.div variants={fadeUp}>
        <p
          style={{
            fontSize: 12,
            fontWeight: 600,
            color: "var(--color-primary)",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
          }}
        >
          Insights
        </p>
        <h1
          style={{
            marginTop: 6,
            fontSize: 28,
            fontWeight: 600,
            letterSpacing: "-0.03em",
            color: "var(--color-text-primary)",
            lineHeight: 1.2,
          }}
        >
          Signals that make the data useful.
        </h1>
      </motion.div>

      {/* Cards */}
      <motion.div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: 16,
        }}
        variants={stagger}
      >
        <motion.div variants={fadeUp}>
          <InsightCard
            title="Top Expense"
            value={insights.topCategory.name}
            detail={`Highest spend: ₹${insights.topCategory.value.toLocaleString("en-IN")}`}
            tone="warning"
          />
        </motion.div>
        <motion.div variants={fadeUp}>
          <InsightCard
            title="Monthly Comparison"
            value={last && prev ? (last.balance >= prev.balance ? "Up" : "Down") : "N/A"}
            detail={comparisonText}
            tone={last && prev && last.balance >= prev.balance ? "positive" : "negative"}
          />
        </motion.div>
        <motion.div variants={fadeUp}>
          <InsightCard
            title="Net Position"
            value={`₹${totals.balance.toLocaleString("en-IN")}`}
            detail="Income minus expenses."
            tone={totals.balance >= 0 ? "positive" : "negative"}
          />
        </motion.div>
      </motion.div>

      {/* Charts */}
      <motion.div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
          gap: 16,
        }}
        variants={fadeUp}
      >
        <BalanceTrendChart data={trendData} />
        <SpendingBreakdownChart data={categoryData} />
      </motion.div>

      {/* Observation */}
      <motion.div variants={fadeUp}>
        <SectionHeader
          title="Observation"
          description="Summary from the dataset."
        />
        <div
          className="glass-card"
          style={{ padding: "18px 22px" }}
        >
          {totals.expenses > totals.income ? (
            <p style={{ fontSize: 13, lineHeight: 1.6, color: "var(--color-text-secondary)" }}>
              Expenses are above income. The strongest pressure is{" "}
              <strong style={{ color: "var(--color-text-primary)" }}>
                {insights.topCategory.name}
              </strong>
              — reducing spend there will have the highest impact.
            </p>
          ) : (
            <p style={{ fontSize: 13, lineHeight: 1.6, color: "var(--color-text-secondary)" }}>
              Income is ahead of expenses. The highest spend area is{" "}
              <strong style={{ color: "var(--color-text-primary)" }}>
                {insights.topCategory.name}
              </strong>
              , the best place to optimize further.
            </p>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}