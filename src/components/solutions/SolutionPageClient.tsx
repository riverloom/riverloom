"use client";

import { SolutionData } from "@/data/solutions";
import SolutionPageLayout from "./SolutionPageLayout";

export default function SolutionPageClient({ solution }: { solution: SolutionData }) {
  return <SolutionPageLayout solution={solution} />;
}
