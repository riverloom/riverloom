import { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: [
          "/",
          "/services",
          "/work",
          "/about",
          "/contact",
          "/process",
          "/privacy-policy",
          "/terms-and-conditions",
          "/refund-policy",
          "/cancellation-policy",
          "/careers",
        ],
        disallow: ["/api/", "/_next/", "/admin", "/dashboard", "/temp", "/draft"],
      },
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
    host: siteConfig.url,
  };
}
