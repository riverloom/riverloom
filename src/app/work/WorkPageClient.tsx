"use client";

import { useState, useRef, useMemo, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { Sparkles, Search, X } from "lucide-react";
import { products, type Product } from "@/data/products";
import { categories } from "@/data/categories";
import { categoryAccentMap } from "@/data/productMeta";
import PremiumProductCard from "@/components/work/PremiumProductCard";
import ProductDetailModal from "@/components/work/ProductDetailModal";
import FloatingPreview from "@/components/work/FloatingPreview";
import GlassCategoryChips from "@/components/work/GlassCategoryChips";
import SearchBar from "@/components/work/SearchBar";
import type { ChipItem } from "@/components/work/GlassCategoryChips";

/* ─── ──────────────────────────────────────────────────
   ANIMATED COUNTER
   ────────────────────────────────────────────────── */
function AnimatedCounter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const [display, setDisplay] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  useEffect(() => {
    if (!isInView) return;
    const duration = 1500;
    const steps = 30;
    const inc = value / steps;
    let cur = 0;
    let step = 0;
    const interval = setInterval(() => {
      step++;
      cur = Math.min(inc * step, value);
      setDisplay(Math.round(cur));
      if (step >= steps) clearInterval(interval);
    }, duration / steps);
    return () => clearInterval(interval);
  }, [isInView, value]);

  return (
    <div ref={ref} className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-[#1C1C1C]">
      <span className="bg-gradient-to-r from-[#169B62] to-[#1FC77E] bg-clip-text text-transparent">{display}{suffix}</span>
    </div>
  );
}

/* ─── ──────────────────────────────────────────────────
   HERO
   ────────────────────────────────────────────────── */
function StudioHero() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section ref={ref} className="relative pt-36 pb-16 md:pt-44 md:pb-20 overflow-hidden z-10">
      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[5%] left-[5%] w-[500px] h-[500px] rounded-full bg-[#169B62]/5 blur-[120px] animate-pulse-glow" />
        <div className="absolute bottom-[10%] right-[5%] w-[400px] h-[400px] rounded-full bg-[#169B62]/4 blur-[100px]" />
        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' xmlns='http://www.w3.org/2000/svg'%3E%3Cline x1='0' y1='0' x2='40' y2='0' stroke='%23169B62' strokeWidth='0.5'/%3E%3Cline x1='0' y1='0' x2='0' y2='40' stroke='%23169B62' strokeWidth='0.5'/%3E%3C/svg%3E")`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="container-main relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <span className="badge-premium text-xs tracking-[0.12em] uppercase font-semibold inline-flex mb-6">
              <span className="w-[5px] h-[5px] rounded-full bg-[#169B62] mr-2 animate-pulse" />
              Premium Product Studio
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.7, ease: [0.19, 1, 0.22, 1] }}
            className="text-[clamp(40px,5.5vw,72px)] font-bold leading-[1.04] tracking-[-0.03em] text-[#1C1C1C] mb-6"
          >
            Products crafted with <br />
            <span className="bg-gradient-to-r from-[#169B62] to-[#1FC77E] bg-clip-text text-transparent">
              precision, shipped with purpose.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-lg md:text-xl leading-relaxed text-[#9E9E9E] max-w-2xl mx-auto"
          >
            Every product we build is engineered with the same commitment to quality,
            from enterprise platforms to casual games — explore our full ecosystem.
          </motion.p>
        </div>
      </div>
    </section>
  );
}

/* ─── ──────────────────────────────────────────────────
   STATISTICS
   ────────────────────────────────────────────────── */
