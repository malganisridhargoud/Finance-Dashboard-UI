import { motion } from "framer-motion";
import {
  Cell,
  Label,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { formatCurrency } from "../../utils/finance";

const COLORS = [
  "#2563EB",
  "#3B82F6",
  "#60A5FA",
  "#06B6D4",
  "#0EA5E9",
  "#818CF8",
  "#A78BFA",
  "#38BDF8",
];

function CustomLabel(props) {
  const { total } = props;
  const cx = props.viewBox?.cx ?? props.cx ?? 0;
  const cy = props.viewBox?.cy ?? props.cy ?? 0;
  if (!cx && !cy) return null;
  return (
    <g>
      <text
        x={cx}
        y={cy - 6}
        textAnchor="middle"
        fill="#6E6E73"
        fontSize={10}
        fontWeight={600}
        style={{ textTransform: "uppercase", letterSpacing: "0.05em" }}
      >
        Total Spent
      </text>
      <text
        x={cx}
        y={cy + 14}
        textAnchor="middle"
        fill="#F5F5F7"
        fontSize={16}
        fontWeight={600}
        letterSpacing="-0.02em"
      >
        {formatCurrency(total)}
      </text>
    </g>
  );
}

export default function SpendingBreakdownChart({ data = [] }) {
  const total = data.reduce((sum, d) => sum + d.value, 0);

  return (
    <motion.div
      className="glass-card"
      style={{ padding: 22 }}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <div style={{ marginBottom: 18 }}>
        <h3 style={{ fontSize: 15, fontWeight: 600, color: "var(--color-text-primary)", letterSpacing: "-0.01em" }}>
          Spending Breakdown
        </h3>
        <p style={{ fontSize: 11, color: "var(--color-text-muted)", marginTop: 2 }}>
          Expense by category
        </p>
      </div>

      <div style={{ height: 260, width: "100%" }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              innerRadius={60}
              outerRadius={95}
              paddingAngle={2}
              strokeWidth={0}
            >
              {data.map((_, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
              <Label
                content={<CustomLabel total={total} />}
                position="center"
              />
            </Pie>
            <Tooltip
              contentStyle={{
                background: "rgba(28, 28, 30, 0.95)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: 10,
                color: "#F5F5F7",
                boxShadow: "0 8px 32px rgba(0,0,0,0.6)",
                fontSize: 12,
                padding: "8px 12px",
              }}
              formatter={(value) => [formatCurrency(value), "Spent"]}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Legend */}
      <div style={{ marginTop: 14, display: "flex", flexWrap: "wrap", gap: 12, justifyContent: "center" }}>
        {data.slice(0, 6).map((d, i) => (
          <div key={d.name} style={{ display: "flex", alignItems: "center", gap: 5 }}>
            <div
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: COLORS[i % COLORS.length],
              }}
            />
            <span style={{ fontSize: 11, color: "#6E6E73", fontWeight: 500 }}>{d.name}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}