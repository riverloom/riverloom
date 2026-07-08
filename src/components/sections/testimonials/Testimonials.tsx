"use client";

import { useState, useCallback, useEffect, useRef, type JSX } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { ChevronLeft, ChevronRight, Star, Play } from "lucide-react";
import { testimonials } from "@/data/testimonials";
import { cn } from "@/lib/utils";

/* ─── Company Logo SVGs (monochrome) ─── */
function CompanyLogo({ company, color }: { company: string; color: string }) {
  const logos: Record<string, JSX.Element> = {
    "Nexus Financial": (
      <svg viewBox="0 0 120 24" className="w-[100px] h-5" fill={color}>
        <path d="M6 20V4h3l5 10V4h3v16h-3L9 10v10H6z" opacity="0.7" />
        <rect x="22" y="4" width="2" height="16" opacity="0.5" />
        <path d="M30 4v16h-3V4h3z" opacity="0.7" />
        <path d="M36 4h6l4 8h-4l-3-6V4zm6 16h-4l-2-4h2l4-4v8z" opacity="0.5" />
        <path d="M48 4h4l3 16h-3l-.8-4h-3.4l-.8 4h-3L48 4zm2.5 4.5L49 14h3l-1.5-5.5z" opacity="0.7" />
      </svg>
    ),
    "Pulse Health": (
      <svg viewBox="0 0 120 24" className="w-[100px] h-5" fill={color}>
        <path d="M4 14h4l3-8 3 10 2-6h4l2-4h4" stroke={color} strokeWidth="2" fill="none" opacity="0.7" />
        <circle cx="108" cy="12" r="6" fill={color} opacity="0.2" />
        <circle cx="108" cy="12" r="3" fill={color} opacity="0.4" />
      </svg>
    ),
    "Velora": (
      <svg viewBox="0 0 120 24" className="w-[80px] h-5" fill={color}>
        <path d="M4 20V4h3l5 8V4h3v16h-3L7 12v8H4z" opacity="0.7" />
        <path d="M24 4l4 16h-3l-1-5h-4l-1 5h-3L20 4h4zm-1 8l-1-4-1 4h2z" opacity="0.5" />
        <path d="M34 4v12h6v4h-9V4h3z" opacity="0.7" />
      </svg>
    ),
    "Quantum Corp": (
      <svg viewBox="0 0 120 24" className="w-[100px] h-5" fill={color}>
        <circle cx="12" cy="12" r="8" fill="none" stroke={color} strokeWidth="2" opacity="0.7" />
        <circle cx="12" cy="12" r="4" fill={color} opacity="0.3" />
        <line x1="24" y1="8" x2="24" y2="16" stroke={color} strokeWidth="2" opacity="0.5" />
        <line x1="28" y1="12" x2="36" y2="12" stroke={color} strokeWidth="2" opacity="0.5" />
        <rect x="40" y="6" width="2" height="12" opacity="0.7" />
        <path d="M46 6h4l2 8 2-8h4v12h-3v-7l-2 7h-2l-2-7v7h-3V6z" opacity="0.5" />
      </svg>
    ),
    "Aether Technologies": (
      <svg viewBox="0 0 120 24" className="w-[110px] h-5" fill={color}>
        <path d="M6 4h4l6 16h-4l-1-3H7l-1 3H2L6 4zm1 9h2L8 7l-1 6z" opacity="0.7" />
        <path d="M22 4v12h4v4h-7V4h3z" opacity="0.5" />
        <path d="M30 4h4l3 16h-3l-.8-4h-3.4l-.8 4h-3L30 4zm2.5 4.5L31 14h3l-1.5-5.5z" opacity="0.7" />
      </svg>
    ),
  };

  return (
    <div className="flex items-center justify-center h-6">
      {logos[company] || (
        <span className="text-xs font-semibold opacity-40 tracking-wide">
          {company}
        </span>
      )}
    </div>
  );
}

/* ─── Gradient Avatar ─── */
function GradientAvatar({ name, size = 72 }: { name: string; size?: number }) {
  const hue = name.split("").reduce((acc, c) => acc + c.charCodeAt(0), 0) % 360;
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2);

  return (
    <div
      className="rounded-full flex items-center justify-center text-white font-bold select-none"
      style={{
        width: size,
        height: size,
        background: `linear-gradient(135deg, hsl(${hue}, 60%, 55%), hsl(${(hue + 60) % 360}, 50%, 45%))`,
        fontSize: size * 0.38,
      }}
    >
      {initials}
    </div>
  );
}

