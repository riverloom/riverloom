import { ReactNode } from "react";

/* ─── Types ─── */

export interface CaseStudy {
  title: string;
  context: string;
  result: string;
  metric: string;
}

export interface FAQ {
  q: string;
  a: string;
}

export interface SolutionData {
  slug: string;
  title: string;
  tagline: string;
  heroDescription: string;
  heroIllustration: string; // component name, resolved at usage
  processSteps: { title: string; description: string }[];
  techItems: string[];
  caseStudies: CaseStudy[];
  benefits: string[];
  faqs: FAQ[];
  timeline: string;
}

/* ─── Solutions Data ─── */

export const solutions: Record<string, Omit<SolutionData, "heroIllustration">> = {
  "ai-engineering": {
    slug: "ai-engineering",
    title: "AI-First Engineering",
    tagline: "Intelligence isn't added. It's architected.",
    heroDescription:
      "We embed machine learning, LLMs, and intelligent automation at the core of your product. Every system learns, adapts, and improves — continuously.",
    processSteps: [
      { title: "Discovery & Audit", description: "We map your data landscape, identify high-impact AI opportunities, and define measurable success criteria." },
      { title: "Model Selection & Training", description: "Choosing the right architecture — from fine-tuned LLMs to custom transformers — then training on your domain data." },
      { title: "Integration & Pipelines", description: "Seamless integration into your stack with robust data pipelines, feature stores, and MLOps infrastructure." },
      { title: "Deployment & Monitoring", description: "Production-grade serving with automated retraining, drift detection, and performance dashboards." },
      { title: "Continuous Evolution", description: "Models improve with usage. We monitor, retrain, and optimize to keep your AI ahead of the curve." },
    ],
    techItems: [
      "OpenAI / GPT-4 / Claude",
      "LangChain / LlamaIndex",
      "TensorFlow / PyTorch",
      "Hugging Face Transformers",
      "Weaviate / Pinecone",
      "MLflow / Kubeflow",
      "Ray / Dask",
      "AWS SageMaker",
      "Vertex AI",
      "Docker / Kubernetes",
    ],
    caseStudies: [
      { title: "AI-Powered Document Processing", context: "A legaltech startup needed to extract, classify, and summarize thousands of contracts daily.", result: "Built a custom LLM pipeline that reduced document processing time by 94% and achieved 99.2% extraction accuracy.", metric: "94% faster processing" },
      { title: "Predictive Customer Analytics", context: "An e-commerce platform wanted to forecast churn and personalize recommendations at scale.", result: "Deployed ensemble models serving 12M+ predictions daily, increasing revenue by 23% and reducing churn by 31%.", metric: "23% revenue lift" },
    ],
    benefits: [
      "Native AI integration — not bolted on",
      "Custom models trained on your data",
      "Automated retraining & drift detection",
      "Production-grade MLOps infrastructure",
      "Measurable business impact from day one",
    ],
    faqs: [
      { q: "What's your experience with LLMs?", a: "We've shipped 15+ AI-powered products using GPT-4, Claude, open-source LLMs, and custom transformer architectures. Our team includes ML engineers who have built at companies like Google and OpenAI." },
      { q: "How do you handle data privacy with AI?", a: "We deploy where your data lives — on-prem, VPC, or air-gapped environments. All training data is encrypted, anonymized where possible, and never shared with third-party model providers without explicit consent." },
      { q: "What's the typical timeline for an AI feature?", a: "A proof of concept in 2–4 weeks, production MVP in 6–8 weeks, and full deployment with monitoring in 10–12 weeks. Timelines depend on data readiness and model complexity." },
    ],
    timeline: "8–12 weeks to production AI",
  },
  security: {
    slug: "security",
    title: "Enterprise-Grade Security",
    tagline: "Security isn't a feature. It's a foundation.",
    heroDescription:
      "Zero-trust architecture, end-to-end encryption, and SOC 2 aligned processes baked in from the first line of code — not patched in after launch.",
    processSteps: [
      { title: "Threat Modeling", description: "We identify attack vectors, data sensitivity levels, and compliance requirements specific to your industry." },
      { title: "Architecture Design", description: "Zero-trust network design, encryption strategies, IAM policies, and secure data flow mapping." },
      { title: "Implementation", description: "Secure coding practices, automated SAST/DAST scanning, dependency auditing, and secrets management." },
      { title: "Testing & Auditing", description: "Penetration testing, compliance audits (SOC 2, GDPR, HIPAA), and vulnerability assessments." },
      { title: "Ongoing Monitoring", description: "24/7 threat detection, incident response playbooks, and continuous compliance monitoring." },
    ],
    techItems: [
      "AWS WAF / Shield",
      "Cloudflare Security",
      "Auth0 / Okta",
      "HashiCorp Vault",
      "SonarQube / Snyk",
      "Wireshark / Burp Suite",
      "SOC 2 / ISO 27001",
      "GDPR / HIPAA / CCPA",
      "Zero Trust Architecture",
      "mTLS / E2E Encryption",
    ],
    caseStudies: [
      { title: "Fintech Platform Hardening", context: "A payment processing startup needed SOC 2 Type II compliance and penetration testing before enterprise deals.", result: "Achieved SOC 2 certification in 4 months, passed penetration testing with zero critical findings, and unlocked $5M in enterprise contracts.", metric: "Zero critical findings" },
      { title: "Healthcare Data Protection", context: "A healthtech company handling PHI needed HIPAA-compliant infrastructure and end-to-end encryption.", result: "Designed a HIPAA-compliant architecture with field-level encryption, audit logging, and BAA-compliant cloud infrastructure.", metric: "HIPAA compliant in 6 weeks" },
    ],
    benefits: [
      "SOC 2 / HIPAA / GDPR compliant by default",
      "End-to-end encryption everywhere",
      "Zero-trust architecture designed in",
      "Automated security scanning in CI/CD",
      "24/7 threat detection & response",
    ],
    faqs: [
      { q: "Do you handle SOC 2 certification?", a: "Yes. We've guided multiple companies through SOC 2 Type I and Type II certification, including preparing evidence, writing policies, and managing the audit process." },
      { q: "What about data residency requirements?", a: "We support multi-region deployments, data localization, and can operate in air-gapped or restricted environments. Encryption keys can be customer-managed." },
      { q: "How do you handle incident response?", a: "We implement automated alerting, on-call rotation, and a documented incident response playbook with defined escalation paths. Post-incident reviews drive continuous improvement." },
    ],
    timeline: "4–6 weeks to certified compliance",
  },
  cloud: {
    slug: "cloud",
    title: "Scalable Cloud Architecture",
    tagline: "From zero to millions. Without breaking a sweat.",
    heroDescription:
      "Multi-region, auto-scaling, fault-tolerant infrastructure engineered for growth. Your product shouldn't slow down when you succeed.",
    processSteps: [
      { title: "Architecture Assessment", description: "We review your current infrastructure, traffic patterns, and growth projections to design a scalable roadmap." },
      { title: "Infrastructure as Code", description: "Everything defined in Terraform/CDK — immutable, version-controlled, and reproducible across environments." },
      { title: "Containerization & Orchestration", description: "Dockerized services orchestrated via Kubernetes with auto-scaling, rolling updates, and self-healing." },
      { title: "CI/CD Pipeline", description: "Automated testing, building, and deployment pipelines with canary releases and rollback capabilities." },
      { title: "Monitoring & Observability", description: "Comprehensive metrics, distributed tracing, structured logging, and alerting with Grafana, Datadog, or equivalent." },
    ],
    techItems: [
      "AWS / GCP / Azure",
      "Kubernetes / EKS / GKE",
      "Docker / Podman",
      "Terraform / CDK / Pulumi",
      "GitHub Actions / GitLab CI",
      "Datadog / Grafana / New Relic",
      "CloudFront / Cloudflare",
      "RDS / Aurora / CockroachDB",
      "Redis / ElastiCache",
      "Kafka / SQS / EventBridge",
    ],
    caseStudies: [
      { title: "SaaS Platform Scaling", context: "A B2B SaaS platform was experiencing downtime during peak usage and struggled with manual scaling.", result: "Migrated to an auto-scaling Kubernetes cluster on EKS, implemented multi-AZ redundancy, and reduced p99 latency by 68%.", metric: "68% latency reduction" },
      { title: "Global Media Delivery", context: "A media company needed to serve video content to users across 30+ countries with sub-second load times.", result: "Designed a multi-region architecture with edge caching, CDN optimization, and dynamic origin selection.", metric: "99.99% uptime achieved" },
    ],
    benefits: [
      "Auto-scaling infrastructure that grows with you",
      "99.99% uptime with multi-region redundancy",
      "Infrastructure as Code — fully reproducible",
      "CI/CD with canary deployments & rollbacks",
      "Comprehensive observability & alerting",
    ],
    faqs: [
      { q: "Which cloud provider do you recommend?", a: "We're cloud-agnostic and choose based on your needs. AWS offers breadth, GCP excels in data/AI, and Azure integrates best with Microsoft stacks. We'll recommend the right fit." },
      { q: "How do you handle cost optimization?", a: "We implement auto-scaling, right-sizing, reserved instances, and spot instances where appropriate. We set up cost alerts and provide monthly optimization reports." },
      { q: "What about migration from legacy infrastructure?", a: "We use a strangler fig pattern to gradually migrate services without downtime. Database migrations are planned with rollback strategies and verified in staging." },
    ],
    timeline: "6–10 weeks to scalable production",
  },
  performance: {
    slug: "performance",
    title: "Performance & SEO Excellence",
    tagline: "Speed is a feature. We engineer both.",
    heroDescription:
      "Sub-100ms responses, 95+ Lighthouse scores, and Core Web Vitals that search engines reward. We build experiences that users love and algorithms rank.",
    processSteps: [
      { title: "Performance Audit", description: "Lighthouse, WebPageTest, and real-user monitoring analysis to baseline current performance metrics." },
      { title: "Frontend Optimization", description: "Code splitting, lazy loading, image optimization, font subsetting, and bundle analysis." },
      { title: "Backend & Network Optimization", description: "CDN configuration, edge computing, database query optimization, and API response caching." },
      { title: "SEO Architecture", description: "Semantic HTML, structured data, XML sitemaps, canonical URLs, and server-side rendering optimization." },
      { title: "Monitoring & Continuous Improvement", description: "Real-user monitoring, performance budgets, and automated regression testing in CI/CD." },
    ],
    techItems: [
      "Next.js / Nuxt / Remix",
      "Cloudflare Workers / Vercel Edge",
      "Lighthouse CI / WebPageTest",
      "Sentry / Datadog RUM",
      "Redis / Varnish / CDN",
      "GraphQL / tRPC",
      "Image CDN / AVIF / WebP",
      "Partytown / Web Workers",
      "Structured Data / Schema.org",
      "GTM / Google Search Console",
    ],
    caseStudies: [
      { title: "E-commerce Speed Transformation", context: "An online retailer was losing conversions due to 6-second page load times on mobile.", result: "Optimized images, implemented SSR with streaming, added predictive prefetching, and reduced load time to 0.8 seconds. Conversions increased by 27%.", metric: "0.8s load time" },
      { title: "Enterprise SEO Overhaul", context: "A B2B company's site wasn't ranking for key search terms despite quality content.", result: "Restructured information architecture, implemented structured data, optimized Core Web Vitals, and achieved a 340% increase in organic traffic.", metric: "340% organic growth" },
    ],
    benefits: [
      "95+ Lighthouse scores guaranteed",
      "Sub-100ms API response times",
      "Core Web Vitals optimization",
      "Structured data & semantic HTML",
      "Continuous performance monitoring",
    ],
    faqs: [
      { q: "What Lighthouse score can you guarantee?", a: "We target 95+ on all four Lighthouse metrics (Performance, Accessibility, Best Practices, SEO) for production builds. We use Lighthouse CI to enforce budgets." },
      { q: "How do you handle third-party script performance?", a: "We use techniques like Partytown for web workers, deferred loading, and self-hosting critical scripts. We also implement performance budgets for third-party code." },
      { q: "Do you optimize for Core Web Vitals?", a: "Yes. LCP, FID, and CLS are primary metrics in our optimization process. We've achieved passing Core Web Vitals scores for clients across e-commerce, media, and SaaS." },
    ],
    timeline: "4–8 weeks to 95+ Lighthouse",
  },
  partnership: {
    slug: "partnership",
    title: "Long-Term Product Partnership",
    tagline: "We don't ship and leave. We stay and build.",
    heroDescription:
      "Continuous optimization, shared roadmaps, and a dedicated team that knows your product as well as you do. Real partnerships deliver compounding returns.",
    processSteps: [
      { title: "Onboarding & Knowledge Transfer", description: "Deep immersion in your product, codebase, team dynamics, and business goals. We become part of your team." },
      { title: "Shared Roadmap Planning", description: "Quarterly planning sessions where we align engineering priorities with your business objectives and market opportunities." },
      { title: "Continuous Delivery", description: "Bi-weekly release cycles with automated testing, code reviews, and deployment — always production-ready." },
      { title: "Monitoring & Optimization", description: "Proactive performance monitoring, security patching, dependency updates, and technical debt management." },
      { title: "Strategic Advisory", description: "Quarterly business reviews, technology audits, and architectural guidance to keep your product competitive." },
    ],
    techItems: [
      "Jira / Linear / Notion",
      "GitHub / GitLab",
      "Slack / Discord",
      "Datadog / Sentry",
      "PagerDuty / Opsgenie",
      "Figma / Storybook",
      "Postman / Swagger",
      "Cypress / Playwright",
      "SonarQube / CodeClimate",
      "Retro & OKR frameworks",
    ],
    caseStudies: [
      { title: "Three-Year Product Partnership", context: "A Series B startup needed a technical partner to scale their engineering team and evolve their product.", result: "Over 3 years, we grew their engineering team from 4 to 28, shipped 6 major product releases, and helped them achieve a $120M Series D.", metric: "3-year partnership" },
      { title: "Post-Acquisition Technical Stability", context: "An acquired company needed technical leadership to integrate systems while maintaining existing product velocity.", result: "Provided interim CTO services, managed the integration roadmap, and maintained zero downtime during a complex migration.", metric: "Zero downtime migration" },
    ],
    benefits: [
      "Dedicated team that knows your product deeply",
      "Quarterly strategic business reviews",
      "Bi-weekly releases with no regression",
      "Proactive maintenance & security patching",
      "Shared roadmap aligned to business goals",
    ],
    faqs: [
      { q: "What's the minimum engagement length?", a: "We typically start with a 3-month commitment to allow for proper onboarding and knowledge transfer. Most partnerships extend for 12+ months." },
      { q: "How is the team structured?", a: "You get a dedicated team including a tech lead, engineers (2–4 depending on scope), a QA specialist, and access to our CTO for strategic guidance." },
      { q: "What happens if we want to bring work in-house?", a: "We actively support knowledge transfer. We document everything, pair with your new hires, and provide a structured transition plan — no lock-in, no hard feelings." },
    ],
    timeline: "3-month minimum, 12-month average",
  },
  business: {
    slug: "business",
    title: "Business-Driven Innovation",
    tagline: "Every line of code ties back to revenue.",
    heroDescription:
      "We measure success in revenue growth, user retention, and market share — not sprint velocity. Technology decisions are business decisions.",
    processSteps: [
      { title: "Business Discovery", description: "We map your current processes, identify bottlenecks, and quantify the revenue impact of solving them." },
      { title: "Solution Design", description: "Technology architecture designed around business outcomes — not the other way around. ROI modeled upfront." },
      { title: "Agile Implementation", description: "Iterative delivery with measurable business milestones. We ship value every sprint, not just code." },
      { title: "Measurement & Optimization", description: "A/B testing, funnel analysis, and cohort tracking to validate that technical changes drive business results." },
      { title: "Scale & Transform", description: "Once proven, we scale the solution across your organization and identify the next high-impact opportunity." },
    ],
    techItems: [
      "Salesforce / HubSpot CRM",
      "Stripe / Braintree",
      "Mixpanel / Amplitude",
      "Tableau / Metabase",
      "n8n / Zapier / Make",
      "Segment / RudderStack",
      "AI/ML for Automation",
      "ERP / MRP Systems",
      "SaaS Platforms",
      "Custom Dashboard Builds",
    ],
    caseStudies: [
      { title: "Sales Process Automation", context: "A B2B company was losing deals due to slow lead response times and manual qualification processes.", result: "Built an AI-driven lead scoring and routing system that reduced response time from 24 hours to 2 minutes and increased conversion by 41%.", metric: "41% conversion increase" },
      { title: "Subscription Billing Transformation", context: "A SaaS company needed complex usage-based billing that their existing platform couldn't support.", result: "Custom-built billing platform with real-time usage metering, multi-currency support, and automated dunning — reducing churn by 18%.", metric: "18% churn reduction" },
    ],
    benefits: [
      "ROI modeled before any code is written",
      "Business outcomes drive technical decisions",
      "A/B testing & data-driven iteration",
      "Cross-functional automation & integration",
      "Measurable revenue & retention impact",
    ],
    faqs: [
      { q: "How do you measure business impact?", a: "We define success metrics upfront — revenue, conversion, retention, or cost savings — and track them with dashboards. Every sprint includes a business KPI review." },
      { q: "Can you work with our existing tools?", a: "Yes. We integrate with your existing stack rather than replacing it. We've worked with Salesforce, HubSpot, Stripe, Shopify, and hundreds of other platforms." },
      { q: "What industries do you specialize in?", a: "We have deep experience in SaaS, e-commerce, fintech, healthcare, and media. The business-driven approach works across any industry where technology impacts revenue." },
    ],
    timeline: "6–12 weeks to measurable ROI",
  },
};

export function getSolution(slug: string): SolutionData | undefined {
  const data = solutions[slug];
  if (!data) return undefined;
  return { ...data, heroIllustration: slug };
}

export const allSolutions: SolutionData[] = Object.values(solutions).map((s) => ({
  ...s,
  heroIllustration: s.slug,
}));
