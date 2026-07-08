/* ═══════════════════════════════════════════════════════════
   LEGAL PAGE CONTENT — RiverLoom
   All content is original draft for a software engineering &
   AI solutions studio. Marked with [CONFIGURABLE] where legal
   counsel review is required before production use.
   ═══════════════════════════════════════════════════════════ */

export const LEGAL_NAV = {
  "privacy-policy": {
    title: "Privacy Policy",
    heroTitle: "Protecting Your Privacy",
    heroSubtitle: "We believe transparency builds trust.",
    lastUpdated: "July 1, 2026",
    description:
      "This Privacy Policy explains how RiverLoom handles your personal information when you use our services, visit our website, or interact with our products.",
    sections: [
      { id: "overview", label: "Overview" },
      { id: "information-collected", label: "Information We Collect" },
      { id: "how-we-use", label: "How We Use Your Data" },
      { id: "legal-basis", label: "Legal Basis for Processing" },
      { id: "cookies", label: "Cookies & Analytics" },
      { id: "data-sharing", label: "Data Sharing & Third Parties" },
      { id: "data-security", label: "Data Security" },
      { id: "data-retention", label: "Data Retention" },
      { id: "your-rights", label: "Your Rights" },
      { id: "international", label: "International Transfers" },
      { id: "children", label: "Children's Privacy" },
      { id: "changes", label: "Changes to This Policy" },
      { id: "contact", label: "Contact Us" },
    ],
  },
  "terms-and-conditions": {
    title: "Terms & Conditions",
    heroTitle: "Terms & Conditions",
    heroSubtitle: "Clear expectations. Transparent agreements.",
    lastUpdated: "July 1, 2026",
    description:
      "These Terms & Conditions govern your access to and use of RiverLoom's services, website, and products.",
    sections: [
      { id: "overview", label: "Overview" },
      { id: "acceptance", label: "Acceptance of Terms" },
      { id: "services", label: "Services" },
      { id: "user-responsibilities", label: "User Responsibilities" },
      { id: "intellectual-property", label: "Intellectual Property" },
      { id: "acceptable-use", label: "Acceptable Use" },
      { id: "payments", label: "Payments & Ownership" },
      { id: "confidentiality", label: "Confidentiality" },
      { id: "liability", label: "Limitation of Liability" },
      { id: "termination", label: "Termination" },
      { id: "governing-law", label: "Governing Law" },
      { id: "changes", label: "Changes to Terms" },
      { id: "contact", label: "Contact" },
    ],
  },
  "refund-policy": {
    title: "Refund Policy",
    heroTitle: "Refund Policy",
    heroSubtitle: "Simple. Fair. Transparent.",
    lastUpdated: "July 1, 2026",
    description:
      "Our refund policy is designed to be fair to both our clients and our team. The terms below vary by service type.",
    sections: [
      { id: "overview", label: "Overview" },
      { id: "software-dev", label: "Software Development Services" },
      { id: "consulting", label: "Consulting & Strategy" },
      { id: "ui-ux", label: "UI/UX Design" },
      { id: "ai-solutions", label: "AI Solutions" },
      { id: "digital-products", label: "Digital Products & SaaS" },
      { id: "mobile-apps", label: "Mobile Applications" },
      { id: "partial-refunds", label: "Partial & Milestone Refunds" },
      { id: "exceptions", label: "Exceptions" },
      { id: "process", label: "Refund Process" },
      { id: "contact", label: "Contact" },
    ],
  },
  "cancellation-policy": {
    title: "Cancellation Policy",
    heroTitle: "Cancellation Policy",
    heroSubtitle: "Flexible where possible. Clear where necessary.",
    lastUpdated: "July 1, 2026",
    description:
      "This policy outlines how project and service cancellations are handled at RiverLoom.",
    sections: [
      { id: "overview", label: "Overview" },
      { id: "client-cancellation", label: "Client Cancellation" },
      { id: "riverloom-cancellation", label: "RiverLoom Cancellation" },
      { id: "subscription", label: "Subscription Cancellation" },
      { id: "notice-periods", label: "Notice Periods" },
      { id: "completed-work", label: "Completed Work & Payments" },
      { id: "ownership", label: "Ownership of Deliverables" },
      { id: "procedure", label: "Termination Procedure" },
      { id: "contact", label: "Contact" },
    ],
  },
} as const;

export type LegalPageKey = keyof typeof LEGAL_NAV;

/* ═══════════════════════════════════════════════════════════
   FAQ DATA
   ═══════════════════════════════════════════════════════════ */

export interface LegalFAQItem {
  q: string;
  a: string;
}

