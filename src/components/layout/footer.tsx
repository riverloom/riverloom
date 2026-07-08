"use client";

import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  motion,
  useInView,
  useScroll,
  useTransform,
  useSpring,
  AnimatePresence,
} from "framer-motion";
import { ChevronRight, ArrowUp, MapPin, Mail, Phone, Clock, MessageCircle } from "lucide-react";

/* ═══════════════════════════════════════════════════════════
   DATA
   ═══════════════════════════════════════════════════════════ */

const BRAND_INFO = {
  mission:
    "RiverLoom engineers AI-powered software, scalable digital platforms, and enterprise solutions that help ambitious companies innovate faster, build smarter, and scale without limits.",
  responseTime: "Avg. Response: < 24h",
  experience: "10+ Years of Excellence",
};

interface FooterLinkData {
  label: string;
  href: string;
  isExternal?: boolean;
  isInfo?: boolean;
}

interface NavColumnData {
  title: string;
  links: FooterLinkData[];
}

const SERVICES_COLUMN: NavColumnData = {
  title: "Services",
  links: [
    { label: "AI Systems", href: "/services/ai-solutions" },
    { label: "Platform Engineering", href: "/services/platform-engineering" },
    { label: "Digital Products", href: "/services/custom-software" },
    { label: "Mobile Experiences", href: "/services/mobile-development" },
    { label: "Cloud & DevOps", href: "/services/cloud-devops" },
    { label: "Website Development", href: "/services/web-development" },
  ],
};

const COMPANY_COLUMN: NavColumnData = {
  title: "Company",
  links: [
    { label: "About", href: "/about" },
    { label: "Work", href: "/work" },
    { label: "Process", href: "/process" },
    { label: "Careers", href: "/careers" },
    { label: "Contact", href: "/contact" },
  ],
};

const RESOURCES_COLUMN: NavColumnData = {
  title: "Resources",
  links: [
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms & Conditions", href: "/terms-and-conditions" },
    { label: "Refund Policy", href: "/refund-policy" },
    { label: "Cancellation Policy", href: "/cancellation-policy" },
  ],
};

const CONTACT_ITEMS: FooterLinkData[] = [
  { label: "contact@riverloom.in", href: "mailto:contact@riverloom.in", isExternal: true },
  { label: "+91 7007329693", href: "tel:+917007329693", isExternal: true },
  { label: "Sahibabad, Ghaziabad", href: "https://www.google.com/maps/search/?api=1&query=D-314,+2F+Lajpat+Nagar,+Sahibabad,+Ghaziabad,+Uttar+Pradesh+201007,+India", isExternal: true },
  { label: "Mon–Fri, 9 AM – 6 PM IST", href: "#", isInfo: true },
  { label: "Let's Talk", href: "/contact" },
];

const SOCIAL_LINKS = [
  {
    icon: (
      <svg viewBox="0 0 24 24" className="h-[20px] w-[20px]" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
    href: "https://x.com/riverloom",
    label: "X / Twitter",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" className="h-[20px] w-[20px]" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
    href: "https://www.linkedin.com/company/riverloomstudioprivatelimited/",
    label: "LinkedIn",
  },
  // {
  //   icon: (
  //     <svg viewBox="0 0 24 24" className="h-[20px] w-[20px]" fill="currentColor">
  //       <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
  //     </svg>
  //   ),
  //   href: "https://github.com/riverloom",
  //   label: "GitHub",
  // },
  {
    icon: (
      <svg viewBox="0 0 24 24" className="h-[20px] w-[20px]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
      </svg>
    ),
    href: "mailto:contact@riverloom.in",
    label: "Email",
  },
];

const BOTTOM_LINKS = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms & Conditions", href: "/terms-and-conditions" },
  { label: "Refund Policy", href: "/refund-policy" },
  { label: "Cancellation Policy", href: "/cancellation-policy" },
];

/* ═══════════════════════════════════════════════════════════
   SUB-COMPONENTS
   ═══════════════════════════════════════════════════════════ */

