"use client";

import { useRef, useCallback, useState, useEffect, useMemo } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useInView, useMotionValue, useSpring } from "framer-motion";
import { Sparkles } from "lucide-react";
import { techItems, techCategoryFilters, techStats } from "@/data/techCategories";
import type { TechItem, TechStat } from "@/data/techCategories";
import { cn } from "@/lib/utils";

/* ─── Category accent colours (fallback when no logo) ─── */
const CAT_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  frontend: { bg: "#EBF5FF", text: "#2563EB", border: "#BFDBFE" },
  backend:  { bg: "#F0FDF4", text: "#16A34A", border: "#BBF7D0" },
  mobile:   { bg: "#FFF7ED", text: "#EA580C", border: "#FED7AA" },
  ai:       { bg: "#F3E8FF", text: "#9333EA", border: "#D8B4FE" },
  database: { bg: "#ECFEFF", text: "#0891B2", border: "#A5F3FC" },
  cloud:    { bg: "#EFF6FF", text: "#2563EB", border: "#BFDBFE" },
  devops:   { bg: "#FEF2F2", text: "#DC2626", border: "#FECACA" },
  security: { bg: "#F5F3FF", text: "#7C3AED", border: "#C4B5FD" },
  design:   { bg: "#FFF4ED", text: "#D97706", border: "#FDE68A" },
};

/* ─── Icon sizes ─── */
const ICON_SIZES = {
  sm: { logo: 34, nameSize: "text-[10px]" },
  md: { logo: 48, nameSize: "text-[11px]" },
  lg: { logo: 64, nameSize: "text-[12px]" },
  xl: { logo: 80, nameSize: "text-[13px]" },
};

/* ─── Larger sizes used in the compact "All" wall view ─── */
const ALL_VIEW_SIZES = {
  sm: { logo: 44, nameSize: "text-[9px]" },
  md: { logo: 60, nameSize: "text-[10px]" },
  lg: { logo: 80, nameSize: "text-[11px]" },
};

/* ─── Generate initials from name ─── */
function getInitials(name: string): string {
  const parts = name.split(/[\s-]+/).filter(Boolean);
  if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
  return name.slice(0, 2).toUpperCase();
}

