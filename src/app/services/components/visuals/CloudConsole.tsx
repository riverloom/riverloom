"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

export default function CloudConsole({ accent, accentLight }: { accent: string; accentLight: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const iv = useInView(ref, { once: true, margin: "-60px" });

  const services = [
    { n: "Compute", s: "12 instances", c: accent },
    { n: "Storage", s: "4.2 TB used", c: accentLight },
    { n: "Database", s: "3 clusters", c: "#8B5CF6" },
    { n: "Networking", s: "6 VPCs", c: "#06B6D4" },
  ];

  return (
    <div ref={ref} className="relative w-full h-full min-h-[400px] md:min-h-[480px] flex items-center justify-center p-6 overflow-hidden">
      <motion.div className="absolute inset-0 rounded-[32px]" style={{ background: `radial-gradient(ellipse at 50% 30%, ${accent}15 0%, transparent 60%)` }} animate={iv ? { opacity: [0.3, 0.5, 0.3] } : {}} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} />

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
            <span className="text-[10px] font-bold tracking-wider uppercase" style={{ color: accent }}>Cloud Console</span>
          </div>
          <motion.span className="text-[7px] font-semibold px-2 py-0.5 rounded-full" style={{ backgroundColor: `${accent}12`, color: accent }}
            initial={{ scale: 0 }} animate={iv ? { scale: 1 } : {}} transition={{ delay: 0.4, type: "spring" }}
          >ACTIVE</motion.span>
        </div>

        <div className="p-4 space-y-3">
          {/* Region + status */}
          <motion.div className="flex items-center justify-between" initial={{ opacity: 0 }} animate={iv ? { opacity: 1 } : {}} transition={{ delay: 0.3 }}>
            <div className="flex items-center gap-1.5">
              <span className="text-[8px] font-semibold" style={{ color: `${accent}60` }}>Region:</span>
              <motion.span className="text-[8px] font-bold px-1.5 py-0.5 rounded" style={{ backgroundColor: `${accent}10`, color: accent }}>us-east-1</motion.span>
            </div>
            <motion.div className="flex items-center gap-1">
              <motion.div className="w-1.5 h-1.5 rounded-full bg-green-500" animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1.5, repeat: Infinity }} />
              <span className="text-[7px] font-medium text-green-500">All healthy</span>
            </motion.div>
          </motion.div>

          {/* Resource grid */}
          <div className="grid grid-cols-2 gap-1.5">
            {services.map((svc, i) => (
              <motion.div key={svc.n} className="p-2.5 rounded-xl" style={{ backgroundColor: `${accent}04`, border: `1px solid ${accent}08` }}
                initial={{ opacity: 0, y: 8 }} animate={iv ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.35 + i * 0.06 }}
                whileHover={{ backgroundColor: `${accent}10`, y: -2 }}
              >
                <div className="text-[8px] font-bold" style={{ color: svc.c }}>{svc.n}</div>
                <div className="text-[7px] font-medium" style={{ color: `${accent}50` }}>{svc.s}</div>
                <motion.div className="h-1 rounded-full mt-1.5" style={{ backgroundColor: `${accent}10` }}>
                  <motion.div className="h-full rounded-full" style={{ backgroundColor: svc.c, width: `${40 + i * 12}%` }}
                    initial={{ width: 0 }} animate={iv ? { width: `${40 + i * 12}%` } : {}} transition={{ delay: 0.5 + i * 0.06, duration: 0.5 }}
                  />
                </motion.div>
              </motion.div>
            ))}
          </div>

          {/* Deployment pipeline */}
          <motion.div className="p-3 rounded-xl" style={{ backgroundColor: `${accent}04`, border: `1px solid ${accent}08` }}
            initial={{ opacity: 0 }} animate={iv ? { opacity: 1 } : {}} transition={{ delay: 0.55 }}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-[7px] font-bold uppercase tracking-wider" style={{ color: `${accent}60` }}>Recent Deployments</span>
              <motion.span className="text-[7px] font-bold" style={{ color: "#22C55E" }}>
                <motion.span animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1.5, repeat: Infinity }}>●</motion.span> All passing
              </motion.span>
            </div>
            {[{ s: "Frontend", v: "v3.2.1", t: "2m ago", st: "success" }, { s: "API Gateway", v: "v2.8.0", t: "15m ago", st: "success" }, { s: "Workers", v: "v1.5.3", t: "1h ago", st: "pending" }].map((dep, i) => (
              <motion.div key={dep.s} className="flex items-center justify-between py-1.5" initial={{ opacity: 0, x: -8 }} animate={iv ? { opacity: 1, x: 0 } : {}} transition={{ delay: 0.6 + i * 0.06 }}>
                <div className="flex items-center gap-1.5">
                  <motion.div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: dep.st === "success" ? "#22C55E" : "#F59E0B" }}
                    animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                  />
                  <span className="text-[7px] font-semibold" style={{ color: "#1C1C1C" }}>{dep.s}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[6px] font-mono" style={{ color: `${accent}50` }}>{dep.v}</span>
                  <span className="text-[6px]" style={{ color: `${accent}40` }}>{dep.t}</span>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Cost bar */}
          <motion.div className="flex items-center justify-between p-2 rounded-lg" style={{ backgroundColor: `${accent}06` }}
            initial={{ opacity: 0 }} animate={iv ? { opacity: 1 } : {}} transition={{ delay: 0.7 }}
          >
            <span className="text-[7px] font-bold uppercase tracking-wider" style={{ color: `${accent}50` }}>Monthly Cost</span>
            <div className="flex items-center gap-2">
              <motion.div className="h-1.5 w-20 rounded-full" style={{ backgroundColor: `${accent}12` }}>
                <motion.div className="h-full rounded-full" style={{ backgroundColor: accent, width: "62%" }}
                  initial={{ width: 0 }} animate={iv ? { width: "62%" } : {}} transition={{ delay: 0.75, duration: 0.6 }}
                />
              </motion.div>
              <span className="text-[8px] font-bold" style={{ color: accent }}>$4,280</span>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
