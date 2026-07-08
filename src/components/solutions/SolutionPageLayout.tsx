"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { ArrowUpRight, CheckCircle2, ChevronRight } from "lucide-react";
import { SolutionData, allSolutions } from "@/data/solutions";
import SolutionContactForm from "./SolutionContactForm";
import AiFirstIllustration from "@/components/ui/svg-illustrations/AiFirstIllustration";
import ShieldIllustration from "@/components/ui/svg-illustrations/ShieldIllustration";
import CloudArchitectureIllustration from "@/components/ui/svg-illustrations/CloudArchitectureIllustration";
import PerformanceIllustration from "@/components/ui/svg-illustrations/PerformanceIllustration";
import PartnershipIllustration from "@/components/ui/svg-illustrations/PartnershipIllustration";
import InnovationIllustration from "@/components/ui/svg-illustrations/InnovationIllustration";

const illustrationMap: Record<string, React.ComponentType<{ className?: string }>> = {
  "ai-engineering": AiFirstIllustration,
  security: ShieldIllustration,
  cloud: CloudArchitectureIllustration,
  performance: PerformanceIllustration,
  partnership: PartnershipIllustration,
  business: InnovationIllustration,
};

const slugToPath: Record<string, string> = {
  "ai-engineering": "/solutions/ai-engineering",
  security: "/solutions/security",
  cloud: "/solutions/cloud",
  performance: "/solutions/performance",
  partnership: "/solutions/partnership",
  business: "/solutions/business",
};

export default function SolutionPageLayout({ solution }: { solution: SolutionData }) {
  const Illustration = illustrationMap[solution.slug];
  const otherSolutions = allSolutions.filter((s) => s.slug !== solution.slug);

  return (
    <main className="bg-[#F8F6F1]">
      {/* ─── Hero ─── */}
      <HeroSection solution={solution} Illustration={Illustration} />

      {/* ─── Process ─── */}
      <ProcessSection solution={solution} />

      {/* ─── Case Studies ─── */}
      <CaseStudiesSection solution={solution} />

      {/* ─── Benefits ─── */}
      <BenefitsSection solution={solution} />

      {/* ─── Tech Stack ─── */}
      <TechSection solution={solution} />

      {/* ─── FAQ ─── */}
      <FAQSection solution={solution} />

      {/* ─── Other Solutions ─── */}
      <OtherSolutionsSection solutions={otherSolutions} />

      {/* ─── Contact Form ─── */}
      <SolutionContactForm />
    </main>
  );
}

/* ══════════════════════════════════════════════
   HERO
   ══════════════════════════════════════════════ */
