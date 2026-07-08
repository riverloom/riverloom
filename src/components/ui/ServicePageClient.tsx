"use client";

import { useState, useRef, useCallback, FormEvent } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight, ArrowUpRight, Check, Send, Loader2,
  Cpu, Grid3x3, Monitor, Smartphone, Cloud, Globe,
  Brain, MessageSquare, FileText, Eye, TrendingUp, Repeat, Search, Shield,
  Layers, RefreshCw, Server, BarChart3, HeartPulse, Landmark, ShoppingCart,
  Factory, Building2, GraduationCap, Plane, Truck, Newspaper, Rocket,
  Zap, Palette, Code2, Users, Lock, GitBranch, Database, Container,
  Activity, DollarSign, Bell, Handshake, Wifi, Bolt, Square, Apple,
  LayoutDashboard, Blocks, Gauge, ArrowUpWideNarrow, Clock,
} from "lucide-react";
import { ServiceContent } from "@/data/service-content";

/* ─── Icon Map ─── */
const iconMap: Record<string, React.ElementType> = {
  Cpu, Grid3x3, Monitor, Smartphone, Cloud, Globe,
  Brain, MessageSquare, FileText, Eye, TrendingUp, Repeat, Search, Shield,
  Layers, RefreshCw, Server, BarChart3, HeartPulse, Landmark, ShoppingCart,
  Factory, Building2, GraduationCap, Plane, Truck, Newspaper, Rocket,
  Zap, Palette, Code2, Users, Lock, GitBranch, Database, Container,
  Activity, DollarSign, Bell, Handshake, Wifi, Bolt, Square, Apple,
  LayoutDashboard, Blocks, Gauge, ArrowUpWideNarrow, Clock,
};

function Icon({ name, className = "w-5 h-5" }: { name: string; className?: string }) {
  const Comp = iconMap[name];
  if (!Comp) return null;
  return <Comp className={className} />;
}

/* ─── Contact Form State ─── */
interface FormState {
  name: string;
  company: string;
  email: string;
  phone: string;
  service: string;
  budget: string;
  timeline: string;
  details: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  details?: string;
}

/* ═══════════════════════════════════════════════
   CONTACT FORM
   ═══════════════════════════════════════════════ */
