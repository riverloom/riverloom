import { Metadata } from "next";
import { getSolution } from "@/data/solutions";
import SolutionPageClient from "@/components/solutions/SolutionPageClient";
import { breadcrumbSchema, faqSchema } from "@/lib/schema";

const solution = getSolution("performance")!;

export const metadata: Metadata = {
  title: "Performance & SEO Excellence | RiverLoom",
  description: "Sub-100ms responses, 95+ Lighthouse scores, and Core Web Vitals that search engines reward.",
  openGraph: { title: "Performance & SEO Excellence | RiverLoom", description: solution.heroDescription, type: "website" },
  twitter: { card: "summary_large_image", title: "Performance & SEO Excellence | RiverLoom", description: solution.heroDescription },
};

export default function Page() {
  const breadcrumbs = [
    { name: "Home", item: "/" },
    { name: "Solutions", item: "/solutions" },
    { name: "Performance & SEO Excellence", item: "/solutions/performance" },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ ...breadcrumbSchema(breadcrumbs), "@context": "https://schema.org" }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ ...faqSchema(solution.faqs), "@context": "https://schema.org" }) }} />
      <SolutionPageClient solution={solution} />
    </>
  );
}
