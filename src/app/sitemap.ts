import { MetadataRoute } from "next";
import { siteConfig, pageMeta } from "@/lib/site-config";
import { products } from "@/data/products";
import { premiumServices } from "@/data/services";
import { allSolutions } from "@/data/solutions";
import { processPhases } from "@/data/processPhases";

type ChangeFreq =
  | "always"
  | "hourly"
  | "daily"
  | "weekly"
  | "monthly"
  | "yearly"
  | "never";

interface SitemapEntry {
  url: string;
  lastModified?: Date | string;
  changeFrequency?: ChangeFreq;
  priority?: number;
}

/** Build a sitemap entry */
function entry(
  path: string,
  priority: number,
  changeFrequency: ChangeFreq = "monthly"
): SitemapEntry {
  return {
    url: `${siteConfig.url}${path}`,
    lastModified: new Date(),
    changeFrequency,
    priority,
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: SitemapEntry[] = [];

  /* ─── Static Pages ─── */
  entries.push(entry("/", 1.0, "weekly"));
  entries.push(entry("/services", 0.9, "weekly"));
  entries.push(entry("/work", 0.9, "weekly"));
  entries.push(entry("/about", 0.8, "monthly"));
  entries.push(entry("/contact", 0.8, "monthly"));
  entries.push(entry("/process", 0.7, "monthly"));

  /* ─── Legal Pages ─── */
  entries.push(entry("/privacy-policy", 0.4, "yearly"));
  entries.push(entry("/terms-and-conditions", 0.4, "yearly"));
  entries.push(entry("/refund-policy", 0.4, "yearly"));
  entries.push(entry("/cancellation-policy", 0.4, "yearly"));

  /* ─── Careers ─── */
  entries.push(entry("/careers", 0.5, "weekly"));

  /* ─── Service Detail Pages ─── */
  for (const service of premiumServices) {
    const href = service.ctaPrimaryHref;
    if (href && href !== "/contact" && href.startsWith("/")) {
      entries.push(entry(href, 0.8, "monthly"));
    }
  }

  /* ─── Solution Pages ─── */
  for (const solution of allSolutions) {
    entries.push(
      entry(`/solutions/${solution.slug}`, 0.7, "monthly")
    );
  }

  /* ─── Process Phase Pages ─── */
  for (const phase of processPhases) {
    entries.push(entry(`/process/${phase.id}`, 0.6, "monthly"));
  }

  /* ─── Project / Product Pages ─── */
  for (const product of products) {
    if (product.slug) {
      entries.push(entry(`/work/${product.slug}`, 0.7, "monthly"));
    }
  }

  /* ─── Future blog / case study placeholder ─── */
  // entries.push(entry("/blog", 0.6, "weekly"));
  // entries.push(entry("/case-studies", 0.7, "weekly"));

  return entries.map((e) => ({
    url: e.url,
    lastModified: e.lastModified,
    changeFrequency: e.changeFrequency,
    priority: e.priority,
  }));
}
