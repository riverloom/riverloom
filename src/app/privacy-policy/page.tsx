import { Metadata } from "next";
import { PRIVACY_SECTIONS } from "@/data/legal";
import LegalPageShell from "@/components/legal/LegalPageShell";
import { buildMetadata } from "@/lib/metadata";
import { pageMeta } from "@/lib/site-config";

export const metadata: Metadata = buildMetadata(pageMeta["/privacy-policy"], "/privacy-policy");

export default function PrivacyPolicyPage() {
  return <LegalPageShell pageKey="privacy-policy" sections={PRIVACY_SECTIONS} />;
}
