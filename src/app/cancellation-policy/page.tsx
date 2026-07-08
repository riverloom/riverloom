import { Metadata } from "next";
import { CANCELLATION_SECTIONS } from "@/data/legal";
import LegalPageShell from "@/components/legal/LegalPageShell";
import { buildMetadata } from "@/lib/metadata";
import { pageMeta } from "@/lib/site-config";

export const metadata: Metadata = buildMetadata(pageMeta["/cancellation-policy"], "/cancellation-policy");

export default function CancellationPolicyPage() {
  return <LegalPageShell pageKey="cancellation-policy" sections={CANCELLATION_SECTIONS} />;
}
