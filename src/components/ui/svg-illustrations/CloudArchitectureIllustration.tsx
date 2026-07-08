"use client";

import { motion } from "framer-motion";

export default function CloudArchitectureIllustration({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 120" className={className} fill="none">
      {/* Connection lines */}
      <motion.line x1="20" y1="45" x2="50" y2="65" stroke="#169B62" strokeWidth="0.8" strokeOpacity="0.2"
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.6, ease: "easeOut" }} />
      <motion.line x1="80" y1="45" x2="50" y2="65" stroke="#169B62" strokeWidth="0.8" strokeOpacity="0.2"
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }} />
      <motion.line x1="20" y1="45" x2="80" y2="45" stroke="#169B62" strokeWidth="0.6" strokeOpacity="0.12"
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }} />
      <motion.line x1="50" y1="65" x2="50" y2="95" stroke="#169B62" strokeWidth="0.8" strokeOpacity="0.2"
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }} />

      {/* Nodes - server rack style */}
      {[0, 1, 2].map((i) => (
        <motion.g key={`node-${i}`}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 + i * 0.15 }}
        >
          <rect
            x={15 + i * 30} y={30 + i * 2}
            width="18" height="14" rx="2"
            stroke="#169B62" strokeWidth="1"
            strokeOpacity="0.35"
            fill="rgba(22,155,98,0.04)"
          />
          <motion.rect
            x={18 + i * 30} y={33 + i * 2}
            width="12" height="2" rx="1"
            fill="#1FC77E" opacity="0.4"
            animate={{ opacity: [0.2, 0.6, 0.2] }}
            transition={{ duration: 2, delay: i * 0.3, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.rect
            x={18 + i * 30} y={37 + i * 2}
            width="8" height="2" rx="1"
            fill="#169B62" opacity="0.3"
            animate={{ opacity: [0.15, 0.5, 0.15] }}
            transition={{ duration: 2.5, delay: 0.5 + i * 0.3, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.g>
      ))}

      {/* Central hub */}
      <motion.g
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.8, ease: "backOut" }}
      >
        <circle cx="50" cy="65" r="10" stroke="#169B62" strokeWidth="1.2" strokeOpacity="0.3" fill="rgba(22,155,98,0.06)" />
        <circle cx="50" cy="65" r="5" fill="#1FC77E" opacity="0.5" />
        <motion.circle
          cx="50" cy="65" r="5"
          stroke="#1FC77E" strokeWidth="1.5" fill="none"
          animate={{ r: [5, 14, 5], opacity: [0.5, 0, 0.5] }}
          transition={{ duration: 2.5, delay: 1.5, repeat: Infinity, ease: "easeOut" }}
        />
      </motion.g>

      {/* Bottom database nodes */}
      {[0, 1, 2].map((i) => (
        <motion.ellipse
          key={`db-${i}`}
          cx={35 + i * 15} cy={97}
          rx="5" ry="3"
          fill="#169B62" opacity="0.2"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.4, delay: 1 + i * 0.1, ease: "backOut" }}
        />
      ))}

      {/* Data flow particles */}
      {[0, 1, 2, 3].map((i) => (
        <motion.circle
          key={`flow-${i}`}
          r={1.5}
          fill="#1FC77E"
          opacity="0.6"
          initial={{ x: [15, 25, 35][i % 3] + (i > 2 ? 60 : 0), y: 37 }}
          animate={{
            y: [37, 65, 97],
            opacity: [0, 0.6, 0],
          }}
          transition={{
            duration: 2,
            delay: i * 0.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Horizontal scale indicator */}
      <motion.line
        x1="10" y1="108" x2="90" y2="108"
        stroke="#169B62" strokeWidth="0.5" strokeOpacity="0.1"
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.8, delay: 1.2 }}
      />
      {[15, 50, 85].map((x, i) => (
        <motion.line key={`tick-${i}`} x1={x} y1="105" x2={x} y2="111"
          stroke="#169B62" strokeWidth="0.5" strokeOpacity="0.15"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.3, delay: 1.4 + i * 0.1 }} />
      ))}
    </svg>
  );
}
