"use client";

import { motion } from "framer-motion";

export default function PartnershipIllustration({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 120" className={className} fill="none">
      {/* Two interlocking circles */}
      <motion.circle
        cx="38" cy="50" r="18"
        stroke="#169B62" strokeWidth="1.2" strokeOpacity="0.25"
        fill="rgba(22,155,98,0.04)"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5, ease: "backOut" }}
      />
      <motion.circle
        cx="62" cy="50" r="18"
        stroke="#169B62" strokeWidth="1.2" strokeOpacity="0.25"
        fill="rgba(22,155,98,0.04)"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5, delay: 0.15, ease: "backOut" }}
      />

      {/* Overlap area */}
      <motion.path
        d="M 46 38 A 18 18 0 0 1 54 38 A 18 18 0 0 1 54 62 A 18 18 0 0 1 46 62 Z"
        fill="rgba(22,155,98,0.1)"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.4, delay: 0.3, ease: "backOut" }}
      />

      {/* Center star/shine in overlap */}
      <motion.g
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.6, ease: "backOut" }}
      >
        <circle cx="50" cy="50" r="4" fill="#1FC77E" opacity="0.6" />
        <motion.circle
          cx="50" cy="50" r="4"
          stroke="#1FC77E" strokeWidth="1.5" fill="none"
          animate={{ r: [4, 11, 4], opacity: [0.5, 0, 0.5] }}
          transition={{ duration: 2.5, delay: 1, repeat: Infinity, ease: "easeOut" }}
        />
      </motion.g>

      {/* Handshake / link path */}
      <motion.path
        d="M 30 70 Q 35 78, 50 78 Q 65 78, 70 70"
        stroke="#1FC77E" strokeWidth="1"
        strokeOpacity="0.3"
        fill="none"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.8, delay: 0.8, ease: "easeInOut" }}
      />

      {/* Arrows going back and forth */}
      <motion.g
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 1.2 }}
      >
        <motion.path
          d="M 24 45 L 18 50 L 24 55"
          stroke="#169B62" strokeWidth="0.8" strokeOpacity="0.3"
          fill="none" strokeLinecap="round" strokeLinejoin="round"
          animate={{ x: [0, 3, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.path
          d="M 76 45 L 82 50 L 76 55"
          stroke="#169B62" strokeWidth="0.8" strokeOpacity="0.3"
          fill="none" strokeLinecap="round" strokeLinejoin="round"
          animate={{ x: [0, -3, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.g>

      {/* Growth chart */}
      <motion.path
        d="M 20 100 L 30 95 L 45 98 L 60 88 L 80 92 L 90 82"
        stroke="#169B62" strokeWidth="1.2"
        strokeOpacity="0.15"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.2, delay: 1.2, ease: "easeInOut" }}
      />

      {/* Sparkle particles */}
      {[0, 1, 2, 3].map((i) => (
        <motion.circle
          key={`sparkle-${i}`}
          r={1.5}
          fill="#1FC77E"
          opacity="0.5"
          initial={{ x: 50, y: 50 }}
          animate={{
            x: [50 + (i % 2 === 0 ? -1 : 1) * (15 + i * 8), 50 + (i % 2 === 0 ? -1 : 1) * (15 + i * 8)],
            y: [50 + (i < 2 ? -1 : 1) * (15 + i * 8), 50 + (i < 2 ? -1 : 1) * (15 + i * 8)],
            opacity: [0, 0.5, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: 2,
            delay: 1.4 + i * 0.3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Timeline dots on bottom */}
      <motion.line
        x1="25" y1="110" x2="75" y2="110"
        stroke="#169B62" strokeWidth="0.5" strokeOpacity="0.12"
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.6, delay: 1.5 }}
      />
      {[30, 50, 70].map((x, i) => (
        <motion.circle
          key={`dot-${i}`}
          cx={x} cy="110" r="2"
          fill="#169B62" opacity="0.2"
          initial={{ scale: 0 }} animate={{ scale: 1 }}
          transition={{ duration: 0.3, delay: 1.6 + i * 0.1, ease: "backOut" }}
        />
      ))}
    </svg>
  );
}
