const toneColors = {
  income: { bg: "rgba(52,211,153,0.1)", color: "#34D399", border: "rgba(52,211,153,0.15)" },
  expense: { bg: "rgba(248,113,113,0.1)", color: "#F87171", border: "rgba(248,113,113,0.15)" },
  default: { bg: "rgba(255,255,255,0.04)", color: "#A1A1A6", border: "rgba(255,255,255,0.08)" },
};

export default function Badge({ children, tone }) {
  const style = toneColors[tone] || toneColors.default;

  return (
    <span
      style={{
        display: "inline-block",
        padding: "3px 8px",
        borderRadius: 6,
        fontSize: 11,
        fontWeight: 500,
        background: style.bg,
        color: style.color,
        border: `1px solid ${style.border}`,
        letterSpacing: "0.01em",
        textTransform: "capitalize",
      }}
    >
      {children}
    </span>
  );
}