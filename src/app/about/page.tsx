import { Metadata } from "next";
import AboutPageClient from "./AboutPageClient";
import { buildMetadata } from "@/lib/metadata";
import { pageMeta } from "@/lib/site-config";

export const metadata: Metadata = buildMetadata(pageMeta["/about"], "/about");

export default function AboutPage() {
  return <AboutPageClient />;
}
