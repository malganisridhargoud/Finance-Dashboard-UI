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
      className="glass-card p-6"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.1, ease: [0.34, 1.56, 0.64, 1] }}
      whileHover={{
        boxShadow: "0 8px 40px rgba(37,99,235,0.08), 0 0 0 1px rgba(37,99,235,0.1)",
      }}
    >
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h3
            className="text-lg font-bold"
            style={{ color: "var(--color-text-primary)" }}
          >
            Balance Trend
          </h3>
          <p className="text-sm" style={{ color: "var(--color-text-muted)" }}>
            Rolling monthly movement
          </p>
        </div>
        <div
          className="rounded-lg px-3 py-1 text-xs font-semibold"
          style={{
            background: "rgba(37,99,235,0.1)",
            color: "#60A5FA",
            border: "1px solid rgba(37,99,235,0.15)",
          }}
        >
          Live
        </div>
      </div>

      <div className="h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 20, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="trendFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#2563EB" stopOpacity={0.35} />
                <stop offset="50%" stopColor="#2563EB" stopOpacity={0.1} />
                <stop offset="100%" stopColor="#2563EB" stopOpacity={0.01} />
              </linearGradient>
              <filter id="glow">
                <feGaussianBlur stdDeviation="3" result="coloredBlur" />
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
              tick={{ fill: "#64748B", fontSize: 11, fontWeight: 500 }}
              axisLine={{ stroke: "rgba(255,255,255,0.06)" }}
              tickLine={false}
            />
            <YAxis
              tick={{ fill: "#64748B", fontSize: 11, fontWeight: 500 }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip
              contentStyle={{
                background: "rgba(10, 10, 15, 0.95)",
                border: "1px solid rgba(37,99,235,0.2)",
                borderRadius: 12,
                color: "#fff",
                boxShadow: "0 8px 30px rgba(0,0,0,0.5), 0 0 20px rgba(37,99,235,0.1)",
                backdropFilter: "blur(12px)",
                fontSize: 13,
              }}
              labelStyle={{ color: "#94A3B8", fontWeight: 600 }}
              cursor={{ stroke: "rgba(37,99,235,0.3)", strokeWidth: 1 }}
            />
            <Area
              type="monotone"
              dataKey="balance"
              stroke="#2563EB"
              strokeWidth={2.5}
              fill="url(#trendFill)"
              filter="url(#glow)"
              dot={false}
              activeDot={{
                r: 5,
                stroke: "#2563EB",
                strokeWidth: 2,
                fill: "#0A0A0F",
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}