"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Shield,
  FileText,
  RefreshCcw,
  XCircle,
  ChevronDown,
  CheckCircle,
  AlertTriangle,
  Info,
  Lightbulb,
  BookOpen,
  Mail,
  Clock,
  Gavel,
  Lock,
  Cookie,
  Globe,
  Users,
  Eye,
  Server,
  Database,
  Building2,
  Scale,
  HelpCircle,
  Send,
  FileCheck,
  Receipt,
  Pencil,
  BrainCircuit,
  Smartphone,
  List,
  X,
  ChevronUp,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { LegalSectionContent, LegalCallout, LegalTable, LegalFAQItem, LegalPageKey } from "@/data/legal";
import { LEGAL_NAV, LEGAL_FAQS } from "@/data/legal";

/* ─── Section Icons ─── */
const SECTION_ICONS: Record<string, React.ReactNode> = {
  overview: <BookOpen className="w-4 h-4" />,
  "information-collected": <Database className="w-4 h-4" />,
  "how-we-use": <Eye className="w-4 h-4" />,
  "legal-basis": <Gavel className="w-4 h-4" />,
  cookies: <Cookie className="w-4 h-4" />,
  "data-sharing": <Globe className="w-4 h-4" />,
  "data-security": <Shield className="w-4 h-4" />,
  "data-retention": <Clock className="w-4 h-4" />,
  "your-rights": <Users className="w-4 h-4" />,
  international: <Globe className="w-4 h-4" />,
  children: <Users className="w-4 h-4" />,
  changes: <RefreshCcw className="w-4 h-4" />,
  contact: <Mail className="w-4 h-4" />,
  acceptance: <FileCheck className="w-4 h-4" />,
  services: <Server className="w-4 h-4" />,
  "user-responsibilities": <Users className="w-4 h-4" />,
  "intellectual-property": <Scale className="w-4 h-4" />,
  "acceptable-use": <CheckCircle className="w-4 h-4" />,
  payments: <Receipt className="w-4 h-4" />,
  confidentiality: <Lock className="w-4 h-4" />,
  liability: <AlertTriangle className="w-4 h-4" />,
  termination: <XCircle className="w-4 h-4" />,
  "governing-law": <Gavel className="w-4 h-4" />,
  "software-dev": <Server className="w-4 h-4" />,
  consulting: <Lightbulb className="w-4 h-4" />,
  "ui-ux": <Pencil className="w-4 h-4" />,
  "ai-solutions": <BrainCircuit className="w-4 h-4" />,
  "digital-products": <Globe className="w-4 h-4" />,
  "mobile-apps": <Smartphone className="w-4 h-4" />,
  "partial-refunds": <RefreshCcw className="w-4 h-4" />,
  exceptions: <AlertTriangle className="w-4 h-4" />,
  process: <FileCheck className="w-4 h-4" />,
  "client-cancellation": <Users className="w-4 h-4" />,
  "riverloom-cancellation": <Building2 className="w-4 h-4" />,
  subscription: <RefreshCcw className="w-4 h-4" />,
  "notice-periods": <Clock className="w-4 h-4" />,
  "completed-work": <Database className="w-4 h-4" />,
  ownership: <Scale className="w-4 h-4" />,
  procedure: <FileText className="w-4 h-4" />,
};

