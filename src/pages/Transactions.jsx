import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useFinanceStore } from "../store/useFinanceStore";
import TransactionToolbar from "../components/transactions/TransactionToolbar";
import TransactionTable from "../components/transactions/TransactionTable";
import TransactionForm from "../components/transactions/TransactionForm";
import SectionHeader from "../components/ui/SectionHeader";
import Button from "../components/ui/Button";
import EmptyState from "../components/ui/EmptyState";
import { getFilteredTransactions } from "../utils/finance";

const fadeUp = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] } },
};

export default function Transactions() {
  const transactions = useFinanceStore((s) => s.transactions);
  const filters = useFinanceStore((s) => s.filters);
  const role = useFinanceStore((s) => s.role);
  const addTransaction = useFinanceStore((s) => s.addTransaction);
  const updateTransaction = useFinanceStore((s) => s.updateTransaction);
  const deleteTransaction = useFinanceStore((s) => s.deleteTransaction);
  const setSelectedTransaction = useFinanceStore((s) => s.setSelectedTransaction);
  const selectedTransaction = useFinanceStore((s) => s.selectedTransaction);

  const [showForm, setShowForm] = useState(false);

  const filtered = useMemo(
    () => getFilteredTransactions(transactions, filters),
    [transactions, filters]
  );

  const handleSave = (payload) => {
    if (selectedTransaction) {
      updateTransaction(selectedTransaction.id, payload);
      setSelectedTransaction(null);
    } else {
      addTransaction(payload);
    }
    setShowForm(false);
  };

  const handleEdit = (tx) => {
    setSelectedTransaction(tx);
    setShowForm(true);
  };

  const handleAdd = () => {
    setSelectedTransaction(null);
    setShowForm(true);
  };

  return (
    <motion.div
      style={{ display: "flex", flexDirection: "column", gap: 28 }}
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
        initial="initial"
        animate="animate"
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
            Transactions
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
            Filter, sort, and manage entries.
          </h1>
        </div>

        {role === "admin" && (
          <Button onClick={handleAdd}>+ Add Transaction</Button>
        )}
      </motion.div>

      <TransactionToolbar />

      <AnimatePresence>
        {showForm && role === "admin" && (
          <TransactionForm
            key="form"
            initialData={selectedTransaction || undefined}
            onSave={handleSave}
            onCancel={() => {
              setShowForm(false);
              setSelectedTransaction(null);
            }}
          />
        )}
      </AnimatePresence>

      {role !== "admin" && !filtered.length ? (
        <EmptyState
          title="Nothing here yet"
          description="Switch filters or go to admin mode to add data."
        />
      ) : (
        <TransactionTable
          transactions={filtered}
          role={role}
          onEdit={handleEdit}
          onDelete={(id) => deleteTransaction(id)}
        />
      )}
    </motion.div>
  );
}