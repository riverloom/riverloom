"use client";

import { motion } from "framer-motion";

export default function PerformanceIllustration({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 120" className={className} fill="none">
      {/* Speed lines background */}
      {[0, 1, 2].map((i) => (
        <motion.line
          key={`speed-${i}`}
          x1={15 + i * 5} y1="30"
          x2={85 - i * 5} y2="30"
          stroke="#169B62" strokeWidth="1" strokeOpacity="0.08"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.08 }}
          transition={{ duration: 0.5, delay: 0.1 * i }}
        />
      ))}

      {/* Gauge arc */}
      <motion.path
        d="M 25 85 A 30 30 0 0 1 75 85"
        stroke="#169B62" strokeWidth="2"
        strokeOpacity="0.2"
        fill="none"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1, delay: 0.3, ease: "easeInOut" }}
      />

      {/* Needle */}
      <motion.g
        initial={{ rotate: -45 }}
        animate={{ rotate: 0 }}
        transition={{ duration: 1.2, delay: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
        style={{ originX: "50px", originY: "85px" }}
      >
        <line x1="50" y1="85" x2="50" y2="55" stroke="#1FC77E" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="50" cy="85" r="4" fill="#1FC77E" />
        <motion.circle
          cx="50" cy="85" r="4"
          stroke="#1FC77E" strokeWidth="2" fill="none"
          animate={{ r: [4, 9, 4], opacity: [0.5, 0, 0.5] }}
          transition={{ duration: 2, delay: 1.5, repeat: Infinity, ease: "easeOut" }}
        />
      </motion.g>

      {/* Gauge tick marks */}
      {[0, 1, 2, 3, 4].map((i) => {
        const angle = (i / 4) * Math.PI;
        const x = 50 + Math.cos(angle - Math.PI) * 30;
        const y = 85 + Math.sin(angle - Math.PI) * 30;
        const x2 = 50 + Math.cos(angle - Math.PI) * 25;
        const y2 = 85 + Math.sin(angle - Math.PI) * 25;
        return (
          <motion.line
            key={`tick-${i}`}
            x1={x} y1={y} x2={x2} y2={y2}
            stroke="#169B62" strokeWidth="0.8"
            strokeOpacity={i < 3 ? 0.2 : 0.1}
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.4, delay: 0.5 + i * 0.05 }}
          />
        );
      })}

      {/* Bar chart */}
      <g transform="translate(10, 20)">
        {[0, 1, 2, 3, 4].map((i) => (
          <motion.rect
            key={`bar-${i}`}
            x={i * 18} y={0}
            width="10" height={30 - i * 4}
            rx="2"
            fill="rgba(22,155,98,0.12)"
            stroke="#169B62" strokeWidth="0.6"
            strokeOpacity="0.25"
            initial={{ scaleY: 0, y: 30 }}
            animate={{ scaleY: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 + i * 0.1, ease: "easeOut" }}
            style={{ originY: `${30}px` }}
          />
        ))}
      </g>

      {/* Pulsing dot */}
      <motion.circle
        cx="50" cy="15" r="2"
        fill="#1FC77E"
        animate={{ opacity: [0.3, 0.8, 0.3] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Data wave */}
      <motion.path
        d="M 15 102 Q 30 95, 40 102 T 65 102 T 85 95"
        stroke="#169B62" strokeWidth="0.8" strokeOpacity="0.15"
        fill="none"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.2, delay: 1, ease: "easeInOut" }}
      />
    </svg>
  );
}