/* ─── Hero Icons ─── */
function HeroShieldIcon() {
  return (
    <svg viewBox="0 0 64 64" className="w-14 h-14 md:w-[72px] md:h-[72px]" fill="none">
      <motion.path d="M32 8L12 18v12c0 14.2 8.6 27.5 20 30 11.4-2.5 20-15.8 20-30V18L32 8z" stroke="#169B62" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 2, ease: "easeInOut", repeat: Infinity, repeatType: "reverse", repeatDelay: 1 }} />
      <motion.path d="M26 32l4 4 8-8" stroke="#169B62" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.5, delay: 0.5, ease: "easeInOut", repeat: Infinity, repeatType: "reverse", repeatDelay: 1.5 }} />
    </svg>
  );
}
function HeroScrollIcon() {
  return (
    <svg viewBox="0 0 64 64" className="w-14 h-14 md:w-[72px] md:h-[72px]" fill="none">
      <motion.rect x="16" y="8" width="32" height="48" rx="4" stroke="#169B62" strokeWidth="2.5" initial={{ opacity: 0.6 }} animate={{ opacity: 1 }} transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }}/>
      <motion.line x1="32" y1="18" x2="32" y2="30" stroke="#169B62" strokeWidth="2.5" strokeLinecap="round" initial={{ opacity: 0.4 }} animate={{ opacity: 1 }} transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }}/>
      <motion.circle cx="32" cy="38" r="4" fill="#169B62" fillOpacity="0.3" initial={{ opacity: 0.2 }} animate={{ opacity: 0.6 }} transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}/>
    </svg>
  );
}
function HeroRefreshIcon() {
  return (
    <svg viewBox="0 0 64 64" className="w-14 h-14 md:w-[72px] md:h-[72px]" fill="none">
      <motion.path d="M48 32c0 8.8-7.2 16-16 16s-16-7.2-16-16 7.2-16 16-16c4.4 0 8.4 1.8 11.3 4.7" stroke="#169B62" strokeWidth="2.5" strokeLinecap="round" initial={{ opacity: 0.5 }} animate={{ opacity: 1 }} transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }}/>
      <motion.path d="M48 16v10H38" stroke="#169B62" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.2, ease: "easeInOut", repeat: Infinity, repeatDelay: 1.5 }}/>
      <motion.circle cx="32" cy="32" r="4" fill="#169B62" fillOpacity="0.3" initial={{ scale: 0.8 }} animate={{ scale: 1.2 }} transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}/>
    </svg>
  );
}
function HeroCancelIcon() {
  return (
    <svg viewBox="0 0 64 64" className="w-14 h-14 md:w-[72px] md:h-[72px]" fill="none">
      <motion.circle cx="32" cy="32" r="20" stroke="#169B62" strokeWidth="2.5" initial={{ opacity: 0.5 }} animate={{ opacity: 1 }} transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }}/>
      <motion.line x1="24" y1="24" x2="40" y2="40" stroke="#169B62" strokeWidth="2.5" strokeLinecap="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1, ease: "easeInOut", repeat: Infinity, repeatDelay: 2 }}/>
      <motion.line x1="40" y1="24" x2="24" y2="40" stroke="#169B62" strokeWidth="2.5" strokeLinecap="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1, ease: "easeInOut", repeat: Infinity, repeatDelay: 2 }}/>
    </svg>
  );
}

/* ─── Hero Illustration ─── */
function HeroIllustration({ pageKey }: { pageKey: LegalPageKey }) {
  const icons: Record<LegalPageKey, React.ReactNode> = {
    "privacy-policy": <HeroShieldIcon />,
    "terms-and-conditions": <HeroScrollIcon />,
    "refund-policy": <HeroRefreshIcon />,
    "cancellation-policy": <HeroCancelIcon />,
  };
  return (
    <div className="relative flex items-center justify-center">
      <div className="absolute w-20 h-20 md:w-28 md:h-28 rounded-full bg-[#169B62]/5 blur-2xl" />
      {icons[pageKey]}
    </div>
  );
}

/* ─── Particles ─── */
function LegalParticles() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return null;
  const s = (n: number) => { const x = Math.sin(n * 9301 + 49297) * 49297; return x - Math.floor(x); };
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {Array.from({ length: 10 }, (_, i) => (
        <motion.div key={i} className="absolute rounded-full" style={{
          width: s(i*7+1)*2+1, height: s(i*7+1)*2+1,
          left: `${s(i*5+9)*100}%`, top: `${s(i*11+2)*100}%`,
          backgroundColor: "#169B62", opacity: s(i*3+5)*0.03+0.01,
        }}
          animate={{ y: [0, -(s(i*17+7)*12+4), 0], opacity: [0, s(i*3+5)*0.04+0.01, 0] }}
          transition={{ duration: s(i*13+3)*8+8, repeat: Infinity, ease: "easeInOut", delay: s(i*19+11)*5 }}
        />
      ))}
    </div>
  );
}

