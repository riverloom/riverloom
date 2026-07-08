"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

export default function SaaSPlatform({ accent, accentLight }: { accent: string; accentLight: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const iv = useInView(ref, { once: true, margin: "-60px" });

  return (
    <div ref={ref} className="relative w-full h-full min-h-[400px] md:min-h-[480px] flex items-center justify-center p-6 overflow-hidden">
      <motion.div className="absolute inset-0 rounded-[32px]" style={{ background: `radial-gradient(ellipse at 50% 40%, ${accent}12 0%, transparent 60%)` }} animate={iv ? { opacity: [0.3, 0.5, 0.3] } : {}} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} />

      <motion.div
        className="relative w-full max-w-[460px] rounded-2xl overflow-hidden border"
        style={{ borderColor: `${accent}15`, backgroundColor: "rgba(255,255,255,0.97)", boxShadow: `0 20px 60px ${accent}10` }}
        initial={{ y: 30, opacity: 0, scale: 0.95 }}
        animate={iv ? { y: 0, opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.7, ease: [0.19, 1, 0.22, 1] }}
        whileHover={{ y: -4, boxShadow: `0 30px 80px ${accent}20` }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b" style={{ borderColor: `${accent}08`, backgroundColor: `${accent}02` }}>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg flex items-center justify-center text-[10px] font-bold text-white" style={{ backgroundColor: accent }}>P</div>
            <span className="text-[10px] font-bold" style={{ color: accent }}>Platform Admin</span>
          </div>
          <motion.div className="w-5 h-5 rounded-full flex items-center justify-center" style={{ backgroundColor: `${accent}12` }}>
            <span className="text-[8px]" style={{ color: accent }}>🔔</span>
          </motion.div>
        </div>

        <div className="flex" style={{ minHeight: 280 }}>
          {/* Sidebar */}
          <motion.div className="w-12 py-3 flex flex-col items-center gap-4 border-r" style={{ borderColor: `${accent}08`, backgroundColor: `${accent}02` }}
            initial={{ opacity: 0, x: -10 }} animate={iv ? { opacity: 1, x: 0 } : {}} transition={{ delay: 0.3 }}
          >
            {[{ i: "▦", a: true }, { i: "👥", a: false }, { i: "💳", a: false }, { i: "📊", a: false }, { i: "⚙", a: false }].map((item, idx) => (
              <motion.div key={idx} className="w-7 h-7 rounded-lg flex items-center justify-center text-[11px] cursor-pointer"
                style={{ backgroundColor: item.a ? accent : "transparent", color: item.a ? "#fff" : `${accent}40` }}
                whileHover={{ scale: 1.1 }} initial={{ opacity: 0, y: 5 }} animate={iv ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.3 + idx * 0.04 }}
              >{item.i}</motion.div>
            ))}
          </motion.div>

          {/* Content */}
          <div className="flex-1 p-3 space-y-3">
            {/* Subscription summary */}
            <motion.div className="grid grid-cols-3 gap-1.5" initial={{ opacity: 0 }} animate={iv ? { opacity: 1 } : {}} transition={{ delay: 0.4 }}>
              {[{ v: "1,247", l: "Active", c: accent }, { v: "342", l: "Trial", c: accentLight }, { v: "89", l: "Churned", c: `${accent}60` }].map((s, i) => (
                <motion.div key={s.l} className="p-2 rounded-lg text-center" style={{ backgroundColor: `${accent}06` }}
                  initial={{ opacity: 0, y: 8 }} animate={iv ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.45 + i * 0.06 }}
                >
                  <div className="text-[13px] font-bold leading-none mb-0.5" style={{ color: s.c }}>{s.v}</div>
                  <div className="text-[6px] font-semibold uppercase tracking-wider" style={{ color: `${accent}50` }}>{s.l}</div>
                </motion.div>
              ))}
            </motion.div>

            {/* Table */}
            <motion.div initial={{ opacity: 0 }} animate={iv ? { opacity: 1 } : {}} transition={{ delay: 0.55 }}>
              <div className="flex items-center justify-between mb-1.5 px-1">
                {["Name", "Plan", "Status", "Date"].map((h) => (
                  <span key={h} className="text-[6px] font-bold uppercase tracking-widest flex-1" style={{ color: `${accent}40` }}>{h}</span>
                ))}
              </div>
              {[
                { n: "Acme Corp", p: "Enterprise", s: "Active", d: "Mar 12" },
                { n: "Globex Inc", p: "Pro", s: "Active", d: "Mar 10" },
                { n: "Initech", p: "Trial", s: "Pending", d: "Mar 8" },
              ].map((row, i) => (
                <motion.div key={row.n} className="flex items-center px-1 py-1.5 rounded-lg mb-0.5" style={{ backgroundColor: `${accent}04` }}
                  initial={{ opacity: 0, x: -8 }} animate={iv ? { opacity: 1, x: 0 } : {}} transition={{ delay: 0.6 + i * 0.06 }}
                  whileHover={{ backgroundColor: `${accent}08` }}
                >
                  <span className="text-[8px] font-semibold flex-1" style={{ color: accent }}>{row.n}</span>
                  <span className="text-[7px] font-medium flex-1" style={{ color: `${accent}60` }}>{row.p}</span>
                  <span className="text-[6px] font-bold px-1 py-0.5 rounded flex-1" style={{
                    backgroundColor: row.s === "Active" ? `${accent}15` : `${accent}08`,
                    color: row.s === "Active" ? accent : `${accent}50`,
                    width: "fit-content",
                  }}>{row.s}</span>
                  <span className="text-[7px] flex-1" style={{ color: `${accent}40` }}>{row.d}</span>
                </motion.div>
              ))}
            </motion.div>

            {/* Revenue chart */}
            <motion.div className="p-2.5 rounded-xl" style={{ backgroundColor: `${accent}04`, border: `1px solid ${accent}08` }}
              initial={{ opacity: 0 }} animate={iv ? { opacity: 1 } : {}} transition={{ delay: 0.75 }}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[7px] font-bold uppercase tracking-wider" style={{ color: `${accent}60` }}>Monthly Revenue</span>
                <motion.span className="text-[8px] font-bold" style={{ color: "#22C55E" }}>$48.2K</motion.span>
              </div>
              <div className="flex items-end gap-1 h-12">
                {[40, 52, 38, 65, 48, 72, 56, 80, 62, 75, 68, 90].map((h, i) => (
                  <motion.div key={i} className="flex-1 rounded-t-sm" style={{ backgroundColor: i === 11 ? accent : `${accent}20`, height: `${h}%` }}
                    initial={{ height: 0 }} animate={iv ? { height: `${h}%` } : {}} transition={{ delay: 0.8 + i * 0.02, duration: 0.4 }}
                  />
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
