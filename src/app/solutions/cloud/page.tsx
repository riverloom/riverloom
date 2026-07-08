import { Metadata } from "next";
import { getSolution } from "@/data/solutions";
import SolutionPageClient from "@/components/solutions/SolutionPageClient";
import { breadcrumbSchema, faqSchema } from "@/lib/schema";

const solution = getSolution("cloud")!;

export const metadata: Metadata = {
  title: "Scalable Cloud Architecture | RiverLoom",
  description: "Multi-region, auto-scaling, fault-tolerant infrastructure engineered for growth.",
  openGraph: { title: "Scalable Cloud Architecture | RiverLoom", description: solution.heroDescription, type: "website" },
  twitter: { card: "summary_large_image", title: "Scalable Cloud Architecture | RiverLoom", description: solution.heroDescription },
};

export default function Page() {
  const breadcrumbs = [
    { name: "Home", item: "/" },
    { name: "Solutions", item: "/solutions" },
    { name: "Scalable Cloud Architecture", item: "/solutions/cloud" },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ ...breadcrumbSchema(breadcrumbs), "@context": "https://schema.org" }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ ...faqSchema(solution.faqs), "@context": "https://schema.org" }) }} />
      <SolutionPageClient solution={solution} />
    </>
  );
}
