"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowUpRight, Play, Globe, Github, ChevronLeft, Sparkles, Clock, Lightbulb, CheckCircle2, Cpu } from "lucide-react";
import type { Product } from "@/data/products";
import { cn } from "@/lib/utils";

/* ─── ──────────────────────────────────────────────────
   Helpers
   ────────────────────────────────────────────────── */
function getLink(product: Product, pattern: RegExp): string | undefined {
  return product.links?.find((l) => pattern.test(l.label))?.url;
}

const STATUS_CONFIG: Record<string, { label: string; bg: string; border: string; text: string }> = {
  published: { label: "Published", bg: "rgba(34,197,94,0.12)", border: "rgba(34,197,94,0.3)", text: "#22C55E" },
  "coming-soon": { label: "Coming Soon", bg: "rgba(251,191,36,0.12)", border: "rgba(251,191,36,0.3)", text: "#FBBF24" },
  "in-development": { label: "In Development", bg: "rgba(96,165,250,0.12)", border: "rgba(96,165,250,0.3)", text: "#60A5FA" },
};

const getStatusConfig = (status: string) => STATUS_CONFIG[status] || STATUS_CONFIG["in-development"];

/* ─── ──────────────────────────────────────────────────
   Feature Item
   ────────────────────────────────────────────────── */
const featureIcons = [Sparkles, Clock, Lightbulb, CheckCircle2, Cpu];

function FeatureRow({ feature, index }: { feature: { title: string; description: string }; index: number }) {
  const Icon = featureIcons[index % featureIcons.length];
  return (
    <div className="flex gap-3 group">
      <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center shrink-0 border border-white/5 group-hover:bg-white/10 group-hover:border-white/10 transition-all duration-300">
        <Icon className="w-4 h-4 text-white/60" />
      </div>
      <div>
        <p className="text-sm font-semibold text-white mb-0.5">{feature.title}</p>
        <p className="text-sm text-white/50 leading-relaxed">{feature.description}</p>
      </div>
    </div>
  );
}

/* ─── ──────────────────────────────────────────────────
   Screenshot Thumbnail
   ────────────────────────────────────────────────── */
function ScreenshotThumbnail({ src, onClick }: { src: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="group relative shrink-0 w-[180px] h-[320px] rounded-xl overflow-hidden border border-white/10 hover:border-white/30 transition-all duration-300"
    >
      <Image
        src={src}
        alt="Product screenshot"
        fill
        className="object-cover transition-transform duration-500 group-hover:scale-105"
        sizes="180px"
      />
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300" />
    </button>
  );
}

/* ─── ──────────────────────────────────────────────────
   Lightbox
   ────────────────────────────────────────────────── */
function Lightbox({ src, onClose }: { src: string; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-[99999] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 md:p-10"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-all duration-300 z-10"
        aria-label="Close lightbox"
      >
        <X className="w-5 h-5" />
      </button>
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ duration: 0.3, ease: [0.19, 1, 0.22, 1] }}
        className="relative max-w-4xl max-h-[85vh] w-full h-full"
        onClick={(e) => e.stopPropagation()}
      >
        <Image src={src} alt="Screenshot full view" fill className="object-contain" sizes="(max-width: 1280px) 100vw, 1280px" priority />
      </motion.div>
    </motion.div>
  );
}

/* ─── ──────────────────────────────────────────────────
   Action Button
   ────────────────────────────────────────────────── */
function ActionButton({ label, url, icon: Icon, primary = true }: {
  label: string;
  url: string;
  icon: React.ElementType;
  primary?: boolean;
}) {
  if (!url || url === "#") return null;
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "group relative inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl font-semibold text-sm overflow-hidden transition-all duration-400 border",
        primary
          ? "text-white border-white/20 hover:border-white/40"
          : "text-white/70 border-white/10 hover:border-white/20 hover:text-white"
      )}
      style={{ background: primary ? "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.03) 100%)" : "transparent" }}
      onMouseEnter={(e) => {
        if (!primary) return;
        e.currentTarget.style.background = "linear-gradient(135deg, #169B62 0%, #1FC77E 100%)";
        e.currentTarget.style.borderColor = "transparent";
        e.currentTarget.style.boxShadow = "0 8px 32px rgba(22,155,98,0.35)";
      }}
      onMouseLeave={(e) => {
        if (!primary) return;
        e.currentTarget.style.background = "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.03) 100%)";
        e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      <Icon className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      <span>{label}</span>
      <ArrowUpRight className="w-3.5 h-3.5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
    </a>
  );
}

