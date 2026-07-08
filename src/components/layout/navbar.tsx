"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { navLinks } from "@/data/navigation";
import MagneticWrapper from "@/components/ui/MagneticWrapper";

const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.07, delayChildren: 0.2 },
  },
  exit: {
    opacity: 0,
    transition: { staggerChildren: 0.04, staggerDirection: -1 },
  },
};

const staggerItem = {
  hidden: { opacity: 0, y: 40, filter: "blur(10px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.6, ease: [0.19, 1, 0.22, 1] as const },
  },
  exit: {
    opacity: 0,
    y: -20,
    filter: "blur(10px)",
    transition: { duration: 0.3, ease: [0.19, 1, 0.22, 1] as const },
  },
};

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
      document.body.style.touchAction = "none";
    } else {
      document.body.style.overflow = "";
      document.body.style.touchAction = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.body.style.touchAction = "";
    };
  }, [mobileOpen]);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const isActive = (href: string) => pathname === href;

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-4 md:pt-5">
        <div
          className={cn(
            "relative transition-all duration-700 ease-out-expo",
            "w-full max-w-[1400px] mx-4 lg:mx-8"
          )}
        >
          {/* Main navbar */}
          <nav
            className={cn(
              "relative flex items-center justify-between",
              "px-5 md:px-7 lg:px-8",
              "transition-all duration-700 ease-out-expo",
              scrolled ? "h-[56px] md:h-[60px]" : "h-[60px] md:h-[68px]",
              "rounded-full",
              scrolled
                ? "bg-[#0D0D0D]/85 backdrop-blur-2xl saturate-[1.8] shadow-[0_8px_40px_rgba(0,0,0,0.5)]"
                : "bg-[#0D0D0D]/60 backdrop-blur-xl saturate-[1.4] shadow-[0_4px_24px_rgba(0,0,0,0.3)]",
              "border border-[#1F1F1F]"
            )}
          >
            {/* ── LOGO ── */}
            <Link
              href="/"
              className="relative z-10 flex-shrink-0 group"
              aria-label="RiverLoom — Home"
            >
              <div
                className={cn(
                  "relative transition-all duration-700 ease-out-expo",
                  scrolled ? "h-9 w-44 md:h-11 md:w-52" : "h-11 w-48 md:h-[52px] md:w-56"
                )}
              >
                <Image
                  src="/assets/logos/namelogo.png"
                  alt="RiverLoom"
                  fill
                  sizes="200px"
                  className="object-contain object-left"
                  priority
                />
              </div>
            </Link>

            {/* ── DESKTOP NAV LINKS ── */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => {
                const active = isActive(link.href);
                const isHovered = hoveredLink === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onMouseEnter={() => setHoveredLink(link.href)}
                    onMouseLeave={() => setHoveredLink(null)}
                    className={cn(
                      "group relative px-4 py-2 text-base font-medium",
                      "transition-all duration-300 ease-out-expo",
                      "rounded-full"
                    )}
                  >
                    <span
                      className={cn(
                        "relative block transition-all duration-300",
                        active
                          ? "text-[#1FC77E]"
                          : "text-[#9E9E9E]",
                        "group-hover:text-white"
                      )}
                    >
                      {link.label}
                    </span>

                    {active && (
                      <motion.div
                        layoutId="navPill"
                        className="absolute bottom-0.5 left-3.5 right-3.5 h-[2px] rounded-full bg-[#1FC77E]"
                        transition={{
                          type: "spring",
                          stiffness: 380,
                          damping: 30,
                        }}
                      />
                    )}

                    <span
                      className={cn(
                        "absolute bottom-0.5 left-3.5 right-3.5 h-[2px] rounded-full",
                        "bg-[#1FC77E]",
                        "scale-x-0 group-hover:scale-x-100",
                        "transition-transform duration-300 ease-out-expo origin-left",
                        active && "hidden"
                      )}
                    />
                  </Link>
                );
              })}
            </div>

            {/* ── RIGHT SIDE ── */}
            <div className="flex items-center gap-2 md:gap-3">
              {/* Desktop CTA */}
              <div className="hidden sm:block">
                <MagneticWrapper strength={0.25}>
                  <Link
                    href="/contact"
                    className={cn(
                      "group relative inline-flex items-center gap-2",
                      "px-6 py-2.5 rounded-full text-base font-semibold",
                      "overflow-hidden",
                      "bg-[#169B62]",
                      "text-white",
                      "shadow-[0_4px_16px_rgba(22,155,98,0.3)]",
                      "hover:shadow-[0_8px_32px_rgba(22,155,98,0.5)]",
                      "hover:bg-[#1FC77E]",
                      "hover:scale-[1.02]",
                      "transition-all duration-300 ease-out-expo"
                    )}
                  >
                    <span
                      className={cn(
                        "absolute inset-0 -translate-x-full",
                        "group-hover:translate-x-full",
                        "transition-transform duration-700 ease-out-expo",
                        "bg-gradient-to-r from-transparent via-white/15 to-transparent"
                      )}
                    />
                    <span className="relative z-[1]">Start a Project</span>
                    <ArrowRight className="relative z-[1] w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
                  </Link>
                </MagneticWrapper>
              </div>

              {/* Mobile hamburger */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="md:hidden relative z-50 w-10 h-10 flex items-center justify-center rounded-full border border-[#1F1F1F] bg-[#0D0D0D]/80 backdrop-blur-sm"
                aria-label={mobileOpen ? "Close menu" : "Open menu"}
              >
                <AnimatePresence mode="wait">
                  {mobileOpen ? (
                    <motion.div
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      <X className="w-4 h-4 text-white" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      <Menu className="w-4 h-4 text-white" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* ════════════════════════════════════════
         MOBILE FULL-SCREEN
         ════════════════════════════════════════ */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-40 md:hidden flex flex-col"
          >
            <div className="absolute inset-0 bg-[#F8F6F1]/98 backdrop-blur-3xl" />
            <div
              className="absolute inset-0 z-0"
              onClick={() => setMobileOpen(false)}
            />

            <div className="relative z-10 flex-1 flex flex-col items-center justify-center gap-6 px-6">
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                animate="show"
                exit="exit"
                className="flex flex-col items-center gap-1 w-full"
              >
                {navLinks.map((link) => {
                  const active = isActive(link.href);
                  return (
                    <motion.div
                      key={link.href}
                      variants={staggerItem}
                      className="w-full flex justify-center"
                    >
                      <Link
                        href={link.href}
                        onClick={() => setMobileOpen(false)}
                        className={cn(
                          "relative inline-block py-3 text-center",
                          "text-4xl md:text-5xl font-light tracking-tight",
                          "transition-all duration-300",
                          active
                            ? "text-[#169B62]"
                            : "text-[#1C1C1C] hover:text-[#169B62]"
                        )}
                      >
                        {link.label}
                      </Link>
                    </motion.div>
                  );
                })}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{
                  delay: 0.5,
                  duration: 0.5,
                  ease: [0.19, 1, 0.22, 1] as const,
                }}
                className="mt-6"
              >
                <Link
                  href="/contact"
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    "group relative inline-flex items-center gap-3",
                    "px-8 py-3.5 rounded-full text-lg font-semibold",
                    "bg-[#169B62]",
                    "text-white shadow-[0_4px_24px_rgba(22,155,98,0.3)]",
                    "hover:shadow-[0_8px_40px_rgba(22,155,98,0.4)] hover:bg-[#1FC77E]",
                    "transition-all duration-300"
                  )}
                >
                  Start a Project
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </motion.div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.65, duration: 0.4 }}
                className="absolute bottom-10 text-xs text-[#9E9E9E] tracking-[0.25em] uppercase font-medium"
              >
                Premium Engineering Studio
              </motion.p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
