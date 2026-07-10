"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";

/* ─── Types ─── */
interface PillarService {
  name: string;
  href: string;
}

interface Pillar {
  id: "build" | "scale" | "grow";
  title: string;
  subtitle: string;
  color: string;
  colorLight: string;
  colorGlow: string;
  colorBg: string;
  services: PillarService[];
}

const pillars: Pillar[] = [
  {
    id: "build",
    title: "Build",
    subtitle: "Product & Software Engineering",
    color: "#16A34A",
    colorLight: "#22C55E",
    colorGlow: "rgba(22,155,98,0.2)",
    colorBg: "#F0FDF4",
    services: [
      { name: "Custom Software Development", href: "/services/custom-software" },
      { name: "AI Solutions & Automation", href: "/solutions/ai-engineering" },
      { name: "Web Applications", href: "/services/web-development" },
      { name: "Mobile Applications", href: "/services/mobile-development" },
      { name: "SaaS / CRM / ERP Platforms", href: "/solutions/business" },
    ],
  },
  {
    id: "scale",
    title: "Scale",
    subtitle: "Cloud Infrastructure & Intelligent Operations",
    color: "#2563EB",
    colorLight: "#3B82F6",
    colorGlow: "rgba(37,99,235,0.2)",
    colorBg: "#EFF6FF",
    services: [
      { name: "Cloud & DevOps", href: "/solutions/cloud" },
      { name: "API Integration", href: "/services/platform-engineering" },
      { name: "Performance Optimization", href: "/solutions/performance" },
      { name: "Security & Monitoring", href: "/solutions/security" },
      { name: "Infrastructure Automation", href: "/solutions/cloud" },
    ],
  },
  {
    id: "grow",
    title: "Grow",
    subtitle: "Growth, Analytics & AI Evolution",
    color: "#F97316",
    colorLight: "#FB923C",
    colorGlow: "rgba(249,115,22,0.2)",
    colorBg: "#FFF7ED",
    services: [
      { name: "SEO & Digital Growth", href: "/solutions/performance" },
      { name: "AI Consulting", href: "/solutions/ai-engineering" },
      { name: "Analytics Dashboards", href: "/solutions/performance" },
      { name: "Product Optimization", href: "/solutions/performance" },
      { name: "Continuous Support", href: "/contact" },
    ],
  },
];

/* ══════════════════════════════════════════════════
   CORNER ILLUSTRATIONS — Premium Abstract Artwork
   Each fills the lower-right 25% of its card.
   ══════════════════════════════════════════════════ */

function BuildIllustration({ color, isHovered }: { color: string; isHovered: boolean }) {
  return (
    <svg
      viewBox="0 0 300 300"
      className="absolute bottom-0 right-0 w-[55%] h-[55%] pointer-events-none select-none"
      fill="none"
    >
      <motion.g
        animate={isHovered ? { x: -4, y: -4 } : { x: 0, y: 0 }}
        transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
      >
        <rect x="120" y="160" width="100" height="100" rx="8" fill={color} opacity="0.08" />
        <rect x="100" y="120" width="100" height="100" rx="8" fill={color} opacity="0.06" />
        <rect x="80" y="80" width="100" height="100" rx="8" fill={color} opacity="0.04" />
        <rect x="140" y="180" width="60" height="60" rx="6" fill={color} opacity="0.12" />
        <rect x="60" y="180" width="60" height="60" rx="6" fill={color} opacity="0.05" />
        <rect x="160" y="100" width="60" height="60" rx="6" fill={color} opacity="0.07" />
        <rect x="180" y="140" width="40" height="40" rx="4" fill={color} opacity="0.18" />
      </motion.g>
      <motion.g
        animate={isHovered ? { opacity: 0.15 } : { opacity: 0.06 }}
        transition={{ duration: 0.6 }}
      >
        <line x1="60" y1="220" x2="220" y2="60" stroke={color} strokeWidth="1" strokeOpacity="0.5" />
        <line x1="40" y1="240" x2="240" y2="40" stroke={color} strokeWidth="0.5" strokeOpacity="0.3" />
      </motion.g>
    </svg>
  );
}