/* ─── Social Icon ─── */
function SocialIconButton({
  icon,
  href,
  label,
  index,
}: {
  icon: React.ReactNode;
  href: string;
  label: string;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: 0.5 + index * 0.08, duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
    >
      <Link
        href={href}
        aria-label={label}
        target={href.startsWith("http") || href.startsWith("mailto") ? "_blank" : undefined}
        rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
        className="group relative block"
      >
        <motion.span
          className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100"
          style={{
            background:
              "radial-gradient(circle at center, rgba(22,196,127,0.2) 0%, transparent 70%)",
          }}
          transition={{ duration: 0.4 }}
        />
        <motion.span
          className="relative flex h-[48px] w-[48px] items-center justify-center rounded-full border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.02)]"
          whileHover={{
            scale: 1.12,
            rotate: 6,
            borderColor: "rgba(22,196,127,0.4)",
            backgroundColor: "rgba(22,196,127,0.08)",
            boxShadow: "0 0 24px rgba(22,196,127,0.15)",
          }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.4, ease: [0.19, 1, 0.22, 1] }}
        >
          <motion.span
            className="text-white/60 group-hover:text-[#16C47F]"
            style={{ filter: "drop-shadow(0 0 0px transparent)" }}
            whileHover={{ filter: "drop-shadow(0 0 6px rgba(22,196,127,0.4))" }}
            transition={{ duration: 0.3 }}
          >
            {icon}
          </motion.span>
        </motion.span>
      </Link>
    </motion.div>
  );
}

/* ─── Nav Link ─── */
function FooterNavLink({ link, index }: { link: FooterLinkData; index: number }) {
  const [isHovered, setIsHovered] = useState(false);

  if (link.isInfo) {
    return (
      <motion.li
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.35 + index * 0.04, duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
      >
        <span className="inline-flex items-center gap-2 py-1.5 text-[17px] md:text-[18px] font-medium leading-snug text-[#A8B5AE]/70 cursor-default">
          {link.label}
        </span>
      </motion.li>
    );
  }

  const isExternal = link.isExternal;
  const Comp = isExternal ? "a" : Link;
  const extraProps = isExternal
    ? { target: "_blank", rel: "noopener noreferrer" }
    : {};

  return (
    <motion.li
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.35 + index * 0.04, duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
    >
      <Comp
        href={link.href}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="group relative inline-flex items-center gap-2 py-1.5"
        {...extraProps}
      >
        <motion.span
          className="text-[17px] md:text-[18px] font-medium leading-snug transition-colors duration-300"
          style={{ color: isHovered ? "#16C47F" : "#A8B5AE" }}
          animate={{ x: isHovered ? 6 : 0 }}
          transition={{ duration: 0.35, ease: [0.19, 1, 0.22, 1] }}
        >
          {link.label}
        </motion.span>
        <motion.span
          className="text-[#16C47F] flex-shrink-0"
          animate={{
            x: isHovered ? 0 : -8,
            opacity: isHovered ? 1 : 0,
          }}
          transition={{ duration: 0.35, ease: [0.19, 1, 0.22, 1] }}
        >
          <ChevronRight className="h-3.5 w-3.5" />
        </motion.span>
        <motion.span
          className="absolute -bottom-px left-0 h-px rounded-full bg-[#16C47F]"
          animate={{
            width: isHovered ? "100%" : "0%",
            opacity: isHovered ? 0.6 : 0,
          }}
          transition={{ duration: 0.4, ease: [0.19, 1, 0.22, 1] }}
        />
      </Comp>
    </motion.li>
  );
}

/* ─── Column Wrapper ─── */
function FooterColumn({
  title,
  links,
  index,
}: {
  title: string;
  links: FooterLinkData[];
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.15 + index * 0.06, duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
    >
      <h4 className="mb-5 text-[14px] md:text-[15px] font-semibold uppercase tracking-[0.15em] text-[#16C47F]">
        {title}
      </h4>
      <ul className="flex flex-col gap-0.5">
        {links.map((link, i) => (
          <FooterNavLink key={`${link.label}-${i}`} link={link} index={i} />
        ))}
      </ul>
    </motion.div>
  );
}

