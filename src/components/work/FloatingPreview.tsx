"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Star, Download, ArrowUpRight } from "lucide-react";
import type { Product } from "@/data/products";

interface Props {
  product: Product | null;
  isVisible: boolean;
  mouseX: number;
  mouseY: number;
}

const PANEL_WIDTH = 340;
const PANEL_HEIGHT = 400;
const EDGE_MARGIN = 20;

function computePosition(mouseX: number, mouseY: number) {
  // Guard for SSR — window doesn't exist during build
  if (typeof window === "undefined") {
    return { x: -9999, y: -9999 };
  }

  let x = mouseX + 20;
  let y = mouseY - PANEL_HEIGHT / 2;

  if (x + PANEL_WIDTH > window.innerWidth - EDGE_MARGIN) {
    x = mouseX - PANEL_WIDTH - 20;
  }
  if (y < EDGE_MARGIN) y = EDGE_MARGIN;
  if (y + PANEL_HEIGHT > window.innerHeight - EDGE_MARGIN) {
    y = window.innerHeight - PANEL_HEIGHT - EDGE_MARGIN;
  }

  return { x, y };
}

export default function FloatingPreview({ product, isVisible, mouseX, mouseY }: Props) {
  const pos = computePosition(mouseX, mouseY);
  const hasScreenshots = product?.screenshots && product.screenshots.length > 0;

  return (
    <AnimatePresence>
      {isVisible && product && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 10 }}
          transition={{ duration: 0.2, ease: [0.19, 1, 0.22, 1] }}
          className="fixed z-[9997] pointer-events-none"
          style={{
            left: pos.x,
            top: pos.y,
            width: PANEL_WIDTH,
          }}
        >
          <div
            className="bg-[#1C1C1C] rounded-2xl overflow-hidden shadow-2xl border border-white/10"
            style={{ boxShadow: "0 32px 80px rgba(0,0,0,0.3), 0 8px 24px rgba(0,0,0,0.15)" }}
          >
            {/* Screenshots */}
            {hasScreenshots && (
              <div className="flex gap-1.5 p-3 overflow-hidden">
                {product.screenshots.slice(0, 3).map((src, i) => (
                  <div key={i} className="flex-1 aspect-[9/16] rounded-lg overflow-hidden bg-white/5">
                    <Image
                      src={src}
                      alt={`${product.name} screenshot ${i + 1}`}
                      width={100}
                      height={180}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            )}

            {/* Content */}
            <div className="p-4">
              <div className="flex items-start gap-3 mb-2">
                <div
                  className="w-10 h-10 rounded-xl overflow-hidden flex items-center justify-center shrink-0"
                  style={{ background: `${product.accent}15` }}
                >
                  <Image src={product.logo} alt="" width={36} height={36} className="w-7 h-7 object-contain" />
                </div>
                <div className="min-w-0">
                  <h4 className="text-sm font-bold text-white leading-tight">{product.name}</h4>
                  <span className="text-[10px] font-semibold uppercase tracking-[0.12em]" style={{ color: product.accent }}>
                    {product.category}
                  </span>
                </div>
              </div>

              <p className="text-xs text-white/50 leading-relaxed line-clamp-2 mb-3">
                {product.tagline}
              </p>

              {/* Metrics */}
              <div className="flex items-center gap-3 mb-3">
                {product.rating && (
                  <span className="flex items-center gap-1 text-[11px] text-white/70">
                    <Star className="w-3 h-3 fill-[#FBBF24] text-[#FBBF24]" />
                    {product.rating}
                  </span>
                )}
                {product.downloads && (
                  <span className="flex items-center gap-1 text-[11px] text-white/70">
                    <Download className="w-3 h-3" />
                    {product.downloads}
                  </span>
                )}
              </div>

              {/* Tech */}
              <div className="flex flex-wrap gap-1">
                {product.techStack.slice(0, 3).map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-0.5 rounded-md text-[9px] font-medium bg-white/5 text-white/40 border border-white/5"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
