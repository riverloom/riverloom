"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

export default function PlatformTopology({ accent, accentLight }: { accent: string; accentLight: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const iv = useInView(ref, { once: true, margin: "-60px" });

  const nodes = [
    { id: "api", x: 50, y: 18, label: "API Gateway", color: "#3B82F6", status: "healthy" },
    { id: "auth", x: 18, y: 45, label: "Auth", color: "#8B5CF6", status: "healthy" },
    { id: "users", x: 50, y: 45, label: "Users", color: "#06B6D4", status: "healthy" },
    { id: "payments", x: 82, y: 45, label: "Payments", color: "#F59E0B", status: "degraded" },
    { id: "notif", x: 82, y: 78, label: "Notify", color: "#EC4899", status: "healthy" },
    { id: "db", x: 18, y: 78, label: "DB", color: "#10B981", status: "healthy" },
  ];

  const connections = [
    [0, 1], [0, 2], [0, 3], [1, 5], [2, 5], [3, 4], [2, 4], [1, 4],
  ];

  const packets = [
    [50, 18, 18, 45, 0], [50, 18, 50, 45, 1], [18, 45, 18, 78, 2], [50, 45, 82, 78, 3],
  ];

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
            <span className="text-[10px] font-bold tracking-wider uppercase" style={{ color: accent }}>Deployment Topology</span>
          </div>
          <motion.span className="text-[7px] font-semibold px-2 py-0.5 rounded-full" style={{ backgroundColor: `${accent}12`, color: accent }} initial={{ scale: 0 }} animate={iv ? { scale: 1 } : {}} transition={{ delay: 0.4, type: "spring" }}>LIVE</motion.span>
        </div>

        {/* Topology SVG */}
        <div className="p-4">
          <motion.svg viewBox="0 0 100 95" className="w-full h-[200px]" initial={{ opacity: 0 }} animate={iv ? { opacity: 1 } : {}} transition={{ delay: 0.2 }}>
            {/* Connection lines */}
            {connections.map(([f, t], i) => (
              <motion.line key={i} x1={nodes[f].x} y1={nodes[f].y} x2={nodes[t].x} y2={nodes[t].y}
                stroke={`${accent}25`} strokeWidth="0.5" strokeDasharray="2 2"
                initial={{ pathLength: 0 }} animate={iv ? { pathLength: 1 } : {}}
                transition={{ duration: 1.2, delay: 0.3 + i * 0.05 }}
              />
            ))}

            {/* Data packets */}
            {packets.map((pkt, i) => (
              <motion.circle key={`pkt-${i}`} r="1.5" fill={accentLight}
                animate={iv ? { cx: [pkt[0], pkt[2], pkt[0]], cy: [pkt[1], pkt[3], pkt[1]], opacity: [0, 0.9, 0], scale: [0.3, 1.2, 0.3] } : {}}
                transition={{ duration: 2.5 + i * 0.3, repeat: Infinity, delay: 1.2 + i * 0.4, ease: "easeInOut" }}
              />
            ))}

            {/* Nodes */}
            {nodes.map((n, i) => (
              <g key={n.id}>
                <motion.rect x={n.x - 12} y={n.y - 7} width="24" height="14" rx="3"
                  fill={`${n.color}10`} stroke={n.color} strokeWidth="0.6"
                  initial={{ opacity: 0, scale: 0.8 }} animate={iv ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.4 + i * 0.08, type: "spring" }}
                />
                <text x={n.x} y={n.y + 1} textAnchor="middle" fill={n.color} fontSize="2.8" fontWeight="700" fontFamily="sans-serif">{n.label}</text>
                <motion.circle cx={n.x + 13} cy={n.y - 8} r="1.8"
                  fill={n.status === "healthy" ? "#22C55E" : "#F59E0B"}
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.15 }}
                />
              </g>
            ))}
          </motion.svg>

          {/* Resource Usage */}
          <motion.div
            className="p-3 rounded-xl mt-2"
            style={{ backgroundColor: `${accent}04`, border: `1px solid ${accent}08` }}
            initial={{ opacity: 0, y: 10 }}
            animate={iv ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.7 }}
          >
            <div className="grid grid-cols-2 gap-3">
              {[{ l: "CPU", v: 42 }, { l: "Memory", v: 68 }].map((res) => (
                <div key={res.l}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[8px] font-bold" style={{ color: `${accent}60` }}>{res.l}</span>
                    <span className="text-[8px] font-bold" style={{ color: res.v > 60 ? "#F59E0B" : accent }}>{res.v}%</span>
                  </div>
                  <motion.div className="h-1.5 rounded-full" style={{ backgroundColor: `${accent}12` }}>
                    <motion.div className="h-full rounded-full" style={{ backgroundColor: res.v > 60 ? "#F59E0B" : accent, width: `${res.v}%` }}
                      initial={{ width: 0 }} animate={iv ? { width: `${res.v}%` } : {}}
                      transition={{ delay: 0.9, duration: 0.8, ease: "easeOut" }}
                    />
                  </motion.div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Status Bar */}
          <motion.div className="flex items-center justify-between mt-3 px-2" initial={{ opacity: 0 }} animate={iv ? { opacity: 1 } : {}} transition={{ delay: 1 }}>
            <div className="flex items-center gap-2">
              <div className="flex -space-x-1">
                {["#22C55E", "#22C55E", "#22C55E", "#F59E0B"].map((c, i) => (
                  <motion.div key={i} className="w-2 h-2 rounded-full border border-white" style={{ backgroundColor: c }} animate={{ opacity: [1, 0.5, 1] }} transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }} />
                ))}
              </div>
              <span className="text-[8px] font-semibold" style={{ color: `${accent}50` }}>5/6 healthy</span>
            </div>
            <span className="text-[7px] font-mono" style={{ color: `${accent}40` }}>v2.4.1</span>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