/* ─── Callout ─── */
function CalloutBlock({ callout }: { callout: LegalCallout }) {
  const styles = {
    note:    { border: "border-[#169B62]/15", bg: "bg-[#E8F7EF]/50", icon: <Info className="w-4 h-4 text-[#169B62] shrink-0 mt-0.5" /> },
    warning: { border: "border-amber-200/60", bg: "bg-amber-50/60", icon: <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" /> },
    info:    { border: "border-blue-200/60", bg: "bg-blue-50/40", icon: <Info className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" /> },
    example: { border: "border-purple-200/60", bg: "bg-purple-50/40", icon: <Lightbulb className="w-4 h-4 text-purple-500 shrink-0 mt-0.5" /> },
  };
  const s = styles[callout.type];
  return (
    <div className={`flex items-start gap-3 p-4 rounded-xl border ${s.border} ${s.bg}`}>
      {s.icon}
      <p className="text-sm md:text-[15px] text-[#6B6B6B] leading-relaxed">{callout.text}</p>
    </div>
  );
}

/* ─── Table ─── */
function LegalDataTable({ table }: { table: LegalTable }) {
  const [mobile, setMobile] = useState(false);
  useEffect(() => {
    const c = () => setMobile(window.innerWidth < 640);
    c(); window.addEventListener("resize", c);
    return () => window.removeEventListener("resize", c);
  }, []);

  if (mobile) {
    return (
      <div className="space-y-3">
        {table.rows.map((row, i) => (
          <div key={i} className="border border-[#E7E2D8] rounded-xl overflow-hidden">
            {table.headers.map((h, j) => (
              <div key={j} className="flex border-b border-[#E7E2D8] last:border-b-0">
                <div className="w-[35%] bg-[#F4F1EC] px-3 py-2 text-[10px] font-semibold uppercase tracking-wider text-[#6B6B6B]">{h}</div>
                <div className="w-[65%] px-3 py-2 text-sm text-[#1C1C1C]">{row[j] || "-"}</div>
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-[#E7E2D8]">
      <table className="w-full text-left">
        <thead>
          <tr className="bg-[#F4F1EC]">
            {table.headers.map((h, i) => (
              <th key={i} className="px-4 py-3 text-[10px] font-semibold uppercase tracking-wider text-[#6B6B6B]">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {table.rows.map((row, i) => (
            <tr key={i} className="border-t border-[#E7E2D8] hover:bg-[#F8F6F1]/50 transition-colors">
              {row.map((cell, j) => (
                <td key={j} className="px-4 py-3 text-sm text-[#1C1C1C]">{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ─── Content Section Card ─── */
function ContentSection({ section, index, sectionId }: { section: LegalSectionContent; index: number; sectionId: string }) {
  return (
    <motion.div
      id={sectionId}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ delay: Math.min(index * 0.04, 0.3), duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
      className="scroll-mt-28 mb-8 last:mb-0"
    >
      <div className="rounded-2xl border border-[#E7E2D8] bg-white overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
        <div className="px-6 py-6 md:px-8 md:py-7 lg:px-10 lg:py-8">
          <h3 className="text-lg md:text-xl lg:text-2xl font-bold text-[#1C1C1C] tracking-tight mb-1">
            {section.heading}
          </h3>
          {section.subheading && (
            <p className="text-sm text-[#169B62] font-medium mb-5">{section.subheading}</p>
          )}
          <div className="space-y-4">
            {section.content.map((item, i) => {
              if (typeof item === "string") return <p key={i} className="text-sm md:text-[15px] text-[#6B6B6B] leading-relaxed">{item}</p>;
              if ("type" in item && "text" in item) return <CalloutBlock key={i} callout={item as LegalCallout} />;
              if ("headers" in item && "rows" in item) return <LegalDataTable key={i} table={item as LegalTable} />;
              return null;
            })}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ─── FAQ Accordion ─── */
function FAQAccordion({ items }: { items: LegalFAQItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  return (
    <div className="space-y-2">
      {items.map((faq, i) => {
        const isOpen = openIndex === i;
        return (
          <motion.div key={i}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-20px" }}
            transition={{ delay: i * 0.05, duration: 0.4 }}
            className={cn("rounded-xl border border-[#E7E2D8] bg-white overflow-hidden transition-shadow duration-300", isOpen && "border-[#169B62]/20 shadow-sm")}
          >
            <button onClick={() => setOpenIndex(isOpen ? null : i)}
              className="w-full flex items-center justify-between p-4 md:p-5 text-left gap-3"
              aria-expanded={isOpen}
            >
              <span className="text-sm md:text-[15px] font-medium text-[#1C1C1C] leading-snug">{faq.q}</span>
              <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.3, ease: [0.19, 1, 0.22, 1] }}
                className="w-7 h-7 rounded-full bg-[#E8F7EF] flex items-center justify-center shrink-0"
              >
                <ChevronDown className="w-3.5 h-3.5 text-[#169B62]" />
              </motion.div>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div key="c" initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3, ease: [0.19, 1, 0.22, 1] }} className="overflow-hidden">
                  <div className="px-4 md:px-5 pb-4 md:pb-5">
                    <div className="border-t border-[#E7E2D8] pt-4">
                      <p className="text-sm md:text-[15px] text-[#6B6B6B] leading-relaxed">{faq.a}</p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </div>
  );
}

/* ─── Contact Card ─── */
function ContactCard({ email, subject }: { email: string; subject: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="rounded-2xl border border-[#E7E2D8] bg-gradient-to-br from-[#E8F7EF]/30 to-white overflow-hidden shadow-sm"
    >
      <div className="px-6 py-8 md:px-10 md:py-10 text-center">
        <div className="w-12 h-12 rounded-xl bg-[#E8F7EF] flex items-center justify-center mx-auto mb-4">
          <Mail className="w-6 h-6 text-[#169B62]" />
        </div>
        <h3 className="text-lg md:text-xl font-bold text-[#1C1C1C] mb-1">Need Help?</h3>
        <p className="text-sm text-[#6B6B6B] mb-1">Our team is here to answer your questions.</p>
        <div className="flex items-center justify-center gap-1.5 text-xs text-[#9E9E9E] mb-5">
          <Clock className="w-3 h-3" />
          <span>Response within 48 business hours</span>
        </div>
        <a href={`mailto:${email}?subject=${encodeURIComponent(subject)}`}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold bg-[#169B62] text-white hover:bg-[#1FC77E] transition-all duration-300 shadow-[0_4px_16px_rgba(22,155,98,0.25)] hover:shadow-[0_8px_32px_rgba(22,155,98,0.35)]"
        >
          <Send className="w-3.5 h-3.5" />
          Send an Email
        </a>
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════
   SIDEBAR — Desktop (sticky) + Mobile (drawer)
   ═══════════════════════════════════════════════════════════ */

function SidebarNav({
  sections,
  activeId,
  onNavigate,
}: {
  sections: readonly { readonly id: string; readonly label: string }[];
  activeId: string;
  onNavigate: (id: string) => void;
}) {
  return (
    <nav aria-label="Table of Contents" className="space-y-0.5">
      <h4 className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[#9E9E9E] mb-3 px-3">
        On This Page
      </h4>
      {sections.map((section) => {
        const isActive = activeId === section.id;
        return (
          <button
            key={section.id}
            onClick={() => onNavigate(section.id)}
            className={cn(
              "w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-all duration-200 text-left",
              isActive
                ? "text-[#169B62] bg-[#E8F7EF] font-medium"
                : "text-[#6B6B6B] hover:text-[#1C1C1C] hover:bg-[#F8F6F1]/70"
            )}
          >
            <span className={cn("shrink-0", isActive ? "text-[#169B62]" : "text-[#B8B8B8]")}>
              {SECTION_ICONS[section.id] || <FileText className="w-4 h-4" />}
            </span>
            <span className="truncate">{section.label}</span>
            {isActive && (
              <motion.span
                layoutId="sidebarActive"
                className="ml-auto w-1.5 h-1.5 rounded-full bg-[#169B62] shrink-0"
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            )}
          </button>
        );
      })}
    </nav>
  );
}

/* ═══════════════════════════════════════════════════════════
   MAIN SHELL
   ═══════════════════════════════════════════════════════════ */

interface LegalPageShellProps {
  pageKey: LegalPageKey;
  sections: LegalSectionContent[];
}

export default function LegalPageShell({ pageKey, sections }: LegalPageShellProps) {
  const nav = LEGAL_NAV[pageKey];
  const faqs = LEGAL_FAQS[pageKey];
  const [activeId, setActiveId] = useState<string>(nav.sections[0]?.id ?? "");
  const [mobileTocOpen, setMobileTocOpen] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const EMAIL_MAP: Record<LegalPageKey, string> = {
    "privacy-policy": "contact@riverloom.in",
    "terms-and-conditions": "contact@riverloom.in",
    "refund-policy": "contact@riverloom.in",
    "cancellation-policy": "contact@riverloom.in",
  };
  const SUBJECT_MAP: Record<LegalPageKey, string> = {
    "privacy-policy": "Privacy Policy Inquiry",
    "terms-and-conditions": "Terms & Conditions Inquiry",
    "refund-policy": "Refund Policy Inquiry",
    "cancellation-policy": "Cancellation Policy Inquiry",
  };

  /* ─── Intersection Observer ─── */
  useEffect(() => {
    const ids = nav.sections.map((s) => s.id);
    observerRef.current = new IntersectionObserver(
      (entries) => {
        // Find the first intersecting entry, preferring entries that are most visible
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: "-10% 0px -65% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] }
    );

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observerRef.current?.observe(el);
    });

    return () => observerRef.current?.disconnect();
  }, [nav.sections]);

  const scrollToSection = useCallback((id: string) => {
    setActiveId(id);
    setMobileTocOpen(false);
    const el = document.getElementById(id);
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 120;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  }, []);

  return (
    <main className="relative bg-[var(--bg)]">
      {/* ═══════════ HERO ═══════════ */}
      <section className="relative pt-28 pb-12 md:pt-32 md:pb-16 lg:pt-36 lg:pb-20 overflow-hidden">
        <LegalParticles />
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#169B62]/20 to-transparent" />
        <div className="relative z-10 container-main">
          <div className="flex items-center gap-8 md:gap-12 lg:gap-16">
            <div className="flex-1 min-w-0">
              <span className="badge-premium text-[10px] md:text-[11px] mb-4 inline-flex">
                <span className="w-1.5 h-1.5 rounded-full bg-[#169B62]" />
                {nav.title}
              </span>
              <h1 className="text-[clamp(28px,4vw,48px)] font-bold leading-[1.08] tracking-[-0.03em] text-[#1C1C1C] mb-2">
                {nav.heroTitle}
              </h1>
              <p className="text-base md:text-lg text-[#169B62] font-medium mb-2">{nav.heroSubtitle}</p>
              <p className="text-xs text-[#9E9E9E] flex items-center gap-1.5 mb-4">
                <Clock className="w-3 h-3" />
                Last Updated: {nav.lastUpdated}
              </p>
              <p className="text-sm text-[#6B6B6B] max-w-lg leading-relaxed">{nav.description}</p>
            </div>
            <div className="hidden sm:flex items-center justify-center shrink-0">
              <HeroIllustration pageKey={pageKey} />
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ CONTENT ═══════════ */}
      <section className="pb-16 md:pb-20 relative">
        <div className="container-main">
          <div className="flex gap-10 lg:gap-14">
            {/* ─── DESKTOP SIDEBAR ─── */}
            <aside className="hidden lg:block w-[260px] xl:w-[280px] shrink-0">
              <div className="sticky top-28 max-h-[calc(100vh-8rem)] overflow-y-auto hide-scrollbar py-2">
                <SidebarNav sections={nav.sections} activeId={activeId} onNavigate={scrollToSection} />
              </div>
            </aside>

            {/* ─── MAIN CONTENT ─── */}
            <div className="flex-1 min-w-0 max-w-[780px]">
              {sections.map((section, i) => (
                <ContentSection key={section.heading} section={section} index={i} sectionId={nav.sections[i]?.id ?? ""} />
              ))}

              {/* FAQ */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mt-8"
              >
                <div className="rounded-2xl border border-[#E7E2D8] bg-white overflow-hidden shadow-sm">
                  <div className="px-6 py-6 md:px-8 md:py-7 lg:px-10 lg:py-8">
                    <div className="flex items-center gap-2.5 mb-5">
                      <HelpCircle className="w-5 h-5 text-[#169B62]" />
                      <h3 className="text-lg md:text-xl font-bold text-[#1C1C1C]">Frequently Asked Questions</h3>
                    </div>
                    <FAQAccordion items={faqs} />
                  </div>
                </div>
              </motion.div>

              {/* Contact */}
              <div className="mt-8">
                <ContactCard email={EMAIL_MAP[pageKey]} subject={SUBJECT_MAP[pageKey]} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ MOBILE TOC FAB ═══════════ */}
      <div className="lg:hidden fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setMobileTocOpen(true)}
          className="w-12 h-12 rounded-full bg-[#169B62] text-white shadow-[0_4px_20px_rgba(22,155,98,0.35)] flex items-center justify-center hover:bg-[#1FC77E] transition-colors"
          aria-label="Open table of contents"
        >
          <List className="w-5 h-5" />
        </button>
      </div>

      {/* ═══════════ MOBILE TOC DRAWER ═══════════ */}
      <AnimatePresence>
        {mobileTocOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm lg:hidden"
              onClick={() => setMobileTocOpen(false)}
            />
            {/* Drawer */}
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", stiffness: 400, damping: 40 }}
              className="fixed bottom-0 left-0 right-0 z-50 lg:hidden rounded-t-2xl bg-white border border-[#E7E2D8] shadow-2xl max-h-[70vh] overflow-y-auto"
            >
              <div className="sticky top-0 bg-white/95 backdrop-blur-sm z-10 px-5 py-4 border-b border-[#E7E2D8] flex items-center justify-between">
                <h4 className="text-sm font-semibold text-[#1C1C1C]">On This Page</h4>
                <button onClick={() => setMobileTocOpen(false)} className="w-8 h-8 rounded-full bg-[#F4F1EC] flex items-center justify-center">
                  <X className="w-4 h-4 text-[#6B6B6B]" />
                </button>
              </div>
              <div className="px-3 py-3">
                <SidebarNav sections={nav.sections} activeId={activeId} onNavigate={scrollToSection} />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </main>
  );
}
