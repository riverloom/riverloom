"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  motion,
  useInView,
  AnimatePresence,
} from "framer-motion";
import {
  Search,
  Compass,
  Code,
  Rocket,
  ArrowLeft,
  ArrowRight,
  Check,
  ChevronDown,
  Sparkles,
  Send,
  Clock,
  Layers,
  Shield,
  Star,
  Users,
  Bot,
  Zap,
  Target,
  BarChart3,
  FileText,
  Palette,
  Figma,
  Globe,
  Server,
  Cpu,
  Database,
  Cloud,
  Activity,
  TrendingUp,
  Quote,
  Layout,
  PenTool,
  Calendar,
  ChevronRight,
  ChevronLeft,
  Image,
  Table,
} from "lucide-react";
import { processPhases, getPhaseIndex } from "@/data/processPhases";

/* ═══════════════════════════════════════════════════
   DESIGN TOKENS
   A warm, editorial palette: deep loam green + brushed
   brass gold on a linen ground. Gold is the one accent
   that never appears in the base UI elsewhere on the
   site — it is reserved for this "premium detail" layer:
   ratings, dividers, the progress thread, and the CTA.

   NOTE: pair with a serif display face for headings.
   In app/layout.tsx:
     import { Fraunces } from "next/font/google";
     const fraunces = Fraunces({ subsets: ["latin"], variable: "--font-display" });
   then add fraunces.variable to the <html> className.
   Falls back gracefully to Georgia if not wired up.
   ═══════════════════════════════════════════════════ */
const C = {
  bg: "#F8F6F0",
  ink: "#171F1A",
  emerald: "#0D6B45",
  emeraldBright: "#189F6B",
  gold: "#B8923E",
  goldSoft: "#D8BE84",
  muted: "#655D4E",
  faint: "#A79E8C",
  line: "rgba(23,31,26,0.08)",
  cream: "#FFFDF8",
};

const display = { fontFamily: "var(--font-display, 'Fraunces'), Georgia, 'Times New Roman', serif" };

/* ═══════════════════════════════════════════════════
   TYPES
   ═══════════════════════════════════════════════════ */
const iconMap: Record<string, React.ElementType> = {
  Search,
  Compass,
  Code,
  Rocket,
};

/* ═══════════════════════════════════════════════════
   UTILITIES
   ═══════════════════════════════════════════════════ */
function useCountUp(end: number, duration = 2, startOnView = true) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const hasStarted = useRef(false);

  useEffect(() => {
    if (!isInView || !startOnView || hasStarted.current) return;
    hasStarted.current = true;
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * end));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [isInView, end, duration, startOnView]);

  return { count, ref };
}

/* ── Stagger variants ── */
const staggerContainer = { hidden: {}, visible: { transition: { staggerChildren: 0.06 } } };
const staggerItem = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const } },
};
const springHover = { type: "spring" as const, stiffness: 250, damping: 22, mass: 0.15 };

/* ═══════════════════════════════════════════════════
   BACKGROUND — "woven thread" motif
   Replaces the generic engineering grid with a subtle
   interlace pattern (a nod to "Riverloom") plus a soft
   two-tone glow instead of a single flat blob field.
   ═══════════════════════════════════════════════════ */
function DetailBackground({ phaseId }: { phaseId: string }) {
  const phase = processPhases.find((p) => p.id === phaseId);
  const number = phase?.number ?? "01";
  const label = phase?.title?.toUpperCase() ?? "PHASE";

  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden" style={{ background: C.bg }}>
      {/* Woven thread pattern */}
      <svg className="absolute inset-0 h-full w-full opacity-[0.05]">
        <defs>
          <pattern id={`weave-${phaseId}`} width="64" height="64" patternUnits="userSpaceOnUse">
            <path d="M0 16 Q16 0 32 16 T64 16" fill="none" stroke={C.emerald} strokeWidth="0.6" />
            <path d="M0 48 Q16 32 32 48 T64 48" fill="none" stroke={C.gold} strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#weave-${phaseId})`} />
      </svg>

      {/* Gradients — emerald anchor, brass whisper */}
      <div className="absolute left-[8%] top-[5%] h-[600px] w-[600px] rounded-full" style={{ background: "rgba(13,107,69,0.07)", filter: "blur(200px)" }} />
      <div className="absolute right-[5%] top-[25%] h-[500px] w-[500px] rounded-full" style={{ background: "rgba(184,146,62,0.06)", filter: "blur(180px)" }} />
      <div className="absolute left-[35%] bottom-[8%] h-[700px] w-[700px] rounded-full" style={{ background: "rgba(13,107,69,0.035)", filter: "blur(250px)" }} />

      {/* Noise */}
      <div className="absolute inset-0 opacity-[0.015] mix-blend-multiply" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='5' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        backgroundSize: "256px 256px",
      }} />

      {/* Watermark */}
      <div className="absolute right-[-4%] top-[-2%] select-none overflow-hidden">
        <span className="block font-black leading-none text-[clamp(14rem,28vw,32rem)] tracking-[-0.06em]" style={{ ...display, color: C.emerald, opacity: 0.025 }}>
          {number}
        </span>
      </div>
      <div className="absolute left-[-2%] bottom-[0%] select-none overflow-hidden hidden md:block">
        <span className="block font-black leading-none text-[clamp(6rem,10vw,14rem)] tracking-[-0.04em]" style={{ color: C.emerald, opacity: 0.015 }}>
          {label}
        </span>
      </div>

      {/* Particles — alternating emerald / gold */}
      {Array.from({ length: 16 }, (_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: 1.5 + (i % 3) * 1.5,
            height: 1.5 + (i % 3) * 1.5,
            left: `${5 + (i * 7) % 90}%`,
            top: `${8 + (i * 11) % 84}%`,
            background: i % 4 === 0 ? C.gold : C.emerald,
          }}
          animate={{ y: [0, -32, 0], x: [0, 14, 0], opacity: [0.01, 0.07, 0.01] }}
          transition={{ duration: 6 + (i % 5) * 2, repeat: Infinity, delay: i * 0.6, ease: "easeInOut" }}
        />
      ))}

      {/* Vignette */}
      <div className="absolute inset-0" style={{ background: `radial-gradient(ellipse at center, transparent 35%, ${C.bg}B3 100%)` }} />
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   PROGRESS BAR — gold "thread" traces completed steps
   ═══════════════════════════════════════════════════ */