/* ══════════════════════════════════════════════════
   MAIN — Detail Panel
   ══════════════════════════════════════════════════ */
interface Props {
  product: Product;
  onClose: () => void;
}

export default function ExploreDetailPanel({ product, onClose }: Props) {
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (lightboxImage) setLightboxImage(null);
        else onClose();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [lightboxImage, onClose]);

  // Lock body scroll when panel is open on mobile
  useEffect(() => {
    if (isMobile) {
      document.body.style.overflow = "hidden";
      return () => { document.body.style.overflow = ""; };
    }
  }, [isMobile]);

  const playStoreUrl = getLink(product, /play|store/i);
  const websiteUrl = getLink(product, /website|visit|explore/i);
  const demoUrl = getLink(product, /demo|live|open/i);
  const hasScreenshots = product.screenshots && product.screenshots.length > 0;
  const hasFeatures = product.features && product.features.length > 0;
  const sc = getStatusConfig(product.status);

  const content = (
    <div ref={scrollRef} className="h-full overflow-y-auto overflow-x-hidden scrollbar-thin">
      {/* Mobile pull handle */}
      {isMobile && (
        <div className="flex justify-center pt-3 pb-1">
          <div className="w-9 h-1 rounded-full bg-white/20" />
        </div>
      )}

      {/* Close header */}
      <div className={cn("flex items-center px-5", isMobile ? "pt-2 pb-2" : "pt-5 pb-4")}>
        <button
          onClick={onClose}
          className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/15 flex items-center justify-center text-white/60 hover:text-white transition-all duration-300"
          aria-label="Close detail panel"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <span className="ml-2 text-xs text-white/30 font-medium uppercase tracking-wider">Details</span>
      </div>

      {/* Logo */}
      <div className="flex justify-center px-5 mt-2 mb-5">
        <div
          className="w-[100px] h-[100px] rounded-2xl overflow-hidden flex items-center justify-center border"
          style={{ borderColor: `${product.accent}30`, background: `${product.accent}10` }}
        >
          <Image src={product.logo} alt={`${product.name} logo`} width={80} height={80} className="w-full h-full object-contain" priority />
        </div>
      </div>

      {/* Name + Status */}
      <div className="px-5 mb-6 text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">{product.name}</h2>
        <p className="text-sm text-white/40 mt-1">{product.tagline}</p>
        <div className="flex justify-center mt-3">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-semibold border" style={{ background: sc.bg, borderColor: sc.border, color: sc.text }}>
            {product.status === "published" && (
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: sc.text, boxShadow: `0 0 4px ${sc.text}` }} />
            )}
            {sc.label}
          </span>
        </div>
      </div>

      <div className="mx-5 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-6" />

      {/* Description */}
      <div className="px-5 mb-6">
        <p className="text-sm text-white/70 leading-relaxed">{product.description}</p>
      </div>

      {/* Category + Tech + Platform */}
      <div className="px-5 mb-6">
        <span className="text-[11px] font-semibold text-white/30 uppercase tracking-[0.12em] block mb-2">Category</span>
        <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium border" style={{ background: `${product.accent}15`, borderColor: `${product.accent}25`, color: product.accent }}>
          {product.category}
        </span>

        {product.techStack && product.techStack.length > 0 && (
          <div className="mt-4">
            <span className="text-[11px] font-semibold text-white/30 uppercase tracking-[0.12em] block mb-2">Technology</span>
            <div className="flex flex-wrap gap-1.5">
              {product.techStack.map((tech) => (
                <span key={tech} className="inline-flex px-2.5 py-1 rounded-full text-[11px] font-medium bg-white/5 text-white/50 border border-white/5">{tech}</span>
              ))}
            </div>
          </div>
        )}

        {product.platforms && product.platforms.length > 0 && (
          <div className="mt-4">
            <span className="text-[11px] font-semibold text-white/30 uppercase tracking-[0.12em] block mb-2">Platform</span>
            <div className="flex flex-wrap gap-1.5">
              {product.platforms.map((p) => (
                <span key={p} className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-medium bg-white/5 text-white/50 border border-white/5">
                  {p === "web" && "🌐"}
                  {p === "mobile" && "📱"}
                  {p === "flutter" && "📱"}
                  {p === "nextjs" && "⚡"}
                  {p === "react" && "⚛️"}
                  {p === "react-native" && "📱"}
                  {p.charAt(0).toUpperCase() + p.slice(1)}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Features */}
      {hasFeatures && (
        <div className="px-5 mb-6">
          <span className="text-[11px] font-semibold text-white/30 uppercase tracking-[0.12em] block mb-3">Key Features</span>
          <div className="space-y-3">
            {product.features.slice(0, 4).map((f, i) => (
              <FeatureRow key={f.title} feature={f} index={i} />
            ))}
          </div>
        </div>
      )}

      {/* Screenshots */}
      {hasScreenshots && (
        <div className="mb-6">
          <span className="text-[11px] font-semibold text-white/30 uppercase tracking-[0.12em] block mb-3 px-5">Screenshots</span>
          <div className="flex gap-3 overflow-x-auto px-5 pb-2 hide-scrollbar">
            {product.screenshots.map((src, i) => (
              <ScreenshotThumbnail key={i} src={src} onClick={() => setLightboxImage(src)} />
            ))}
          </div>
        </div>
      )}

      {/* CTA Buttons */}
      <div className="px-5 pb-8 pt-2 space-y-2.5">
        {product.status === "published" && playStoreUrl && (
          <ActionButton label="Download on Google Play" url={playStoreUrl} icon={Play} primary />
        )}
        {websiteUrl && <ActionButton label="Visit Website" url={websiteUrl} icon={Globe} primary={!playStoreUrl} />}
        {demoUrl && websiteUrl && <ActionButton label="Open Live Demo" url={demoUrl} icon={ArrowUpRight} primary={false} />}
        {product.links.filter(l => /github/i.test(l.label)).map(l => (
          <ActionButton key={l.label} label="View on GitHub" url={l.url} icon={Github} primary={false} />
        ))}
        {product.status !== "published" && (
          <div className="text-center text-white/30 text-xs py-4">
            {product.status === "coming-soon" ? "Coming soon — stay tuned!" : "In development — follow for updates"}
          </div>
        )}
      </div>
    </div>
  );

  const panelVariants = {
    hidden: { opacity: 0, x: isMobile ? 0 : 60, y: isMobile ? 60 : 0 },
    visible: { opacity: 1, x: 0, y: 0, transition: { type: "spring" as any, damping: 25, stiffness: 200, mass: 0.8 } },
    exit: { opacity: 0, x: isMobile ? 0 : 60, y: isMobile ? 60 : 0, transition: { duration: 0.2, ease: "easeInOut" } },
  };

  const panelTransition = { type: "spring" as any, damping: 25, stiffness: 200, mass: 0.8 };
  const exitTransition = { duration: 0.2 };

  if (isMobile) {
    return (
      <>
        <AnimatePresence>
          {lightboxImage && <Lightbox src={lightboxImage} onClose={() => setLightboxImage(null)} />}
        </AnimatePresence>
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0, transition: panelTransition }}
          exit={{ opacity: 0, y: 60, transition: exitTransition }}
          className="fixed inset-x-0 bottom-0 z-[9999] h-[85vh] bg-[#1C1C1C] rounded-t-2xl shadow-2xl overflow-hidden"
          style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
        >
          {content}
        </motion.div>
      </>
    );
  }

  return (
    <>
      <AnimatePresence>
        {lightboxImage && <Lightbox src={lightboxImage} onClose={() => setLightboxImage(null)} />}
      </AnimatePresence>
      <motion.div
        initial={{ opacity: 0, x: 60 }}
        animate={{ opacity: 1, x: 0, transition: panelTransition }}
        exit={{ opacity: 0, x: 60, transition: exitTransition }}
        className="absolute right-0 top-0 bottom-0 w-[420px] z-10 bg-[#1C1C1C] shadow-2xl overflow-hidden"
        style={{ borderLeft: "1px solid rgba(255,255,255,0.06)" }}
      >
        {content}
      </motion.div>
    </>
  );
}
