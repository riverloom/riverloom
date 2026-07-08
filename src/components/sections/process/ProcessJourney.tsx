"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { Search, Compass, Code, Rocket, ArrowRight, Sparkles } from "lucide-react";
import { processPhases } from "@/data/processPhases";

/* ══════════════════════════════════════════════
   ICON MAP
   ══════════════════════════════════════════════ */
const iconMap: Record<string, React.ElementType> = {
  Search,
  Compass,
  Code,
  Rocket,
};

/* ══════════════════════════════════════════════
   BACKGROUND PARTICLES
   ══════════════════════════════════════════════ */
function FloatingParticles() {
  const particles = Array.from({ length: 8 }, (_, i) => ({
    id: i,
    x: 10 + (i * 12) % 80,
    y: 15 + (i * 17) % 75,
    size: 2 + (i % 3),
    delay: i * 0.7,
    duration: 5 + (i % 4) * 2,
  }));

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-[#169B62]"
          style={{
            width: p.size,
            height: p.size,
            left: `${p.x}%`,
            top: `${p.y}%`,
            opacity: 0.06,
          }}
          animate={{
            y: [0, -20, 0],
            x: [0, 8, 0],
            opacity: [0.02, 0.08, 0.02],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

/* ══════════════════════════════════════════════
   CONNECTING LINE WITH GLOW
   ══════════════════════════════════════════════ */
function TimelineLine({ isInView }: { isInView: boolean }) {
  return (
    <div className="absolute left-0 right-0 top-0 flex items-center justify-center pointer-events-none">
      <svg
        width="80%"
        height="4"
        viewBox="0 0 800 4"
        className="overflow-visible"
      >
        <defs>
          <linearGradient id="tl-grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#169B62" stopOpacity="0.05" />
            <stop offset="20%" stopColor="#169B62" stopOpacity="0.3" />
            <stop offset="50%" stopColor="#169B62" stopOpacity="0.8" />
            <stop offset="80%" stopColor="#169B62" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#169B62" stopOpacity="0.05" />
          </linearGradient>
          <filter id="tl-glow">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <motion.line
          x1="0"
          y1="2"
          x2="800"
          y2="2"
          stroke="url(#tl-grad)"
          strokeWidth="1.5"
          strokeLinecap="round"
          filter="url(#tl-glow)"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={isInView ? { pathLength: 1, opacity: 1 } : {}}
          transition={{ duration: 2, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
        />
        {/* Glow ring pulses along the line */}
        <motion.circle
          r="2.5"
          fill="#169B62"
          initial={{ cx: 0, cy: 2, opacity: 0 }}
          animate={isInView ? { cx: [0, 800], opacity: [0, 0.8, 0] } : {}}
          transition={{
            duration: 4,
            delay: 1.2,
            repeat: Infinity,
            ease: "linear",
          }}
          filter="url(#tl-glow)"
        />
      </svg>
    </div>
  );
}

/* ══════════════════════════════════════════════
   PHASE CARD — Premium with LARGE typography
   ══════════════════════════════════════════════ */
function PhaseCard({
  phase,
  index,
  isInView,
}: {
  phase: (typeof processPhases)[0];
  index: number;
  isInView: boolean;
}) {
  const Icon = iconMap[phase.icon] || Search;
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.7,
        delay: 0.3 + index * 0.15,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      <motion.div
        className="group relative h-full cursor-pointer will-change-transform"
        style={{ perspective: 1000 }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        animate={{
          y: isHovered ? -12 : 0,
          scale: isHovered ? 1.03 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 250,
          damping: 22,
          mass: 0.15,
        }}
      >
        {/* Card surface */}
        <div
          className="relative h-full rounded-[30px] overflow-hidden bg-[#FFFFFF]"
          style={{
            boxShadow: isHovered
              ? "0 32px 80px rgba(0,0,0,0.10), 0 12px 40px rgba(0,0,0,0.06), 0 0 0 1px rgba(22,155,98,0.3)"
              : "0 1px 4px rgba(0,0,0,0.04), 0 8px 24px rgba(0,0,0,0.02)",
            transition: "box-shadow 0.4s ease",
          }}
        >
          {/* Inner glass highlight */}
          <div className="pointer-events-none absolute inset-0 rounded-[30px] bg-gradient-to-b from-white/60 via-white/10 to-transparent" />
          <div className="pointer-events-none absolute inset-0 rounded-[30px] shadow-[inset_0_1px_0_rgba(255,255,255,0.8)]" />

          {/* Border overlay */}
          <motion.div
            className="pointer-events-none absolute inset-0 rounded-[30px]"
            animate={{
              borderColor: isHovered
                ? "rgba(22,155,98,0.35)"
                : "rgba(0,0,0,0.05)",
              boxShadow: isHovered
                ? "inset 0 0 0 1.5px rgba(22,155,98,0.3), 0 0 30px -8px rgba(22,155,98,0.15)"
                : "inset 0 0 0 1px rgba(0,0,0,0.05)",
            }}
            transition={{ duration: 0.3 }}
          />

          {/* Background gradient on hover */}
          <motion.div
            className="absolute inset-0 opacity-0 pointer-events-none rounded-[30px]"
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.4 }}
            style={{
              background:
                "linear-gradient(180deg, rgba(22,155,98,0.03) 0%, rgba(22,155,98,0.01) 100%)",
            }}
          />

          {/* Large step number background */}
          <div className="pointer-events-none absolute -top-6 -right-4 select-none overflow-hidden">
            <motion.span
              className="block font-black leading-none text-[200px] tracking-[-0.06em]"
              style={{ color: "#169B62", opacity: 0.04 }}
              animate={{
                opacity: isHovered ? 0.08 : 0.04,
                scale: isHovered ? 1.05 : 1,
              }}
              transition={{ duration: 0.4 }}
            >
              {phase.number}
            </motion.span>
          </div>

          {/* Content */}
          <div className="relative z-10 flex h-full flex-col px-[32px] py-[36px]">
            {/* Icon container */}
            <motion.div
              className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl"
              style={{
                background: "rgba(22,155,98,0.08)",
                backdropFilter: "blur(8px)",
                boxShadow:
                  "inset 0 1px 0 rgba(255,255,255,0.5), 0 4px 12px rgba(22,155,98,0.06)",
              }}
              animate={{
                rotate: isHovered ? [0, -8, 4, -2, 0] : 0,
              }}
              transition={{
                duration: 0.5,
                ease: [0.34, 1.56, 0.64, 1],
              }}
            >
              <Icon className="h-6 w-6 text-[#169B62]" />
            </motion.div>

            {/* Title — 32px */}
            <h3 className="mb-2 text-[32px] font-bold leading-[1.1] tracking-[-0.02em] text-[#1C1C1C]">
              {phase.title}
            </h3>

            {/* Subtitle */}
            <p className="mb-4 text-[15px] font-semibold text-[#9E9E9E] tracking-[-0.01em]">
              {phase.subtitle}
            </p>

            {/* Description — 19px */}
            <p className="mb-6 text-[19px] leading-[1.6] text-[#6B6B6B] flex-1">
              {phase.description}
            </p>

            {/* Chips section */}
            <div className="space-y-4 mb-6">
              {/* Technologies */}
              <div className="flex flex-wrap gap-2">
                {phase.technologies.slice(0, 4).map((tech) => (
                  <span
                    key={tech}
                    className="inline-flex items-center rounded-full px-3.5 py-1.5 text-[12px] font-semibold tracking-[-0.01em]"
                    style={{
                      background: "rgba(22,155,98,0.07)",
                      color: "#169B62",
                      border: "1px solid rgba(22,155,98,0.12)",
                    }}
                  >
                    {tech}
                  </span>
                ))}
                {phase.technologies.length > 4 && (
                  <span
                    className="inline-flex items-center rounded-full px-3.5 py-1.5 text-[12px] font-semibold"
                    style={{
                      background: "rgba(22,155,98,0.04)",
                      color: "#9E9E9E",
                      border: "1px solid rgba(0,0,0,0.06)",
                    }}
                  >
                    +{phase.technologies.length - 4}
                  </span>
                )}
              </div>

              {/* Timeline */}
              <div className="flex items-center gap-3">
                <span className="text-[12px] font-semibold uppercase tracking-[0.12em] text-[#9E9E9E]">
                  Timeline
                </span>
                <span className="text-[14px] font-bold text-[#169B62]">
                  {phase.timeline}
                </span>
              </div>
            </div>

            {/* Explore Phase Button */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, y: 8 }}
              animate={{
                opacity: isHovered ? 1 : 0,
                y: isHovered ? 0 : 8,
              }}
              transition={{
                duration: 0.3,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <Link
                href={`/process/${phase.id}`}
                className="group/btn relative inline-flex items-center gap-2 overflow-hidden rounded-full px-6 py-3 text-[14px] font-semibold"
                style={{
                  background: isHovered ? "#169B62" : "transparent",
                  color: isHovered ? "#FFFFFF" : "#6B6B6B",
                  border: "1px solid",
                  borderColor: isHovered
                    ? "#169B62"
                    : "rgba(0,0,0,0.08)",
                  transition:
                    "background 0.3s ease, color 0.3s ease, border-color 0.3s ease",
                }}
              >
                <span className="relative z-10">Explore Phase</span>
                <ArrowRight className="relative z-10 h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
              </Link>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ══════════════════════════════════════════════
   SECTION
   ══════════════════════════════════════════════ */
export default function ProcessJourney() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const isHeadingInView = useInView(headingRef, { once: true, margin: "-60px" });

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-[#F8F6F1] py-8"
    >
      {/* ═══ Background Layers ═══ */}
      <div className="pointer-events-none absolute inset-0">
        {/* Noise texture */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            backgroundSize: "256px 256px",
          }}
        />

        {/* Radial emerald glow */}
        <div className="absolute left-1/2 top-1/3 h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[rgba(22,155,98,0.06)] blur-[250px]" />
        <div className="absolute right-[5%] top-[60%] h-[500px] w-[500px] rounded-full bg-[rgba(22,155,98,0.04)] blur-[180px]" />
        <div className="absolute left-[5%] bottom-[10%] h-[400px] w-[400px] rounded-full bg-[rgba(22,155,98,0.03)] blur-[150px]" />

        {/* Engineering grid */}
        <svg className="absolute inset-0 h-full w-full opacity-[0.015]">
          <defs>
            <pattern id="process-grid" width="80" height="80" patternUnits="userSpaceOnUse">
              <path
                d="M 80 0 L 0 0 0 80"
                fill="none"
                stroke="#169B62"
                strokeWidth="0.5"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#process-grid)" />
        </svg>

        {/* Ambient light blobs */}
        <div className="absolute left-[20%] top-[20%] h-8 w-8 rounded-full bg-[rgba(22,155,98,0.04)] blur-[24px] animate-float" />
        <div
          className="absolute right-[20%] top-[40%] h-6 w-6 rounded-full bg-[rgba(22,155,98,0.03)] blur-[20px] animate-float"
          style={{ animationDelay: "-3s" }}
        />
        <div
          className="absolute left-[40%] bottom-[25%] h-10 w-10 rounded-full bg-[rgba(22,155,98,0.02)] blur-[28px] animate-float"
          style={{ animationDelay: "-5s" }}
        />

        {/* Vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(248,246,241,0.5)_100%)]" />

        {/* Floating particles */}
        <FloatingParticles />
      </div>

      {/* ═══ Content — Full Width ═══ */}
      <div className="relative z-10 mx-auto w-full max-w-[2200px] px-4 md:px-6 lg:px-10">
        {/* ═══ Header ═══ */}
        <div ref={headingRef} className="text-center mb-[80px] md:mb-[100px]">
          {/* Premium Badge */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={isHeadingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="mb-8 flex items-center justify-center"
          >
            <span className="inline-flex items-center gap-2.5 rounded-full border border-[rgba(22,155,98,0.12)] bg-[rgba(22,155,98,0.07)] px-5 py-2 text-[12px] font-bold uppercase tracking-[0.18em] text-[#169B62]">
              <Sparkles className="h-3.5 w-3.5" />
              Our Process
            </span>
          </motion.div>

          {/* Heading — 72–84px desktop */}
          <div className="overflow-hidden mb-6">
            <motion.h2
              initial={{ opacity: 0, y: 60 }}
              animate={isHeadingInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="font-black leading-[1.03] tracking-[-0.045em] text-[#1C1C1C]"
              style={{ fontSize: "clamp(3rem, 8vw, 5.25rem)" }}
            >
              From Idea To{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#169B62] to-[#1FC77E]">
                Launch.
              </span>
            </motion.h2>
          </div>

          {/* Subtitle — 20px */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isHeadingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="mx-auto text-[20px] leading-[1.7] text-[#6B6B6B] font-medium"
            style={{ maxWidth: "740px" }}
          >
            Every project follows a structured engineering process designed for
            speed, transparency, and long-term success. From discovery to
            launch, we keep you informed and in control.
          </motion.p>
        </div>

        {/* ═══ Timeline Connection ═══ */}
        <div className="relative mb-[60px]">
          <TimelineLine isInView={isInView} />

          {/* Timeline labels */}
          <div className="relative flex justify-between px-[10%]">
            {processPhases.map((phase, i) => (
              <motion.div
                key={phase.id}
                className="flex flex-col items-center"
                initial={{ opacity: 0, y: 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.5,
                  delay: 0.6 + i * 0.12,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                {/* Dot */}
                <motion.div
                  className="h-3 w-3 rounded-full mb-3"
                  style={{ backgroundColor: "#169B62" }}
                  initial={{ scale: 0 }}
                  animate={isInView ? { scale: 1 } : {}}
                  transition={{
                    duration: 0.4,
                    delay: 0.8 + i * 0.12,
                    ease: "backOut",
                  }}
                />
                {/* Label — 13px */}
                <span className="text-[13px] font-bold uppercase tracking-[0.15em] text-[#9E9E9E]">
                  {phase.title}
                </span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ═══ Cards Grid — Equal Height ═══ */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 md:gap-8">
          {processPhases.map((phase, i) => (
            <PhaseCard key={phase.id} phase={phase} index={i} isInView={isInView} />
          ))}
        </div>
      </div>
    </section>
  );
}