export const LEGAL_FAQS: Record<LegalPageKey, LegalFAQItem[]> = {
  "privacy-policy": [
    {
      q: "What personal information does RiverLoom collect?",
      a: "We collect only the information necessary to provide our services — typically your name, email address, company name, and billing information when you engage with us. We also collect standard technical data like IP address and browser type when you visit our website. We do not sell your personal information.",
    },
    {
      q: "How do I request access to my data?",
      a: "You can request a copy of the personal data we hold about you at any time by emailing contact@riverloom.in. We will respond within 30 days as required by applicable data protection laws.",
    },
    {
      q: "Can I request deletion of my data?",
      a: "Yes. You have the right to request deletion of your personal data. Email us at contact@riverloom.in and we will process your request subject to any legal obligations that require us to retain certain records (such as invoicing data).",
    },
    {
      q: "Does RiverLoom use cookies?",
      a: "We use essential cookies for website functionality and optional analytics cookies (with your consent) to improve our site. You can manage cookie preferences at any time through your browser settings. Our [CONFIGURABLE: cookie consent mechanism will be implemented before launch].",
    },
    {
      q: "How do you protect my data?",
      a: "We implement industry-standard security measures including encryption in transit (TLS 1.3), encrypted storage, access controls, and regular security audits. Our infrastructure is hosted on [CONFIGURABLE: AWS/GCP/Azure] with SOC 2 compliance standards.",
    },
    {
      q: "Will my data be shared with third parties?",
      a: "We only share data with trusted service providers necessary to deliver our services (e.g., cloud hosting, payment processing). We require all third parties to comply with strict data protection agreements. We never sell your personal information.",
    },
  ],
  "terms-and-conditions": [
    {
      q: "When do the Terms & Conditions apply?",
      a: "These Terms apply as soon as you access our website or engage RiverLoom for any services. By using our site or entering into an agreement with us, you agree to be bound by these terms.",
    },
    {
      q: "Who owns the intellectual property?",
      a: "For custom development projects, the final deliverables are owned by you upon full payment. RiverLoom retains the right to use generalized methodologies, libraries, and tools developed during the project. Specific IP terms are defined in each Statement of Work.",
    },
    {
      q: "What happens if a project is delayed?",
      a: "We provide timeline estimates based on current scope. Delays may occur due to unforeseen technical challenges, changes in scope, or delayed client feedback. We communicate proactively about any timeline changes and work to mitigate delays.",
    },
    {
      q: "How are disputes resolved?",
      a: "Disputes are first addressed through direct negotiation. If unresolved, they proceed to mediation before any legal action. [CONFIGURABLE: Governing law will be specified in your final agreement — typically the laws of India/UK/US depending on jurisdiction.]",
    },
    {
      q: "Can RiverLoom services be subcontracted?",
      a: "We may engage trusted subcontractors for specialized work, but we remain fully responsible for all deliverables and quality. You will be notified if subcontractors are involved in your project.",
    },
  ],
  "refund-policy": [
    {
      q: "Can I get a refund for custom software development?",
      a: "Refunds for custom development are assessed on a case-by-case basis and depend on the work completed. Generally, payments for completed milestones are non-refundable. Unused prepaid time may be eligible for a partial refund minus any administrative fees. [CONFIGURABLE: Specific refund terms will be detailed in your Statement of Work.]",
    },
    {
      q: "How do refunds work for SaaS subscriptions?",
      a: "For SaaS products, refunds are prorated based on the unused portion of your current billing period. Annual subscriptions may be refunded on a prorated basis minus a [CONFIGURABLE: percentage] administrative fee. Contact us within [CONFIGURABLE: days] of billing for eligibility.",
    },
    {
      q: "Are AI solution engagements refundable?",
      a: "AI solution engagements involve significant upfront research and data work. Refunds are generally not available after the initial discovery phase has been completed and presented. Before the discovery phase, a [CONFIGURABLE: percentage] cancellation fee may apply.",
    },
    {
      q: "How long do refunds take to process?",
      a: "Approved refunds are typically processed within [CONFIGURABLE: 5–14] business days. The time for the funds to appear in your account depends on your payment provider and bank.",
    },
    {
      q: "What if I cancel mid-project?",
      a: "If you cancel a project mid-development, you retain ownership of all work completed and delivered up to the cancellation point after paying for those milestones. Unused prepaid amounts may be refunded minus a [CONFIGURABLE: percentage] cancellation fee. See our Cancellation Policy for details.",
    },
  ],
  "cancellation-policy": [
    {
      q: "Can I cancel my project at any time?",
      a: "Yes, you may cancel your project at any time by providing written notice. The cancellation terms including payment for completed work, ownership of deliverables, and any applicable fees are outlined in your agreement.",
    },
    {
      q: "What happens to my work if I cancel?",
      a: "Upon cancellation, you retain ownership of all work completed and delivered up to the point of cancellation, provided payment for that work has been made. Work in progress that has not been accepted may be delivered in its current state.",
    },
    {
      q: "Can RiverLoom cancel a project?",
      a: "RiverLoom reserves the right to cancel a project if the client breaches material terms, fails to make payments, or engages in behavior that makes collaboration untenable. We will provide [CONFIGURABLE: notice period] written notice before cancellation.",
    },
    {
      q: "What is the notice period for cancellation?",
      a: "We request a minimum of [CONFIGURABLE: 14–30] days written notice for project cancellations to allow for orderly transition. For retainer or subscription services, the notice period is [CONFIGURABLE: 30] days as specified in your agreement.",
    },
    {
      q: "Are there cancellation fees?",
      a: "Cancellation fees, if any, depend on the project stage at the time of cancellation. Early-stage cancellations may incur minimal fees. Projects in active development may be subject to fees covering work completed and resources allocated. [CONFIGURABLE: Exact fee structure will be specified in your agreement.]",
    },
  ],
};

/* ═══════════════════════════════════════════════════════════
   SECTION CONTENT
   ═══════════════════════════════════════════════════════════ */

export interface LegalSectionContent {
  heading: string;
  subheading?: string;
  content: (string | LegalCallout | LegalTable)[];
}

export interface LegalCallout {
  type: "note" | "warning" | "info" | "example";
  text: string;
}

export interface LegalTable {
  headers: string[];
  rows: string[][];
}

/* ═══════════════════════════════════════════════════════════
   PRIVACY POLICY SECTIONS
   ═══════════════════════════════════════════════════════════ */

