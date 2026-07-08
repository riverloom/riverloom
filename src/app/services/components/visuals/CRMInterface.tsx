"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

export default function CRMInterface({ accent, accentLight }: { accent: string; accentLight: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const iv = useInView(ref, { once: true, margin: "-60px" });

  const deals = [
    { n: "TechCorp", v: "$48K", p: "Negotiation", c: accent },
    { n: "DataFlow", v: "$32K", p: "Proposal", c: accentLight },
    { n: "CloudBase", v: "$24K", p: "Discovery", c: "#8B5CF6" },
  ];

  return (
    <div ref={ref} className="relative w-full h-full min-h-[400px] md:min-h-[480px] flex items-center justify-center p-6 overflow-hidden">
      <motion.div className="absolute inset-0 rounded-[32px]" style={{ background: `radial-gradient(ellipse at 50% 30%, ${accent}15 0%, transparent 60%)` }} animate={iv ? { opacity: [0.3, 0.5, 0.3] } : {}} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} />

      <motion.div
        className="relative w-full max-w-[460px] rounded-2xl overflow-hidden border"
        style={{ borderColor: `${accent}15`, backgroundColor: "rgba(255,255,255,0.97)", boxShadow: `0 20px 60px ${accent}12` }}
        initial={{ y: 30, opacity: 0, scale: 0.95 }}
        animate={iv ? { y: 0, opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.7, ease: [0.19, 1, 0.22, 1] }}
        whileHover={{ y: -4, boxShadow: `0 30px 80px ${accent}25` }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b" style={{ borderColor: `${accent}08`, backgroundColor: `${accent}02` }}>
          <div className="flex items-center gap-2">
            <motion.div className="w-2 h-2 rounded-full" style={{ backgroundColor: accent }} animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 2, repeat: Infinity }} />
            <span className="text-[10px] font-bold tracking-wider uppercase" style={{ color: accent }}>CRM Dashboard</span>
          </div>
          <motion.div className="flex items-center gap-1.5">
            <motion.span className="w-4 h-4 rounded-md flex items-center justify-center text-[8px]" style={{ backgroundColor: `${accent}10`, color: accent }}>+</motion.span>
            <span className="text-[7px] font-medium" style={{ color: `${accent}50` }}>New Deal</span>
          </motion.div>
        </div>

        <div className="p-4 space-y-3">
          {/* Pipeline stats */}
          <motion.div className="grid grid-cols-3 gap-2" initial={{ opacity: 0 }} animate={iv ? { opacity: 1 } : {}} transition={{ delay: 0.3 }}>
            {[{ v: "$104K", l: "Pipeline Value", c: accent }, { v: "12", l: "Active Deals", c: accentLight }, { v: "3.2x", l: "Win Rate", c: "#22C55E" }].map((s, i) => (
              <motion.div key={s.l} className="p-2 rounded-lg text-center" style={{ backgroundColor: `${accent}06` }}
                initial={{ opacity: 0, y: 8 }} animate={iv ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.35 + i * 0.06 }}
              >
                <div className="text-[13px] font-bold leading-none mb-0.5" style={{ color: s.c }}>{s.v}</div>
                <div className="text-[6px] font-semibold uppercase tracking-wider" style={{ color: `${accent}50` }}>{s.l}</div>
              </motion.div>
            ))}
          </motion.div>

          {/* Deals list */}
          <motion.div initial={{ opacity: 0 }} animate={iv ? { opacity: 1 } : {}} transition={{ delay: 0.45 }}>
            <div className="flex items-center justify-between mb-1.5 px-1">
              {["Deal", "Value", "Stage"].map((h) => (
                <span key={h} className="text-[6px] font-bold uppercase tracking-widest flex-1" style={{ color: `${accent}40` }}>{h}</span>
              ))}
              <span className="w-4" />
            </div>
            {deals.map((deal, i) => (
              <motion.div key={deal.n} className="flex items-center px-1 py-2 rounded-lg mb-0.5" style={{ backgroundColor: `${accent}04` }}
                initial={{ opacity: 0, x: -8 }} animate={iv ? { opacity: 1, x: 0 } : {}} transition={{ delay: 0.5 + i * 0.07 }}
                whileHover={{ backgroundColor: `${accent}10` }}
              >
                <div className="flex-1 flex items-center gap-1.5">
                  <motion.div className="w-4 h-4 rounded-md flex items-center justify-center text-[6px] font-bold text-white" style={{ backgroundColor: deal.c }}
                    animate={{ scale: [1, 1.08, 1] }} transition={{ duration: 2, repeat: Infinity, delay: i * 0.4 }}
                  >{deal.n.charAt(0)}</motion.div>
                  <span className="text-[8px] font-semibold" style={{ color: "#1C1C1C" }}>{deal.n}</span>
                </div>
                <span className="text-[8px] font-bold flex-1" style={{ color: deal.c }}>{deal.v}</span>
                <span className="text-[6px] font-medium px-1.5 py-0.5 rounded flex-1" style={{ backgroundColor: `${deal.c}12`, color: deal.c, width: "fit-content" }}>{deal.p}</span>
                <motion.div className="w-4 flex justify-center" whileHover={{ x: 2 }}>
                  <span className="text-[8px]" style={{ color: `${accent}30` }}>→</span>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>

          {/* Pipeline chart */}
          <motion.div className="p-3 rounded-xl" style={{ backgroundColor: `${accent}04`, border: `1px solid ${accent}08` }}
            initial={{ opacity: 0 }} animate={iv ? { opacity: 1 } : {}} transition={{ delay: 0.65 }}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-[7px] font-bold uppercase tracking-wider" style={{ color: `${accent}60` }}>Conversion Funnel</span>
              <motion.span className="text-[7px] font-bold" style={{ color: "#22C55E" }}>+18% MoM</motion.span>
            </div>
            <div className="space-y-1.5">
              {[{ l: "Lead → Qualified", v: 72 }, { l: "Qualified → Proposal", v: 48 }, { l: "Proposal → Closed", v: 24 }].map((stage) => (
                <div key={stage.l}>
                  <div className="flex items-center justify-between mb-0.5">
                    <span className="text-[6px] font-medium" style={{ color: `${accent}50` }}>{stage.l}</span>
                    <span className="text-[7px] font-bold" style={{ color: accent }}>{stage.v}%</span>
                  </div>
                  <motion.div className="h-1.5 rounded-full" style={{ backgroundColor: `${accent}10` }}>
                    <motion.div className="h-full rounded-full" style={{ backgroundColor: accent, width: `${stage.v}%` }}
                      initial={{ width: 0 }} animate={iv ? { width: `${stage.v}%` } : {}}
                      transition={{ delay: 0.8, duration: 0.6, ease: "easeOut" }}
                    />
                  </motion.div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Team activity */}
          <motion.div className="flex items-center gap-2" initial={{ opacity: 0 }} animate={iv ? { opacity: 1 } : {}} transition={{ delay: 0.8 }}>
            <div className="flex -space-x-1">
              {["#3B82F6", "#8B5CF6", "#EC4899", "#F59E0B"].map((c, i) => (
                <motion.div key={i} className="w-4 h-4 rounded-full border border-white flex items-center justify-center text-[5px] font-bold text-white" style={{ backgroundColor: c }}
                  animate={{ y: [0, -2, 0] }} transition={{ duration: 2, repeat: Infinity, delay: i * 0.15 }}
                >{["S", "M", "A", "J"][i]}</motion.div>
              ))}
            </div>
            <span className="text-[6px] font-medium" style={{ color: `${accent}50` }}>3 team members online</span>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
