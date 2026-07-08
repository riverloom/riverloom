"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  MapPin,
  Phone,
  Send,
  CheckCircle,
  AlertCircle,
  Loader2,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface FormData {
  name: string;
  email: string;
  projectType: string;
  message: string;
}

const PROJECT_TYPES = [
  "AI / Machine Learning",
  "Web Engineering",
  "Mobile Applications",
  "Enterprise Software",
  "Cloud Infrastructure",
  "UI/UX Design",
  "Consulting & Strategy",
  "Other",
];

export default function ContactPageClient() {
  const [serverState, setServerState] = useState<{
    status: "idle" | "loading" | "success" | "error";
    message: string;
  }>({ status: "idle", message: "" });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: { projectType: "" },
  });

  const onSubmit = async (data: FormData) => {
    setServerState({ status: "loading", message: "" });
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok) {
        setServerState({ status: "error", message: json.error ?? "Something went wrong." });
        return;
      }
      setServerState({ status: "success", message: json.message });
      reset();
    } catch {
      setServerState({
        status: "error",
        message: "Unable to reach the server. Please try again or email us directly.",
      });
    }
  };

  return (
    <>
      {/* ═══════════ HERO ═══════════ */}
      <section className="relative pt-40 pb-20 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/3 left-1/4 w-96 h-96 rounded-full bg-[var(--color-accent)]/5 blur-[120px]" />
        </div>
        <div className="container-main relative z-10">
          <div className="content-width">
            <div className="max-w-3xl">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[var(--color-border)] bg-[var(--color-card)]/50 text-sm text-[var(--color-text-secondary)] mb-6">
                Get in Touch
              </span>
              <h1 className="text-5xl md:text-7xl font-bold leading-[1.05] tracking-tight text-[var(--color-text)] mb-6">
                Let's Start a Conversation
              </h1>
              <p className="text-lg text-[var(--color-text-secondary)] leading-relaxed max-w-2xl">
                Tell us about your project. We'll get back to you within 24 hours to schedule a discovery call.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ FORM + INFO ═══════════ */}
      <section className="section-padding pt-0">
        <div className="container-main">
          <div className="content-width">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              {/* ── FORM ── */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
                  {/* Name */}
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-[var(--color-text)] mb-2">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="name"
                      type="text"
                      placeholder="John Doe"
                      {...register("name", {
                        required: "Name is required",
                        minLength: { value: 2, message: "Name must be at least 2 characters" },
                      })}
                      className={cn(
                        "w-full px-5 py-3 rounded-xl border bg-[var(--color-card)] text-[var(--color-text)] placeholder:text-[var(--color-text-secondary)]/50 focus:outline-none transition-colors",
                        errors.name
                          ? "border-red-400 focus:border-red-500"
                          : "border-[var(--color-border)] focus:border-[var(--color-accent)]"
                      )}
                    />
                    {errors.name && (
                      <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.name.message}
                      </p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-[var(--color-text)] mb-2">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="email"
                      type="email"
                      placeholder="john@company.com"
                      {...register("email", {
                        required: "Email is required",
                        pattern: {
                          value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                          message: "Please enter a valid email",
                        },
                      })}
                      className={cn(
                        "w-full px-5 py-3 rounded-xl border bg-[var(--color-card)] text-[var(--color-text)] placeholder:text-[var(--color-text-secondary)]/50 focus:outline-none transition-colors",
                        errors.email
                          ? "border-red-400 focus:border-red-500"
                          : "border-[var(--color-border)] focus:border-[var(--color-accent)]"
                      )}
                    />
                    {errors.email && (
                      <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.email.message}
                      </p>
                    )}
                  </div>

                  {/* Project Type */}
                  <div>
                    <label htmlFor="projectType" className="block text-sm font-medium text-[var(--color-text)] mb-2">
                      Project Type <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="projectType"
                      {...register("projectType", { required: "Please select a project type" })}
                      className={cn(
                        "w-full px-5 py-3 rounded-xl border bg-[var(--color-card)] text-[var(--color-text)] focus:outline-none transition-colors appearance-none",
                        errors.projectType
                          ? "border-red-400 focus:border-red-500"
                          : "border-[var(--color-border)] focus:border-[var(--color-accent)]"
                      )}
                    >
                      <option value="">Select a service...</option>
                      {PROJECT_TYPES.map((t) => (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      ))}
                    </select>
                    {errors.projectType && (
                      <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.projectType.message}
                      </p>
                    )}
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-[var(--color-text)] mb-2">
                      Message <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="message"
                      rows={5}
                      placeholder="Tell us about your project..."
                      {...register("message", {
                        required: "Message is required",
                        minLength: { value: 10, message: "Message must be at least 10 characters" },
                      })}
                      className={cn(
                        "w-full px-5 py-3 rounded-xl border bg-[var(--color-card)] text-[var(--color-text)] placeholder:text-[var(--color-text-secondary)]/50 focus:outline-none transition-colors resize-none",
                        errors.message
                          ? "border-red-400 focus:border-red-500"
                          : "border-[var(--color-border)] focus:border-[var(--color-accent)]"
                      )}
                    />
                    {errors.message && (
                      <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.message.message}
                      </p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={serverState.status === "loading"}
                    className={cn(
                      "w-full inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-medium transition-all duration-300",
                      serverState.status === "loading"
                        ? "bg-[var(--color-accent)]/70 text-white cursor-not-allowed"
                        : "bg-[var(--color-accent)] text-white hover:bg-[var(--color-accent-light)]"
                    )}
                  >
                    {serverState.status === "loading" ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>

                  {/* Server feedback */}
                  <AnimatePresence mode="wait">
                    {serverState.status === "success" && (
                      <motion.div
                        key="success"
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="flex items-start gap-3 p-4 rounded-xl bg-[#E8F7EF] border border-[#169B62]/15 text-sm text-[#1C1C1C]"
                      >
                        <CheckCircle className="w-5 h-5 text-[#169B62] shrink-0 mt-0.5" />
                        <span>{serverState.message}</span>
                      </motion.div>
                    )}
                    {serverState.status === "error" && (
                      <motion.div
                        key="error"
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="flex items-start gap-3 p-4 rounded-xl bg-red-50 border border-red-200/60 text-sm text-[#1C1C1C]"
                      >
                        <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                        <span>{serverState.message}</span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </form>
              </motion.div>

              {/* ── INFO PANELS ── */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="space-y-8"
              >
                {/* Contact Details */}
                <div className="p-8 rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)]">
                  <h3 className="text-xl font-bold text-[var(--color-text)] mb-6">Contact Information</h3>
                  <div className="space-y-5">
                    {[
                      { icon: Mail, label: "Email", value: "contact@riverloom.in", href: "mailto:contact@riverloom.in" },
                      { icon: Phone, label: "Phone", value: "+91 7007329693", href: "tel:+917007329693" },
                      { icon: MapPin, label: "Location", value: "D-314, 2F Lajpat Nagar, Sahibabad, Ghaziabad - 201007" },
                    ].map(({ icon: Icon, label, value, href }) => (
                      <div key={label} className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-lg bg-[var(--color-accent)]/10 flex items-center justify-center shrink-0">
                          <Icon className="w-5 h-5 text-[var(--color-accent)]" />
                        </div>
                        <div>
                          <div className="text-sm text-[var(--color-text-secondary)]">{label}</div>
                          {href ? (
                            <a
                              href={href}
                              className="font-medium text-[var(--color-text)] hover:text-[var(--color-accent)] transition-colors"
                            >
                              {value}
                            </a>
                          ) : (
                            <div className="font-medium text-[var(--color-text)]">{value}</div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Process Steps */}
                <div className="p-8 rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)]">
                  <h3 className="text-xl font-bold text-[var(--color-text)] mb-4">What happens next?</h3>
                  <ol className="space-y-4">
                    {[
                      "We review your message within 24 hours",
                      "Schedule a free discovery call",
                      "Discuss your vision and requirements",
                      "Receive a tailored proposal",
                    ].map((step, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span className="w-6 h-6 rounded-full bg-[var(--color-accent)]/10 text-[var(--color-accent)] text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                          {i + 1}
                        </span>
                        <span className="text-[var(--color-text-secondary)]">{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
