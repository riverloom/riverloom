"use client";

import { ReactNode } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SmoothLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
  active?: boolean;
}

export default function SmoothLink({ href, children, className, active }: SmoothLinkProps) {
  return (
    <Link href={href} className={cn("relative group inline-block", className)}>
      {children}
      <motion.span
        className={cn(
          "absolute bottom-0 left-0 h-[1px] bg-[var(--color-accent)]",
          active ? "w-full" : "w-0 group-hover:w-full"
        )}
        layoutId={active ? "nav-underline" : undefined}
        transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
      />
    </Link>
  );
}
