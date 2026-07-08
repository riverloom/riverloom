"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { premiumServices } from "@/data/services";
import { FloatingGlows, FloatingDots, SectionGlow } from "./components/BackgroundDecorations";
import { ServiceVisualRouter } from "./components/ServiceVisuals";
import PremiumFinalCTA from "./components/PremiumFinalCTA";

/* ─── icon resolver ─── */
const capIcons: Record<string, string> = {
  Bot: "🤖", Brain: "🧠", Eye: "👁", BarChart3: "📊",
  Container: "📦", GitBranch: "🔀", Shield: "🛡", Activity: "📈",
  Monitor: "🖥", Blocks: "🧱", Users: "👥", Lock: "🔒",
  Smartphone: "📱", Apple: "🍎", Square: "⬜", Wifi: "📶",
  Cloud: "☁️", CreditCard: "💳", LayoutDashboard: "📋", RefreshCw: "🔄",
  Target: "🎯", TrendingUp: "📈", PieChart: "🥧", Megaphone: "📢",
  Zap: "⚡", Globe: "🌐", Search: "🔍", Palette: "🎨",
};

/* ─── Hero Section ─── */
function HeroSection() {
  const ref = useRef<HTMLElement>(null);
  const iv = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="relative pt-24 md:pt-32 pb-8 md:pb-12 overflow-hidden">
      <div className="container-main">
        <motion.div className="max-w-3xl" initial={{ opacity: 0, y: 30 }} animate={iv ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, ease: [0.19, 1, 0.22, 1] }}>
          <motion.div
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-[0.15em] mb-4"
            style={{ backgroundColor: "#E8F7EF", color: "#169B62", border: "1px solid rgba(22,155,98,0.15)" }}
            initial={{ opacity: 0, y: 10 }} animate={iv ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.5 }}
          >
            <motion.span className="w-1.5 h-1.5 rounded-full bg-[#169B62]" animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 2, repeat: Infinity }} />
            Our Services
          </motion.div>
          <h1 className="text-[clamp(36px,5vw,64px)] font-bold leading-[1.04] tracking-[-0.03em] mb-3" style={{ color: "#1C1C1C" }}>
            Full-Service Digital
            <br />
            <span className="text-gradient-accent">Engineering Agency</span>
          </h1>
          <p className="text-[17px] md:text-[19px] leading-relaxed max-w-xl" style={{ color: "#6B6B6B" }}>
            From AI agents to cloud infrastructure, we design and build the digital products and platforms that power modern businesses.
          </p>
          <motion.div className="flex flex-wrap gap-3 mt-5" initial={{ opacity: 0, y: 10 }} animate={iv ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.3 }}>
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Link href="/contact" className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold text-white" style={{ backgroundColor: "#169B62", boxShadow: "0 4px 20px rgba(22,155,98,0.35)" }}>
                Start Your Project <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Link href="/work" className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold" style={{ border: "1px solid #E7E2D8", color: "#1C1C1C" }}>
                View Our Work <ArrowUpRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── Background number ─── */
function BgNumber({ num, accent }: { num: number; accent: string }) {
  return (
    <div className="absolute top-0 right-0 pointer-events-none select-none overflow-hidden leading-none">
      <span className="block font-bold tracking-[-0.05em] text-right"
        style={{ fontSize: "clamp(100px, 16vw, 220px)", color: accent, opacity: 0.035, lineHeight: 0.85 }}
      >
        {String(num).padStart(2, "0")}
      </span>
    </div>
  );
}

