import { ProductWithMeta } from "@/types";

/**
 * Enhanced product metadata: banner gradients, featured badges, and display overrides.
 * Merged with the base product data at render time.
 */
export interface ProductMetaOverlay {
  bannerGradient: string;
  bannerPattern?: "dots" | "grid" | "mesh" | "circles" | "none";
  featuredBadge?: string;
  accentGlow?: string;
}

export const productMetaOverlays: Record<string, ProductMetaOverlay> = {
  "malwarex": {
    bannerGradient: "linear-gradient(135deg, #0A0A0A 0%, #1A0A0A 30%, #2D0A0A 60%, #0A0A0A 100%)",
    bannerPattern: "mesh",
    featuredBadge: "Featured",
    accentGlow: "rgba(225,75,61,0.3)",
  },
  "chandriva-club": {
    bannerGradient: "linear-gradient(135deg, #1A1610 0%, #2D2415 30%, #3D3020 60%, #1A1610 100%)",
    bannerPattern: "grid",
    featuredBadge: "Featured",
    accentGlow: "rgba(166,134,44,0.3)",
  },
  "wordique": {
    bannerGradient: "linear-gradient(135deg, #0D1A10 0%, #1A2D20 30%, #0D2D1A 60%, #0D1A10 100%)",
    bannerPattern: "dots",
    featuredBadge: "Popular",
    accentGlow: "rgba(22,155,98,0.3)",
  },
  "visilearn": {
    bannerGradient: "linear-gradient(135deg, #0D0A1A 0%, #1A102D 30%, #2D1A40 60%, #0D0A1A 100%)",
    bannerPattern: "grid",
    featuredBadge: "Editor's Choice",
    accentGlow: "rgba(124,92,224,0.3)",
  },
  "buildhub": {
    bannerGradient: "linear-gradient(135deg, #1A1410 0%, #2D1E15 30%, #3D2A1A 60%, #1A1410 100%)",
    bannerPattern: "circles",
    accentGlow: "rgba(224,122,46,0.3)",
  },
  "universe": {
    bannerGradient: "linear-gradient(135deg, #0A0D1A 0%, #0F1A2D 30%, #1A2D3D 60%, #0A0D1A 100%)",
    bannerPattern: "grid",
    featuredBadge: "Coming Soon",
    accentGlow: "rgba(46,143,224,0.3)",
  },
  "apoet": {
    bannerGradient: "linear-gradient(135deg, #1A0D1A 0%, #2D152D 30%, #3D1A3D 60%, #1A0D1A 100%)",
    bannerPattern: "dots",
    featuredBadge: "Editor's Choice",
    accentGlow: "rgba(236,72,153,0.3)",
  },
  "word-search": {
    bannerGradient: "linear-gradient(135deg, #0A1A10 0%, #0F2D18 30%, #1A3D22 60%, #0A1A10 100%)",
    bannerPattern: "grid",
    featuredBadge: "100K+ Downloads",
    accentGlow: "rgba(34,197,94,0.3)",
  },
  "ball-sort": {
    bannerGradient: "linear-gradient(135deg, #0A0D1A 0%, #101A2D 30%, #1A2D3D 60%, #0A0D1A 100%)",
    bannerPattern: "circles",
    accentGlow: "rgba(59,130,246,0.3)",
  },
  "mira": {
    bannerGradient: "linear-gradient(135deg, #0A1A15 0%, #0F2D20 30%, #153D2A 60%, #0A1A15 100%)",
    bannerPattern: "mesh",
    accentGlow: "rgba(22,155,98,0.25)",
  },
  "rizzai": {
    bannerGradient: "linear-gradient(135deg, #1A1410 0%, #2D2015 30%, #3D2C1A 60%, #1A1410 100%)",
    bannerPattern: "dots",
    accentGlow: "rgba(245,158,11,0.3)",
  },
  "flipzy": {
    bannerGradient: "linear-gradient(135deg, #100A1A 0%, #1A1030 30%, #2D1A45 60%, #100A1A 100%)",
    bannerPattern: "mesh",
    accentGlow: "rgba(139,92,246,0.3)",
  },
  "dirty-dice": {
    bannerGradient: "linear-gradient(135deg, #1A0A0A 0%, #2D1015 30%, #3D1520 60%, #1A0A0A 100%)",
    bannerPattern: "circles",
    accentGlow: "rgba(225,29,72,0.25)",
  },
  "closerly": {
    bannerGradient: "linear-gradient(135deg, #1A0D15 0%, #2D1522 30%, #3D1A2D 60%, #1A0D15 100%)",
    bannerPattern: "dots",
    accentGlow: "rgba(251,113,133,0.3)",
  },
  "truth-or-dare": {
    bannerGradient: "linear-gradient(135deg, #1A1410 0%, #2D1E15 30%, #3D2818 60%, #1A1410 100%)",
    bannerPattern: "circles",
    accentGlow: "rgba(249,115,22,0.25)",
  },
  "dare-duo": {
    bannerGradient: "linear-gradient(135deg, #1A0D1A 0%, #2D152D 30%, #3D1A3D 60%, #1A0D1A 100%)",
    bannerPattern: "dots",
    accentGlow: "rgba(236,72,153,0.25)",
  },
  "never-have-i-ever": {
    bannerGradient: "linear-gradient(135deg, #100A1A 0%, #1A1030 30%, #251840 60%, #100A1A 100%)",
    bannerPattern: "circles",
    accentGlow: "rgba(168,85,247,0.25)",
  },
  "pickup-lines": {
    bannerGradient: "linear-gradient(135deg, #0A0D1A 0%, #101A2D 30%, #15253D 60%, #0A0D1A 100%)",
    bannerPattern: "dots",
    accentGlow: "rgba(59,130,246,0.25)",
  },
  "love-messages": {
    bannerGradient: "linear-gradient(135deg, #1A0D15 0%, #2D1522 30%, #3D1A2D 60%, #1A0D15 100%)",
    bannerPattern: "dots",
    accentGlow: "rgba(251,113,133,0.25)",
  },
  "party-roulette": {
    bannerGradient: "linear-gradient(135deg, #1A1410 0%, #2D2015 30%, #3D2C1A 60%, #1A1410 100%)",
    bannerPattern: "circles",
    accentGlow: "rgba(245,158,11,0.25)",
  },
  "snake": {
    bannerGradient: "linear-gradient(135deg, #0A1A10 0%, #0F2D18 30%, #153D20 60%, #0A1A10 100%)",
    bannerPattern: "grid",
    accentGlow: "rgba(34,197,94,0.25)",
  },
  "bubble-shooter": {
    bannerGradient: "linear-gradient(135deg, #0A0D1A 0%, #101A2D 30%, #1A253D 60%, #0A0D1A 100%)",
    bannerPattern: "circles",
    accentGlow: "rgba(59,130,246,0.25)",
  },
  "blast-puzzle": {
    bannerGradient: "linear-gradient(135deg, #1A1410 0%, #2D1E15 30%, #3D2818 60%, #1A1410 100%)",
    bannerPattern: "dots",
    accentGlow: "rgba(249,115,22,0.25)",
  },
  "screw-puzzle": {
    bannerGradient: "linear-gradient(135deg, #100A1A 0%, #1A1030 30%, #251840 60%, #100A1A 100%)",
    bannerPattern: "grid",
    accentGlow: "rgba(139,92,246,0.25)",
  },
  "block-puzzle": {
    bannerGradient: "linear-gradient(135deg, #0A101A 0%, #0F1A2D 30%, #15253D 60%, #0A101A 100%)",
    bannerPattern: "grid",
    accentGlow: "rgba(6,182,212,0.25)",
  },
  "hole-market": {
    bannerGradient: "linear-gradient(135deg, #1A0A0A 0%, #2D1015 30%, #3D1520 60%, #1A0A0A 100%)",
    bannerPattern: "circles",
    accentGlow: "rgba(225,29,72,0.25)",
  },
  "survival-island": {
    bannerGradient: "linear-gradient(135deg, #1A1410 0%, #2D1E15 30%, #3D2818 60%, #1A1410 100%)",
    bannerPattern: "dots",
    accentGlow: "rgba(245,158,11,0.25)",
  },
  "squad-shooter": {
    bannerGradient: "linear-gradient(135deg, #0A0A0A 0%, #1A0A0A 30%, #2D0A0A 60%, #0A0A0A 100%)",
    bannerPattern: "mesh",
    accentGlow: "rgba(225,75,61,0.25)",
  },
  "bus-jam": {
    bannerGradient: "linear-gradient(135deg, #0A101A 0%, #0F1A2D 30%, #15253D 60%, #0A101A 100%)",
    bannerPattern: "grid",
    accentGlow: "rgba(14,165,233,0.25)",
  },
};

