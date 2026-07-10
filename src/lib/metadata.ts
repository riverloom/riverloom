import { Metadata } from "next";
import { siteConfig, type PageMeta } from "./site-config";

/** Resolve a path (possibly with trailing slash normalization) to canonical URL */
export function canonicalUrl(path: string): string {
  const base = siteConfig.url.replace(/\/+$/, "");
  const clean = path.replace(/\/+$/, "") || "";
  return `${base}${clean}`;
}

/** Default OG image — must be at least 1200×630 */
const defaultOgImage = {
  url: canonicalUrl(siteConfig.socialPreview),
  width: 1200,
  height: 630,
  alt: siteConfig.name,
  type: "image/png" as const,
};

/**
 * Build a complete Next.js Metadata object for a static route.
 * Dynamic pages (service detail, solution, work detail) call this then override fields.
 */
export function buildMetadata(pageMeta: PageMeta, path: string): Metadata {
  const url = canonicalUrl(path);
  const title = pageMeta.ogTitle || pageMeta.title;
  const description = pageMeta.ogDescription || pageMeta.description;

  return {
    /* ─── Core ─── */
    title,
    description,
    keywords: (pageMeta.keywords ?? siteConfig.keywords) as string[],
    applicationName: siteConfig.applicationName,
    authors: [{ name: siteConfig.creator }],
    creator: siteConfig.creator,
    publisher: siteConfig.publisher,
    category: "Technology",

    /* ─── Canonical ─── */
    metadataBase: new URL(siteConfig.url),
    alternates: {
      canonical: url,
      languages: {
        [siteConfig.defaultLanguage]: url,
      },
    },

    /* ─── Robots ─── */
    robots: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      ...(pageMeta.robots
        ? {
            index: pageMeta.robots.includes("index"),
            follow: pageMeta.robots.includes("follow"),
          }
        : {}),
    },

    /* ─── Open Graph ─── */
    openGraph: {
      title,
      description,
      type: pageMeta.ogType || "website",
      url,
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      images: [defaultOgImage],
    },

    /* ─── Twitter Card ─── */
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [defaultOgImage.url],
      site: siteConfig.twitterHandle,
      creator: siteConfig.twitterHandle,
    },

    /* ─── Icons ─── */
    icons: {
      icon: [
        { url: "/favicon.ico", sizes: "48x48" },
        { url: "/icon0.svg", type: "image/svg+xml" },
        { url: "/icon1.png", sizes: "32x32", type: "image/png" },
      ],
      apple: [
        { url: "/apple-icon.png", sizes: "180x180", type: "image/png" },
      ],
    },

    /* ─── Manifest ─── */
    manifest: "/manifest.webmanifest",

    /* ─── Verification ─── */
    verification: {
      google: siteConfig.verification.google,
      yandex: siteConfig.verification.yandex,
      other: {
        "msvalidate.01": siteConfig.verification.bing,
      },
    },

    /* ─── Referrer ─── */
    referrer: "strict-origin-when-cross-origin",

    /* ─── Other ─── */
    formatDetection: {
      telephone: false,
      email: false,
      address: false,
    },
  };
}