export const PRIVACY_SECTIONS: LegalSectionContent[] = [
  {
    heading: "Overview",
    subheading: "Our commitment to your privacy",
    content: [
      "RiverLoom (\"we\", \"our\", or \"us\") is a software engineering and AI solutions studio. This Privacy Policy explains how we collect, use, disclose, and protect your personal information when you visit our website, use our services, or interact with our products.",
      "We are committed to protecting your privacy and handling your data with transparency and care. We encourage you to read this policy carefully and contact us with any questions.",
      'This policy applies to all visitors, clients, and users of RiverLoom\'s website and services. [CONFIGURABLE: If you are located in the EEA, UK, or California, additional rights may apply as described below.]',
    ],
  },
  {
    heading: "Information We Collect",
    subheading: "What we gather and why",
    content: [
      {
        type: "info",
        text: "We collect only the minimum information necessary to provide our services and improve your experience. We do not collect data indiscriminately.",
      },
      "We collect the following categories of information:",
      {
        type: "note",
        text: "Personal Information: Name, email address, phone number, company name, job title, and billing information when you engage our services or contact us.",
      },
      {
        type: "note",
        text: "Technical Information: IP address, browser type, device information, operating system, and usage patterns when you visit our website.",
      },
      {
        type: "note",
        text: "Communication Data: Records of emails, calls, and messages exchanged with our team for service delivery and support.",
      },
      "We do not currently collect sensitive personal data such as health information, biometric data, or financial account numbers (beyond basic billing information processed by our payment partners). [CONFIGURABLE: Update this section if RiverLoom begins collecting additional data types.]",
    ],
  },
  {
    heading: "How We Use Your Data",
    subheading: "Purpose of data processing",
    content: [
      "We use the information we collect for the following purposes:",
      {
        type: "info",
        text: "Service Delivery: To provide, maintain, and improve our software engineering and consulting services.",
      },
      {
        type: "info",
        text: "Communication: To respond to inquiries, send project updates, invoices, and service-related communications.",
      },
      {
        type: "info",
        text: "Website Improvement: To analyze how visitors use our site and improve the user experience.",
      },
      {
        type: "info",
        text: "Legal Compliance: To comply with applicable laws, regulations, and legal requests.",
      },
      "We do not use your personal information for automated decision-making or profiling without your explicit consent. [CONFIGURABLE: If RiverLoom implements AI-driven personalization in the future, this section must be updated.]",
    ],
  },
  {
    heading: "Legal Basis for Processing",
    subheading: "GDPR compliance framework",
    content: [
      "If you are located in the European Economic Area (EEA) or the United Kingdom, we process your personal information based on the following legal grounds:",
      {
        type: "note",
        text: "Contractual Necessity: Processing required to fulfill our service agreement with you (e.g., project delivery, billing).",
      },
      {
        type: "note",
        text: "Legitimate Interests: Processing for our legitimate business interests such as improving services, security, and analytics — balanced against your privacy rights.",
      },
      {
        type: "note",
        text: "Consent: Where we rely on your consent (e.g., marketing cookies), you may withdraw consent at any time.",
      },
      {
        type: "note",
        text: "Legal Obligation: Processing necessary to comply with legal and regulatory requirements.",
      },
      "[CONFIGURABLE: This section should be reviewed by legal counsel to ensure GDPR compliance is accurately represented based on RiverLoom's specific data processing activities and jurisdictional exposures.]",
    ],
  },
  {
    heading: "Cookies & Analytics",
    subheading: "How we use tracking technologies",
    content: [
      "Our website uses cookies and similar technologies to enhance functionality and understand usage patterns. We categorize cookies as follows:",
      {
        headers: ["Cookie Type", "Purpose", "Duration"],
        rows: [
          ["Essential", "Required for basic site functionality (navigation, security)", "Session / Persistent"],
          ["Analytics", "Help us understand how visitors interact with our site", "[CONFIGURABLE: e.g., 13–26 months]"],
          ["Marketing", "Used to deliver relevant content and measure campaign effectiveness", "[CONFIGURABLE: e.g., 90 days]"],
        ],
      },
      {
        type: "warning",
        text: "We do not currently use marketing cookies. [CONFIGURABLE: If RiverLoom implements marketing cookies in the future, this section must be updated and a cookie consent mechanism must be implemented.]",
      },
      "You can manage cookie preferences through your browser settings. Disabling certain cookies may affect website functionality.",
    ],
  },
  {
    heading: "Data Sharing & Third Parties",
    subheading: "Who we share your data with",
    content: [
      "We do not sell your personal information. We may share your data with trusted third-party service providers who assist us in operating our business, subject to strict data processing agreements:",
      {
        type: "info",
        text: "Cloud Infrastructure: [CONFIGURABLE: e.g., AWS, Google Cloud, Vercel] — for hosting and storage.",
      },
      {
        type: "info",
        text: "Communication Tools: [CONFIGURABLE: e.g., Slack, Email services] — for project communication.",
      },
      {
        type: "info",
        text: "Payment Processing: [CONFIGURABLE: e.g., Stripe, Razorpay] — for billing. Payment data is handled directly by the provider; we do not store full payment card details.",
      },
      {
        type: "info",
        text: "Analytics: [CONFIGURABLE: e.g., Plausible, PostHog, Google Analytics] — for website analytics with privacy safeguards in place.",
      },
      "We require all third parties to adhere to confidentiality and data protection standards equivalent to our own. [CONFIGURABLE: A complete list of sub-processors should be maintained and provided upon request.]",
    ],
  },
  {
    heading: "Data Security",
    subheading: "How we protect your information",
    content: [
      "We implement comprehensive security measures to protect your data from unauthorized access, alteration, disclosure, or destruction:",
      {
        type: "note",
        text: "Encryption: Data is encrypted in transit using TLS 1.3 and at rest using AES-256.",
      },
      {
        type: "note",
        text: "Access Control: Strict access controls with role-based permissions and multi-factor authentication.",
      },
      {
        type: "note",
        text: "Regular Audits: Periodic security reviews and penetration testing of our infrastructure.",
      },
      {
        type: "note",
        text: "Incident Response: A documented incident response plan to address any potential breaches.",
      },
      "While we implement strong safeguards, no method of transmission or storage is 100% secure. We cannot guarantee absolute security but will notify you promptly in the event of a data breach affecting your personal information, as required by applicable law.",
    ],
  },
  {
    heading: "Data Retention",
    subheading: "How long we keep your data",
    content: [
      "We retain your personal information only as long as necessary to fulfill the purposes described in this policy, or as required by law:",
      {
        headers: ["Data Category", "Retention Period", "Rationale"],
        rows: [
          ["Account & Billing Data", "[CONFIGURABLE: 7 years]", "Legal and tax compliance"],
          ["Project Communications", "[CONFIGURABLE: 3 years after project completion]", "Service continuity and reference"],
          ["Website Analytics", "[CONFIGURABLE: 26 months]", "Industry standard for analytics"],
          ["Inquiry Data", "[CONFIGURABLE: 12 months]", "Follow-up and relationship management"],
        ],
      },
      "When retention periods expire, your data is securely deleted or anonymized.",
    ],
  },
  {
    heading: "Your Rights",
    subheading: "Control over your data",
    content: [
      "Depending on your jurisdiction, you may have the following rights regarding your personal information:",
      {
        type: "info",
        text: "Right to Access: Request a copy of the personal data we hold about you.",
      },
      {
        type: "info",
        text: "Right to Rectification: Request correction of inaccurate or incomplete data.",
      },
      {
        type: "info",
        text: "Right to Erasure: Request deletion of your personal data, subject to legal retention obligations.",
      },
      {
        type: "info",
        text: "Right to Restrict Processing: Request limitation of how we use your data.",
      },
      {
        type: "info",
        text: "Right to Data Portability: Receive your data in a structured, commonly used format.",
      },
      {
        type: "info",
        text: "Right to Object: Object to processing based on legitimate interests or for marketing purposes.",
      },
      "California residents may have additional rights under the CCPA/CPRA. [CONFIGURABLE: Include specific CCPA section if RiverLoom has California clients or visitors.] To exercise any of these rights, contact us at contact@riverloom.in. We will respond within the timeframe required by applicable law.",
    ],
  },
  {
    heading: "International Transfers",
    subheading: "Data across borders",
    content: [
      "RiverLoom operates globally. Your personal information may be transferred to and processed in countries other than your own, including [CONFIGURABLE: India, United States, United Kingdom, European Union]. Where we transfer data across borders, we implement appropriate safeguards:",
      {
        type: "note",
        text: "Standard Contractual Clauses (SCCs) approved by the European Commission, where required.",
      },
      {
        type: "note",
        text: "Data Processing Agreements with all third-party service providers.",
      },
      {
        type: "note",
        text: "Transfer Impact Assessments where required by applicable regulations.",
      },
      "[CONFIGURABLE: Specify the exact countries where RiverLoom processes data. The adequacy decisions and SCCs referenced must match RiverLoom's actual data flows.]",
    ],
  },
  {
    heading: "Children's Privacy",
    subheading: "Protecting minors",
    content: [
      "Our services are not directed to individuals under the age of 16. We do not knowingly collect personal information from children. If you believe a child has provided us with personal data, please contact us immediately and we will take steps to delete that information.",
      "[CONFIGURABLE: Update the minimum age if RiverLoom's services are used by younger audiences (e.g., educational products like VisiLearn may require a different age threshold depending on jurisdiction.)]",
    ],
  },
  {
    heading: "Changes to This Policy",
    subheading: "Staying informed",
    content: [
      "We may update this Privacy Policy from time to time to reflect changes in our practices, technology, legal requirements, or operational needs. When we make material changes, we will notify you by:",
      {
        type: "note",
        text: "Posting the updated policy on this page with a revised \"Last Updated\" date.",
      },
      {
        type: "note",
        text: "Sending a notification via email (for active clients) or through a website notice.",
      },
      "We encourage you to review this policy periodically. Your continued use of our services after changes take effect constitutes acceptance of the updated policy.",
    ],
  },
  {
    heading: "Contact Us",
    subheading: "We're here to help",
    content: [
      "If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us:",
      {
        type: "info",
        text: "Email: contact@riverloom.in",
      },
      {
        type: "info",
        text: "Response Time: We aim to respond within 48 hours during business days.",
      },
      {
        type: "info",
        text: "Business Hours: Monday–Friday, 9:00 AM – 6:00 PM [CONFIGURABLE: Specify timezone]",
      },
      "You also have the right to lodge a complaint with your local data protection authority if you believe we have violated applicable privacy laws. [CONFIGURABLE: Specify the relevant supervisory authority based on RiverLoom's primary jurisdiction.]",
    ],
  },
];