function StudioStats() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  const stats = [
    { value: products.length, suffix: "+", label: "Products" },
    { value: categories.length, suffix: "+", label: "Categories" },
    { value: 100, suffix: "K+", label: "Global Downloads" },
    { value: products.filter((p) => p.status === "published").length, suffix: "+", label: "Published Apps" },
  ];

  return (
    <div ref={ref} className="container-main mb-16 z-10 relative">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
        className="relative overflow-hidden rounded-[24px] border bg-white p-6 md:p-8"
        style={{ borderColor: "#E7E2D8" }}
      >
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-[#E8F7EF]/40 to-transparent opacity-50" />
        <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + i * 0.08, duration: 0.4 }}
              className="text-center"
            >
              <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              <div className="text-xs md:text-sm font-medium text-[#9E9E9E] mt-1 uppercase tracking-[0.08em]">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

/* ─── ──────────────────────────────────────────────────
   MASONRY GRID
   ────────────────────────────────────────────────── */
type CardSize = "small" | "medium" | "large";

function getCardSize(index: number): CardSize {
  // Creates a masonry-like rhythm: large, medium, small, medium, medium, large...
  const pattern: CardSize[] = ["large", "medium", "small", "medium", "medium", "large", "small", "medium"];
  return pattern[index % pattern.length];
}

interface MasonryRow {
  items: Product[];
  rowIndex: number;
  columnCount: number;
  offset: number;
}

function buildMasonry(products: Product[], columns: number): MasonryRow[] {
  const rows: MasonryRow[] = [];
  for (let i = 0; i < products.length; i += columns) {
    const rowItems = products.slice(i, i + columns);
    rows.push({
      items: rowItems,
      rowIndex: rows.length,
      columnCount: columns,
      offset: rows.length % 2 === 0 ? 0 : 1, // slight visual offset for alternating rows
    });
  }
  return rows;
}

/* ═══════════════════════════════════════════════════════════════
   PRODUCT GALLERY
   ═══════════════════════════════════════════════════════════════ */
