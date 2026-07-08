"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { products } from "@/data/products";
import { categories } from "@/data/categories";

/* ─── Badge data with real RiverLoom stats ─── */
const BADGES = [
  { label: "Founded", value: "2021", prefix: "", suffix: "", description: "Established" },
  { label: "Products", value: "29", prefix: "", suffix: "+", description: "Built & shipped" },
  { label: "Published Apps", value: "27", prefix: "", suffix: "+", description: "On app stores" },
  { label: "Categories", value: "9", prefix: "", suffix: "+", description: "Product areas" },
  { label: "Downloads", value: "100", prefix: "", suffix: "K+", description: "Across products" },
];

/* ─── Expertise badges ─── */
const EXPERTISE_BADGES = [
  "AI & ML", "Enterprise", "Mobile Apps", "Web Platforms",
  "Games", "Education", "Security", "Cloud Infrastructure",
];

interface BadgeRingProps {
  value: string;
  prefix?: string;
  suffix?: string;
  label: string;
  description: string;
  index: number;
  isInView: boolean;
}

/* ─── Individual badge with ring animation ─── */
function AnimatedBadge({ value, prefix = "", suffix = "", label, description, index, isInView }: BadgeRingProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={
        isInView
          ? { opacity: 1, scale: 1, y: 0 }
          : { opacity: 0, scale: 0.8, y: 20 }
      }
      transition={{
        delay: 0.4 + index * 0.08,
        duration: 0.6,
        ease: [0.19, 1, 0.22, 1],
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative"
    >
      <motion.div
        className="flex flex-col items-center justify-center w-[90px] h-[90px] md:w-[100px] md:h-[100px] rounded-full bg-white/60 backdrop-blur-sm border border-[#E7E2D8]/60 shadow-sm cursor-default"
        animate={
          isHovered
            ? { scale: 1.05, borderColor: "rgba(22,155,98,0.4)", boxShadow: "0 0 30px rgba(22,155,98,0.1)" }
            : { scale: 1, borderColor: "rgba(231,226,216,0.6)", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }
        }
        transition={{ duration: 0.3, ease: [0.19, 1, 0.22, 1] }}
      >
        {/* Ring decoration */}
        <svg
          className="absolute inset-0 w-full h-full -rotate-90"
          viewBox="0 0 100 100"
          aria-hidden
        >
          <motion.circle
            cx="50"
            cy="50"
            r="46"
            fill="none"
            stroke="rgba(22,155,98,0.06)"
            strokeWidth="1"
            initial={{ pathLength: 0 }}
            animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
            transition={{ delay: 0.6 + index * 0.08, duration: 1.2, ease: [0.19, 1, 0.22, 1] }}
          />
          <motion.circle
            cx="50"
            cy="50"
            r="46"
            fill="none"
            stroke="rgba(22,155,98,0.12)"
            strokeWidth="1.5"
            strokeDasharray={`${28 * 2.89} ${100 * 2.89}`}
            strokeDashoffset="0"
            initial={{ opacity: 0 }}
            animate={isHovered ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.4 }}
          />
        </svg>

        {/* Value */}
        <span className="text-lg md:text-xl font-bold text-[#169B62] leading-none">
          {prefix}{value}{suffix}
        </span>

        {/* Label */}
        <span className="text-[9px] md:text-[10px] font-medium text-[#6B6B6B] mt-0.5 leading-tight text-center px-2">
          {label}
        </span>
      </motion.div>

      {/* Tooltip on hover */}
      {isHovered && (
        <motion.div
          initial={{ opacity: 0, y: 4, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 4, scale: 0.95 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap z-20 pointer-events-none"
        >
          <span className="text-[10px] font-medium text-[#9E9E9E] bg-white/80 backdrop-blur-sm px-2 py-0.5 rounded-full border border-[#E7E2D8]/60 shadow-sm">
            {description}
          </span>
        </motion.div>
      )}
    </motion.div>
  );
}

/* ─── Expertise tags ─── */
function ExpertiseTags({ isInView }: { isInView: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ delay: 0.8, duration: 0.6 }}
      className="flex flex-wrap justify-center gap-1.5 mt-3"
    >
      {EXPERTISE_BADGES.map((tag, i) => (
        <motion.span
          key={tag}
          initial={{ opacity: 0, scale: 0.85 }}
          animate={
            isInView
              ? { opacity: 1, scale: 1 }
              : { opacity: 0, scale: 0.85 }
          }
          transition={{ delay: 0.9 + i * 0.04, duration: 0.35, ease: [0.19, 1, 0.22, 1] }}
          className="inline-flex px-2.5 py-1 rounded-full text-[9px] font-semibold tracking-[0.06em] uppercase bg-[#E8F7EF]/60 text-[#169B62]/80 border border-[#169B62]/10"
        >
          {tag}
        </motion.span>
      ))}
    </motion.div>
  );
}

/* ─── Divider ─── */
function Divider() {
  return (
    <div className="flex items-center gap-3 my-4">
      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#E7E2D8] to-transparent" />
      <span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[#9E9E9E]">
        Engineering Excellence
      </span>
      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#E7E2D8] to-transparent" />
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   EXPORT
   ═══════════════════════════════════════════════════════════ */
export default function TrustIndicators() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-60px" });

  return (
    <div ref={containerRef} className="w-full">
      <Divider />

      <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4">
        {BADGES.map((badge, i) => (
          <AnimatedBadge
            key={badge.label}
            {...badge}
            index={i}
            isInView={isInView}
          />
        ))}
      </div>

      <ExpertiseTags isInView={isInView} />
    </div>
  );
}
