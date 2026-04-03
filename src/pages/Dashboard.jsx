import { useMemo } from "react";
import { motion } from "framer-motion";
import { useFinanceStore } from "../store/useFinanceStore";
import {
  getCategoryBreakdown,
  getFilteredTransactions,
  getInsights,
  getMonthlyTrend,
  getTotals,
} from "../utils/finance";
import StatCard from "../components/cards/StatCard";
import InsightCard from "../components/cards/InsightCard";
import BalanceTrendChart from "../components/charts/BalanceTrendChart";
import SpendingBreakdownChart from "../components/charts/SpendingBreakdownChart";
import TransactionTable from "../components/transactions/TransactionTable";
import SectionHeader from "../components/ui/SectionHeader";
import RoleToggle from "../components/ui/RoleToggle";

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

export default function Dashboard() {
  const transactions = useFinanceStore((s) => s.transactions);
  const role = useFinanceStore((s) => s.role);
  const filters = useFinanceStore((s) => s.filters);
  const setSelectedTransaction = useFinanceStore((s) => s.setSelectedTransaction);

  const totals = useMemo(() => getTotals(transactions), [transactions]);
  const trendData = useMemo(() => getMonthlyTrend(transactions), [transactions]);
  const categoryData = useMemo(() => getCategoryBreakdown(transactions), [transactions]);
  const insights = useMemo(() => getInsights(transactions), [transactions]);

  const recent = useMemo(
    () => getFilteredTransactions(transactions, { ...filters }).slice(0, 5),
    [transactions, filters]
  );

  return (
    <motion.div
      style={{ display: "flex", flexDirection: "column", gap: 28 }}
      variants={stagger}
      initial="initial"
      animate="animate"
    >
      {/* Hero */}
      <motion.div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "flex-end",
          justifyContent: "space-between",
          gap: 16,
        }}
        variants={fadeUp}
      >
        <div>
          <p
            style={{
              fontSize: 12,
              fontWeight: 600,
              color: "var(--color-primary)",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}
          >
            Dashboard
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
            Cash flow, spend, and signals.
          </h1>
        </div>
        <RoleToggle />
      </motion.div>

      {/* Stat Cards */}
      <motion.div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: 16,
        }}
        variants={stagger}
      >
        <StatCard
          title="Total Balance"
          value={totals.balance}
          hint="Net position after income and expense."
        />
        <StatCard
          title="Income"
          value={totals.income}
          hint="Incoming cash across all income sources."
        />
        <StatCard
          title="Expenses"
          value={totals.expenses}
          hint="Outflow across all tracked expenses."
        />
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

      {/* Insights */}
      <motion.div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: 16,
        }}
        variants={stagger}
      >
        <InsightCard
          title="Highest Spending"
          value={insights.topCategory.name}
          detail={`₹${insights.topCategory.value.toLocaleString("en-IN")} spent here.`}
          tone="warning"
        />
        <InsightCard
          title="Average Expense"
          value={`₹${Math.round(insights.avgExpense).toLocaleString("en-IN")}`}
          detail="Tracking spending consistency."
          tone="neutral"
        />
        <InsightCard
          title="Balance Health"
          value={insights.balanceHealth.toUpperCase()}
          detail="Overall cash position signal."
          tone={insights.balanceHealth}
        />
      </motion.div>

      {/* Recent Transactions */}
      <motion.section variants={fadeUp}>
        <SectionHeader
          title="Recent Transactions"
          description="Latest activity with current filters."
        />
        <TransactionTable
          transactions={recent}
          role={role}
          onEdit={(tx) => setSelectedTransaction(tx)}
          onDelete={(id) => console.log("Delete from dashboard:", id)}
        />
      </motion.section>
    </motion.div>
  );
}