export const categoryAccentMap: Record<string, string> = {
  "enterprise": "#A6862C",
  "ai": "#7C5CE0",
  "ai-security": "#E14B3D",
  "education": "#2E8FE0",
  "games": "#22C55E",
  "creative": "#EC4899",
  "relationship": "#F97316",
  "social": "#06B6D4",
  "casual-games": "#8B5CF6",
};

export const categoryThemeMap: Record<string, { gradient: string; glassBg: string }> = {
  "enterprise": {
    gradient: "linear-gradient(135deg, rgba(166,134,44,0.15) 0%, rgba(166,134,44,0.05) 100%)",
    glassBg: "rgba(166,134,44,0.08)",
  },
  "ai": {
    gradient: "linear-gradient(135deg, rgba(124,92,224,0.15) 0%, rgba(124,92,224,0.05) 100%)",
    glassBg: "rgba(124,92,224,0.08)",
  },
  "ai-security": {
    gradient: "linear-gradient(135deg, rgba(225,75,61,0.15) 0%, rgba(225,75,61,0.05) 100%)",
    glassBg: "rgba(225,75,61,0.08)",
  },
  "education": {
    gradient: "linear-gradient(135deg, rgba(46,143,224,0.15) 0%, rgba(46,143,224,0.05) 100%)",
    glassBg: "rgba(46,143,224,0.08)",
  },
  "games": {
    gradient: "linear-gradient(135deg, rgba(34,197,94,0.15) 0%, rgba(34,197,94,0.05) 100%)",
    glassBg: "rgba(34,197,94,0.08)",
  },
  "creative": {
    gradient: "linear-gradient(135deg, rgba(236,72,153,0.15) 0%, rgba(236,72,153,0.05) 100%)",
    glassBg: "rgba(236,72,153,0.08)",
  },
  "relationship": {
    gradient: "linear-gradient(135deg, rgba(249,115,22,0.15) 0%, rgba(249,115,22,0.05) 100%)",
    glassBg: "rgba(249,115,22,0.08)",
  },
  "social": {
    gradient: "linear-gradient(135deg, rgba(6,182,212,0.15) 0%, rgba(6,182,212,0.05) 100%)",
    glassBg: "rgba(6,182,212,0.08)",
  },
  "casual-games": {
    gradient: "linear-gradient(135deg, rgba(139,92,246,0.15) 0%, rgba(139,92,246,0.05) 100%)",
    glassBg: "rgba(139,92,246,0.08)",
  },
};
