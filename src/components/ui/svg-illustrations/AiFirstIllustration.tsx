"use client";

import { motion } from "framer-motion";

export default function AiFirstIllustration({ className }: { className?: string }) {
  const nodes = [
    { cx: 50, cy: 30, r: 6, delay: 0 },
    { cx: 30, cy: 65, r: 5, delay: 0.3 },
    { cx: 70, cy: 65, r: 5, delay: 0.6 },
    { cx: 20, cy: 95, r: 4, delay: 0.9 },
    { cx: 50, cy: 90, r: 4, delay: 1.2 },
    { cx: 80, cy: 95, r: 4, delay: 1.5 },
  ];

  const connections = [
    { x1: 50, y1: 30, x2: 30, y2: 65 },
    { x1: 50, y1: 30, x2: 70, y2: 65 },
    { x1: 30, y1: 65, x2: 20, y2: 95 },
    { x1: 30, y1: 65, x2: 50, y2: 90 },
    { x1: 70, y1: 65, x2: 50, y2: 90 },
    { x1: 70, y1: 65, x2: 80, y2: 95 },
    { x1: 50, y1: 90, x2: 20, y2: 95 },
    { x1: 50, y1: 90, x2: 80, y2: 95 },
  ];

  return (
    <svg viewBox="0 0 100 120" className={className} fill="none">
      {/* Grid lines */}
      <g opacity="0.06">
        {Array.from({ length: 5 }).map((_, i) => (
          <line key={`h${i}`} x1="0" y1={20 + i * 20} x2="100" y2={20 + i * 20} stroke="#169B62" strokeWidth="0.5" />
        ))}
        {Array.from({ length: 5 }).map((_, i) => (
          <line key={`v${i}`} x1={20 + i * 20} y1="10" x2={20 + i * 20} y2="110" stroke="#169B62" strokeWidth="0.5" />
        ))}
      </g>

      {/* Connections */}
      {connections.map((c, i) => (
        <motion.line
          key={`conn-${i}`}
          x1={c.x1} y1={c.y1} x2={c.x2} y2={c.y2}
          stroke="#169B62"
          strokeWidth="0.8"
          strokeOpacity="0.3"
          initial={{ pathLength: 0, strokeOpacity: 0 }}
          animate={{ pathLength: 1, strokeOpacity: 0.3 }}
          transition={{ duration: 0.8, delay: i * 0.1, ease: "easeOut" }}
        />
      ))}

      {/* Pulsing signal along connections */}
      {[0, 2, 4, 6].map((idx) => (
        <motion.circle
          key={`pulse-${idx}`}
          r={2.5}
          fill="#1FC77E"
          initial={{ offsetDistance: "0%" }}
          animate={{ offsetDistance: "100%" }}
          transition={{ duration: 2.5, delay: idx * 0.4, repeat: Infinity, ease: "linear" }}
          style={{
            offsetPath: `M ${connections[idx].x1} ${connections[idx].y1} L ${connections[idx].x2} ${connections[idx].y2}`,
          }}
        />
      ))}

      {/* Nodes */}
      {nodes.map((n, i) => (
        <motion.g key={`node-${i}`}>
          <motion.circle
            cx={n.cx} cy={n.cy} r={n.r + 8}
            fill="#169B62"
            opacity="0.08"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: [1, 1.3, 1], opacity: 0.08 }}
            transition={{ duration: 2, delay: n.delay, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.circle
            cx={n.cx} cy={n.cy} r={n.r}
            fill={i === 0 ? "#1FC77E" : "#169B62"}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4, delay: n.delay, ease: "backOut" }}
          />
          {i === 0 && (
            <motion.circle
              cx={n.cx} cy={n.cy} r={n.r + 4}
              stroke="#1FC77E"
              strokeWidth="1.5"
              strokeOpacity="0.4"
              fill="none"
              initial={{ scale: 1, opacity: 0.4 }}
              animate={{ scale: 1.6, opacity: 0 }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeOut" }}
            />
          )}
        </motion.g>
      ))}

      {/* Brain waveform */}
      <motion.path
        d="M 10 105 Q 25 95, 35 105 T 60 105 T 90 105"
        stroke="#169B62"
        strokeWidth="1"
        strokeOpacity="0.15"
        fill="none"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.5, delay: 1, ease: "easeInOut" }}
      />
    </svg>
  );
}