/* ─── Contact Item ─── */
function ContactItem({ item, index }: { item: FooterLinkData; index: number }) {
  const [isHovered, setIsHovered] = useState(false);

  if (item.isInfo) {
    return (
      <motion.li
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.35 + index * 0.04, duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
      >
        <span className="inline-flex items-center gap-2.5 py-1.5 text-[17px] md:text-[18px] font-medium leading-snug text-[#A8B5AE]/70 cursor-default">
          <Clock className="h-4 w-4 text-[#16C47F] flex-shrink-0" />
          {item.label}
        </span>
      </motion.li>
    );
  }

  const isExternal = item.isExternal;
  const Comp = isExternal ? "a" : Link;
  const extraProps = isExternal
    ? { target: "_blank", rel: "noopener noreferrer" }
    : {};

  let icon = null;
  const labelLower = item.label.toLowerCase();
  if (labelLower.includes("@") || labelLower === "contact@riverloom.in") {
    icon = <Mail className="h-4 w-4 text-[#16C47F] flex-shrink-0" />;
  } else if (labelLower.includes("+91") || labelLower.includes("phone") || labelLower.includes("tel")) {
    icon = <Phone className="h-4 w-4 text-[#16C47F] flex-shrink-0" />;
  } else if (labelLower.includes("sahibabad") || labelLower.includes("office") || labelLower.includes("address")) {
    icon = <MapPin className="h-5 w-5 text-[#16C47F] flex-shrink-0" />;
  } else if (labelLower === "let's talk" || labelLower === "support") {
    icon = <MessageCircle className="h-4 w-4 text-[#16C47F] flex-shrink-0" />;
  } else if (labelLower === "linkedin") {
    icon = (
      <svg viewBox="0 0 24 24" className="h-4 w-4 text-[#16C47F] flex-shrink-0" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    );
  } else if (labelLower === "github") {
    icon = (
      <svg viewBox="0 0 24 24" className="h-4 w-4 text-[#16C47F] flex-shrink-0" fill="currentColor">
        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
      </svg>
    );
  }

  return (
    <motion.li
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.35 + index * 0.04, duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
    >
      <Comp
        href={item.href}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="group relative inline-flex items-center gap-2.5 py-1.5"
        {...extraProps}
      >
        {icon}
        <motion.span
          className="text-[17px] md:text-[18px] font-medium leading-snug transition-colors duration-300"
          style={{ color: isHovered ? "#16C47F" : "#A8B5AE" }}
          animate={{ x: isHovered ? 6 : 0 }}
          transition={{ duration: 0.35, ease: [0.19, 1, 0.22, 1] }}
        >
          {item.label}
        </motion.span>
        <motion.span
          className="text-[#16C47F] flex-shrink-0"
          animate={{
            x: isHovered ? 0 : -8,
            opacity: isHovered ? 1 : 0,
          }}
          transition={{ duration: 0.35, ease: [0.19, 1, 0.22, 1] }}
        >
          <ChevronRight className="h-3.5 w-3.5" />
        </motion.span>
        <motion.span
          className="absolute -bottom-px left-0 h-px rounded-full bg-[#16C47F]"
          animate={{
            width: isHovered ? "100%" : "0%",
            opacity: isHovered ? 0.6 : 0,
          }}
          transition={{ duration: 0.4, ease: [0.19, 1, 0.22, 1] }}
        />
      </Comp>
    </motion.li>
  );
}

/* ─── Contact Column ─── */
function ContactColumn({ index }: { index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.15 + index * 0.06, duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
    >
      <h4 className="mb-5 text-[14px] md:text-[15px] font-semibold uppercase tracking-[0.15em] text-[#16C47F]">
        Contact
      </h4>
      <ul className="flex flex-col gap-0.5">
        {CONTACT_ITEMS.map((item, i) => (
          <ContactItem key={`contact-${i}`} item={item} index={i} />
        ))}
      </ul>
    </motion.div>
  );
}

/* ─── Particles ─── */
function FooterParticles() {
  const particles = useMemo(() => {
    return Array.from({ length: 25 }, (_, i) => ({
      id: i,
      x: Math.sin(i * 127.1 + 311.7) * 0.5 + 0.5,
      y: Math.cos(i * 269.5 + 183.3) * 0.5 + 0.5,
      size: (Math.sin(i * 93.3 + 71.9) * 0.5 + 0.5) * 2 + 0.5,
      duration: (Math.sin(i * 47.1 + 23.5) * 0.5 + 0.5) * 12 + 8,
      delay: (Math.sin(i * 31.7 + 17.3) * 0.5 + 0.5) * 5,
      opacity: (Math.sin(i * 73.1 + 41.9) * 0.5 + 0.5) * 0.025 + 0.01,
    }));
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            width: p.size,
            height: p.size,
            left: `${p.x * 100}%`,
            top: `${p.y * 100}%`,
            backgroundColor: "#16C47F",
            opacity: p.opacity,
          }}
          animate={{
            y: [0, -(p.size * 4), 0],
            x: [0, (p.id % 2 === 0 ? 1 : -1) * p.size * 2, 0],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

/* ─── Mouse Glow ─── */
function MouseGlow({ containerRef }: { containerRef: React.RefObject<HTMLElement | null> }) {
  const [pos, setPos] = useState({ x: 50, y: 50 });
  const [isVisible, setIsVisible] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      setPos({
        x: ((e.clientX - rect.left) / rect.width) * 100,
        y: ((e.clientY - rect.top) / rect.height) * 100,
      });
      setIsVisible(true);
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => setIsVisible(false), 2000);
    },
    [containerRef]
  );

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setIsVisible(false)}
      className="pointer-events-none absolute inset-0 z-0"
    >
      <motion.div
        className="absolute h-[600px] w-[600px] rounded-full"
        style={{
          background:
            "radial-gradient(circle at center, rgba(22,196,127,0.03) 0%, transparent 60%)",
          transform: "translate(-50%, -50%)",
        }}
        animate={{
          left: `${pos.x}%`,
          top: `${pos.y}%`,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{
          type: "spring",
          stiffness: 25,
          damping: 20,
          opacity: { duration: 0.8 },
        }}
      />
    </div>
  );
}

