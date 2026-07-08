"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

export default function AIDashboard({ accent, accentLight }: { accent: string; accentLight: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const iv = useInView(ref, { once: true, margin: "-60px" });

  return (
    <div ref={ref} className="relative w-full h-full min-h-[400px] md:min-h-[480px] flex items-center justify-center p-6 overflow-hidden">
      {/* Ambient glow */}
      <motion.div
        className="absolute inset-0 rounded-[32px]"
        style={{ background: `radial-gradient(ellipse at 50% 30%, ${accent}18 0%, transparent 60%)` }}
        animate={iv ? { opacity: [0.3, 0.6, 0.3] } : {}}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Main dashboard card */}
      <motion.div
        className="relative w-full max-w-[460px] rounded-2xl overflow-hidden border"
        style={{
          borderColor: `${accent}15`,
          backgroundColor: "rgba(255,255,255,0.97)",
          boxShadow: `0 20px 60px ${accent}12`,
        }}
        initial={{ y: 30, opacity: 0, scale: 0.95 }}
        animate={iv ? { y: 0, opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.7, ease: [0.19, 1, 0.22, 1] }}
        whileHover={{ y: -6, boxShadow: `0 30px 80px ${accent}25` }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b" style={{ borderColor: `${accent}08`, backgroundColor: `${accent}02` }}>
          <div className="flex items-center gap-2">
            <motion.div className="w-2 h-2 rounded-full" style={{ backgroundColor: accent }} animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 2, repeat: Infinity }} />
            <span className="text-[10px] font-bold tracking-wider uppercase" style={{ color: accent }}>AI Analytics</span>
          </div>
          <motion.span
            className="text-[7px] font-semibold px-2 py-0.5 rounded-full"
            style={{ backgroundColor: `${accent}12`, color: accent }}
            initial={{ scale: 0 }} animate={iv ? { scale: 1 } : {}} transition={{ delay: 0.4, type: "spring" }}
          >
            ACTIVE
          </motion.span>
        </div>

        <div className="p-4 space-y-3">
          {/* KPI Row */}
          <div className="grid grid-cols-3 gap-2">
            {[{ v: "98.2%", l: "Accuracy", c: accent }, { v: "1.2s", l: "Avg Response", c: accentLight }, { v: "24K", l: "Daily Inferences", c: "#22C55E" }].map((kpi, i) => (
              <motion.div
                key={kpi.l}
                className="p-2.5 rounded-xl text-center"
                style={{ backgroundColor: `${accent}06` }}
                initial={{ opacity: 0, y: 10 }}
                animate={iv ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3 + i * 0.08 }}
              >
                <motion.div className="text-[15px] font-bold leading-none mb-0.5" style={{ color: kpi.c }}
                  animate={iv ? { scale: [1, 1.05, 1] } : {}} transition={{ duration: 2, repeat: Infinity, delay: 1 + i * 0.3 }}
                >{kpi.v}</motion.div>
                <div className="text-[7px] font-semibold uppercase tracking-wider" style={{ color: `${accent}60` }}>{kpi.l}</div>
              </motion.div>
            ))}
          </div>

          {/* Live inference chart */}
          <motion.div
            className="p-3 rounded-xl"
            style={{ backgroundColor: `${accent}04`, border: `1px solid ${accent}08` }}
            initial={{ opacity: 0 }}
            animate={iv ? { opacity: 1 } : {}}
            transition={{ delay: 0.5 }}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-[8px] font-bold uppercase tracking-wider" style={{ color: `${accent}60` }}>Inference Requests</span>
              <motion.span className="text-[8px] font-bold" style={{ color: "#22C55E" }} animate={{ opacity: [1, 0.4, 1] }} transition={{ duration: 1.5, repeat: Infinity }}>+12%</motion.span>
            </div>
            <div className="flex items-end gap-1 h-16">
              {[35, 42, 28, 55, 48, 62, 38, 70, 52, 68, 45, 78, 58, 72, 85].map((h, i) => (
                <motion.div
                  key={i}
                  className="flex-1 rounded-t-sm"
                  style={{ backgroundColor: i === 14 ? accent : `${accent}20`, height: `${h}%` }}
                  initial={{ height: 0 }}
                  animate={iv ? { height: `${h}%` } : {}}
                  transition={{ delay: 0.6 + i * 0.02, duration: 0.4 }}
                />
              ))}
            </div>
          </motion.div>

          {/* Agent status */}
          <div className="grid grid-cols-2 gap-2">
            {[{ n: "Support Agent", s: "Online", p: 92 }, { n: "Data Pipeline", s: "Processing", p: 68 }].map((agent, i) => (
              <motion.div
                key={agent.n}
                className="p-2.5 rounded-xl"
                style={{ backgroundColor: `${accent}04`, border: `1px solid ${accent}08` }}
                initial={{ opacity: 0, x: i === 0 ? -10 : 10 }}
                animate={iv ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.7 + i * 0.1 }}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[8px] font-bold" style={{ color: `${accent}70` }}>{agent.n}</span>
                  <motion.span
                    className="text-[6px] font-bold px-1.5 py-0.5 rounded-full"
                    style={{ backgroundColor: agent.s === "Online" ? `${accent}15` : `${accent}08`, color: agent.s === "Online" ? accent : `${accent}60` }}
                    animate={{ opacity: [1, 0.5, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >{agent.s}</motion.span>
                </div>
                <motion.div className="h-1.5 rounded-full" style={{ backgroundColor: `${accent}12` }}>
                  <motion.div className="h-full rounded-full" style={{ backgroundColor: accent, width: `${agent.p}%` }}
                    initial={{ width: 0 }} animate={iv ? { width: `${agent.p}%` } : {}}
                    transition={{ delay: 1 + i * 0.1, duration: 0.8, ease: "easeOut" }}
                  />
                </motion.div>
              </motion.div>
            ))}
          </div>

          {/* Confidence rings */}
          <div className="flex gap-2">
            {[{ l: "Precision", v: 96 }, { l: "Recall", v: 93 }, { l: "F1 Score", v: 94.5 }].map((m, i) => (
              <motion.div
                key={m.l}
                className="flex-1 p-2 rounded-lg text-center"
                style={{ backgroundColor: `${accent}06` }}
                initial={{ opacity: 0, y: 8 }}
                animate={iv ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.9 + i * 0.06 }}
              >
                <svg viewBox="0 0 32 32" className="w-8 h-8 mx-auto mb-1">
                  <circle cx="16" cy="16" r="14" fill="none" stroke={`${accent}12`} strokeWidth="3" />
                  <motion.circle cx="16" cy="16" r="14" fill="none" stroke={accent} strokeWidth="3"
                    strokeDasharray={`${m.v} ${100 - m.v}`} strokeLinecap="round"
                    initial={{ pathLength: 0 }} animate={iv ? { pathLength: 1 } : {}}
                    transition={{ delay: 1.1 + i * 0.06, duration: 0.6 }}
                  />
                </svg>
                <div className="text-[11px] font-bold" style={{ color: accent }}>{m.v}%</div>
                <div className="text-[6px] font-semibold uppercase tracking-wider" style={{ color: `${accent}50` }}>{m.l}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
