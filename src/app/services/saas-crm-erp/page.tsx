import { Metadata } from "next";
import { serviceContents } from "@/data/service-content";
import ServicePageClient from "@/components/ui/ServicePageClient";
import { breadcrumbSchema, serviceSchema, faqSchema } from "@/lib/schema";

const content = serviceContents["custom-software"];

export const metadata: Metadata = {
  title: "SaaS, CRM & ERP Platform Development — RiverLoom",
  description: "Launch scalable SaaS products and powerful CRM/ERP platforms with multi-tenant architecture, subscription management, and enterprise-grade security — designed to grow with your business.",
  openGraph: { title: "SaaS, CRM & ERP Development — RiverLoom", description: "Build scalable SaaS platforms with multi-tenant architecture and enterprise security.", type: "website" as const },
  twitter: { card: "summary_large_image", title: "SaaS, CRM & ERP Development — RiverLoom", description: "Build scalable SaaS platforms with multi-tenant architecture and enterprise security." },
};

export default function SaasCrmErpPage() {
  const breadcrumbs = [
    { name: "Home", item: "/" },
    { name: "Services", item: "/services" },
    { name: "SaaS, CRM & ERP", item: "/services/saas-crm-erp" },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ ...breadcrumbSchema(breadcrumbs), "@context": "https://schema.org" }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ ...serviceSchema(content.title, content.description, "/services/saas-crm-erp"), "@context": "https://schema.org" }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ ...faqSchema(content.faqs), "@context": "https://schema.org" }) }} />
      <ServicePageClient content={content} />
    </>
  );
}
