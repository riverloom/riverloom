import { Metadata } from "next";
import { REFUND_SECTIONS } from "@/data/legal";
import LegalPageShell from "@/components/legal/LegalPageShell";
import { buildMetadata } from "@/lib/metadata";
import { pageMeta } from "@/lib/site-config";

export const metadata: Metadata = buildMetadata(pageMeta["/refund-policy"], "/refund-policy");

export default function RefundPolicyPage() {
  return <LegalPageShell pageKey="refund-policy" sections={REFUND_SECTIONS} />;
}
