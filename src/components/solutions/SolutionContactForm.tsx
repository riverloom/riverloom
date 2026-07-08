"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, ArrowUpRight, Loader2 } from "lucide-react";

interface FormData {
  name: string;
  company: string;
  email: string;
  phone: string;
  projectType: string;
  budget: string;
  timeline: string;
  description: string;
}

const initialForm: FormData = {
  name: "",
  company: "",
  email: "",
  phone: "",
  projectType: "",
  budget: "",
  timeline: "",
  description: "",
};

const projectTypes = [
  "AI & Machine Learning",
  "Cloud Infrastructure",
  "Web Application",
  "Mobile App",
  "Security & Compliance",
  "Performance Optimization",
  "Digital Transformation",
  "Other",
];

const budgets = ["Under $10K", "$10K – $25K", "$25K – $50K", "$50K – $75K", "$75K+", "Not sure yet"];

export default function SolutionContactForm() {
  const [form, setForm] = useState<FormData>(initialForm);
  const [step, setStep] = useState<"form" | "submitting" | "success">("form");

  const update = (field: keyof FormData, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStep("submitting");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          projectType: form.projectType + (form.budget ? ` (Budget: ${form.budget})` : ""),
          message: `Company: ${form.company}\nPhone: ${form.phone}\nTimeline: ${form.timeline}\n\n${form.description}`,
        }),
      });
      const json = await res.json();
      if (!res.ok) {
        setStep("form");
        return;
      }
      setStep("success");
    } catch {
      setStep("form");
    }
  };

  const isValid = form.name && form.email && form.description;

  return (
    <section className="relative overflow-hidden bg-[#F8F6F1] py-24 md:py-32">
      {/* Noise & glow */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='0.08'/%3E%3C/svg%3E")`,
          backgroundSize: "200px 200px",
        }}
      />
      <div className="pointer-events-none absolute left-1/3 top-0 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-[rgba(22,155,98,0.06)] blur-[140px]" />

      <div className="relative z-10 mx-auto max-w-[800px] px-5 md:px-10">
        <AnimatePresence mode="wait">
          {step === "success" ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="rounded-[32px] border border-[var(--color-border)] bg-white p-12 text-center shadow-[0_1px_3px_rgba(0,0,0,0.04),0_8px_24px_rgba(0,0,0,0.03)]"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
                className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-[var(--color-accent-subtle)]"
              >
                <CheckCircle2 className="h-10 w-10 text-[var(--color-accent)]" />
              </motion.div>
              <h3 className="mb-3 text-2xl font-bold tracking-tight text-[var(--color-text)]">
                Message received!
              </h3>
              <p className="mx-auto max-w-md text-[var(--color-text-secondary)]">
                Thanks for reaching out. Our team typically responds within 24 hours to schedule a strategy call.
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <div className="mb-12 text-center">
                <h2 className="mb-4 text-[clamp(2rem,4vw,3rem)] font-bold leading-[1.08] tracking-[-0.03em] text-[var(--color-text)]">
                  Let's build something exceptional.
                </h2>
                <p className="mx-auto max-w-lg text-lg text-[var(--color-text-secondary)]">
                  Tell us about your project and we'll craft a proposal tailored to your goals.
                </p>
              </div>

              <form
                onSubmit={handleSubmit}
                className="rounded-[32px] border border-[var(--color-border)] bg-white p-10 shadow-[0_1px_3px_rgba(0,0,0,0.04),0_8px_24px_rgba(0,0,0,0.03)] md:p-12"
              >
                <div className="grid gap-6 md:grid-cols-2">
                  <InputField label="Name *" value={form.name} onChange={(v) => update("name", v)} placeholder="John Doe" />
                  <InputField label="Company" value={form.company} onChange={(v) => update("company", v)} placeholder="Acme Inc." />
                  <InputField label="Email *" type="email" value={form.email} onChange={(v) => update("email", v)} placeholder="john@acme.com" />
                  <InputField label="Phone" type="tel" value={form.phone} onChange={(v) => update("phone", v)} placeholder="+1 (555) 000-0000" />

                  <SelectField label="Project Type" value={form.projectType} onChange={(v) => update("projectType", v)} options={projectTypes} placeholder="Select type" />
                  <SelectField label="Budget Range" value={form.budget} onChange={(v) => update("budget", v)} options={budgets} placeholder="Select range" />
                  <div className="md:col-span-2">
                    <SelectField label="Timeline" value={form.timeline} onChange={(v) => update("timeline", v)} options={["ASAP", "1–3 months", "3–6 months", "6+ months", "Just exploring"]} placeholder="Select timeline" />
                  </div>
                  <div className="md:col-span-2">
                    <InputField label="Project Description *" textarea value={form.description} onChange={(v) => update("description", v)} placeholder="Tell us about your project, goals, and any specific requirements..." />
                  </div>
                </div>

                <motion.button
                  type="submit"
                  disabled={!isValid || step === "submitting"}
                  whileHover={isValid ? { scale: 1.01 } : {}}
                  whileTap={isValid ? { scale: 0.99 } : {}}
                  className="mt-8 flex w-full items-center justify-center gap-2 rounded-full bg-[var(--color-accent)] py-4 text-base font-semibold text-white shadow-[0_4px_20px_rgba(22,155,98,0.3)] transition-shadow hover:shadow-[0_8px_36px_rgba(22,155,98,0.4)] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {step === "submitting" ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      Book Your Strategy Call
                      <ArrowUpRight className="h-5 w-5" />
                    </>
                  )}
                </motion.button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

/* ─── Sub-components ─── */

function InputField({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  textarea = false,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
  textarea?: boolean;
}) {
  const Tag = textarea ? "textarea" : "input";
  return (
    <label className="group block">
      <span className="mb-1.5 block text-sm font-medium text-[var(--color-text)]">{label}</span>
      <Tag
        type={textarea ? undefined : type}
        value={value}
        onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`w-full rounded-xl border border-[var(--color-border)] bg-white px-4 text-[15px] text-[var(--color-text)] outline-none transition-all duration-300 placeholder:text-[var(--color-text-tertiary)] focus:border-[var(--color-accent)] focus:ring-2 focus:ring-[var(--color-accent-subtle)] group-hover:border-[var(--color-border-strong)] ${
          textarea ? "min-h-[120px] resize-y py-3" : "h-12"
        }`}
      />
    </label>
  );
}

function SelectField({
  label,
  value,
  onChange,
  options,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
  placeholder?: string;
}) {
  return (
    <label className="group block">
      <span className="mb-1.5 block text-sm font-medium text-[var(--color-text)]">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-12 w-full rounded-xl border border-[var(--color-border)] bg-white px-4 text-[15px] text-[var(--color-text)] outline-none transition-all duration-300 focus:border-[var(--color-accent)] focus:ring-2 focus:ring-[var(--color-accent-subtle)] group-hover:border-[var(--color-border-strong)]"
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </label>
  );
}
