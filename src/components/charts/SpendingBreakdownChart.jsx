import { motion } from "framer-motion";
import {
  Cell,
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
  "#38BDF8",
  "#818CF8",
  "#A5B4FC",
];

function CustomLabel({ viewBox, total }) {
  const { cx, cy } = viewBox;
  return (
    <g>
      <text
        x={cx}
        y={cy - 8}
        textAnchor="middle"
        fill="#64748B"
        fontSize={11}
        fontWeight={600}
      >
        Total Spent
      </text>
      <text
        x={cx}
        y={cy + 14}
        textAnchor="middle"
        fill="#F8FAFC"
        fontSize={18}
        fontWeight={700}
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
      className="glass-card p-6"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2, ease: [0.34, 1.56, 0.64, 1] }}
      whileHover={{
        boxShadow: "0 8px 40px rgba(37,99,235,0.08), 0 0 0 1px rgba(37,99,235,0.1)",
      }}
    >
      <div className="mb-5">
        <h3
          className="text-lg font-bold"
          style={{ color: "var(--color-text-primary)" }}
        >
          Spending Breakdown
        </h3>
        <p className="text-sm" style={{ color: "var(--color-text-muted)" }}>
          Expense concentration by category
        </p>
      </div>

      <div className="h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              innerRadius={65}
              outerRadius={100}
              paddingAngle={3}
              strokeWidth={0}
            >
              {data.map((_, index) => (
                <Cell
                  key={index}
                  fill={COLORS[index % COLORS.length]}
                  style={{
                    filter: `drop-shadow(0 0 6px ${COLORS[index % COLORS.length]}40)`,
                  }}
                />
              ))}
              <CustomLabel total={total} />
            </Pie>
            <Tooltip
              contentStyle={{
                background: "rgba(10, 10, 15, 0.95)",
                border: "1px solid rgba(37,99,235,0.2)",
                borderRadius: 12,
                color: "#fff",
                boxShadow: "0 8px 30px rgba(0,0,0,0.5)",
                fontSize: 13,
              }}
              formatter={(value) => [formatCurrency(value), "Spent"]}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Custom Legend */}
      <div className="mt-4 flex flex-wrap gap-3 justify-center">
        {data.slice(0, 6).map((d, i) => (
          <div key={d.name} className="flex items-center gap-1.5 text-xs">
            <div
              className="rounded-full"
              style={{
                width: 8,
                height: 8,
                background: COLORS[i % COLORS.length],
                boxShadow: `0 0 6px ${COLORS[i % COLORS.length]}50`,
              }}
            />
            <span style={{ color: "#94A3B8" }}>{d.name}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}