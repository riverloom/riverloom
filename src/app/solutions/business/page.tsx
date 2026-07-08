import { Metadata } from "next";
import { getSolution } from "@/data/solutions";
import SolutionPageClient from "@/components/solutions/SolutionPageClient";
import { breadcrumbSchema, serviceSchema, faqSchema } from "@/lib/schema";

const solution = getSolution("business")!;

export const metadata: Metadata = {
  title: "Business-Driven Innovation | RiverLoom",
  description: "Technology decisions tied to revenue, retention, and market share.",
  openGraph: { title: "Business-Driven Innovation | RiverLoom", description: solution.heroDescription, type: "website" },
  twitter: { card: "summary_large_image", title: "Business-Driven Innovation | RiverLoom", description: solution.heroDescription },
};

export default function Page() {
  const breadcrumbs = [
    { name: "Home", item: "/" },
    { name: "Solutions", item: "/solutions" },
    { name: "Business-Driven Innovation", item: "/solutions/business" },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ ...breadcrumbSchema(breadcrumbs), "@context": "https://schema.org" }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ ...faqSchema(solution.faqs), "@context": "https://schema.org" }) }} />
      <SolutionPageClient solution={solution} />
    </>
  );
}
