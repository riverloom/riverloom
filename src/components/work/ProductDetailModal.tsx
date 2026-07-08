"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowUpRight, Play, Globe, Github, ChevronLeft, Sparkles, Clock, Star, Download, CheckCircle2, Cpu } from "lucide-react";
import type { Product } from "@/data/products";
import { productMetaOverlays /*, fix: import the rest*/ } from "@/data/productMeta";
import { cn } from "@/lib/utils";

/* ─── Status config ─── */
const STATUS_CONFIG: Record<string, { label: string; bg: string; border: string; text: string }> = {
  published: { label: "Published", bg: "rgba(34,197,94,0.12)", border: "rgba(34,197,94,0.3)", text: "#22C55E" },
  "coming-soon": { label: "Coming Soon", bg: "rgba(251,191,36,0.12)", border: "rgba(251,191,36,0.3)", text: "#FBBF24" },
  "in-development": { label: "In Development", bg: "rgba(96,165,250,0.12)", border: "rgba(96,165,250,0.3)", text: "#60A5FA" },
};

const getStatusConfig = (status: string) => STATUS_CONFIG[status] || STATUS_CONFIG["in-development"];

/* ─── Feature row icon map ─── */
const featureIconMap = [Sparkles, Clock, CheckCircle2, Cpu, Download, Star];

function FeatureRow({ feature, index }: { feature: { title: string; description: string }; index: number }) {
  const Icon = featureIconMap[index % featureIconMap.length];
  return (
    <div className="flex gap-3">
      <div className="w-9 h-9 rounded-xl bg-white/5 flex items-center justify-center shrink-0 border border-white/[0.06]">
        <Icon className="w-4 h-4 text-white/60" />
      </div>
      <div>
        <p className="text-sm font-semibold text-white mb-0.5">{feature.title}</p>
        <p className="text-sm text-white/50 leading-relaxed">{feature.description}</p>
      </div>
    </div>
  );
}

/* ─── Link helpers ─── */
function getLink(product: Product, pattern: RegExp): string | undefined {
  return product.links?.find((l) => pattern.test(l.label))?.url;
}

/* ═══════════════════════════════════════════════════════════════
   PRODUCT DETAIL MODAL — App Store style
   ═══════════════════════════════════════════════════════════════ */
interface Props {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ProductDetailModal({ product, isOpen, onClose }: Props) {
  const [activeTab, setActiveTab] = useState<"overview" | "features" | "tech" | "timeline">("overview");
  const scrollRef = useRef<HTMLDivElement>(null);