/* ─── Watermark Background ─── */
function FooterWatermark() {
  return (
    <div className="pointer-events-none absolute inset-0 z-[1] flex items-center justify-center overflow-hidden select-none">
      <div
        className="relative w-[500px] h-[500px] md:w-[700px] md:h-[700px] xl:w-[800px] xl:h-[800px] opacity-[0.03] grayscale"
        style={{ filter: "blur(2px)" }}
      >
        <Image
          src="/assets/logos/logo.png"
          alt=""
          fill
          sizes="800px"
          className="object-contain"
          priority
          aria-hidden
        />
      </div>
    </div>
  );
}

/* ─── Back to Top ─── */
function BackToTopButton() {
  const [isVisible, setIsVisible] = useState(false);
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });
  const circumference = 2 * Math.PI * 18;
  const strokeDashoffset = useTransform(smoothProgress, [0, 1], [circumference, 0]);

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (v) => {
      setIsVisible(v > 0.15);
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.6, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6, y: 20 }}
          transition={{ duration: 0.4, ease: [0.19, 1, 0.22, 1] }}
          onClick={scrollToTop}
          aria-label="Back to top"
          className="fixed bottom-6 right-6 z-50 h-[52px] w-[52px] rounded-full backdrop-blur-md cursor-pointer"
          style={{
            backgroundColor: "rgba(15,42,32,0.85)",
            border: "1px solid rgba(255,255,255,0.08)",
            boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
          }}
          whileHover={{
            scale: 1.12,
            borderColor: "rgba(22,196,127,0.4)",
            boxShadow: "0 8px 40px rgba(22,196,127,0.25)",
          }}
          whileTap={{ scale: 0.95 }}
        >
          <svg
            className="absolute inset-0 h-full w-full -rotate-90"
            viewBox="0 0 52 52"
            fill="none"
          >
            <motion.circle
              cx="26"
              cy="26"
              r="18"
              stroke="rgba(255,255,255,0.06)"
              strokeWidth="2"
              fill="none"
            />
            <motion.circle
              cx="26"
              cy="26"
              r="18"
              stroke="#16C47F"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
              strokeDasharray={circumference}
              style={{ strokeDashoffset }}
            />
          </svg>
          <motion.span
            className="relative flex items-center justify-center"
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
          >
            <ArrowUp className="h-[18px] w-[18px] text-[#16C47F]" />
          </motion.span>
        </motion.button>
      )}
    </AnimatePresence>
  );
}

/* ═══════════════════════════════════════════════════════════
   MAIN — Premium Enterprise Footer
   ═══════════════════════════════════════════════════════════ */
