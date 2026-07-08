"use client";

import type { PremiumService } from "@/data/services";
import {
  AIDashboard,
  PlatformTopology,
  SaaSPlatform,
  MobileApp,
  CRMInterface,
  MarketingAnalytics,
  CloudConsole,
  WebsiteShowcase,
} from "./visuals";

export function ServiceVisualRouter({
  visual,
  accent,
  accentLight,
}: {
  visual: PremiumService["visual"];
  accent: string;
  accentLight: string;
}) {
  switch (visual.type) {
    case "ai-dashboard":
      return <AIDashboard accent={accent} accentLight={accentLight} />;
    case "platform-topology":
      return <PlatformTopology accent={accent} accentLight={accentLight} />;
    case "saas-platform":
      return <SaaSPlatform accent={accent} accentLight={accentLight} />;
    case "mobile-app":
      return <MobileApp accent={accent} accentLight={accentLight} />;
    case "crm-interface":
      return <CRMInterface accent={accent} accentLight={accentLight} />;
    case "marketing-analytics":
      return <MarketingAnalytics accent={accent} accentLight={accentLight} />;
    case "cloud-console":
      return <CloudConsole accent={accent} accentLight={accentLight} />;
    case "website-showcase":
      return <WebsiteShowcase accent={accent} accentLight={accentLight} />;
    default:
      return <AIDashboard accent={accent} accentLight={accentLight} />;
  }
}
