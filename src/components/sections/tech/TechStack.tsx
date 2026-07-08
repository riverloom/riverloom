"use client";

import { motion } from "framer-motion";
import { techNodes } from "@/data/tech";
import type { TechNode } from "@/types";
import ScrollReveal from "@/components/ui/ScrollReveal";
import TextReveal from "@/components/ui/TextReveal";

const categoryColors: Record<string, string> = {
  Frontend: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  Backend: "bg-green-500/10 text-green-400 border-green-500/20",
  AI: "bg-purple-500/10 text-purple-400 border-purple-500/20",
  Language: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  Infrastructure: "bg-orange-500/10 text-orange-400 border-orange-500/20",
  Cloud: "bg-sky-500/10 text-sky-400 border-sky-500/20",
  Systems: "bg-rose-500/10 text-rose-400 border-rose-500/20",
  Data: "bg-teal-500/10 text-teal-400 border-teal-500/20",
};

export default function TechStack() {
  return (
    <section className="section-padding relative overflow-hidden">
      <div className="container-main">
        <div className="content-width">
          <ScrollReveal className="text-center mb-20">
            <TextReveal
              text="Our Technology Stack"
              as="h2"
              className="text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight text-[var(--color-text)] mb-6"
              wordByWord
            />
            <p className="text-lg text-[var(--color-text-secondary)] max-w-2xl mx-auto">
              We leverage cutting-edge technologies to build solutions that are
              fast, reliable, and future-proof.
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {techNodes.map((tech: TechNode, i: number) => (
              <motion.div
                key={tech.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05, duration: 0.4 }}
                whileHover={{
                  y: -8,
                  transition: { duration: 0.3 },
                }}
                className="relative group"
              >
                <div className="p-6 rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)] hover:border-[var(--color-accent)]/30 transition-all duration-300">
                  <div className="w-10 h-10 rounded-xl bg-[var(--color-accent)]/10 flex items-center justify-center mb-4">
                    <span className="text-lg font-bold text-[var(--color-accent)]">
                      {tech.name.charAt(0)}
                    </span>
                  </div>

                  <h3 className="font-semibold text-[var(--color-text)] mb-2">
                    {tech.name}
                  </h3>

                  <span
                    className={`inline-block text-xs px-2 py-1 rounded-full border ${categoryColors[tech.category] || "bg-gray-500/10 text-gray-400"}`}
                  >
                    {tech.category}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
