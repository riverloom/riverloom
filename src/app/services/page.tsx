import { Metadata } from "next";
import ServicesPageClient from "./ServicesPageClient";
import { buildMetadata } from "@/lib/metadata";
import { pageMeta } from "@/lib/site-config";

export const metadata: Metadata = buildMetadata(pageMeta["/services"], "/services");

export default function ServicesPage() {
  return <ServicesPageClient />;
}
