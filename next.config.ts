import type { NextConfig } from "next";

const csp = `
  default-src 'self';
  script-src 'self' 'unsafe-eval' 'unsafe-inline' https://www.googletagmanager.com https://snap.licdn.com https://static.hotjar.com https://www.clarity.ms https://connect.facebook.net;
  style-src 'self' 'unsafe-inline';
  img-src 'self' data: blob: https:;
  font-src 'self' data:;
  connect-src 'self' https://www.google-analytics.com https://analytics.google.com https://*.hotjar.com https://*.hotjar.io wss://*.hotjar.com https://www.clarity.ms https://*.clarity.ms https://px.ads.linkedin.com https://px.ads.linkedin.com https://www.linkedin.com;
  frame-src 'self' https://www.googletagmanager.com https://www.google.com;
  object-src 'none';
  base-uri 'self';
  form-action 'self';
  frame-ancestors 'self';
`;

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  /* ─── Compression ─── */
  compress: true,

  /* ─── Production Source Maps ─── */
  productionBrowserSourceMaps: false,

  /* ─── Powered By Header ─── */
  poweredByHeader: false,

  /* ─── Redirects ─── */
  async redirects() {
    return [
      // Canonical redirects — trailing slash handling
      {
        source: "/privacy",
        destination: "/privacy-policy",
        permanent: true,
      },
      {
        source: "/terms",
        destination: "/terms-and-conditions",
        permanent: true,
      },
      {
        source: "/refund",
        destination: "/refund-policy",
        permanent: true,
      },
      {
        source: "/cancellation",
        destination: "/cancellation-policy",
        permanent: true,
      },
      // www → non-www (handled at hosting level, fallback here)
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.riverloom.in" }],
        destination: "https://riverloom.in/:path*",
        permanent: true,
      },
    ];
  },

  /* ─── Security Headers ─── */
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value: csp.replace(/\s{2,}/g, " ").trim(),
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: [
              "camera=()",
              "microphone=()",
              "geolocation=()",
              "interest-cohort=()",
              "payment=()",
              "usb=()",
            ].join(", "),
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          {
            key: "X-DNS-Prefetch-Control",
            value: "on",
          },
        ],
      },
      // HTML pages — prevent CDN from serving stale HTML after redeploys
      {
        source: "/:path((?!_next/static|assets|api|favicon\\.ico|manifest\\.webmanifest|robots\\.txt|sitemap\\.xml|apple-icon\\.png|icon0\\.svg|icon1\\.png).*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=0, must-revalidate",
          },
        ],
      },
      {
        source: "/assets/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/favicon.ico",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=86400",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
