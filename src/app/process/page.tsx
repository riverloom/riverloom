import { Metadata } from "next";
import { buildMetadata } from "@/lib/metadata";
import { pageMeta } from "@/lib/site-config";
import { breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = buildMetadata(pageMeta["/process"], "/process");

export default function ProcessPage() {
  const breadcrumbs = [
    { name: "Home", item: "/" },
    { name: "Process", item: "/process" },
  ];

  const steps = [
    { number: "01", title: "Discovery", desc: "We immerse ourselves in your business, users, and market. Through research and workshops, we uncover the real problems that need solving." },
    { number: "02", title: "Strategy", desc: "Armed with insights, we craft a comprehensive product strategy. Every decision maps to business outcomes, technical feasibility, and user impact." },
    { number: "03", title: "Design", desc: "Designers and engineers collaborate to create elegant, intuitive interfaces. Every pixel is intentional, every interaction feels natural." },
    { number: "04", title: "Development", desc: "Our engineers write clean, performant code using modern architectures. We ship iteratively, test rigorously, and maintain transparent progress." },
    { number: "05", title: "Launch", desc: "We orchestrate flawless launches with comprehensive testing, performance optimization, and deployment automation. Zero friction from day one." },
    { number: "06", title: "Growth", desc: "Post-launch, we continue optimizing and evolving your product. Data-driven iterations and feature enhancements ensure lasting success." },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            ...breadcrumbSchema(breadcrumbs),
            "@context": "https://schema.org",
          }),
        }}
      />

      <section className="relative pt-40 pb-20 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/3 left-1/4 w-96 h-96 rounded-full bg-[var(--color-accent)]/5 blur-[120px]" />
        </div>
        <div className="container-main relative z-10">
          <div className="content-width text-center">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[var(--color-border)] bg-[var(--color-card)]/50 text-sm text-[var(--color-text-secondary)] mb-6">
              Our Process
            </span>
            <h1 className="text-5xl md:text-7xl font-bold leading-[1.05] tracking-tight text-[var(--color-text)] mb-6">
              How We Build
            </h1>
            <p className="text-lg text-[var(--color-text-secondary)] max-w-2xl mx-auto">
              A proven methodology that transforms ideas into exceptional digital products with precision and care.
            </p>
          </div>
        </div>
      </section>

      <section className="section-padding pt-0">
        <div className="container-main">
          <div className="content-width">
            <div className="space-y-16">
              {steps.map((step) => (
                <div key={step.number} className="flex items-start gap-8 group">
                  <div className="text-5xl md:text-7xl font-bold text-[var(--color-border)] group-hover:text-[var(--color-accent)]/20 transition-colors duration-500 leading-none shrink-0">
                    {step.number}
                  </div>
                  <div className="flex-1 pt-2">
                    <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-text)] mb-4">{step.title}</h2>
                    <p className="text-lg text-[var(--color-text-secondary)] leading-relaxed max-w-2xl">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
