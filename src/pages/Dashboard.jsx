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
  animate: { transition: { staggerChildren: 0.08 } },
};

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.34, 1.56, 0.64, 1] } },
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
      className="space-y-8"
      variants={stagger}
      initial="initial"
      animate="animate"
    >
      {/* Hero Section */}
      <motion.div
        className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between"
        variants={fadeUp}
      >
        <div>
          <p
            className="text-sm font-semibold tracking-widest uppercase"
            style={{ color: "var(--color-primary)" }}
          >
            Finance Dashboard
          </p>
          <h1
            className="mt-2 text-3xl md:text-4xl font-bold tracking-tight gradient-text"
          >
            A clean view of cash flow,
            <br />
            spend, and signals.
          </h1>
        </div>
        <RoleToggle />
      </motion.div>

      {/* Stat Cards */}
      <motion.div className="grid gap-5 md:grid-cols-3" variants={stagger}>
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
      <motion.div className="grid gap-6 xl:grid-cols-2" variants={fadeUp}>
        <BalanceTrendChart data={trendData} />
        <SpendingBreakdownChart data={categoryData} />
      </motion.div>

      {/* Insight Cards */}
      <motion.div className="grid gap-5 md:grid-cols-3" variants={stagger}>
        <InsightCard
          title="Highest Spending Category"
          value={insights.topCategory.name}
          detail={`₹${insights.topCategory.value.toLocaleString("en-IN")} spent here.`}
          tone="warning"
        />
        <InsightCard
          title="Average Expense"
          value={`₹${Math.round(insights.avgExpense).toLocaleString("en-IN")}`}
          detail="Useful for tracking spending consistency."
          tone="neutral"
        />
        <InsightCard
          title="Balance Health"
          value={insights.balanceHealth.toUpperCase()}
          detail="Quick signal based on overall cash position."
          tone={insights.balanceHealth}
        />
      </motion.div>

      {/* Recent Transactions */}
      <motion.section variants={fadeUp}>
        <SectionHeader
          title="Recent Transactions"
          description="Latest activity shown with the current filters applied."
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