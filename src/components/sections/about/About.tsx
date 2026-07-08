"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Sparkles, Shield, Zap } from "lucide-react";
import ScrollReveal from "@/components/ui/ScrollReveal";
import TextReveal from "@/components/ui/TextReveal";
import { cn } from "@/lib/utils";

const stats = [
  { label: "Years in Business", value: "5+" },
  { label: "Projects Delivered", value: "29+" },
  { label: "Team Members", value: "15+" },
  { label: "Client Satisfaction", value: "98%" },
];

export default function About() {
  return (
    <section className="section-padding relative overflow-hidden">
      <div className="container-main">
        <div className="content-width">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            {/* Left: Statement */}
            <ScrollReveal direction="left">
              <div className="space-y-8">
                <TextReveal
                  text="Engineering the future, one product at a time"
                  as="h2"
                  className="text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight text-[var(--color-text)]"
                  wordByWord
                />
                <div className="space-y-4">
                  <p className="text-lg text-[var(--color-text-secondary)] leading-relaxed">
                    RiverLoom is a premium software engineering studio that partners with
                    ambitious businesses to build exceptional digital products. We combine
                    deep technical expertise with creative vision to deliver solutions that
                    drive real impact.
                  </p>
                  <p className="text-lg text-[var(--color-text-secondary)] leading-relaxed">
                    Our team of 45+ engineers, designers, and strategists bring together
                    decades of experience from top technology companies and startups alike.
                  </p>
                </div>
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 text-[var(--color-accent)] font-medium hover:gap-3 transition-all group"
                >
                  Learn more about us
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </ScrollReveal>

            {/* Right: Stats & Visual */}
            <ScrollReveal direction="right" delay={0.2}>
              <div className="relative">
                {/* Floating element */}
                <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full bg-[var(--color-accent)]/5 blur-3xl" />
                <div className="absolute -bottom-8 -left-8 w-40 h-40 rounded-full bg-[var(--color-accent)]/5 blur-3xl" />

                <div className="relative grid grid-cols-2 gap-4">
                  {stats.map((stat, i) => (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2 + i * 0.1, duration: 0.5 }}
                      className={cn(
                        "p-6 rounded-2xl border border-[var(--color-border)]",
                        "bg-[var(--color-card)] hover:bg-[var(--color-surface)] transition-colors duration-300"
                      )}
                    >
                      <div className="text-3xl md:text-4xl font-bold text-[var(--color-accent)] mb-1">
                        {stat.value}
                      </div>
                      <div className="text-sm text-[var(--color-text-secondary)]">
                        {stat.label}
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Values */}
                <div className="mt-8 grid grid-cols-3 gap-3">
                  {[
                    { icon: Sparkles, label: "Innovation" },
                    { icon: Shield, label: "Quality" },
                    { icon: Zap, label: "Speed" },
                  ].map(({ icon: Icon, label }) => (
                    <div
                      key={label}
                      className="flex items-center gap-2 px-4 py-3 rounded-xl bg-[var(--color-card)] border border-[var(--color-border)]"
                    >
                      <Icon className="w-4 h-4 text-[var(--color-accent)]" />
                      <span className="text-xs font-medium text-[var(--color-text)]">{label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
