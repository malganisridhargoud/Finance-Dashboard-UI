import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Button from "../ui/Button";
import { categorySet } from "../../data/mockData";

const fadeUp = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] } },
};

export default function TransactionForm({ initialData, onSave, onCancel }) {
  const [form, setForm] = useState({
    description: "",
    amount: "",
    date: new Date().toISOString().split("T")[0],
    category: categorySet[1] || "Food",
    type: "expense",
  });

  useEffect(() => {
    if (initialData) {
      setForm({
        description: initialData.description || "",
        amount: initialData.amount || "",
        date: initialData.date || new Date().toISOString().split("T")[0],
        category: initialData.category || categorySet[1],
        type: initialData.type || "expense",
      });
    }
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave?.({ ...form, amount: Number(form.amount) });
  };

  const inputStyle = {
    width: "100%",
    background: "rgba(28,28,30,0.6)",
    border: "1px solid var(--color-border)",
    color: "var(--color-text-primary)",
    borderRadius: 10,
    padding: "9px 14px",
    fontSize: 13,
    fontWeight: 400,
    outline: "none",
    transition: "border-color 0.25s ease",
  };

  const labelStyle = {
    display: "block",
    fontSize: 11,
    fontWeight: 500,
    color: "var(--color-text-muted)",
    marginBottom: 4,
    textTransform: "uppercase",
    letterSpacing: "0.04em",
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="glass-card"
      style={{ padding: 20 }}
      variants={fadeUp}
      initial="initial"
      animate="animate"
      exit={{ opacity: 0, y: -12, transition: { duration: 0.25 } }}
    >
      <h3 style={{ fontSize: 15, fontWeight: 600, color: "var(--color-text-primary)", marginBottom: 16, letterSpacing: "-0.01em" }}>
        {initialData ? "Edit Transaction" : "New Transaction"}
      </h3>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 12 }}>
        <div>
          <label style={labelStyle}>Description</label>
          <input
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            required
            placeholder="e.g. Grocery shopping"
            className="input-glow"
            style={inputStyle}
          />
        </div>
        <div>
          <label style={labelStyle}>Amount</label>
          <input
            type="number"
            value={form.amount}
            onChange={(e) => setForm({ ...form, amount: e.target.value })}
            required
            min="0"
            placeholder="0"
            className="input-glow"
            style={inputStyle}
          />
        </div>
        <div>
          <label style={labelStyle}>Date</label>
          <input
            type="date"
            value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
            className="input-glow"
            style={{ ...inputStyle, colorScheme: "dark" }}
          />
        </div>
        <div>
          <label style={labelStyle}>Category</label>
          <select
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            className="input-glow"
            style={{ ...inputStyle, cursor: "pointer" }}
          >
            {categorySet.filter((c) => c !== "All").map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
        <div>
          <label style={labelStyle}>Type</label>
          <select
            value={form.type}
            onChange={(e) => setForm({ ...form, type: e.target.value })}
            className="input-glow"
            style={{ ...inputStyle, cursor: "pointer" }}
          >
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </div>
      </div>

      <div style={{ display: "flex", gap: 8, justifyContent: "flex-end", marginTop: 16 }}>
        <Button variant="secondary" type="button" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">
          {initialData ? "Update" : "Add"}
        </Button>
      </div>
    </motion.form>
  );
}