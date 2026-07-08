import { Metadata } from "next";
import { getSolution } from "@/data/solutions";
import SolutionPageClient from "@/components/solutions/SolutionPageClient";
import { breadcrumbSchema, serviceSchema, faqSchema } from "@/lib/schema";

const solution = getSolution("ai-engineering")!;

export const metadata: Metadata = {
  title: "AI-First Engineering | RiverLoom",
  description: "We embed machine learning, LLMs, and intelligent automation at the core of your product.",
  openGraph: { title: "AI-First Engineering | RiverLoom", description: solution!.heroDescription, type: "website" },
  twitter: { card: "summary_large_image", title: "AI-First Engineering | RiverLoom", description: solution!.heroDescription },
};

export default function Page() {
  const breadcrumbs = [
    { name: "Home", item: "/" },
    { name: "Solutions", item: "/solutions" },
    { name: "AI-First Engineering", item: "/solutions/ai-engineering" },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ ...breadcrumbSchema(breadcrumbs), "@context": "https://schema.org" }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ ...serviceSchema(solution.title, solution.heroDescription, "/solutions/ai-engineering"), "@context": "https://schema.org" }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ ...faqSchema(solution.faqs), "@context": "https://schema.org" }) }} />
      <SolutionPageClient solution={solution} />
    </>
  );
}
