"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";
import { processSteps } from "@/data/process";

const visualIcons: Record<string, string> = {
  explore: "✦",
  blueprint: "◇",
  build: "◆",
  rocket: "▲",
  grow: "●",
};

export default function ProcessTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", `-${(processSteps.length - 1) * 100}%`]);

  return (
    <section ref={containerRef} className="relative h-[500vh]" id="process">
      <div className="sticky top-0 h-screen overflow-hidden bg-white">
        {/* Header */}
        <div className="absolute top-12 left-0 right-0 z-20 text-center">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="badge-premium text-[11px] tracking-[0.15em] uppercase font-medium inline-flex"
          >
            <span className="w-[5px] h-[5px] rounded-full bg-[#169B62] mr-2" />
            Our Methodology
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
            className="text-[clamp(32px,5vw,60px)] font-semibold tracking-tight text-[#1C1C1C] mt-3"
          >
            The Process
          </motion.h2>
        </div>

        {/* Horizontal track */}
        <div className="h-full flex items-center">
          <motion.div
            style={{ x }}
            className="flex will-change-transform"
          >
            {processSteps.map((step, index) => (
              <div
                key={step.id}
                className="w-screen h-screen flex-shrink-0 flex items-center justify-center px-8 md:px-16"
              >
                <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                  {/* Visual */}
                  <div className="relative aspect-square max-w-md mx-auto lg:mx-0">
                    <div className="absolute inset-0 rounded-full border border-[#E7E2D8]" />
                    <div className="absolute inset-6 rounded-full border border-[#E7E2D8]" />
                    <div className="absolute inset-12 rounded-full border border-[#E7E2D8]" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <motion.span
                        initial={{ scale: 0, rotate: -180 }}
                        whileInView={{ scale: 1, rotate: 0 }}
                        transition={{ duration: 0.6, delay: 0.2, ease: [0.19, 1, 0.22, 1] }}
                        className="text-6xl md:text-8xl text-[#169B62]"
                      >
                        {visualIcons[step.visual] || "●"}
                      </motion.span>
                    </div>
                    {/* Number */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.3, duration: 0.4, ease: [0.19, 1, 0.22, 1] }}
                      className="absolute -top-2 -right-2 w-12 h-12 rounded-xl bg-[#169B62] text-white flex items-center justify-center text-lg font-bold"
                    >
                      {String(step.number).padStart(2, "0")}
                    </motion.div>
                  </div>

                  {/* Content */}
                  <div className="space-y-6">
                    <motion.h3
                      initial={{ opacity: 0, y: 40 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.1, ease: [0.19, 1, 0.22, 1] }}
                      className="text-[clamp(36px,6vw,80px)] font-semibold tracking-tight text-[#1C1C1C] leading-[1.05]"
                    >
                      {step.title}
                    </motion.h3>
                    <motion.p
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.2, ease: [0.19, 1, 0.22, 1] }}
                      className="text-lg text-[#6B6B6B] leading-relaxed max-w-xl"
                    >
                      {step.description}
                    </motion.p>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.3 }}
                      className="pt-4"
                    >
                      <div className="inline-flex items-center gap-3 text-xs uppercase tracking-[0.15em] text-[#169B62] font-medium">
                        <span className="w-8 h-px bg-[#169B62]" />
                        Step {step.number} of {processSteps.length}
                      </div>
                    </motion.div>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Progress dots */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
          {processSteps.map((_, i) => (
            <div
              key={i}
              className="w-2 h-2 rounded-full bg-[#169B62] transition-all duration-300"
              style={{ opacity: 0.1 + (i / processSteps.length) * 0.9 }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
