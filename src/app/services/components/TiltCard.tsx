"use client";

import { useRef, useState, ReactNode } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  tiltDegree?: number;
  glare?: boolean;
}

export default function TiltCard({
  children,
  className = "",
  tiltDegree = 4,
  glare = true,
}: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { stiffness: 150, damping: 12 });
  const springY = useSpring(y, { stiffness: 150, damping: 12 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;
    const rotateX = (-mouseY / rect.height) * tiltDegree;
    const rotateY = (mouseX / rect.width) * tiltDegree;
    x.set(rotateX);
    y.set(rotateY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  const glareX = useMotionValue(50);
  const glareY = useMotionValue(50);
  const springGlareX = useSpring(glareX, { stiffness: 150, damping: 12 });
  const springGlareY = useSpring(glareY, { stiffness: 150, damping: 12 });

  const handleGlareMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const pctX = ((e.clientX - rect.left) / rect.width) * 100;
    const pctY = ((e.clientY - rect.top) / rect.height) * 100;
    glareX.set(pctX);
    glareY.set(pctY);
  };

  return (
    <motion.div
      ref={ref}
      className={`relative ${className}`}
      style={{
        perspective: 1000,
        transformStyle: "preserve-3d",
        rotateX: springX,
        rotateY: springY,
      }}
      onMouseMove={(e) => {
        handleMouseMove(e);
        if (glare) handleGlareMove(e);
        setIsHovered(true);
      }}
      onMouseLeave={handleMouseLeave}
    >
      {children}

      {/* Glare effect */}
      {glare && isHovered && (
        <motion.div
          className="absolute inset-0 rounded-[inherit] pointer-events-none z-20"
          style={{
            background: `radial-gradient(circle at ${springGlareX}% ${springGlareY}%, rgba(255,255,255,0.1) 0%, transparent 60%)`,
          }}
        />
      )}
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   GLASS CARD WRAPPER
   Adds glassmorphism + animated border gradient
   ═══════════════════════════════════════════════════════════════ */
export function GlassCard({
  children,
  accent,
  accentLight,
  className = "",
}: {
  children: ReactNode;
  accent: string;
  accentLight: string;
  className?: string;
}) {
  return (
    <div className={`relative group ${className}`}>
      {/* Animated border gradient */}
      <motion.div
        className="absolute inset-0 rounded-[32px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `linear-gradient(135deg, ${accent}, ${accentLight}, ${accent})`,
          padding: 1,
          WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
        }}
        animate={{
          backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Subtle glow on hover */}
      <motion.div
        className="absolute inset-0 rounded-[32px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `radial-gradient(ellipse at 50% 50%, ${accent}15 0%, transparent 60%)`,
          filter: "blur(20px)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 h-full">{children}</div>
    </div>
  );
}
