"use client";

import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, Search, ChevronRight, Sparkles, ArrowRight } from "lucide-react";
import { products, type Product } from "@/data/products";
import { cn } from "@/lib/utils";
import dynamic from "next/dynamic";

const ExploreDetailPanel = dynamic(() => import("./ExploreDetailPanel"), {
  ssr: false,
  loading: () => null,
});

/* ─── ──────────────────────────────────────────────────
   Categories derived from product data
   ────────────────────────────────────────────────── */
interface CategoryFilter {
  slug: string;
  label: string;
  count: number;
}

function buildCategories(products: Product[]): CategoryFilter[] {
  const map = new Map<string, number>();
  products.forEach((p) => {
    const key = p.categorySlug || p.category.toLowerCase().replace(/\s+/g, "-");
    map.set(key, (map.get(key) || 0) + 1);
  });
  return Array.from(map.entries())
    .map(([slug, count]) => ({
      slug,
      label: products.find((p) => p.categorySlug === slug)?.category || slug,
      count,
    }))
    .sort((a, b) => b.count - a.count);
}

/* ─── ──────────────────────────────────────────────────
   Product Card (compact — logo + name only)
   ────────────────────────────────────────────────── */
function ProductCard({
  product,
  isSelected,
  onClick,
  index,
}: {
  product: Product;
  isSelected: boolean;
  onClick: () => void;
  index: number;
}) {
  return (
    <motion.button
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 8, scale: 0.95 }}
      transition={{ duration: 0.35, delay: Math.min(index * 0.02, 0.3), ease: [0.19, 1, 0.22, 1] }}
      onClick={onClick}
      className={cn(
        "group relative flex flex-col items-center justify-center rounded-2xl border p-5 transition-all duration-300",
        isSelected
          ? "bg-white/10 border-white/20 shadow-lg"
          : "bg-white/5 border-white/5 hover:bg-white/10 hover:border-white/15"
      )}
      whileHover={{ y: -2, scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
    >
      {/* Accent glow on hover */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at 50% 30%, ${product.accent}15 0%, transparent 70%)`,
        }}
      />

      {/* Logo */}
      <div className="relative w-[52px] h-[52px] md:w-[60px] md:h-[60px] rounded-xl overflow-hidden flex items-center justify-center mb-2.5">
        <Image
          src={product.logo}
          alt={`${product.name} logo`}
          width={60}
          height={60}
          className="w-full h-full object-contain"
          loading="lazy"
        />
      </div>

      {/* Name */}
      <span className="text-sm md:text-[15px] font-semibold text-white/80 group-hover:text-white transition-colors duration-300 text-center leading-tight">
        {product.name}
      </span>

      {/* Status dot */}
      {product.status !== "published" && (
        <span className="mt-1.5 text-[10px] font-medium uppercase tracking-wider text-white/30">
          {product.status === "coming-soon" ? "Coming" : "Dev"}
        </span>
      )}
    </motion.button>
  );
}

/* ══════════════════════════════════════════════════
   MAIN — Explore More Products Modal
   ══════════════════════════════════════════════════ */
interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function ExploreModal({ isOpen, onClose }: Props) {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Focus trap & ESC
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (selectedProduct) setSelectedProduct(null);
        else onClose();
      }
    };
    window.addEventListener("keydown", handler);
    searchRef.current?.focus();
    return () => window.removeEventListener("keydown", handler);
  }, [isOpen, selectedProduct, onClose]);

  // Lock body scroll
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      return () => { document.body.style.overflow = ""; };
    }
  }, [isOpen]);

  const categories = useMemo(() => buildCategories(products), []);

  const filtered = useMemo(() => {
    let list = products.filter((p) => !p.featured); // exclude featured products
    if (activeCategory !== "all") {
      list = list.filter(
        (p) =>
          p.categorySlug === activeCategory ||
          p.category.toLowerCase().replace(/\s+/g, "-") === activeCategory
      );
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.techStack?.some((t) => t.toLowerCase().includes(q)) ||
          p.platforms?.some((p) => p.toLowerCase().includes(q))
      );
    }
    return list;
  }, [activeCategory, search]);

  const handleSelect = useCallback((product: Product) => {
    setSelectedProduct((prev) => (prev?.id === product.id ? null : product));
  }, []);

  const handleClosePanel = useCallback(() => {
    setSelectedProduct(null);
  }, []);

  const handleCloseModal = useCallback(() => {
    setSelectedProduct(null);
    onClose();
  }, [onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[9998] flex items-center justify-center"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-black/70 backdrop-blur-md"
            onClick={handleCloseModal}
            aria-hidden="true"
          />

          {/* Modal container */}
          <motion.div
            ref={modalRef}
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.35, ease: [0.19, 1, 0.22, 1] }}
            className="relative w-[95vw] h-[90vh] max-w-[1280px] bg-[#111111] rounded-3xl shadow-2xl overflow-hidden flex flex-col"
            style={{ border: "1px solid rgba(255,255,255,0.06)" }}
            role="dialog"
            aria-modal="true"
            aria-label="Explore More Products"
          >
            {/* ─── Header ─── */}
            <div className="relative z-20 px-6 md:px-8 pt-6 pb-4 border-b border-white/5">
              {/* Close button */}
              <button
                onClick={handleCloseModal}
                className="absolute top-6 right-6 w-9 h-9 rounded-full bg-white/5 hover:bg-white/15 flex items-center justify-center text-white/40 hover:text-white transition-all duration-300"
                aria-label="Close modal"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Title */}
              <div className="flex items-center gap-3 mb-2">
                <Sparkles className="w-5 h-5 text-[#169B62]" />
                <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight">
                  RiverLoom Products
                </h2>
              </div>
              <p className="text-sm text-white/40 mb-4 max-w-md">
                Building software across multiple industries.
              </p>

              {/* Search */}
              <div className="relative max-w-md">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                <input
                  ref={searchRef}
                  type="text"
                  placeholder="Search products..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-[#169B62]/50 focus:bg-white/10 transition-all duration-300"
                  aria-label="Search products"
                />
              </div>
            </div>

            {/* ─── Main content area ─── */}
            <div className="relative flex-1 flex overflow-hidden">
              {/* Grid + Filters column */}
              <div className={cn(
                "flex-1 flex flex-col overflow-hidden transition-all duration-400",
                selectedProduct && !isMobile && "w-[calc(100%-420px)]"
              )}>
                {/* Category Filters */}
                <div className="px-6 md:px-8 py-4 overflow-x-auto hide-scrollbar border-b border-white/5">
                  <div className="flex gap-2 min-w-max">
                    <button
                      onClick={() => setActiveCategory("all")}
                      className={cn(
                        "px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-300 border whitespace-nowrap",
                        activeCategory === "all"
                          ? "bg-[#169B62]/15 border-[#169B62]/30 text-[#169B62]"
                          : "bg-white/5 border-white/5 text-white/50 hover:bg-white/10 hover:text-white/70"
                      )}
                    >
                      All ({products.length - products.filter(p => p.featured).length})
                    </button>
                    {categories.map((cat) => (
                      <button
                        key={cat.slug}
                        onClick={() => setActiveCategory(cat.slug)}
                        className={cn(
                          "px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-300 border whitespace-nowrap",
                          activeCategory === cat.slug
                            ? "bg-[#169B62]/15 border-[#169B62]/30 text-[#169B62]"
                            : "bg-white/5 border-white/5 text-white/50 hover:bg-white/10 hover:text-white/70"
                        )}
                      >
                        {cat.label} ({cat.count})
                      </button>
                    ))}
                  </div>
                </div>

                {/* Product Grid */}
                <div
                  ref={gridRef}
                  className="flex-1 overflow-y-auto px-6 md:px-8 py-6"
                >
                  {filtered.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-white/30">
                      <Search className="w-10 h-10 mb-4 opacity-40" />
                      <p className="text-sm font-medium">No products found</p>
                      <p className="text-xs mt-1">Try a different search or filter</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                      {filtered.map((product, i) => (
                        <ProductCard
                          key={product.id}
                          product={product}
                          isSelected={selectedProduct?.id === product.id}
                          onClick={() => handleSelect(product)}
                          index={i}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* ─── Side Panel / Bottom Sheet ─── */}
              <AnimatePresence mode="wait">
                {selectedProduct && (
                  <ExploreDetailPanel
                    key={selectedProduct.id}
                    product={selectedProduct}
                    onClose={handleClosePanel}
                  />
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
