import { Metadata } from "next";
import WorkPageClient from "./WorkPageClient";
import { buildMetadata } from "@/lib/metadata";
import { pageMeta } from "@/lib/site-config";

export const metadata: Metadata = buildMetadata(pageMeta["/work"], "/work");

export default function WorkPage() {
  return <WorkPageClient />;
}
