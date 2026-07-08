import { ProcessPhase } from "@/types";

export const processPhases: ProcessPhase[] = [
  {
    id: "discovery",
    number: "01",
    title: "Discovery",
    subtitle: "Business Analysis & Research",
    description:
      "We immerse in your domain — interviewing stakeholders, analyzing systems, and mapping the landscape to uncover real problems, not just symptoms.",
    longDescription:
      "Discovery is the foundation of every successful project. We conduct deep-dive workshops, stakeholder interviews, market analysis, and technical audits to build a comprehensive understanding of your business, users, and competitive landscape. This phase ensures every subsequent decision is grounded in real insights rather than assumptions.",
    details: [
      "Business Analysis",
      "Requirement Gathering",
      "Market Research",
      "Project Scope",
    ],
    technologies: ["Miro", "Notion", "Figma", "Linear", "Google Analytics"],
    deliverables: [
      "Research Report",
      "Requirements Specification",
      "Project Plan",
      "Stakeholder Map",
      "Risk Assessment",
    ],
    timeline: "1–2 Weeks",
    icon: "Search",
    stats: [
      { value: "98%", label: "Requirement Accuracy" },
      { value: "50+", label: "Stakeholders Engaged" },
      { value: "100+", label: "Projects Scoped" },
    ],
    faqs: [
      {
        q: "What happens during the Discovery phase?",
        a: "We conduct stakeholder interviews, analyze existing systems, review market data, and facilitate workshops to align on goals, identify constraints, and define the project scope with clarity.",
      },
      {
        q: "How long does Discovery typically take?",
        a: "Most discovery engagements run 1–2 weeks depending on project complexity. Enterprise engagements with multiple stakeholders may extend to 3 weeks.",
      },
      {
        q: "What deliverables do we receive?",
        a: "You'll receive a comprehensive Research Report detailing findings and recommendations, a Requirements Specification document, a high-level Project Plan with milestones, and a Stakeholder Map.",
      },
    ],
  },
  {
    id: "strategy",
    number: "02",
    title: "Strategy & Design",
    subtitle: "UX/UI & Architecture",
    description:
      "We transform insights into elegant solutions — crafting wireframes, design systems, technical architecture, and a clear roadmap for execution.",
    longDescription:
      "Strategy & Design bridges the gap between discovery and execution. Our designers create intuitive wireframes and high-fidelity prototypes while our architects design the technical foundation. We align on user experience, visual direction, and system design before a single line of production code is written, saving time and reducing risk.",
    details: ["Wireframes", "UI/UX Design", "Technical Architecture", "Roadmap"],
    technologies: [
      "Figma",
      "Sketch",
      "Storybook",
      "Next.js",
      "Tailwind CSS",
      "AWS",
    ],
    deliverables: [
      "Wireframes & Prototypes",
      "Design System",
      "Architecture Document",
      "Roadmap & Timeline",
      "User Flow Diagrams",
    ],
    timeline: "2–3 Weeks",
    icon: "Compass",
    stats: [
      { value: "100%", label: "Design Approval Rate" },
      { value: "3×", label: "Faster Iteration Cycles" },
      { value: "99%", label: "Architecture Reliability" },
    ],
    faqs: [
      {
        q: "How do you approach UX design?",
        a: "We follow a user-centered design process — starting with wireframes to validate structure, then iterating through prototypes with real user feedback before finalizing visual design and building the design system.",
      },
      {
        q: "What's included in the technical architecture?",
        a: "System architecture diagrams, technology stack decisions, data models, API specifications, security considerations, and deployment topology — all documented for your team.",
      },
    ],
  },
  {
    id: "development",
    number: "03",
    title: "Development",
    subtitle: "Engineering & Integration",
    description:
      "Frontend, backend, cloud infrastructure, and AI integration built in parallel with weekly shipping cycles for rapid, transparent progress.",
    longDescription:
      "Development is where vision becomes reality. Our engineering teams work in parallel across frontend, backend, cloud, and AI disciplines. We follow modern agile practices with weekly sprints, continuous integration, and automated testing. Every feature is built with scalability, performance, and maintainability as first-class concerns.",
    details: [
      "Frontend",
      "Backend",
      "Cloud Infrastructure",
      "AI Integration",
      "Testing",
    ],
    technologies: [
      "React",
      "Next.js",
      "Node.js",
      "Python",
      "PostgreSQL",
      "AWS",
      "Docker",
      "TensorFlow",
    ],
    deliverables: [
      "Working Application",
      "API Documentation",
      "Infrastructure Setup",
      "Test Suite",
      "Deployment Pipeline",
    ],
    timeline: "4–8 Weeks",
    icon: "Code",
    stats: [
      { value: "500+", label: "Features Delivered" },
      { value: "99.9%", label: "Uptime Guarantee" },
      { value: "<100ms", label: "Avg Response Time" },
    ],
    faqs: [
      {
        q: "How do you ensure code quality?",
        a: "We enforce strict code reviews, automated testing (unit, integration, E2E), static analysis, and performance benchmarking as part of our CI/CD pipeline — every pull request is validated.",
      },
      {
        q: "Can you integrate with our existing systems?",
        a: "Yes — our architecture is designed for integration. We've connected with legacy systems, third-party APIs, and enterprise platforms across hundreds of projects.",
      },
    ],
  },
  {
    id: "launch",
    number: "04",
    title: "Launch & Growth",
    subtitle: "Deployment & Optimization",
    description:
      "Zero-downtime deployments, comprehensive monitoring, performance optimization, and continuous support to ensure lasting success.",
    longDescription:
      "Launch is just the beginning. We orchestrate production deployments with zero downtime, set up comprehensive monitoring and alerting, and optimize for performance at scale. Post-launch, we continue iterating with data-driven improvements, feature enhancements, and proactive maintenance to keep your product ahead of the curve.",
    details: [
      "Deployment",
      "Monitoring",
      "Performance Optimization",
      "Maintenance",
      "Continuous Support",
    ],
    technologies: [
      "AWS",
      "Datadog",
      "Sentry",
      "GitHub Actions",
      "Terraform",
      "Kubernetes",
    ],
    deliverables: [
      "Production Deployment",
      "Monitoring Dashboard",
      "Performance Report",
      "Maintenance Plan",
      "Support SLA",
    ],
    timeline: "1–2 Weeks + Ongoing",
    icon: "Rocket",
    stats: [
      { value: "200+", label: "Successful Launches" },
      { value: "0", label: "Downtime Incidents" },
      { value: "40%", label: "Avg Performance Gain" },
    ],
    faqs: [
      {
        q: "What does launch support include?",
        a: "We provide 24/7 launch coverage, rollback procedures, real-time monitoring, and a dedicated support engineer for the first 72 hours post-launch.",
      },
      {
        q: "What ongoing support is available?",
        a: "We offer tiered support plans including proactive monitoring, monthly performance reviews, security patches, feature development sprints, and 24/7 incident response.",
      },
    ],
  },
];

export function getPhaseById(id: string): ProcessPhase | undefined {
  return processPhases.find((p) => p.id === id);
}

export function getPhaseIndex(id: string): number {
  return processPhases.findIndex((p) => p.id === id);
}