function PhaseProgressBar({ phaseId }: { phaseId: string }) {
  const currentIndex = getPhaseIndex(phaseId);
  const phases = processPhases;

  return (
    <div className="relative z-10 w-full px-6 md:px-20 lg:px-28 pt-6 pb-4">
      <div className="flex items-center justify-center gap-2 md:gap-0">
        {phases.map((p, i) => {
          const isCompleted = i < currentIndex;
          const isCurrent = i === currentIndex;

          return (
            <React.Fragment key={p.id}>
              <Link href={`/process/${p.id}`} className="group">
                <motion.div
                  className="flex items-center gap-2 md:gap-3"
                  whileHover={{ y: -2 }}
                  transition={springHover}
                >
                  <motion.div
                    className="flex h-8 w-8 md:h-10 md:w-10 items-center justify-center rounded-full border-2 transition-all duration-300"
                    style={{
                      borderColor: isCompleted || isCurrent ? C.emerald : C.line,
                      background: isCompleted ? C.emerald : isCurrent ? "rgba(13,107,69,0.12)" : "rgba(255,255,255,0.5)",
                      boxShadow: isCurrent ? "0 0 20px rgba(13,107,69,0.2)" : "none",
                    }}
                    layoutId={`phase-dot-${p.id}`}
                  >
                    {isCompleted ? (
                      <Check className="h-3.5 w-3.5 text-white" />
                    ) : (
                      <span className="text-[11px] font-bold" style={{ color: isCurrent ? C.emerald : C.faint }}>
                        {p.number}
                      </span>
                    )}
                  </motion.div>
                  <span
                    className="hidden md:block text-[12px] font-bold tracking-[0.04em] transition-colors"
                    style={{ color: isCurrent ? C.emerald : isCompleted ? C.ink : C.faint }}
                  >
                    {p.title.split(" & ")[0]}
                  </span>
                </motion.div>
              </Link>
              {i < phases.length - 1 && (
                <div className="flex-1 h-[2px] mx-1 md:mx-3 rounded-full relative" style={{ background: C.line }}>
                  <motion.div
                    className="absolute inset-y-0 left-0 rounded-full"
                    style={{ background: `linear-gradient(90deg, ${C.emerald}, ${C.gold})` }}
                    initial={{ width: "0%" }}
                    animate={{ width: isCompleted ? "100%" : isCurrent ? "50%" : "0%" }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  />
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   HERO
   ═══════════════════════════════════════════════════ */
function PhaseHero({ phase, phaseId }: { phase: NonNullable<(typeof processPhases)[number]>; phaseId: string }) {
  const Icon = iconMap[phase.icon] || Search;
  const heroRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    setMousePos({
      x: ((e.clientX - rect.left) / rect.width - 0.5) * 2,
      y: ((e.clientY - rect.top) / rect.height - 0.5) * 2,
    });
  }, []);

  const details = phase.details ?? [];
  const deliverableCount = phase.deliverables?.length ?? 0;

  return (
    <section
      ref={heroRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-[75vh] md:min-h-[85vh] flex items-center"
    >
      <div className="relative z-10 w-full px-6 md:px-20 lg:px-28 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-20 items-center">
          {/* Left */}
          <motion.div
            className="lg:col-span-7"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            {/* Badge row */}
            <motion.div variants={staggerItem} className="flex flex-wrap items-center gap-3 mb-8">
              <span
                className="inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-[12px] font-bold uppercase tracking-[0.16em]"
                style={{
                  borderColor: "rgba(184,146,62,0.35)",
                  background: "rgba(184,146,62,0.1)",
                  color: C.gold,
                  boxShadow: "0 0 20px rgba(184,146,62,0.08)",
                }}
              >
                <Sparkles className="h-3.5 w-3.5" />
                Phase {phase.number}
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-[12px] font-semibold" style={{ background: "rgba(23,31,26,0.04)", color: C.muted }}>
                <Clock className="h-3.5 w-3.5" />
                {phase.timeline}
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-[12px] font-semibold" style={{ background: "rgba(23,31,26,0.04)", color: C.muted }}>
                <Layers className="h-3.5 w-3.5" />
                {deliverableCount} Deliverable{deliverableCount === 1 ? "" : "s"}
              </span>
            </motion.div>

            {/* Heading */}
            <motion.div variants={staggerItem} className="overflow-hidden mb-5">
              <motion.h1
                className="font-bold leading-[1.03] tracking-[-0.03em]"
                style={{ ...display, fontSize: "clamp(3.2rem, 7vw, 5.25rem)", color: C.ink }}
              >
                {phase.title.split(" & ").map((part, i, arr) => (
                  <span key={i}>
                    {i > 0 && <> <span style={{ color: C.emerald }}>&</span> </>}
                    {part}
                  </span>
                ))}
                <span className="block mt-3 text-[clamp(1.8rem,3.5vw,2.8rem)] font-medium italic tracking-[-0.01em]" style={{ ...display, color: C.emerald }}>
                  {phase.subtitle}
                </span>
              </motion.h1>
            </motion.div>

            {/* Description */}
            <motion.p
              variants={staggerItem}
              className="text-[18px] md:text-[20px] leading-[1.7] max-w-2xl mb-8"
              style={{ color: C.muted }}
            >
              {phase.longDescription}
            </motion.p>

            {/* Tags */}
            {details.length > 0 && (
              <motion.div variants={staggerItem} className="flex flex-wrap gap-2 mb-8">
                {details.map((d) => (
                  <span
                    key={d}
                    className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-[14px] font-semibold transition-colors"
                    style={{ borderColor: "rgba(13,107,69,0.14)", background: "rgba(13,107,69,0.06)", color: C.emerald }}
                  >
                    <Zap className="h-3.5 w-3.5" />
                    {d}
                  </span>
                ))}
              </motion.div>
            )}

            {/* Meta row */}
            <motion.div
              variants={staggerItem}
              className="flex flex-wrap items-center gap-5"
            >
              {[
                { icon: Bot, label: "AI-Assisted" },
                { icon: Users, label: "Client Collaboration" },
                { icon: Shield, label: "Enterprise Grade" },
              ].map(({ icon: MetaIcon, label }) => (
                <span key={label} className="inline-flex items-center gap-2 text-[13px] font-semibold" style={{ color: C.faint }}>
                  <MetaIcon className="h-4 w-4" style={{ color: C.emerald }} />
                  {label}
                </span>
              ))}
            </motion.div>
          </motion.div>

          {/* Right — Floating Orrery */}
          <motion.div
            className="lg:col-span-5 flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            style={{
              transform: `perspective(1000px) rotateY(${mousePos.x * 5}deg) rotateX(${-mousePos.y * 5}deg)`,
              transition: "transform 0.12s ease-out",
            }}
          >
            <div className="relative h-[300px] w-[300px] md:h-[400px] md:w-[400px]">
              {/* Outer rings */}
              <motion.div
                className="absolute inset-0 rounded-full opacity-30"
                style={{ background: `conic-gradient(from 0deg, ${C.emerald}, ${C.gold}, ${C.emerald}, ${C.goldSoft}, ${C.emerald})` }}
                animate={{ rotate: 360 }}
                transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
              />
              <div className="absolute inset-[3%] rounded-full border" style={{ borderColor: "rgba(13,107,69,0.12)", background: "rgba(255,253,248,0.35)", backdropFilter: "blur(4px)" }} />
              <div className="absolute inset-[20%] rounded-full border" style={{ borderColor: "rgba(13,107,69,0.08)", background: "rgba(255,253,248,0.16)", backdropFilter: "blur(2px)" }} />
              <div className="absolute inset-[38%] rounded-full border" style={{ borderColor: "rgba(13,107,69,0.05)", background: "rgba(255,253,248,0.08)" }} />
              <motion.div
                className="absolute inset-[8%] rounded-full border border-dashed"
                style={{ borderColor: "rgba(13,107,69,0.12)" }}
                animate={{ rotate: 360 }}
                transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
              />
              <motion.div
                className="absolute inset-[26%] rounded-full border border-dashed"
                style={{ borderColor: "rgba(184,146,62,0.14)" }}
                animate={{ rotate: -360 }}
                transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
              />

              {/* Orbiting dots */}
              {[
                { t: 8, l: 15, d: 3, x: 10, y: 10, gold: false },
                { t: 20, l: 12, d: 2.5, x: 8, y: 6, gold: true },
                { t: 16, l: 22, d: 2, x: 12, y: 8, gold: false },
                { t: 26, r: 18, d: 3, x: 10, y: 6, gold: true },
              ].map((dot, i) => (
                <motion.div
                  key={i}
                  className="absolute rounded-full"
                  style={{
                    width: dot.d,
                    height: dot.d,
                    top: `${dot.t}%`,
                    left: dot.l !== undefined ? `${dot.l}%` : undefined,
                    right: dot.r !== undefined ? `${dot.r}%` : undefined,
                    background: dot.gold ? C.gold : C.emerald,
                  }}
                  animate={{ y: [0, -dot.y, 0], x: [0, dot.x, 0], opacity: [0.3, 0.85, 0.3] }}
                  transition={{ duration: 3 + i, repeat: Infinity, ease: "easeInOut", delay: i * 0.7 }}
                />
              ))}

              {/* Connecting lines */}
              <svg className="absolute inset-0 h-full w-full" style={{ filter: "blur(0.5px)" }}>
                <line x1="50%" y1="50%" x2="15%" y2="8%" stroke="rgba(13,107,69,0.08)" strokeWidth="1" />
                <line x1="50%" y1="50%" x2="88%" y2="18%" stroke="rgba(184,146,62,0.08)" strokeWidth="1" />
                <line x1="50%" y1="50%" x2="22%" y2="84%" stroke="rgba(13,107,69,0.08)" strokeWidth="1" />
                <line x1="50%" y1="50%" x2="82%" y2="76%" stroke="rgba(184,146,62,0.06)" strokeWidth="1" />
              </svg>

              {/* Center icon */}
              <motion.div
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
              >
                <div
                  className="flex h-20 w-20 md:h-24 md:w-24 items-center justify-center rounded-[28px]"
                  style={{
                    background: `linear-gradient(145deg, rgba(13,107,69,0.1), rgba(184,146,62,0.08))`,
                    backdropFilter: "blur(12px)",
                    boxShadow: "inset 0 1px 0 rgba(255,255,255,0.6), 0 8px 32px rgba(13,107,69,0.14)",
                    border: "1px solid rgba(184,146,62,0.15)",
                  }}
                >
                  <Icon
                    className="h-9 w-9 md:h-10 md:w-10"
                    style={{ color: C.emerald, filter: "drop-shadow(0 0 16px rgba(13,107,69,0.3))" }}
                  />
                </div>
              </motion.div>

              {/* Glow */}
              <div
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[180px] w-[180px] rounded-full opacity-30"
                style={{ background: "rgba(13,107,69,0.16)", filter: "blur(80px)" }}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════
   STATS
   ═══════════════════════════════════════════════════ */
function StatsSection({ stats }: { stats: { value: string; label: string }[] }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-60px" });

  if (!stats || stats.length === 0) return null;

  const statValues = stats.map((s) => {
    const cleaned = s.value.replace(/[^0-9.]/g, "");
    return !cleaned || isNaN(parseFloat(cleaned)) ? 0 : parseFloat(cleaned);
  });

  return (
    <section ref={sectionRef} className="relative z-10 px-6 md:px-20 lg:px-28 pb-24 md:pb-32">
      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
        variants={staggerContainer}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        {stats.map((stat, i) => (
          <StatCard key={stat.label} stat={stat} index={i} endValue={statValues[i]} isInView={isInView} />
        ))}
      </motion.div>
    </section>
  );
}

const statIcons = [Target, BarChart3, TrendingUp];

function StatCard({ stat, index, endValue, isInView }: { stat: { value: string; label: string }; index: number; endValue: number; isInView: boolean }) {
  const { count, ref } = useCountUp(endValue, 2, isInView);
  const [isHovered, setIsHovered] = useState(false);
  const suffix = stat.value.replace(/^[0-9.]+/, "");
  const hasNumericPrefix = /^[0-9.]/.test(stat.value);
  const Icon = statIcons[index] ?? Target;

  return (
    <motion.div
      variants={staggerItem}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <motion.div
        className="relative h-full will-change-transform"
        style={{ perspective: 1000 }}
        animate={{ y: isHovered ? -8 : 0, scale: isHovered ? 1.02 : 1 }}
        transition={springHover}
      >
        <div
          className="relative h-full rounded-[24px] overflow-hidden p-8"
          style={{
            background: "rgba(255,253,248,0.6)",
            backdropFilter: "blur(16px)",
            border: `1px solid ${isHovered ? "rgba(184,146,62,0.3)" : "rgba(13,107,69,0.08)"}`,
            boxShadow: isHovered
              ? "0 24px 64px rgba(0,0,0,0.06), 0 0 40px -8px rgba(184,146,62,0.16), inset 0 1px 0 rgba(255,255,255,0.7)"
              : "0 1px 4px rgba(0,0,0,0.04), 0 8px 24px rgba(0,0,0,0.02), inset 0 1px 0 rgba(255,255,255,0.7)",
            transition: "border-color 0.3s ease, box-shadow 0.3s ease",
          }}
        >
          <div
            className="flex h-12 w-12 items-center justify-center rounded-2xl mb-6"
            style={{ background: "rgba(13,107,69,0.08)", backdropFilter: "blur(8px)", boxShadow: "inset 0 1px 0 rgba(255,255,255,0.6)" }}
          >
            <Icon className="h-5 w-5" style={{ color: C.emerald }} />
          </div>
          <div className="mb-1">
            <span ref={ref} className="text-[clamp(2.8rem,5vw,4.2rem)] font-bold tracking-[-0.03em]" style={{ ...display, color: C.ink }}>
              {hasNumericPrefix ? (isInView ? count : 0) : stat.value.replace(suffix, "")}
            </span>
            <span className="text-[clamp(1.6rem,3vw,2.8rem)] font-bold tracking-[-0.03em]" style={{ ...display, color: C.gold }}>
              {suffix}
            </span>
          </div>
          <span className="text-[16px] font-semibold" style={{ color: C.muted }}>{stat.label}</span>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ── Browser Window ── */
function BrowserWindow({
  title,
  desc,
  isInView,
  index,
  type,
}: {
  title: string;
  desc: string;
  isInView: boolean;
  index: number;
  type: string;
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 32, scale: 0.96 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.5, delay: 0.1 + index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <motion.div
        className="relative will-change-transform"
        animate={{
          y: isHovered ? -6 : 0,
          scale: isHovered ? 1.015 : 1,
          rotateX: isHovered ? 2 : 0,
          rotateY: isHovered ? -1 : 0,
        }}
        transition={springHover}
      >
        <div
          className="relative rounded-[20px] overflow-hidden"
          style={{
            background: "rgba(255,253,248,0.55)",
            backdropFilter: "blur(12px)",
            border: `1px solid ${isHovered ? "rgba(184,146,62,0.25)" : "rgba(13,107,69,0.06)"}`,
            boxShadow: isHovered
              ? "0 20px 56px rgba(0,0,0,0.06), 0 0 32px -8px rgba(184,146,62,0.14)"
              : "0 4px 24px rgba(0,0,0,0.03)",
            transition: "border-color 0.3s ease, box-shadow 0.3s ease",
          }}
        >
          {/* Browser chrome */}
          <div className="flex items-center gap-2 px-4 py-2.5 border-b" style={{ borderColor: "rgba(23,31,26,0.05)" }}>
            <div className="flex gap-1.5">
              <div className="h-2.5 w-2.5 rounded-full transition-colors" style={{ background: isHovered ? "#E0645C" : C.line }} />
              <div className="h-2.5 w-2.5 rounded-full transition-colors" style={{ background: isHovered ? C.gold : C.line }} />
              <div className="h-2.5 w-2.5 rounded-full transition-colors" style={{ background: isHovered ? C.emerald : C.line }} />
            </div>
            <div className="flex-1 mx-3 h-5 rounded-md flex items-center px-3" style={{ background: "rgba(23,31,26,0.03)" }}>
              <span className="text-[10px] font-medium truncate" style={{ color: C.faint }}>{title.toLowerCase().replace(/\s+/g, "-")}.riverloom.io</span>
            </div>
            <Sparkles className="h-3.5 w-3.5 transition-opacity" style={{ opacity: isHovered ? 1 : 0, color: C.gold }} />
          </div>

          {/* Preview content */}
          <div className="p-5">
            <div className="flex items-start gap-3 mb-4">
              <motion.div
                className="flex h-9 w-9 items-center justify-center rounded-xl flex-shrink-0"
                style={{ background: "rgba(13,107,69,0.08)", backdropFilter: "blur(8px)" }}
                animate={{ rotate: isHovered ? [0, -5, 3, 0] : 0 }}
                transition={{ duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
              >
                {type === "chart" || type === "perf" || type === "monitor" || type === "analytics" ? <BarChart3 className="h-4 w-4" style={{ color: C.emerald }} /> :
                 type === "table" || type === "schema" ? <Table className="h-4 w-4" style={{ color: C.emerald }} /> :
                 type === "grid" || type === "cards" || type === "design" ? <Layout className="h-4 w-4" style={{ color: C.emerald }} /> :
                 type === "landing" || type === "mobile" || type === "prototype" ? <Image className="h-4 w-4" style={{ color: C.emerald }} /> :
                 type === "arch" || type === "api" || type === "deploy" || type === "cicd" ? <Server className="h-4 w-4" style={{ color: C.emerald }} /> :
                 <FileText className="h-4 w-4" style={{ color: C.emerald }} />}
              </motion.div>
              <div className="min-w-0">
                <h4 className="text-[15px] font-bold truncate" style={{ color: C.ink }}>{title}</h4>
                <p className="text-[12px] mt-0.5" style={{ color: C.faint }}>{desc}</p>
              </div>
            </div>

            {/* Mini interface */}
            <div className="relative">{renderMiniPreview(type, isHovered)}</div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function renderMiniPreview(type: string, isHovered: boolean) {
  const cellBg = (i: number) => `rgba(13,107,69,${0.04 + i * 0.02})`;
  const accent = isHovered ? C.emerald : "rgba(13,107,69,0.15)";

  switch (type) {
    case "chart":
    case "perf":
    case "monitor":
    case "analytics":
      return (
        <div className="space-y-2">
          <div className="relative h-16 rounded-lg overflow-hidden" style={{ background: "rgba(13,107,69,0.03)", border: "1px solid rgba(13,107,69,0.05)" }}>
            <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 40" preserveAspectRatio="none">
              <defs>
                <linearGradient id={`grad-${type}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={C.emerald} />
                  <stop offset="100%" stopColor={C.emerald} stopOpacity="0" />
                </linearGradient>
              </defs>
              <polyline
                points="0,35 10,28 20,32 30,18 40,22 50,10 60,16 70,6 80,12 90,4 100,8"
                fill="none" stroke={accent} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
              />
              <polygon
                points="0,35 10,28 20,32 30,18 40,22 50,10 60,16 70,6 80,12 90,4 100,8 100,40 0,40"
                fill={`url(#grad-${type})`} opacity="0.15"
              />
            </svg>
            <div className="absolute bottom-1 right-2 flex gap-2">
              <div className="h-1.5 w-4 rounded-full transition-colors" style={{ background: isHovered ? C.emerald : "rgba(13,107,69,0.1)" }} />
              <div className="h-1.5 w-4 rounded-full" style={{ background: "rgba(23,31,26,0.04)" }} />
            </div>
          </div>
          <div className="flex gap-3">
            {["Page Views", "Conversions"].map((l) => (
              <span key={l} className="flex items-center gap-1 text-[10px] font-medium" style={{ color: C.faint }}>
                <span className="h-1.5 w-1.5 rounded-full" style={{ background: C.emerald }} />
                {l}
              </span>
            ))}
          </div>
        </div>
      );

    case "table":
    case "schema":
      return (
        <div className="space-y-1">
          {["User ID", "Role", "Status", "Last Active"].map((h, i) => (
            <div key={h} className="flex gap-2 items-center">
              <div className="h-4 w-12 rounded" style={{ background: "rgba(13,107,69,0.04)", border: "1px solid rgba(13,107,69,0.05)" }} />
              <div className="h-4 flex-1 rounded transition-colors" style={{ background: isHovered && i === 0 ? "rgba(13,107,69,0.08)" : "rgba(23,31,26,0.02)" }} />
              <div className="h-4 w-14 rounded" style={{ background: "rgba(23,31,26,0.02)" }} />
            </div>
          ))}
        </div>
      );

    case "grid":
      return (
        <div className="grid grid-cols-3 gap-1.5">
          {Array.from({ length: 9 }).map((_, i) => (
            <div key={i} className="h-8 rounded-md border" style={{ background: cellBg(i % 4), borderColor: isHovered && i === 0 ? "rgba(13,107,69,0.15)" : "rgba(13,107,69,0.05)" }} />
          ))}
        </div>
      );

    case "cards":
    case "design":
      return (
        <div className="grid grid-cols-2 gap-2">
          {["Primary", "Secondary", "Accent", "Neutral"].map((c, i) => (
            <div key={c} className="flex items-center gap-2 p-1.5 rounded-lg" style={{ background: "rgba(13,107,69,0.03)", border: "1px solid rgba(13,107,69,0.05)" }}>
              <div className="h-4 w-4 rounded" style={{ backgroundColor: [C.emerald, C.gold, C.ink, C.faint][i] }} />
              <span className="text-[10px] font-semibold" style={{ color: C.muted }}>{c}</span>
            </div>
          ))}
        </div>
      );

    case "landing":
      return (
        <div className="space-y-2">
          <div className="h-3 w-3/5 rounded" style={{ background: "rgba(13,107,69,0.06)" }} />
          <div className="h-8 rounded-lg" style={{ background: "rgba(13,107,69,0.04)", border: "1px solid rgba(13,107,69,0.05)" }} />
          <div className="flex gap-2">
            <div className="h-6 flex-1 rounded" style={{ background: "rgba(13,107,69,0.06)" }} />
            <div className="h-6 w-16 rounded transition-colors" style={{ background: isHovered ? C.emerald : "rgba(13,107,69,0.1)" }} />
          </div>
        </div>
      );

    case "mobile":
      return (
        <div className="flex justify-center">
          <div className="w-16 rounded-xl border-2 p-1.5 space-y-1.5" style={{ borderColor: "rgba(23,31,26,0.06)", background: "rgba(255,253,248,0.4)" }}>
            <div className="h-2 w-6 rounded-full mx-auto" style={{ background: "rgba(23,31,26,0.04)" }} />
            <div className="h-4 rounded" style={{ background: "rgba(13,107,69,0.06)" }} />
            <div className="h-4 rounded" style={{ background: "rgba(13,107,69,0.04)" }} />
            <div className="h-4 w-8 rounded mx-auto transition-colors" style={{ background: isHovered ? C.emerald : "rgba(13,107,69,0.08)" }} />
            <div className="h-1 w-4 rounded-full mx-auto mt-1" style={{ background: "rgba(23,31,26,0.04)" }} />
          </div>
        </div>
      );

    case "prototype":
      return (
        <div className="flex gap-2 items-center justify-center">
          {["Home", "Profile", "Settings"].map((s, i) => (
            <div
              key={s}
              className="h-6 px-3 rounded-full flex items-center justify-center text-[9px] font-semibold border transition-colors"
              style={
                isHovered && i === 1
                  ? { background: "rgba(13,107,69,0.1)", borderColor: C.emerald, color: C.emerald }
                  : { background: "rgba(23,31,26,0.02)", borderColor: "rgba(23,31,26,0.04)", color: C.faint }
              }
            >
              {s}
            </div>
          ))}
        </div>
      );

    case "arch":
      return (
        <div className="flex items-center gap-2 justify-center">
          {["API", "Svc A", "Svc B", "DB"].map((label, i) => (
            <React.Fragment key={label}>
              <div
                className="h-7 w-10 rounded-lg flex items-center justify-center text-[8px] font-bold border"
                style={{
                  background: cellBg(i),
                  borderColor: isHovered && i === 0 ? "rgba(13,107,69,0.2)" : "rgba(13,107,69,0.06)",
                  color: isHovered && i === 0 ? C.emerald : C.faint,
                }}
              >
                {label}
              </div>
              {i < 3 && <ChevronRight className="h-3 w-3" style={{ color: "rgba(13,107,69,0.15)" }} />}
            </React.Fragment>
          ))}
        </div>
      );

    case "api":
      return (
        <div className="space-y-1.5">
          {["GET /users", "POST /auth", "GET /dashboard"].map((endpoint, i) => (
            <div key={endpoint} className="flex items-center gap-2 p-1.5 rounded-lg border" style={{ background: cellBg(i), borderColor: isHovered && i === 0 ? "rgba(13,107,69,0.12)" : "rgba(13,107,69,0.05)" }}>
              <span
                className="text-[8px] font-bold px-1 py-0.5 rounded"
                style={isHovered && i === 0 ? { background: C.emerald, color: "#fff" } : { background: "rgba(13,107,69,0.08)", color: C.emerald }}
              >
                {endpoint.split(" ")[0]}
              </span>
              <span className="text-[9px] truncate" style={{ color: C.muted }}>{endpoint.split(" ")[1]}</span>
            </div>
          ))}
        </div>
      );

    case "deploy":
    case "cicd":
      return (
        <div className="flex items-center gap-1.5 justify-center">
          {["Build", "Test", "Deploy", "Monitor"].map((stage, i) => (
            <React.Fragment key={stage}>
              <div
                className="h-6 px-2 rounded-md flex items-center justify-center text-[8px] font-bold border"
                style={{
                  background: i <= 1 ? (isHovered ? "rgba(13,107,69,0.1)" : "rgba(13,107,69,0.06)") : "rgba(23,31,26,0.02)",
                  borderColor: i <= 1 ? (isHovered ? "rgba(13,107,69,0.2)" : "rgba(13,107,69,0.08)") : "rgba(23,31,26,0.04)",
                  color: i <= 1 ? (isHovered ? C.emerald : C.muted) : C.faint,
                }}
              >
                {stage}
              </div>
              {i < 3 && <ChevronRight className="h-2.5 w-2.5" style={{ color: "rgba(23,31,26,0.06)" }} />}
            </React.Fragment>
          ))}
        </div>
      );

    default:
      return <div className="h-10 rounded-lg" style={{ background: "rgba(13,107,69,0.03)", border: "1px solid rgba(13,107,69,0.05)" }} />;
  }
}

/* ── Section Wrapper ── */
const SectionWrapper = React.forwardRef<
  HTMLDivElement,
  { children: React.ReactNode; isInView: boolean; label: string; title: string; icon: React.ElementType }
>(({ children, isInView, label, title, icon: Icon }, ref) => (
  <section ref={ref} className="relative z-10 px-6 md:px-20 lg:px-28 pb-24 md:pb-32">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="mb-10"
    >
      <span className="inline-flex items-center gap-2 text-[12px] font-bold uppercase tracking-[0.18em] mb-3" style={{ color: C.gold }}>
        <Icon className="h-4 w-4" />
        {label}
      </span>
      <h2 className="font-bold tracking-[-0.02em]" style={{ ...display, fontSize: "clamp(2.2rem, 4.5vw, 3.2rem)", color: C.ink }}>
        {title}
      </h2>
    </motion.div>
    {children}
  </section>
));
SectionWrapper.displayName = "SectionWrapper";

/* ═══════════════════════════════════════════════════
   TECHNOLOGIES
   ═══════════════════════════════════════════════════ */
function TechnologiesSection({ technologies }: { technologies: string[] }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-60px" });

  if (!technologies || technologies.length === 0) return null;

  const techDetails: Record<string, { purpose: string; rating: number; description: string }> = {
    Figma: { purpose: "UI Design", rating: 5, description: "Collaborative interface design tool with real-time editing" },
    Sketch: { purpose: "Design System", rating: 4, description: "Vector-based design tool for UI/UX workflows" },
    Storybook: { purpose: "Component Library", rating: 4, description: "Frontend workshop for building UI components in isolation" },
    "Next.js": { purpose: "React Framework", rating: 5, description: "Production React framework with SSR and routing" },
    "Tailwind CSS": { purpose: "Utility CSS", rating: 5, description: "Utility-first CSS framework for rapid UI development" },
    AWS: { purpose: "Cloud Infrastructure", rating: 5, description: "Comprehensive cloud services platform" },
    Miro: { purpose: "Collaboration", rating: 4, description: "Digital whiteboard for team collaboration" },
    Notion: { purpose: "Documentation", rating: 4, description: "All-in-one workspace for docs and knowledge" },
    Linear: { purpose: "Project Management", rating: 4, description: "Issue tracking and project management tool" },
    "Google Analytics": { purpose: "Analytics", rating: 4, description: "Web analytics platform for tracking and insights" },
    React: { purpose: "UI Library", rating: 5, description: "Component-based JavaScript library for user interfaces" },
    "Node.js": { purpose: "Runtime", rating: 5, description: "JavaScript runtime for building server-side applications" },
    Python: { purpose: "Backend & AI", rating: 5, description: "Versatile programming language for AI and backend" },
    PostgreSQL: { purpose: "Database", rating: 5, description: "Advanced open-source relational database" },
    Docker: { purpose: "Containerization", rating: 5, description: "Container platform for consistent deployment" },
    TensorFlow: { purpose: "Machine Learning", rating: 4, description: "Open-source ML framework for AI applications" },
    Datadog: { purpose: "Monitoring", rating: 4, description: "Cloud monitoring and observability platform" },
    Sentry: { purpose: "Error Tracking", rating: 4, description: "Real-time error tracking and performance monitoring" },
    "GitHub Actions": { purpose: "CI/CD", rating: 4, description: "Automated workflows for CI/CD pipelines" },
    Terraform: { purpose: "Infrastructure as Code", rating: 5, description: "Declarative infrastructure provisioning tool" },
    Kubernetes: { purpose: "Orchestration", rating: 4, description: "Container orchestration for automated deployment" },
  };

  const techIcons: Record<string, React.ElementType> = {
    Figma, "Next.js": Globe, React: Code, "Node.js": Server, Python: Cpu, PostgreSQL: Database, AWS: Cloud, Docker: Server, TensorFlow: Cpu,
    Datadog: Activity, Sentry: Shield, "GitHub Actions": Server, Terraform: Cloud, Kubernetes: Server, Miro: PenTool,
    Notion: FileText, Linear: Zap, "Google Analytics": BarChart3, Sketch: PenTool, Storybook: Layout, "Tailwind CSS": Palette,
  };

  const getTechIcon = (tech: string) => {
    if (techIcons[tech]) return techIcons[tech];
    for (const [key, icon] of Object.entries(techIcons)) { if (tech.includes(key)) return icon; }
    return Code;
  };

  return (
    <section ref={sectionRef} className="relative z-10 px-6 md:px-20 lg:px-28 pb-24 md:pb-32">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="mb-10"
      >
        <span className="inline-flex items-center gap-2 text-[12px] font-bold uppercase tracking-[0.18em] mb-3" style={{ color: C.gold }}>
          <Code className="h-4 w-4" />Technology Stack
        </span>
        <h2 className="font-bold tracking-[-0.02em]" style={{ ...display, fontSize: "clamp(2.2rem, 4.5vw, 3.2rem)", color: C.ink }}>
          Tools & Technologies
        </h2>
      </motion.div>
      <motion.div
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
        variants={staggerContainer}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        {technologies.map((tech, i) => {
          const details = techDetails[tech] ?? { purpose: "Technology", rating: 4, description: "Industry-standard tool used in our delivery process" };
          const TechIcon = getTechIcon(tech);
          return <TechCard key={tech} tech={tech} purpose={details.purpose} rating={details.rating} description={details.description} icon={TechIcon} index={i} />;
        })}
      </motion.div>
    </section>
  );
}

function TechCard({
  tech,
  purpose,
  rating,
  description,
  icon: TechIcon,
  index,
}: {
  tech: string;
  purpose: string;
  rating: number;
  description: string;
  icon: React.ElementType;
  index: number;
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div variants={staggerItem} onHoverStart={() => setIsHovered(true)} onHoverEnd={() => setIsHovered(false)}>
      <motion.div
        className="relative will-change-transform"
        animate={{ y: isHovered ? -6 : 0, scale: isHovered ? 1.02 : 1 }}
        transition={springHover}
      >
        <div
          className="relative rounded-[20px] overflow-hidden p-5"
          style={{
            background: isHovered ? "rgba(255,253,248,0.8)" : "rgba(255,253,248,0.45)",
            backdropFilter: "blur(12px)",
            border: `1px solid ${isHovered ? "rgba(184,146,62,0.3)" : "rgba(23,31,26,0.05)"}`,
            boxShadow: isHovered ? "0 16px 48px rgba(0,0,0,0.05), 0 4px 12px rgba(0,0,0,0.02)" : "0 1px 2px rgba(0,0,0,0.02)",
            transition: "background 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease",
          }}
        >
          <div className="relative z-10">
            <motion.div
              className="flex h-10 w-10 items-center justify-center rounded-xl mb-4"
              style={{ background: "rgba(13,107,69,0.08)", backdropFilter: "blur(8px)", boxShadow: "inset 0 1px 0 rgba(255,255,255,0.6)" }}
              animate={{ rotate: isHovered ? [0, -5, 3, 0] : 0 }}
              transition={{ duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
            >
              <TechIcon className="h-5 w-5" style={{ color: C.emerald }} />
            </motion.div>
            <h4 className="text-[16px] font-bold mb-0.5" style={{ color: C.ink }}>{tech}</h4>
            <p className="text-[13px] font-medium mb-2" style={{ color: C.faint }}>{purpose}</p>
            <div className="flex gap-0.5 mb-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-3 w-3" style={{ fill: i < rating ? C.gold : "transparent", color: i < rating ? C.gold : "rgba(23,31,26,0.1)" }} />
              ))}
            </div>
            <AnimatePresence>
              {isHovered && (
                <motion.p
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                  className="text-[12px] leading-relaxed overflow-hidden"
                  style={{ color: C.muted }}
                >
                  {description}
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════
   DELIVERABLES
   ═══════════════════════════════════════════════════ */
function DeliverablesSection({ deliverables }: { deliverables: string[] }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-60px" });

  if (!deliverables || deliverables.length === 0) return null;

  const deliverableDetails: Record<string, { icon: React.ElementType; includes: string[]; description: string }> = {
    "Research Report": { icon: FileText, description: "Comprehensive analysis of market landscape, competitors, and user insights", includes: ["Executive Summary", "Market Analysis", "Competitor Research", "User Insights"] },
    "Requirements Specification": { icon: FileText, description: "Detailed functional and technical requirements for development", includes: ["Functional Requirements", "Technical Specs", "Acceptance Criteria", "Priority Matrix"] },
    "Project Plan": { icon: Calendar, description: "Complete project roadmap with milestones and resource allocation", includes: ["Milestone Timeline", "Resource Allocation", "Risk Register", "Communication Plan"] },
    "Stakeholder Map": { icon: Users, description: "Visual map of all stakeholders and their influence levels", includes: ["Key Stakeholders", "Influence Matrix", "Engagement Plan"] },
    "Risk Assessment": { icon: Shield, description: "Identified risks with mitigation strategies and contingency plans", includes: ["Risk Identification", "Mitigation Strategy", "Contingency Plans"] },
    "Wireframes & Prototypes": { icon: Layout, description: "Interactive wireframes and clickable prototypes for user testing", includes: ["User Flow", "Low Fidelity", "Clickable Prototype", "Design System"] },
    "Design System": { icon: Palette, description: "Comprehensive design system with reusable components", includes: ["Component Library", "Style Guide", "Iconography", "Typography"] },
    "Architecture Document": { icon: Globe, description: "System architecture with data models, API specs, and security design", includes: ["System Architecture", "Data Models", "API Specs", "Security Design"] },
    "Roadmap & Timeline": { icon: Calendar, description: "Strategic roadmap with phase breakdown and release plan", includes: ["Phase Breakdown", "Dependencies", "Release Plan"] },
    "User Flow Diagrams": { icon: PenTool, description: "Detailed user journey maps and conversion path diagrams", includes: ["User Journeys", "Decision Trees", "Conversion Paths"] },
    "Working Application": { icon: Globe, description: "Fully functional application with frontend, backend, and database", includes: ["Frontend UI", "Backend API", "Database", "Integration"] },
    "API Documentation": { icon: FileText, description: "Complete API reference with endpoints, auth, and examples", includes: ["Endpoints", "Authentication", "Rate Limits", "Examples"] },
    "Infrastructure Setup": { icon: Cloud, description: "Production-ready cloud infrastructure with CI/CD and monitoring", includes: ["Cloud Config", "CI/CD Pipeline", "Monitoring", "Scaling"] },
    "Test Suite": { icon: Shield, description: "Automated test suite covering unit, integration, and E2E tests", includes: ["Unit Tests", "Integration Tests", "E2E Tests", "Performance Tests"] },
    "Deployment Pipeline": { icon: Server, description: "End-to-end deployment pipeline with staging and production environments", includes: ["Build Process", "Staging", "Production", "Rollback"] },
    "Production Deployment": { icon: Rocket, description: "Production deployment with migration plan and DNS configuration", includes: ["Migration Plan", "DNS Setup", "SSL Config", "CDN Config"] },
    "Monitoring Dashboard": { icon: BarChart3, description: "Real-time monitoring dashboard with metrics and alerts", includes: ["Metrics", "Alerts", "Logs", "Uptime Tracking"] },
    "Performance Report": { icon: Activity, description: "Performance benchmark report with load testing results", includes: ["Load Testing", "Optimization", "Benchmarks"] },
    "Maintenance Plan": { icon: Calendar, description: "Ongoing maintenance plan with scheduled updates and SLA terms", includes: ["Schedule", "SLA Terms", "Update Process"] },
    "Support SLA": { icon: Shield, description: "Support service level agreement with response time guarantees", includes: ["Response Times", "Escalation", "Coverage Hours"] },
  };

  return (
    <section ref={sectionRef} className="relative z-10 px-6 md:px-20 lg:px-28 pb-24 md:pb-32">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="mb-10"
      >
        <span className="inline-flex items-center gap-2 text-[12px] font-bold uppercase tracking-[0.18em] mb-3" style={{ color: C.gold }}>
          <Layers className="h-4 w-4" />What You Receive
        </span>
        <h2 className="font-bold tracking-[-0.02em]" style={{ ...display, fontSize: "clamp(2.2rem, 4.5vw, 3.2rem)", color: C.ink }}>
          Deliverables
        </h2>
      </motion.div>
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
        variants={staggerContainer}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        {deliverables.map((d, i) => (
          <DeliverableCard key={d} deliverable={d} details={deliverableDetails[d]} index={i} />
        ))}
      </motion.div>
    </section>
  );
}

function DeliverableCard({
  deliverable,
  details,
  index,
}: {
  deliverable: string;
  details?: { icon: React.ElementType; includes: string[]; description: string };
  index: number;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const Icon = details?.icon ?? FileText;

  return (
    <motion.div variants={staggerItem} onHoverStart={() => setIsHovered(true)} onHoverEnd={() => setIsHovered(false)}>
      <motion.div className="relative will-change-transform" animate={{ y: isHovered ? -6 : 0, scale: isHovered ? 1.02 : 1 }} transition={springHover}>
        <div
          className="relative rounded-[20px] overflow-hidden p-6"
          style={{
            background: "rgba(255,253,248,0.55)",
            backdropFilter: "blur(12px)",
            border: `1px solid ${isHovered ? "rgba(184,146,62,0.28)" : "rgba(23,31,26,0.05)"}`,
            boxShadow: isHovered ? "0 20px 56px rgba(0,0,0,0.05), 0 4px 12px rgba(0,0,0,0.02)" : "0 1px 2px rgba(0,0,0,0.02)",
            transition: "border-color 0.3s ease, box-shadow 0.3s ease",
          }}
        >
          <div className="relative z-10">
            <div className="flex items-start justify-between mb-4">
              <motion.div
                className="flex h-11 w-11 items-center justify-center rounded-xl"
                style={{ background: "rgba(13,107,69,0.08)", backdropFilter: "blur(8px)", boxShadow: "inset 0 1px 0 rgba(255,255,255,0.6)" }}
                animate={{ rotate: isHovered ? [0, -5, 3, 0] : 0, scale: isHovered ? 1.1 : 1 }}
                transition={{ duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
              >
                <Icon className="h-5 w-5" style={{ color: C.emerald }} />
              </motion.div>
              <motion.div animate={{ x: isHovered ? 4 : 0, opacity: isHovered ? 1 : 0.3 }} transition={{ duration: 0.3 }}>
                <ArrowRight className="h-5 w-5" style={{ color: C.gold }} />
              </motion.div>
            </div>
            <h4 className="text-[18px] font-bold mb-1" style={{ ...display, color: C.ink }}>{deliverable}</h4>
            <p className="text-[14px] font-medium mb-3" style={{ color: C.faint }}>
              {details?.description ?? "A premium, fully documented deliverable handed off at the close of this phase."}
            </p>
            {details && (
              <div className="flex flex-wrap gap-1.5 mb-3">
                <span className="text-[12px] font-semibold rounded-full px-2.5 py-0.5" style={{ color: C.emerald, background: "rgba(13,107,69,0.06)" }}>
                  {details.includes.length} items
                </span>
              </div>
            )}
            <AnimatePresence>
              {isHovered && details && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <div className="h-px my-4" style={{ background: "linear-gradient(90deg, rgba(184,146,62,0.3), transparent)" }} />
                  <div className="flex flex-wrap gap-2">
                    {details.includes.map((item) => (
                      <span key={item} className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[12px] font-semibold" style={{ background: "rgba(13,107,69,0.06)", color: C.emerald }}>
                        <Check className="h-3 w-3" />
                        {item}
                      </span>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════
   PROCESS TIMELINE
   ═══════════════════════════════════════════════════ */
function ProcessTimelineSection({ phaseId }: { phaseId: string }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-60px" });

  const timelines: Record<string, { label: string; icon: React.ElementType }[]> = {
    discovery: [
      { label: "Stakeholder Interviews", icon: Users }, { label: "Market Analysis", icon: BarChart3 },
      { label: "Technical Audit", icon: Server }, { label: "Synthesis", icon: Layers }, { label: "Findings Report", icon: FileText },
    ],
    strategy: [
      { label: "Research", icon: Search }, { label: "Wireframes", icon: PenTool },
      { label: "Prototype", icon: Layout }, { label: "Testing", icon: Shield }, { label: "Approval", icon: Check },
    ],
    development: [
      { label: "Backend API", icon: Server }, { label: "Frontend UI", icon: Globe },
      { label: "Integration", icon: Code }, { label: "Testing", icon: Shield }, { label: "Review", icon: Check },
    ],
    launch: [
      { label: "Staging Deploy", icon: Cloud }, { label: "QA Testing", icon: Shield },
      { label: "Production Launch", icon: Rocket }, { label: "Monitoring", icon: Activity }, { label: "Optimization", icon: TrendingUp },
    ],
  };

  const steps = timelines[phaseId] ?? timelines.discovery;

  return (
    <section ref={sectionRef} className="relative z-10 px-6 md:px-20 lg:px-28 pb-24 md:pb-32">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="mb-10"
      >
        <span className="inline-flex items-center gap-2 text-[12px] font-bold uppercase tracking-[0.18em] mb-3" style={{ color: C.gold }}>
          <Activity className="h-4 w-4" />Process Timeline
        </span>
        <h2 className="font-bold tracking-[-0.02em]" style={{ ...display, fontSize: "clamp(2.2rem, 4.5vw, 3.2rem)", color: C.ink }}>
          How We Execute
        </h2>
      </motion.div>
      <div
        className="relative overflow-hidden rounded-[24px] p-8 md:p-12"
        style={{ background: "rgba(255,253,248,0.4)", backdropFilter: "blur(16px)", border: "1px solid rgba(13,107,69,0.06)" }}
      >
        <div className="absolute left-[8%] right-[8%] top-1/2 -translate-y-1/2 h-[2px]" style={{ background: "rgba(13,107,69,0.08)" }} />
        <motion.div
          className="absolute left-[8%] top-1/2 -translate-y-1/2 h-[2px]"
          style={{ background: `linear-gradient(90deg, ${C.emerald}, ${C.gold})` }}
          initial={{ width: "0%" }}
          animate={isInView ? { width: "80%" } : {}}
          transition={{ duration: 2, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
        />
        <div className="relative flex justify-between">
          {steps.map((step, i) => {
            const StepIcon = step.icon;
            return (
              <motion.div
                key={step.label}
                className="flex flex-col items-center"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.12, ease: [0.16, 1, 0.3, 1] }}
              >
                <motion.div
                  className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full mb-4"
                  style={{ background: "rgba(255,253,248,0.8)", backdropFilter: "blur(8px)", border: "2px solid rgba(13,107,69,0.15)", boxShadow: "0 4px 16px rgba(13,107,69,0.06)" }}
                  initial={{ scale: 0 }}
                  animate={isInView ? { scale: 1 } : {}}
                  transition={{ duration: 0.4, delay: 0.4 + i * 0.12, ease: "backOut" }}
                  whileHover={{ scale: 1.12, borderColor: "rgba(184,146,62,0.4)", boxShadow: "0 8px 32px rgba(184,146,62,0.16)" }}
                >
                  <StepIcon className="h-5 w-5" style={{ color: C.emerald }} />
                </motion.div>
                <span className="text-[13px] font-bold text-center max-w-[90px] leading-tight" style={{ color: C.muted }}>{step.label}</span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════
   FAQ
   ═══════════════════════════════════════════════════ */
function FAQSection({ faqs }: { faqs: { q: string; a: string }[] }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-60px" });
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  if (!faqs || faqs.length === 0) return null;

  return (
    <section ref={sectionRef} className="relative z-10 px-6 md:px-20 lg:px-28 pb-24 md:pb-32">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="mb-10"
      >
        <span className="inline-flex items-center gap-2 text-[12px] font-bold uppercase tracking-[0.18em] mb-3" style={{ color: C.gold }}>
          <Quote className="h-4 w-4" />Common Questions
        </span>
        <h2 className="font-bold tracking-[-0.02em]" style={{ ...display, fontSize: "clamp(2.2rem, 4.5vw, 3.2rem)", color: C.ink }}>
          Frequently Asked Questions
        </h2>
      </motion.div>
      <div
        className="relative overflow-hidden rounded-[24px]"
        style={{ background: "rgba(255,253,248,0.4)", backdropFilter: "blur(16px)", border: "1px solid rgba(13,107,69,0.06)", boxShadow: "0 4px 24px rgba(0,0,0,0.02)" }}
      >
        {faqs.map((faq, i) => (
          <div key={i} className="border-b last:border-b-0" style={{ borderColor: "rgba(13,107,69,0.06)", background: openIndex === i ? "rgba(13,107,69,0.02)" : "transparent" }}>
            <button
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              className="flex w-full items-center justify-between gap-4 px-8 py-6 text-left transition-colors"
            >
              <span className="text-[18px] font-bold pr-8" style={{ ...display, color: C.ink }}>{faq.q}</span>
              <motion.div
                className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full"
                style={{ background: "rgba(184,146,62,0.1)" }}
                animate={{ rotate: openIndex === i ? 180 : 0 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              >
                <ChevronDown className="h-4 w-4" style={{ color: C.gold }} />
              </motion.div>
            </button>
            <AnimatePresence initial={false}>
              {openIndex === i && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <p className="px-8 pb-6 text-[17px] leading-relaxed max-w-3xl" style={{ color: C.muted }}>{faq.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════
   CONTACT
   ═══════════════════════════════════════════════════ */
function ContactSection({ phase }: { phase: NonNullable<(typeof processPhases)[number]> }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-60px" });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const companyRef = useRef<HTMLInputElement>(null);
  const budgetRef = useRef<HTMLInputElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: nameRef.current?.value || "",
          email: emailRef.current?.value || "",
          projectType: phase.title,
          message: `Company: ${companyRef.current?.value || ""}\nBudget: ${budgetRef.current?.value || ""}\n\n${messageRef.current?.value || ""}`,
        }),
      });
      await res.json();
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 4000);
    } catch {
      setSubmitted(false);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section ref={sectionRef} className="relative z-10 px-6 md:px-20 lg:px-28 pb-24 md:pb-32">
      <div
        className="relative overflow-hidden rounded-[32px] p-8 md:p-12 lg:p-16"
        style={{
          background: "rgba(255,253,248,0.5)",
          backdropFilter: "blur(20px)",
          border: "1px solid rgba(184,146,62,0.14)",
          boxShadow: "0 8px 48px rgba(0,0,0,0.03)",
        }}
      >
        <div
          className="pointer-events-none absolute inset-0 rounded-[32px]"
          style={{ background: "linear-gradient(135deg, rgba(13,107,69,0.05) 0%, transparent 50%, rgba(184,146,62,0.04) 100%)" }}
        />
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16 items-start">
          <div className="lg:col-span-2">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}>
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl mb-6" style={{ background: "rgba(13,107,69,0.08)" }}>
                <Send className="h-6 w-6" style={{ color: C.emerald }} />
              </div>
              <h3 className="font-bold tracking-[-0.02em] mb-4" style={{ ...display, fontSize: "clamp(2rem, 3.5vw, 3rem)", color: C.ink }}>
                Let's Build Something Exceptional
              </h3>
              <p className="text-[18px] leading-relaxed mb-8" style={{ color: C.muted }}>
                Tell us about your project and we'll craft a tailored approach for your {phase.title.toLowerCase()} needs.
              </p>
              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg" style={{ background: "rgba(13,107,69,0.06)" }}>
                    <Clock className="h-4 w-4" style={{ color: C.emerald }} />
                  </div>
                  <span className="text-[15px] font-medium" style={{ color: C.muted }}>Response within 24 hours</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg" style={{ background: "rgba(13,107,69,0.06)" }}>
                    <Shield className="h-4 w-4" style={{ color: C.emerald }} />
                  </div>
                  <span className="text-[15px] font-medium" style={{ color: C.muted }}>NDA available on request</span>
                </div>
              </div>
            </motion.div>
          </div>
          <div className="lg:col-span-3">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <FormField label="Name" type="text" required />
                  <FormField label="Email" type="email" required />
                  <FormField label="Company" type="text" />
                  <FormField label="Budget" type="text" />
                </div>
                <div className="relative">
                  <textarea
                    placeholder="Tell us about your project..." rows={4} required
                    className="peer w-full rounded-xl border bg-white/60 px-5 pt-6 pb-2 text-[16px] outline-none transition-all resize-none"
                    style={{ borderColor: "rgba(23,31,26,0.08)", color: C.ink }}
                    onFocus={(e) => { e.currentTarget.style.borderColor = C.emerald; e.currentTarget.style.boxShadow = "0 0 0 3px rgba(13,107,69,0.12)"; }}
                    onBlur={(e) => { e.currentTarget.style.borderColor = "rgba(23,31,26,0.08)"; e.currentTarget.style.boxShadow = "none"; }}
                  />
                  <span className="pointer-events-none absolute left-5 top-1.5 text-[11px] font-semibold uppercase tracking-[0.1em]" style={{ color: C.faint }}>Project Details</span>
                </div>
                <motion.button
                  type="submit"
                  className="group relative inline-flex w-full items-center justify-center gap-3 overflow-hidden rounded-full px-8 py-4 text-[18px] font-bold text-white transition-all"
                  style={{
                    background: `linear-gradient(135deg, ${C.emerald}, #0A5637)`,
                    boxShadow: "0 4px 24px rgba(13,107,69,0.28), inset 0 1px 0 rgba(255,255,255,0.12)",
                    border: "1px solid rgba(184,146,62,0.3)",
                  }}
                  whileHover={{ y: -2, boxShadow: "0 12px 48px rgba(13,107,69,0.38), inset 0 1px 0 rgba(255,255,255,0.16)" }}
                  transition={{ type: "spring", stiffness: 200, damping: 15 }}
                >
                  {submitted ? (
                    <><Check className="h-5 w-5" />Message Sent!</>
                  ) : (
                    <>
                      <span>Let's Build Something Amazing</span>
                      <Send className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                      <motion.div
                        className="absolute inset-0 rounded-full"
                        style={{ background: "linear-gradient(90deg, transparent, rgba(184,146,62,0.25), transparent)" }}
                        initial={{ x: "-100%" }}
                        whileHover={{ x: "100%" }}
                        transition={{ duration: 0.5, ease: "easeInOut" }}
                      />
                    </>
                  )}
                </motion.button>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FormField({ label, type, required }: { label: string; type: string; required?: boolean }) {
  return (
    <div className="relative">
      <input
        type={type} placeholder={label} required={required}
        className="peer w-full rounded-xl border bg-white/60 px-5 pt-6 pb-2 text-[16px] outline-none transition-all"
        style={{ borderColor: "rgba(23,31,26,0.08)", color: "#171F1A" }}
        onFocus={(e) => { e.currentTarget.style.borderColor = C.emerald; e.currentTarget.style.boxShadow = "0 0 0 3px rgba(13,107,69,0.12)"; }}
        onBlur={(e) => { e.currentTarget.style.borderColor = "rgba(23,31,26,0.08)"; e.currentTarget.style.boxShadow = "none"; }}
      />
      <span className="pointer-events-none absolute left-5 top-1.5 text-[11px] font-semibold uppercase tracking-[0.1em]" style={{ color: C.faint }}>{label}</span>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   PHASE NAVIGATION
   ═══════════════════════════════════════════════════ */
function PhaseNavigation({ phaseId }: { phaseId: string }) {
  const currentIndex = getPhaseIndex(phaseId);
  const prevPhase = currentIndex > 0 ? processPhases[currentIndex - 1] : null;
  const nextPhase = currentIndex < processPhases.length - 1 ? processPhases[currentIndex + 1] : null;
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-40px" });

  return (
    <section ref={sectionRef} className="relative z-10 px-6 md:px-20 lg:px-28 pb-24 md:pb-32">
      <motion.div className="flex items-center justify-between gap-4" variants={staggerContainer} initial="hidden" animate={isInView ? "visible" : "hidden"}>
        {prevPhase ? (
          <motion.div variants={staggerItem} className="flex-1">
            <Link href={`/process/${prevPhase.id}`} className="group block">
              <motion.div
                className="relative overflow-hidden rounded-[20px] p-6"
                style={{ background: "rgba(255,253,248,0.4)", backdropFilter: "blur(16px)", border: "1px solid rgba(13,107,69,0.06)", boxShadow: "0 4px 24px rgba(0,0,0,0.02)" }}
                whileHover={{ y: -4, borderColor: "rgba(184,146,62,0.3)" }}
                transition={springHover}
              >
                <div className="relative z-10 flex items-center gap-4">
                  <motion.div
                    className="flex h-12 w-12 items-center justify-center rounded-full border group-hover:bg-[rgba(13,107,69,0.05)] transition-all"
                    style={{ borderColor: "rgba(13,107,69,0.12)", background: "rgba(255,253,248,0.6)" }}
                    whileHover={{ x: -3, borderColor: C.emerald }}
                    transition={springHover}
                  >
                    <ArrowLeft className="h-5 w-5" style={{ color: C.emerald }} />
                  </motion.div>
                  <div className="text-left">
                    <span className="flex items-center text-[11px] font-bold uppercase tracking-[0.12em] mb-0.5" style={{ color: C.faint }}>
                      <ChevronLeft className="h-3 w-3 mr-0.5" />Previous Phase
                    </span>
                    <span className="block text-[18px] font-bold transition-colors group-hover:text-[color:var(--hover-emerald)]" style={{ ...display, color: C.ink }}>
                      {prevPhase.title}
                    </span>
                    <span className="block text-[13px] mt-0.5" style={{ color: C.muted }}>{prevPhase.timeline}</span>
                  </div>
                </div>
              </motion.div>
            </Link>
          </motion.div>
        ) : (
          <div className="flex-1 opacity-30 pointer-events-none">
            <div className="p-6 rounded-[20px]" style={{ background: "rgba(255,253,248,0.25)", border: "1px solid rgba(23,31,26,0.04)" }}>
              <span className="text-[11px] font-bold uppercase tracking-[0.12em]" style={{ color: C.faint }}>First Phase</span>
            </div>
          </div>
        )}

        {nextPhase ? (
          <motion.div variants={staggerItem} className="flex-1">
            <Link href={`/process/${nextPhase.id}`} className="group block">
              <motion.div
                className="relative overflow-hidden rounded-[20px] p-6 text-right"
                style={{ background: "rgba(255,253,248,0.4)", backdropFilter: "blur(16px)", border: "1px solid rgba(13,107,69,0.06)", boxShadow: "0 4px 24px rgba(0,0,0,0.02)" }}
                whileHover={{ y: -4, borderColor: "rgba(184,146,62,0.3)" }}
                transition={springHover}
              >
                <div className="relative z-10 flex items-center justify-end gap-4">
                  <div className="text-right">
                    <span className="flex items-center justify-end text-[11px] font-bold uppercase tracking-[0.12em] mb-0.5" style={{ color: C.faint }}>
                      Next Phase<ChevronRight className="h-3 w-3 ml-0.5" />
                    </span>
                    <span className="block text-[18px] font-bold" style={{ ...display, color: C.ink }}>
                      {nextPhase.title}
                    </span>
                    <span className="block text-[13px] mt-0.5" style={{ color: C.muted }}>{nextPhase.timeline}</span>
                  </div>
                  <motion.div
                    className="flex h-12 w-12 items-center justify-center rounded-full border transition-all"
                    style={{ borderColor: "rgba(13,107,69,0.12)", background: "rgba(255,253,248,0.6)" }}
                    whileHover={{ x: 3, borderColor: C.emerald }}
                    transition={springHover}
                  >
                    <ArrowRight className="h-5 w-5" style={{ color: C.emerald }} />
                  </motion.div>
                </div>
              </motion.div>
            </Link>
          </motion.div>
        ) : (
          <div className="flex-1 opacity-30 pointer-events-none">
            <div className="p-6 rounded-[20px] text-right" style={{ background: "rgba(255,253,248,0.25)", border: "1px solid rgba(23,31,26,0.04)" }}>
              <span className="text-[11px] font-bold uppercase tracking-[0.12em]" style={{ color: C.faint }}>Last Phase</span>
            </div>
          </div>
        )}
      </motion.div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════
   EXPORT
   ═══════════════════════════════════════════════════ */
export default function PhaseDetailClient({ phaseId }: { phaseId: string }) {
  const phase = processPhases.find((p) => p.id === phaseId);

  if (!phase) {
    return (
      <section className="flex min-h-screen items-center justify-center" style={{ background: C.bg }}>
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4" style={{ ...display, color: C.ink }}>Phase Not Found</h1>
          <p className="mb-8 text-lg" style={{ color: C.muted }}>The phase you're looking for doesn't exist.</p>
          <Link href="/" className="inline-flex items-center gap-2 rounded-full px-8 py-4 text-[16px] font-semibold text-white shadow-lg" style={{ background: C.emerald }}>
            <ArrowLeft className="h-5 w-5" />Back to Home
          </Link>
        </div>
      </section>
    );
  }

  return (
    <main className="relative min-h-screen" style={{ background: C.bg, paddingTop: "96px" }}>
      <DetailBackground phaseId={phaseId} />
      <div
        className="sticky top-[96px] z-20"
        style={{ background: `linear-gradient(180deg, ${C.bg} 0%, ${C.bg}F0 80%, transparent 100%)`, backdropFilter: "blur(8px)" }}
      >
        <PhaseProgressBar phaseId={phaseId} />
      </div>
      <div className="relative z-10 px-6 md:px-20 lg:px-28 pt-6 pb-2">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}>
          <Link href="/" className="inline-flex items-center gap-2 text-[15px] font-semibold transition-colors" style={{ color: C.muted }}>
            <ArrowLeft className="h-5 w-5" />Back to Home
          </Link>
        </motion.div>
      </div>
      <PhaseHero phase={phase} phaseId={phaseId} />
      <StatsSection stats={phase.stats} />
      <TechnologiesSection technologies={phase.technologies} />
      <DeliverablesSection deliverables={phase.deliverables} />
      <ProcessTimelineSection phaseId={phaseId} />
      <FAQSection faqs={phase.faqs} />
      <ContactSection phase={phase} />
      <PhaseNavigation phaseId={phaseId} />
    </main>
  );
}
