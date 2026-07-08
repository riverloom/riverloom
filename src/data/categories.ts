export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  accent: string;
  icon: string;
  productCount: number;
}

export const categories: Category[] = [
  {
    id: "enterprise",
    name: "Enterprise",
    slug: "enterprise",
    description: "Scalable enterprise platforms for business operations",
    accent: "#A6862C",
    icon: "🏢",
    productCount: 3,
  },
  {
    id: "ai-security",
    name: "AI & Security",
    slug: "ai-security",
    description: "AI-powered security and intelligence platforms",
    accent: "#E14B3D",
    icon: "🛡️",
    productCount: 1,
  },
  {
    id: "education",
    name: "Education",
    slug: "education",
    description: "Interactive learning and educational platforms",
    accent: "#7C5CE0",
    icon: "📚",
    productCount: 2,
  },
  {
    id: "games",
    name: "Games",
    slug: "games",
    description: "Casual and party games for everyone",
    accent: "#F59E0B",
    icon: "🎮",
    productCount: 2,
  },
  {
    id: "creative",
    name: "Creative",
    slug: "creative",
    description: "Creative platforms for expression and art",
    accent: "#EC4899",
    icon: "🎨",
    productCount: 1,
  },
  {
    id: "ai",
    name: "AI Products",
    slug: "ai",
    description: "AI-powered applications and tools",
    accent: "#169B62",
    icon: "🤖",
    productCount: 3,
  },
  {
    id: "relationship",
    name: "Relationship Apps",
    slug: "relationship",
    description: "Social connection and relationship apps",
    accent: "#E11D48",
    icon: "💕",
    productCount: 5,
  },
  {
    id: "social",
    name: "Social Apps",
    slug: "social",
    description: "Social interaction and messaging platforms",
    accent: "#3B82F6",
    icon: "💬",
    productCount: 2,
  },
  {
    id: "casual-games",
    name: "Casual Games",
    slug: "casual-games",
    description: "Fun casual games for mobile devices",
    accent: "#8B5CF6",
    icon: "🎯",
    productCount: 10,
  },
];
