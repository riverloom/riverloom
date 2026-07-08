import { Metadata } from "next";
import { notFound } from "next/navigation";
import { processPhases } from "@/data/processPhases";
import PhaseDetailClient from "@/components/sections/process/PhaseDetailClient";

interface Props {
  params: Promise<{ phase: string }>;
}

export async function generateStaticParams() {
  return processPhases.map((phase) => ({
    phase: phase.id,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const phase = processPhases.find((p) => p.id === resolvedParams.phase);

  if (!phase) {
    return { title: "Phase Not Found — RiverLoom" };
  }

  return {
    title: `${phase.title} Phase — RiverLoom Development Process`,
    description: phase.description,
  };
}

export default async function PhasePage({ params }: Props) {
  const resolvedParams = await params;
  const phaseExists = processPhases.some((p) => p.id === resolvedParams.phase);

  if (!phaseExists) {
    notFound();
  }

  return <PhaseDetailClient phaseId={resolvedParams.phase} />;
}
