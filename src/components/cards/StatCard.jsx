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

  const rotateX = useTransform(mouseY, [0, 1], [6, -6]);
  const rotateY = useTransform(mouseX, [0, 1], [-6, 6]);
  const glowX = useTransform(mouseX, [0, 1], ["0%", "100%"]);
  const glowY = useTransform(mouseY, [0, 1], ["0%", "100%"]);

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
      className="glass-card relative overflow-hidden p-6 cursor-default"
      style={{
        perspective: 800,
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMouse}
      onMouseLeave={handleLeave}
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
      whileHover={{ scale: 1.02 }}
    >
      {/* Aurora Top Bar */}
      <div
        className="absolute inset-x-0 top-0 h-[2px] aurora-bar"
      />

      {/* Floating Glow Orb */}
      <motion.div
        className="absolute pointer-events-none rounded-full"
        style={{
          width: 120,
          height: 120,
          background: "radial-gradient(circle, rgba(37,99,235,0.12) 0%, transparent 70%)",
          left: glowX,
          top: glowY,
          transform: "translate(-50%, -50%)",
          filter: "blur(20px)",
        }}
      />

      <p className="text-sm font-medium" style={{ color: "var(--color-text-secondary)" }}>
        {title}
      </p>
      <div
        className="mt-3 text-3xl font-bold tracking-tight"
        style={{ color: "var(--color-text-primary)" }}
      >
        {typeof value === "number" ? <AnimatedNumber value={value} /> : value}
      </div>
      {hint && (
        <p className="mt-2 text-sm" style={{ color: "var(--color-text-muted)" }}>
          {hint}
        </p>
      )}
    </motion.div>
  );
}