function ScaleIllustration({ color, isHovered }: { color: string; isHovered: boolean }) {
  return (
    <svg
      viewBox="0 0 300 300"
      className="absolute bottom-0 right-0 w-[55%] h-[55%] pointer-events-none select-none"
      fill="none"
    >
      <motion.g
        animate={isHovered ? { x: -4, y: -4 } : { x: 0, y: 0 }}
        transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
      >
        {[
          [160, 160],
          [220, 160],
          [160, 220],
          [220, 220],
          [130, 190],
          [190, 190],
          [190, 130],
          [130, 130],
        ].map(([cx, cy], i) => (
          <circle key={i} cx={cx} cy={cy} r="6" fill={color} opacity={i < 4 ? 0.12 : 0.07} />
        ))}
        <line x1="160" y1="160" x2="220" y2="160" stroke={color} strokeWidth="0.8" strokeOpacity="0.12" />
        <line x1="160" y1="160" x2="160" y2="220" stroke={color} strokeWidth="0.8" strokeOpacity="0.12" />
        <line x1="220" y1="160" x2="220" y2="220" stroke={color} strokeWidth="0.8" strokeOpacity="0.12" />
        <line x1="160" y1="220" x2="220" y2="220" stroke={color} strokeWidth="0.8" strokeOpacity="0.12" />
        <line x1="130" y1="190" x2="160" y2="160" stroke={color} strokeWidth="0.5" strokeOpacity="0.06" />
        <line x1="130" y1="190" x2="160" y2="220" stroke={color} strokeWidth="0.5" strokeOpacity="0.06" />
        <line x1="220" y1="160" x2="250" y2="130" stroke={color} strokeWidth="0.5" strokeOpacity="0.06" />
        <motion.circle
          cx="160" cy="160" r="12" fill="none" stroke={color} strokeWidth="1" strokeOpacity="0.25"
          animate={{ scale: [1, 1.4, 1], opacity: [0.25, 0.08, 0.25] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.circle
          cx="220" cy="220" r="10" fill="none" stroke={color} strokeWidth="1" strokeOpacity="0.2"
          animate={{ scale: [1, 1.5, 1], opacity: [0.2, 0.05, 0.2] }}
          transition={{ duration: 3, delay: 1.5, repeat: Infinity, ease: "easeInOut" }}
        />
        <line x1="160" y1="160" x2="220" y2="220" stroke={color} strokeWidth="0.5" strokeOpacity="0.08" />
        <line x1="220" y1="160" x2="160" y2="220" stroke={color} strokeWidth="0.5" strokeOpacity="0.08" />
      </motion.g>
    </svg>
  );
}

function GrowIllustration({ color, isHovered }: { color: string; isHovered: boolean }) {
  return (
    <svg
      viewBox="0 0 300 300"
      className="absolute bottom-0 right-0 w-[55%] h-[55%] pointer-events-none select-none"
      fill="none"
    >
      <motion.g
        animate={isHovered ? { x: -4, y: -4 } : { x: 0, y: 0 }}
        transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
      >
        <circle cx="180" cy="180" r="100" fill={color} opacity="0.04" />
        <circle cx="180" cy="180" r="70" fill={color} opacity="0.06" />
        <circle cx="180" cy="180" r="45" fill={color} opacity="0.09" />
        <circle cx="180" cy="180" r="25" fill={color} opacity="0.14" />
        <motion.circle
          cx="180" cy="180" r="80" fill="none" stroke={color} strokeWidth="0.8" strokeOpacity="0.12"
          animate={{ r: [80, 110], opacity: [0.12, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeOut" }}
        />
        <motion.circle
          cx="180" cy="180" r="50" fill="none" stroke={color} strokeWidth="0.6" strokeOpacity="0.1"
          animate={{ r: [50, 80], opacity: [0.1, 0] }}
          transition={{ duration: 3, delay: 1, repeat: Infinity, ease: "easeOut" }}
        />
        {[
          [120, 130],
          [220, 120],
          [240, 200],
          [130, 230],
          [160, 100],
          [200, 240],
        ].map(([cx, cy], i) => (
          <circle key={i} cx={cx} cy={cy} r="4" fill={color} opacity="0.1" />
        ))}
        {[
          [130, 180],
          [230, 170],
          [170, 230],
        ].map(([cx, cy], i) => (
          <motion.circle
            key={i}
            cx={cx}
            cy={cy}
            r="3"
            fill={color}
            opacity="0.2"
            animate={{ r: [3, 6, 3], opacity: [0.2, 0.35, 0.2] }}
            transition={{ duration: 2.5, delay: i * 0.8, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}
      </motion.g>
    </svg>
  );
}

/* ══════════════════════════════════════════════════
   3D Tilt Hook — subtle perspective on mouse move
   ══════════════════════════════════════════════════ */
function use3DTilt() {
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const relX = (e.clientX - centerX) / (rect.width / 2);
    const relY = (e.clientY - centerY) / (rect.height / 2);
    setTilt({ x: relY * -6, y: relX * 6 });
  }, []);

  const handleMouseEnter = useCallback(() => setIsHovered(true), []);
  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0 });
  }, []);

  return { ref, tilt, isHovered, handleMouseMove, handleMouseEnter, handleMouseLeave };
}

/* ══════════════════════════════════════════════════
   BACKGROUND COMPONENTS
   ══════════════════════════════════════════════════ */

function FloatingBlobs() {
  return (
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
      <motion.div
        className="absolute top-[10%] left-[8%] w-[600px] h-[600px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(22,155,98,0.07) 0%, transparent 65%)",
          filter: "blur(60px)",
        }}
        animate={{ x: [0, 30, -10, 0], y: [0, -20, 15, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-[40%] right-[5%] w-[500px] h-[500px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(37,99,235,0.05) 0%, transparent 65%)",
          filter: "blur(50px)",
        }}
        animate={{ x: [0, -25, 10, 0], y: [0, 25, -15, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />
      <motion.div
        className="absolute bottom-[15%] left-[15%] w-[450px] h-[450px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(249,115,22,0.04) 0%, transparent 65%)",
          filter: "blur(50px)",
        }}
        animate={{ x: [0, 20, -15, 0], y: [0, -15, 20, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[600px]"
        style={{
          background: "radial-gradient(ellipse 50% 50% at 50% 50%, rgba(22,155,98,0.03) 0%, transparent 70%)",
        }}
      />
    </div>
  );
}

/* Simple pseudo-random that returns 0-1 deterministically based on a seed */
function seededRandom(seed: number): number {
  const x = Math.sin(seed * 9301 + 49297) * 49297;
  return x - Math.floor(x);
}

function Particles({ accent }: { accent: string }) {
  const [data, setData] = useState<{ id: number; x: number; y: number; s: number; d: number; o: number }[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const particles = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: seededRandom(i * 7 + 1) * 100,
      y: seededRandom(i * 13 + 3) * 100,
      s: seededRandom(i * 5 + 9) * 2.5 + 1,
      d: seededRandom(i * 11 + 2) * 12 + 8,
      o: seededRandom(i * 3 + 5) * 0.03 + 0.01,
    }));
    setData(particles);
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0" suppressHydrationWarning>
      {data.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            width: p.s,
            height: p.s,
            left: `${p.x}%`,
            top: `${p.y}%`,
            background: accent,
            opacity: p.o,
          }}
          animate={{ y: [0, -20, 0], x: [0, (p.id % 2 === 0 ? 6 : -6), 0] }}
          transition={{ duration: p.d, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

function MouseSpotlight({ sectionRef }: { sectionRef: React.RefObject<HTMLElement | null> }) {
  const [pos, setPos] = useState({ x: 50, y: 50 });
  const [isVisible, setIsVisible] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!sectionRef.current) return;
      const r = sectionRef.current.getBoundingClientRect();
      setPos({
        x: ((e.clientX - r.left) / r.width) * 100,
        y: ((e.clientY - r.top) / r.height) * 100,
      });
      setIsVisible(true);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => setIsVisible(false), 2000);
    },
    [sectionRef]
  );

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setIsVisible(false)}
      className="absolute inset-0 pointer-events-none z-0"
    >
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(22,155,98,0.04) 0%, transparent 60%)",
          transform: "translate(-50%, -50%)",
        }}
        animate={{
          left: `${pos.x}%`,
          top: `${pos.y}%`,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{ type: "spring", stiffness: 30, damping: 25, opacity: { duration: 0.6 } }}
      />
    </div>
  );
}

