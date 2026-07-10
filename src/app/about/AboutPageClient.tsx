"use client";

import { useRef, useState, useEffect, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  motion,
  useInView,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import {
  ArrowRight,
  Calendar,
  ChevronRight,
  Code2,
  Cloud,
  Smartphone,
  Globe,
  Server,
  BrainCircuit,
  Shield,
  Lightbulb,
  TrendingUp,
  Users,
  Eye,
  Heart,
  Zap,
  Layers,
  Clock,
  Palette,
  Rocket,
  Cpu,
  Database,
  Building2,
  Award,
  Star,
  BookOpen,
  Compass,
  Play,
  Search,
  Layout,
  Box,
  Quote,
} from "lucide-react";
import { products } from "@/data/products";
import { categories } from "@/data/categories";
import AboutHero from "@/components/about/hero/AboutHero";
import { BOOKING_URL, BOOKING_ATTRS } from "@/lib/booking";

/* ═══════════════════════════════════════════════════════════
   DATA
   ═══════════════════════════════════════════════════════════ */

const ACCURATE_STATS = [
  { value: 2021, suffix: "", label: "Founded", icon: Compass, precision: 0 },
  { value: () => products.filter((p) => p.status === "published").length, suffix: "+", label: "Products Built", icon: Rocket, precision: 0 },
  { value: categories.length, suffix: "", label: "Categories", icon: Layout, precision: 0 },
  { value: () => products.filter((p) => p.status === "published").length, suffix: "", label: "Published Apps", icon: Smartphone, precision: 0 },
  { value: 100, suffix: "K+", label: "Downloads", icon: TrendingUp, precision: 0 },
  { value: 20, suffix: "+", label: "Technologies", icon: Code2, precision: 0 },
  { value: () => products.length, suffix: "+", label: "Total Products", icon: Box, precision: 0 },
  { value: 100, suffix: "%", label: "Client Satisfaction", icon: Star, precision: 0 },
];

const JOURNEY_MILESTONES = [
  { year: "2021", title: "Founded", description: "RiverLoom was founded with a vision to build exceptional digital products that transform how businesses operate and compete in the modern landscape.", icon: Rocket },
  { year: "2022", title: "First Products Released", description: "Launched our first wave of mobile applications and web platforms, establishing our core engineering capabilities and design philosophy.", icon: Play },
  { year: "2023", title: "Enterprise Expansion", description: "Secured enterprise partnerships and expanded our team, delivering complex platforms for businesses across hospitality, education, and security sectors.", icon: Building2 },
  { year: "2024", title: "AI Product Development", description: "Launched AI-powered products including intelligent assistants, cybersecurity platforms, and educational tools — establishing our AI-first engineering approach.", icon: BrainCircuit },
  { year: "2025", title: "Education & SaaS", description: "Expanded into EdTech with platforms like VisiLearn and Wordique, while growing our SaaS product ecosystem across multiple categories.", icon: BookOpen },
  { year: "Today", title: "Growing Product Ecosystem", description: "A diverse portfolio of 29+ products across 9 categories — from enterprise platforms and AI systems to casual games and creative tools — serving users worldwide.", icon: TrendingUp },
];

const MISSION_VISION = {
  mission: { icon: Eye, title: "Our Mission", description: "To architect and engineer exceptional digital products that empower businesses to lead in their industries. We combine deep technical expertise with strategic thinking to deliver solutions that drive measurable impact — from AI systems and enterprise platforms to consumer applications that delight millions." },
  vision: { icon: Compass, title: "Our Vision", description: "A world where every ambitious company has access to world-class engineering talent regardless of their location or budget. We are building a studio that redefines what it means to partner with external engineers — combining startup agility with enterprise-grade quality and a relentless focus on outcomes." },
};

const CORE_VALUES = [
  { icon: Code2, title: "Engineering Excellence", description: "We hold ourselves to the highest standards of code quality, architecture, and performance.", color: "#169B62" },
  { icon: Lightbulb, title: "Innovation First", description: "We stay at the cutting edge of technology so our clients don't have to.", color: "#6366F1" },
  { icon: Heart, title: "Radical Transparency", description: "Open communication, honest timelines, and clear reporting.", color: "#F59E0B" },
  { icon: Users, title: "Long-Term Partnership", description: "We win when our clients win.", color: "#EC4899" },
  { icon: Shield, title: "Security & Quality", description: "Security is never an afterthought.", color: "#0EA5E9" },
  { icon: Zap, title: "Full Ownership", description: "We take complete ownership of outcomes.", color: "#8B5CF6" },
];

const ENGINEERING_PROCESS = [
  { step: "Discover", icon: Search, description: "Deep dive into your business, users, market, and technical landscape." },
  { step: "Research", icon: BookOpen, description: "Thorough competitive analysis and solution architecture planning." },
  { step: "Design", icon: Palette, description: "Craft intuitive user experiences with pixel-perfect interfaces." },
  { step: "Develop", icon: Code2, description: "Build with modern, scalable architectures using best practices." },
  { step: "Test", icon: Shield, description: "Comprehensive testing across unit, integration, e2e, and security." },
  { step: "Deploy", icon: Cloud, description: "CI/CD pipelines, zero-downtime deployments, automated rollbacks." },
  { step: "Scale", icon: TrendingUp, description: "Post-launch monitoring and infrastructure scaling." },
];

const ENGINEERING_PRINCIPLES = [
  { number: "01", icon: Zap, title: "Performance First", description: "We optimize for speed from day one." },
  { number: "02", icon: Shield, title: "Security by Design", description: "Security is embedded into every architecture decision." },
  { number: "03", icon: Layers, title: "Scalable Architecture", description: "Systems designed from MVP to millions of users." },
  { number: "04", icon: Users, title: "User-Centered Engineering", description: "Every decision starts with the user." },
];

const FOUNDER_STORY = {
  title: "Why RiverLoom Exists",
  subtitle: "A vision born in 2021",
  paragraphs: [
    "RiverLoom was founded in 2021 with a simple but powerful belief: that exceptional software engineering should be accessible to every ambitious company, not just those with unlimited resources.",
    "We set out to build a different kind of studio. One that combines the technical depth of a world-class engineering team with the agility of a small partnership. Where quality is never compromised.",
    "Since those early days, we've grown to 29+ products shipped, 100K+ downloads, and clients across startups, enterprises, and educational institutions globally.",
  ],
  signature: "RiverLoom Engineering",
  role: "Founded 2021",
};

const CULTURE_ITEMS = [
  { icon: BookOpen, title: "Continuous Learning", description: "Weekly tech talks and a culture that celebrates curiosity.", color: "#169B62" },
  { icon: Globe, title: "Remote Collaboration", description: "Distributed across time zones but united by purpose.", color: "#6366F1" },
  { icon: Code2, title: "Engineering Craft", description: "Code reviews, testing culture, and architectural RFCs.", color: "#F59E0B" },
  { icon: Zap, title: "Innovation Sprints", description: "Hackathons and experimental projects.", color: "#EC4899" },
  { icon: Award, title: "Quality Focus", description: "Performance budgets and accessibility standards.", color: "#0EA5E9" },
  { icon: Lightbulb, title: "Creative Problem Solving", description: "Every challenge is an opportunity.", color: "#8B5CF6" },
];

/* ═══════════════════════════════════════════════════════════
   ANIMATED COUNTER
   ═══════════════════════════════════════════════════════════ */
function AnimatedCounter({ value, suffix = "", precision = 0 }: { value: number; suffix?: string; precision?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!isInView || hasAnimated.current) return;
    hasAnimated.current = true;
    let startTime: number | null = null;
    const duration = 2000;
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(eased * value);
      if (progress < 1) requestAnimationFrame(animate);
      else setCount(value);
    };
    requestAnimationFrame(animate);
  }, [isInView, value]);

  return <span ref={ref}>{count.toFixed(precision)}{suffix}</span>;
}