function ContactForm({ serviceTitle }: { serviceTitle: string }) {
  const [form, setForm] = useState<FormState>({
    name: "", company: "", email: "", phone: "",
    service: serviceTitle, budget: "", timeline: "", details: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  const validate = useCallback((): boolean => {
    const errs: FormErrors = {};
    if (!form.name.trim()) errs.name = "Name is required";
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = "Valid email is required";
    if (!form.details.trim()) errs.details = "Please describe your project";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }, [form]);

  const handleSubmit = useCallback(async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          projectType: form.service + (form.budget ? ` (Budget: ${form.budget})` : ""),
          message: `Company: ${form.company}\nPhone: ${form.phone}\nTimeline: ${form.timeline}\n\n${form.details}`,
        }),
      });
      const json = await res.json();
      if (!res.ok) {
        setStatus("error");
        return;
      }
      setStatus("success");
      setForm({ name: "", company: "", email: "", phone: "", service: serviceTitle, budget: "", timeline: "", details: "" });
    } catch {
      setStatus("error");
    }
  }, [form, validate, serviceTitle]);

  const updateField = (field: keyof FormState, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field as keyof FormErrors]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  return (
    <div ref={ref} className="w-full max-w-3xl mx-auto">
      <motion.form
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-5"
      >
        <div>
          <label className="block text-[15px] font-medium text-[var(--color-text)] mb-1.5">Full Name *</label>
          <input type="text" value={form.name} onChange={(e) => updateField("name", e.target.value)} placeholder="John Doe" className={`w-full px-4 py-3 rounded-xl border ${errors.name ? "border-red-400" : "border-[var(--color-border)]"} bg-[var(--color-card)] text-[16px] text-[var(--color-text)] placeholder:text-[var(--color-text-secondary)]/50 focus:outline-none focus:border-[var(--color-accent)] transition-colors`} />
          {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
        </div>
        <div>
          <label className="block text-[15px] font-medium text-[var(--color-text)] mb-1.5">Company</label>
          <input type="text" value={form.company} onChange={(e) => updateField("company", e.target.value)} placeholder="Acme Inc." className="w-full px-4 py-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] text-[16px] text-[var(--color-text)] placeholder:text-[var(--color-text-secondary)]/50 focus:outline-none focus:border-[var(--color-accent)] transition-colors" />
        </div>
        <div>
          <label className="block text-[15px] font-medium text-[var(--color-text)] mb-1.5">Email Address *</label>
          <input type="email" value={form.email} onChange={(e) => updateField("email", e.target.value)} placeholder="john@company.com" className={`w-full px-4 py-3 rounded-xl border ${errors.email ? "border-red-400" : "border-[var(--color-border)]"} bg-[var(--color-card)] text-[16px] text-[var(--color-text)] placeholder:text-[var(--color-text-secondary)]/50 focus:outline-none focus:border-[var(--color-accent)] transition-colors`} />
          {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
        </div>
        <div>
          <label className="block text-[15px] font-medium text-[var(--color-text)] mb-1.5">Phone</label>
          <input type="tel" value={form.phone} onChange={(e) => updateField("phone", e.target.value)} placeholder="+1 (555) 123-4567" className="w-full px-4 py-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] text-[16px] text-[var(--color-text)] placeholder:text-[var(--color-text-secondary)]/50 focus:outline-none focus:border-[var(--color-accent)] transition-colors" />
        </div>
        <div>
          <label className="block text-[15px] font-medium text-[var(--color-text)] mb-1.5">Budget Range</label>
          <select value={form.budget} onChange={(e) => updateField("budget", e.target.value)} className="w-full px-4 py-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] text-[16px] text-[var(--color-text)] focus:outline-none focus:border-[var(--color-accent)] transition-colors">
            <option value="">Select budget</option>
            <option value="under-10k">Under ₹10K</option>
            <option value="10k-25k">₹10K – ₹25K</option>
            <option value="25k-50k">₹25K – ₹50K</option>
            <option value="50k-75k">₹50K – ₹75K</option>
            <option value="75k-plus">₹75K+</option>
            <option value="not-sure">Not Sure</option>
          </select>
        </div>
        <div>
          <label className="block text-[15px] font-medium text-[var(--color-text)] mb-1.5">Timeline</label>
          <select value={form.timeline} onChange={(e) => updateField("timeline", e.target.value)} className="w-full px-4 py-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] text-[16px] text-[var(--color-text)] focus:outline-none focus:border-[var(--color-accent)] transition-colors">
            <option value="">Select timeline</option>
            <option value="asap">ASAP</option>
            <option value="1-2-months">1–2 Months</option>
            <option value="3-6-months">3–6 Months</option>
            <option value="6-plus">6+ Months</option>
            <option value="not-sure">Not Sure</option>
          </select>
        </div>
        <div className="md:col-span-2">
          <label className="block text-[15px] font-medium text-[var(--color-text)] mb-1.5">Project Details *</label>
          <textarea rows={4} value={form.details} onChange={(e) => updateField("details", e.target.value)} placeholder="Tell us about your project, goals, and requirements..." className={`w-full px-4 py-3 rounded-xl border ${errors.details ? "border-red-400" : "border-[var(--color-border)]"} bg-[var(--color-card)] text-[16px] text-[var(--color-text)] placeholder:text-[var(--color-text-secondary)]/50 focus:outline-none focus:border-[var(--color-accent)] transition-colors resize-none`} />
          {errors.details && <p className="text-xs text-red-500 mt-1">{errors.details}</p>}
        </div>
        <div className="md:col-span-2">
          <button
            type="submit"
            disabled={status === "loading" || status === "success"}
            className="w-full inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-[var(--color-accent)] text-white font-semibold text-[16px] hover:bg-[var(--color-accent-light)] transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {status === "loading" && <Loader2 className="w-5 h-5 animate-spin" />}
            {status === "success" && <Check className="w-5 h-5" />}
            {status === "loading" ? "Sending..." : status === "success" ? "Message Sent!" : "Send Message"}
            {status === "idle" && <Send className="w-4 h-4" />}
          </button>
          {status === "success" && (
            <motion.p initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="text-center text-sm text-[var(--color-accent)] mt-3 font-medium">
              Thank you! We'll be in touch within 24 hours.
            </motion.p>
          )}
          {status === "error" && (
            <p className="text-center text-sm text-red-500 mt-3">Something went wrong. Please try again or email us directly.</p>
          )}
        </div>
      </motion.form>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   SECTION WRAPPER
   ═══════════════════════════════════════════════ */
function Section({ children, className = "", id }: { children: React.ReactNode; className?: string; id?: string }) {
  return (
    <section id={id} className={`section-padding ${className}`}>
      <div className="container-main">{children}</div>
    </section>
  );
}

function SectionHeader({ badge, title, description, center = true }: { badge?: string; title: string; description?: string; center?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <div ref={ref} className={`max-w-3xl ${center ? "mx-auto text-center" : ""} mb-14 md:mb-16`}>
      {badge && (
        <motion.span initial={{ opacity: 0, y: 12 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.4 }} className="badge-premium text-[11px] tracking-[0.12em] uppercase font-semibold inline-flex mb-5">
          <span className="w-[5px] h-[5px] rounded-full bg-[var(--color-accent)] mr-2" />
          {badge}
        </motion.span>
      )}
      <motion.h2 initial={{ opacity: 0, y: 24 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.08, duration: 0.6, ease: [0.19, 1, 0.22, 1] }} className="text-[clamp(32px,4vw,52px)] font-bold leading-[1.08] tracking-[-0.02em] text-[var(--ink)]">
        {title}
      </motion.h2>
      {description && (
        <motion.p initial={{ opacity: 0, y: 16 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.15, duration: 0.5, ease: [0.19, 1, 0.22, 1] }} className="mt-4 text-[19px] md:text-[21px] leading-relaxed text-[var(--ink-dim)]">
          {description}
        </motion.p>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════
   FEATURE CARD
   ═══════════════════════════════════════════════ */
function FeatureCard({ icon, title, description, index }: { icon: string; title: string; description: string; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.06, duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
      className="card-premium p-6 md:p-7 hover:translate-y-[-2px] cursor-default"
    >
      <div className="w-11 h-11 rounded-xl bg-[var(--color-accent-subtle)] flex items-center justify-center mb-4">
        <Icon name={icon} className="w-5 h-5 text-[var(--color-accent)]" />
      </div>
      <h3 className="text-xl font-bold text-[var(--ink)] mb-2">{title}</h3>
      <p className="text-[15px] text-[var(--ink-dim)] leading-relaxed">{description}</p>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════
   PROCESS TIMELINE
   ═══════════════════════════════════════════════ */
function ProcessTimeline({ steps }: { steps: { title: string; description: string }[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <div ref={ref} className="max-w-4xl mx-auto">
      {steps.map((step, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ delay: i * 0.1, duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
          className="relative flex gap-6 pb-10 last:pb-0"
        >
          <div className="flex flex-col items-center">
            <div className="w-10 h-10 rounded-full bg-[var(--color-accent-subtle)] border border-[var(--color-accent)]/20 flex items-center justify-center flex-shrink-0">
              <span className="text-sm font-bold text-[var(--color-accent)]">{String(i + 1).padStart(2, "0")}</span>
            </div>
            {i < steps.length - 1 && <div className="w-px flex-1 bg-gradient-to-b from-[var(--color-accent)]/20 to-transparent mt-1" />}
          </div>
          <div className="pt-1.5">
            <h3 className="text-xl font-bold text-[var(--ink)]">{step.title}</h3>
            <p className="text-[15px] text-[var(--ink-dim)] mt-1 leading-relaxed">{step.description}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════
   TECH CARD
   ═══════════════════════════════════════════════ */
function TechCard({ name, index }: { name: string; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ delay: index * 0.04, duration: 0.4, ease: [0.19, 1, 0.22, 1] }}
      className="px-5 py-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] text-[15px] font-medium text-[var(--ink)] hover:border-[var(--color-accent)]/30 hover:bg-[var(--color-accent-subtle)] transition-all duration-300 cursor-default text-center"
    >
      {name}
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════
   WHY US CARD
   ═══════════════════════════════════════════════ */
function WhyUsCard({ icon, title, description, index }: { icon: string; title: string; description: string; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 25 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.07, duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
      className="card-premium p-6 md:p-7"
    >
      <div className="w-11 h-11 rounded-xl bg-[var(--color-accent-subtle)] flex items-center justify-center mb-4">
        <Icon name={icon} className="w-5 h-5 text-[var(--color-accent)]" />
      </div>
      <h3 className="text-xl font-bold text-[var(--ink)] mb-2">{title}</h3>
      <p className="text-[15px] text-[var(--ink-dim)] leading-relaxed">{description}</p>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════
   INDUSTRY CARD
   ═══════════════════════════════════════════════ */
function IndustryCard({ icon, title, description, index }: { icon: string; title: string; description: string; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.06, duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
      className="flex items-start gap-4 p-5 rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)] hover:border-[var(--color-accent)]/20 transition-all duration-300"
    >
      <div className="w-10 h-10 rounded-lg bg-[var(--color-accent-subtle)] flex items-center justify-center flex-shrink-0">
        <Icon name={icon} className="w-5 h-5 text-[var(--color-accent)]" />
      </div>
      <div>
        <h3 className="text-lg font-bold text-[var(--ink)]">{title}</h3>
        <p className="text-[15px] text-[var(--ink-dim)] mt-0.5 leading-relaxed">{description}</p>
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════
   FAQ ACCORDION
   ═══════════════════════════════════════════════ */
function FAQItem({ q, a, index }: { q: string; a: string; index: number }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 15 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.05, duration: 0.4 }}
      className="border border-[var(--color-border)] rounded-2xl overflow-hidden"
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 px-6 py-4 text-left bg-[var(--color-card)] hover:bg-[var(--color-accent-subtle)]/30 transition-colors"
      >
        <span className="text-[17px] font-semibold text-[var(--ink)]">{q}</span>
        <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.3 }} className="text-[var(--color-accent)] flex-shrink-0">
          <ChevronDown className="w-4 h-4" />
        </motion.span>
      </button>
      <motion.div
        initial={false}
        animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.3, ease: [0.19, 1, 0.22, 1] }}
        className="overflow-hidden"
      >
        <div className="px-6 pb-4 text-[15px] text-[var(--ink-dim)] leading-relaxed">{a}</div>
      </motion.div>
    </motion.div>
  );
}

function ChevronDown({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

/* ═══════════════════════════════════════════════
   MAIN — Service Page Client
   ═══════════════════════════════════════════════ */
export default function ServicePageClient({ content }: { content: ServiceContent }) {
  const c = content;
  const heroRef = useRef<HTMLElement>(null);
  const heroInView = useInView(heroRef, { once: true });

  return (
    <>
      {/* ═══ HERO ═══ */}
      <section ref={heroRef} className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className={`absolute top-[10%] left-[5%] w-[500px] h-[500px] rounded-full bg-gradient-to-br ${c.heroBg} blur-[120px]`} />
          <div className="absolute bottom-[15%] right-[10%] w-[400px] h-[400px] rounded-full bg-[var(--color-accent)]/4 blur-[100px]" />
          <div className="absolute inset-0 opacity-[0.015]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' xmlns='http://www.w3.org/2000/svg'%3E%3Cline x1='0' y1='0' x2='40' y2='0' stroke='%23169B62' strokeWidth='0.5'/%3E%3Cline x1='0' y1='0' x2='0' y2='40' stroke='%23169B62' strokeWidth='0.5'/%3E%3C/svg%3E")`, backgroundSize: "40px 40px" }} />
        </div>
        <div className="container-main relative z-10">
          <div className="max-w-4xl">
            <motion.span initial={{ opacity: 0, y: 12 }} animate={heroInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.4 }} className="badge-premium text-[11px] tracking-[0.12em] uppercase font-semibold inline-flex mb-6">
              <span className="w-[5px] h-[5px] rounded-full bg-[var(--color-accent)] mr-2" />
              {c.shortTitle}
            </motion.span>
            <motion.h1 initial={{ opacity: 0, y: 30 }} animate={heroInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.1, duration: 0.7, ease: [0.19, 1, 0.22, 1] }} className="text-[clamp(42px,5.5vw,76px)] font-bold leading-[1.04] tracking-[-0.03em] text-[var(--ink)] mb-6">
              {c.title}
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 16 }} animate={heroInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.2, duration: 0.5, ease: [0.19, 1, 0.22, 1] }} className="text-[20px] md:text-[24px] leading-relaxed text-[var(--ink-dim)] max-w-2xl mb-8">
              {c.description}
            </motion.p>
            
          </div>
        </div>
      </section>

      {/* ═══ WHAT WE DO ═══ */}
      <Section className="bg-section-white" id="what-we-do">
        <SectionHeader badge="What We Do" title={c.whatWeDo.title} description={c.whatWeDo.description} />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {c.whatWeDo.items.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.06, duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
              className="p-6 rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)] hover:border-[var(--color-accent)]/20 transition-all duration-300"
            >
              <h3 className="text-lg font-bold text-[var(--ink)] mb-2">{item.label}</h3>
              <p className="text-[15px] text-[var(--ink-dim)] leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* ═══ FEATURES ═══ */}
      <Section id="features">
        <SectionHeader badge="Features" title="What You Get" description="Every engagement comes with these capabilities built-in." />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {c.features.map((f, i) => (
            <FeatureCard key={f.title} icon={f.icon} title={f.title} description={f.description} index={i} />
          ))}
        </div>
      </Section>

      {/* ═══ PROCESS ═══ */}
      <Section className="bg-section-white" id="process">
        <SectionHeader badge="Our Process" title="How We Deliver" description="A proven methodology that ensures quality, transparency, and successful outcomes." />
        <ProcessTimeline steps={c.process} />
      </Section>

      {/* ═══ TECHNOLOGIES ═══ */}
      <Section id="technologies">
        <SectionHeader badge="Technology Stack" title="Technologies We Use" description="Modern, battle-tested technologies for building production systems." />
        <div className="flex flex-wrap gap-3 justify-center max-w-4xl mx-auto">
          {c.technologies.map((tech, i) => (
            <TechCard key={tech} name={tech} index={i} />
          ))}
        </div>
      </Section>

      {/* ═══ WHY US ═══ */}
      <Section className="bg-section-white" id="why-riverloom">
        <SectionHeader badge="Why RiverLoom" title="Why Choose Us" description="What sets our engineering team apart." />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {c.whyUs.map((w, i) => (
            <WhyUsCard key={w.title} icon={w.icon} title={w.title} description={w.description} index={i} />
          ))}
        </div>
      </Section>

      {/* ═══ INDUSTRIES ═══ */}
      <Section id="industries">
        <SectionHeader badge="Industries" title="Who We Serve" description="We deliver solutions across a wide range of industries." />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
          {c.industries.map((ind, i) => (
            <IndustryCard key={ind.title} icon={ind.icon} title={ind.title} description={ind.description} index={i} />
          ))}
        </div>
      </Section>

      {/* ═══ FAQ ═══ */}
      <Section className="bg-section-white" id="faq">
        <SectionHeader badge="FAQ" title="Frequently Asked Questions" description="Common questions about our services." />
        <div className="max-w-3xl mx-auto space-y-3">
          {c.faqs.map((faq, i) => (
            <FAQItem key={i} q={faq.q} a={faq.a} index={i} />
          ))}
        </div>
      </Section>

      {/* ═══ CONTACT FORM ═══ */}
      <Section className="bg-section-white" id="contact-form">
        <SectionHeader badge="Get in Touch" title="Start Your Project" description="Fill out the form below and we'll get back to you within 24 hours." />
        <ContactForm serviceTitle={c.shortTitle} />
      </Section>
    </>
  );
}
