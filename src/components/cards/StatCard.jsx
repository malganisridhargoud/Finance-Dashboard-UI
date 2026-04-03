import { motion, useMotionValue, useTransform } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { formatCurrency } from "../../utils/finance";

function AnimatedNumber({ value }) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const target = Number(value || 0);
    const duration = 1200;
    const start = performance.now();
    const startVal = display;

    const tick = (now) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4);
      setDisplay(Math.round(startVal + (target - startVal) * eased));
      if (progress < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  }, [value]);

  return formatCurrency(display);
}

export default function StatCard({ title, value, hint, accent = "from-white/20" }) {
  const cardRef = useRef(null);
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const rotateX = useTransform(mouseY, [0, 1], [4, -4]);
  const rotateY = useTransform(mouseX, [0, 1], [-4, 4]);

  const handleMouse = (e) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set((e.clientX - rect.left) / rect.width);
    mouseY.set((e.clientY - rect.top) / rect.height);
  };

  const handleLeave = () => {
    mouseX.set(0.5);
    mouseY.set(0.5);
  };

  return (
    <motion.div
      ref={cardRef}
      className="glass-card relative overflow-hidden cursor-default"
      style={{
        perspective: 800,
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        padding: "20px 22px",
      }}
      onMouseMove={handleMouse}
      onMouseLeave={handleLeave}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
      whileHover={{ scale: 1.015 }}
    >
      {/* Subtle top accent */}
      <div
        className="absolute inset-x-0 top-0 aurora-bar"
        style={{ height: 1.5, opacity: 0.6 }}
      />

      <p
        style={{
          fontSize: 12,
          fontWeight: 500,
          color: "var(--color-text-muted)",
          letterSpacing: "0.02em",
          textTransform: "uppercase",
        }}
      >
        {title}
      </p>
      <div
        style={{
          marginTop: 8,
          fontSize: 26,
          fontWeight: 600,
          letterSpacing: "-0.025em",
          color: "var(--color-text-primary)",
          lineHeight: 1.1,
        }}
      >
        {typeof value === "number" ? <AnimatedNumber value={value} /> : value}
      </div>
      {hint && (
        <p
          style={{
            marginTop: 8,
            fontSize: 11,
            fontWeight: 400,
            color: "var(--color-text-muted)",
            lineHeight: 1.4,
          }}
        >
          {hint}
        </p>
      )}
    </motion.div>
  );
}