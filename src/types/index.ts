export interface NavLink {
  label: string;
  href: string;
}

export interface Service {
  id: string;
  title: string;
  tagline: string;
  description: string;
  visual: string;
  capabilities: string[];
  gradient: string;
  duration: string;
  startingPrice: string;
  techStack: string[];
  businessImpact: string;
  ctaLink: string;
}

export interface Project {
  id: string;
  title: string;
  category: string;
  subtitle?: string;
  description: string;
  heroImage?: string;
  tags: string[];
  logo?: string;
  accentColor?: string;
  liveUrl: string;
  ctaLabel?: string;
}

export interface ProductWithMeta {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  description: string;
  category: string;
  categorySlug: string;
  status: "published" | "coming-soon" | "in-development";
  accent: string;
  logo: string;
  platforms: string[];
  techStack: string[];
  screenshots: string[];
  links: { label: string; url: string }[];
  features: { title: string; description: string }[];
  downloads?: string;
  rating?: string;
  bannerGradient: string;
  bannerPattern?: string;
  featuredBadge?: string;
}

export interface TechNode {
  id: string;
  name: string;
  category: string;
  x: number;
  y: number;
  size: "sm" | "md" | "lg";
  connections: string[];
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
  quote: string;
  videoAvailable: boolean;
}

export interface ProcessStep {
  id: string;
  title: string;
  description: string;
  number: number;
  visual: string;
}

export interface ProcessPhase {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  longDescription: string;
  details: string[];
  technologies: string[];
  deliverables: string[];
  timeline: string;
  icon: string;
  stats: { value: string; label: string }[];
  faqs: { q: string; a: string }[];
}

export interface FooterColumn {
  title: string;
  links: { label: string; href: string }[];
}