  // Keyboard escape
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isOpen, onClose]);

  // Lock body scroll
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      return () => { document.body.style.overflow = ""; };
    }
  }, [isOpen]);

  // Reset scroll on product change
  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = 0;
    setActiveTab("overview");
  }, [product?.id]);

  if (!product) return null;

  const meta = productMetaOverlays[product.slug];
  const bannerGradient = meta?.bannerGradient || `linear-gradient(135deg, ${product.accent}30, ${product.accent}10)`;
  const pattern = meta?.bannerPattern;
  const sc = getStatusConfig(product.status);

  const playStoreUrl = getLink(product, /play|store/i);
  const websiteUrl = getLink(product, /website|visit|explore/i);
  const githubUrl = getLink(product, /github/i);

  const hasFeatures = product.features && product.features.length > 0;
  const hasTimeline = product.timeline && product.timeline.length > 0;
  const hasScreenshots = product.screenshots && product.screenshots.length > 0;

  const tabs = [
    { key: "overview" as const, label: "Overview" },
    ...(hasFeatures ? [{ key: "features" as const, label: "Features" }] : []),
    { key: "tech" as const, label: "Tech Stack" },
    ...(hasTimeline ? [{ key: "timeline" as const, label: "Timeline" }] : []),
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4 md:p-8"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/70 backdrop-blur-md"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ duration: 0.35, ease: [0.19, 1, 0.22, 1] }}
            className="relative w-full max-w-[800px] max-h-[85vh] bg-[#111111] rounded-[28px] overflow-hidden shadow-2xl flex flex-col"
            style={{ border: "1px solid rgba(255,255,255,0.06)" }}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-black/40 backdrop-blur-sm hover:bg-black/60 flex items-center justify-center text-white/60 hover:text-white transition-all duration-300 border border-white/10"
            >
              <X className="w-4 h-4" />
            </button>

            {/* ─── HERO BANNER ─── */}
            <div className="relative h-[200px] md:h-[260px] shrink-0 overflow-hidden" style={{ background: bannerGradient }}>
              {/* Pattern overlay */}
              {pattern && pattern !== "none" && (
                <div className="absolute inset-0 opacity-[0.08]">
                  {pattern === "dots" && (
                    <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                      <defs><pattern id="md-dots" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse"><circle cx="10" cy="10" r="1.5" fill="white"/></pattern></defs>
                      <rect width="100%" height="100%" fill="url(#md-dots)" />
                    </svg>
                  )}
                  {pattern === "grid" && (
                    <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                      <defs><pattern id="md-grid" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse"><path d="M24 0L0 0 0 24" fill="none" stroke="white" strokeWidth="0.5"/></pattern></defs>
                      <rect width="100%" height="100%" fill="url(#md-grid)" />
                    </svg>
                  )}
                  {pattern === "circles" && (
                    <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                      <defs><pattern id="md-circles" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse"><circle cx="20" cy="20" r="3" fill="white"/></pattern></defs>
                      <rect width="100%" height="100%" fill="url(#md-circles)" />
                    </svg>
                  )}
                  {pattern === "mesh" && (
                    <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                      <defs><pattern id="md-mesh" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse"><line x1="0" y1="0" x2="40" y2="40" stroke="white" strokeWidth="0.5"/><line x1="40" y1="0" x2="0" y2="40" stroke="white" strokeWidth="0.5"/></pattern></defs>
                      <rect width="100%" height="100%" fill="url(#md-mesh)" />
                    </svg>
                  )}
                </div>
              )}

              {/* Glow orbs */}
              <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full opacity-20" style={{ background: `radial-gradient(circle, ${product.accent}, transparent 70%)` }} />
              <div className="absolute -bottom-10 -left-10 w-48 h-48 rounded-full opacity-15" style={{ background: `radial-gradient(circle, ${product.accent}80, transparent 70%)` }} />

              {/* Logo */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/3 z-10">
                <div
                  className="w-[88px] h-[88px] md:w-[104px] md:h-[104px] rounded-[22px] overflow-hidden flex items-center justify-center backdrop-blur-sm"
                  style={{
                    background: "rgba(255,255,255,0.08)",
                    boxShadow: "0 12px 40px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.06)",
                  }}
                >
                  <Image src={product.logo} alt={`${product.name} logo`} width={80} height={80} className="w-[70%] h-[70%] object-contain" priority />
                </div>
              </div>
            </div>

            {/* ─── CONTENT ─── */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto px-6 md:px-8 pt-16 pb-8 scrollbar-thin">
              {/* Name + Status */}
              <div className="text-center mb-6">
                <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">{product.name}</h2>
                {product.tagline && <p className="text-sm text-white/50 mt-1 max-w-lg mx-auto">{product.tagline}</p>}
                <div className="flex items-center justify-center gap-3 mt-3 flex-wrap">
                  <span className="text-xs text-white/40 uppercase tracking-[0.12em] font-semibold" style={{ color: product.accent }}>
                    {product.category}
                  </span>
                  <span className="w-1 h-1 rounded-full bg-white/20" />
                  <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-xs font-semibold border" style={{ background: sc.bg, borderColor: sc.border, color: sc.text }}>
                    {product.status === "published" && <span className="w-1.5 h-1.5 rounded-full" style={{ background: sc.text }} />}
                    {sc.label}
                  </span>
                </div>
              </div>

              {/* Metrics row */}
              <div className="flex items-center justify-center gap-5 mb-6">
                {product.rating && (
                  <span className="inline-flex items-center gap-1.5 text-sm text-white/70">
                    <Star className="w-4 h-4 fill-[#FBBF24] text-[#FBBF24]" />
                    <span className="font-semibold">{product.rating}</span>
                  </span>
                )}
                {product.downloads && (
                  <span className="inline-flex items-center gap-1.5 text-sm text-white/70">
                    <Download className="w-4 h-4" />
                    <span className="font-semibold">{product.downloads}</span>
                  </span>
                )}
              </div>

              {/* Description */}
              <p className="text-sm md:text-[15px] text-white/60 leading-relaxed max-w-2xl mx-auto text-center mb-6">
                {product.description}
              </p>

              {/* ─── TABS ─── */}
              <div className="flex justify-center gap-1 mb-6 p-1 rounded-xl bg-white/5 border border-white/[0.06] w-fit mx-auto">
                {tabs.map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key)}
                    className={cn(
                      "px-4 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-[0.08em] transition-all duration-300",
                      activeTab === tab.key
                        ? "bg-white/10 text-white"
                        : "text-white/40 hover:text-white/70"
                    )}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* ─── TAB CONTENT ─── */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${product.id}-${activeTab}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  {/* Overview */}
                  {activeTab === "overview" && (
                    <div className="max-w-2xl mx-auto space-y-5">
                      {/* Full description */}
                      {product.longDescription && (
                        <div>
                          <h4 className="text-sm font-semibold text-white/40 uppercase tracking-[0.1em] mb-2">About</h4>
                          <p className="text-sm text-white/70 leading-relaxed">{product.longDescription}</p>
                        </div>
                      )}

                      {/* Audience */}
                      {product.audience && (
                        <div>
                          <h4 className="text-sm font-semibold text-white/40 uppercase tracking-[0.1em] mb-2">For</h4>
                          <p className="text-sm text-white/70 leading-relaxed">{product.audience}</p>
                        </div>
                      )}

                      {/* Outcome */}
                      {product.outcome && (
                        <div>
                          <h4 className="text-sm font-semibold text-white/40 uppercase tracking-[0.1em] mb-2">Impact</h4>
                          <p className="text-sm text-white/70 leading-relaxed">{product.outcome}</p>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Features */}
                  {activeTab === "features" && hasFeatures && (
                    <div className="max-w-2xl mx-auto space-y-4">
                      {product.features.map((f, i) => (
                        <FeatureRow key={f.title} feature={f} index={i} />
                      ))}
                    </div>
                  )}

                  {/* Tech Stack */}
                  {activeTab === "tech" && (
                    <div className="max-w-2xl mx-auto">
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {product.techStack.map((tech) => (
                          <div
                            key={tech}
                            className="px-4 py-3 rounded-xl bg-white/5 border border-white/[0.06] text-center"
                          >
                            <span className="text-sm font-medium text-white/80">{tech}</span>
                          </div>
                        ))}
                      </div>
                      {product.platforms && product.platforms.length > 0 && (
                        <div className="mt-6">
                          <h4 className="text-sm font-semibold text-white/40 uppercase tracking-[0.1em] mb-3">Platforms</h4>
                          <div className="flex flex-wrap gap-2">
                            {product.platforms.map((p) => (
                              <span key={p} className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/[0.06] text-xs font-medium text-white/60 capitalize">
                                {p}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                      {product.architecture && (
                        <div className="mt-6">
                          <h4 className="text-sm font-semibold text-white/40 uppercase tracking-[0.1em] mb-2">Architecture</h4>
                          <p className="text-sm text-white/70 leading-relaxed">{product.architecture}</p>
                        </div>
                      )}
                      {product.challenges && (
                        <div className="mt-4">
                          <h4 className="text-sm font-semibold text-white/40 uppercase tracking-[0.1em] mb-2">Challenges</h4>
                          <p className="text-sm text-white/70 leading-relaxed">{product.challenges}</p>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Timeline */}
                  {activeTab === "timeline" && hasTimeline && (
                    <div className="max-w-2xl mx-auto relative pl-8">
                      {/* Vertical line */}
                      <div className="absolute left-3 top-2 bottom-2 w-px bg-white/[0.06]" />
                      <div className="space-y-6">
                        {product.timeline.map((t, i) => (
                          <div key={t.phase} className="relative">
                            <div className="absolute -left-[23px] top-1.5 w-[10px] h-[10px] rounded-full border-2" style={{ borderColor: product.accent, background: "#111" }} />
                            <div>
                              <span className="text-xs font-bold uppercase tracking-[0.12em]" style={{ color: product.accent }}>
                                {t.phase}
                              </span>
                              <p className="text-sm text-white/60 mt-0.5">{t.description}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>

              {/* ─── CTA BUTTONS ─── */}
              <div className="flex flex-wrap items-center justify-center gap-3 mt-8 pt-6 border-t border-white/[0.06]">
                {playStoreUrl && (
                  <a
                    href={playStoreUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2.5 px-6 py-3 rounded-xl font-semibold text-sm text-white border border-white/20 hover:border-white/40 transition-all duration-300"
                    style={{
                      background: "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.03) 100%)",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "linear-gradient(135deg, #169B62 0%, #1FC77E 100%)";
                      e.currentTarget.style.borderColor = "transparent";
                      e.currentTarget.style.boxShadow = "0 8px 32px rgba(22,155,98,0.35)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.03) 100%)";
                      e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)";
                      e.currentTarget.style.boxShadow = "none";
                    }}
                  >
                    <Play className="w-4 h-4" />
                    <span>Google Play</span>
                    <ArrowUpRight className="w-3.5 h-3.5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                  </a>
                )}
                {websiteUrl && (
                  <a href={websiteUrl} target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-medium text-white/70 border border-white/10 hover:border-white/20 hover:text-white transition-all duration-300">
                    <Globe className="w-4 h-4" />
                    <span>Website</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                )}
                {githubUrl && (
                  <a href={githubUrl} target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-medium text-white/70 border border-white/10 hover:border-white/20 hover:text-white transition-all duration-300">
                    <Github className="w-4 h-4" />
                    <span>GitHub</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
