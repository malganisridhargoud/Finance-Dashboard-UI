import { motion } from "framer-motion";
import Badge from "../ui/Badge";
import Button from "../ui/Button";
import EmptyState from "../ui/EmptyState";
import { formatCurrency, formatDate } from "../../utils/finance";

const rowVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.04,
      duration: 0.35,
      ease: [0.25, 0.46, 0.45, 0.94],
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
        description="Change filters or add a new transaction from admin mode."
      />
    );
  }

  return (
    <div
      style={{
        overflow: "hidden",
        borderRadius: "var(--radius-card)",
        background: "var(--color-surface-card)",
        border: "1px solid var(--color-border)",
        backdropFilter: "blur(20px)",
      }}
    >
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: "1px solid var(--color-border)" }}>
              {["Date", "Description", "Category", "Type", "Amount", "Actions"].map(
                (col) => (
                  <th
                    key={col}
                    style={{
                      padding: "11px 18px",
                      textAlign: "left",
                      fontSize: 10,
                      fontWeight: 600,
                      color: "var(--color-text-muted)",
                      textTransform: "uppercase",
                      letterSpacing: "0.06em",
                    }}
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
                  cursor: "default",
                }}
                custom={i}
                variants={rowVariants}
                initial="hidden"
                animate="visible"
                whileHover={{
                  background: "rgba(255,255,255,0.02)",
                }}
              >
                <td style={{ padding: "12px 18px", fontSize: 12, color: "var(--color-text-muted)", fontWeight: 500 }}>
                  {formatDate(tx.date)}
                </td>
                <td style={{ padding: "12px 18px" }}>
                  <div style={{ fontSize: 13, fontWeight: 500, color: "var(--color-text-primary)" }}>
                    {tx.description}
                  </div>
                </td>
                <td style={{ padding: "12px 18px" }}>
                  <Badge>{tx.category}</Badge>
                </td>
                <td style={{ padding: "12px 18px" }}>
                  <Badge tone={tx.type}>{tx.type}</Badge>
                </td>
                <td style={{ padding: "12px 18px" }}>
                  <span
                    style={{
                      fontSize: 13,
                      fontWeight: 600,
                      color: tx.type === "income" ? "#34D399" : "#F87171",
                      letterSpacing: "-0.01em",
                    }}
                  >
                    {tx.type === "income" ? "+" : "−"}
                    {formatCurrency(tx.amount)}
                  </span>
                </td>
                <td style={{ padding: "12px 18px" }}>
                  {role === "admin" ? (
                    <div style={{ display: "flex", gap: 6 }}>
                      <Button variant="ghost" onClick={() => onEdit?.(tx)}>
                        Edit
                      </Button>
                      <Button variant="danger" onClick={() => onDelete?.(tx.id)}>
                        Delete
                      </Button>
                    </div>
                  ) : (
                    <span style={{ fontSize: 11, color: "var(--color-text-muted)" }}>
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