/* ─── Fixed "All" category layout — compact, centered, organic cloud ─── */
const allLayout: Array<{ id: string; x: number; y: number; size: string }> = [
  { id: "gcp", x: -108.3, y: -273.1, size: "md" },
  { id: "css3", x: -39.9, y: -279.7, size: "sm" },
  { id: "pandas", x: 43.3, y: -284.4, size: "sm" },
  { id: "expo", x: 111.7, y: -276.3, size: "sm" },
  { id: "go", x: -110.8, y: -214.1, size: "md" },
  { id: "git", x: -44.9, y: -214.8, size: "sm" },
  { id: "jenkins", x: 38.5, y: -221.1, size: "sm" },
  { id: "svelte", x: 113.4, y: -220.7, size: "sm" },
  { id: "framer", x: 196.8, y: -214.0, size: "sm" },
  { id: "postgresql", x: -232.5, y: -157.8, size: "lg" },
  { id: "framer-motion", x: -147.7, y: -162.1, size: "md" },
  { id: "react-native", x: -70.9, y: -150.1, size: "md" },
  { id: "graphql", x: -1.6, y: -161.9, size: "md" },
  { id: "pytorch", x: 82.6, y: -153.9, size: "md" },
  { id: "oauth", x: 155.5, y: -159.6, size: "sm" },
  { id: "laravel", x: 228.0, y: -148.8, size: "sm" },
  { id: "tailwind", x: -225.7, y: -98.7, size: "lg" },
  { id: "terraform", x: -157.8, y: -89.1, size: "md" },
  { id: "threejs", x: -75.4, y: -89.0, size: "md" },
  { id: "nestjs", x: -1.1, y: -91.7, size: "md" },
  { id: "supabase", x: 73.8, y: -85.0, size: "md" },
  { id: "scikit-learn", x: 146.2, y: -93.1, size: "sm" },
  { id: "fastapi", x: 232.1, y: -87.2, size: "sm" },
  { id: "firebase-auth", x: 298.4, y: -98.4, size: "sm" },
  { id: "typescript", x: -301.1, y: -29.5, size: "lg" },
  { id: "aws", x: -229.8, y: -29.5, size: "lg" },
  { id: "cloudflare", x: -152.5, y: -35.0, size: "md" },
  { id: "mysql", x: -75.1, y: -23.9, size: "md" },
  { id: "android", x: 2.9, y: -37.2, size: "md" },
  { id: "express", x: 82.2, y: -27.0, size: "md" },
  { id: "ssl", x: 156.3, y: -33.6, size: "sm" },
  { id: "kotlin", x: 224.7, y: -36.5, size: "sm" },
  { id: "jwt", x: 296.1, y: -27.4, size: "sm" },
  { id: "flutter", x: -262.5, y: 38.6, size: "lg" },
  { id: "openai", x: -185.8, y: 31.1, size: "lg" },
  { id: "rust", x: -120.3, y: 33.0, size: "md" },
  { id: "tensorflow", x: -32.5, y: 31.1, size: "md" },
  { id: "azure", x: 33.2, y: 29.0, size: "md" },
  { id: "figma", x: 108.6, y: 38.3, size: "md" },
  { id: "lottie", x: 196.8, y: 37.7, size: "sm" },
  { id: "nginx", x: 267.6, y: 30.8, size: "sm" },
  { id: "html5", x: 335.8, y: 28.8, size: "sm" },
  { id: "docker", x: -258.2, y: 97.9, size: "lg" },
  { id: "redis", x: -194.2, y: 88.9, size: "md" },
  { id: "vercel", x: -112.9, y: 86.3, size: "md" },
  { id: "huggingface", x: -34.3, y: 98.1, size: "md" },
  { id: "github", x: 45.6, y: 93.5, size: "md" },
  { id: "opencv", x: 108.0, y: 95.6, size: "sm" },
  { id: "after-effects", x: 197.1, y: 87.6, size: "sm" },
  { id: "numpy", x: 266.4, y: 94.7, size: "sm" },
  { id: "nodejs", x: -182.6, y: 161.9, size: "lg" },
  { id: "firebase", x: -109.9, y: 158.0, size: "md" },
  { id: "langchain", x: -34.6, y: 153.4, size: "md" },
  { id: "spring-boot", x: 40.7, y: 153.0, size: "md" },
  { id: "django", x: 120.4, y: 154.2, size: "md" },
  { id: "flask", x: 186.0, y: 148.0, size: "sm" },
  { id: "javascript", x: 258.3, y: 155.9, size: "md" },
  { id: "vue", x: -150.6, y: 209.1, size: "md" },
  { id: "react", x: -72.7, y: 209.9, size: "lg" },
  { id: "nextjs", x: -6.9, y: 209.5, size: "lg" },
  { id: "kubernetes", x: 73.3, y: 217.2, size: "lg" },
  { id: "angular", x: 148.5, y: 216.8, size: "md" },
  { id: "swift", x: -75.4, y: 282.6, size: "md" },
  { id: "mongodb", x: 6.1, y: 280.2, size: "md" },
];

const layoutById = new Map(allLayout.map((l) => [l.id, l]));

/* ───────────────────────────────────────────────
   Particles
   ─────────────────────────────────────────────── */
