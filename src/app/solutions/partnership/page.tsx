import { Metadata } from "next";
import { getSolution } from "@/data/solutions";
import SolutionPageClient from "@/components/solutions/SolutionPageClient";
import { breadcrumbSchema, faqSchema } from "@/lib/schema";

const solution = getSolution("partnership")!;

export const metadata: Metadata = {
  title: "Long-Term Product Partnership | RiverLoom",
  description: "Continuous optimization, shared roadmaps, and a dedicated team that grows with you.",
  openGraph: { title: "Long-Term Product Partnership | RiverLoom", description: solution.heroDescription, type: "website" },
  twitter: { card: "summary_large_image", title: "Long-Term Product Partnership | RiverLoom", description: solution.heroDescription },
};

export default function Page() {
  const breadcrumbs = [
    { name: "Home", item: "/" },
    { name: "Solutions", item: "/solutions" },
    { name: "Long-Term Product Partnership", item: "/solutions/partnership" },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ ...breadcrumbSchema(breadcrumbs), "@context": "https://schema.org" }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ ...faqSchema(solution.faqs), "@context": "https://schema.org" }) }} />
      <SolutionPageClient solution={solution} />
    </>
  );
}
