import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import WhatsAppFab from "@/components/ui/WhatsAppFab";
import { GoogleAnalytics, MicrosoftClarity, PageviewTracker } from "@/components/seo/Analytics";
import { buildMetadata } from "@/lib/metadata";
import { defaultViewport } from "@/lib/viewport";
import { siteConfig, pageMeta } from "@/lib/site-config";
import { organizationSchema, websiteSchema, localBusinessSchema, contactPointSchema } from "@/lib/schema";
import "./globals.css";

export const viewport: Viewport = defaultViewport;

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-plus-jakarta",
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = buildMetadata(pageMeta["/"], "/");

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${plusJakartaSans.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* ─── DNS Prefetch / Preconnect ─── */}
        <link rel="dns-prefetch" href="//www.googletagmanager.com" />
        <link rel="dns-prefetch" href="//www.google-analytics.com" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://www.google-analytics.com" />

        {/* ─── Preload key assets ─── */}
        <link rel="preload" href={siteConfig.logo} as="image" />

        {/* ─── Google Search Console verification ─── */}
        {siteConfig.verification.google && (
          <meta
            name="google-site-verification"
            content={siteConfig.verification.google}
          />
        )}

        {/* ─── JSON-LD Structured Data (site-wide) ─── */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              ...organizationSchema(),
              "@context": "https://schema.org",
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              ...websiteSchema(),
              "@context": "https://schema.org",
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              ...localBusinessSchema(),
              "@context": "https://schema.org",
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              ...contactPointSchema(),
              "@context": "https://schema.org",
            }),
          }}
        />
      </head>
      <body className="min-h-screen bg-[#F8F6F1] text-[#1C1C1C] antialiased">

        <Navbar />
        <main>{children}</main>
        <Footer />
        <WhatsAppFab />

        {/* ─── Analytics Scripts ─── */}
        <GoogleAnalytics />
        <MicrosoftClarity />
        <PageviewTracker />
      </body>
    </html>
  );
}
