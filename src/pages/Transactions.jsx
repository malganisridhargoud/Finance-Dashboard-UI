import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { AnimatePresence } from "framer-motion";
import { useFinanceStore } from "../store/useFinanceStore";
import TransactionToolbar from "../components/transactions/TransactionToolbar";
import TransactionTable from "../components/transactions/TransactionTable";
import TransactionForm from "../components/transactions/TransactionForm";
import SectionHeader from "../components/ui/SectionHeader";
import Button from "../components/ui/Button";
import EmptyState from "../components/ui/EmptyState";
import { getFilteredTransactions } from "../utils/finance";

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.34, 1.56, 0.64, 1] } },
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
      className="space-y-8"
      initial="initial"
      animate="animate"
    >
      {/* Hero */}
      <motion.div
        className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between"
        variants={fadeUp}
        initial="initial"
        animate="animate"
      >
        <div>
          <p
            className="text-sm font-semibold tracking-widest uppercase"
            style={{ color: "var(--color-primary)" }}
          >
            Transactions
          </p>
          <h1 className="mt-2 text-3xl md:text-4xl font-bold tracking-tight gradient-text">
            Filter, sort, search,
            <br />
            and manage entries.
          </h1>
        </div>

        {role === "admin" && (
          <Button onClick={handleAdd}>+ Add Transaction</Button>
        )}
      </motion.div>

      {/* Toolbar */}
      <TransactionToolbar />

      {/* Form */}
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

      {/* Table */}
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