"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import HeroBackground from "./HeroBackground";
import InteractiveEngineeringCanvas from "./InteractiveEngineeringCanvas";
import HeroContent from "./HeroContent";

/* ═══════════════════════════════════════════════════════════
   ABOUT HERO — Premium, Immersive, Typography-First
   ═══════════════════════════════════════════════════════════
   This is NOT a left/right split layout.
   
   The hero is a single, cohesive visual experience:
   • Full-screen (100vh) immersive canvas
   • Typography dominates — oversized, bold, confident
   • Interactive engineering ecosystem flows behind the type
   • Mouse-driven depth / parallax throughout
   • Scroll-driven transformation: hero fades/repositions as
     the next section reveals itself
   
   Design influences: Apple, Linear, Stripe, Vercel
   ─── Zero template patterns, zero generic SaaS columns.
   ═══════════════════════════════════════════════════════════ */
export default function AboutHero() {
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  /* ─── Scroll-driven transforms ─── */
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.7], [1, 0.92]);
  const contentY = useTransform(scrollYProgress, [0, 0.9], [0, -120]);
  const canvasOpacity = useTransform(scrollYProgress, [0, 0.4], [0.6, 1]);
  const canvasY = useTransform(scrollYProgress, [0, 0.7], [0, 60]);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden pb-8"
      aria-label="About RiverLoom — Engineering Tomorrow's Digital Products"
    >
      {/* ─── Background (mesh gradients, grid, noise, scan) ─── */}
      <HeroBackground />

      {/* ─── Interactive Engineering Ecosystem ─── */}
      <motion.div
        style={{ opacity: canvasOpacity, y: canvasY }}
        className="absolute inset-0 z-[5] pointer-events-none"
        aria-hidden
      >
        <InteractiveEngineeringCanvas />
      </motion.div>

      {/* ─── Main Content (typography-dominant) ─── */}
      <motion.div
        style={{
          opacity: heroOpacity,
          scale: heroScale,
          y: contentY,
        }}
        className="relative z-20 w-full h-full"
      >
        <HeroContent />
      </motion.div>

      {/* ─── Bottom gradient blend into next section ─── */}
      <div
        className="absolute bottom-0 left-0 right-0 h-8 pointer-events-none z-30"
        style={{
          background:
            "linear-gradient(to bottom, transparent 0%, rgba(248,246,241,0.6) 40%, rgba(248,246,241,1) 100%)",
        }}
        aria-hidden
      />
    </section>
  );
}