function SectionBadge({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-semibold tracking-[0.12em] uppercase bg-[#E8F7EF] text-[#169B62] border border-[#169B62]/15 mb-5">
      <span className="w-1.5 h-1.5 rounded-full bg-[#169B62]" />
      {label}
    </span>
  );
}

/* ═══════════════════════════════════════════════════════════
   1. COMPANY METRICS
   ═══════════════════════════════════════════════════════════ */
function MetricsSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  /* ─── Mouse position tracking for card tilt ─── */
  const [mousePos, setMousePos] = useState<{ x: number; y: number; i: number } | null>(null);

  return (
    <section ref={ref} className="py-0 pb-8 relative z-10">
      <div className="container-main">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <SectionBadge label="Company at a Glance" />
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[#1C1C1C]">By the Numbers</h2>
          <p className="text-lg text-[#6B6B6B] max-w-xl mx-auto mt-4">Real metrics from our journey since 2021.</p>
        </motion.div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-5">
          {ACCURATE_STATS.map((stat, i) => {
            const Icon = stat.icon;
            const val = typeof stat.value === "function" ? stat.value() : stat.value;
            const isHovered = hoveredIdx === i;

            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 40, scale: 0.9 }}
                animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{
                  delay: 0.06 + i * 0.05,
                  duration: 0.6,
                  ease: [0.19, 1, 0.22, 1],
                }}
                onMouseEnter={() => setHoveredIdx(i)}
                onMouseLeave={() => { setHoveredIdx(null); setMousePos(null); }}
                onMouseMove={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  setMousePos({
                    x: (e.clientX - rect.left - rect.width / 2) / (rect.width / 2),
                    y: (e.clientY - rect.top - rect.height / 2) / (rect.height / 2),
                    i,
                  });
                }}
                className="relative p-5 md:p-7 rounded-2xl border border-[#E7E2D8] bg-white overflow-hidden cursor-default group"
                style={{ perspective: "800px" }}
              >
                {/* Animated gradient border glow */}
                <motion.div
                  className="absolute inset-0 rounded-2xl opacity-0 pointer-events-none"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(22,155,98,0.08) 0%, rgba(31,199,126,0.04) 50%, transparent 100%)",
                  }}
                  animate={isHovered ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ duration: 0.3 }}
                />

                {/* Corner accent glow */}
                <motion.div
                  className="absolute -top-8 -right-8 w-20 h-20 rounded-full pointer-events-none"
                  style={{
                    background:
                      "radial-gradient(circle at center, rgba(22,155,98,0.12) 0%, transparent 70%)",
                    filter: "blur(12px)",
                  }}
                  animate={isHovered ? { scale: 1.5, opacity: 1 } : { scale: 1, opacity: 0 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                />

                {/* Card content with 3D tilt */}
                <motion.div
                  className="relative z-[1]"
                  animate={
                    mousePos && mousePos.i === i
                      ? {
                          rotateX: mousePos.y * -6,
                          rotateY: mousePos.x * 6,
                        }
                      : { rotateX: 0, rotateY: 0 }
                  }
                  transition={{ type: "spring", stiffness: 200, damping: 20 }}
                >
                  {/* Icon with animated pulse */}
                  <div className="relative mb-3">
                    <motion.div
                      className="w-9 h-9 rounded-xl flex items-center justify-center relative overflow-hidden"
                      style={{ backgroundColor: "#E8F7EF" }}
                      animate={
                        isHovered
                          ? { backgroundColor: "#D0F0DF", scale: 1.1 }
                          : { backgroundColor: "#E8F7EF", scale: 1 }
                      }
                      transition={{ duration: 0.3 }}
                    >
                      <Icon className="w-[18px] h-[18px] text-[#169B62] relative z-[1]" />
                      {/* Icon shimmer */}
                      <motion.span
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                        animate={isHovered ? { x: ["-100%", "100%"] } : { x: "-100%" }}
                        transition={{ duration: 0.6, ease: "easeInOut" }}
                      />
                    </motion.div>
                  </div>

                  {/* Animated counter */}
                  <motion.div
                    className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#169B62] mb-0.5 tracking-tight"
                    animate={isHovered ? { scale: 1.05, color: "#1FC77E" } : { scale: 1, color: "#169B62" }}
                    transition={{ duration: 0.3 }}
                  >
                    <AnimatedCounter value={val} suffix={stat.suffix} precision={0} />
                  </motion.div>

                  {/* Label */}
                  <motion.div
                    className="text-xs md:text-sm font-medium text-[#6B6B6B]"
                    animate={isHovered ? { color: "#169B62" } : { color: "#6B6B6B" }}
                    transition={{ duration: 0.3 }}
                  >
                    {stat.label}
                  </motion.div>
                </motion.div>

                {/* Bottom bar accent */}
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full origin-left"
                  style={{ backgroundColor: "#169B62" }}
                  initial={{ scaleX: 0 }}
                  animate={isHovered ? { scaleX: 1 } : { scaleX: 0 }}
                  transition={{ duration: 0.4, ease: [0.19, 1, 0.22, 1] }}
                />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   3. MISSION & VISION
   ═══════════════════════════════════════════════════════════ */
function MissionVisionSection() {
  return (
    <section className="py-24 md:py-32 relative overflow-hidden z-10">
      <div className="container-main relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="text-center mb-16">
          <SectionBadge label="Our Purpose" />
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[#1C1C1C]">Mission & Vision</h2>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {(["mission", "vision"] as const).map((key, i) => {
            const item = MISSION_VISION[key];
            const Icon = item.icon;
            return (
              <motion.div key={key} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ delay: i * 0.15, duration: 0.7 }} className="relative p-8 md:p-10 lg:p-12 rounded-3xl border border-[#E7E2D8] bg-white/80 backdrop-blur-xl overflow-hidden group" whileHover={{ y: -8, boxShadow: "0 16px 48px rgba(0,0,0,0.08)" }}>
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#E8F7EF] to-[#D0F0DF] flex items-center justify-center mb-6"><Icon className="w-8 h-8 text-[#169B62]" /></div>
                <h3 className="text-2xl md:text-3xl font-bold text-[#1C1C1C] mb-4">{item.title}</h3>
                <p className="text-[#6B6B6B] leading-relaxed text-base md:text-lg">{item.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   4. CORE VALUES
   ═══════════════════════════════════════════════════════════ */
function CoreValuesSection() {
  return (
    <section className="py-24 md:py-32 relative overflow-hidden z-10 bg-[#FFFCF8]">
      <div className="container-main relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="text-center mb-16">
          <SectionBadge label="Our DNA" />
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[#1C1C1C]">Core Values</h2>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {CORE_VALUES.map((value, i) => {
            const Icon = value.icon;
            return (
              <motion.div key={value.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ delay: i * 0.08, duration: 0.5 }} className="group relative p-7 md:p-8 rounded-2xl border border-[#E7E2D8] bg-white overflow-hidden" whileHover={{ y: -6, boxShadow: "0 16px 48px rgba(0,0,0,0.06)" }}>
                <div className="absolute top-0 left-0 right-0 h-1 opacity-0 group-hover:opacity-100 transition-all duration-500" style={{ backgroundColor: value.color }} />
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4" style={{ backgroundColor: `${value.color}12` }}><Icon className="w-6 h-6" style={{ color: value.color }} /></div>
                <h3 className="text-lg font-bold text-[#1C1C1C] mb-2">{value.title}</h3>
                <p className="text-sm text-[#6B6B6B] leading-relaxed">{value.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   5. ENGINEERING PROCESS
   ═══════════════════════════════════════════════════════════ */
function ProcessSection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const progressWidth = useTransform(scrollYProgress, [0.1, 0.7], ["0%", "100%"]);
  return (
    <section ref={ref} className="py-24 md:py-32 relative overflow-hidden z-10">
      <div className="container-main">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="text-center mb-16">
          <SectionBadge label="How We Work" />
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[#1C1C1C]">Engineering Process</h2>
        </motion.div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-4 max-w-4xl mx-auto">
          {ENGINEERING_PROCESS.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div key={step.step} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ delay: i * 0.1, duration: 0.5 }} className="text-center group">
                <motion.div className="w-12 h-12 rounded-full mx-auto mb-3 flex items-center justify-center border-2 border-[#169B62] bg-white" whileHover={{ scale: 1.15, boxShadow: "0 0 24px rgba(22,155,98,0.2)" }}><Icon className="w-5 h-5 text-[#169B62]" /></motion.div>
                <h3 className="text-sm font-bold text-[#1C1C1C] mb-1">{step.step}</h3>
                <p className="text-[10px] text-[#6B6B6B] leading-relaxed">{step.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   6. ENGINEERING PRINCIPLES
   ═══════════════════════════════════════════════════════════ */
function PrinciplesSection() {
  return (
    <section className="py-24 md:py-32 relative overflow-hidden z-10 bg-[#FFFCF8]">
      <div className="container-main">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="text-center mb-16">
          <SectionBadge label="Engineering Philosophy" />
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[#1C1C1C]">Development Principles</h2>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {ENGINEERING_PRINCIPLES.map((principle, i) => {
            const Icon = principle.icon;
            return (
              <motion.div key={principle.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ delay: i * 0.1, duration: 0.5 }} className="relative p-8 md:p-10 rounded-2xl border border-[#E7E2D8] bg-white overflow-hidden group" whileHover={{ y: -4, boxShadow: "0 12px 40px rgba(0,0,0,0.06)" }}>
                <div className="flex items-start gap-5">
                  <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-[#E8F7EF] flex items-center justify-center"><Icon className="w-7 h-7 text-[#169B62]" /></div>
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-sm font-mono font-bold text-[#169B62]">{principle.number}</span>
                      <h3 className="text-xl font-bold text-[#1C1C1C]">{principle.title}</h3>
                    </div>
                    <p className="text-[#6B6B6B] leading-relaxed">{principle.description}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   8. CULTURE SECTION
   ═══════════════════════════════════════════════════════════ */
function CultureSection() {
  return (
    <section className="py-24 md:py-32 relative overflow-hidden z-10 bg-[#FFFCF8]">
      <div className="container-main relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="text-center mb-16">
          <SectionBadge label="Our Culture" />
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[#1C1C1C]">How We Think & Build</h2>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {CULTURE_ITEMS.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div key={item.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ delay: i * 0.06, duration: 0.5 }} className="p-7 md:p-8 rounded-2xl border border-[#E7E2D8] bg-white group" whileHover={{ y: -4, boxShadow: "0 12px 40px rgba(0,0,0,0.06)" }}>
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4" style={{ backgroundColor: item.color + "15" }}><Icon className="w-6 h-6" style={{ color: item.color }} /></div>
                <h3 className="text-lg font-bold text-[#1C1C1C] mb-2">{item.title}</h3>
                <p className="text-sm text-[#6B6B6B] leading-relaxed">{item.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   9. FOUNDER STORY
   ═══════════════════════════════════════════════════════════ */
function FounderStorySection() {
  return (
    <section className="py-24 md:py-32 relative overflow-hidden z-10">
      <div className="container-main relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <SectionBadge label="Founder Story" />
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[#1C1C1C] leading-[1.05] mb-4">{FOUNDER_STORY.title}</h2>
            <p className="text-lg text-[#6B6B6B] mb-8">{FOUNDER_STORY.subtitle}</p>
            <div className="space-y-4">
              {FOUNDER_STORY.paragraphs.map((p, i) => (
                <motion.p key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 + i * 0.1, duration: 0.5 }} className="text-[#6B6B6B] leading-relaxed text-base">{p}</motion.p>
              ))}
            </div>
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.6, duration: 0.5 }} className="mt-8 pt-6 border-t border-[#E7E2D8]">
              <p className="text-lg font-bold text-[#1C1C1C]">{FOUNDER_STORY.signature}</p>
              <p className="text-sm text-[#6B6B6B]">{FOUNDER_STORY.role}</p>
            </motion.div>
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.3, duration: 0.7 }} className="relative h-[350px] md:h-[450px] w-full rounded-3xl border border-[#E7E2D8] bg-gradient-to-br from-[#E8F7EF]/30 to-[#E8F7EF]/10 overflow-hidden flex items-center justify-center p-8">
            <div className="relative w-full h-full max-w-[280px] max-h-[280px]">
              <Image
                src="/assets/logos/logo.png"
                alt="RiverLoom Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   10. FINAL CTA
   ═══════════════════════════════════════════════════════════ */
function FinalCTASection() {
  return (
    <section className="relative py-28 md:py-36 overflow-hidden z-10 bg-gradient-to-b from-[#E8F7EF]/30 via-transparent to-[#E8F7EF]/20">
      <div className="container-main relative z-10">
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="max-w-3xl mx-auto text-center">
          <SectionBadge label="Let us Build Together" />
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[#1C1C1C] leading-[1.1] mb-6">
            Ready to Build <span className="text-[#169B62]">Something Exceptional</span>?
          </h2>
          <p className="text-lg md:text-xl text-[#6B6B6B] max-w-xl mx-auto mb-10">
            Partner with RiverLoom and bring your most ambitious product vision to life. Start your journey today.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href={BOOKING_URL}
              target={BOOKING_ATTRS.target}
              rel={BOOKING_ATTRS.rel}
              className="group inline-flex items-center gap-2.5 px-9 py-4 rounded-full text-base font-semibold bg-[#169B62] text-white shadow-[0_4px_20px_rgba(22,155,98,0.25)] hover:shadow-[0_8px_40px_rgba(22,155,98,0.35)] hover:bg-[#1FC77E] transition-all duration-300"
            >
              Book Free Consultation <Calendar className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </a>
            <Link href="/contact" className="group inline-flex items-center gap-2.5 px-9 py-4 rounded-full text-base font-medium border border-[#E7E2D8] text-[#1C1C1C] hover:border-[#169B62] hover:text-[#169B62] hover:bg-[#E8F7EF] transition-all duration-300">
              Contact Us <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   MAIN PAGE
   ═══════════════════════════════════════════════════════════ */
export default function AboutPageClient() {
  return (
    <>
      <AboutHero />
      <MetricsSection />
      <MissionVisionSection />
      <CoreValuesSection />
      <ProcessSection />
      <PrinciplesSection />
      <CultureSection />
      <FounderStorySection />
      <FinalCTASection />
    </>
  );
}