/* ═══════════════════════════════════════════════════════════
   TERMS & CONDITIONS SECTIONS
   ═══════════════════════════════════════════════════════════ */

export const TERMS_SECTIONS: LegalSectionContent[] = [
  {
    heading: "Overview",
    subheading: "Introduction to these terms",
    content: [
      "Welcome to RiverLoom. These Terms & Conditions (\"Terms\") govern your access to and use of RiverLoom's website, services, and products. By accessing our website or engaging our services, you agree to be bound by these Terms.",
      "RiverLoom is a software engineering and AI solutions studio. Our services include custom software development, AI/ML solutions, UI/UX design, consulting, and related digital services.",
      'If you are entering into an agreement on behalf of a company or other legal entity, you represent that you have the authority to bind that entity to these Terms. If you do not have such authority, you must not accept these Terms.',
    ],
  },
  {
    heading: "Acceptance of Terms",
    subheading: "When these terms apply",
    content: [
      "By using our website, inquiring about our services, or signing a project agreement with RiverLoom, you acknowledge that you have read, understood, and agree to these Terms.",
      "These Terms apply to all visitors, users, and clients. Additional terms may apply to specific projects via a Statement of Work (SOW), which takes precedence over these general Terms in case of conflict.",
      'If you do not agree with any part of these Terms, you must discontinue use of our website and services immediately.',
    ],
  },
  {
    heading: "Services",
    subheading: "What we deliver",
    content: [
      "RiverLoom provides the following core services:",
      {
        type: "info",
        text: "Custom Software Development: Full-stack web, mobile, and desktop applications built with modern architectures.",
      },
      {
        type: "info",
        text: "AI & Machine Learning Solutions: Custom AI models, LLM integrations, computer vision, and intelligent automation.",
      },
      {
        type: "info",
        text: "UI/UX Design: User research, interface design, prototyping, and design systems.",
      },
      {
        type: "info",
        text: "Technical Consulting: Architecture reviews, technology strategy, and engineering advisory.",
      },
      {
        type: "info",
        text: "Digital Products: SaaS platforms, mobile apps, and commercial software products.",
      },
      "The specific scope, deliverables, timeline, and pricing for each engagement are defined in a separate Statement of Work (SOW) or Service Agreement. In the event of any conflict between these Terms and an SOW, the SOW shall govern.",
    ],
  },
  {
    heading: "User Responsibilities",
    subheading: "Your obligations",
    content: [
      "As a client or user of RiverLoom's services, you agree to:",
      {
        type: "note",
        text: "Provide accurate, complete, and timely information necessary for project delivery.",
      },
      {
        type: "note",
        text: "Review and provide feedback on deliverables within agreed review periods.",
      },
      {
        type: "note",
        text: "Make timely payments as specified in your agreement.",
      },
      {
        type: "note",
        text: "Maintain confidentiality of any proprietary information shared during the engagement.",
      },
      {
        type: "note",
        text: "Not use RiverLoom's services for any illegal or unauthorized purpose.",
      },
      "Failure to meet these responsibilities may result in project delays and additional costs, for which RiverLoom shall not be liable.",
    ],
  },
  {
    heading: "Intellectual Property",
    subheading: "Who owns what",
    content: [
      "The ownership of intellectual property depends on the nature of the engagement:",
      {
        type: "info",
        text: "Custom Deliverables: Upon full payment, you own the final deliverables specifically created for your project, including source code, design files, and documentation.",
      },
      {
        type: "info",
        text: "RiverLoom IP: We retain ownership of our pre-existing tools, frameworks, libraries, methodologies, and generalized components not specific to your project.",
      },
      {
        type: "info",
        text: "Third-Party IP: Any third-party software, libraries, or assets used remain under their respective licenses.",
      },
      {
        type: "info",
        text: "Portfolio Rights: We reserve the right to display completed work in our portfolio (with reasonable confidentiality protections).",
      },
      "[CONFIGURABLE: Specific IP terms should be detailed in your Statement of Work. This section is a general overview and does not replace the IP clause in your agreement.]",
    ],
  },
  {
    heading: "Acceptable Use",
    subheading: "How you may use our services",
    content: [
      "You agree to use our services and website only for lawful purposes and in accordance with these Terms. Specifically, you agree not to:",
      {
        headers: ["Activity", "Prohibited", "Consequence"],
        rows: [
          ["Reverse Engineering", "Decompiling or reverse engineering our deliverables beyond license terms", "Service termination"],
          ["Unauthorized Access", "Attempting to access systems or data you are not authorized for", "Legal action"],
          ["Harmful Code", "Introducing malware, viruses, or harmful code", "Immediate termination"],
          ["Misrepresentation", "Misrepresenting your identity or authority to enter agreements", "Void agreement"],
        ],
      },
      {
        type: "warning",
        text: "Any violation of acceptable use may result in immediate suspension of services and legal action.",
      },
    ],
  },
  {
    heading: "Payments & Ownership",
    subheading: "Financial terms",
    content: [
      "Payment terms are specified in each project's SOW or agreement. General policies include:",
      {
        type: "note",
        text: "Invoicing: Invoices are issued according to the schedule in your agreement (typically milestone-based or monthly).",
      },
      {
        type: "note",
        text: "Payment Terms: Net [CONFIGURABLE: 15/30] days unless otherwise specified.",
      },
      {
        type: "note",
        text: "Ownership Transfer: Ownership of deliverables transfers upon full payment for that deliverable.",
      },
      {
        type: "note",
        text: "Late Payments: We reserve the right to pause work on overdue accounts. Late payment fees of [CONFIGURABLE: 1–2%] per month may apply.",
      },
      "[CONFIGURABLE: Payment terms should be customized per project. This section provides a framework; refer to your signed agreement for exact terms.]",
    ],
  },
  {
    heading: "Confidentiality",
    subheading: "Protecting your information",
    content: [
      "Both parties agree to maintain the confidentiality of proprietary information shared during the engagement:",
      {
        type: "info",
        text: "Confidential Information: Includes business plans, technical specifications, source code, financial data, trade secrets, and any information marked as confidential.",
      },
      {
        type: "info",
        text: "Obligations: Each party agrees to use confidential information only for the purpose of the engagement and to protect it with reasonable care.",
      },
      {
        type: "info",
        text: "Exceptions: Information that is publicly known, independently developed, or required to be disclosed by law.",
      },
      "Confidentiality obligations survive termination of the agreement for [CONFIGURABLE: 2–5] years.",
    ],
  },
  {
    heading: "Limitation of Liability",
    subheading: "Our liability cap",
    content: [
      {
        type: "warning",
        text: "Important: This section limits liability. Read it carefully.",
      },
      "To the maximum extent permitted by applicable law:",
      {
        type: "note",
        text: "RiverLoom's total liability for any claim arising from or related to our services is limited to the total amount paid by you for the specific service giving rise to the claim.",
      },
      {
        type: "note",
        text: "Neither party shall be liable for indirect, incidental, consequential, or punitive damages, including lost profits, data loss, or business interruption.",
      },
      {
        type: "note",
        text: "These limitations apply regardless of the theory of liability (contract, tort, negligence, or otherwise) and even if a party has been advised of the possibility of such damages.",
      },
      "[CONFIGURABLE: Some jurisdictions do not allow certain liability limitations. This section should be reviewed by legal counsel to ensure enforceability in relevant jurisdictions.]",
    ],
  },
  {
    heading: "Termination",
    subheading: "Ending the engagement",
    content: [
      "Either party may terminate an agreement under the following conditions:",
      {
        headers: ["Scenario", "Notice Required", "Effect"],
        rows: [
          ["Client termination (convenience)", "[CONFIGURABLE: 14–30 days]", "Pay for completed work; receive deliverables paid for"],
          ["RiverLoom termination (breach)", "[CONFIGURABLE: 7–14 days] cure period", "Client pays for work completed up to termination"],
          ["Immediate termination", "Material breach or illegal activity", "All outstanding payments become due immediately"],
        ],
      },
      "Upon termination, each party must return or destroy the other's confidential information as directed.",
    ],
  },
  {
    heading: "Governing Law",
    subheading: "Jurisdiction",
    content: [
      "[CONFIGURABLE: This section must be customized based on RiverLoom's legal jurisdiction and client locations.]",
      "These Terms shall be governed by and construed in accordance with the laws of [CONFIGURABLE: India / England and Wales / State of Delaware, USA]. The parties submit to the exclusive jurisdiction of the courts of [CONFIGURABLE: New Delhi, India / London, UK / San Francisco, CA, USA].",
      "For clients based in other jurisdictions, the governing law may be specified in the individual SOW or Service Agreement.",
    ],
  },
  {
    heading: "Changes to Terms",
    subheading: "Updates",
    content: [
      "We may update these Terms from time to time. Material changes will be communicated via email (for active clients) or through a website notice. Your continued use of our services after changes take effect constitutes acceptance of the revised Terms.",
      "We encourage you to review these Terms periodically. Previous versions are available upon request.",
    ],
  },
  {
    heading: "Contact",
    subheading: "Get in touch",
    content: [
      "For questions, concerns, or requests regarding these Terms, contact us:",
      {
        type: "info",
        text: "Email: contact@riverloom.in",
      },
      {
        type: "info",
        text: "Response Time: Typically within 48 business hours.",
      },
      {
        type: "info",
        text: "Business Hours: Monday–Friday, 9:00 AM – 6:00 PM [CONFIGURABLE: timezone]",
      },
    ],
  },
];

