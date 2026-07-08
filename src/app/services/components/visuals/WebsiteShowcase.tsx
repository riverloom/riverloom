"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

export default function WebsiteShowcase({ accent, accentLight }: { accent: string; accentLight: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const iv = useInView(ref, { once: true, margin: "-30px" });

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
        {/* Mac-style window bar */}
        <div className="flex items-center gap-1.5 px-4 py-3 border-b" style={{ borderColor: `${accent}08`, backgroundColor: `${accent}02` }}>
          <motion.span className="w-2.5 h-2.5 rounded-full bg-red-400" whileHover={{ scale: 1.3 }} />
          <motion.span className="w-2.5 h-2.5 rounded-full bg-amber-400" whileHover={{ scale: 1.3 }} />
          <motion.span className="w-2.5 h-2.5 rounded-full bg-green-400" whileHover={{ scale: 1.3 }} />
          <motion.div className="ml-3 flex-1 h-5 rounded-md flex items-center px-2" style={{ backgroundColor: `${accent}06` }}
            initial={{ opacity: 0 }} animate={iv ? { opacity: 1 } : {}} transition={{ delay: 0.3 }}
          >
            <span className="w-1.5 h-1.5 rounded-full mr-1" style={{ backgroundColor: accent, opacity: 0.5 }} />
            <span className="text-[7px] font-medium" style={{ color: `${accent}50` }}>riverloom.com</span>
          </motion.div>
        </div>

        <div className="p-4 space-y-3">
          {/* Hero section mockup */}
          <motion.div className="text-center p-4 rounded-xl" style={{ backgroundColor: `${accent}04`, border: `1px solid ${accent}08` }}
            initial={{ opacity: 0 }} animate={iv ? { opacity: 1 } : {}} transition={{ delay: 0.35 }}
          >
            <motion.h3 className="text-[16px] font-bold tracking-[-0.02em] leading-tight mb-1" style={{ color: "#1C1C1C" }}
              initial={{ opacity: 0, y: -5 }} animate={iv ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.4 }}
            >
              Build Digital Products
              <br />
              <span style={{ color: accent }}>That Matter</span>
            </motion.h3>
            <motion.p className="text-[7px] font-medium mx-auto max-w-[200px]" style={{ color: `${accent}60` }}
              initial={{ opacity: 0 }} animate={iv ? { opacity: 1 } : {}} transition={{ delay: 0.45 }}
            >
              We design and engineer world-class digital experiences for modern businesses.
            </motion.p>
            <motion.div className="inline-flex items-center gap-1.5 mt-2 px-3 py-1 rounded-full text-[7px] font-bold text-white"
              style={{ backgroundColor: accent }}
              initial={{ opacity: 0, y: 5 }} animate={iv ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.5 }}
              whileHover={{ scale: 1.05 }}
            >
              Get in Touch →
            </motion.div>
          </motion.div>

          {/* Feature cards grid */}
          <div className="grid grid-cols-3 gap-1.5">
            {[
              { i: "🎨", l: "Design", c: accent },
              { i: "⚡", l: "Performance", c: accentLight },
              { i: "🔍", l: "SEO", c: "#22C55E" },
            ].map((f, i) => (
              <motion.div key={f.l} className="p-2 rounded-lg text-center" style={{ backgroundColor: `${accent}04`, border: `1px solid ${accent}08` }}
                initial={{ opacity: 0, y: 8 }} animate={iv ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.45 + i * 0.06 }}
                whileHover={{ backgroundColor: `${accent}10`, y: -2 }}
              >
                <motion.span className="text-[14px]" animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}>{f.i}</motion.span>
                <div className="text-[6px] font-bold uppercase tracking-wider mt-0.5" style={{ color: f.c }}>{f.l}</div>
              </motion.div>
            ))}
          </div>

          {/* Content preview blocks */}
          <div className="space-y-1.5">
            {[70, 85, 55].map((w, i) => (
              <motion.div key={i} className="flex items-center gap-2 p-2 rounded-lg" style={{ backgroundColor: `${accent}04` }}
                initial={{ opacity: 0, x: -8 }} animate={iv ? { opacity: 1, x: 0 } : {}} transition={{ delay: 0.55 + i * 0.06 }}
              >
                <div className="w-4 h-4 rounded-md flex items-center justify-center text-[6px] font-bold text-white flex-shrink-0"
                  style={{ backgroundColor: [accent, accentLight, "#8B5CF6"][i] }}
                >
                  {["W", "P", "B"][i]}
                </div>
                <div className="flex-1">
                  <motion.div className="h-1.5 rounded" style={{ backgroundColor: `${accent}20`, width: `${w}%` }}
                    animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
                  />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Lighthouse score */}
          <motion.div className="flex items-center gap-2 p-2 rounded-lg" style={{ backgroundColor: `${accent}06` }}
            initial={{ opacity: 0 }} animate={iv ? { opacity: 1 } : {}} transition={{ delay: 0.7 }}
          >
            <motion.div className="w-6 h-6 rounded-lg flex items-center justify-center text-[8px] font-bold" style={{ backgroundColor: accent, color: "#fff" }}
              animate={{ scale: [1, 1.05, 1] }} transition={{ duration: 2, repeat: Infinity }}
            >96</motion.div>
            <div className="flex-1">
              <div className="text-[7px] font-bold" style={{ color: accent }}>Lighthouse Score</div>
              <motion.div className="h-1 rounded-full mt-0.5" style={{ backgroundColor: `${accent}12` }}>
                <motion.div className="h-full rounded-full" style={{ backgroundColor: "#22C55E", width: "96%" }}
                  initial={{ width: 0 }} animate={iv ? { width: "96%" } : {}} transition={{ delay: 0.75, duration: 0.8, ease: "easeOut" }}
                />
              </motion.div>
            </div>
            <span className="text-[7px] font-bold text-green-500">A+</span>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
