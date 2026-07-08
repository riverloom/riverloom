"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronRight } from "lucide-react";
import SplitTextReveal from "./SplitTextReveal";
import TrustIndicators from "./TrustIndicators";

/* ═══════════════════════════════════════════════════════════
   Premium Badge — "Engineering Excellence Since 2021"
   ═══════════════════════════════════════════════════════════ */
function PremiumBadge() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.7, ease: [0.19, 1, 0.22, 1] }}
      className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-[#E7E2D8]/70 bg-white/50 backdrop-blur-md shadow-sm"
    >
      <span className="relative flex h-2 w-2">
        <motion.span
          className="absolute inset-0 rounded-full bg-[#169B62]"
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        />
        <span className="relative rounded-full bg-[#169B62] h-2 w-2" />
      </span>
      <span className="text-[11px] font-semibold tracking-[0.06em] uppercase text-[#6B6B6B]">
        Engineering Excellence Since 2021
      </span>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════
   Oversized Headline — Typography is the hero
   ═══════════════════════════════════════════════════════════ */
function Headline() {
  return (
    <div className="mt-6 md:mt-8 select-none">
      <h1
        className="text-[clamp(1.8rem,5.5vw,3.2rem)] font-bold leading-[0.95] tracking-[-0.04em] text-[#1C1C1C]"
        style={{ wordBreak: "break-word" }}
      >
        <span className="inline">
          <SplitTextReveal
            text="We Engineer"
            staggerDelay={0.022}
            className="inline"
          />
        </span>
        <span className="inline ml-2">
          <SplitTextReveal
            text="Tomorrow's"
            staggerDelay={0.022}
            delay={0.25}
            className="inline text-[#169B62]"
          />
        </span>
        <span className="block mt-1 md:mt-2">
          <SplitTextReveal
            text="Digital Products."
            staggerDelay={0.022}
            delay={0.5}
            className="inline"
          />
        </span>
      </h1>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   Supporting narrative — concise, elegant, highly readable
   ═══════════════════════════════════════════════════════════ */
function SupportingText() {
  return (
    <motion.p
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.1, duration: 0.7, ease: [0.19, 1, 0.22, 1] }}
      className="text-base md:text-lg text-[#6B6B6B] leading-relaxed max-w-xl md:max-w-2xl mt-6 md:mt-8"
    >
      RiverLoom architects, builds, and scales exceptional digital products —
      from AI systems and enterprise platforms to mobile apps and consumer
      experiences — for ambitious companies worldwide.
    </motion.p>
  );
}

/* ═══════════════════════════════════════════════════════════
   Magnetic CTA Button with animated arrow + glow
   ═══════════════════════════════════════════════════════════ */
function MagneticCTA({
  href,
  label,
  variant = "primary",
  delay,
}: {
  href: string;
  label: string;
  variant?: "primary" | "secondary";
  delay: number;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const btnRef = useRef<HTMLAnchorElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!btnRef.current) return;
    const rect = btnRef.current.getBoundingClientRect();
    setMousePos({
      x: (e.clientX - rect.left - rect.width / 2) * 0.3,
      y: (e.clientY - rect.top - rect.height / 2) * 0.3,
    });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setMousePos({ x: 0, y: 0 });
  };

  const primaryClasses =
    "bg-[#169B62] text-white shadow-[0_6px_24px_rgba(22,155,98,0.3)] hover:shadow-[0_12px_48px_rgba(22,155,98,0.45)] hover:bg-[#1FC77E]";
  const secondaryClasses =
    "border border-[#E7E2D8] text-[#1C1C1C] hover:border-[#169B62] hover:text-[#169B62] hover:bg-[#E8F7EF]";

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.7, ease: [0.19, 1, 0.22, 1] }}
    >
      <motion.div
        animate={{ x: mousePos.x, y: mousePos.y }}
        transition={{
          type: "spring",
          stiffness: 120,
          damping: 12,
          mass: 0.1,
        }}
        className="inline-block"
      >
        <Link
          ref={btnRef}
          href={href}
          className={`group relative inline-flex items-center gap-2.5 px-7 md:px-9 py-3.5 md:py-4 rounded-full text-sm md:text-base font-semibold overflow-hidden transition-all duration-500 ${
            variant === "primary" ? primaryClasses : secondaryClasses
          }`}
          onMouseEnter={() => setIsHovered(true)}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          aria-label={label}
        >
          {/* Glow effect */}
          {variant === "primary" && (
            <span
              className={`absolute inset-0 transition-opacity duration-500 ${
                isHovered ? "opacity-100" : "opacity-0"
              }`}
              style={{
                background:
                  "radial-gradient(circle at 50% 0%, rgba(255,255,255,0.2) 0%, transparent 60%)",
              }}
            />
          )}

          {/* Shine sweep */}
          <span
            className={`absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 ${
              isHovered ? "translate-x-full" : "-translate-x-full"
            }`}
            style={{ transitionTimingFunction: "cubic-bezier(0.19, 1, 0.22, 1)" }}
          />

          <span className="relative z-[1]">{label}</span>

          {/* Animated arrow */}
          <span className="relative z-[1] flex items-center justify-center w-4 h-4 md:w-5 md:h-5">
            {variant === "primary" ? (
              <ArrowRight
                className={`w-full h-full transition-all duration-300 ${
                  isHovered ? "translate-x-1 opacity-100" : "opacity-80"
                }`}
              />
            ) : (
              <ChevronRight
                className={`w-full h-full transition-all duration-300 ${
                  isHovered ? "translate-x-0.5 opacity-100" : "opacity-60"
                }`}
              />
            )}
          </span>

          {/* Border glow on hover */}
          {variant === "secondary" && (
            <span
              className={`absolute inset-0 rounded-full transition-opacity duration-500 ${
                isHovered ? "opacity-100" : "opacity-0"
              }`}
              style={{
                boxShadow: "inset 0 0 20px rgba(22,155,98,0.1)",
              }}
            />
          )}
        </Link>
      </motion.div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════
   Scroll indicator — elegant minimal
   ═══════════════════════════════════════════════════════════ */
function ScrollIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 2.2, duration: 1 }}
      className="flex items-center gap-3"
    >
      <div className="relative h-8 w-px overflow-hidden">
        <motion.div
          className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-[#169B62] to-transparent"
          animate={{
            y: ["-100%", "100%"],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{ transformOrigin: "top" }}
        />
      </div>
      
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════
   Export: HeroContent — typography-dominant, no columns,
   integrated with the engineering canvas behind it.
   ═══════════════════════════════════════════════════════════ */
export default function HeroContent() {
  return (
    <div className="relative z-20 flex flex-col items-center justify-center w-full px-5 md:px-8 lg:px-12 pt-25 pb-2">
      {/* Top badge */}
      <div className="w-full max-w-4xl mx-auto">
        <PremiumBadge />
      </div>

      {/* Oversized headline — the hero of the hero */}
      <div className="w-full max-w-4xl mx-auto">
        <Headline />
      </div>

      {/* Supporting text */}
      <div className="w-full max-w-4xl mx-auto">
        <SupportingText />
      </div>

      {/* CTA row */}
      <div className="w-full max-w-4xl mx-auto mt-8 md:mt-10">
        <div className="flex flex-wrap items-center gap-4">
          <MagneticCTA
            href="/contact"
            label="Start Your Project"
            variant="primary"
            delay={1.3}
          />
          <MagneticCTA
            href="/work"
            label="View Our Work"
            variant="secondary"
            delay={1.45}
          />
        </div>
      </div>

      {/* Trust indicators */}
      <div className="w-full max-w-4xl mx-auto mt-10 md:mt-12">
        <TrustIndicators />
      </div>

      {/* Scroll indicator */}
      <div className="w-full max-w-4xl mx-auto mt-8">
        <ScrollIndicator />
      </div>
    </div>
  );
}
