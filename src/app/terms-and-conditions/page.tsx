import { Metadata } from "next";
import { TERMS_SECTIONS } from "@/data/legal";
import LegalPageShell from "@/components/legal/LegalPageShell";
import { buildMetadata } from "@/lib/metadata";
import { pageMeta } from "@/lib/site-config";

export const metadata: Metadata = buildMetadata(pageMeta["/terms-and-conditions"], "/terms-and-conditions");

export default function TermsPage() {
  return <LegalPageShell pageKey="terms-and-conditions" sections={TERMS_SECTIONS} />;
}