function ProductGallery() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  const [activeFilter, setActiveFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);

  // Floating preview state
  const [previewProduct, setPreviewProduct] = useState<Product | null>(null);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewPos, setPreviewPos] = useState({ x: 0, y: 0 });
  const hoverTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [columns, setColumns] = useState(3);

  // Responsive detection
  useEffect(() => {
    const check = () => {
      const w = window.innerWidth;
      setIsMobile(w < 768);
      if (w < 640) setColumns(1);
      else if (w < 1024) setColumns(2);
      else setColumns(3);
    };
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Category filter chips
  const filterItems: ChipItem[] = useMemo(() => {
    const catFilters = categories.map((c) => ({
      key: c.slug,
      label: c.name,
      icon: c.icon,
      count: products.filter(
        (p) => p.categorySlug === c.slug || p.category.toLowerCase().replace(/\s+/g, "-") === c.slug
      ).length,
    }));
    return [
      { key: "all", label: "All Products", icon: "✦", count: products.length },
      ...catFilters,
    ];
  }, []);

  // Filtered products
  const filtered = useMemo(() => {
    let list = products;
    if (activeFilter !== "all") {
      // Check if activeFilter is a status key
      if (activeFilter === "published") {
        list = list.filter((p) => p.status === "published");
      } else if (activeFilter === "coming-soon") {
        list = list.filter((p) => p.status === "coming-soon" || p.status === "in-development");
      } else {
        // Category filter
        list = list.filter(
          (p) =>
            p.categorySlug === activeFilter ||
            p.category.toLowerCase().replace(/\s+/g, "-") === activeFilter
        );
      }
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.tagline?.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.techStack.some((t) => t.toLowerCase().includes(q))
      );
    }
    return list;
  }, [activeFilter, search]);

  // Build masonry rows only for desktop 3-column
  const masonryRows = useMemo(() => {
    if (columns < 3) return null; // fallback to simple grid
    return buildMasonry(filtered, 3);
  }, [filtered, columns]);

  // Handle card selection (open modal)
  const handleSelect = useCallback((product: Product) => {
    setSelectedProduct(product);
    setDetailOpen(true);
  }, []);

  // Close modal
  const handleCloseDetail = useCallback(() => {
    setDetailOpen(false);
    setTimeout(() => setSelectedProduct(null), 300);
  }, []);

  // Floating preview handlers
  const handleCardHover = useCallback((product: Product, e: React.MouseEvent) => {
    if (isMobile) return;
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    setPreviewProduct(product);
    setPreviewPos({ x: e.clientX, y: e.clientY });
    hoverTimeoutRef.current = setTimeout(() => setPreviewVisible(true), 300);
  }, [isMobile]);

  const handleCardLeave = useCallback(() => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    setPreviewVisible(false);
    hoverTimeoutRef.current = setTimeout(() => setPreviewProduct(null), 150);
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    setPreviewPos({ x: e.clientX, y: e.clientY });
  }, []);

  // Cleanup timeout
  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    };
  }, []);

  // Status counts
  const publishedCount = products.filter(p => p.status === "published").length;
  const comingSoonCount = products.filter(p => p.status === "coming-soon" || p.status === "in-development").length;

  return (
    <>
      <section ref={sectionRef} className="pb-16 md:pb-24 z-10 relative">
        {/* ─── SECTION HEADER ─── */}
        <div className="container-main mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            
            <h2 className="text-[clamp(28px,3.5vw,44px)] font-bold tracking-[-0.03em] text-[#1C1C1C] mt-3">
              Every Product We've Built
            </h2>
            <p className="text-base text-[#9E9E9E] max-w-xl mx-auto mt-2">
              {products.length} products across {categories.length} categories — interact with any card to explore.
            </p>
          </motion.div>

          {/* Search */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.4 }}
            className="mt-6"
          >
            <SearchBar
              value={search}
              onChange={setSearch}
              placeholder="Search products by name, tech, or description..."
            />
          </motion.div>

          {/* Category chips */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.15, duration: 0.4 }}
            className="mt-5"
          >
            <GlassCategoryChips
              items={filterItems}
              activeKey={activeFilter}
              onSelect={setActiveFilter}
              accentMap={categoryAccentMap}
            />
          </motion.div>

          {/* Secondary status filters — glass pills */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.4 }}
            className="flex items-center justify-center gap-2 mt-4"
          >
            {[
              { key: "published", label: `Published`, icon: "✓", accent: "#22C55E", count: publishedCount },
              { key: "coming-soon", label: "Coming Soon", icon: "⏳", accent: "#FBBF24", count: comingSoonCount },
            ].map((f) => {
              const isActive = activeFilter === f.key;
              return (
                <motion.button
                  key={f.key}
                  onClick={() => setActiveFilter(isActive ? "all" : f.key)}
                  whileHover={{ scale: 1.03, y: -1 }}
                  whileTap={{ scale: 0.97 }}
                  className="relative inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-semibold tracking-wide transition-all duration-300 overflow-hidden"
                  style={{
                    background: isActive
                      ? `linear-gradient(135deg, ${f.accent}, ${f.accent}dd)`
                      : "rgba(255,255,255,0.6)",
                    borderColor: isActive ? "transparent" : "#EBE8E0",
                    color: isActive ? "#fff" : "#6B6B6B",
                    borderWidth: 1,
                    borderStyle: "solid",
                    boxShadow: isActive ? `0 4px 16px ${f.accent}30` : "none",
                    backdropFilter: "blur(8px)",
                  }}
                >
                  {isActive && (
                    <motion.span
                      layoutId="statusGlow"
                      className="absolute inset-0 rounded-full"
                      style={{ background: `radial-gradient(ellipse at 50% 0%, rgba(255,255,255,0.2) 0%, transparent 70%)` }}
                    />
                  )}
                  <span className="relative z-10 text-[14px]">{f.icon}</span>
                  <span className="relative z-10">{f.label}</span>
                  <span
                    className="relative z-10 text-[10px] px-1.5 py-0.5 rounded-full font-bold"
                    style={{
                      background: isActive ? "rgba(255,255,255,0.2)" : "#F4F1EC",
                      color: isActive ? "#fff" : "#9E9E9E",
                    }}
                  >
                    {f.count}
                  </span>
                </motion.button>
              );
            })}
          </motion.div>
        </div>

        {/* ─── GRID ─── */}
        <div className="px-4 md:px-6 lg:px-8 mt-8 md:mt-10">
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 text-[#9E9E9E]">
              <Search className="w-12 h-12 mb-4 opacity-40" />
              <p className="text-lg font-semibold">No products found</p>
              <p className="text-sm mt-1">Try adjusting your search or filter</p>
            </div>
          ) : columns >= 3 && masonryRows ? (
            /* ─── 3-COLUMN EQUAL-WIDTH CARDS ─── */
            <div className="max-w-[1280px] mx-auto">
              {masonryRows.map((row) => (
                <div key={row.rowIndex} className="grid grid-cols-3 gap-4 md:gap-5 mb-4 md:mb-5">
                  {row.items.map((product, colIndex) => {
                    const globalIndex = row.rowIndex * row.columnCount + colIndex;
                    return (
                      <div
                        key={product.id}
                        onMouseEnter={(e) => handleCardHover(product, e)}
                        onMouseLeave={handleCardLeave}
                        onMouseMove={handleMouseMove}
                      >
                        <PremiumProductCard
                          product={product}
                          index={globalIndex}
                          onSelect={handleSelect}
                          size="medium"
                        />
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          ) : (
            /* ─── FALLBACK: SIMPLE GRID (1-2 columns) ─── */
            <div
              className="grid gap-4 md:gap-5 mx-auto"
              style={{
                gridTemplateColumns: columns === 1 ? "1fr" : "repeat(2, 1fr)",
                maxWidth: columns === 1 ? "480px" : "800px",
              }}
            >
              {filtered.map((product, i) => (
                <div
                  key={product.id}
                  onMouseEnter={(e) => handleCardHover(product, e)}
                  onMouseLeave={handleCardLeave}
                  onMouseMove={handleMouseMove}
                >
                  <PremiumProductCard
                    product={product}
                    index={i}
                    onSelect={handleSelect}
                    size="medium"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ─── BOTTOM STATS ─── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          className="container-main pt-12 text-center"
        >
          <p className="text-sm text-[#9E9E9E]">
            Showing {filtered.length} of {products.length} products
          </p>
        </motion.div>
      </section>

      {/* ─── FLOATING PREVIEW ─── */}
      <FloatingPreview
        product={previewProduct}
        isVisible={previewVisible}
        mouseX={previewPos.x}
        mouseY={previewPos.y}
      />

      {/* ─── DETAIL MODAL ─── */}
      <ProductDetailModal
        product={selectedProduct}
        isOpen={detailOpen}
        onClose={handleCloseDetail}
      />
    </>
  );
}

/* ═══════════════════════════════════════════════════════════════
   PAGE
   ═══════════════════════════════════════════════════════════════ */
export default function WorkPageClient() {
  return (
    <>
      {/* ═══ BACKGROUND PARTICLES ═══ */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden z-0">
        {Array.from({ length: 15 }, (_, i) => {
          const x = Math.sin(i * 127.1) * 0.5 + 0.5;
          const y = Math.cos(i * 269.5) * 0.5 + 0.5;
          const s = Math.sin(i * 93.3) * 1.5 + 2.5;
          const d = Math.abs(Math.sin(i * 47.1) * 6 + 10);
          return (
            <motion.div
              key={i}
              className="absolute rounded-full bg-[#169B62]"
              style={{
                width: s,
                height: s,
                left: `${x * 100}%`,
                top: `${y * 100}%`,
                opacity: 0.02,
              }}
              animate={{ y: [0, -(s * 4), 0], x: [0, (i % 2 === 0 ? 1 : -1) * s * 3, 0] }}
              transition={{ duration: d, repeat: Infinity, ease: "easeInOut" }}
            />
          );
        })}
      </div>

      {/* ═══ SECTIONS ═══ */}
      <StudioHero />
      <StudioStats />
      <ProductGallery />
    </>
  );
}
