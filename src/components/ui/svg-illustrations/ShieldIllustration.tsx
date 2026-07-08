"use client";

import { motion } from "framer-motion";

export default function ShieldIllustration({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 120" className={className} fill="none">
      {/* Shield outline */}
      <motion.path
        d="M 50 15 L 85 30 L 85 60 Q 85 85, 50 105 Q 15 85, 15 60 L 15 30 Z"
        stroke="#169B62"
        strokeWidth="1.5"
        strokeOpacity="0.3"
        fill="rgba(22,155,98,0.04)"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.2, ease: "easeInOut" }}
      />

      {/* Inner shield glow */}
      <motion.path
        d="M 50 22 L 78 34 L 78 58 Q 78 80, 50 97 Q 22 80, 22 58 L 22 34 Z"
        fill="rgba(22,155,98,0.06)"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
      />

      {/* Lock icon */}
      <motion.g
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
      >
        <rect x="40" y="48" width="20" height="16" rx="3" stroke="#1FC77E" strokeWidth="1.5" fill="rgba(31,199,126,0.1)" />
        <path d="M 42 48 L 42 42 Q 42 35, 50 35 Q 58 35, 58 42 L 58 48" stroke="#1FC77E" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="50" cy="55" r="2.5" fill="#1FC77E" />
        <motion.line
          x1="50" y1="57" x2="50" y2="60"
          stroke="#1FC77E" strokeWidth="1.5" strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.4, delay: 1.4 }}
        />
      </motion.g>

      {/* Orbiting particles */}
      {[0, 1, 2, 3].map((i) => (
        <motion.circle
          key={`particle-${i}`}
          r={2}
          fill="#169B62"
          opacity="0.3"
          initial={{ x: 50, y: 55 }}
          animate={{
            x: [50 + Math.cos(i * Math.PI / 2) * 30, 50 + Math.cos(i * Math.PI / 2 + Math.PI * 2) * 30],
            y: [55 + Math.sin(i * Math.PI / 2) * 20, 55 + Math.sin(i * Math.PI / 2 + Math.PI * 2) * 20],
          }}
          transition={{
            duration: 4,
            delay: i * 0.3,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}

      {/* Top decorative lines */}
      <motion.line
        x1="35" y1="28" x2="65" y2="28"
        stroke="#169B62" strokeWidth="0.8" strokeOpacity="0.15"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.6, delay: 0.6 }}
      />
      <motion.line
        x1="38" y1="25" x2="62" y2="25"
        stroke="#169B62" strokeWidth="0.8" strokeOpacity="0.1"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.6, delay: 0.7 }}
      />
    </svg>
  );
}