/* ─── Divider ─── */
function SectionDivider({ accent }: { accent: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const iv = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div ref={ref} className="relative w-full h-px my-2 md:my-3" initial={{ scaleX: 0, opacity: 0 }} animate={iv ? { scaleX: 1, opacity: 1 } : {}} transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}>
      <motion.div className="absolute inset-0" style={{ background: `linear-gradient(90deg, transparent 0%, ${accent} 30%, ${accent} 70%, transparent 100%)`, opacity: 0.12 }} />
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SERVICE SECTION BUILDER
   Each service uses layoutVariant to pick its own unique layout
   ═══════════════════════════════════════════════════════════════ */

function ServiceContent({ service }: { service: typeof premiumServices[0] }) {
  const ref = useRef<HTMLDivElement>(null);
  const iv = useInView(ref, { once: true, margin: "-60px" });

  return (
    <div ref={ref} className="relative">
      {/* Badge */}
      <motion.div
        className="inline-flex items-center gap-1.5 self-start px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-[0.15em] mb-2.5"
        style={{ backgroundColor: `${service.accent}10`, color: service.accentLight, border: `1px solid ${service.accent}15` }}
        initial={{ opacity: 0, y: 8 }} animate={iv ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.4, ease: [0.19, 1, 0.22, 1] }}
      >
        <motion.span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: service.accentLight }} animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }} />
        {service.shortTitle.toUpperCase()}
      </motion.div>

      {/* Tagline */}
      <motion.p
        className="text-[13px] font-semibold uppercase tracking-[0.12em] mb-1"
        style={{ color: `${service.accent}70` }}
        initial={{ opacity: 0, x: -20 }} animate={iv ? { opacity: 1, x: 0 } : {}} transition={{ delay: 0.05, duration: 0.4, ease: [0.19, 1, 0.22, 1] }}
      >
        {service.tagline}
      </motion.p>

      {/* Title — large 48-60px heading */}
      <motion.h3
        className="text-[clamp(28px,4vw,52px)] font-bold leading-[1.06] tracking-[-0.02em] mb-2"
        style={{ color: "#1C1C1C" }}
        initial={{ opacity: 0, x: -40 }} animate={iv ? { opacity: 1, x: 0 } : {}} transition={{ delay: 0.1, duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
      >
        {service.title}
      </motion.h3>

      {/* Description */}
      <motion.p
        className="text-[14px] md:text-[15px] leading-relaxed max-w-xl mb-3"
        style={{ color: "#6B6B6B" }}
        initial={{ opacity: 0, x: -40 }} animate={iv ? { opacity: 1, x: 0 } : {}} transition={{ delay: 0.15, duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
      >
        {service.description}
      </motion.p>

      {/* Capabilities — 2x2 grid with icons */}
      <motion.div
        className="grid grid-cols-2 gap-x-3 gap-y-1.5 mb-3"
        initial={{ opacity: 0 }} animate={iv ? { opacity: 1 } : {}} transition={{ delay: 0.25, duration: 0.4 }}
      >
        {service.capabilities.map((cap, i) => (
          <motion.div
            key={cap.label}
            className="flex items-center gap-2 text-[12px] font-medium"
            style={{ color: `${service.accent}80` }}
            initial={{ opacity: 0, x: -8 }} animate={iv ? { opacity: 1, x: 0 } : {}} transition={{ delay: 0.3 + i * 0.04, duration: 0.3 }}
          >
            <span className="text-[14px] flex-shrink-0">{capIcons[cap.icon] || "▸"}</span>
            {cap.label}
          </motion.div>
        ))}
      </motion.div>

      {/* CTA */}
      <motion.div
        className="flex flex-wrap gap-2"
        initial={{ opacity: 0, y: 8 }} animate={iv ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.35, duration: 0.4 }}
      >
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Link
            href={service.ctaPrimaryHref}
            className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-[12px] font-semibold text-white transition-all duration-300"
            style={{ backgroundColor: service.accent, boxShadow: `0 4px 16px ${service.accent}30` }}
          >
            <span>{service.ctaPrimary}</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
          </Link>
        </motion.div>
        {service.ctaSecondary && (
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Link
              href={service.ctaSecondaryHref}
              className="group inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full text-[12px] font-semibold transition-all duration-300"
              style={{ border: `1px solid ${service.accent}20`, color: service.accent }}
            >
              <span>{service.ctaSecondary}</span>
              <ArrowUpRight className="w-3 h-3 transition-transform duration-300 group-hover:translate-x-0.5" />
            </Link>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}

function ServiceVisual({ service }: { service: typeof premiumServices[0] }) {
  return (
    <div className="relative w-full h-full">
      <div className="relative w-full h-full rounded-[32px] overflow-hidden" style={{ backgroundColor: `${service.accent}03`, border: `1px solid ${service.accent}08` }}>
        <ServiceVisualRouter visual={service.visual} accent={service.accent} accentLight={service.accentLight} />
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   LAYOUT VARIANT A — AI Systems
   Modern split: visual right side with tilt, content left
   ═══════════════════════════════════════════════════════════════ */
function LayoutA({ service }: { service: typeof premiumServices[0] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6 items-center">
      <div><ServiceContent service={service} /></div>
      <div className="order-first md:order-last">
        <div className="md:translate-x-4 lg:translate-x-8">
          <ServiceVisual service={service} />
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   LAYOUT VARIANT B — Platform Engineering
   Side-by-side: content left, visual right on wide screens
   ═══════════════════════════════════════════════════════════════ */
function LayoutB({ service }: { service: typeof premiumServices[0] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6 items-center">
      <div><ServiceContent service={service} /></div>
      <div className="md:-mr-2 lg:-mr-4">
        <ServiceVisual service={service} />
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   LAYOUT VARIANT C — Custom Software
   Content card with inset shadow + visual right
   ═══════════════════════════════════════════════════════════════ */
function LayoutC({ service }: { service: typeof premiumServices[0] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-4 lg:gap-6 items-center">
      <div className="md:col-span-3"><ServiceContent service={service} /></div>
      <div className="md:col-span-2">
        <div className="scale-95 md:scale-100 origin-right">
          <ServiceVisual service={service} />
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   LAYOUT VARIANT D — Mobile Development
   Centered phone visual with content stacked vertically
   ═══════════════════════════════════════════════════════════════ */
function LayoutD({ service }: { service: typeof premiumServices[0] }) {
  return (
    <div className="flex flex-col lg:flex-row-reverse items-center gap-4 lg:gap-8">
      <div className="w-full lg:w-1/2"><ServiceContent service={service} /></div>
      <div className="w-full lg:w-1/2 flex justify-center">
        <div className="w-[220px] lg:w-[260px] -mt-4 lg:mt-0">
          <ServiceVisual service={service} />
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   LAYOUT VARIANT E — SaaS / CRM
   Content left, visual right with extra padding
   ═══════════════════════════════════════════════════════════════ */
function LayoutE({ service }: { service: typeof premiumServices[0] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-8 items-center">
      <div className="md:pr-4"><ServiceContent service={service} /></div>
      <div><ServiceVisual service={service} /></div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   LAYOUT VARIANT F — Marketing
   Visual left, content right (full reverse)
   ═══════════════════════════════════════════════════════════════ */
function LayoutF({ service }: { service: typeof premiumServices[0] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6 items-center">
      <div className="order-last md:order-first"><ServiceContent service={service} /></div>
      <div className="order-first md:order-last">
        <div className="-ml-2 md:-ml-4">
          <ServiceVisual service={service} />
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   LAYOUT VARIANT G — Cloud & DevOps
   Full-bleed visual as background-like hero, content overlaid
   ═══════════════════════════════════════════════════════════════ */
function LayoutG({ service }: { service: typeof premiumServices[0] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6 items-center">
      <div><ServiceContent service={service} /></div>
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none z-10 rounded-[32px]" />
        <ServiceVisual service={service} />
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   LAYOUT VARIANT H — Web Development
   Side-by-side: content left, visual right on wide screens
   ═══════════════════════════════════════════════════════════════ */
function LayoutH({ service }: { service: typeof premiumServices[0] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6 items-center">
      <div><ServiceContent service={service} /></div>
      <div className="md:mr-2 lg:mr-4">
        <ServiceVisual service={service} />
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   Layout dispatcher
   ═══════════════════════════════════════════════════════════════ */
function ServiceSection({ service }: { service: typeof premiumServices[0] }) {
  const LayoutMap: Record<string, React.FC<{ service: typeof premiumServices[0] }>> = {
    a: LayoutA,
    b: LayoutB,
    c: LayoutC,
    d: LayoutD,
    e: LayoutE,
    f: LayoutF,
    g: LayoutG,
    h: LayoutH,
  };

  const Layout = LayoutMap[service.layoutVariant] || LayoutA;

  return (
    <section className="relative py-6 md:py-8">
      <SectionGlow accent={service.accent} />
      <BgNumber num={service.index} accent={service.accent} />
      <div className="container-wide relative z-10">
        <Layout service={service} />
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   MAIN PAGE
   ═══════════════════════════════════════════════════════════════ */
export default function ServicesPageClient() {
  return (
    <main className="relative min-h-screen" style={{ backgroundColor: "#F8F6F1" }}>
      <FloatingGlows count={8} />
      <FloatingDots count={40} />
      <HeroSection />

      {premiumServices.map((service, i) => (
        <div key={service.id}>
          <ServiceSection service={service} />
          {i < premiumServices.length - 1 && (
            <div className="container-wide">
              <SectionDivider accent={service.accent} />
            </div>
          )}
        </div>
      ))}

      <PremiumFinalCTA />
    </main>
  );
}
