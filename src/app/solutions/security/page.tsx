import { Metadata } from "next";
import { getSolution } from "@/data/solutions";
import SolutionPageClient from "@/components/solutions/SolutionPageClient";
import { breadcrumbSchema, faqSchema } from "@/lib/schema";

const solution = getSolution("security")!;

export const metadata: Metadata = {
  title: "Enterprise-Grade Security | RiverLoom",
  description: "Zero-trust architecture, end-to-end encryption, and SOC 2 aligned processes built in from day one.",
  openGraph: { title: "Enterprise-Grade Security | RiverLoom", description: solution.heroDescription, type: "website" },
  twitter: { card: "summary_large_image", title: "Enterprise-Grade Security | RiverLoom", description: solution.heroDescription },
};

export default function Page() {
  const breadcrumbs = [
    { name: "Home", item: "/" },
    { name: "Solutions", item: "/solutions" },
    { name: "Enterprise-Grade Security", item: "/solutions/security" },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ ...breadcrumbSchema(breadcrumbs), "@context": "https://schema.org" }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ ...faqSchema(solution.faqs), "@context": "https://schema.org" }) }} />
      <SolutionPageClient solution={solution} />
    </>
  );
}
