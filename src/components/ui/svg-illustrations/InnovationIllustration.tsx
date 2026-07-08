"use client";

import { motion } from "framer-motion";

export default function InnovationIllustration({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 120" className={className} fill="none">
      {/* Lightbulb/Innovation core */}
      <motion.circle
        cx="50" cy="35" r="20"
        stroke="#169B62" strokeWidth="1.2"
        strokeOpacity="0.2"
        fill="rgba(22,155,98,0.04)"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5, ease: "backOut" }}
      />

      {/* Filament / center */}
      <motion.g
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.3, ease: "backOut" }}
      >
        <motion.path
          d="M 45 35 Q 48 28, 50 35 Q 52 28, 55 35"
          stroke="#1FC77E" strokeWidth="1.2"
          strokeLinecap="round"
          fill="none"
          animate={{ opacity: [0.3, 0.8, 0.3] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.g>

      {/* Light rays */}
      {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => {
        const angle = (i / 8) * Math.PI * 2;
        const x1 = 50 + Math.cos(angle) * 22;
        const y1 = 35 + Math.sin(angle) * 22;
        const x2 = 50 + Math.cos(angle) * 30;
        const y2 = 35 + Math.sin(angle) * 30;
        return (
          <motion.line
            key={`ray-${i}`}
            x1={x1} y1={y1} x2={x2} y2={y2}
            stroke="#1FC77E" strokeWidth="0.8"
            strokeOpacity="0.2"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.4, delay: 0.4 + i * 0.05 }}
          />
        );
      })}

      {/* Pulsing glow */}
      <motion.circle
        cx="50" cy="35" r="16"
        fill="#169B62"
        opacity="0.06"
        animate={{ r: [16, 22, 16], opacity: [0.06, 0.02, 0.06] }}
        transition={{ duration: 3, delay: 0.5, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Idea sparkles */}
      {[0, 1, 2].map((i) => (
        <motion.g key={`spark-${i}`}>
          <motion.line
            x1={50 + (i - 1) * 15} y1={15 + i * 8}
            x2={50 + (i - 1) * 15} y2={18 + i * 8}
            stroke="#1FC77E" strokeWidth="1.2" strokeLinecap="round"
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 1.5, delay: 0.8 + i * 0.4, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.line
            x1={48 + (i - 1) * 15} y1={16 + i * 8}
            x2={52 + (i - 1) * 15} y2={17 + i * 8}
            stroke="#1FC77E" strokeWidth="0.6" strokeLinecap="round"
            animate={{ opacity: [0, 0.6, 0] }}
            transition={{ duration: 1.5, delay: 0.9 + i * 0.4, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.g>
      ))}

      {/* Growth arrow */}
      <motion.path
        d="M 20 100 L 35 90 L 50 95 L 65 85 L 80 90 L 90 78"
        stroke="#169B62" strokeWidth="1"
        strokeOpacity="0.15"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1, delay: 1, ease: "easeInOut" }}
      />

      {/* Arrow head */}
      <motion.polygon
        points="90,78 84,88 92,84"
        fill="#169B62" opacity="0.2"
        initial={{ opacity: 0 }} animate={{ opacity: 0.2 }}
        transition={{ duration: 0.4, delay: 1.8 }}
      />

      {/* Circular motion indicator */}
      <motion.circle
        cx="50" cy="60" r="3"
        fill="#1FC77E" opacity="0.5"
        animate={{ y: [-5, 5, -5] }}
        transition={{ duration: 2.5, delay: 1.2, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Horizontal line */}
      <motion.line
        x1="15" y1="105" x2="85" y2="105"
        stroke="#169B62" strokeWidth="0.5" strokeOpacity="0.1"
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
        transition={{ duration: 0.6, delay: 1.4 }}
      />
    </svg>
  );
}
