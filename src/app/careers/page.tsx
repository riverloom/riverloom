import { Metadata } from "next";
import { buildMetadata } from "@/lib/metadata";
import { pageMeta } from "@/lib/site-config";

export const metadata: Metadata = buildMetadata(pageMeta["/careers"], "/careers");

export default function CareersPage() {
  return (
    <section className="pt-40 pb-20">
      <div className="container-main">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">Careers</h1>
        <p className="text-lg text-[var(--color-text-secondary)] max-w-2xl">
          Join us in building the future of software engineering. We're always looking for exceptional talent.
          Check back soon for open positions.
        </p>
      </div>
    </section>
  );
}