export default function Footer() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.05,
      },
    },
  };

  const fadeUpItem = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.19, 1, 0.22, 1] as const },
    },
  };

  return (
    <>
      <footer
        ref={sectionRef}
        id="footer"
        aria-label="Footer"
        className="relative overflow-hidden"
        style={{ backgroundColor: "#081C15" }}
      >
        {/* ─── Premium Background ─── */}
        <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
          <div
            className="absolute inset-0 opacity-[0.015]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='256' height='256' filter='url(%23n)' opacity='0.08'/%3E%3C/svg%3E")`,
              backgroundSize: "128px 128px",
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.012) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.012) 1px, transparent 1px)",
              backgroundSize: "48px 48px",
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 80% 60% at 50% 100%, rgba(22,196,127,0.04) 0%, transparent 70%), radial-gradient(ellipse 50% 40% at 0% 50%, rgba(22,196,127,0.02) 0%, transparent 60%)",
            }}
          />
          <div
            className="absolute left-1/2 top-0 h-px w-1/3 -translate-x-1/2"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(22,196,127,0.3), transparent)",
            }}
          />
          <div
            className="absolute left-[10%] top-[20%] h-[400px] w-[400px] rounded-full"
            style={{
              background:
                "radial-gradient(circle, rgba(22,196,127,0.04) 0%, transparent 65%)",
              filter: "blur(60px)",
            }}
          />
          <div
            className="absolute bottom-[30%] right-[5%] h-[350px] w-[350px] rounded-full"
            style={{
              background:
                "radial-gradient(circle, rgba(22,196,127,0.03) 0%, transparent 65%)",
              filter: "blur(50px)",
            }}
          />
          <FooterParticles />
          <MouseGlow containerRef={sectionRef} />
        </div>

        <FooterWatermark />

        <div className="relative z-10 w-full px-8 pt-14 pb-6 md:px-12 md:pt-16 md:pb-8 lg:px-16 lg:pt-20 lg:pb-12 xl:px-24">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="w-full"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-10 md:gap-8 lg:gap-10 xl:gap-12">
              <motion.div
                variants={fadeUpItem}
                className="md:col-span-2 lg:col-span-4 xl:col-span-1"
              >
                <Link href="/" className="group mb-5 inline-flex">
                  <div className="relative h-10 w-40 brightness-0 invert md:h-11 md:w-44">
                    <Image
                      src="/assets/logos/namelogo.png"
                      alt="RiverLoom"
                      fill
                      sizes="180px"
                      className="object-contain object-left"
                    />
                  </div>
                </Link>

                <p className="mb-6 max-w-sm text-[17px] md:text-[18px] leading-relaxed text-[#A8B5AE]">
                  {BRAND_INFO.mission}
                </p>

                <div className="mb-6 flex flex-col gap-3">
                  <a
                    href="mailto:contact@riverloom.in"
                    className="group flex items-center gap-2.5"
                  >
                  </a>
                </div>

                <div className="flex items-center gap-3">
                  {SOCIAL_LINKS.map((social, i) => (
                    <SocialIconButton
                      key={social.label}
                      icon={social.icon}
                      href={social.href}
                      label={social.label}
                      index={i}
                    />
                  ))}
                </div>
              </motion.div>

              <FooterColumn
                title={SERVICES_COLUMN.title}
                links={SERVICES_COLUMN.links}
                index={1}
              />

              <FooterColumn
                title={COMPANY_COLUMN.title}
                links={COMPANY_COLUMN.links}
                index={2}
              />

              <FooterColumn
                title={RESOURCES_COLUMN.title}
                links={RESOURCES_COLUMN.links}
                index={3}
              />

              <ContactColumn index={4} />
            </div>

            <motion.div
              variants={fadeUpItem}
              className="mt-14 mb-8 h-px w-full"
              style={{
                background:
                  "linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent)",
              }}
            />

            <motion.div
              variants={fadeUpItem}
              className="flex flex-col items-center justify-between gap-4 md:flex-row"
            >
              <div className="text-[15px] md:text-[16px] text-[rgba(255,255,255,0.25)] text-center md:text-left">
                &copy; {new Date().getFullYear()} RiverLoom. All Rights Reserved.
              </div>

              <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-1">
                {BOTTOM_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="relative text-[15px] md:text-[16px] font-medium text-[rgba(255,255,255,0.35)] hover:text-[#16C47F] transition-colors duration-300 group"
                  >
                    {link.label}
                    <motion.span
                      className="absolute -bottom-px left-0 h-px rounded-full bg-[#16C47F]"
                      initial={{ width: "0%", opacity: 0 }}
                      whileHover={{ width: "100%", opacity: 0.5 }}
                      transition={{ duration: 0.3, ease: [0.19, 1, 0.22, 1] }}
                    />
                  </Link>
                ))}
              </div>

              <motion.button
                onClick={() =>
                  window.scrollTo({ top: 0, behavior: "smooth" })
                }
                className="group flex items-center gap-2 text-[15px] md:text-[16px] font-medium text-[rgba(255,255,255,0.35)] hover:text-[#16C47F] transition-colors duration-300"
                whileHover={{ color: "#16C47F" }}
                transition={{ duration: 0.3 }}
              >
                <span>Back To Top</span>
                <motion.span
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.03)]"
                  whileHover={{
                    rotate: 360,
                    borderColor: "rgba(22,196,127,0.3)",
                    backgroundColor: "rgba(22,196,127,0.08)",
                  }}
                  transition={{ duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
                >
                  <span className="inline-flex">
                    <ArrowUp className="h-4 w-4 text-[#16C47F] transition-transform duration-300 group-hover:-translate-y-[1px]" />
                  </span>
                </motion.span>
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </footer>

      <BackToTopButton />
    </>
  );
}
