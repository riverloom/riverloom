/**
 * JSON-LD Structured Data generators.
 * All functions return a plain object — serialize with JSON.stringify in a
 * `<script type="application/ld+json">` tag.
 */
import { siteConfig } from "./site-config";

/* ─── Helpers ─── */

interface BreadcrumbItem {
  name: string;
  item: string;
}

interface LocalBusinessArgs {
  name?: string;
  description?: string;
  image?: string;
  telephone?: string;
  email?: string;
  address?: string;
  areaServed?: string[];
}

/* ─── Organization (SoftwareCompany + LocalBusiness) ─── */

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": ["Organization", "SoftwareCompany", "ProfessionalService"],
    name: siteConfig.name,
    alternateName: siteConfig.shortName,
    description: siteConfig.description,
    url: siteConfig.url,
    logo: `${siteConfig.url}${siteConfig.logo}`,
    image: `${siteConfig.url}${siteConfig.socialPreview}`,
    email: siteConfig.email,
    telephone: siteConfig.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.address,
    },
    founder: {
      "@type": "Person",
      name: siteConfig.founder,
    },
    foundingDate: `${siteConfig.foundingYear}`,
    sameAs: siteConfig.sameAs,
    knowsAbout: [
      "Software Engineering",
      "AI & Machine Learning",
      "Platform Engineering",
      "Mobile Development",
      "Cloud Infrastructure",
      "Web Development",
    ],
    areaServed: [
      "India",
      "United States",
      "United Kingdom",
      "Canada",
      "Australia",
      "United Arab Emirates",
      "Singapore",
    ],
  };
}

/* ─── Local Business ─── */

export function localBusinessSchema(args?: LocalBusinessArgs) {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: args?.name || siteConfig.name,
    description:
      args?.description ||
      "Premium software engineering studio specializing in AI, platform engineering, and digital product development.",
    url: siteConfig.url,
    image: `${siteConfig.url}${siteConfig.socialPreview}`,
    telephone: args?.telephone || siteConfig.phone,
    email: args?.email || siteConfig.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: args?.address || siteConfig.address,
    },
    areaServed: args?.areaServed || [
      { "@type": "City", name: "India" },
      { "@type": "Country", name: "US" },
      { "@type": "Country", name: "UK" },
    ],
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
        ],
        opens: "09:00",
        closes: "18:00",
      },
    ],
    sameAs: siteConfig.sameAs,
  };
}

/* ─── BreadcrumbList ─── */

export function breadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.item.startsWith("http")
        ? item.item
        : `${siteConfig.url}${item.item}`,
    })),
  };
}

/* ─── Website ─── */

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    alternateName: siteConfig.shortName,
    description: siteConfig.description,
    url: siteConfig.url,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${siteConfig.url}/search?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

/* ─── WebPage ─── */

export function webPageSchema(
  name: string,
  description: string,
  url: string,
  breadcrumbs?: BreadcrumbItem[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name,
    description,
    url,
    ...(breadcrumbs
      ? {
          breadcrumb: breadcrumbSchema(breadcrumbs),
        }
      : {}),
  };
}

/* ─── ContactPoint ─── */

export function contactPointSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ContactPoint",
    telephone: siteConfig.phone,
    contactType: "sales",
    email: siteConfig.email,
    areaServed: ["IN", "US", "GB", "CA", "AU"],
    availableLanguage: ["English", "Hindi"],
  };
}

/* ─── Service (for individual service pages) ─── */

export function serviceSchema(
  name: string,
  description: string,
  url: string,
  providerName?: string
) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    url,
    provider: {
      "@type": "Organization",
      name: providerName || siteConfig.name,
    },
    areaServed: ["IN", "US", "GB", "CA", "AU"],
  };
}

/* ─── FAQPage ─── */

export function faqSchema(faqs: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a,
      },
    })),
  };
}

/* ─── Product / SoftwareApplication ─── */

export function softwareAppSchema(
  name: string,
  description: string,
  url: string,
  operatingSystem: string,
  applicationCategory: string
) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name,
    description,
    url,
    operatingSystem,
    applicationCategory,
    author: {
      "@type": "Organization",
      name: siteConfig.name,
    },
  };
}

/* ─── Aggregate multiple schemas into one JSON-LD block ─── */

export function aggregateSchemas(schemas: Record<string, unknown>[]) {
  return schemas.map((s) => ({
    ...s,
    "@context": "https://schema.org",
  }));
}
