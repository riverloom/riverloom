import { Metadata } from "next";
import { serviceContents } from "@/data/service-content";
import ServicePageClient from "@/components/ui/ServicePageClient";
import { breadcrumbSchema, serviceSchema, faqSchema } from "@/lib/schema";

const content = serviceContents["digital-marketing"];

export const metadata: Metadata = {
  title: "Digital Marketing & Ad Campaign Management — RiverLoom",
  description: "Create, manage, and optimize high-converting ad campaigns across Meta, Google, and beyond — blending creative strategy with performance analytics to maximize ROAS.",
  openGraph: { title: "Digital Marketing Services — RiverLoom", description: "Data-driven ad campaigns that maximize ROAS.", type: "website" as const },
  twitter: { card: "summary_large_image", title: "Digital Marketing Services — RiverLoom", description: "Data-driven ad campaigns that maximize ROAS." },
};

export default function DigitalMarketingPage() {
  const breadcrumbs = [
    { name: "Home", item: "/" },
    { name: "Services", item: "/services" },
    { name: "Digital Marketing", item: "/services/digital-marketing" },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ ...breadcrumbSchema(breadcrumbs), "@context": "https://schema.org" }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ ...serviceSchema(content.title, content.description, "/services/digital-marketing"), "@context": "https://schema.org" }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ ...faqSchema(content.faqs), "@context": "https://schema.org" }) }} />
      <ServicePageClient content={content} />
    </>
  );
}
