"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface AnimatedBadgeProps {
  text: string;
  className?: string;
}

export default function AnimatedBadge({ text, className }: AnimatedBadgeProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
      className={cn(
        "inline-flex items-center gap-2 px-4 py-2 rounded-full",
        "border border-[var(--color-border)]",
        "bg-[var(--color-card)]/50 backdrop-blur-sm",
        "text-sm font-medium tracking-wide uppercase text-[var(--color-text-secondary)]",
        className
      )}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)] animate-pulse" />
      {text}
    </motion.div>
  );
}