/* ══════════════════════════════════════════════════
   PILLAR CARD — Premium Enterprise Card
   ══════════════════════════════════════════════════ */
function PillarCard({
  pillar,
  index,
  sectionInView,
}: {
  pillar: Pillar;
  index: number;
  sectionInView: boolean;
}) {
  const [hoveredService, setHoveredService] = useState<string | null>(null);
  const { ref: tiltRef, tilt, isHovered, handleMouseMove, handleMouseEnter, handleMouseLeave } = use3DTilt();

  const cardDelay = 0.2 + index * 0.18;

  return (
    <motion.div
      initial={{ opacity: 0, y: 60, scale: 0.96 }}
      animate={
        sectionInView
          ? { opacity: 1, y: 0, scale: 1 }
          : {}
      }
      transition={{
        delay: cardDelay,
        duration: 0.8,
        ease: [0.19, 1, 0.22, 1],
      }}
      className="relative flex-1 min-w-0"
      style={{ perspective: "1200px" }}
    >
      <motion.div
        ref={tiltRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="relative overflow-hidden rounded-[32px] cursor-default h-full"
        style={{
          transformStyle: "preserve-3d",
          background: "#FFFFFF",
          border: "1px solid transparent",
          backgroundClip: "padding-box",
        }}
        animate={{
          rotateX: tilt.x,
          rotateY: tilt.y,
          y: isHovered ? -12 : 0,
          scale: isHovered ? 1.015 : 1,
          boxShadow: isHovered
            ? `0 32px 80px -16px ${pillar.colorGlow.replace("0.2", "0.35")}, 0 0 0 1px ${pillar.color}25, 0 2px 8px rgba(0,0,0,0.04)`
            : "0 1px 3px rgba(0,0,0,0.04), 0 4px 12px rgba(0,0,0,0.02)",
          borderColor: isHovered ? `${pillar.color}40` : "var(--color-border)",
        }}
        transition={{
          duration: 0.6,
          ease: [0.19, 1, 0.22, 1],
          rotateX: { type: "spring", stiffness: 200, damping: 25 },
          rotateY: { type: "spring", stiffness: 200, damping: 25 },
        }}
      >
        <motion.div
          className="absolute inset-0 z-[2] pointer-events-none rounded-[32px]"
          animate={{
            background: isHovered
              ? `linear-gradient(135deg, ${pillar.color}04 0%, transparent 40%, transparent 60%, ${pillar.color}04 100%)`
              : "transparent",
          }}
          transition={{ duration: 0.6 }}
        />

        <motion.div
          className="absolute top-0 left-0 right-0 h-[3px] z-[3] rounded-t-[32px]"
          animate={{
            opacity: isHovered ? 1 : 0.25,
            background: `linear-gradient(90deg, ${pillar.color}, ${pillar.colorLight}, ${pillar.color})`,
            boxShadow: isHovered
              ? `0 0 20px ${pillar.color}60, 0 0 40px ${pillar.color}30`
              : "none",
          }}
          transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
        />

        <div className="absolute bottom-0 right-0 z-0">
          {pillar.id === "build" && <BuildIllustration color={pillar.color} isHovered={isHovered} />}
          {pillar.id === "scale" && <ScaleIllustration color={pillar.color} isHovered={isHovered} />}
          {pillar.id === "grow" && <GrowIllustration color={pillar.color} isHovered={isHovered} />}
        </div>

        <div
          className="absolute bottom-0 left-0 right-0 h-[45%] z-0 pointer-events-none rounded-b-[32px]"
          style={{
            background: `linear-gradient(to top, ${pillar.color}08 0%, transparent 80%)`,
          }}
        />

        <div className="relative z-10 flex flex-col h-full p-10 md:p-11 lg:p-12">
          <motion.span
            className="text-[120px] md:text-[140px] font-black leading-[0.7] mb-4 select-none"
            animate={{ color: isHovered ? `${pillar.color}20` : `${pillar.color}0A` }}
            transition={{ duration: 0.6 }}
          >
            0{index + 1}
          </motion.span>

          <motion.h3
            className="text-[38px] md:text-[42px] lg:text-[48px] font-bold leading-[1.05] mb-2 tracking-[-0.02em]"
            animate={{ color: isHovered ? pillar.color : "var(--ink)" }}
            transition={{ duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
          >
            {pillar.title}
          </motion.h3>

          <motion.p
            className="text-[16px] md:text-[17px] lg:text-[18px] font-medium mb-8 leading-relaxed"
            animate={{ color: isHovered ? pillar.color : "var(--ink-dim)" }}
            transition={{ duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
          >
            {pillar.subtitle}
          </motion.p>

          <motion.div
            className="w-full h-px mb-8"
            animate={{
              background: isHovered
                ? `linear-gradient(90deg, ${pillar.color}30, transparent)`
                : "var(--color-border)",
            }}
            transition={{ duration: 0.6 }}
          />

          <div className="flex-1 flex flex-col gap-1">
            {pillar.services.map((svc) => (
              <Link key={svc.name} href={svc.href} className="block">
                <motion.div
                  onMouseEnter={() => setHoveredService(svc.name)}
                  onMouseLeave={() => setHoveredService(null)}
                  className="group flex items-center justify-between px-4 py-3.5 rounded-xl cursor-pointer"
                  animate={{
                    background: hoveredService === svc.name ? `${pillar.color}0D` : "transparent",
                    x: hoveredService === svc.name ? 4 : 0,
                  }}
                  transition={{ duration: 0.35, ease: [0.19, 1, 0.22, 1] }}
                >
                  <div className="flex items-center gap-4 min-w-0">
                    <motion.span
                      className="w-[7px] h-[7px] rounded-full flex-shrink-0"
                      animate={{
                        background: hoveredService === svc.name ? pillar.color : "var(--ink-muted)",
                        scale: hoveredService === svc.name ? 1.8 : 1,
                        boxShadow: hoveredService === svc.name
                          ? `0 0 12px ${pillar.color}60`
                          : "none",
                      }}
                      transition={{ duration: 0.35, ease: [0.19, 1, 0.22, 1] }}
                    />
                    <motion.span
                      className="text-[16px] md:text-[17px] lg:text-[18px] font-medium leading-snug"
                      animate={{
                        color: hoveredService === svc.name ? pillar.color : "var(--ink)",
                        x: hoveredService === svc.name ? 3 : 0,
                      }}
                      transition={{ duration: 0.35, ease: [0.19, 1, 0.22, 1] }}
                    >
                      {svc.name}
                    </motion.span>
                  </div>
                  <motion.svg
                    className="w-[18px] h-[18px] flex-shrink-0 ml-3"
                    viewBox="0 0 18 18"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    animate={{
                      x: hoveredService === svc.name ? 6 : 0,
                      opacity: hoveredService === svc.name ? 1 : 0.25,
                      color: hoveredService === svc.name ? pillar.color : "var(--ink-muted)",
                    }}
                    transition={{ duration: 0.4, ease: [0.19, 1, 0.22, 1] }}
                  >
                    <path d="M3 9h12" />
                    <path d="M10 4l5 5-5 5" />
                  </motion.svg>
                </motion.div>
              </Link>
            ))}
          </div>

          <motion.div
            className="flex items-center justify-between pt-7 mt-6"
            animate={{
              borderTop: `1px solid ${isHovered ? `${pillar.color}20` : "var(--color-border)"}`,
            }}
            transition={{ duration: 0.6 }}
          >
            <Link
              href="/services"
              className="group relative inline-flex items-center gap-3"
            >
              <motion.span
                className="text-[15px] md:text-[16px] font-semibold"
                animate={{ color: isHovered ? pillar.color : "var(--ink)" }}
                transition={{ duration: 0.5 }}
              >
                Explore All {pillar.title} Services
              </motion.span>
              <motion.svg
                className="w-[16px] h-[16px]"
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                animate={{
                  x: isHovered ? 6 : 0,
                  color: isHovered ? pillar.color : "var(--ink-muted)",
                }}
                transition={{ duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
              >
                <path d="M3 8h10" />
                <path d="M9 4l4 4-4 4" />
              </motion.svg>
              <motion.span
                className="absolute -bottom-0.5 left-0 h-[2px] rounded-full"
                animate={{
                  width: isHovered ? "100%" : "0%",
                  background: pillar.color,
                  opacity: isHovered ? 0.6 : 0,
                }}
                transition={{ duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
              />
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ══════════════════════════════════════════════════
   MAIN — Premium Services Section
   ══════════════════════════════════════════════════ */
export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section
      ref={sectionRef}
      id="services"
      aria-label="Our Services"
      className="relative overflow-hidden bg-[var(--bg)] py-20 md:py-28 lg:py-36"
    >
      {/* ─── Premium Ambient Background ─── */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div
          className="absolute inset-0 opacity-[0.012]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='36' height='36' xmlns='http://www.w3.org/2000/svg'%3E%3Cline x1='0' y1='0' x2='36' y2='0' stroke='%23169B62' strokeWidth='0.5'/%3E%3Cline x1='0' y1='0' x2='0' y2='36' stroke='%23169B62' strokeWidth='0.5'/%3E%3C/svg%3E")`,
            backgroundSize: "36px 36px",
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='256' height='256' filter='url(%23n)' opacity='0.05'/%3E%3C/svg%3E")`,
            backgroundSize: "128px 128px",
          }}
        />
      </div>

      <FloatingBlobs />
      <Particles accent="#169B62" />
      <MouseSpotlight sectionRef={sectionRef} />

      {/* ─── Content Container ─── */}
      <div className="relative z-10 max-w-[1560px] mx-auto px-6 md:px-8 lg:px-10 xl:px-12">
        {/* ─── Section Header ─── */}
        <div className="text-center mb-16 md:mb-20 lg:mb-24">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
            className="flex justify-center mb-8"
          >
            <span className="badge-premium text-[12px] tracking-[0.15em] uppercase font-semibold">
              <span
                className="w-[6px] h-[6px] rounded-full bg-[var(--color-accent)]"
                style={{ boxShadow: "0 0 8px 2px rgba(22,155,98,0.5)" }}
              />
              OUR SERVICES
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.7, ease: [0.19, 1, 0.22, 1] }}
            className="text-[clamp(44px,5.5vw,80px)] font-bold leading-[1.04] tracking-[-0.03em] text-[var(--ink)]"
          >
            Everything You Need{" "}
            <span className="text-gradient-accent">
              To Build, Scale & Grow.
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
            className="mt-6 text-[18px] md:text-[20px] lg:text-[22px] leading-relaxed text-[var(--ink-dim)] max-w-3xl mx-auto"
          >
            Whether you're launching a startup, modernizing enterprise software, or
            integrating AI into existing workflows, RiverLoom provides end-to-end
            engineering — from idea to long-term growth.
          </motion.p>
        </div>

        {/* ─── 3 Premium Pillars — Always one row on desktop ─── */}
        <div className="flex flex-col lg:flex-row items-stretch gap-6 md:gap-8 lg:gap-6 xl:gap-8 2xl:gap-10">
          {pillars.map((pillar, i) => (
            <PillarCard key={pillar.id} pillar={pillar} index={i} sectionInView={isInView} />
          ))}
        </div>
      </div>
    </section>
  );
}
