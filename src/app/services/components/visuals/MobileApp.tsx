"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

export default function MobileApp({ accent, accentLight }: { accent: string; accentLight: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const iv = useInView(ref, { once: true, margin: "-60px" });

  return (
    <div ref={ref} className="relative w-full h-full min-h-[400px] md:min-h-[480px] flex items-center justify-center p-6 overflow-hidden">
      <motion.div className="absolute inset-0 rounded-[32px]" style={{ background: `radial-gradient(ellipse at 50% 40%, ${accent}12 0%, transparent 60%)` }} animate={iv ? { opacity: [0.3, 0.5, 0.3] } : {}} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} />

      <motion.div
        className="relative w-[200px] rounded-[36px] overflow-hidden border-2"
        style={{ borderColor: `${accent}20`, backgroundColor: "#fff", boxShadow: `0 20px 60px ${accent}15` }}
        initial={{ y: 40, opacity: 0, rotateY: -8 }}
        animate={iv ? { y: 0, opacity: 1, rotateY: 0 } : {}}
        transition={{ duration: 0.7, ease: [0.19, 1, 0.22, 1] }}
        whileHover={{ y: -10, rotateZ: 2, rotateY: -5, boxShadow: `0 40px 80px ${accent}25` }}
      >
        {/* Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-4.5 rounded-b-xl z-10" style={{ backgroundColor: accent }} />

        {/* Status bar */}
        <div className="pt-6 px-4 pb-1 flex justify-between items-center text-[7px] font-semibold">
          <motion.span style={{ color: accent }} animate={{ opacity: [1, 0.4, 1] }} transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}>9:41</motion.span>
          <div className="flex gap-0.5">
            {[1, 0.6, 0.3].map((o, i) => (
              <div key={i} className="w-2.5 h-1 rounded-sm" style={{ backgroundColor: accent, opacity: o }} />
            ))}
          </div>
        </div>

        <div className="px-3 pb-5 space-y-2.5">
          {/* Header */}
          <div className="flex items-center justify-between">
            <motion.div className="text-[11px] font-bold" style={{ color: "#1C1C1C" }} initial={{ opacity: 0, x: -10 }} animate={iv ? { opacity: 1, x: 0 } : {}} transition={{ delay: 0.3 }}>RiverLoom</motion.div>
            <motion.div className="relative">
              <div className="w-5 h-5 rounded-full flex items-center justify-center" style={{ backgroundColor: `${accent}10` }}>
                <span className="text-[9px]">🔔</span>
              </div>
              <motion.div className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-red-500 border border-white"
                animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 1.5, repeat: Infinity }}
              />
            </motion.div>
          </div>

          {/* Feed cards */}
          {[
            { n: "Sarah Chen", t: "Just completed onboarding 🎉", time: "2m ago" },
            { n: "Design Team", t: "New mockups ready for review", time: "15m ago" },
            { n: "Deploy Bot", t: "v2.4.1 deployed to production ✅", time: "1h ago" },
          ].map((item, i) => (
            <motion.div key={i} className="p-2.5 rounded-xl" style={{ backgroundColor: `${accent}06`, border: `1px solid ${accent}08` }}
              initial={{ opacity: 0, y: 10 }} animate={iv ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.4 + i * 0.08 }}
              whileHover={{ backgroundColor: `${accent}10`, y: -2 }}
            >
              <div className="flex items-center gap-2 mb-1">
                <motion.div className="w-5 h-5 rounded-full flex items-center justify-center text-[7px] font-bold text-white flex-shrink-0"
                  style={{ backgroundColor: [accent, accentLight, "#8B5CF6"][i] }}
                  animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                >
                  {item.n.charAt(0)}
                </motion.div>
                <span className="text-[7px] font-bold flex-1" style={{ color: "#1C1C1C" }}>{item.n}</span>
                <span className="text-[6px]" style={{ color: `${accent}40` }}>{item.time}</span>
              </div>
              <p className="text-[7px]" style={{ color: `${accent}60` }}>{item.t}</p>
            </motion.div>
          ))}

          {/* Bottom Nav */}
          <motion.div className="flex items-center justify-around pt-1" initial={{ opacity: 0 }} animate={iv ? { opacity: 1 } : {}} transition={{ delay: 0.65 }}>
            {["🏠", "🔍", "👤", "⚙"].map((icon, i) => (
              <motion.div key={i} className="w-6 h-6 rounded-lg flex items-center justify-center text-[10px] cursor-pointer"
                style={{ backgroundColor: i === 0 ? accent : "transparent", color: i === 0 ? "#fff" : `${accent}40` }}
                whileHover={{ scale: 1.15 }}
              >{icon}</motion.div>
            ))}
          </motion.div>

          {/* Home indicator */}
          <div className="flex justify-center pt-0.5">
            <div className="w-8 h-1 rounded-full" style={{ backgroundColor: `${accent}25` }} />
          </div>
        </div>
      </motion.div>
    </div>
  );
}
