"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { processSteps } from "@/data/process";
import ScrollReveal from "@/components/ui/ScrollReveal";
import TextReveal from "@/components/ui/TextReveal";
import { cn } from "@/lib/utils";

function ProcessStep({
  step,
  index,
  progress,
}: {
  step: typeof processSteps[0];
  index: number;
  progress: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isActive = progress > index / processSteps.length;
  const isCurrent = Math.abs(progress - index / processSteps.length) < 0.1;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, delay: index * 0.15 }}
      className="relative flex items-start gap-6 pb-16 last:pb-0"
    >
      {/* Number and connector */}
      <div className="flex flex-col items-center">
        <motion.div
          animate={{
            scale: isCurrent ? 1.15 : 1,
            backgroundColor: isActive
              ? "var(--color-accent)"
              : "var(--color-surface)",
            borderColor: isActive
              ? "var(--color-accent)"
              : "var(--color-border)",
          }}
          className={cn(
            "relative z-10 w-12 h-12 rounded-full border-2 flex items-center justify-center",
            "font-bold text-sm transition-colors duration-500",
            isActive ? "text-white" : "text-[var(--color-text-secondary)]"
          )}
        >
          {step.number.toString().padStart(2, "0")}
        </motion.div>
        {index < processSteps.length - 1 && (
          <motion.div
            animate={{ backgroundColor: isActive ? "var(--color-accent)" : "var(--color-border)" }}
            className="w-[1px] flex-1 min-h-[60px] mt-2"
          />
        )}
      </div>

      {/* Content */}
      <div className="flex-1 pt-2">
        <motion.h3
          animate={{ color: isActive ? "var(--color-text)" : "var(--color-text-secondary)" }}
          className="text-2xl md:text-3xl font-bold mb-3 transition-colors duration-500"
        >
          {step.title}
        </motion.h3>
        <p className="text-[var(--color-text-secondary)] leading-relaxed max-w-xl">
          {step.description}
        </p>
      </div>
    </motion.div>
  );
}

export default function Process() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start center", "end center"],
  });

  return (
    <section ref={ref} className="section-padding relative overflow-hidden">
      <div className="container-main">
        <div className="content-width">
          {/* Section header */}
          <ScrollReveal className="text-center mb-20">
            <TextReveal
              text="Our Process"
              as="h2"
              className="text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight text-[var(--color-text)] mb-6"
              wordByWord
            />
            <p className="text-lg text-[var(--color-text-secondary)] max-w-2xl mx-auto">
              A proven methodology that transforms ideas into exceptional digital products
              with precision and care.
            </p>
          </ScrollReveal>

          {/* Timeline */}
          <div className="max-w-3xl mx-auto">
            {processSteps.map((step, i) => (
              <ProcessStep
                key={step.id}
                step={step}
                index={i}
                progress={0.8}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
