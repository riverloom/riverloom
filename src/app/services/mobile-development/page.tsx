import { Metadata } from "next";
import { serviceContents } from "@/data/service-content";
import ServicePageClient from "@/components/ui/ServicePageClient";
import { breadcrumbSchema, serviceSchema, faqSchema } from "@/lib/schema";

const content = serviceContents["mobile-development"];

export const metadata: Metadata = {
  title: content.metaTitle,
  description: content.metaDesc,
  openGraph: { title: content.metaTitle, description: content.metaDesc, type: "website" },
  twitter: { card: "summary_large_image", title: content.metaTitle, description: content.metaDesc },
};

export default function MobileDevelopmentPage() {
  const breadcrumbs = [
    { name: "Home", item: "/" },
    { name: "Services", item: "/services" },
    { name: "Mobile Development", item: "/services/mobile-development" },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ ...breadcrumbSchema(breadcrumbs), "@context": "https://schema.org" }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ ...serviceSchema(content.title, content.description, "/services/mobile-development"), "@context": "https://schema.org" }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ ...faqSchema(content.faqs), "@context": "https://schema.org" }) }} />
      <ServicePageClient content={content} />
    </>
  );
}
