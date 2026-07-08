"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import AiFirstIllustration from "@/components/ui/svg-illustrations/AiFirstIllustration";
import ShieldIllustration from "@/components/ui/svg-illustrations/ShieldIllustration";
import CloudArchitectureIllustration from "@/components/ui/svg-illustrations/CloudArchitectureIllustration";
import PerformanceIllustration from "@/components/ui/svg-illustrations/PerformanceIllustration";
import PartnershipIllustration from "@/components/ui/svg-illustrations/PartnershipIllustration";
import InnovationIllustration from "@/components/ui/svg-illustrations/InnovationIllustration";

/* ══════════════════════════════════════════════
   DATA — 6 cards, max 3 tags each
   ══════════════════════════════════════════════ */

interface CardData {
  title: string;
  copy: string;
  Illustration: React.ComponentType<{ className?: string }>;
  slug: string;
  tags: string[];
  accent: string;
}

const cards: CardData[] = [
  {
    title: "AI-First Engineering",
    copy: "Machine learning, LLMs, and intelligent automation are native to our stack. Every product we ship learns, adapts, and improves over time.",
    Illustration: AiFirstIllustration,
    slug: "ai-engineering",
    tags: ["Machine Learning", "LLMs", "Automation"],
    accent: "#169B62",
  },
  {
    title: "Enterprise-Grade Security",
    copy: "SOC 2 aligned, zero-trust, and end-to-end encryption — a foundation built from the first line of code.",
    Illustration: ShieldIllustration,
    slug: "security",
    tags: ["Zero Trust", "Encryption", "Compliance"],
    accent: "#1a7a5a",
  },
  {
    title: "Scalable Cloud Architecture",
    copy: "Multi-region, auto-scaling, and fault-tolerant infrastructure engineered to scale from zero to millions.",
    Illustration: CloudArchitectureIllustration,
    slug: "cloud",
    tags: ["AWS/GCP/Azure", "Kubernetes", "Terraform"],
    accent: "#1a8a6a",
  },
  {
    title: "Performance & SEO",
    copy: "Sub-100ms responses and 95+ Lighthouse scores. Speed is a feature we engineer for, relentlessly.",
    Illustration: PerformanceIllustration,
    slug: "performance",
    tags: ["Core Web Vitals", "Edge CDN", "SSR"],
    accent: "#0d7a55",
  },
  {
    title: "Long-Term Partnership",
    copy: "We stay after launch — continuous optimization, shared roadmaps, and compounding returns for years.",
    Illustration: PartnershipIllustration,
    slug: "partnership",
    tags: ["Dedicated Team", "Roadmapping", "Strategy"],
    accent: "#1a6a4a",
  },
  {
    title: "Business Innovation",
    copy: "Every decision ties to revenue and retention. We measure success in outcomes, not output velocity.",
    Illustration: InnovationIllustration,
    slug: "business",
    tags: ["Transformation", "Automation", "Analytics"],
    accent: "#0d8a5a",
  },
];

/* ══════════════════════════════════════════════
   TILT HOOK
   ══════════════════════════════════════════════ */

function useTilt() {
  const ref = useRef<HTMLDivElement>(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });

  const handleMouse = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setRotate({ x: y * -5, y: x * 5 });
  };

  const handleLeave = () => setRotate({ x: 0, y: 0 });

  return { ref, rotate, handleMouse, handleLeave };
}

/* ══════════════════════════════════════════════
   ANIMATED ILLUSTRATION BACKGROUND
   ══════════════════════════════════════════════ */