function HeroSection({
  solution,
  Illustration,
}: {
  solution: SolutionData;
  Illustration?: React.ComponentType<{ className?: string }>;
}) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section
      ref={ref}
      className="relative overflow-hidden pt-32 pb-20 md:pt-40 md:pb-28"
    >
      <div className="pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='0.08'/%3E%3C/svg%3E")`,
          backgroundSize: "200px 200px",
        }}
      />
      <div className="pointer-events-none absolute left-1/2 top-0 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-[rgba(22,155,98,0.06)] blur-[160px]" />

      <div className="relative z-10 mx-auto max-w-[1280px] px-5 md:px-10">
        {/* Breadcrumb */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="mb-8 flex items-center gap-2 text-sm text-[var(--color-text-tertiary)]"
        >
          <Link href="/" className="hover:text-[var(--color-accent)] transition-colors">Home</Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-[var(--color-text-secondary)]">Solutions</span>
          <ChevronRight className="h-3 w-3" />
          <span className="text-[var(--color-text)] font-medium">{solution.title}</span>
        </motion.div>

        <div className="grid items-center gap-12 md:grid-cols-[1fr_auto]">
          <div>
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 }}
              className="badge-premium mb-5 inline-flex"
            >
              {solution.timeline}
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="mb-4 text-[clamp(2.5rem,5.5vw,4.5rem)] font-black leading-[1.04] tracking-[-0.04em] text-[var(--color-text)]"
            >
              {solution.title}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="mb-4 text-xl italic text-[var(--color-accent)]"
            >
              {solution.tagline}
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.35, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-xl text-lg leading-relaxed text-[var(--color-text-secondary)]"
            >
              {solution.heroDescription}
            </motion.p>
          </div>

          {Illustration && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.3, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center justify-center"
            >
              <div className="relative flex h-48 w-48 items-center justify-center md:h-60 md:w-60">
                <div className="absolute inset-0 rounded-full bg-[var(--color-accent-subtle)] opacity-60" />
                <Illustration className="relative z-10 h-44 w-44 md:h-56 md:w-56" />
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════
   PROCESS
   ══════════════════════════════════════════════ */
function ProcessSection({ solution }: { solution: SolutionData }) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section ref={ref} className="relative overflow-hidden py-20 md:py-28">
      <div className="pointer-events-none absolute right-0 top-0 h-[400px] w-[400px] rounded-full bg-[rgba(22,155,98,0.04)] blur-[120px]" />

      <div className="relative z-10 mx-auto max-w-[1280px] px-5 md:px-10">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-4 text-sm font-semibold uppercase tracking-[0.15em] text-[var(--color-accent)]"
        >
          Our Process
        </motion.h2>
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12 text-[clamp(1.75rem,3.5vw,2.75rem)] font-bold leading-[1.1] tracking-[-0.03em] text-[var(--color-text)]"
        >
          How we deliver <span className="text-[var(--color-accent)]">{solution.title.split(" ")[0].toLowerCase()}</span> excellence
        </motion.h3>

        <div className="grid gap-6 md:grid-cols-5">
          {solution.processSteps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + i * 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="group rounded-[24px] border border-[var(--color-border)] bg-white p-6 shadow-[0_1px_3px_rgba(0,0,0,0.03)] transition-shadow duration-300 hover:shadow-[0_4px_20px_rgba(0,0,0,0.06)]"
            >
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-[var(--color-accent-subtle)] text-sm font-bold text-[var(--color-accent)]">
                {i + 1}
              </div>
              <h4 className="mb-2 text-base font-bold text-[var(--color-text)]">{step.title}</h4>
              <p className="text-sm leading-relaxed text-[var(--color-text-secondary)]">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════
   CASE STUDIES
   ══════════════════════════════════════════════ */
function CaseStudiesSection({ solution }: { solution: SolutionData }) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section ref={ref} className="relative overflow-hidden py-20 md:py-28">
      <div className="mx-auto max-w-[1280px] px-5 md:px-10">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-4 text-sm font-semibold uppercase tracking-[0.15em] text-[var(--color-accent)]"
        >
          Case Studies
        </motion.h2>
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12 text-[clamp(1.75rem,3.5vw,2.75rem)] font-bold leading-[1.1] tracking-[-0.03em] text-[var(--color-text)]"
        >
          Real results, real impact
        </motion.h3>

        <div className="grid gap-8 md:grid-cols-2">
          {solution.caseStudies.map((cs, i) => (
            <motion.div
              key={cs.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + i * 0.15, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="group rounded-[32px] border border-[var(--color-border)] bg-white p-8 shadow-[0_1px_3px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_32px_rgba(0,0,0,0.06)] transition-shadow duration-500"
            >
              <div className="mb-4 inline-block rounded-full bg-[var(--color-accent-subtle)] px-4 py-1 text-sm font-bold text-[var(--color-accent)]">
                {cs.metric}
              </div>
              <h4 className="mb-3 text-xl font-bold text-[var(--color-text)]">{cs.title}</h4>
              <p className="mb-4 text-sm leading-relaxed text-[var(--color-text-secondary)]">{cs.context}</p>
              <p className="text-sm font-medium text-[var(--color-accent)]">{cs.result}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════
   BENEFITS
   ══════════════════════════════════════════════ */
function BenefitsSection({ solution }: { solution: SolutionData }) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section ref={ref} className="relative overflow-hidden bg-section-soft-green py-20 md:py-28">
      <div className="mx-auto max-w-[1280px] px-5 md:px-10">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12 text-[clamp(1.75rem,3.5vw,2.75rem)] font-bold leading-[1.1] tracking-[-0.03em] text-[var(--color-text)]"
        >
          Why choose our{" "}
          <span className="text-[var(--color-accent)]">{solution.title.split(" ")[0].toLowerCase()}</span>{" "}
          expertise
        </motion.h2>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {solution.benefits.map((benefit, i) => (
            <motion.div
              key={benefit}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 + i * 0.08, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-start gap-3 rounded-[20px] bg-white p-5 shadow-[0_1px_3px_rgba(0,0,0,0.04)]"
            >
              <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-[var(--color-accent)]" />
              <span className="text-[15px] text-[var(--color-text)]">{benefit}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════
   TECH STACK
   ══════════════════════════════════════════════ */
function TechSection({ solution }: { solution: SolutionData }) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section ref={ref} className="relative overflow-hidden py-20 md:py-28">
      <div className="pointer-events-none absolute left-0 top-0 h-[400px] w-[400px] rounded-full bg-[rgba(22,155,98,0.04)] blur-[120px]" />

      <div className="relative z-10 mx-auto max-w-[1280px] px-5 md:px-10">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-4 text-sm font-semibold uppercase tracking-[0.15em] text-[var(--color-accent)]"
        >
          Technology
        </motion.h2>
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12 text-[clamp(1.75rem,3.5vw,2.75rem)] font-bold leading-[1.1] tracking-[-0.03em] text-[var(--color-text)]"
        >
          Tools & technologies we use
        </motion.h3>

        <div className="flex flex-wrap gap-3">
          {solution.techItems.map((item, i) => (
            <motion.span
              key={item}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.15 + i * 0.05, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="rounded-full border border-[var(--color-border)] bg-white px-4 py-2 text-sm font-medium text-[var(--color-text-secondary)] transition-all duration-300 hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] hover:shadow-sm"
            >
              {item}
            </motion.span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════
   FAQ
   ══════════════════════════════════════════════ */
function FAQSection({ solution }: { solution: SolutionData }) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section ref={ref} className="relative overflow-hidden bg-section-soft-green py-20 md:py-28">
      <div className="mx-auto max-w-[800px] px-5 md:px-10">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12 text-center text-[clamp(1.75rem,3.5vw,2.5rem)] font-bold leading-[1.1] tracking-[-0.03em] text-[var(--color-text)]"
        >
          Frequently asked questions
        </motion.h2>

        <div className="space-y-3">
          {solution.faqs.map((faq, i) => (
            <motion.div
              key={faq.q}
              initial={{ opacity: 0, y: 15 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 + i * 0.08, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden rounded-[20px] border border-[var(--color-border)] bg-white"
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="flex w-full items-center justify-between px-6 py-5 text-left text-[15px] font-semibold text-[var(--color-text)] transition-colors hover:text-[var(--color-accent)]"
              >
                {faq.q}
                <motion.span
                  animate={{ rotate: openIndex === i ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex-shrink-0 text-[var(--color-accent)]"
                >
                  <ChevronRight className="h-4 w-4" />
                </motion.span>
              </button>
              <motion.div
                initial={false}
                animate={{
                  height: openIndex === i ? "auto" : 0,
                  opacity: openIndex === i ? 1 : 0,
                }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="overflow-hidden"
              >
                <div className="border-t border-[var(--color-border)] px-6 py-5 text-sm leading-relaxed text-[var(--color-text-secondary)]">
                  {faq.a}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════
   OTHER SOLUTIONS
   ══════════════════════════════════════════════ */
function OtherSolutionsSection({ solutions }: { solutions: SolutionData[] }) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section ref={ref} className="relative overflow-hidden py-20 md:py-28">
      <div className="mx-auto max-w-[1280px] px-5 md:px-10">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-4 text-sm font-semibold uppercase tracking-[0.15em] text-[var(--color-accent)]"
        >
          Explore More
        </motion.h2>
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12 text-[clamp(1.75rem,3.5vw,2.75rem)] font-bold leading-[1.1] tracking-[-0.03em] text-[var(--color-text)]"
        >
          Other solutions
        </motion.h3>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {solutions.map((sol, i) => {
            const SolIll = illustrationMap[sol.slug];
            return (
              <motion.div
                key={sol.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.2 + i * 0.08, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                <Link
                  href={slugToPath[sol.slug] || `/solutions/${sol.slug}`}
                  className="group flex h-full items-center gap-4 rounded-[24px] border border-[var(--color-border)] bg-white p-6 transition-all duration-300 hover:border-[rgba(22,155,98,0.3)] hover:shadow-[0_4px_20px_rgba(0,0,0,0.06)]"
                >
                  {SolIll && (
                    <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full bg-[var(--color-accent-subtle)]">
                      <SolIll className="h-10 w-10" />
                    </div>
                  )}
                  <div className="flex-1">
                    <h4 className="text-base font-bold text-[var(--color-text)] group-hover:text-[var(--color-accent)] transition-colors">
                      {sol.title}
                    </h4>
                    <p className="mt-0.5 text-sm text-[var(--color-text-secondary)]">{sol.tagline}</p>
                  </div>
                  <ArrowUpRight className="h-4 w-4 flex-shrink-0 text-[var(--color-text-tertiary)] transition-all duration-300 group-hover:text-[var(--color-accent)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