/* ═══════════════════════════════════════════════════════════
   REFUND POLICY SECTIONS
   ═══════════════════════════════════════════════════════════ */

export const REFUND_SECTIONS: LegalSectionContent[] = [
  {
    heading: "Overview",
    subheading: "Our refund philosophy",
    content: [
      "At RiverLoom, we strive to deliver exceptional value in every engagement. Our refund policy is designed to be fair and transparent — protecting both our clients and our team.",
      "Because our services range from custom software development to AI solutions and SaaS products, refund terms vary by service type. The following sections outline these differences clearly.",
      "[CONFIGURABLE: This policy is a framework for discussion. Specific refund terms must be documented in your signed agreement and may differ from the general guidance below.]",
    ],
  },
  {
    heading: "Software Development Services",
    subheading: "Custom projects",
    content: [
      "For custom software development projects, our work is structured in milestones:",
      {
        type: "info",
        text: "Discovery & Planning: Payments for the discovery phase are non-refundable once the discovery report has been delivered and presented.",
      },
      {
        type: "info",
        text: "Development Milestones: Each completed milestone is invoiced upon acceptance. Accepted milestones are non-refundable.",
      },
      {
        type: "info",
        text: "Unused Prepaid Time: If you have prepaid for a block of development hours that have not been used, you may be eligible for a refund of the unused amount minus an administrative fee of [CONFIGURABLE: 10–15%].",
      },
      "Refund eligibility for custom development is assessed on a case-by-case basis considering the work completed, resources allocated, and any third-party costs incurred.",
    ],
  },
  {
    heading: "Consulting & Strategy",
    subheading: "Advisory engagements",
    content: [
      "Consulting and strategy engagements typically involve significant upfront preparation and research:",
      {
        type: "note",
        text: "Cancellation within [CONFIGURABLE: 5] business days of booking: Full refund minus a [CONFIGURABLE: 5%] processing fee.",
      },
      {
        type: "note",
        text: "Cancellation after [CONFIGURABLE: 5] business days but before the session: [CONFIGURABLE: 50%] refund.",
      },
      {
        type: "note",
        text: "After the session has been delivered: No refund is available.",
      },
    ],
  },
  {
    heading: "UI/UX Design",
    subheading: "Design services",
    content: [
      "Design engagements follow a phased approach similar to development:",
      {
        type: "info",
        text: "Research & Discovery: Non-refundable once the research phase is complete and findings have been presented.",
      },
      {
        type: "info",
        text: "Design Iterations: Refunds are not available for completed design rounds that have been accepted.",
      },
      {
        type: "info",
        text: "Final Deliverables: Once the final design package has been delivered and accepted, no refund applies.",
      },
    ],
  },
  {
    heading: "AI Solutions",
    subheading: "Machine learning and AI engagements",
    content: [
      "AI solution engagements involve significant upfront research, data preparation, and model experimentation:",
      {
        type: "warning",
        text: "AI engagements are generally non-refundable after the initial discovery and feasibility phase has been completed, due to the intensive research nature of the work.",
      },
      {
        type: "note",
        text: "Before Discovery Phase: Cancellation is eligible for a full refund minus a [CONFIGURABLE: 10%] administrative fee.",
      },
      {
        type: "note",
        text: "After Discovery Phase: No refund is available, as significant work has already been invested in understanding your requirements and data.",
      },
      {
        type: "note",
        text: "Model Development: Milestone-based with each completed milestone non-refundable upon acceptance.",
      },
    ],
  },
  {
    heading: "Digital Products & SaaS",
    subheading: "Commercial software",
    content: [
      "For our commercial digital products and SaaS offerings:",
      {
        headers: ["Product Type", "Refund Window", "Refund Terms"],
        rows: [
          ["SaaS Monthly Subscription", "[CONFIGURABLE: 7–14] days", "Full refund for first billing period if requested within window"],
          ["SaaS Annual Plan", "[CONFIGURABLE: 30] days", "Prorated refund minus [CONFIGURABLE: 15%] admin fee"],
          ["One-time Digital Product", "[CONFIGURABLE: 14] days", "Full refund if product is defective or not as described"],
          ["Custom Integration", "Varies", "Milestone-based, same as custom development"],
        ],
      },
      {
        type: "info",
        text: "SaaS refunds are processed after verifying usage. Refunds may be prorated based on actual usage during the billing period.",
      },
    ],
  },
  {
    heading: "Mobile Applications",
    subheading: "App development",
    content: [
      "Mobile application development follows the same milestone structure as general software development:",
      {
        type: "note",
        text: "Platform-Specific Work: iOS and Android development work is billed separately and non-refundable once completed.",
      },
      {
        type: "note",
        text: "App Store Submission: Fees associated with app store submissions and third-party services are non-refundable.",
      },
      {
        type: "note",
        text: "Post-Launch Support: Prepaid support retainers are refundable on a prorated basis for unused time.",
      },
    ],
  },
  {
    heading: "Partial & Milestone Refunds",
    subheading: "When partial refunds apply",
    content: [
      "Partial refunds may be available in specific circumstances:",
      {
        type: "info",
        text: "Project Cancellation: If you cancel a project mid-stream, you receive ownership of all completed and accepted work. Refunds for unstarted or incomplete milestones may be available.",
      },
      {
        type: "info",
        text: "Scope Reduction: If the project scope is significantly reduced after work begins, a partial refund may be negotiated.",
      },
      {
        type: "info",
        text: "Quality Issues: If deliverables do not meet the specifications defined in your agreement, we will remediate at no additional cost. If remediation is not possible, a partial refund may be considered.",
      },
      "All partial refunds are subject to a [CONFIGURABLE: administrative/handling fee of 5–15%].",
    ],
  },
  {
    heading: "Exceptions",
    subheading: "When refunds are not available",
    content: [
      "Refunds are generally not available in the following situations:",
      {
        type: "warning",
        text: "Completed Milestones: Work that has been delivered, reviewed, and accepted is non-refundable.",
      },
      {
        type: "warning",
        text: "Third-Party Costs: Fees paid to third-party vendors, app stores, or service providers on your behalf.",
      },
      {
        type: "warning",
        text: "Custom Research: AI/ML research work that has been presented and accepted.",
      },
      {
        type: "warning",
        text: "Change of Mind: We do not offer refunds for change of mind after work has commenced.",
      },
    ],
  },
  {
    heading: "Refund Process",
    subheading: "How to request a refund",
    content: [
      "To request a refund:",
      {
        type: "note",
        text: "1. Email us at contact@riverloom.in with your project details and reason for the refund request.",
      },
      {
        type: "note",
        text: "2. Include your project name, invoice numbers, and any relevant documentation.",
      },
      {
        type: "note",
        text: "3. Our team will review your request within [CONFIGURABLE: 5–7] business days and respond with a decision.",
      },
      {
        type: "note",
        text: "4. If approved, refunds are processed within [CONFIGURABLE: 5–14] business days to the original payment method.",
      },
      "We aim to resolve all refund requests fairly and promptly.",
    ],
  },
  {
    heading: "Contact",
    subheading: "Refund inquiries",
    content: [
      "For all refund-related inquiries:",
      {
        type: "info",
        text: "Email: contact@riverloom.in",
      },
      {
        type: "info",
        text: "Response Time: Within [CONFIGURABLE: 5–7] business days.",
      },
      {
        type: "info",
        text: "Business Hours: Monday–Friday, 9:00 AM – 6:00 PM [CONFIGURABLE: timezone]",
      },
    ],
  },
];

