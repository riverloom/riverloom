import { Metadata } from "next";
import ContactPageClient from "./ContactPageClient";
import { buildMetadata } from "@/lib/metadata";
import { pageMeta } from "@/lib/site-config";

export const metadata: Metadata = buildMetadata(pageMeta["/contact"], "/contact");

export default function ContactPage() {
  return <ContactPageClient />;
}
