"use client";

import { useState, useRef, useMemo, useCallback, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { projects } from "@/data/projects";
import { products } from "@/data/products";
import { cn } from "@/lib/utils";

/* ─── ──────────────────────────────────────────────────
   Utility: trigger callback once when all deps are truthy
   ────────────────────────────────────────────────── */
function useEffectOnce(cb: () => void, deps: unknown[]) {
  const called = useRef(false);
  useEffect(() => {
    if (!called.current && deps.every(Boolean)) {
      called.current = true;
      cb();
    }
  }, deps);
}

/* ─── ──────────────────────────────────────────────────
   Project data with metadata
   ────────────────────────────────────────────────── */
const PROJECT_DATA = projects.slice(0, 6).map((p) => ({
  ...p,
  watermark:
    p.id === "chandriva-club"
      ? "LUXURY"
      : p.id === "malwarex"
        ? "SECURITY"
        : p.id === "wordique"
          ? "LEARNING"
          : p.id === "visilearn"
            ? "AI"
            : p.id === "buildhub"
              ? "HOSPITALITY"
              : "EDUCATION",
  subtitle:
    p.id === "buildhub"
      ? "Hotel CRM Platform"
      : p.id === "universe"
        ? "College ERP Platform"
        : undefined,
  primaryCta: "Explore Project",
}));

/* ─── ──────────────────────────────────────────────────
   Staggered heading word reveal
   ────────────────────────────────────────────────── */
function StaggeredHeading({ isInView }: { isInView: boolean }) {
  const line1 = "Products Built For".split(" ");
  const line2 = "Real Businesses.".split(" ");

  return (
    <h2
      className="font-space font-black tracking-[-0.05em] leading-[0.95] text-[#1C1C1C]"
      style={{ fontSize: "clamp(44px, 6.5vw, 84px)" }}
    >
      <span className="block">
        {line1.map((word, i) => (
          <motion.span
            key={`l1-${i}`}
            initial={{ opacity: 0, y: 40, rotateX: 12 }}
            animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
            transition={{
              duration: 0.7,
              delay: 0.06 * i,
              ease: [0.19, 1, 0.22, 1],
            }}
            className="inline-block mr-[0.2em]"
            style={{ textShadow: "0 2px 20px rgba(0,0,0,0.04)" }}
          >
            {word}
          </motion.span>
        ))}
      </span>
      <span className="block mt-1">
        {line2.map((word, i) => {
          const isHighlight = word === "Businesses.";
          return (
            <motion.span
              key={`l2-${i}`}
              initial={{ opacity: 0, y: 40, rotateX: 12 }}
              animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
              transition={{
                duration: 0.7,
                delay: 0.06 * (line1.length + i),
                ease: [0.19, 1, 0.22, 1],
              }}
              className={cn(
                "inline-block mr-[0.2em]",
                isHighlight &&
                  "bg-gradient-to-r from-[#169B62] to-[#1FC77E] bg-clip-text text-transparent"
              )}
            >
              {word}
            </motion.span>
          );
        })}
      </span>
    </h2>
  );
}

/* ─── ──────────────────────────────────────────────────
   Floating animation for cards
   ────────────────────────────────────────────────── */
/* ─── ──────────────────────────────────────────────────
   Floating + pulse variants
   ────────────────────────────────────────────────── */
function getFloatingY(i: number) {
  return [0, -6, 0];
}
function getFloatingTransition(i: number) {
  return {
    duration: 5 + i * 0.4,
    repeat: Infinity,
    ease: [0.43, 0.13, 0.23, 0.96] as const,
    delay: i * 0.6,
  };
}

const glowPulseAnimate = {
  opacity: [0.06, 0.12, 0.06] as number[],
  scale: [1, 1.03, 1] as number[],
  transition: {
    duration: 4,
    repeat: Infinity,
    ease: [0.43, 0.13, 0.23, 0.96] as [number, number, number, number],
  },
};

/* ─── ──────────────────────────────────────────────────
   Shimmer for accent line
   ────────────────────────────────────────────────── */
function ShimmerAccent({ color }: { color: string }) {
  return (
    <div className="absolute top-0 left-0 right-0 h-[3px] z-10 overflow-hidden">
      <div
        className="absolute inset-0"
        style={{ background: color }}
      />
      <motion.div
        className="absolute top-0 bottom-0 w-[80px]"
        style={{
          background: `linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent)`,
          filter: "blur(4px)",
        }}
        animate={{
          left: ["-20%", "120%"],
        }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />
    </div>
  );
}

/* ─── ──────────────────────────────────────────────────
   Panel — individual premium product card
   ────────────────────────────────────────────────── */
function Panel({
  project,
  index,
  isHovered,
  isExpanded,
  onHover,
  onLeave,
}: {
  project: (typeof PROJECT_DATA)[number];
  index: number;
  isHovered: boolean;
  isExpanded: boolean;
  onHover: () => void;
  onLeave: () => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const inView = useInView(cardRef, { once: true, margin: "-50px" });

  // Use external URL from products data when available
  const externalUrl = useMemo(() => {
    const p = products.find((prod) => prod.slug === project.slug);
    if (!p) return null;
    const link = p.links.find((l) => l.url && l.url !== "#");
    return link?.url ?? null;
  }, [project.slug]);

  const {
    title,
    subtitle,
    category,
    description,
    tags,
    accentColor,
    watermark,
    primaryCta,
    logo,
  } = project;

  const handleMouse = useCallback(
    (e: React.MouseEvent) => {
      if (!cardRef.current || !isExpanded) return;
      const rect = cardRef.current.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) / rect.width;
      const dy = (e.clientY - cy) / rect.height;
      setTilt({ x: dx * 3, y: dy * -3 });
    },
    [isExpanded]
  );

  const handleLeave = useCallback(() => {
    setTilt({ x: 0, y: 0 });
    onLeave();
  }, [onLeave]);

  useEffectOnce(() => {
    if (inView) setIsVisible(true);
  }, [inView]);

  return (
    <div
      className="shrink-0"
      style={{
        flex: "none",
        width: isExpanded ? 380 : 280,
        minWidth: isExpanded ? 380 : 280,
        transition: "width 0.5s cubic-bezier(0.19,1,0.22,1), min-width 0.5s cubic-bezier(0.19,1,0.22,1)",
        animation: `float 6s cubic-bezier(0.65,0,0.35,1) ${index * 0.6}s infinite`,
        animationPlayState: isExpanded ? "paused" : "running",
      }}
    >
    <motion.div
      ref={cardRef}
      onMouseEnter={onHover}
      onMouseLeave={handleLeave}
      onMouseMove={handleMouse}
      animate={{
        boxShadow: isExpanded
          ? "0 30px 80px rgba(0,0,0,0.08), 0 12px 32px rgba(0,0,0,0.04), 0 4px 12px rgba(0,0,0,0.02)"
          : "0 8px 28px rgba(0,0,0,0.03), 0 2px 8px rgba(0,0,0,0.02)",
        borderColor: isExpanded
          ? "rgba(22,155,98,0.15)"
          : "rgba(231,226,216,0.6)",
        transition: {
          duration: 0.5,
          ease: [0.19, 1, 0.22, 1],
        },
      }}
      className={cn(
        "relative rounded-[34px] border bg-white overflow-hidden cursor-pointer select-none",
        "h-[580px]"
      )}
      style={{
        perspective: 1200,
        willChange: "transform, box-shadow, border-color",
      }}
    >
      {/* ─── Shimmer accent line ─── */}
      <ShimmerAccent color={accentColor} />

      {/* ─── Soft inner gradient ─── */}
      <div
        className="absolute inset-0 pointer-events-none rounded-[34px]"
        style={{
          background: isExpanded
            ? `linear-gradient(180deg, ${accentColor}04 0%, transparent 40%, ${accentColor}02 100%)`
            : `linear-gradient(180deg, ${accentColor}02 0%, transparent 50%)`,
          transition: "background 0.6s ease",
        }}
      />

      {/* ─── Paper texture ─── */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.01]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E")`,
          backgroundSize: "128px 128px",
        }}
      />

      {/* ─── Radial glow behind card ─── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 80% 55% at 50% 38%, ${accentColor}06 0%, transparent 70%)`,
        }}
      />

      {/* ─── Ambient logo glow ─── */}
      <motion.div
        className="absolute pointer-events-none rounded-full"
        style={{
          width: 240,
          height: 240,
          background: accentColor,
          filter: `blur(100px)`,
          opacity: isExpanded ? 0.2 : 0.08,
          top: "38%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          transition: "opacity 0.6s ease",
          willChange: "opacity",
        }}
        animate={glowPulseAnimate}
      />

      {/* ─── Extra glow ring on hover ─── */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.85 }}
            transition={{ duration: 0.5 }}
            className="absolute pointer-events-none rounded-full"
            style={{
              width: 320,
              height: 320,
              background: `radial-gradient(circle, ${accentColor}0A 0%, transparent 70%)`,
              top: "38%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          />
        )}
      </AnimatePresence>

      {/* ─── Animated light reflection on hover ─── */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, left: "-30%" }}
            animate={{ opacity: 1, left: "130%" }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
            className="absolute top-0 bottom-0 w-[60%] pointer-events-none z-[1]"
            style={{
              background: `linear-gradient(90deg, transparent, rgba(255,255,255,0.06) 30%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0.06) 70%, transparent)`,
              transform: "skewX(-15deg)",
            }}
          />
        )}
      </AnimatePresence>

      {/* ─── Category watermark — vertical text on left edge ─── */}
      <div className="absolute inset-y-0 left-0 pointer-events-none select-none z-0 flex items-center overflow-hidden">
        <motion.span
          className="font-black leading-none"
          animate={{
            opacity: isExpanded ? 0.08 : 0.05,
          }}
          transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
          style={{
            WebkitTextStroke: `1px ${accentColor}`,
            WebkitTextFillColor: "transparent",
            color: "transparent",
            fontSize: "clamp(48px, 4vw, 72px)",
            letterSpacing: "0.25em",
            fontFamily:
              "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
            writingMode: "vertical-rl",
            textOrientation: "mixed",
            transform: "rotate(180deg)",
            lineHeight: 1,
            paddingLeft: "12px",
            paddingRight: "12px",
            userSelect: "none",
          }}
        >
          {category}
        </motion.span>
      </div>

      {/* ─── Content ─── */}
      <motion.div
        className="relative z-[2] p-8 md:p-10 flex flex-col h-full"
        style={{
          transformStyle: "preserve-3d",
        }}
      >
        {/* ─── Logo + name block ─── */}
        <motion.div
          className={cn(
            "flex flex-col items-center justify-center flex-1 transition-all duration-600 ease-out",
            isExpanded && "scale-[0.92] translate-y-[-16px]"
          )}
          style={{ willChange: "transform" }}
        >
          {/* Logo */}
          <motion.div
            layout
            transition={{ duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
            className="relative flex items-center justify-center"
            style={{
              width: isExpanded ? 130 : 150,
              height: isExpanded ? 130 : 150,
              willChange: "width, height, transform",
              transition:
                "width 0.5s ease, height 0.5s ease",
            }}
          >
            <div
              className="w-full h-full rounded-[28px] overflow-hidden flex items-center justify-center"
              style={{
                background: isExpanded
                  ? `${accentColor}08`
                  : "transparent",
                boxShadow: isExpanded
                  ? `0 16px 48px ${accentColor}1C, 0 0 0 1px ${accentColor}0C`
                  : `0 6px 24px ${accentColor}08, 0 0 0 1px ${accentColor}04`,
                transition:
                  "box-shadow 0.6s ease, background 0.6s ease",
              }}
            >
              <Image
                src={logo}
                alt={`${title} logo`}
                width={200}
                height={200}
                className="w-full h-full"
                style={{ objectFit: "contain" }}
                priority
              />
            </div>
          </motion.div>

          {/* Product name + subtitle */}
          <motion.div
            layout
            transition={{ duration: 0.4, ease: [0.19, 1, 0.22, 1] }}
            className="text-center mt-4"
          >
            <h3
              className="text-[28px] md:text-[36px] font-black tracking-tight text-[#1C1C1C] font-space leading-[1.05]"
            >
              {title}
            </h3>
            {subtitle && (
              <p className="text-[14px] md:text-[16px] text-[#9E9E9E] font-medium tracking-[0.02em] mt-1.5">
                {subtitle}
              </p>
            )}
          </motion.div>
        </motion.div>

        {/* ─── Expanded details with button at bottom ─── */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 12 }}
              transition={{
                duration: 0.5,
                ease: [0.19, 1, 0.22, 1],
              }}
              className="flex flex-col flex-1"
            >
              {/* Description — larger font */}
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.06, duration: 0.35 }}
                className="text-[13px] md:text-[14px] text-[#6B6B6B] leading-[1.7] mb-3 line-clamp-3"
              >
                {description}
              </motion.p>

              {/* Tech chips */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.12, duration: 0.35 }}
                className="flex flex-wrap gap-1.5 mb-4"
              >
                {tags.slice(0, 4).map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex px-3 py-1 text-[0.7rem] font-medium rounded-full border"
                    style={{
                      background: `${accentColor}0A`,
                      color: accentColor,
                      borderColor: `${accentColor}18`,
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </motion.div>

              {/* Spacer to push button to bottom */}
              <div className="flex-1" />

              {/* CTA — premium pill button, centered at bottom */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.18, duration: 0.35 }}
                className="flex justify-center pb-1"
              >
                {externalUrl ? (
                  <a
                    href={externalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/cta inline-flex items-center gap-2.5 px-6 py-3 rounded-full font-space font-semibold text-[13px] tracking-wide transition-all duration-400 border"
                    style={{
                      background: `${accentColor}0D`,
                      color: accentColor,
                      borderColor: `${accentColor}20`,
                      boxShadow: `0 4px 14px ${accentColor}0A`,
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = accentColor;
                      e.currentTarget.style.color = "#fff";
                      e.currentTarget.style.borderColor = "transparent";
                      e.currentTarget.style.boxShadow = `0 8px 28px ${accentColor}30`;
                      e.currentTarget.style.transform = "translateY(-2px)";
                    }}
                    onMouseLeave={(e) => {
                      const styles = (
                        e.currentTarget as HTMLElement
                      ).style;
                      styles.background = `${accentColor}0D`;
                      styles.color = accentColor;
                      styles.borderColor = `${accentColor}20`;
                      styles.boxShadow = `0 4px 14px ${accentColor}0A`;
                      styles.transform = "translateY(0)";
                    }}
                  >
                    {primaryCta}
                    <ArrowUpRight className="w-4 h-4 transition-transform duration-400 group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5" />
                  </a>
                ) : (
                  <span
                    className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full font-space font-semibold text-[13px] tracking-wide border"
                    style={{
                      background: `${accentColor}0D`,
                      color: accentColor,
                      borderColor: `${accentColor}20`,
                      opacity: 0.6,
                    }}
                  >
                    {primaryCta}
                  </span>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
    </div>
  );
}

/* ─── ──────────────────────────────────────────────────
   Main section
   ────────────────────────────────────────────────── */
export default function FeaturedWork() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-[#F2EFE9] py-16 md:py-24 lg:py-32"
      aria-label="Featured Work"
    >
      {/* ─── Background atmosphere layers ─── */}
      {/* Large ambient emerald glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none"
        style={{
          width: "800px",
          height: "500px",
          background:
            "radial-gradient(ellipse 50% 60% at 50% 30%, rgba(22,155,98,0.06) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      {/* Soft radial gradient blobs */}
      <div
        className="absolute top-[15%] left-[5%] pointer-events-none"
        style={{
          width: "400px",
          height: "400px",
          background:
            "radial-gradient(circle, rgba(22,155,98,0.03) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />
      <div
        className="absolute top-[30%] right-[8%] pointer-events-none"
        style={{
          width: "350px",
          height: "350px",
          background:
            "radial-gradient(circle, rgba(22,155,98,0.025) 0%, transparent 70%)",
          filter: "blur(100px)",
        }}
      />
      <div
        className="absolute bottom-[10%] left-[40%] pointer-events-none"
        style={{
          width: "500px",
          height: "300px",
          background:
            "radial-gradient(ellipse, rgba(22,155,98,0.02) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />

      {/* Soft light behind heading */}
      <div
        className="absolute top-[8%] left-1/2 -translate-x-1/2 pointer-events-none"
        style={{
          width: "600px",
          height: "200px",
          background:
            "radial-gradient(ellipse 50% 100% at 50% 50%, rgba(255,255,255,0.15) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />

      {/* Noise texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.015]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.4'/%3E%3C/svg%3E")`,
          backgroundSize: "128px 128px",
        }}
      />

      <div className="container-main relative z-[2]">
        {/* ─── Header ─── */}
        <div className="flex flex-col items-center text-center mb-24">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
            className="badge-premium-light mb-6"
          >
            <span
              className="w-[5px] h-[5px] rounded-full bg-[#169B62]"
              style={{ boxShadow: "0 0 6px 1px rgba(22,155,98,0.5)" }}
            />
            Featured Work
          </motion.span>

          <StaggeredHeading isInView={isInView} />

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{
              duration: 0.6,
              delay: 0.55,
              ease: [0.19, 1, 0.22, 1],
            }}
            className="mt-6 text-[18px] md:text-[22px] text-[#9E9E9E] leading-[1.7] max-w-[760px]"
          >
            Hover over each project to explore — every product is designed,
            engineered, and shipped with the same precision that defines
            everything we build.
          </motion.p>
        </div>

        {/* ─── Cards row — horizontal scroll on mobile ─── */}
        <div className="flex flex-row items-stretch gap-5 md:gap-6 overflow-x-auto pb-6 md:overflow-visible md:pb-0 md:justify-center hide-scrollbar">
          {PROJECT_DATA.map((project, i) => (
            <Panel
              key={project.id}
              project={project}
              index={i}
              isHovered={i === hoveredIndex}
              isExpanded={i === hoveredIndex}
              onHover={() => setHoveredIndex(i)}
              onLeave={() => setHoveredIndex(null)}
            />
          ))}
        </div>

        {/* ─── Bottom CTA ─── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{
            duration: 0.6,
            delay: 0.7,
            ease: [0.19, 1, 0.22, 1],
          }}
          className="flex justify-center mt-20"
        >
          <Link
            href="/work"
            className="group/btn inline-flex items-center gap-3 px-8 py-4 rounded-full bg-white text-[#1C1C1C] text-[15px] font-semibold border border-[#E7E2D8] shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:border-[#169B62] hover:text-[#169B62] hover:shadow-[0_8px_32px_rgba(22,155,98,0.15)] hover:-translate-y-[2px] transition-all duration-400"
            style={{ height: "58px" }}
          >
            <span>View All Projects</span>
            <ArrowUpRight className="w-4 h-4 transition-transform duration-400 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