/* ═══════════════════════════════════════════════════════════
   CANCELLATION POLICY SECTIONS
   ═══════════════════════════════════════════════════════════ */

export const CANCELLATION_SECTIONS: LegalSectionContent[] = [
  {
    heading: "Overview",
    subheading: "Our cancellation approach",
    content: [
      "RiverLoom aims to maintain flexible and fair cancellation terms. We understand that circumstances change, and we strive to accommodate our clients while protecting our team's time and resources.",
      "This policy covers cancellations initiated by the client, cancellations initiated by RiverLoom, and subscription cancellations. Specific terms from your signed agreement take precedence.",
      "[CONFIGURABLE: This policy should be reviewed alongside your signed Service Agreement or SOW for exact cancellation terms.]",
    ],
  },
  {
    heading: "Client Cancellation",
    subheading: "You initiate cancellation",
    content: [
      "You may cancel a project or engagement at any time by providing written notice. The consequences depend on the project stage:",
      {
        headers: ["Stage", "Notice Required", "Financial Impact"],
        rows: [
          ["Pre-Discovery (before work begins)", "[CONFIGURABLE: 3–5] business days", "Full refund of any prepaid amounts minus [CONFIGURABLE: 5–10%] processing fee"],
          ["During Discovery Phase", "Immediate written notice", "Discovery fees already incurred are non-refundable"],
          ["Active Development", "[CONFIGURABLE: 14–30] days", "Pay for completed milestones; unused prepaid time refunded minus admin fee"],
          ["Post-Launch / Maintenance", "[CONFIGURABLE: 30] days", "Prorated refund for unused prepaid maintenance hours"],
        ],
      },
      {
        type: "info",
        text: "Written notice should be sent to contact@riverloom.in with the subject line \"Project Cancellation: [Project Name].\"",
      },
    ],
  },
  {
    heading: "RiverLoom Cancellation",
    subheading: "When we need to cancel",
    content: [
      "RiverLoom reserves the right to cancel a project or engagement under the following circumstances:",
      {
        type: "note",
        text: "Non-Payment: If invoices remain unpaid for more than [CONFIGURABLE: 30–60] days past due, we may suspend or cancel the project with [CONFIGURABLE: 7] days written notice.",
      },
      {
        type: "note",
        text: "Material Breach: If the client violates material terms (confidentiality, IP, acceptable use), we may cancel immediately.",
      },
      {
        type: "note",
        text: "Unforeseen Circumstances: In rare cases where we determine we can no longer deliver the agreed scope due to technical or resource constraints, we will provide [CONFIGURABLE: 30] days notice and work to transition the project smoothly.",
      },
      "In the event of RiverLoom-initiated cancellation (except for client breach), we will refund any prepaid amounts for work not yet completed.",
    ],
  },
  {
    heading: "Subscription Cancellation",
    subheading: "SaaS and recurring services",
    content: [
      "For subscription-based services (SaaS, retainers, support plans):",
      {
        type: "info",
        text: "Monthly Subscriptions: May be cancelled at any time. The subscription remains active until the end of the current billing period. No partial-month refunds apply.",
      },
      {
        type: "info",
        text: "Annual Subscriptions: Early cancellation may be eligible for a prorated refund of the unused portion, minus a [CONFIGURABLE: 15–25%] early termination fee.",
      },
      {
        type: "info",
        text: "Support Retainers: Prepaid support retainers may be cancelled with [CONFIGURABLE: 30] days notice. Unused hours are refundable on a prorated basis.",
      },
      "Subscription cancellations take effect at the end of the current billing cycle unless otherwise agreed.",
    ],
  },
  {
    heading: "Notice Periods",
    subheading: "Timelines for cancellation",
    content: [
      "Required notice periods vary by service type:",
      {
        headers: ["Service Type", "Notice Period", "Method"],
        rows: [
          ["Custom Development Project", "[CONFIGURABLE: 14–30] days", "Written email notice"],
          ["Consulting Engagement", "[CONFIGURABLE: 7–14] days", "Written email notice"],
          ["SaaS Subscription (Monthly)", "End of current billing period", "In-app or email"],
          ["SaaS Subscription (Annual)", "[CONFIGURABLE: 30] days before renewal", "Email notice"],
          ["Support Retainer", "[CONFIGURABLE: 30] days", "Written email notice"],
        ],
      },
      "Notice periods may be waived or reduced at RiverLoom's discretion.",
    ],
  },
  {
    heading: "Completed Work & Payments",
    subheading: "Financial settlement",
    content: [
      "Upon cancellation, all completed and accepted work up to the cancellation date must be paid for:",
      {
        type: "note",
        text: "You retain ownership of all deliverables that have been fully paid for.",
      },
      {
        type: "note",
        text: "Work in progress that has been partially completed may be delivered in its current state (as-is) but remains subject to payment for the portion completed.",
      },
      {
        type: "note",
        text: "Any outstanding invoices become due immediately upon cancellation.",
      },
      {
        type: "note",
        text: "Prepaid amounts for work not yet started will be refunded as per the terms above.",
      },
    ],
  },
  {
    heading: "Ownership of Deliverables",
    subheading: "Who keeps what",
    content: [
      {
        type: "info",
        text: "Paid Deliverables: You retain full ownership of all work that has been completed, accepted, and paid for at the time of cancellation.",
      },
      {
        type: "info",
        text: "Partial Work: Unfinished work that is not yet accepted may be delivered as-is but may not be fit for production use.",
      },
      {
        type: "info",
        text: "RiverLoom IP: We retain ownership of our tools, libraries, and methodologies (as defined in the Intellectual Property section of our Terms & Conditions).",
      },
      {
        type: "info",
        text: "Confidential Information: Both parties must return or destroy confidential information upon termination as specified in your agreement.",
      },
    ],
  },
  {
    heading: "Termination Procedure",
    subheading: "Steps for cancellation",
    content: [
      "To ensure a smooth cancellation process, follow these steps:",
      {
        type: "note",
        text: "1. Send a written cancellation notice to contact@riverloom.in with the subject \"Project Cancellation: [Project Name].\"",
      },
      {
        type: "note",
        text: "2. Include the effective date of cancellation and any relevant context.",
      },
      {
        type: "note",
        text: "3. Our team will acknowledge receipt within [CONFIGURABLE: 2–3] business days and coordinate next steps.",
      },
      {
        type: "note",
        text: "4. We will provide a final invoice or refund statement within [CONFIGURABLE: 7–10] business days.",
      },
      {
        type: "note",
        text: "5. Upon final settlement, we will transfer all completed deliverables and documentation.",
      },
      "Both parties are expected to cooperate in good faith during the transition.",
    ],
  },
  {
    heading: "Contact",
    subheading: "Cancellation inquiries",
    content: [
      "For questions or to initiate a cancellation:",
      {
        type: "info",
        text: "Email: contact@riverloom.in",
      },
      {
        type: "info",
        text: "Response Time: Within [CONFIGURABLE: 2–3] business days.",
      },
      {
        type: "info",
        text: "Business Hours: Monday–Friday, 9:00 AM – 6:00 PM [CONFIGURABLE: timezone]",
      },
    ],
  },
];
