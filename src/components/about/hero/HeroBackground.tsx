"use client";

import { useRef, useEffect, useCallback } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

/* ─── Animated drift orbs ─── */
function DriftingOrbs() {
  const orbs = [
    { size: 600, x: "15%", y: "20%", color: "rgba(22,155,98,0.05)", duration: 25, delay: 0 },
    { size: 500, x: "75%", y: "60%", color: "rgba(31,199,126,0.04)", duration: 30, delay: 3 },
    { size: 700, x: "50%", y: "80%", color: "rgba(99,102,241,0.03)", duration: 28, delay: 1 },
    { size: 400, x: "30%", y: "70%", color: "rgba(22,155,98,0.04)", duration: 22, delay: 5 },
    { size: 350, x: "80%", y: "15%", color: "rgba(31,199,126,0.03)", duration: 26, delay: 2 },
  ];

  return (
    <>
      {orbs.map((orb, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full pointer-events-none"
          style={{
            width: orb.size,
            height: orb.size,
            background: `radial-gradient(circle at center, ${orb.color} 0%, transparent 65%)`,
            filter: "blur(80px)",
            left: orb.x,
            top: orb.y,
            translateX: "-50%",
            translateY: "-50%",
          }}
          animate={{
            x: [0, 30, -20, 15, 0],
            y: [0, -25, 15, -10, 0],
          }}
          transition={{
            duration: orb.duration,
            delay: orb.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          aria-hidden
        />
      ))}
    </>
  );
}

/* ─── Mouse-driven spotlight follow ─── */
function MouseSpotlights() {
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const springX = useSpring(mouseX, { stiffness: 40, damping: 25 });
  const springY = useSpring(mouseY, { stiffness: 40, damping: 25 });

  const handleMouse = useCallback(
    (e: MouseEvent) => {
      mouseX.set(e.clientX / window.innerWidth);
      mouseY.set(e.clientY / window.innerHeight);
    },
    [mouseX, mouseY]
  );

  useEffect(() => {
    window.addEventListener("mousemove", handleMouse, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouse);
  }, [handleMouse]);

  const x1 = useTransform(springX, [0, 1], [-30, 30]);
  const y1 = useTransform(springY, [0, 1], [-30, 30]);
  const x2 = useTransform(springX, [0, 1], [-20, 20]);
  const y2 = useTransform(springY, [0, 1], [-20, 20]);

  return (
    <>
      <motion.div
        className="absolute pointer-events-none"
        style={{
          left: "50%",
          top: "40%",
          width: "55vw",
          height: "55vw",
          maxWidth: 800,
          maxHeight: 800,
          borderRadius: "50%",
          background:
            "radial-gradient(circle at center, rgba(22,155,98,0.08) 0%, transparent 60%)",
          x: x1,
          y: y1,
          translateX: "-50%",
          translateY: "-50%",
        }}
        aria-hidden
      />
      <motion.div
        className="absolute pointer-events-none"
        style={{
          left: "60%",
          top: "70%",
          width: "40vw",
          height: "40vw",
          maxWidth: 550,
          maxHeight: 550,
          borderRadius: "50%",
          background:
            "radial-gradient(circle at center, rgba(99,102,241,0.05) 0%, transparent 60%)",
          x: x2,
          y: y2,
          translateX: "-50%",
          translateY: "-50%",
        }}
        aria-hidden
      />
    </>
  );
}

/* ─── Engineering grid overlay ─── */
function EngineeringGrid() {
  return (
    <div
      className="absolute inset-0 pointer-events-none"
      style={{
        maskImage:
          "radial-gradient(ellipse at center, rgba(0,0,0,0.15) 0%, transparent 70%)",
        WebkitMaskImage:
          "radial-gradient(ellipse at center, rgba(0,0,0,0.15) 0%, transparent 70%)",
        backgroundImage: `
          linear-gradient(rgba(22,155,98,0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(22,155,98,0.03) 1px, transparent 1px)
        `,
        backgroundSize: "48px 48px",
      }}
      aria-hidden
    />
  );
}

/* ─── Noise texture ─── */
function NoiseTexture() {
  return (
    <div
      className="absolute inset-0 pointer-events-none opacity-[0.02] mix-blend-multiply"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='256' height='256' filter='url(%23n)' opacity='0.08'/%3E%3C/svg%3E")`,
        backgroundSize: "180px 180px",
      }}
      aria-hidden
    />
  );
}

/* ─── Subtle gradient scan line ─── */
function ScanLine() {
  return (
    <motion.div
      className="absolute inset-0 pointer-events-none opacity-[0.015]"
      style={{
        background:
          "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(22,155,98,0.08) 2px, rgba(22,155,98,0.08) 3px)",
        backgroundSize: "100% 3px",
      }}
      animate={{ backgroundPosition: ["0 0", "0 6px"] }}
      transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
      aria-hidden
    />
  );
}

/* ═══════════════════════════════════════════════════════════
   EXPORT
   ═══════════════════════════════════════════════════════════ */
export default function HeroBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Base gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#F8F6F1] via-[#FFFCF8] to-[#F4FAF6]" />

      {/* Layer 1: Drifting mesh orbs */}
      <DriftingOrbs />

      {/* Layer 2: Engineering grid */}
      <EngineeringGrid />

      {/* Layer 3: Scan line */}
      <ScanLine />

      {/* Layer 4: Noise texture */}
      <NoiseTexture />

      {/* Layer 5: Mouse-driven spotlights */}
      <MouseSpotlights />

      {/* Vignette edge fade */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 40%, rgba(248,246,241,0.6) 100%)",
        }}
        aria-hidden
      />
    </div>
  );
}
