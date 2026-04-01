import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Button from "../ui/Button";
import { createEmptyTransaction } from "../../utils/finance";
import { categorySet } from "../../data/mockData";

const categories = categorySet.filter((c) => c !== "All");

const fieldVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.4, ease: [0.34, 1.56, 0.64, 1] },
  }),
};

export default function TransactionForm({ initialData, onSave, onCancel }) {
  const [form, setForm] = useState(initialData || createEmptyTransaction());

  useEffect(() => {
    setForm(initialData || createEmptyTransaction());
  }, [initialData]);

  const updateField = (key, value) => setForm((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave?.({
      ...form,
      amount: Number(form.amount),
      id: form.id || createEmptyTransaction().id,
    });
  };

  const inputStyle = {
    background: "rgba(10,10,15,0.6)",
    border: "1px solid var(--color-border)",
    color: "var(--color-text-primary)",
    borderRadius: 12,
    padding: "12px 16px",
    fontSize: 14,
    outline: "none",
    width: "100%",
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
  };

  const fields = [
    { key: "date", label: "Date", type: "date", span: 1, index: 0 },
    { key: "amount", label: "Amount", type: "number", span: 1, index: 1 },
    { key: "category", label: "Category", type: "select", span: 1, index: 2, options: categories },
    { key: "type", label: "Type", type: "select", span: 1, index: 3, options: ["income", "expense"] },
    { key: "description", label: "Description", type: "text", span: 2, index: 4 },
  ];

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="glass-card p-6"
      initial={{ opacity: 0, y: 20, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
    >
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h3
            className="text-lg font-bold"
            style={{ color: "var(--color-text-primary)" }}
          >
            {initialData ? "Edit Transaction" : "Add Transaction"}
          </h3>
          <p className="text-sm" style={{ color: "var(--color-text-muted)" }}>
            Admin-only editing panel
          </p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {fields.map((field) => (
          <motion.label
            key={field.key}
            className={`grid gap-2 ${field.span === 2 ? "md:col-span-2" : ""}`}
            custom={field.index}
            variants={fieldVariants}
            initial="hidden"
            animate="visible"
          >
            <span
              className="text-sm font-medium"
              style={{ color: "var(--color-text-secondary)" }}
            >
              {field.label}
            </span>
            {field.type === "select" ? (
              <select
                value={form[field.key]}
                onChange={(e) => updateField(field.key, e.target.value)}
                className="input-glow"
                style={{ ...inputStyle, cursor: "pointer" }}
              >
                {field.options.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            ) : (
              <input
                type={field.type}
                value={form[field.key]}
                onChange={(e) => updateField(field.key, e.target.value)}
                className="input-glow"
                style={inputStyle}
                placeholder={
                  field.key === "description" ? "Add a short description" : undefined
                }
                min={field.type === "number" ? "0" : undefined}
              />
            )}
          </motion.label>
        ))}
      </div>

      <div className="mt-6 flex gap-3">
        <Button type="submit">Save Transaction</Button>
        <Button type="button" variant="ghost" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </motion.form>
  );
}