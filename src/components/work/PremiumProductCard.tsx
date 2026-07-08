"use client";

import { useState, useRef, useCallback } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight, Sparkles, Star, Download, Play, Globe, Github } from "lucide-react";
import type { Product } from "@/data/products";
import { productMetaOverlays } from "@/data/productMeta";
import { cn } from "@/lib/utils";

/* ─── ──────────────────────────────────────────────────
   Tech icon emoji map (lightweight, no SVGs)
   ────────────────────────────────────────────────── */
const TECH_ICONS: Record<string, string> = {
  "React": "⚛",
  "Next.js": "▲",
  "Flutter": "⚡",
  "Firebase": "🔥",
  "TypeScript": "📘",
  "JavaScript": "📒",
  "Node": "💚",
  "Python": "🐍",
  "Docker": "🐳",
  "AI": "🤖",
  "NLP": "🧠",
  "GPT": "💬",
  "Machine Learning": "🧪",
  "Mobile": "📱",
  "Games": "🎮",
  "Puzzle": "🧩",
  "Casual": "🎯",
  "Social": "💬",
  "Creative": "🎨",
  "Writing": "✍️",
  "Education": "📚",
  "ERP": "🏗️",
  "CRM": "🤝",
  "SaaS": "☁️",
  "Hotel Management": "🏨",
  "Security": "🔒",
  "Cyber Defense": "🛡️",
  "Threat Intelligence": "🔍",
  "Open Source": "🌍",
  "EdTech": "🎓",
  "Visualization": "📊",
  "Strategy": "♟️",
  "Action": "💥",
  "Shooter": "🔫",
  "Adventure": "🏔️",
  "Simulation": "🎪",
};

function getTechIcon(tech: string): string {
  for (const [key, icon] of Object.entries(TECH_ICONS)) {
    if (tech.toLowerCase().includes(key.toLowerCase())) return icon;
  }
  return "▸";
}

/* ─── ──────────────────────────────────────────────────
   Status Badge
   ────────────────────────────────────────────────── */
const STATUS_STYLES: Record<string, { label: string; bg: string; text: string }> = {
  published: { label: "Published", bg: "rgba(34,197,94,0.15)", text: "#22C55E" },
  "coming-soon": { label: "Coming Soon", bg: "rgba(251,191,36,0.15)", text: "#FBBF24" },
  "in-development": { label: "In Dev", bg: "rgba(96,165,250,0.15)", text: "#60A5FA" },
};

/* ─── ──────────────────────────────────────────────────
   Banner pattern SVGs
   ────────────────────────────────────────────────── */
function BannerPattern({ type, accent }: { type?: string; accent: string }) {
  if (!type || type === "none") return null;

  const color = accent.replace(")", ",0.06)");
  const colorStrong = accent.replace(")", ",0.12)");

  if (type === "dots") {
    return (
      <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="dots" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
            <circle cx="10" cy="10" r="1.5" fill="white" opacity="0.06" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#dots)" />
      </svg>
    );
  }

  if (type === "grid") {
    return (
      <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="grid" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
            <path d="M 24 0 L 0 0 0 24" fill="none" stroke="white" strokeWidth="0.5" opacity="0.04" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>
    );
  }

  if (type === "circles") {
    return (
      <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="circles" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
            <circle cx="20" cy="20" r="3" fill="white" opacity="0.04" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#circles)" />
      </svg>
    );
  }

  if (type === "mesh") {
    return (
      <svg className="absolute inset-0 w-full h-full opacity-[0.04]" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="mesh" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
            <line x1="0" y1="0" x2="40" y2="40" stroke="white" strokeWidth="0.5" />
            <line x1="40" y1="0" x2="0" y2="40" stroke="white" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#mesh)" />
      </svg>
    );
  }

  return null;
}

/* ─── ──────────────────────────────────────────────────
   Featured Badge
   ────────────────────────────────────────────────── */
function FeaturedBadge({ label, accent }: { label: string; accent: string }) {
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-[0.12em] border"
      style={{
        background: `linear-gradient(135deg, ${accent}25, ${accent}10)`,
        borderColor: `${accent}30`,
        color: accent,
      }}
    >
      <Sparkles className="w-3 h-3" />
      {label}
    </motion.span>
  );
}

