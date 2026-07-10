"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import Typewriter from "./Typewriter";
import CoreScene from "./CoreScene";
import MagneticWrapper from "@/components/ui/MagneticWrapper";
import { BOOKING_URL, BOOKING_ATTRS } from "@/lib/booking";

/* ─── Animated counter ─── */
function Counter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 1600;
    const step = 16;
    const increment = target / (duration / step);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, step);
    return () => clearInterval(timer);
  }, [target]);

  return (
    <span>
      {count}
      {suffix}
    </span>
  );
}

/* ─── Background ambient layers ─── */
function AmbientBackground() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(22,155,98,0.05) 0%, transparent 60%)",
        }}
      />
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[500px]"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(22,155,98,0.03) 0%, transparent 60%)",
        }}
      />

      <svg className="absolute inset-0 w-full h-full opacity-[0.02]">
        <defs>
          <pattern id="heroGridLight" x="0" y="0" width="64" height="64" patternUnits="userSpaceOnUse">
            <path d="M 64 0 L 0 0 0 64" fill="none" stroke="#1C1C1C" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#heroGridLight)" />
      </svg>

      <motion.div
        className="absolute top-[35%] left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(22,155,98,0.06) 30%, rgba(22,155,98,0.1) 50%, rgba(22,155,98,0.06) 70%, transparent 100%)",
        }}
        animate={{ opacity: [0.2, 0.5, 0.2] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="absolute top-[65%] left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(22,155,98,0.03) 20%, rgba(22,155,98,0.05) 50%, rgba(22,155,98,0.03) 80%, transparent 100%)",
        }}
        animate={{ opacity: [0.1, 0.3, 0.1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />

      <div
        className="absolute inset-0 opacity-[0.015] mix-blend-multiply"
        style={{
          backgroundImage: "url(/assets/noise-texture.svg)",
          backgroundSize: "200px 200px",
        }}
      />

      <Particles />
    </div>
  );
}

/* ─── Seeded PRNG ─── */
function mulberry32(a: number) {
  return () => {
    a |= 0; a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function Particles() {
  const rng = mulberry32(42);
  const seeds = Array.from({ length: 20 }, () => ({
    left: rng() * 100,
    top: rng() * 100,
    drift: 20 + rng() * 30,
    dur: 5 + rng() * 5,
    delay: rng() * 5,
  }));

  return (
    <>
      {seeds.map((s, i) => (
        <motion.div
          key={i}
          className="absolute w-[2px] h-[2px] rounded-full"
          style={{
            background: "#169B62",
            opacity: 0.15,
            left: `${s.left}%`,
            top: `${s.top}%`,
          }}
          animate={{
            y: [0, -s.drift, 0],
            opacity: [0.08, 0.25, 0.08],
          }}
          transition={{
            duration: s.dur,
            repeat: Infinity,
            ease: "easeInOut",
            delay: s.delay,
          }}
        />
      ))}
    </>
  );
}

/* ─── Premium Hero Scene ─── */
function HeroScene() {
  return (
    <div className="absolute inset-0 z-[1] pointer-events-none overflow-hidden">
      {/* Large premium emerald glow */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(22,155,98,0.08) 0%, rgba(22,155,98,0.03) 30%, transparent 60%)",
        }}
        animate={{
          scale: [1, 1.05, 1],
          opacity: [0.6, 0.9, 0.6],
        }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Concentric ring ornament */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
      >
        <svg width="500" height="500" viewBox="0 0 500 500" fill="none">
          <circle cx="250" cy="250" r="240" stroke="#169B62" strokeWidth="0.6" opacity="0.12" />
          <circle cx="250" cy="250" r="180" stroke="#169B62" strokeWidth="0.4" opacity="0.08" />
          <circle cx="250" cy="250" r="120" stroke="#169B62" strokeWidth="0.3" opacity="0.06" />
          <circle cx="250" cy="250" r="60" stroke="#169B62" strokeWidth="0.3" opacity="0.04" />
        </svg>
      </motion.div>

      {/* Counter-rotating inner ring */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        animate={{ rotate: -360 }}
        transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
      >
        <svg width="350" height="350" viewBox="0 0 350 350" fill="none">
          <line x1="175" y1="10" x2="175" y2="340" stroke="#169B62" strokeWidth="0.3" opacity="0.08" />
          <line x1="10" y1="175" x2="340" y2="175" stroke="#169B62" strokeWidth="0.3" opacity="0.08" />
          <line x1="60" y1="60" x2="290" y2="290" stroke="#169B62" strokeWidth="0.2" opacity="0.06" />
          <line x1="290" y1="60" x2="60" y2="290" stroke="#169B62" strokeWidth="0.2" opacity="0.06" />
        </svg>
      </motion.div>

      {/* Premium floating orb - top right */}
      <motion.div
        className="absolute top-[18%] right-[12%] w-40 h-40 rounded-full"
        animate={{
          y: [0, -16, 0],
          scale: [1, 1.05, 1],
        }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="absolute inset-0 rounded-full border border-[#169B62]/15" />
        <div className="absolute inset-4 rounded-full bg-gradient-to-br from-[#169B62]/8 to-[#1FC77E]/4" />
        <div className="absolute inset-8 rounded-full border border-[#169B62]/10" />
      </motion.div>

      {/* Second floating element - bottom left */}
      <motion.div
        className="absolute bottom-[20%] left-[10%] w-28 h-28 rounded-full"
        animate={{
          y: [0, 12, 0],
          scale: [1, 1.04, 1],
        }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      >
        <div className="absolute inset-0 rounded-full border border-[#E7E2D8]" />
        <div className="absolute inset-5 rounded-full bg-[#E8F7EF]/20" />
      </motion.div>

      {/* Small floating dots */}
      <motion.div
        className="absolute top-[30%] left-[20%] w-3 h-3 rounded-full bg-[#169B62]/15"
        animate={{ y: [0, -8, 0], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />
      <motion.div
        className="absolute bottom-[35%] right-[22%] w-2 h-2 rounded-full bg-[#169B62]/12"
        animate={{ y: [0, 6, 0], opacity: [0.2, 0.5, 0.2] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 3 }}
      />
      <motion.div
        className="absolute top-[55%] right-[28%] w-4 h-4 rounded-full bg-[#169B62]/8"
        animate={{ y: [0, -10, 0], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
      />
    </div>
  );
}

export default function Hero() {
  return (
    <section className="relative w-full min-h-[100svh] flex items-center justify-center overflow-hidden bg-[#050807]">
      {/* Three.js Core Scene - animated mesh */}
      <CoreScene />

      {/* Background Effects */}
      <AmbientBackground />

      {/* Subtle vignette */}
      <div
        className="absolute inset-0 z-[2] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 65% 50% at 50% 45%, rgba(5,8,7,0) 0%, rgba(5,8,7,0.4) 50%, rgba(5,8,7,0.95) 100%)",
        }}
      />

      {/* Content */}
      <div className="relative z-[3] flex flex-col items-center w-full min-h-screen">
        {/* Main content area — centered */}
        <div className="flex flex-col items-center text-center px-6 sm:px-8 w-full max-w-[900px] mx-auto pt-28 md:pt-36 flex-1 justify-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
            className="inline-flex items-center gap-2.5 px-5 py-[9px] rounded-full border font-mono text-[12px] tracking-[0.18em] uppercase text-[#1FC77E] mb-10 md:mb-12"
            style={{
              background: "rgba(22,199,132,0.06)",
              borderColor: "rgba(22,199,132,0.2)",
            }}
          >
            <span
              className="w-[5px] h-[5px] rounded-full bg-[#1FC77E]"
              style={{ boxShadow: "0 0 6px 1px rgba(22,199,132,0.5)" }}
            />
            Premium Engineering Studio
          </motion.div>

          {/* Heading — two lines */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1], delay: 0.1 }}
            className="text-[clamp(36px,7vw,88px)] leading-[1.06] tracking-[-0.03em] text-white mb-5 sm:mb-4 font-bold"
          >
            Engineering{" "}
            <span className="block md:inline">Tomorrow'</span>
            <span className="block -mt-1 md:inline md:mt-0">s Digital Future</span>
          </motion.h1>

          {/* Typewriter line */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.19, 1, 0.22, 1], delay: 0.25 }}
            className="text-[clamp(28px,4vw,52px)] leading-[1.15] tracking-[-0.015em] mb-8 font-bold text-[#1FC77E]"
          >
            <Typewriter />
          </motion.div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.19, 1, 0.22, 1], delay: 0.35 }}
            className="text-[17px] sm:text-[19px] leading-[1.8] text-[#B5B5B5] max-w-[700px] mb-12"
          >
            RiverLoom helps startups and enterprises transform ideas into intelligent digital products. We design, develop, and scale AI solutions, custom software, SaaS platforms, websites, mobile applications, cloud infrastructure, and automation systems.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.19, 1, 0.22, 1], delay: 0.45 }}
            className="flex flex-col sm:flex-row items-center gap-4 sm:gap-5 flex-wrap justify-center"
          >
            <MagneticWrapper strength={0.25}>
              <a
                href={BOOKING_URL}
                target={BOOKING_ATTRS.target}
                rel={BOOKING_ATTRS.rel}
                className="group inline-flex items-center gap-2.5 px-9 py-4 rounded-full text-[17px] font-semibold bg-[#169B62] text-white shadow-[0_4px_20px_rgba(22,155,98,0.3)] hover:shadow-[0_8px_40px_rgba(22,155,98,0.4)] hover:bg-[#1FC77E] hover:scale-[1.02] transition-all duration-300 ease-out-expo overflow-hidden relative"
              >
                <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out-expo bg-gradient-to-r from-transparent via-white/15 to-transparent" />
                <span className="relative z-[1]">Book Free Consultation</span>
                <svg
                  className="relative z-[1] w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
                  viewBox="0 0 16 16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M3 8h10" />
                  <path d="M9 4l4 4-4 4" />
                </svg>
              </a>
            </MagneticWrapper>

            <Link
              href="/services"
              className="group inline-flex items-center gap-2.5 px-8 py-4 rounded-full text-[17px] font-medium text-white/60 hover:text-white border border-white/10 hover:border-[#169B62]/50 hover:bg-[#169B62]/10 transition-all duration-300 ease-out-expo"
            >
              Explore Our Solutions
            </Link>
          </motion.div>
        </div>

        {/* Statistics — full-width white cards at bottom */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1], delay: 0.6 }}
          className="w-full px-6 sm:px-8 pb-10 md:pb-14 mt-12 sm:mt-16 md:mt-20"
        >
          <div className="w-full max-w-[1400px] mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
              {[
                { value: 29, label: "Projects Delivered", suffix: "+" },
                { value: 98, label: "Client Satisfaction", suffix: "%" },
                { value: 25, label: "Industries Served", suffix: "+" },
                { value: 5, label: "Years of Innovation", suffix: "+" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="relative rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-5 md:p-7 text-center hover:bg-white/10 transition-all duration-300"
                >
                  {/* Subtle top glow */}
                  <div
                    className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px"
                    style={{
                      background: "linear-gradient(90deg, transparent, rgba(22,199,132,0.3), transparent)",
                    }}
                  />
                  <div className="text-[28px] sm:text-[34px] font-bold tracking-[-0.02em] text-[#1FC77E]">
                    <Counter target={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="text-[11px] md:text-[12px] tracking-[0.08em] uppercase text-[#9E9E9E] mt-[6px] whitespace-nowrap font-semibold">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll Cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.6 }}
        className="absolute bottom-[28px] left-1/2 -translate-x-1/2 z-[3] flex flex-col items-center gap-[6px] text-[9px] tracking-[0.15em] uppercase text-[#7D7D7D] font-medium"
      >
       
        <div
          className="w-px h-[24px]"
          style={{
            background: "linear-gradient(180deg, #1FC77E, transparent)",
            animation: "scroll-indicator 2s ease-in-out infinite",
          }}
        />
      </motion.div>
    </section>
  );
}
