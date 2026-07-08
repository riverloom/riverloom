"use client";

import { useRef, useMemo } from "react";
import { motion, useInView } from "framer-motion";

/* ═══════════════════════════════════════════════════════════════
   FLOATING GLOW BLOBS
   Randomly positioned blurred circles that float slowly
   ═══════════════════════════════════════════════════════════════ */
export function FloatingGlows({ count = 6 }: { count?: number }) {
  const blobs = useMemo(() => {
    return Array.from({ length: count }, (_, i) => {
      const hue = [120, 200, 260, 340, 180, 50][i % 6];
      const sat = 40 + (i * 17) % 40;
      const light = 55 + (i * 13) % 25;
      return {
        id: i,
        x: 5 + ((i * 37 + 13) % 90),
        y: 8 + ((i * 53 + 7) % 85),
        w: 200 + ((i * 97) % 300),
        h: 200 + ((i * 73) % 300),
        d: 6 + ((i * 11) % 8),
        dd: (i * 0.7) % 3,
        color: `hsla(${hue}, ${sat}%, ${light}%, 0.04)`,
      };
    });
  }, [count]);

  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden z-0">
      {blobs.map((b) => (
        <motion.div
          key={b.id}
          className="absolute rounded-full blur-[100px]"
          style={{
            left: `${b.x}%`,
            top: `${b.y}%`,
            width: b.w,
            height: b.h,
            background: b.color,
          }}
          animate={{
            y: [0, -20, 0],
            x: [0, b.id % 2 === 0 ? 10 : -10, 0],
            scale: [1, 1.08, 1],
          }}
          transition={{
            duration: b.d,
            delay: b.dd,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   TINY FLOATING DOTS
   ═══════════════════════════════════════════════════════════════ */
export function FloatingDots({ count = 30 }: { count?: number }) {
  const dots = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      x: ((i * 73 + 31) % 100),
      y: ((i * 47 + 19) % 100),
      s: 1 + ((i * 11) % 3),
      o: 0.02 + ((i * 7) % 100) * 0.0006,
      d: 8 + ((i * 13) % 15),
      dd: ((i * 3) % 5),
      dx: (i % 2 === 0 ? 1 : -1) * (1 + ((i * 5) % 4)),
      dy: (i % 3 === 0 ? 1 : -1) * (1 + ((i * 7) % 4)),
    }));
  }, [count]);

  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden z-0">
      {dots.map((d) => (
        <motion.div
          key={d.id}
          className="absolute rounded-full bg-current"
          style={{
            left: `${d.x}%`,
            top: `${d.y}%`,
            width: d.s,
            height: d.s,
            opacity: d.o,
          }}
          animate={{
            y: [0, d.dy * 8, 0],
            x: [0, d.dx * 6, 0],
            opacity: [d.o, d.o * 2.5, d.o],
          }}
          transition={{
            duration: d.d,
            delay: d.dd,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SECTION-SPECIFIC FLOATING DECORATIONS
   Placed inside a service section to add background richness
   ═══════════════════════════════════════════════════════════════ */
export function SectionGlow({
  accent,
  className,
}: {
  accent: string;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const iv = useInView(ref, { once: true, margin: "-80px" });

  return (
    <div ref={ref} className={`absolute inset-0 pointer-events-none overflow-hidden ${className ?? ""}`}>
      <motion.div
        className="absolute top-[20%] left-[10%] w-[400px] h-[400px] rounded-full blur-[120px]"
        style={{ background: `radial-gradient(circle, ${accent} 0%, transparent 70%)` }}
        initial={{ opacity: 0, scale: 0.5 }}
        animate={iv ? { opacity: 0.06, scale: 1 } : {}}
        transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
      />
      <motion.div
        className="absolute bottom-[10%] right-[5%] w-[300px] h-[300px] rounded-full blur-[100px]"
        style={{ background: `radial-gradient(circle, ${accent} 0%, transparent 70%)` }}
        initial={{ opacity: 0, scale: 0.5 }}
        animate={iv ? { opacity: 0.04, scale: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.19, 1, 0.22, 1] }}
      />

      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.012]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' xmlns='http://www.w3.org/2000/svg'%3E%3Cline x1='0' y1='0' x2='40' y2='0' stroke='${encodeURIComponent(accent)}' strokeWidth='0.3'/%3E%3Cline x1='0' y1='0' x2='0' y2='40' stroke='${encodeURIComponent(accent)}' strokeWidth='0.3'/%3E%3C/svg%3E")`,
          backgroundSize: "40px 40px",
        }}
      />
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   ROTATING GLOWING RING
   Used in final CTA
   ═══════════════════════════════════════════════════════════════ */
export function GlowingRing({ accent = "#169B62" }: { accent?: string }) {
  return (
    <motion.div
      className="absolute w-[300px] h-[300px] md:w-[500px] md:h-[500px] rounded-full border pointer-events-none"
      style={{
        borderColor: `${accent}15`,
        boxShadow: `0 0 60px ${accent}08, inset 0 0 60px ${accent}08`,
      }}
      animate={{ rotate: 360 }}
      transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
    >
      <motion.div
        className="absolute top-0 left-1/2 w-2 h-2 rounded-full"
        style={{ backgroundColor: accent, boxShadow: `0 0 12px ${accent}` }}
        animate={{ opacity: [0.3, 1, 0.3] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      />
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   ANIMATED GRADIENT MESH (AURORA)
   ═══════════════════════════════════════════════════════════════ */
export function AuroraMesh({
  accent1 = "#169B62",
  accent2 = "#22C55E",
  accent3 = "#06B6D4",
}: {
  accent1?: string;
  accent2?: string;
  accent3?: string;
}) {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <motion.div
        className="absolute -top-1/4 -left-1/4 w-1/2 h-1/2 rounded-full blur-[120px]"
        style={{ background: `radial-gradient(circle, ${accent1}20, transparent 70%)` }}
        animate={{
          x: [0, 30, 0],
          y: [0, -20, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-1/3 -right-1/4 w-1/2 h-1/2 rounded-full blur-[120px]"
        style={{ background: `radial-gradient(circle, ${accent2}15, transparent 70%)` }}
        animate={{
          x: [0, -25, 0],
          y: [0, 30, 0],
          scale: [1, 1.15, 1],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -bottom-1/4 left-1/3 w-1/2 h-1/2 rounded-full blur-[120px]"
        style={{ background: `radial-gradient(circle, ${accent3}10, transparent 70%)` }}
        animate={{
          x: [0, 20, 0],
          y: [0, -25, 0],
          scale: [1, 1.05, 1],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   FLOATING PARTICLES (for final CTA)
   ═══════════════════════════════════════════════════════════════ */
export function FloatingParticles({ count = 20 }: { count?: number }) {
  const particles = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      x: ((i * 83 + 17) % 100),
      y: ((i * 59 + 23) % 100),
      s: 2 + ((i * 7) % 4),
      o: 0.04 + ((i * 11) % 50) * 0.002,
      d: 10 + ((i * 17) % 20),
      dd: ((i * 5) % 8),
      dx: (i % 2 === 0 ? 1 : -1) * (0.5 + ((i * 3) % 3)),
      dy: (i % 3 === 0 ? 1 : -1) * (0.5 + ((i * 5) % 3)),
    }));
  }, [count]);

  return (
    <>
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-white/40"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.s,
            height: p.s,
          }}
          animate={{
            y: [0, p.dy * 15, 0],
            x: [0, p.dx * 12, 0],
            opacity: [p.o, p.o * 2, p.o],
          }}
          transition={{
            duration: p.d,
            delay: p.dd,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </>
  );
}
