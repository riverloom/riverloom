"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

export default function MarketingAnalytics({ accent, accentLight }: { accent: string; accentLight: string }) {
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
            <motion.div className="w-2 h-2 rounded-full" style={{ backgroundColor: accent }} animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 2, repeat: Infinity }} />
            <span className="text-[10px] font-bold tracking-wider uppercase" style={{ color: accent }}>Campaign Analytics</span>
          </div>
          <motion.span className="text-[7px] font-semibold px-2 py-0.5 rounded-full" style={{ backgroundColor: `${accent}12`, color: accent }}
            initial={{ scale: 0 }} animate={iv ? { scale: 1 } : {}} transition={{ delay: 0.4, type: "spring" }}
          >LIVE</motion.span>
        </div>

        <div className="p-4 space-y-3">
          {/* Top KPI row */}
          <div className="grid grid-cols-3 gap-2">
            {[{ v: "$124K", l: "Ad Spend", c: accent }, { v: "8.2x", l: "ROAS", c: "#22C55E" }, { v: "4.8%", l: "CTR", c: accentLight }].map((kpi, i) => (
              <motion.div key={kpi.l} className="p-2.5 rounded-xl text-center" style={{ backgroundColor: `${accent}06` }}
                initial={{ opacity: 0, y: 10 }} animate={iv ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.3 + i * 0.08 }}
              >
                <motion.div className="text-[15px] font-bold leading-none mb-0.5" style={{ color: kpi.c }}
                  animate={iv ? { scale: [1, 1.05, 1] } : {}} transition={{ duration: 2, repeat: Infinity, delay: 1 + i * 0.3 }}
                >{kpi.v}</motion.div>
                <div className="text-[7px] font-semibold uppercase tracking-wider" style={{ color: `${accent}60` }}>{kpi.l}</div>
              </motion.div>
            ))}
          </div>

          {/* Dual platform charts */}
          <div className="grid grid-cols-2 gap-2">
            {[{ p: "Google Ads", color: accent, data: [45, 62, 38, 70, 55, 82, 48, 65, 72, 58, 78, 68] },
              { p: "Meta Ads", color: "#1877F2", data: [35, 48, 55, 42, 68, 38, 58, 72, 45, 62, 50, 75] }
            ].map((platform, pi) => (
              <motion.div key={platform.p} className="p-2.5 rounded-xl" style={{ backgroundColor: `${accent}04`, border: `1px solid ${accent}08` }}
                initial={{ opacity: 0, x: pi === 0 ? -10 : 10 }} animate={iv ? { opacity: 1, x: 0 } : {}} transition={{ delay: 0.45 + pi * 0.08 }}
              >
                <div className="flex items-center gap-1 mb-2">
                  <motion.div className="w-4 h-4 rounded flex items-center justify-center text-[5px] font-bold text-white" style={{ backgroundColor: platform.color }}>{platform.p.charAt(0)}</motion.div>
                  <span className="text-[7px] font-semibold" style={{ color: `${accent}70` }}>{platform.p}</span>
                </div>
                <div className="flex items-end gap-0.5 h-14">
                  {platform.data.map((h, i) => (
                    <motion.div key={i} className="flex-1 rounded-t-sm" style={{ backgroundColor: i === 7 || i === 11 ? platform.color : `${accent}20`, height: `${h}%` }}
                      initial={{ height: 0 }} animate={iv ? { height: `${h}%` } : {}} transition={{ delay: 0.55 + pi * 0.08 + i * 0.015, duration: 0.3 }}
                    />
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Audience & Revenue */}
          <div className="flex gap-2">
            <motion.div className="flex-1 p-2.5 rounded-xl flex items-center gap-2" style={{ backgroundColor: `${accent}04`, border: `1px solid ${accent}08` }}
              initial={{ opacity: 0 }} animate={iv ? { opacity: 1 } : {}} transition={{ delay: 0.65 }}
            >
              <svg viewBox="0 0 32 32" className="w-8 h-8 flex-shrink-0">
                <circle cx="16" cy="16" r="13" fill="none" stroke={`${accent}12`} strokeWidth="3" />
                <motion.circle cx="16" cy="16" r="13" fill="none" stroke={accent} strokeWidth="3" strokeDasharray="42 39.8" strokeLinecap="round"
                  initial={{ pathLength: 0 }} animate={iv ? { pathLength: 1 } : {}} transition={{ delay: 0.7, duration: 0.5 }}
                />
                <motion.circle cx="16" cy="16" r="13" fill="none" stroke="#22C55E" strokeWidth="3" strokeDasharray="26 55.8" strokeDashoffset="-42" strokeLinecap="round"
                  initial={{ pathLength: 0 }} animate={iv ? { pathLength: 1 } : {}} transition={{ delay: 0.75, duration: 0.5 }}
                />
                <motion.circle cx="16" cy="16" r="13" fill="none" stroke="#F59E0B" strokeWidth="3" strokeDasharray="14 67.8" strokeDashoffset="-68" strokeLinecap="round"
                  initial={{ pathLength: 0 }} animate={iv ? { pathLength: 1 } : {}} transition={{ delay: 0.8, duration: 0.5 }}
                />
              </svg>
              <div>
                <div className="text-[7px] font-bold uppercase tracking-wider" style={{ color: `${accent}60` }}>Audience</div>
                <div className="text-[10px] font-bold" style={{ color: accent }}>245K Reach</div>
                <div className="text-[6px]" style={{ color: `${accent}40` }}>+12% vs last month</div>
              </div>
            </motion.div>

            <motion.div className="flex-1 p-2.5 rounded-xl" style={{ backgroundColor: `${accent}04`, border: `1px solid ${accent}08` }}
              initial={{ opacity: 0 }} animate={iv ? { opacity: 1 } : {}} transition={{ delay: 0.7 }}
            >
              <div className="text-[7px] font-bold uppercase tracking-wider mb-1" style={{ color: `${accent}60` }}>Revenue</div>
              <motion.div className="text-[14px] font-bold leading-none" style={{ color: accentLight }}
                animate={iv ? { scale: [1, 1.03, 1] } : {}} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >+32.5%</motion.div>
              <motion.div className="h-1.5 rounded-full mt-1" style={{ backgroundColor: `${accent}12` }}>
                <motion.div className="h-full rounded-full" style={{ backgroundColor: "#22C55E", width: "32.5%" }}
                  initial={{ width: 0 }} animate={iv ? { width: "32.5%" } : {}} transition={{ delay: 0.8, duration: 0.8, ease: "easeOut" }}
                />
              </motion.div>
            </motion.div>
          </div>

          {/* Bottom metric row */}
          <div className="flex gap-2">
            {[{ l: "Avg. CPC", v: "$1.42", c: accent }, { l: "Conv. Rate", v: "3.2%", c: "#22C55E" }, { l: "Quality Score", v: "9/10", c: accentLight }].map((m, i) => (
              <motion.div key={m.l} className="flex-1 p-2 rounded-lg text-center" style={{ backgroundColor: `${accent}06` }}
                initial={{ opacity: 0, y: 8 }} animate={iv ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.75 + i * 0.05 }}
              >
                <motion.div className="text-[10px] font-bold" style={{ color: m.c }}>{m.v}</motion.div>
                <div className="text-[6px] font-semibold uppercase tracking-wider" style={{ color: `${accent}50` }}>{m.l}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