/* ─── Rating Stars ─── */
function Rating() {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          className="w-[14px] h-[14px]"
          fill="#16A34A"
          color="#16A34A"
          strokeWidth={1.5}
        />
      ))}
    </div>
  );
}

/* ══════════════════════════════════════════════════
   3D Tilt Hook
   ══════════════════════════════════════════════════ */
function use3DTilt() {
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const relX = (e.clientX - centerX) / (rect.width / 2);
    const relY = (e.clientY - centerY) / (rect.height / 2);
    setTilt({ x: relY * -4, y: relX * 4 });
  }, []);

  const handleMouseEnter = useCallback(() => setIsHovered(true), []);
  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0 });
  }, []);

  return { ref, tilt, isHovered, handleMouseMove, handleMouseEnter, handleMouseLeave };
}

/* ══════════════════════════════════════════════════
   BACKGROUND DECORATIONS
   ══════════════════════════════════════════════════ */
function BackgroundDecorations() {
  return (
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Radial gradients */}
      <div className="absolute top-[5%] left-[10%] w-[500px] h-[500px] rounded-full bg-[#169B62]/5 blur-[120px]" />
      <div className="absolute bottom-[10%] right-[5%] w-[600px] h-[600px] rounded-full bg-[#169B62]/4 blur-[130px]" />
      <div className="absolute top-[40%] right-[20%] w-[350px] h-[350px] rounded-full bg-[#2563EB]/3 blur-[100px]" />

      {/* Grid */}
      <div
        className="absolute inset-0 opacity-[0.01]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' xmlns='http://www.w3.org/2000/svg'%3E%3Cline x1='0' y1='0' x2='40' y2='0' stroke='%23169B62' strokeWidth='0.5'/%3E%3Cline x1='0' y1='0' x2='0' y2='40' stroke='%23169B62' strokeWidth='0.5'/%3E%3C/svg%3E")`,
          backgroundSize: "40px 40px",
        }}
      />

      {/* Noise */}
      <div
        className="absolute inset-0 opacity-[0.01]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E")`,
          backgroundSize: "100px 100px",
        }}
      />

      {/* Floating particles — deterministic via seeded pseudo-random */}
      {Array.from({ length: 15 }, (_, i) => {
        const seed = (n: number) => {
          const x = Math.sin(n * 9301 + 49297) * 49297;
          return x - Math.floor(x);
        };
        const r = (v: number, d: number) => Math.round(v * 10 ** d) / 10 ** d;
        return (
          <motion.div
            key={i}
            className="absolute rounded-full bg-[#169B62]"
            style={{
              width: r(seed(i * 7 + 1) * 2 + 1, 3),
              height: r(seed(i * 13 + 3) * 2 + 1, 3),
              left: `${r(seed(i * 5 + 9) * 100, 4)}%`,
              top: `${r(seed(i * 11 + 2) * 100, 4)}%`,
              opacity: r(0.02 + seed(i * 3 + 5) * 0.02, 4),
            }}
            animate={{
              y: [0, -15, 0],
              x: [0, i % 2 === 0 ? 5 : -5, 0],
            }}
            transition={{
              duration: r(10 + seed(i * 17 + 7) * 10, 3),
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        );
      })}
    </div>
  );
}

/* ══════════════════════════════════════════════════
   AUTO PROGRESS BAR
   ══════════════════════════════════════════════════ */
function AutoProgressBar({ active }: { active: boolean }) {
  return (
    <div className="h-[3px] bg-[var(--color-border)] rounded-full overflow-hidden flex-1">
      <motion.div
        className="h-full rounded-full bg-[var(--color-accent)]"
        initial={{ width: "0%" }}
        animate={active ? { width: "100%" } : { width: "0%" }}
        transition={{ duration: 6, ease: "linear" }}
        style={{ transformOrigin: "left" }}
      />
    </div>
  );
}

/* ══════════════════════════════════════════════════
   MAIN — Premium Testimonials Section
   ══════════════════════════════════════════════════ */