function ParticleField() {
  const [mounted, setMounted] = useState(false);
  const [data, setData] = useState<Array<{ id: number; x: number; y: number; s: number; d: number; del: number }>>([]);

  useEffect(() => {
    setMounted(true);
    setData(
      Array.from({ length: 30 }, (_, i) => ({
        id: i, x: Math.random() * 100, y: Math.random() * 100,
        s: Math.random() * 2 + 0.5, d: Math.random() * 12 + 8, del: Math.random() * -8,
      }))
    );
  }, []);

  if (!mounted || data.length === 0) return null;

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {data.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-[var(--color-accent)]"
          style={{ width: p.s, height: p.s, left: `${p.x}%`, top: `${p.y}%`, opacity: 0.04 }}
          animate={{ y: [0, -16, 0], x: [0, Math.random() > 0.5 ? 5 : -5, 0] }}
          transition={{ duration: p.d, repeat: Infinity, delay: p.del, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

/* ───────────────────────────────────────────────
   Background
   ─────────────────────────────────────────────── */
function BackgroundMesh({ mx, my }: { mx: number; my: number }) {
  return (
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
      <motion.div
        className="absolute -top-[15%] -left-[8%] w-[45%] h-[55%] rounded-full"
        style={{ background: "radial-gradient(ellipse at center, rgba(22,155,98,0.05) 0%, transparent 65%)" }}
        animate={{ scale: [1, 1.05, 1], opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -bottom-[8%] -right-[5%] w-[40%] h-[50%] rounded-full"
        style={{ background: "radial-gradient(ellipse at center, rgba(22,155,98,0.03) 0%, transparent 65%)" }}
        animate={{ scale: [1, 1.07, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(22,155,98,0.035) 0%, transparent 60%)", transform: "translate(-50%, -50%)" }}
        animate={{ left: `${mx}%`, top: `${my}%` }}
        transition={{ type: "spring", stiffness: 15, damping: 20 }}
      />
      <svg className="absolute inset-0 w-full h-full opacity-[0.012]" viewBox="0 0 1000 600" preserveAspectRatio="none">
        <line x1="100" y1="100" x2="300" y2="300" stroke="var(--color-accent)" strokeWidth="0.4" />
        <line x1="300" y1="300" x2="500" y2="180" stroke="var(--color-accent)" strokeWidth="0.3" />
        <line x1="500" y1="180" x2="700" y2="350" stroke="var(--color-accent)" strokeWidth="0.3" />
        <line x1="700" y1="350" x2="900" y2="150" stroke="var(--color-accent)" strokeWidth="0.2" />
        <line x1="200" y1="500" x2="450" y2="350" stroke="var(--color-accent)" strokeWidth="0.2" />
        <line x1="450" y1="350" x2="750" y2="500" stroke="var(--color-accent)" strokeWidth="0.2" />
        <line x1="250" y1="150" x2="550" y2="480" stroke="var(--color-accent)" strokeWidth="0.15" />
      </svg>
    </div>
  );
}

/* ───────────────────────────────────────────────
   Header
   ─────────────────────────────────────────────── */
function SectionHeader() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div ref={ref} className="text-center mb-12 md:mb-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
        className="flex items-center justify-center mb-5"
      >
        <span className="badge-premium text-[13px] tracking-[0.15em] uppercase font-medium inline-flex items-center gap-2">
          <Sparkles className="w-3 h-3" />
          Technology Ecosystem
        </span>
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
        animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
        transition={{ delay: 0.12, duration: 0.7, ease: [0.19, 1, 0.22, 1] }}
        className="text-[clamp(32px,5.5vw,68px)] font-bold leading-[1.08] tracking-[-0.03em] text-[var(--ink)]"
      >
        Powered By{" "}
        <span className="relative inline-block">
          <span className="text-gradient-accent">World-Class</span>
          <motion.span
            className="absolute -bottom-1 left-0 right-0 h-[3px] bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent-light)] rounded-full"
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ delay: 0.6, duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
            style={{ transformOrigin: "left" }}
          />
        </span>{" "}
        Technologies.
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.3, duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
        className="mt-4 text-[16px] md:text-[18px] leading-relaxed text-[var(--ink-dim)] max-w-2xl mx-auto"
      >
        From AI and cloud infrastructure to frontend engineering, mobile development, DevOps,
        cybersecurity, and scalable backend systems — we build using the best technologies available.
      </motion.p>
    </div>
  );
}

/* ───────────────────────────────────────────────
   Filter pills
   ─────────────────────────────────────────────── */
function FilterBar({ active, onSelect }: { active: string; onSelect: (id: string) => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
      className="flex flex-wrap items-center justify-center gap-2 md:gap-3 mb-10 md:mb-14"
    >
      {techCategoryFilters.map((cat) => (
        <motion.button
          key={cat.id}
          onClick={() => onSelect(cat.id)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={cn(
            "px-4 md:px-6 py-2 md:py-2.5 rounded-full text-[13px] md:text-[14px] font-semibold tracking-wide",
            "transition-all duration-300 border cursor-pointer",
            active === cat.id
              ? "bg-[var(--color-accent)] text-white border-[var(--color-accent)] shadow-md shadow-[var(--color-accent-glow)]"
              : "bg-white/60 text-[var(--ink-dim)] border-[var(--color-border)] hover:border-[var(--color-accent)]/30 hover:text-[var(--color-accent)] hover:bg-[var(--color-accent-subtle)]"
          )}
        >
          {cat.label}
        </motion.button>
      ))}
    </motion.div>
  );
}

/* ───────────────────────────────────────────────
   Tech logo icon
   ─────────────────────────────────────────────── */
function TechIcon({
  item,
  isHovered,
  showcase = false,
  allView = false,
}: {
  item: TechItem;
  isHovered: boolean;
  showcase?: boolean;
  allView?: boolean;
}) {
  const colors = CAT_COLORS[item.categoryId] || CAT_COLORS.frontend;

  const size = allView
    ? ALL_VIEW_SIZES[item.size]
    : showcase
      ? ICON_SIZES.xl
      : ICON_SIZES[item.size];

  return (
    <motion.div
      className={cn(
        "relative flex flex-col items-center gap-2",
        showcase && "px-6 py-7 rounded-2xl border bg-white/75 backdrop-blur-md shadow-[0_2px_16px_rgba(0,0,0,0.04)]"
      )}
      style={
        showcase
          ? {
              borderColor: isHovered ? `${colors.text}55` : "var(--color-border)",
              boxShadow: isHovered
                ? `0 12px 32px -8px ${colors.text}35, 0 2px 16px rgba(0,0,0,0.04)`
                : "0 2px 16px rgba(0,0,0,0.04)",
              transition: "border-color 0.3s ease, box-shadow 0.3s ease",
            }
          : undefined
      }
      animate={isHovered ? { scale: showcase ? 1.05 : 1.12, y: -3 } : { scale: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 18 }}
    >
      {/* Glow ring on hover */}
      <motion.div
        className="absolute inset-0 rounded-full pointer-events-none"
        style={{
          width: size.logo + 24,
          height: size.logo + 24,
          left: "50%",
          top: showcase ? "44%" : "50%",
          transform: "translate(-50%, -50%)",
          background: `radial-gradient(circle, ${colors.text}22 0%, transparent 60%)`,
          opacity: isHovered ? 1 : 0,
          transition: "opacity 0.3s ease",
        }}
      />

      {item.logoPath ? (
        <div
          className="relative rounded-xl flex items-center justify-center overflow-hidden shrink-0"
          style={{
            width: size.logo,
            height: size.logo,
            boxShadow: isHovered ? `0 4px 20px ${colors.text}30` : "0 1px 4px rgba(0,0,0,0.04)",
            transition: "box-shadow 0.3s ease",
            filter: isHovered ? "brightness(1.08)" : "brightness(1)",
          }}
        >
          <Image
            src={item.logoPath}
            alt={item.name}
            width={size.logo}
            height={size.logo}
            className="object-contain w-full h-full"
            style={{ transition: "transform 0.3s ease" }}
            unoptimized
          />
        </div>
      ) : (
        <div
          className="relative rounded-full flex items-center justify-center font-bold select-none shrink-0"
          style={{
            width: size.logo,
            height: size.logo,
            backgroundColor: isHovered ? colors.text : colors.bg,
            color: isHovered ? "#FFFFFF" : colors.text,
            border: `1.5px solid ${isHovered ? colors.text : colors.border}`,
            boxShadow: isHovered ? `0 4px 20px ${colors.text}40` : "0 1px 3px rgba(0,0,0,0.04)",
            transition: "background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease",
          }}
        >
        </div>
      )}

      <span
        className={cn(
          size.nameSize,
          "font-medium text-center leading-tight select-none whitespace-nowrap",
          isHovered ? "text-[var(--ink)]" : "text-[var(--ink-dim)]",
          "transition-colors duration-300"
        )}
        style={{ maxWidth: size.logo + 20 }}
      >
      </span>
    </motion.div>
  );
}

/* ───────────────────────────────────────────────
   Centered showcase — shown when a specific
   category filter is active
   ─────────────────────────────────────────────── */
function CenteredShowcase({ items, label }: { items: TechItem[]; label: string }) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <motion.div
      key="showcase"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35, ease: [0.19, 1, 0.22, 1] }}
      className="w-full h-full flex flex-col items-center justify-center px-4"
    >
      <motion.p
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05, duration: 0.4 }}
        className="text-[13px] font-semibold tracking-[0.2em] uppercase text-[var(--color-accent)] mb-8"
      >
        {label} · {items.length} {items.length === 1 ? "Technology" : "Technologies"}
      </motion.p>

      <div className="flex flex-wrap items-start justify-center gap-5 md:gap-7 max-w-5xl">
        {items.map((item, i) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 24, scale: 0.85 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.85, transition: { duration: 0.2 } }}
            transition={{ delay: i * 0.045, duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
            onMouseEnter={() => setHoveredId(item.id)}
            onMouseLeave={() => setHoveredId(null)}
          >
            <TechIcon item={item} isHovered={hoveredId === item.id} showcase />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

/* ───────────────────────────────────────────────
   "All" layout — compact, centered, organic cloud
   using fixed absolute positions
   ─────────────────────────────────────────────── */
function AllViewGrid({ items, hoveredId, onHover, onLeave }: {
  items: TechItem[];
  hoveredId: string | null;
  onHover: (id: string) => void;
  onLeave: () => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [cloudDims, setCloudDims] = useState({ width: 0, height: 0 });

  /* Compute bounding box of the allLayout positions */
  useEffect(() => {
    if (allLayout.length === 0) return;
    const xs = allLayout.map((l) => l.x);
    const ys = allLayout.map((l) => l.y);
    const minX = Math.min(...xs);
    const maxX = Math.max(...xs);
    const minY = Math.min(...ys);
    const maxY = Math.max(...ys);
    setCloudDims({ width: maxX - minX, height: maxY - minY });
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 flex items-center justify-center overflow-hidden">
      {/* Inner wrapper that shifts the cloud to center */}
      <div className="relative" style={{ width: cloudDims.width + 160, height: cloudDims.height + 120 }}>
        {items.map((item, i) => {
          const layout = layoutById.get(item.id);
          if (!layout) return null;
          const isDimmed = hoveredId !== null && hoveredId !== item.id;

          return (
            <motion.div
              key={item.id}
              className={cn("absolute", isDimmed && "pointer-events-none")}
              style={{ left: "50%", top: "50%" }}
              initial={{ opacity: 0, scale: 0.5, x: layout.x * 0.3, y: layout.y * 0.3 }}
              animate={{
                opacity: isDimmed ? 0.2 : 1,
                scale: 1,
                x: layout.x,
                y: layout.y,
              }}
              transition={{
                type: "spring",
                stiffness: 90,
                damping: 14,
                delay: i * 0.012,
                duration: 0.7,
              }}
              onMouseEnter={() => onHover(item.id)}
              onMouseLeave={onLeave}
            >
              <TechIcon item={item} isHovered={hoveredId === item.id} allView />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

/* ───────────────────────────────────────────────
   Stats
   ─────────────────────────────────────────────── */
function StatItem({ stat, index }: { stat: TechStat; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const [displayText, setDisplayText] = useState("0");

  useEffect(() => {
    if (!isInView) return;
    setDisplayText("0");
    const duration = 2, steps = 60;
    const increment = stat.endValue / steps;
    let current = 0;
    const interval = setInterval(() => {
      current += increment;
      if (current >= stat.endValue) { current = stat.endValue; clearInterval(interval); }
      const prefix = stat.displaySuffix ? `${Math.round(current)}${stat.displaySuffix}` : `${Math.round(current)}`;
      setDisplayText(prefix);
    }, (duration * 1000) / steps);
    return () => clearInterval(interval);
  }, [isInView, stat.endValue, stat.displaySuffix]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.1, duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
      className="flex flex-col items-center gap-0.5"
    >
      <span className="text-[clamp(24px,3vw,38px)] font-bold tracking-tight text-[var(--ink)]">
        {displayText}
        {stat.suffix && <span className="text-[var(--color-accent)]">{stat.suffix}</span>}
      </span>
      <span className="text-[12px] font-medium text-[var(--ink-dim)] uppercase tracking-wider whitespace-nowrap">
        {stat.label}
      </span>
    </motion.div>
  );
}

function StatsRow() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: 0.2, duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
      className="grid grid-cols-3 md:grid-cols-6 gap-4 md:gap-6 px-4 md:px-8 py-6 md:py-8 mb-12 md:mb-14 rounded-3xl bg-[var(--color-accent-subtle)]/60 border border-[var(--color-accent)]/10"
    >
      {techStats.map((stat, i) => (
        <StatItem key={stat.label} stat={stat} index={i} />
      ))}
    </motion.div>
  );
}

/* ───────────────────────────────────────────────
   Main
   ─────────────────────────────────────────────── */
export default function TechPremium() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeCategory, setActiveCategory] = useState("all");
  const [mouse, setMouse] = useState({ x: 50, y: 50 });
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!sectionRef.current) return;
    const r = sectionRef.current.getBoundingClientRect();
    setMouse({ x: ((e.clientX - r.left) / r.width) * 100, y: ((e.clientY - r.top) / r.height) * 100 });
  }, []);

  const groupedItems = useMemo(() => {
    const groups: Record<string, TechItem[]> = {};
    techItems.forEach((item) => {
      if (!groups[item.categoryId]) groups[item.categoryId] = [];
      groups[item.categoryId].push(item);
    });
    return groups;
  }, []);

  /* All items in the fixed layout order for the "All" view */
  const allItems = useMemo(() => {
    const itemMap = new Map(techItems.map((i) => [i.id, i]));
    return allLayout.map((l) => itemMap.get(l.id)).filter(Boolean) as TechItem[];
  }, []);

  const activeLabel = useMemo(
    () => techCategoryFilters.find((f) => f.id === activeCategory)?.label || activeCategory,
    [activeCategory]
  );

  if (!mounted) return null;

  return (
    <section
      ref={sectionRef}
      id="technology"
      onMouseMove={handleMouseMove}
      className="relative py-8 overflow-hidden bg-[var(--section-light-green)]"
    >
      <BackgroundMesh mx={mouse.x} my={mouse.y} />
      <ParticleField />

      <div className="container-main relative z-10">
        <SectionHeader />
        <StatsRow />
        <FilterBar active={activeCategory} onSelect={setActiveCategory} />
      </div>

      {/* Cloud / Showcase */}
      <div className="relative w-full" style={{ minHeight: "clamp(520px, 78vh, 720px)" }}>
        <AnimatePresence mode="wait">
          {activeCategory === "all" ? (
            <AllViewGrid
              key="all-view"
              items={allItems}
              hoveredId={hoveredId}
              onHover={setHoveredId}
              onLeave={() => setHoveredId(null)}
            />
          ) : (
            <div key="showcase-wrapper" className="absolute inset-0 flex items-center justify-center">
              <CenteredShowcase items={groupedItems[activeCategory] || []} label={activeLabel} />
            </div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
