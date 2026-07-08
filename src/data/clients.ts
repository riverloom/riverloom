export interface Client {
  id: string;
  name: string;
  industry: string;
  projectId: string | null;
  logoSrc: string;
  colors: { primary: string; secondary: string };
}

export const clients: Client[] = [
  {
    id: "nexus",
    name: "Nexus",
    industry: "AI & Platform Engineering",
    projectId: "nexus-platform",
    logoSrc: "/assets/logos/client-nexus.svg",
    colors: { primary: "#059669", secondary: "#10B981" },
  },
  {
    id: "velora",
    name: "Velora",
    industry: "Digital Marketplace",
    projectId: "velora-market",
    logoSrc: "/assets/logos/client-velora.svg",
    colors: { primary: "#7C3AED", secondary: "#A78BFA" },
  },
  {
    id: "pulse-health",
    name: "Pulse Health",
    industry: "Healthcare & Telemedicine",
    projectId: "pulse-health",
    logoSrc: "/assets/logos/client-pulse.svg",
    colors: { primary: "#0EA5E9", secondary: "#38BDF8" },
  },
  {
    id: "aether",
    name: "Aether",
    industry: "Platform Engineering",
    projectId: "aether-platform",
    logoSrc: "/assets/logos/client-aether.svg",
    colors: { primary: "#F59E0B", secondary: "#FBBF24" },
  },
  {
    id: "lumina",
    name: "Lumina",
    industry: "Mobile Experience",
    projectId: "lumina-app",
    logoSrc: "/assets/logos/client-lumina.svg",
    colors: { primary: "#EC4899", secondary: "#F472B6" },
  },
  {
    id: "northwind",
    name: "Northwind",
    industry: "Enterprise SaaS",
    projectId: null,
    logoSrc: "/assets/logos/client-northwind.svg",
    colors: { primary: "#1E293B", secondary: "#475569" },
  },
  {
    id: "prism",
    name: "Prism Systems",
    industry: "Cybersecurity",
    projectId: null,
    logoSrc: "/assets/logos/client-prism.svg",
    colors: { primary: "#DC2626", secondary: "#EF4444" },
  },
  {
    id: "halcyon",
    name: "Halcyon",
    industry: "Luxury Retail",
    projectId: null,
    logoSrc: "/assets/logos/client-halcyon.svg",
    colors: { primary: "#B8860B", secondary: "#D4A843" },
  },
  {
    id: "meridian",
    name: "Meridian",
    industry: "Fintech & Payments",
    projectId: null,
    logoSrc: "/assets/logos/client-meridian.svg",
    colors: { primary: "#0891B2", secondary: "#22D3EE" },
  },
  {
    id: "outset",
    name: "Outset",
    industry: "Design & Creative",
    projectId: null,
    logoSrc: "/assets/logos/client-outset.svg",
    colors: { primary: "#8B5CF6", secondary: "#A78BFA" },
  },
  {
    id: "fathom",
    name: "Fathom",
    industry: "Data & Analytics",
    projectId: null,
    logoSrc: "/assets/logos/client-fathom.svg",
    colors: { primary: "#0F766E", secondary: "#14B8A6" },
  },
  {
    id: "arcadia",
    name: "Arcadia",
    industry: "Real Estate Tech",
    projectId: null,
    logoSrc: "/assets/logos/client-arcadia.svg",
    colors: { primary: "#D97706", secondary: "#F59E0B" },
  },
];