/* ═══════════════════════════════════════════════════════════════
   PREMIUM PRODUCT CARD
   ═══════════════════════════════════════════════════════════════ */
interface Props {
  product: Product;
  index: number;
  onSelect?: (product: Product) => void;
  size?: "small" | "medium" | "large";
}

export default function PremiumProductCard({ product, index, onSelect, size = "medium" }: Props) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });

  const meta = productMetaOverlays[product.slug];

  const bannerGradient = meta?.bannerGradient || `linear-gradient(135deg, ${product.accent}20, ${product.accent}05)`;
  const pattern = meta?.bannerPattern;
  const featuredBadge = meta?.featuredBadge;

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height,
    });
  }, []);

  // Masonry sizing
  const isLarge = size === "large";
  const isSmall = size === "small";

  const handleClick = () => {
    onSelect?.(product);
  };

  // Status config
  const status = STATUS_STYLES[product.status] || STATUS_STYLES["in-development"];

  // External URL
  const externalUrl = product.links.find((l) => l.url && l.url !== "#")?.url ?? null;
  const playStoreUrl = product.links.find((l) => /play|store/i.test(l.label))?.url;
  const githubUrl = product.links.find((l) => /github/i.test(l.label))?.url;
  const websiteUrl = product.links.find((l) => /website|visit|explore/i.test(l.label))?.url;

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ delay: Math.min(index * 0.035, 0.4), duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => { setIsHovered(false); setMousePos({ x: 0.5, y: 0.5 }); }}
      onMouseMove={handleMouseMove}
      onClick={handleClick}
      className={cn(
        "group relative cursor-pointer rounded-[24px] overflow-hidden bg-white border transition-all duration-500 select-none",
        isLarge ? "row-span-2" : "",
        isSmall ? "" : ""
      )}
      style={{
        borderColor: isHovered ? `${product.accent}25` : "#EBE8E0",
        boxShadow: isHovered
          ? `0 24px 80px ${product.accent}18, 0 8px 24px ${product.accent}0A, 0 2px 6px rgba(0,0,0,0.04)`
          : "0 1px 3px rgba(0,0,0,0.03), 0 4px 12px rgba(0,0,0,0.02)",
      }}
    >
      {/* ─── Hover spotlight following mouse ─── */}
      <motion.div
        className="absolute inset-0 pointer-events-none z-[1] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `radial-gradient(circle at ${mousePos.x * 100}% ${mousePos.y * 100}%, ${product.accent}0A 0%, transparent 60%)`,
        }}
      />

      {/* ─── BANNER SECTION ─── */}
      <div className="relative h-[180px] md:h-[200px] overflow-hidden" style={{ background: bannerGradient }}>
        <BannerPattern type={pattern} accent={product.accent} />

        {/* Glow orbs */}
        <div
          className="absolute -top-10 -right-10 w-40 h-40 rounded-full opacity-30"
          style={{ background: `radial-gradient(circle, ${product.accent}30, transparent 70%)` }}
        />
        <div
          className="absolute -bottom-10 -left-10 w-32 h-32 rounded-full opacity-20"
          style={{ background: `radial-gradient(circle, ${product.accent}20, transparent 70%)` }}
        />

        {/* Logo */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          animate={{ scale: isHovered ? 1.08 : 1 }}
          transition={{ duration: 0.4, ease: [0.19, 1, 0.22, 1] }}
        >
          <div
            className="relative w-[80px] h-[80px] md:w-[96px] md:h-[96px] rounded-[20px] overflow-hidden flex items-center justify-center backdrop-blur-sm"
            style={{
              background: `rgba(255,255,255,0.08)`,
              boxShadow: `0 8px 32px rgba(0,0,0,0.3), 0 0 0 1px rgba(255,255,255,0.06)`,
            }}
          >
            <Image
              src={product.logo}
              alt={`${product.name} logo`}
              width={80}
              height={80}
              className="w-[70%] h-[70%] object-contain"
              priority={index < 8}
            />
          </div>
        </motion.div>

        {/* Featured badge */}
        {featuredBadge && (
          <div className="absolute top-3 left-3 z-10">
            <FeaturedBadge label={featuredBadge} accent={product.accent} />
          </div>
        )}

        {/* Status badge */}
        <div className="absolute top-3 right-3 z-10">
          <span
            className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-[0.08em] backdrop-blur-sm"
            style={{ background: status.bg, color: status.text, border: `1px solid ${status.text}20` }}
          >
            {product.status === "published" && <span className="w-1.5 h-1.5 rounded-full" style={{ background: status.text }} />}
            {status.label}
          </span>
        </div>
      </div>

      {/* ─── CONTENT SECTION ─── */}
      <div className="relative z-[2] p-4 md:p-5">
        {/* Category */}
        <div className="flex items-center justify-between mb-1.5">
          <span
            className="text-[11px] font-bold uppercase tracking-[0.15em]"
            style={{ color: product.accent }}
          >
            {product.category}
          </span>
        </div>

        {/* Product Name */}
        <h3 className="text-lg md:text-xl font-bold tracking-tight text-[#1C1C1C] leading-tight mb-1">
          {product.name}
        </h3>

        {/* Tagline */}
        <p className="text-sm text-[#6B6B6B] leading-relaxed line-clamp-2 mb-3">
          {product.tagline}
        </p>

        {/* Metrics row */}
        <div className="flex items-center gap-3 mb-3">
          {product.rating && (
            <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#6B6B6B]">
              <Star className="w-3.5 h-3.5 fill-[#FBBF24] text-[#FBBF24]" />
              {product.rating}
            </span>
          )}
          {product.downloads && (
            <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#6B6B6B]">
              <Download className="w-3.5 h-3.5" />
              {product.downloads}
            </span>
          )}
        </div>

        {/* Tech Stack - icons */}
        <motion.div
          className="flex flex-wrap gap-1.5 mb-3"
          animate={{ opacity: 1 }}
        >
          {product.techStack.slice(0, 4).map((tech, i) => (
            <motion.span
              key={tech}
              initial={{ opacity: 0, y: 6 }}
              animate={isHovered ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
              transition={{ delay: isHovered ? 0.05 * i : 0, duration: 0.3 }}
              className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium border"
              style={{
                borderColor: `${product.accent}12`,
                backgroundColor: `${product.accent}06`,
                color: "#6B6B6B",
              }}
            >
              <span className="text-[11px]">{getTechIcon(tech)}</span>
              {tech}
            </motion.span>
          ))}
        </motion.div>

        {/* ─── FOOTER / ACTIONS ─── */}
        <div className="flex items-center justify-between pt-3 border-t" style={{ borderColor: "#EBE8E0" }}>
          <motion.span
            className="inline-flex items-center gap-1.5 text-sm font-semibold transition-all duration-300"
            style={{ color: product.accent }}
            animate={{ gap: isHovered ? "8px" : "6px" }}
          >
            <span>View Details</span>
            <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </motion.span>

          <motion.div
            className="flex items-center gap-1.5"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.25 }}
          >
            {playStoreUrl && (
              <a
                href={playStoreUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="w-7 h-7 rounded-full flex items-center justify-center hover:bg-[#F4F1EC] transition-all duration-200"
                title="Google Play"
              >
                <Play className="w-3.5 h-3.5 text-[#6B6B6B]" />
              </a>
            )}
            {websiteUrl && (
              <a
                href={websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="w-7 h-7 rounded-full flex items-center justify-center hover:bg-[#F4F1EC] transition-all duration-200"
                title="Website"
              >
                <Globe className="w-3.5 h-3.5 text-[#6B6B6B]" />
              </a>
            )}
            {githubUrl && (
              <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="w-7 h-7 rounded-full flex items-center justify-center hover:bg-[#F4F1EC] transition-all duration-200"
                title="GitHub"
              >
                <Github className="w-3.5 h-3.5 text-[#6B6B6B]" />
              </a>
            )}
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
