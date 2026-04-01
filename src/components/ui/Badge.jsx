export default function Badge({ children, tone = "neutral", className = "" }) {
  const tones = {
    neutral: {
      bg: "rgba(255,255,255,0.06)",
      color: "#E2E8F0",
      border: "rgba(255,255,255,0.08)",
    },
    income: {
      bg: "rgba(37,99,235,0.12)",
      color: "#60A5FA",
      border: "rgba(37,99,235,0.2)",
    },
    expense: {
      bg: "rgba(239,68,68,0.1)",
      color: "#FCA5A5",
      border: "rgba(239,68,68,0.15)",
    },
    admin: {
      bg: "rgba(37,99,235,0.12)",
      color: "#60A5FA",
      border: "rgba(37,99,235,0.2)",
    },
    viewer: {
      bg: "rgba(100,116,139,0.12)",
      color: "#94A3B8",
      border: "rgba(100,116,139,0.2)",
    },
  };

  const style = tones[tone] || tones.neutral;

  return (
    <span
      className={`shimmer-badge inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold tracking-wide ${className}`}
      style={{
        background: style.bg,
        color: style.color,
        border: `1px solid ${style.border}`,
      }}
    >
      {children}
    </span>
  );
}