"use client";

import { useRef, useMemo, useState } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";

/* ─── Types ─── */
export interface BrandImage {
  src: string;
  name: string;
}

interface BrandsMarqueeProps {
  brands: BrandImage[];
  brandsTwo: BrandImage[];
}

/* ─── Keyframes (injected once) ─── */
function MarqueeStyles() {
  return (
    <style
      dangerouslySetInnerHTML={{
        __html: `
          @keyframes marquee-rtl {
            0% { transform: translate3d(0, 0, 0); }
            100% { transform: translate3d(-33.333%, 0, 0); }
          }
          @keyframes marquee-ltr {
            0% { transform: translate3d(-33.333%, 0, 0); }
            100% { transform: translate3d(0, 0, 0); }
          }
        `,
      }}
    />
  );
}

/* ─── Floating Logo ─── */
function FloatingLogo({
  brand,
  index,
}: {
  brand: BrandImage;
  index: number;
}) {
  const delay = useMemo(() => (index * 1.7) % 7, [index]);
  const duration = useMemo(() => 4 + ((index * 1.3) % 3), [index]);

  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      className="relative flex-shrink-0 cursor-pointer flex items-center justify-center py-3"
      style={{ overflow: "visible" }}
      animate={{ y: [0, -3, 0] }}
      transition={{
        duration,
        repeat: Infinity,
        ease: "easeInOut",
        delay,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Glow behind logo on hover */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-500"
        style={{
          opacity: hovered ? 1 : 0,
          filter: "drop-shadow(0 10px 30px rgba(22,163,74,0.25))",
        }}
      />
      <Image
        src={brand.src}
        alt={brand.name}
        width={140}
        height={46}
        className="object-contain"
        style={{
          height: "clamp(30px, 3vw, 46px)",
          width: "auto",
          maxWidth: "none",
          display: "block",
          opacity: hovered ? 1 : 0.72,
          filter: hovered ? "grayscale(0%)" : "grayscale(100%)",
          transform: hovered
            ? "translateY(-6px) scale(1.08)"
            : "translateY(0) scale(1)",
          transition: "all 0.45s cubic-bezier(0.34, 1.56, 0.64, 1)",
        }}
        loading="lazy"
        decoding="async"
        sizes="180px"
      />
    </motion.div>
  );
}

/* ─── Marquee Row ─── */
function MarqueeRow({
  items,
  direction,
  speed,
  delay,
  isInView,
}: {
  items: BrandImage[];
  direction: "rtl" | "ltr";
  speed: number;
  delay: number;
  isInView: boolean;
}) {
  const [paused, setPaused] = useState(false);

  return (
    <div
      className="relative flex items-center justify-center w-full"
      style={{ overflow: "visible" }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* ── Edge fade layers ── */}
      <div
        className="absolute inset-y-0 left-0 w-16 md:w-24 z-[2] pointer-events-none"
        style={{
          background:
            "linear-gradient(90deg, var(--bg) 0%, transparent 100%)",
        }}
      />
      <div
        className="absolute inset-y-0 right-0 w-16 md:w-24 z-[2] pointer-events-none"
        style={{
          background:
            "linear-gradient(270deg, var(--bg) 0%, transparent 100%)",
        }}
      />

      {/* ── Mask fade wrapper (only hides horizontal overflow) ── */}
      <div
        className="w-full flex items-center"
        style={{
          overflow: "hidden",
          maskImage:
            "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
        }}
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay }}
          className="flex"
          style={{ overflow: "visible" }}
        >
          <div
            className="flex items-center gap-[40px] md:gap-[56px] lg:gap-[80px] flex-shrink-0 px-5 md:px-8 lg:px-10"
            style={{
              overflow: "visible",
              animationName: direction === "rtl" ? "marquee-rtl" : "marquee-ltr",
              animationDuration: `${speed}s`,
              animationTimingFunction: "linear",
              animationIterationCount: "infinite",
              willChange: "transform",
              animationPlayState: paused ? "paused" : "running",
            }}
          >
            {items.map((brand, i) => (
              <FloatingLogo
                key={`${direction}-${brand.src}-${i}`}
                brand={brand}
                index={direction === "ltr" ? i + 100 : i}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

/* ─── Main Component ─── */
export default function BrandsMarquee({ brands, brandsTwo }: BrandsMarqueeProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  /* Triple-duplicate for seamless looping */
  const items = useMemo(() => {
    if (brands.length === 0) return [];
    return [...brands, ...brands, ...brands];
  }, [brands]);

  const itemsTwo = useMemo(() => {
    if (brandsTwo.length === 0) return [];
    return [...brandsTwo, ...brandsTwo, ...brandsTwo];
  }, [brandsTwo]);

  if (brands.length === 0 && brandsTwo.length === 0) return null;

  return (
    <>
      <MarqueeStyles />

      <section
        ref={sectionRef}
        className="relative w-full bg-[var(--bg)]"
        style={{
          overflow: "hidden",
          paddingBlock: "clamp(1.5rem, 3vw, 2rem)",
          minHeight: "max-content",
          height: "auto",
        }}
      >
        {/* ── Radial glow behind entire section ── */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(circle at center, rgba(22,163,74,0.05), transparent 70%)",
          }}
        />

        {/* ── Section Header ── */}
        <div className="relative z-[2] mb-12 md:mb-16 px-6">
          <div className="text-center max-w-[1200px] mx-auto">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
              className="flex justify-center mb-6"
            >
              <span className="badge-premium text-[12px] tracking-[0.15em] uppercase font-semibold">
                <span
                  className="w-[6px] h-[6px] rounded-full bg-[var(--color-accent)]"
                  style={{
                    boxShadow: "0 0 8px 2px rgba(22,155,98,0.5)",
                  }}
                />
                TRUSTED BY LEADING BUSINESSES
              </span>
            </motion.div>

            {/* Heading */}
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                delay: 0.1,
                duration: 0.7,
                ease: [0.19, 1, 0.22, 1],
              }}
              className="text-[clamp(36px,4.5vw,64px)] font-bold leading-[1.08] tracking-[-0.03em] text-[var(--ink)]"
            >
              Powering Modern Businesses
            </motion.h2>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                delay: 0.2,
                duration: 0.6,
                ease: [0.19, 1, 0.22, 1],
              }}
              className="mt-5 text-[17px] md:text-[19px] leading-relaxed text-[var(--ink-dim)] max-w-3xl mx-auto"
            >
              From startups to enterprises, organizations trust RiverLoom to
              build AI products, SaaS platforms, websites, mobile applications,
              and intelligent automation solutions.
            </motion.p>
          </div>
        </div>

        {/* ── Marquee Rows ── */}
        <div
          className="relative z-[1] flex flex-col"
          style={{
            gap: "clamp(2rem, 4vw, 4rem)",
            overflow: "visible",
          }}
        >
          {/* ROW 1: Right to Left — 60s */}
          <MarqueeRow
            items={items}
            direction="rtl"
            speed={60}
            delay={0.3}
            isInView={isInView}
          />

          {/* ROW 2: Left to Right — 68s */}
          <MarqueeRow
            items={itemsTwo}
            direction="ltr"
            speed={68}
            delay={0.4}
            isInView={isInView}
          />
        </div>
      </section>
    </>
  );
}
