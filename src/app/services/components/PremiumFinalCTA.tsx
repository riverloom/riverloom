"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Calendar, ArrowUpRight } from "lucide-react";
import { AuroraMesh, FloatingParticles, GlowingRing } from "./BackgroundDecorations";
import { BOOKING_URL, BOOKING_ATTRS } from "@/lib/booking";

export default function PremiumFinalCTA() {
  const ref = useRef<HTMLElement>(null);
  const iv = useInView(ref, { once: true, margin: "-80px" });

  const trustItems = [
    { value: "100+", label: "Projects Delivered" },
    { value: "24/7", label: "Support" },
    { value: "99%", label: "Client Satisfaction" },
  ];

  const clientLogos = [
    "Aether", "Arcadia", "Fathom", "Halcyon", "Lumina",
    "Meridian", "Nexus", "Northwind", "Outset", "Prism",
    "Pulse", "Velora",
  ];

  return (
    <section ref={ref} className="relative z-10 pb-24 md:pb-32">
      <div className="container-wide">
        <motion.div
          className="relative overflow-hidden rounded-[32px] p-10 md:p-14 lg:p-16 text-center"
          style={{
            background: "linear-gradient(135deg, #0A1F16 0%, #0D2B1E 30%, #143A2D 60%, #0F2E23 100%)",
            border: "1px solid rgba(22,155,98,0.15)",
          }}
          initial={{ opacity: 0, y: 40 }}
          animate={iv ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.19, 1, 0.22, 1] }}
        >
          {/* Aurora / mesh gradient background */}
          <AuroraMesh accent1="#169B62" accent2="#22C55E" accent3="#06B6D4" />

          {/* Rotating glowing rings */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <GlowingRing accent="#169B62" />
            <GlowingRing accent="#22C55E" />
          </div>

          {/* Floating particles */}
          <FloatingParticles count={30} />

          {/* Content */}
          <div className="relative z-10">
            {/* Badge */}
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-[0.15em] mb-6"
              style={{
                backgroundColor: "rgba(22,155,98,0.12)",
                color: "#1FC77E",
                border: "1px solid rgba(22,155,98,0.2)",
              }}
              initial={{ opacity: 0, y: 10 }}
              animate={iv ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <motion.span
                className="w-1.5 h-1.5 rounded-full"
                style={{ backgroundColor: "#22C55E" }}
                animate={{ opacity: [1, 0.3, 1], scale: [1, 1.3, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              />
              Let's Build Together
            </motion.div>

            {/* Heading */}
            <motion.h2
              className="text-[clamp(32px,4.5vw,56px)] font-bold leading-[1.08] tracking-[-0.02em] mb-4"
              style={{ color: "#F8F6F1" }}
              initial={{ opacity: 0, y: 20 }}
              animate={iv ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3, duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
            >
              Ready to Build Something
              <br />
              <span className="text-gradient-accent">Extraordinary?</span>
            </motion.h2>

            {/* Subtitle */}
            <motion.p
              className="text-[17px] md:text-[20px] max-w-xl mx-auto mb-8"
              style={{ color: "rgba(248,246,241,0.65)" }}
              initial={{ opacity: 0 }}
              animate={iv ? { opacity: 1 } : {}}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              Let's discuss how we can help bring your vision to life.
              Every project starts with a conversation.
            </motion.p>

            {/* Trust indicators */}
            <motion.div
              className="flex flex-wrap justify-center gap-4 mb-8"
              initial={{ opacity: 0 }}
              animate={iv ? { opacity: 1 } : {}}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              {trustItems.map((item, i) => (
                <motion.div
                  key={item.label}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl"
                  style={{
                    backgroundColor: "rgba(22,155,98,0.08)",
                    border: "1px solid rgba(22,155,98,0.12)",
                  }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={iv ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.5 + i * 0.08, duration: 0.4 }}
                  whileHover={{
                    backgroundColor: "rgba(22,155,98,0.15)",
                    borderColor: "rgba(22,155,98,0.3)",
                    y: -2,
                  }}
                >
                  <span
                    className="text-[14px] font-bold"
                    style={{ color: "#1FC77E" }}
                  >
                    {item.value}
                  </span>
                  <span
                    className="text-[11px] font-medium"
                    style={{ color: "rgba(248,246,241,0.5)" }}
                  >
                    {item.label}
                  </span>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-wrap justify-center gap-4 mb-10"
              initial={{ opacity: 0, y: 10 }}
              animate={iv ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <a
                  href={BOOKING_URL}
                  target={BOOKING_ATTRS.target}
                  rel={BOOKING_ATTRS.rel}
                  className="group inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full text-sm font-semibold text-white transition-all duration-300"
                  style={{
                    backgroundColor: "#169B62",
                    boxShadow: "0 4px 20px rgba(22,155,98,0.35)",
                  }}
                >
                  <span>Book Free Consultation</span>
                  <Calendar className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                </a>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <Link
                  href="/contact"
                  className="group inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-sm font-semibold transition-all duration-300"
                  style={{
                    border: "1px solid rgba(248,246,241,0.2)",
                    color: "#F8F6F1",
                  }}
                >
                  <span>Contact Us</span>
                  <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                </Link>
              </motion.div>
            </motion.div>

            {/* Client logo strip */}
            <motion.div
              className="relative"
              initial={{ opacity: 0 }}
              animate={iv ? { opacity: 1 } : {}}
              transition={{ delay: 0.8, duration: 0.5 }}
            >
              <div
                className="text-[9px] font-semibold uppercase tracking-[0.2em] mb-3"
                style={{ color: "rgba(248,246,241,0.3)" }}
              >
                Trusted by Industry Leaders
              </div>
              <div className="flex flex-wrap justify-center gap-x-5 gap-y-2">
                {clientLogos.map((name, i) => (
                  <motion.span
                    key={name}
                    className="text-[11px] font-bold tracking-wider"
                    style={{ color: `rgba(248,246,241,${0.15 + i * 0.02})` }}
                    initial={{ opacity: 0 }}
                    animate={iv ? { opacity: 0.15 + i * 0.02 } : {}}
                    transition={{ delay: 0.9 + i * 0.04, duration: 0.3 }}
                    whileHover={{
                      color: "#1FC77E",
                      opacity: 1,
                      scale: 1.05,
                    }}
                  >
                    {name}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
