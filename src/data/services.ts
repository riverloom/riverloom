export interface ServiceVisual {
  type: "ai-dashboard" | "platform-topology" | "saas-platform" | "mobile-app" | "crm-interface" | "marketing-analytics" | "cloud-console" | "website-showcase";
  accent: string;
  accentLight: string;
  bgGradient: string;
  glowColor: string;
}

export interface PremiumService {
  id: string;
  index: number;
  title: string;
  shortTitle: string;
  tagline: string;
  description: string;
  capabilities: { icon: string; label: string }[];
  accent: string;
  accentLight: string;
  accentBg: string;
  bgGradient: string;
  glowColor: string;
  visual: ServiceVisual;
  ctaPrimary: string;
  ctaPrimaryHref: string;
  ctaSecondary: string;
  ctaSecondaryHref: string;
  /** Unique layout variant per service */
  layoutVariant: "a" | "b" | "c" | "d" | "e" | "f" | "g" | "h";
}

export const premiumServices: PremiumService[] = [
  {
    id: "ai-solutions",
    index: 1,
    title: "AI Systems & Intelligent Automation",
    shortTitle: "AI Engineering",
    tagline: "Intelligence that transforms every workflow",
    description:
      "We design and deploy production AI systems that automate complex workflows, power intelligent decisions, and unlock growth — from custom LLMs and AI agents to computer vision and predictive analytics.",
    capabilities: [
      { icon: "Bot", label: "AI Agents & Orchestration" },
      { icon: "Brain", label: "LLM Fine-Tuning & RAG" },
      { icon: "Eye", label: "Computer Vision" },
      { icon: "BarChart3", label: "Predictive Analytics" },
    ],
    accent: "#169B62",
    accentLight: "#1FC77E",
    accentBg: "#E8F7EF",
    bgGradient: "from-emerald-500/15 via-teal-500/8 to-transparent",
    glowColor: "rgba(22,155,98,0.12)",
    visual: {
      type: "ai-dashboard",
      accent: "#169B62",
      accentLight: "#1FC77E",
      bgGradient: "from-emerald-500/10 via-teal-500/5 to-transparent",
      glowColor: "rgba(22,155,98,0.15)",
    },
    ctaPrimary: "Explore AI Engineering",
    ctaPrimaryHref: "/services/ai-solutions",
    ctaSecondary: "",
    ctaSecondaryHref: "",
    layoutVariant: "a",
  },
  {
    id: "platform-engineering",
    index: 2,
    title: "Platform Engineering & Internal Tools",
    shortTitle: "Platform Engineering",
    tagline: "Ship faster with foundations that last",
    description:
      "We build internal developer platforms, enterprise tooling, and API infrastructure that eliminate bottlenecks and give your engineering team superpowers — from zero-downtime deployments to self-service infrastructure.",
    capabilities: [
      { icon: "Container", label: "Internal Developer Platforms" },
      { icon: "GitBranch", label: "CI/CD & Automation" },
      { icon: "Shield", label: "Enterprise Security & SSO" },
      { icon: "Activity", label: "Observability & Monitoring" },
    ],
    accent: "#2563EB",
    accentLight: "#3B82F6",
    accentBg: "#E8EFFC",
    bgGradient: "from-blue-500/15 via-indigo-500/8 to-transparent",
    glowColor: "rgba(37,99,235,0.12)",
    visual: {
      type: "platform-topology",
      accent: "#2563EB",
      accentLight: "#3B82F6",
      bgGradient: "from-blue-500/10 via-indigo-500/5 to-transparent",
      glowColor: "rgba(37,99,235,0.15)",
    },
    ctaPrimary: "Explore Platform Engineering",
    ctaPrimaryHref: "/services/platform-engineering",
    ctaSecondary: "Schedule Consultation",
    ctaSecondaryHref: "/contact",
    layoutVariant: "b",
  },
  {
    id: "custom-software",
    index: 3,
    title: "Digital Products & Custom Software",
    shortTitle: "Custom Software",
    tagline: "Built for your vision, engineered to scale",
    description:
      "We design and build custom digital products — from enterprise platforms to internal tools — using modern architecture that's maintainable, testable, and ready to scale from day one.",
    capabilities: [
      { icon: "Monitor", label: "Enterprise Applications" },
      { icon: "Blocks", label: "Microservices Architecture" },
      { icon: "Users", label: "Multi-Tenant SaaS" },
      { icon: "Lock", label: "Security-First Design" },
    ],
    accent: "#7C3AED",
    accentLight: "#8B5CF6",
    accentBg: "#F0EAFE",
    bgGradient: "from-purple-500/15 via-violet-500/8 to-transparent",
    glowColor: "rgba(124,58,237,0.12)",
    visual: {
      type: "saas-platform",
      accent: "#7C3AED",
      accentLight: "#8B5CF6",
      bgGradient: "from-purple-500/10 via-violet-500/5 to-transparent",
      glowColor: "rgba(124,58,237,0.15)",
    },
    ctaPrimary: "Explore Custom Software",
    ctaPrimaryHref: "/services/custom-software",
    ctaSecondary: "",
    ctaSecondaryHref: "",
    layoutVariant: "c",
  },
  {
    id: "mobile-development",
    index: 4,
    title: "Mobile Application Development",
    shortTitle: "Mobile Development",
    tagline: "Native feel, cross-platform reach",
    description:
      "We craft high-performance mobile experiences for iOS and Android that users love. Whether cross-platform or native, every app is built with performance, delight, and scalability in mind.",
    capabilities: [
      { icon: "Smartphone", label: "Cross-Platform (Flutter / RN)" },
      { icon: "Apple", label: "Native iOS (Swift)" },
      { icon: "Square", label: "Native Android (Kotlin)" },
      { icon: "Wifi", label: "Offline-First Architecture" },
    ],
    accent: "#F59E0B",
    accentLight: "#FBBF24",
    accentBg: "#FEF7E6",
    bgGradient: "from-amber-500/15 via-yellow-500/8 to-transparent",
    glowColor: "rgba(245,158,11,0.12)",
    visual: {
      type: "mobile-app",
      accent: "#F59E0B",
      accentLight: "#FBBF24",
      bgGradient: "from-amber-500/10 via-yellow-500/5 to-transparent",
      glowColor: "rgba(245,158,11,0.15)",
    },
    ctaPrimary: "Explore Mobile Development",
    ctaPrimaryHref: "/services/mobile-development",
    ctaSecondary: "Schedule Consultation",
    ctaSecondaryHref: "/contact",
    layoutVariant: "d",
  },
  {
    id: "saas-crm-erp",
    index: 5,
    title: "SaaS, CRM & ERP Development",
    shortTitle: "SaaS Platforms",
    tagline: "Launch faster. Scale further.",
    description:
      "Launch scalable SaaS products and powerful CRM/ERP platforms with multi-tenant architecture, subscription management, and enterprise-grade security — designed to grow with your business.",
    capabilities: [
      { icon: "Cloud", label: "Multi-Tenant SaaS" },
      { icon: "CreditCard", label: "Subscription Billing" },
      { icon: "LayoutDashboard", label: "Admin Dashboards" },
      { icon: "RefreshCw", label: "Enterprise Integrations" },
    ],
    accent: "#06B6D4",
    accentLight: "#22D3EE",
    accentBg: "#E6F9FE",
    bgGradient: "from-cyan-500/15 via-teal-500/8 to-transparent",
    glowColor: "rgba(6,182,212,0.12)",
    visual: {
      type: "crm-interface",
      accent: "#06B6D4",
      accentLight: "#22D3EE",
      bgGradient: "from-cyan-500/10 via-teal-500/5 to-transparent",
      glowColor: "rgba(6,182,212,0.15)",
    },
    ctaPrimary: "Explore SaaS Development",
    ctaPrimaryHref: "/contact",
    ctaSecondary: "",
    ctaSecondaryHref: "",
    layoutVariant: "e",
  },
  {
    id: "digital-marketing",
    index: 6,
    title: "Digital Marketing & Ad Campaign Management",
    shortTitle: "Digital Growth",
    tagline: "Data-driven campaigns that convert",
    description:
      "We create, manage, and optimize high-converting ad campaigns across Meta, Google, and beyond — blending creative strategy with performance analytics to maximize ROAS and customer acquisition.",
    capabilities: [
      { icon: "Target", label: "Google & Meta Ads" },
      { icon: "TrendingUp", label: "Performance Marketing" },
      { icon: "PieChart", label: "ROI Attribution" },
      { icon: "Megaphone", label: "Lead Generation Funnels" },
    ],
    accent: "#E11D48",
    accentLight: "#FB7185",
    accentBg: "#FEE8EC",
    bgGradient: "from-rose-500/15 via-red-500/8 to-transparent",
    glowColor: "rgba(225,29,72,0.12)",
    visual: {
      type: "marketing-analytics",
      accent: "#E11D48",
      accentLight: "#FB7185",
      bgGradient: "from-rose-500/10 via-red-500/5 to-transparent",
      glowColor: "rgba(225,29,72,0.15)",
    },
    ctaPrimary: "Launch Your Growth Campaign",
    ctaPrimaryHref: "/contact",
    ctaSecondary: "",
    ctaSecondaryHref: "",
    layoutVariant: "f",
  },
  {
    id: "cloud-devops",
    index: 7,
    title: "Cloud, DevOps & API Integration",
    shortTitle: "Cloud & DevOps",
    tagline: "Invisible infrastructure, unlimited reliability",
    description:
      "We design cloud architectures, automate deployments, and connect your systems with robust API integrations — making your infrastructure invisible, secure, and cost-optimized.",
    capabilities: [
      { icon: "Cloud", label: "Cloud Architecture (AWS/Azure/GCP)" },
      { icon: "Container", label: "Kubernetes & Docker" },
      { icon: "Zap", label: "CI/CD Automation" },
      { icon: "Shield", label: "Cloud Security & Compliance" },
    ],
    accent: "#0D9488",
    accentLight: "#14B8A6",
    accentBg: "#E6F8F6",
    bgGradient: "from-teal-500/15 via-emerald-500/8 to-transparent",
    glowColor: "rgba(13,146,136,0.12)",
    visual: {
      type: "cloud-console",
      accent: "#0D9488",
      accentLight: "#14B8A6",
      bgGradient: "from-teal-500/10 via-emerald-500/5 to-transparent",
      glowColor: "rgba(13,146,136,0.15)",
    },
    ctaPrimary: "Explore Cloud & DevOps",
    ctaPrimaryHref: "/services/cloud-devops",
    ctaSecondary: "Schedule Consultation",
    ctaSecondaryHref: "/contact",
    layoutVariant: "g",
  },
  {
    id: "web-development",
    index: 8,
    title: "Website & Web Application Development",
    shortTitle: "Web Development",
    tagline: "Modern web. Exceptional experience.",
    description:
      "We build high-performance websites and web applications that convert — from marketing sites to complex web apps — with modern architecture, premium design, and obsessive attention to performance.",
    capabilities: [
      { icon: "Globe", label: "Responsive Websites" },
      { icon: "Zap", label: "95+ Lighthouse Performance" },
      { icon: "Search", label: "SEO & Core Web Vitals" },
      { icon: "Palette", label: "Premium Animations & UX" },
    ],
    accent: "#0EA5E9",
    accentLight: "#38BDF8",
    accentBg: "#E6F4FE",
    bgGradient: "from-sky-500/15 via-blue-500/8 to-transparent",
    glowColor: "rgba(14,165,233,0.12)",
    visual: {
      type: "website-showcase",
      accent: "#0EA5E9",
      accentLight: "#38BDF8",
      bgGradient: "from-sky-500/10 via-blue-500/5 to-transparent",
      glowColor: "rgba(14,165,233,0.15)",
    },
    ctaPrimary: "Explore Web Development",
    ctaPrimaryHref: "/services/web-development",
    ctaSecondary: "",
    ctaSecondaryHref: "",
    layoutVariant: "h",
  },
];
