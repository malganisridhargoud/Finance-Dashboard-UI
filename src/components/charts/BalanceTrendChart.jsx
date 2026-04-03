import { motion } from "framer-motion";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export default function BalanceTrendChart({ data = [] }) {
  return (
    <motion.div
      className="glass-card"
      style={{ padding: "22px" }}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <div style={{ marginBottom: 18, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div>
          <h3 style={{ fontSize: 15, fontWeight: 600, color: "var(--color-text-primary)", letterSpacing: "-0.01em" }}>
            Balance Trend
          </h3>
          <p style={{ fontSize: 11, color: "var(--color-text-muted)", marginTop: 2 }}>
            Rolling monthly movement
          </p>
        </div>
        <span
          style={{
            fontSize: 10,
            fontWeight: 600,
            padding: "3px 8px",
            borderRadius: 6,
            background: "rgba(37,99,235,0.1)",
            color: "#60A5FA",
            border: "1px solid rgba(37,99,235,0.15)",
            letterSpacing: "0.03em",
            textTransform: "uppercase",
          }}
        >
          Live
        </span>
      </div>

      <div style={{ height: 260, width: "100%" }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 8, right: 16, left: -24, bottom: 0 }}>
            <defs>
              <linearGradient id="trendFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#2563EB" stopOpacity={0.25} />
                <stop offset="100%" stopColor="#2563EB" stopOpacity={0.02} />
              </linearGradient>
              <filter id="glow">
                <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="rgba(255,255,255,0.04)"
              vertical={false}
            />
            <XAxis
              dataKey="month"
              tick={{ fill: "#6E6E73", fontSize: 10, fontWeight: 500 }}
              axisLine={{ stroke: "rgba(255,255,255,0.06)" }}
              tickLine={false}
            />
            <YAxis
              tick={{ fill: "#6E6E73", fontSize: 10, fontWeight: 500 }}
              axisLine={false}
              tickLine={false}
            />
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
              labelStyle={{ color: "#A1A1A6", fontWeight: 500, fontSize: 11 }}
              cursor={{ stroke: "rgba(37,99,235,0.2)", strokeWidth: 1 }}
            />
            <Area
              type="monotone"
              dataKey="balance"
              stroke="#2563EB"
              strokeWidth={2}
              fill="url(#trendFill)"
              filter="url(#glow)"
              dot={false}
              activeDot={{
                r: 4,
                stroke: "#2563EB",
                strokeWidth: 2,
                fill: "#000",
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}