import { ProcessStep } from "@/types";

export const processSteps: ProcessStep[] = [
  {
    id: "discover",
    title: "Discover",
    description:
      "We immerse in your domain — interviewing stakeholders, analyzing systems, and mapping the landscape. This phase uncovers the real problems, not just the symptoms.",
    number: 1,
    visual: "explore",
  },
  {
    id: "architect",
    title: "Architect",
    description:
      "We design the technical foundation. Every decision — from data models to deployment topology — is made with scale, resilience, and long-term maintainability in mind.",
    number: 2,
    visual: "blueprint",
  },
  {
    id: "craft",
    title: "Craft",
    description:
      "Design and engineering converge. We build iteratively, shipping working software every week while maintaining the highest bar for quality, performance, and experience.",
    number: 3,
    visual: "build",
  },
  {
    id: "launch",
    title: "Launch",
    description:
      "Orchestrated releases with zero-downtime deployments, comprehensive testing, and performance validation. We treat every launch as a craft — precise and deliberate.",
    number: 4,
    visual: "rocket",
  },
  {
    id: "evolve",
    title: "Evolve",
    description:
      "Post-launch, we continue optimizing. Data-driven iterations, feature evolution, and infrastructure scaling ensure your product grows stronger every day.",
    number: 5,
    visual: "grow",
  },
];
