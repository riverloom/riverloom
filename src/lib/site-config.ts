/**
 * Site-wide configuration constants.
 * Everything SEO-related that needs to stay DRY.
 */
export const siteConfig = {
  /** Primary domain — update when going live */
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://riverloom.in",
  name: "RiverLoom",
  shortName: "RiverLoom",
  tagline: "Premium Software Engineering Studio",
  description:
    "An elite software engineering studio. We architect, design, and engineer world-class AI systems, platforms, and digital products for ambitious companies worldwide.",
  keywords: [
    "software engineering",
    "AI development",
    "premium engineering studio",
    "platform engineering",
    "digital products",
    "mobile development",
    "SaaS development",
    "custom software",
    "web development",
    "cloud DevOps",
    "India software company",
  ],

  /* ─── Contact ─── */
  email: process.env.NEXT_PUBLIC_EMAIL || "contact@riverloom.in",
  phone: process.env.NEXT_PUBLIC_PHONE || "+91 7007329693",
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP || "+91 7007329693",
  address:
    process.env.NEXT_PUBLIC_ADDRESS ||
    "D-314, 2F Lajpat Nagar, Sahibabad, Ghaziabad, Uttar Pradesh 201007, India",

  /* ─── Social ─── */
  social: {
    linkedin:
      process.env.NEXT_PUBLIC_LINKEDIN ||
      "https://linkedin.com/company/riverloom",
    twitter:
      process.env.NEXT_PUBLIC_TWITTER || "https://x.com/riverloom",
  },
  twitterHandle: "@riverloom",
  creator: "RiverLoom",
  publisher: "RiverLoom",
  applicationName: "RiverLoom",

  /* ─── Locale ─── */
  locale: "en_IN",
  defaultLanguage: "en",
  themeColor: "#F8F6F1",
  backgroundColor: "#F8F6F1",

  /* ─── Logo — update paths when assets are ready ─── */
  logo: "/assets/logos/logo.png",
  logoSquare: "/assets/logos/namelogo.png",
  socialPreview: "/assets/images/og-image.png",

  /* ─── Organization ─── */
  foundingYear: 2021,
  sameAs: [
    process.env.NEXT_PUBLIC_LINKEDIN ||
      "https://linkedin.com/company/riverloom",
    process.env.NEXT_PUBLIC_TWITTER || "https://x.com/riverloom",
  ].filter(Boolean),

  /* ─── Verification — set via environment variables ─── */
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION || "",
    bing: process.env.NEXT_PUBLIC_BING_VERIFICATION || "",
    yandex: process.env.NEXT_PUBLIC_YANDEX_VERIFICATION || "",
  },
} as const;

export type PageRoute =
  | "/"
  | "/services"
  | "/work"
  | "/about"
  | "/contact"
  | "/process"
  | "/privacy-policy"
  | "/terms-and-conditions"
  | "/refund-policy"
  | "/cancellation-policy"
  | "/careers";

/** Static route metadata (non-dynamic pages). Dynamic pages extend this at render time. */
export interface PageMeta {
  title: string;
  description: string;
  ogTitle?: string;
  ogDescription?: string;
  keywords?: readonly string[];
  /** category for OG type article vs website */
  ogType?: "website" | "article";
  /** robots override */
  robots?: string;
}

export const pageMeta: Record<PageRoute, PageMeta> = {
  "/": {
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
    keywords: siteConfig.keywords,
    ogType: "website",
  },
  "/services": {
    title: "Services — RiverLoom",
    description:
      "From AI development and platform engineering to mobile apps and cloud infrastructure — we deliver end-to-end premium software engineering services.",
    keywords: [
      "software engineering services",
      "AI development",
      "platform engineering",
      "mobile app development",
      "cloud DevOps",
      "web development",
      "SaaS development",
      "custom software development",
    ],
    ogType: "website",
  },
  "/work": {
    title: "Our Work — RiverLoom Portfolio",
    description:
      "Explore our portfolio of exceptional digital products — from enterprise platforms and AI systems to mobile apps and games. See what we've built.",
    keywords: [
      "software portfolio",
      "digital products",
      "mobile apps",
      "AI platforms",
      "enterprise software",
      "game development",
      "client work",
    ],
    ogType: "website",
  },
  "/about": {
    title: "About — RiverLoom",
    description:
      "We are a premium software engineering studio crafting exceptional digital products for ambitious companies worldwide. Meet the team behind the code.",
    keywords: [
      "about RiverLoom",
      "software engineering studio",
      "premium software company",
      "India software agency",
    ],
    ogType: "website",
  },
  "/contact": {
    title: "Contact — RiverLoom",
    description:
      "Start your project with RiverLoom. Let's build something extraordinary together. Get in touch for a free consultation.",
    keywords: [
      "contact RiverLoom",
      "start software project",
      "hire software engineers",
      "software consultation",
    ],
    ogType: "website",
  },
  "/process": {
    title: "Our Process — RiverLoom",
    description:
      "Our proven methodology for delivering exceptional digital products — from discovery and strategy to development, launch, and growth.",
    keywords: [
      "software development process",
      "agile methodology",
      "product development",
      "engineering process",
    ],
    ogType: "website",
  },
  "/privacy-policy": {
    title: "Privacy Policy — RiverLoom",
    description:
      "Learn how RiverLoom collects, uses, and protects your personal information. Our commitment to your privacy and data protection.",
    robots: "index, follow",
    ogType: "website",
  },
  "/terms-and-conditions": {
    title: "Terms & Conditions — RiverLoom",
    description:
      "Review the terms and conditions governing your use of RiverLoom's software engineering, AI solutions, and consulting services.",
    robots: "index, follow",
    ogType: "website",
  },
  "/refund-policy": {
    title: "Refund Policy — RiverLoom",
    description:
      "Review RiverLoom's refund policy for software development, consulting, AI solutions, design, and SaaS services. Fair and transparent refund terms.",
    robots: "index, follow",
    ogType: "website",
  },
  "/cancellation-policy": {
    title: "Cancellation Policy — RiverLoom",
    description:
      "Review RiverLoom's cancellation policy for projects, subscriptions, and services. Clear terms for client and RiverLoom-initiated cancellations.",
    robots: "index, follow",
    ogType: "website",
  },
  "/careers": {
    title: "Careers — RiverLoom",
    description:
      "Join RiverLoom and help us engineer the future of software. Explore open positions and build your career with a premium engineering studio.",
    keywords: [
      "RiverLoom careers",
      "software engineering jobs",
      "developer jobs India",
      "tech careers",
    ],
    robots: "index, follow",
    ogType: "website",
  },
};
