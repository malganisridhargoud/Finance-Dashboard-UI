import { motion } from "framer-motion";

const PARTICLE_COUNT = 30;

function generateParticles() {
  const particles = [];
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    particles.push({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2.5 + 1,
      delay: Math.random() * 2,
      duration: Math.random() * 4 + 3,
      dx: (Math.random() - 0.5) * 60,
      dy: (Math.random() - 0.5) * 60,
    });
  }
  return particles;
}

const particles = generateParticles();

const letterVariants = {
  hidden: { opacity: 0, filter: "blur(12px)", y: 15 },
  visible: (i) => ({
    opacity: 1,
    filter: "blur(0px)",
    y: 0,
    transition: { delay: 0.6 + i * 0.08, duration: 0.6, ease: [0.34, 1.56, 0.64, 1] },
  }),
};

const containerVariants = {
  exit: {
    clipPath: "inset(0 0 100% 0)",
    transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] },
  },
};

export default function LoadingScreen({ onComplete }) {
  const title = "FINANCE";

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden"
      style={{ background: "#000" }}
      variants={containerVariants}
      exit="exit"
      onAnimationComplete={(def) => {
        if (def === "exit") onComplete?.();
      }}
    >
      {/* Particle Field */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        {particles.map((p) => (
          <motion.circle
            key={p.id}
            cx={p.x}
            cy={p.y}
            r={p.size * 0.15}
            fill="#2563EB"
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0.15, 0.6, 0.15],
              cx: [p.x, p.x + p.dx * 0.3, p.x - p.dx * 0.2],
              cy: [p.y, p.y + p.dy * 0.3, p.y - p.dy * 0.2],
            }}
            transition={{
              duration: p.duration,
              delay: p.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
        {/* Connection Lines */}
        {particles.slice(0, 12).map((p, i) => {
          const next = particles[(i + 3) % PARTICLE_COUNT];
          return (
            <motion.line
              key={`line-${i}`}
              x1={p.x}
              y1={p.y}
              x2={next.x}
              y2={next.y}
              stroke="#2563EB"
              strokeWidth="0.08"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.2, 0] }}
              transition={{
                duration: 3,
                delay: p.delay + 0.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          );
        })}
      </svg>

      {/* Morphing Geometry */}
      <motion.div
        className="absolute"
        style={{
          width: 120,
          height: 120,
          background: "linear-gradient(135deg, #2563EB 0%, #06B6D4 50%, #1D4ED8 100%)",
          filter: "blur(0.5px)",
        }}
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{
          opacity: [0, 0.3, 0.2],
          scale: [0.5, 1, 0.9],
          borderRadius: [
            "30% 70% 70% 30% / 30% 30% 70% 70%",
            "50% 50% 33% 67% / 55% 27% 73% 45%",
            "33% 67% 58% 42% / 63% 68% 32% 37%",
            "30% 70% 70% 30% / 30% 30% 70% 70%",
          ],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Title Letters */}
      <div className="relative z-10 flex gap-1 mb-8">
        {title.split("").map((letter, i) => (
          <motion.span
            key={i}
            className="text-5xl md:text-7xl font-black tracking-[0.15em]"
            style={{
              background: "linear-gradient(180deg, #ffffff 0%, #2563EB 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
            custom={i}
            variants={letterVariants}
            initial="hidden"
            animate="visible"
          >
            {letter}
          </motion.span>
        ))}
      </div>

      {/* Subtitle */}
      <motion.p
        className="relative z-10 text-sm tracking-[0.3em] uppercase mb-12"
        style={{ color: "#64748B" }}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.6, duration: 0.6 }}
      >
        Dashboard
      </motion.p>

      {/* Progress Bar */}
      <div
        className="relative z-10 overflow-hidden rounded-full"
        style={{
          width: 200,
          height: 3,
          background: "rgba(255,255,255,0.06)",
        }}
      >
        <motion.div
          className="h-full rounded-full"
          style={{
            background: "linear-gradient(90deg, #2563EB, #06B6D4)",
          }}
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{
            duration: 2.6,
            ease: [0.34, 1.56, 0.64, 1],
          }}
        />
      </div>

      {/* Radial Glow Behind Center */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: 500,
          height: 500,
          background: "radial-gradient(circle, rgba(37,99,235,0.12) 0%, transparent 70%)",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      />
    </motion.div>
  );
}
