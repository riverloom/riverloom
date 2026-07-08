"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface ChipItem {
  key: string;
  label: string;
  icon?: string;
  count?: number;
}

interface Props {
  items: ChipItem[];
  activeKey: string;
  onSelect: (key: string) => void;
  accentMap: Record<string, string>;
  className?: string;
}

const categoryIcons: Record<string, string> = {
  "all": "✦",
  "enterprise": "🏢",
  "ai": "🧠",
  "ai-security": "🛡️",
  "education": "📚",
  "games": "🎮",
  "creative": "🎨",
  "relationship": "💕",
  "social": "💬",
  "casual-games": "🎯",
  "published": "✓",
  "coming-soon": "⏳",
};

export default function GlassCategoryChips({ items, activeKey, onSelect, accentMap, className }: Props) {
  return (
    <div className={cn("flex flex-wrap justify-center gap-2", className)}>
      {items.map((item, i) => {
        const isActive = item.key === activeKey;
        const accent = accentMap[item.key] || "#169B62";
        const icon = item.icon || categoryIcons[item.key] || "✦";

        return (
          <motion.button
            key={item.key}
            onClick={() => onSelect(item.key)}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.025, duration: 0.35 }}
            whileHover={{ scale: 1.03, y: -1 }}
            whileTap={{ scale: 0.97 }}
            className={cn(
              "relative inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-semibold tracking-wide transition-all duration-300 overflow-hidden",
              isActive
                ? "text-white shadow-lg"
                : "text-[#6B6B6B] hover:text-[#1C1C1C] border border-[#EBE8E0] bg-white/60 backdrop-blur-sm hover:bg-white hover:border-[#D4CEC4]"
            )}
            style={{
              ...(isActive ? {
                background: `linear-gradient(135deg, ${accent}, ${accent}dd)`,
                borderColor: "transparent",
                boxShadow: `0 4px 16px ${accent}30`,
              } : {}),
            }}
          >
            {/* Active ripple */}
            {isActive && (
              <motion.span
                layoutId="chipGlow"
                className="absolute inset-0 rounded-full"
                style={{ background: `radial-gradient(ellipse at 50% 0%, rgba(255,255,255,0.2) 0%, transparent 70%)` }}
              />
            )}
            <span className="relative z-10 text-[14px]">{icon}</span>
            <span className="relative z-10">{item.label}</span>
            {item.count !== undefined && (
              <span className={cn(
                "relative z-10 text-[10px] px-1.5 py-0.5 rounded-full font-bold",
                isActive ? "bg-white/20 text-white" : "bg-[#F4F1EC] text-[#9E9E9E]"
              )}>
                {item.count}
              </span>
            )}
          </motion.button>
        );
      })}
    </div>
  );
}
