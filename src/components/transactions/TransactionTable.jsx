import { motion } from "framer-motion";
import Badge from "../ui/Badge";
import Button from "../ui/Button";
import EmptyState from "../ui/EmptyState";
import { formatCurrency, formatDate } from "../../utils/finance";

const rowVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: (i) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: i * 0.05,
      duration: 0.4,
      ease: [0.34, 1.56, 0.64, 1],
    },
  }),
};

export default function TransactionTable({
  transactions = [],
  role = "viewer",
  onEdit,
  onDelete,
}) {
  if (!transactions.length) {
    return (
      <EmptyState
        title="No matching transactions"
        description="Change filters, clear search, or add a new transaction from admin mode."
      />
    );
  }

  return (
    <div
      className="overflow-hidden rounded-[20px]"
      style={{
        background: "var(--color-surface-card)",
        border: "1px solid var(--color-border)",
        backdropFilter: "blur(24px)",
      }}
    >
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr
              style={{
                background: "rgba(255,255,255,0.02)",
                borderBottom: "1px solid var(--color-border)",
              }}
            >
              {["Date", "Description", "Category", "Type", "Amount", "Actions"].map(
                (col) => (
                  <th
                    key={col}
                    className="px-5 py-4 text-left text-xs uppercase tracking-wider font-semibold"
                    style={{ color: "var(--color-text-muted)" }}
                  >
                    {col}
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody>
            {transactions.map((tx, i) => (
              <motion.tr
                key={tx.id}
                className="hover-beam"
                style={{
                  borderBottom: "1px solid var(--color-border)",
                  transition: "background 0.3s ease",
                }}
                custom={i}
                variants={rowVariants}
                initial="hidden"
                animate="visible"
                whileHover={{
                  background: "rgba(37,99,235,0.04)",
                }}
              >
                <td
                  className="px-5 py-4 text-sm"
                  style={{ color: "var(--color-text-secondary)" }}
                >
                  {formatDate(tx.date)}
                </td>
                <td className="px-5 py-4">
                  <div
                    className="font-semibold text-sm"
                    style={{ color: "var(--color-text-primary)" }}
                  >
                    {tx.description}
                  </div>
                  <div
                    className="text-xs mt-0.5"
                    style={{ color: "var(--color-text-muted)" }}
                  >
                    ID: {tx.id}
                  </div>
                </td>
                <td className="px-5 py-4">
                  <Badge>{tx.category}</Badge>
                </td>
                <td className="px-5 py-4">
                  <Badge tone={tx.type}>{tx.type}</Badge>
                </td>
                <td className="px-5 py-4">
                  <span
                    className="text-sm font-bold"
                    style={{
                      color: tx.type === "income" ? "#60A5FA" : "#FCA5A5",
                      textShadow:
                        tx.type === "income"
                          ? "0 0 12px rgba(37,99,235,0.3)"
                          : "0 0 12px rgba(239,68,68,0.2)",
                    }}
                  >
                    {tx.type === "income" ? "+" : "-"}
                    {formatCurrency(tx.amount)}
                  </span>
                </td>
                <td className="px-5 py-4">
                  {role === "admin" ? (
                    <div className="flex gap-2">
                      <Button variant="secondary" onClick={() => onEdit?.(tx)}>
                        Edit
                      </Button>
                      <Button variant="danger" onClick={() => onDelete?.(tx.id)}>
                        Delete
                      </Button>
                    </div>
                  ) : (
                    <span
                      className="text-xs font-medium"
                      style={{ color: "var(--color-text-muted)" }}
                    >
                      View only
                    </span>
                  )}
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}