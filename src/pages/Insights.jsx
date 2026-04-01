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

const cascade = {
  animate: { transition: { staggerChildren: 0.1 } },
};

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.34, 1.56, 0.64, 1] },
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
      ? `Compared with the previous month, balance moved by ₹${Math.abs(
          last.balance - prev.balance
        ).toLocaleString("en-IN")}.`
      : "Add more months of data to unlock monthly comparison.";

  return (
    <motion.div
      className="space-y-8"
      variants={cascade}
      initial="initial"
      animate="animate"
    >
      {/* Hero */}
      <motion.div variants={fadeUp}>
        <p
          className="text-sm font-semibold tracking-widest uppercase"
          style={{ color: "var(--color-primary)" }}
        >
          Insights
        </p>
        <h1 className="mt-2 text-3xl md:text-4xl font-bold tracking-tight gradient-text">
          Small signals that make
          <br />
          the dashboard useful.
        </h1>
      </motion.div>

      {/* Insight Cards with Cascade */}
      <motion.div className="grid gap-5 md:grid-cols-3" variants={cascade}>
        <motion.div variants={fadeUp}>
          <InsightCard
            title="Top Expense Category"
            value={insights.topCategory.name}
            detail={`Highest total spend: ₹${insights.topCategory.value.toLocaleString(
              "en-IN"
            )}`}
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
            detail="Income minus expenses across the dataset."
            tone={totals.balance >= 0 ? "positive" : "negative"}
          />
        </motion.div>
      </motion.div>

      {/* Charts */}
      <motion.div className="grid gap-6 xl:grid-cols-2" variants={fadeUp}>
        <BalanceTrendChart data={trendData} />
        <SpendingBreakdownChart data={categoryData} />
      </motion.div>

      {/* Observation */}
      <motion.div variants={fadeUp}>
        <SectionHeader
          title="Observation"
          description="A simple, readable summary from the dataset."
        />
        <motion.div
          className="glass-card p-6 border-glow-animate"
          style={{ color: "var(--color-text-secondary)" }}
        >
          {totals.expenses > totals.income ? (
            <p className="leading-relaxed">
              Expenses are currently above income. The strongest category pressure is{" "}
              <strong style={{ color: "var(--color-text-primary)" }}>
                {insights.topCategory.name}
              </strong>
              , so reducing spend there will have the highest impact.
            </p>
          ) : (
            <p className="leading-relaxed">
              Income is currently ahead of expenses. The highest spend area is{" "}
              <strong style={{ color: "var(--color-text-primary)" }}>
                {insights.topCategory.name}
              </strong>
              , which is the best place to optimize further.
            </p>
          )}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}