export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);
  const [autoAdvance, setAutoAdvance] = useState(true);
  const sectionRef = useRef<HTMLElement>(null);
  const { ref: tiltRef, tilt, isHovered, handleMouseMove, handleMouseEnter, handleMouseLeave } = use3DTilt();
  const [sectionInView, setSectionInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSectionInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const goTo = useCallback(
    (index: number) => {
      setDirection(index > current ? 1 : -1);
      setCurrent(index);
      setAutoAdvance(false);
      setTimeout(() => setAutoAdvance(true), 8000);
    },
    [current]
  );

  const next = useCallback(() => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % testimonials.length);
  }, []);

  const prev = useCallback(() => {
    setDirection(-1);
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, []);

  useEffect(() => {
    if (!autoAdvance) return;
    const interval = setInterval(next, 6000);
    return () => clearInterval(interval);
  }, [autoAdvance, next]);

  const t = testimonials[current];
  const prevTestimonial = testimonials[(current - 1 + testimonials.length) % testimonials.length];
  const nextTestimonial = testimonials[(current + 1) % testimonials.length];

  /* ─── Slide variants ─── */
  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 120 : -120,
      opacity: 0,
      filter: "blur(6px)",
      scale: 0.97,
    }),
    center: {
      x: 0,
      opacity: 1,
      filter: "blur(0px)",
      scale: 1,
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -120 : 120,
      opacity: 0,
      filter: "blur(6px)",
      scale: 0.97,
    }),
  };

  /* ─── Staggered item animations ─── */
  const easeSmooth = [0.19, 1, 0.22, 1] as const;
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: 0.6 + i * 0.12, duration: 0.6, ease: easeSmooth },
    }),
  };

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      aria-label="Client Testimonials"
      className="relative overflow-hidden bg-[var(--bg)] py-16 md:py-24 lg:py-32"
    >
      <BackgroundDecorations />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-8 lg:px-10">
        {/* ─── Section Header ─── */}
        <div className="text-center mb-16 md:mb-20">
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            animate={sectionInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
            className="badge-premium text-[13px] md:text-[14px] tracking-[0.12em] uppercase font-semibold inline-flex mb-6"
          >
            <span
              className="w-[5px] h-[5px] rounded-full bg-[var(--color-accent)] mr-2"
              style={{ boxShadow: "0 0 6px 1px rgba(22,155,98,0.5)" }}
            />
            Trusted by Leaders
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 28 }}
            animate={sectionInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.7, ease: [0.19, 1, 0.22, 1] }}
            className="text-[clamp(42px,5.5vw,72px)] font-bold leading-[1.04] tracking-[-0.03em] text-[var(--ink)]"
          >
            Trusted by{" "}
            <span className="text-gradient-accent">Industry Leaders.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={sectionInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
            className="mt-5 text-[18px] md:text-[22px] leading-relaxed text-[var(--ink-dim)] max-w-xl mx-auto"
          >
            Real partnerships. Real results.
          </motion.p>
        </div>

        {/* ─── Carousel with adjacent previews ─── */}
        <div className="relative flex items-center justify-center gap-4 md:gap-6 lg:gap-8">
          {/* Previous card (side peek) */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={sectionInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.5, duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
            className="hidden lg:block flex-shrink-0 w-[240px] xl:w-[280px] pointer-events-none"
          >
            <div className="rounded-[28px] border border-[var(--color-border)] bg-white/30 backdrop-blur-[2px] p-8 opacity-30 scale-90 select-none">
              <p className="text-sm text-[var(--ink-muted)] line-clamp-4 leading-relaxed">
                &ldquo;{prevTestimonial.quote}&rdquo;
              </p>
              <div className="mt-5 flex items-center gap-3">
                <GradientAvatar name={prevTestimonial.name} size={36} />
                <div>
                  <div className="text-xs font-semibold text-[var(--ink)]">{prevTestimonial.name}</div>
                  <div className="text-[10px] text-[var(--ink-muted)]">{prevTestimonial.company}</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Main card */}
          <motion.div
            ref={tiltRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            initial={{ opacity: 0, y: 40 }}
            animate={sectionInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.7, ease: [0.19, 1, 0.22, 1] }}
            className="relative w-full max-w-[1100px] lg:max-w-[1200px] xl:max-w-[1300px]"
            style={{ perspective: "1000px" }}
          >
            <motion.div
              className="relative overflow-hidden rounded-[32px] cursor-default"
              style={{
                transformStyle: "preserve-3d",
                border: "1px solid transparent",
                backgroundClip: "padding-box",
              }}
              animate={{
                rotateX: tilt.x,
                rotateY: tilt.y,
                y: isHovered ? -8 : 0,
                scale: isHovered ? 1.008 : 1,
                boxShadow: isHovered
                  ? "0 40px 100px -20px rgba(22,155,98,0.2), 0 0 0 1px rgba(22,155,98,0.15), 0 4px 16px rgba(0,0,0,0.04)"
                  : "0 4px 16px rgba(0,0,0,0.03), 0 12px 40px -12px rgba(0,0,0,0.06), 0 0 0 1px var(--color-border)",
                borderColor: isHovered ? "rgba(22,155,98,0.2)" : "var(--color-border)",
                background: isHovered
                  ? "linear-gradient(135deg, #ffffff 0%, #fafdf8 50%, #ffffff 100%)"
                  : "#FFFFFF",
              }}
              transition={{
                duration: 0.5,
                ease: [0.19, 1, 0.22, 1],
                rotateX: { type: "spring", stiffness: 200, damping: 25 },
                rotateY: { type: "spring", stiffness: 200, damping: 25 },
              }}
            >
              {/* Glass shimmer */}
              <motion.div
                className="absolute inset-0 z-[2] pointer-events-none rounded-[32px]"
                animate={{
                  background: isHovered
                    ? "linear-gradient(135deg, rgba(22,155,98,0.03) 0%, transparent 40%, transparent 60%, rgba(22,155,98,0.02) 100%)"
                    : "transparent",
                }}
                transition={{ duration: 0.5 }}
              />

              {/* Top accent glow */}
              <motion.div
                className="absolute top-0 left-0 right-0 h-[3px] z-[3] rounded-t-[32px]"
                animate={{
                  opacity: isHovered ? 1 : 0.2,
                  background: "linear-gradient(90deg, #16A34A, #22C55E, #16A34A)",
                  boxShadow: isHovered
                    ? "0 0 20px rgba(22,155,98,0.4)"
                    : "none",
                }}
                transition={{ duration: 0.5 }}
              />

              {/* Large decorative quote mark */}
              <div className="absolute top-4 left-6 md:top-6 md:left-8 text-[#169B62] select-none pointer-events-none z-0">
                <svg
                  viewBox="0 0 80 80"
                  className="w-[120px] h-[120px] md:w-[160px] md:h-[160px]"
                  fill="#169B62"
                  opacity="0.06"
                >
                  <path d="M20 15v28c0 14-8 22-18 22v-6c8 0 12-6 12-16h-6V15h12zm28 0v28c0 14-8 22-18 22v-6c8 0 12-6 12-16h-6V15h12z" />
                </svg>
              </div>

              {/* Mouse spotlight */}
              <motion.div
                className="absolute inset-0 z-[1] pointer-events-none rounded-[32px]"
                animate={{
                  background: isHovered
                    ? `radial-gradient(600px circle at ${tilt.y ? 50 + tilt.y * 5 : 50}% ${tilt.x ? 50 + tilt.x * 5 : 50}%, rgba(22,155,98,0.04), transparent 60%)`
                    : "transparent",
                }}
                transition={{ duration: 0.4 }}
              />

              {/* ─── Card Content ─── */}
              <div className="relative z-10 p-8 md:p-12 lg:p-14 xl:p-16" style={{ minHeight: "420px" }}>
                <AnimatePresence mode="wait" custom={direction}>
                  <motion.div
                    key={current}
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
                  >
                    {/* Rating */}
                    <motion.div
                      custom={0}
                      variants={itemVariants}
                      initial="hidden"
                      animate="visible"
                      className="mb-6"
                    >
                      <Rating />
                    </motion.div>

                    {/* Quote */}
                    <motion.blockquote
                      custom={1}
                      variants={itemVariants}
                      initial="hidden"
                      animate="visible"
                      className="text-[clamp(24px,3vw,42px)] md:text-[clamp(28px,3.2vw,46px)] leading-[1.25] font-medium text-[var(--ink)] tracking-[-0.01em] mb-10"
                    >
                      &ldquo;{t.quote}&rdquo;
                    </motion.blockquote>

                    {/* Author row */}
                    <motion.div
                      custom={2}
                      variants={itemVariants}
                      initial="hidden"
                      animate="visible"
                      className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6"
                    >
                      <div className="flex items-center gap-5">
                        <GradientAvatar name={t.name} size={72} />
                        <div>
                          <div className="text-[20px] md:text-[24px] font-bold text-[var(--ink)] leading-tight">
                            {t.name}
                          </div>
                          <div className="text-[15px] md:text-[18px] text-[var(--ink-dim)] leading-snug mt-1">
                            {t.role}, {t.company}
                          </div>
                          {/* Company logo */}
                          <div className="mt-2 opacity-40">
                            <CompanyLogo company={t.company} color="#6B6B6B" />
                          </div>
                        </div>
                      </div>

                      {/* Video button */}
                      {t.videoAvailable && (
                        <motion.button
                          custom={3}
                          variants={itemVariants}
                          initial="hidden"
                          animate="visible"
                          className="group flex items-center gap-3 px-5 py-3 rounded-xl border border-[var(--color-border)] bg-white/50 hover:bg-[#E8F7EF] hover:border-[#169B62]/30 transition-all duration-300 flex-shrink-0"
                        >
                          <div className="w-10 h-10 rounded-full bg-[#E8F7EF] flex items-center justify-center group-hover:bg-[#169B62]/20 transition-colors group-hover:scale-105">
                            <Play className="w-4 h-4 text-[#169B62] ml-0.5" />
                          </div>
                          <span className="text-sm font-medium text-[var(--ink-dim)] group-hover:text-[#169B62] transition-colors">
                            Watch Video
                          </span>
                        </motion.button>
                      )}
                    </motion.div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </motion.div>
          </motion.div>

          {/* Next card (side peek) */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={sectionInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.5, duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
            className="hidden lg:block flex-shrink-0 w-[240px] xl:w-[280px] pointer-events-none"
          >
            <div className="rounded-[28px] border border-[var(--color-border)] bg-white/30 backdrop-blur-[2px] p-8 opacity-30 scale-90 select-none">
              <p className="text-sm text-[var(--ink-muted)] line-clamp-4 leading-relaxed">
                &ldquo;{nextTestimonial.quote}&rdquo;
              </p>
              <div className="mt-5 flex items-center gap-3">
                <GradientAvatar name={nextTestimonial.name} size={36} />
                <div>
                  <div className="text-xs font-semibold text-[var(--ink)]">{nextTestimonial.name}</div>
                  <div className="text-[10px] text-[var(--ink-muted)]">{nextTestimonial.company}</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* ─── Navigation ─── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={sectionInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.7, duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
          className="flex items-center justify-center gap-5 mt-10 md:mt-12"
        >
          {/* Prev button */}
          <button
            onClick={prev}
            className="w-[48px] h-[48px] rounded-full border border-[var(--color-border)] bg-white/60 backdrop-blur-sm flex items-center justify-center hover:bg-white hover:border-[#169B62]/30 hover:shadow-lg hover:shadow-[#169B62]/10 transition-all duration-300 group flex-shrink-0"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-[18px] h-[18px] text-[var(--ink-dim)] group-hover:text-[#169B62] transition-colors group-hover:-translate-x-0.5 transition-transform" />
          </button>

          {/* Progress indicators */}
          <div className="flex items-center gap-2.5">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className="relative h-1.5 rounded-full overflow-hidden transition-all duration-500"
                style={{
                  width: i === current ? 48 : 16,
                  background: i === current ? "var(--color-border)" : "var(--color-border)",
                }}
                aria-label={`Go to testimonial ${i + 1}`}
              >
                {i === current && (
                  <motion.div
                    className="absolute inset-y-0 left-0 rounded-full bg-[#169B62]"
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 6, ease: "linear" }}
                    onAnimationComplete={() => {}}
                  />
                )}
                {i < current && (
                  <div className="absolute inset-0 bg-[#169B62] rounded-full" />
                )}
              </button>
            ))}
          </div>

          {/* Next button */}
          <button
            onClick={next}
            className="w-[48px] h-[48px] rounded-full border border-[var(--color-border)] bg-white/60 backdrop-blur-sm flex items-center justify-center hover:bg-white hover:border-[#169B62]/30 hover:shadow-lg hover:shadow-[#169B62]/10 transition-all duration-300 group flex-shrink-0"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-[18px] h-[18px] text-[var(--ink-dim)] group-hover:text-[#169B62] transition-colors group-hover:translate-x-0.5 transition-transform" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
