"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Check, Clock, Shield, Users, Cpu, Sparkles } from "lucide-react";
import { useMousePosition } from "@/hooks/useMousePosition";

/* ─── Timeline data ─── */
const timelineSteps = [
  { num: "01", title: "Discovery", desc: "Understand your vision, goals, and tech landscape" },
  { num: "02", title: "Strategy", desc: "Architecture, roadmap, and resourcing plan" },
  { num: "03", title: "Development", desc: "Agile sprints with continuous delivery" },
  { num: "04", title: "Launch", desc: "Deploy, monitor, and optimize" },
  { num: "05", title: "Growth", desc: "Ongoing evolution, scaling, and AI enhancement" },
];

/* ─── Trust indicators ─── */
const trustItems = [
  { icon: Clock, label: "Response within 24 hrs" },
  { icon: Shield, label: "NDA Available" },
  { icon: Users, label: "Senior Engineers" },
  { icon: Cpu, label: "AI-first Team" },
  { icon: Sparkles, label: "Free Architecture Session" },
  { icon: Check, label: "End-to-End Delivery" },
];

/* ══════════════════════════════════════════════════
   BACKGROUND
   ══════════════════════════════════════════════════ */
function PremiumBackground() {
  return (
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Darker green-teal base — distinct from rest of the page */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#E8F7EF] via-[#D4EDE0] to-[#C5E3D4]" />

      {/* Richer radial glows */}
      <div className="absolute top-[5%] left-[15%] w-[600px] h-[600px] rounded-full bg-[#169B62]/10 blur-[140px]" />
      <div className="absolute bottom-[10%] right-[10%] w-[500px] h-[500px] rounded-full bg-[#22C55E]/8 blur-[120px]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[450px] bg-[#169B62]/6 blur-[100px] rounded-full" />

      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' xmlns='http://www.w3.org/2000/svg'%3E%3Cline x1='0' y1='0' x2='40' y2='0' stroke='%23169B62' strokeWidth='0.5'/%3E%3Cline x1='0' y1='0' x2='0' y2='40' stroke='%23169B62' strokeWidth='0.5'/%3E%3C/svg%3E")`,
          backgroundSize: "40px 40px",
        }}
      />

      {/* Noise */}
      <div
        className="absolute inset-0 opacity-[0.01]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='256' height='256' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E")`,
          backgroundSize: "128px 128px",
        }}
      />

      {/* Floating particles — deterministic via seeded pseudo-random */}
      {Array.from({ length: 20 }, (_, i) => {
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
              opacity: r(0.015 + seed(i * 3 + 5) * 0.02, 4),
            }}
            animate={{
              y: [0, -18, 0],
              x: [0, i % 2 === 0 ? 5 : -5, 0],
            }}
            transition={{
              duration: r(12 + seed(i * 17 + 7) * 10, 3),
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
   MOUSE SPOTLIGHT
   ══════════════════════════════════════════════════ */
function CursorSpotlight({ containerRef }: { containerRef: React.RefObject<HTMLDivElement | null> }) {
  const mousePos = useMousePosition();
  const [pos, setPos] = useState({ x: 50, y: 50 });

  useEffect(() => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setPos({
      x: ((mousePos.x - rect.left) / rect.width) * 100,
      y: ((mousePos.y - rect.top) / rect.height) * 100,
    });
  }, [mousePos, containerRef]);

  return (
    <div
      className="absolute inset-0 pointer-events-none z-[1]"
      style={{ clipPath: "inset(0 round 36px)" }}
    >
      <div
        className="absolute w-[500px] h-[500px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(22,155,98,0.05) 0%, transparent 60%)",
          transform: "translate(-50%, -50%)",
          left: `${pos.x}%`,
          top: `${pos.y}%`,
          transition: "left 0.4s ease-out, top 0.4s ease-out",
        }}
      />
    </div>
  );
}

/* ══════════════════════════════════════════════════
   TIMELINE STEP
   ══════════════════════════════════════════════════ */
function TimelineStep({
  step,
  index,
  isLast,
}: {
  step: typeof timelineSteps[0];
  index: number;
  isLast: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.3 + index * 0.12, duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
      className="relative flex items-start gap-4 group"
    >
      <div className="flex flex-col items-center">
        <div className="w-[34px] h-[34px] rounded-full border border-[var(--color-border)] bg-[var(--color-accent-subtle)] flex items-center justify-center flex-shrink-0 group-hover:bg-[var(--color-accent)]/15 group-hover:border-[var(--color-accent)]/40 transition-all duration-300">
          <span className="text-[11px] font-bold text-[var(--color-accent)]">{step.num}</span>
        </div>
        {!isLast && (
          <div className="w-px flex-1 min-h-[40px] bg-gradient-to-b from-[var(--color-accent)]/20 to-transparent mt-1" />
        )}
      </div>

      <div className="pb-8">
        <h4 className="text-[15px] font-bold text-[var(--ink)] group-hover:text-[var(--color-accent)] transition-colors duration-300">
          {step.title}
        </h4>
        <p className="text-[13px] text-[var(--ink-muted)] mt-0.5 leading-relaxed max-w-[200px]">
          {step.desc}
        </p>
      </div>
    </motion.div>
  );
}

/* ══════════════════════════════════════════════════
   MAIN — Premium Enterprise CTA (Light Theme)
   ══════════════════════════════════════════════════ */
export default function CTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-120px" });

  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    setTilt({
      x: ((e.clientY - cy) / (rect.height / 2)) * -3,
      y: ((e.clientX - cx) / (rect.width / 2)) * 3,
    });
  }, []);

  const [ripples, setRipples] = useState<{ x: number; y: number; id: number }[]>([]);
  const rippleId = useRef(0);

  const handleButtonClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const id = rippleId.current++;
    setRipples((prev) => [...prev, { x, y, id }]);
    setTimeout(() => setRipples((prev) => prev.filter((r) => r.id !== id)), 800);
  }, []);

  return (
    <section
      ref={sectionRef}
      id="cta"
      aria-label="Start Your Project"
      className="relative overflow-hidden py-8"
    >
      <PremiumBackground />

      <div className="relative z-10 max-w-[1300px] mx-auto px-6 md:px-8 lg:px-10">

        {/* ─── Main Premium Container ─── */}
        <motion.div
          ref={containerRef}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => { setIsHovered(false); setTilt({ x: 0, y: 0 }); }}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.19, 1, 0.22, 1] }}
          style={{ perspective: "1000px", transformStyle: "preserve-3d" }}
          className="relative overflow-hidden rounded-[36px]"
        >
          {/* Animated border */}
          <motion.div
            className="absolute inset-0 rounded-[36px] z-[3] pointer-events-none"
            animate={{
              border: isHovered
                ? "1px solid var(--color-border-active)"
                : "1px solid var(--color-border)",
              boxShadow: isHovered
                ? "0 32px 80px -16px var(--color-accent-glow), inset 0 1px 0 rgba(22,155,98,0.06)"
                : "0 8px 30px rgba(0,0,0,0.06), 0 2px 8px rgba(0,0,0,0.03), inset 0 1px 0 rgba(255,255,255,0.6)",
            }}
            transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
          />

          {/* Glass BG */}
          <motion.div
            className="absolute inset-0 rounded-[36px] z-0"
            animate={{
              background: isHovered
                ? "linear-gradient(135deg, rgba(22,155,98,0.03) 0%, #ffffff 20%, #ffffff 80%, rgba(22,155,98,0.02) 100%)"
                : "#FFFFFF",
            }}
            transition={{ duration: 0.6 }}
          />

          {/* 3D tilt transform */}
          <motion.div
            className="relative z-[2]"
            animate={{
              rotateX: tilt.x,
              rotateY: tilt.y,
            }}
            transition={{ type: "spring", stiffness: 150, damping: 20 }}
          >
            {/* Cursor spotlight */}
            <CursorSpotlight containerRef={containerRef} />

            {/* Glass highlight on hover */}
            <motion.div
              className="absolute top-0 left-0 right-0 h-px z-10 pointer-events-none"
              animate={{
                opacity: isHovered ? 1 : 0,
                background: "linear-gradient(90deg, transparent, var(--color-accent), transparent)",
              }}
              transition={{ duration: 0.5 }}
            />

            {/* Content grid */}
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-0 p-8 md:p-12 lg:p-14 xl:p-16">
              {/* ─── Left Column: CTA Content ─── */}
              <div className="flex flex-col justify-center">
                {/* Badge */}
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.2, duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
                  className="mb-8"
                >
                  <span className="badge-premium text-[11px] tracking-[0.12em] uppercase font-semibold inline-flex">
                    <span className="w-[5px] h-[5px] rounded-full bg-[var(--color-accent)] animate-pulse mr-2" />
                    Let's Build Together
                  </span>
                </motion.div>

                {/* Heading */}
                <motion.h2
                  initial={{ opacity: 0, y: 24 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.25, duration: 0.7, ease: [0.19, 1, 0.22, 1] }}
                  className="text-[clamp(38px,5vw,76px)] font-bold leading-[1.04] tracking-[-0.03em] text-[var(--ink)]"
                >
                  Ready to Build{" "}
                  <span className="text-gradient-accent">Something Extraordinary?</span>
                </motion.h2>

                {/* Description */}
                <motion.p
                  initial={{ opacity: 0, y: 16 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.35, duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
                  className="mt-5 text-[17px] md:text-[20px] lg:text-[22px] leading-relaxed text-[var(--ink-dim)] max-w-lg"
                >
                  Let's discuss how RiverLoom can engineer your next breakthrough product. A quick call — no pitch, just possibilities.
                </motion.p>

                {/* CTA Button */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.45, duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
                  className="mt-10"
                >
                  <Link
                    href="/contact"
                    onClick={handleButtonClick}
                    className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full text-white font-semibold transition-all duration-500"
                    style={{
                      height: "60px",
                      padding: "0 36px",
                      fontSize: "18px",
                      background: "linear-gradient(135deg, #169B62, #1FC77E)",
                      boxShadow: "0 8px 32px var(--color-accent-glow)",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.boxShadow = "0 12px 48px rgba(22,155,98,0.35), 0 0 0 1px rgba(22,155,98,0.2)";
                      e.currentTarget.style.transform = "translateY(-2px)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.boxShadow = "0 8px 32px var(--color-accent-glow)";
                      e.currentTarget.style.transform = "translateY(0)";
                    }}
                  >
                    {/* Ripple container */}
                    <span className="absolute inset-0 overflow-hidden rounded-full pointer-events-none">
                      {ripples.map((r) => (
                        <span
                          key={r.id}
                          className="absolute w-[20px] h-[20px] rounded-full bg-white/20"
                          style={{
                            left: r.x - 10,
                            top: r.y - 10,
                            animation: "ripple 0.8s ease-out forwards",
                          }}
                        />
                      ))}
                    </span>

                    <span className="relative z-10">Start Your Project</span>
                    <ArrowRight className="relative z-10 w-[20px] h-[20px] group-hover:translate-x-1.5 transition-transform duration-300" />
                  </Link>
                </motion.div>

                {/* Trust chips */}
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.55, duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
                  className="mt-8 flex flex-wrap gap-3"
                >
                  {trustItems.map((item) => (
                    <span
                      key={item.label}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[var(--color-accent-subtle)] border border-[var(--color-accent)]/10 text-[12px] font-medium text-[var(--ink-muted)] hover:bg-[var(--color-accent)]/10 hover:border-[var(--color-accent)]/25 hover:text-[var(--color-accent)] transition-all duration-300"
                    >
                      <item.icon className="w-3 h-3" />
                      {item.label}
                    </span>
                  ))}
                </motion.div>
              </div>

              {/* ─── Right Column: Timeline ─── */}
              <div className="lg:pl-12 lg:border-l border-[var(--color-border)] flex flex-col justify-center">
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.3, duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
                  className="mb-6"
                >
                  <span className="text-[11px] font-semibold text-[var(--color-accent)] tracking-[0.15em] uppercase">
                    Project Timeline
                  </span>
                </motion.div>

                <div className="space-y-0">
                  {timelineSteps.map((step, i) => (
                    <TimelineStep key={step.num} step={step} index={i} isLast={i === timelineSteps.length - 1} />
                  ))}
                </div>

                {/* Result badge */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.8, duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
                  className="mt-2 ml-[50px]"
                >
                  <span className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[var(--color-accent-subtle)] border border-[var(--color-accent)]/15">
                    <Sparkles className="w-4 h-4 text-[var(--color-accent)]" />
                    <span className="text-[13px] font-semibold text-[var(--color-accent)]">Production Ready</span>
                  </span>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* ─── Bottom Trust Bar ─── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
          className="mt-12 text-center"
        >
          <span className="inline-flex items-center gap-2 text-[13px] text-[var(--ink-muted)]">
            <span className="w-[6px] h-[6px] rounded-full bg-[var(--color-accent)] animate-pulse" />
            Usually responds within 24 hours · No commitment required
          </span>
        </motion.div>
      </div>

      <style jsx>{`
        @keyframes ripple {
          0% { transform: scale(0); opacity: 0.5; }
          100% { transform: scale(20); opacity: 0; }
        }
      `}</style>
    </section>
  );
}