function IllustrationBg({
  Illustration,
  isHovered,
}: {
  Illustration: React.ComponentType<{ className?: string }>;
  isHovered: boolean;
}) {
  return (
    <motion.div
      className="pointer-events-none absolute bottom-0 right-0 z-0"
      animate={{ scale: isHovered ? 1.15 : 1 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      <Illustration className="h-72 w-72 opacity-[0.08] md:h-80 md:w-80 md:opacity-[0.10]" />
    </motion.div>
  );
}

/* ══════════════════════════════════════════════
   PREMIUM CARD
   ══════════════════════════════════════════════ */

function PremiumCard({ card, index }: { card: CardData; index: number }) {
  const [isHovered, setIsHovered] = useState(false);
  const [ripple, setRipple] = useState<{ x: number; y: number } | null>(null);
  const { ref, rotate, handleMouse, handleLeave } = useTilt();
  const { title, copy, Illustration, slug, tags, accent } = card;

  const handleRipple = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    setRipple({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    setTimeout(() => setRipple(null), 700);
  };

  return (
    <Link
      href={`/solutions/${slug}`}
      className="group block h-full w-full no-underline"
    >
      <motion.div
        ref={ref}
        onMouseMove={handleMouse}
        onMouseLeave={() => {
          handleLeave();
          setIsHovered(false);
        }}
        onMouseEnter={() => setIsHovered(true)}
        onClick={handleRipple}
        style={{ transformPerspective: 1200 }}
        animate={{
          rotateX: rotate.x,
          rotateY: rotate.y,
          y: isHovered ? -12 : 0,
          scale: isHovered ? 1.03 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 200,
          damping: 20,
          mass: 0.15,
        }}
        className="relative h-full w-full overflow-hidden rounded-[32px] will-change-transform"
      >
        {/* Base card surface */}
        <div className="relative h-full w-full bg-gradient-to-br from-[#FFFFFF] via-[#FCFCF8] to-[#F8F8F4]">
          {/* Glass reflection overlay */}
          <div className="pointer-events-none absolute inset-0 z-10 rounded-[32px] bg-gradient-to-b from-white/60 via-white/5 to-transparent" />

          {/* Inner shadow — subtle depth */}
          <div className="pointer-events-none absolute inset-0 z-10 rounded-[32px] shadow-[inset_0_1px_0_rgba(255,255,255,0.9),inset_0_-1px_0_rgba(0,0,0,0.02)]" />

          {/* Gradient border — glows on hover */}
          <motion.div
            className="pointer-events-none absolute inset-0 z-20 rounded-[32px]"
            animate={{
              boxShadow: isHovered
                ? `inset 0 0 0 1.5px ${accent}40, ${accent}20 0 0 32px -10px`
                : "inset 0 0 0 1px rgba(0,0,0,0.04)",
            }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          />

          {/* Outer depth shadow — dynamic on hover */}
          <motion.div
            className="pointer-events-none absolute inset-0 z-20 rounded-[32px]"
            animate={{
              boxShadow: isHovered
                ? "0 40px 100px rgba(0,0,0,0.12), 0 16px 40px rgba(0,0,0,0.07), 0 4px 12px rgba(0,0,0,0.03)"
                : "0 2px 6px rgba(0,0,0,0.03), 0 8px 24px rgba(0,0,0,0.02)",
            }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          />

          {/* Top-right radial highlight */}
          <div
            className="pointer-events-none absolute -right-10 -top-10 z-10 h-48 w-48 rounded-full opacity-50"
            style={{
              background: `radial-gradient(circle, ${accent}0a, transparent 70%)`,
            }}
          />

          {/* Glow behind card on hover — emerald bloom */}
          <motion.div
            className="pointer-events-none absolute -left-28 -top-28 z-0 rounded-full"
            animate={{
              width: isHovered ? 400 : 0,
              height: isHovered ? 400 : 0,
              opacity: isHovered ? 0.6 : 0,
            }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            style={{
              background: `${accent}0c`,
              filter: "blur(100px)",
            }}
          />

          {/* Accent bar — top edge */}
          <motion.div
            className="pointer-events-none absolute left-0 top-0 z-20 w-full"
            animate={{
              height: isHovered ? 5 : 3,
              opacity: isHovered ? 1 : 0.6,
            }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            style={{
              background: `linear-gradient(90deg, ${accent}, ${accent}77, transparent)`,
            }}
          />

          {/* Ripple burst on click */}
          {ripple && (
            <motion.span
              className="pointer-events-none absolute z-30 rounded-full"
              initial={{
                width: 0,
                height: 0,
                opacity: 0.35,
                x: ripple.x,
                y: ripple.y,
              }}
              animate={{
                width: 800,
                height: 800,
                opacity: 0,
                x: ripple.x - 400,
                y: ripple.y - 400,
              }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              style={{
                background: `radial-gradient(circle, ${accent}1a 0%, transparent 70%)`,
              }}
            />
          )}

          {/* Decorative animated illustration — bottom-right */}
          <IllustrationBg Illustration={Illustration} isHovered={isHovered} />

          {/* ═══ CARD CONTENT — button anchored to bottom ═══ */}
          <div className="relative z-10 flex h-full flex-col px-9 pb-10 pt-10 md:px-10 md:pb-12 md:pt-12">
            {/* Centered top content — flex-1 pushes the button down */}
            <div className="flex flex-1 flex-col items-center justify-center">
              {/* Logo — glass orb with breathing animation */}
              <motion.div
                className="relative mb-6 flex items-center justify-center"
                animate={{ scale: isHovered ? 1.12 : 1 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                style={{ width: 84, height: 84 }}
              >
                <div className="absolute inset-0 rounded-full shadow-[inset_0_2px_4px_rgba(0,0,0,0.06)]" />
                <motion.div
                  className="absolute inset-1.5 rounded-full"
                  animate={{
                    background: isHovered ? `${accent}18` : `${accent}08`,
                  }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                />
                {/* Floating + rotation + pulse */}
                <motion.div
                  animate={{
                    rotate: [0, 0.8, 0, -0.8, 0],
                    scale: [1, 1.03, 1, 1.03, 1],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <Illustration className="relative z-10 h-12 w-12 md:h-14 md:w-14" />
                </motion.div>
              </motion.div>

              {/* Title — 36px */}
              <h3
                className="mb-3 text-center font-black leading-[1.15] tracking-[-0.02em] text-[#1C1C1C]"
                style={{ fontSize: "clamp(1.5rem, 2.4vw, 2.25rem)" }}
              >
                {title}
              </h3>

              {/* Description — 18px */}
              <p
                className="mx-auto mb-6 max-w-xs text-center font-medium leading-relaxed text-[#6B6B6B]"
                style={{ fontSize: "clamp(0.9375rem, 1.1vw, 1.125rem)" }}
              >
                {copy}
              </p>

              {/* Feature tags — 15px, max 3 */}
              <div className="flex flex-wrap justify-center gap-2.5">
                {tags.map((tag) => (
                  <motion.span
                    key={tag}
                    className="rounded-full px-4 py-1.5 font-semibold tracking-wide"
                    style={{
                      background: `${accent}0d`,
                      color: accent,
                      border: `1px solid ${accent}18`,
                      fontSize: "clamp(0.8125rem, 0.9vw, 0.9375rem)",
                    }}
                    whileHover={{ y: -3, scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300, damping: 15 }}
                  >
                    {tag}
                  </motion.span>
                ))}
              </div>
            </div>

            {/* CTA Button — 17px, anchored to bottom, centered */}
            <div className="mt-auto flex justify-center pt-6">
              <motion.div
                className="relative inline-flex items-center gap-2.5 overflow-hidden rounded-full px-7 py-3 font-semibold leading-none shadow-sm will-change-transform"
                style={{
                  background: `linear-gradient(135deg, ${accent}, ${accent}dd)`,
                  color: "#FFFFFF",
                  boxShadow: `0 4px 20px ${accent}30`,
                  fontSize: "clamp(0.9375rem, 1rem, 1.0625rem)",
                }}
                whileHover={{
                  gap: "16px",
                  boxShadow: `0 8px 36px ${accent}50`,
                }}
                whileTap={{ scale: 0.97 }}
              >
                <span className="relative z-10">Explore</span>
                <motion.span className="relative z-10 flex items-center">
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </motion.span>
                {/* Shimmer overlay on hover */}
                <motion.div
                  className="absolute inset-0 rounded-full"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(255,255,255,0.15), transparent)",
                  }}
                />
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}

/* ══════════════════════════════════════════════
   ENTRANCE VARIANTS
   ══════════════════════════════════════════════ */

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.15,
    },
  },
};

const cardEnterVariants = {
  hidden: { opacity: 0, y: 60, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const },
  },
};

/* ══════════════════════════════════════════════
   SECTION
   ══════════════════════════════════════════════ */

export default function WhyRiverLoom() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  const bgWords = [
    "ENGINEERING",
    "SCALABILITY",
    "SECURITY",
    "AI",
    "SOFTWARE",
    "INNOVATION",
  ];

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-[#F8F6F1] py-16 md:py-24 lg:py-32"
    >
      {/* ══════════════════════════════════════════════
          LAYERED PREMIUM BACKGROUND
          ══════════════════════════════════════════════ */}

      {/* 1. Noise texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='0.08'/%3E%3C/svg%3E")`,
          backgroundSize: "200px 200px",
        }}
      />

      {/* 2. Soft cream + emerald radial gradients */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Large left bloom */}
        <div className="absolute left-[5%] top-0 h-[900px] w-[900px] -translate-x-1/2 rounded-full bg-[rgba(22,155,98,0.06)] blur-[250px]" />
        {/* Mid-right soft glow */}
        <div className="absolute right-[10%] top-[25%] h-[600px] w-[600px] rounded-full bg-[rgba(22,155,98,0.04)] blur-[160px]" />
        {/* Bottom center */}
        <div className="absolute bottom-0 left-1/2 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-[rgba(22,155,98,0.03)] blur-[140px]" />

        {/* Large emerald glow behind card area */}
        <div className="absolute left-[8%] top-[35%] h-[700px] w-[700px] rounded-full bg-[rgba(22,155,98,0.07)] blur-[200px]" />

        {/* 3. Subtle grid */}
        <svg className="absolute inset-0 h-full w-full opacity-[0.015]">
          <defs>
            <pattern
              id="whyPremiumGrid"
              width="80"
              height="80"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 80 0 L 0 0 0 80"
                fill="none"
                stroke="#169B62"
                strokeWidth="0.5"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#whyPremiumGrid)" />
        </svg>

        {/* 4. Floating blurred circles */}
        <div
          className="absolute left-[6%] top-[12%] h-48 w-48 rounded-full bg-[rgba(22,155,98,0.04)] blur-[70px]"
          style={{ animation: "float 11s ease-in-out infinite" }}
        />
        <div
          className="absolute right-[10%] top-[50%] h-36 w-36 rounded-full bg-[rgba(22,155,98,0.03)] blur-[60px]"
          style={{
            animation: "float 13s ease-in-out infinite",
            animationDelay: "-5s",
          }}
        />
        <div
          className="absolute left-[35%] bottom-[8%] h-32 w-32 rounded-full bg-[rgba(22,155,98,0.03)] blur-[50px]"
          style={{
            animation: "float 10s ease-in-out infinite",
            animationDelay: "-3s",
          }}
        />

        {/* Vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_25%,rgba(248,246,241,0.7)_100%)]" />
      </div>

      {/* ══════════════════════════════════════════════
          FAINT BACKGROUND WORDS (2-3% opacity)
          ══════════════════════════════════════════════ */}
      <div className="pointer-events-none absolute inset-0 flex select-none items-center justify-center overflow-hidden">
        <div className="relative h-full w-full">
          {bgWords.map((word, i) => (
            <span
              key={word}
              className="absolute font-black leading-none tracking-[-0.03em] opacity-[0.025]"
              style={{
                color: "#169B62",
                WebkitTextStroke: "0.5px rgba(22,155,98,0.06)",
                WebkitTextFillColor: "transparent",
                fontSize: `${6 + i * 0.9}rem`,
                top: `${5 + i * 14}%`,
                left: `${3 + (i % 2) * 42}%`,
                transform: `rotate(${-4 + i * 2}deg)`,
                whiteSpace: "nowrap",
              }}
            >
              {word}
            </span>
          ))}
        </div>
      </div>

      {/* ══════════════════════════════════════════════
          CONTENT — full-width container
          ══════════════════════════════════════════════ */}
      <div className="relative z-10 mx-auto max-w-[1560px] px-8 md:px-14 lg:px-20">
        {/* ─── SECTION LABEL ─── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="mb-6 flex items-center gap-3"
        >
          <span className="h-px w-8 bg-[#169B62]" />
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[#169B62]">
            Why RiverLoom
          </span>
        </motion.div>

        {/* ─── HEADING — 84px, 900 weight, line-by-line ─── */}
        {[
          { text: "Built Different.", highlight: false },
          { text: "Built To Scale.", highlight: false },
          { text: "Built For Tomorrow.", highlight: true },
        ].map((line, i) => (
          <div
            key={i}
            className="overflow-hidden"
            style={{ marginBottom: i < 2 ? "0.25rem" : "1.5rem" }}
          >
            <motion.h2
              initial={{ opacity: 0, y: 60 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.7,
                delay: 0.1 + i * 0.14,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="font-black leading-[1.04] tracking-[-0.045em]"
              style={{ fontSize: "clamp(2.5rem, 7vw, 5.25rem)" }}
            >
              {line.highlight ? (
                <>
                  <span className="text-[#1C1C1C]">Built For </span>
                  <span
                    className="bg-clip-text text-transparent"
                    style={{
                      backgroundImage:
                        "linear-gradient(135deg, #169B62, #1FC77E)",
                    }}
                  >
                    Tomorrow.
                  </span>
                </>
              ) : (
                <span className="text-[#1C1C1C]">{line.text}</span>
              )}
            </motion.h2>
          </div>
        ))}

        {/* ─── SUBHEADING — 24px ─── */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16 max-w-2xl font-medium leading-relaxed text-[#6B6B6B]"
          style={{ fontSize: "clamp(1.125rem, 1.5vw, 1.5rem)" }}
        >
          We combine world-class engineering with strategic thinking and genuine
          partnership — delivering products that don't just work, but dominate.
        </motion.p>

        {/* ─── CARDS GRID — 3 cols, 2 rows, equal height ─── */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid gap-8 md:grid-cols-3"
        >
          {cards.map((card, i) => (
            <motion.div
              key={card.title}
              variants={cardEnterVariants}
              className="h-[540px]"
            >
              <PremiumCard card={card} index={i} />
            </motion.div>
          ))}
        </motion.div>

        {/* ══════════════════════════════════════════════
            PREMIUM CTA BLOCK
            ══════════════════════════════════════════════ */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1 }}
          className="relative mt-20 overflow-hidden rounded-[40px] px-10 py-14 text-center md:px-20 md:py-16"
        >
          {/* CTA background glow */}
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute left-1/2 top-1/2 h-[500px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[rgba(22,155,98,0.06)] blur-[180px]" />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[rgba(22,155,98,0.03)]" />
          </div>

          {/* Animated divider lines */}
          <div className="relative mb-10 flex items-center justify-center gap-4">
            <motion.div
              className="h-px flex-1"
              style={{
                background:
                  "linear-gradient(90deg, transparent, rgba(22,155,98,0.2))",
              }}
            />
            <motion.div
              className="h-2 w-2 rounded-full bg-[#169B62]"
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <motion.div
              className="h-px flex-1"
              style={{
                background:
                  "linear-gradient(90deg, rgba(22,155,98,0.2), transparent)",
              }}
            />
          </div>

          {/* CTA Heading — 36px */}
          <h3
            className="relative mb-4 font-black leading-[1.1] tracking-[-0.03em] text-[#1C1C1C]"
            style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)" }}
          >
            Ready To Build Something Exceptional?
          </h3>

          {/* CTA Body — 18px */}
          <p
            className="relative mx-auto mb-10 max-w-xl font-medium leading-relaxed text-[#6B6B6B]"
            style={{ fontSize: "clamp(0.9375rem, 1.1vw, 1.125rem)" }}
          >
            Let's discuss your next AI platform, enterprise application, or
            digital product. Every conversation starts with a strategy call.
          </p>

          {/* CTA Button — large */}
          <Link
            href="/contact"
            className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-[#169B62] px-10 py-4 font-bold text-white shadow-[0_4px_24px_rgba(22,155,98,0.3)] transition-all duration-300 hover:shadow-[0_12px_48px_rgba(22,155,98,0.5)] hover:-translate-y-1"
            style={{ fontSize: "clamp(0.9375rem, 1.1vw, 1.125rem)" }}
          >
            <span className="relative z-10">Schedule Strategy Call</span>
            <ArrowUpRight className="relative z-10 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
            {/* Shimmer sweep */}
            <motion.div
              className="absolute inset-0 rounded-full bg-gradient-to-r from-white/15 to-transparent"
              initial={{ x: "-100%" }}
              whileHover={{ x: "100%" }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
