export interface ServiceItem {
  id: string;
  title: string;
  category: "Web & Digital" | "Software & SaaS" | "Marketing & Ads" | "AI & Automation";
  shortDescription: string;
  fullDescription: string;
  iconName: string;
  deliverables: string[];
  technologies: string[];
  benefits: string[];
  badge?: string;
}

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: "website-development",
    title: "Website Development",
    category: "Web & Digital",
    shortDescription:
      "Lightning-fast, conversion-focused websites engineered with semantic HTML5, modern frameworks, and responsive design standards.",
    fullDescription:
      "We design and build clean, accessible, and ultra-performant websites tailored for high-growth businesses. From corporate brand hubs to marketing microsites, every site is crafted for instantaneous load speeds, flawless responsiveness across all screen dimensions, and maximum conversion rates.",
    iconName: "Globe",
    deliverables: [
      "Custom responsive layouts for desktop, tablet & mobile",
      "Semantic HTML5 structure optimized for SEO accessibility",
      "Core Web Vitals score optimization (95+ Lighthouse)",
      "Headless CMS integration (Sanity, Strapi, Contentful)",
      "Analytics & event tracking setup",
    ],
    technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Vercel"],
    benefits: [
      "Sub-second page loads that reduce bounce rates",
      "Consistent cross-browser performance",
      "Intuitive content editing workflows",
    ],
    badge: "Core Service",
  },
  {
    id: "custom-website-development",
    title: "Custom Website Development",
    category: "Web & Digital",
    shortDescription:
      "Bespoke web architectures tailored specifically to your unique workflows, API integrations, and brand identity.",
    fullDescription:
      "When off-the-shelf templates cannot satisfy your unique business operations, our custom website development delivers tailor-made digital engines. We build interactive calculators, customer portals, customized booking flows, and deeply integrated platforms that align with your exact operational requirements.",
    iconName: "Code2",
    deliverables: [
      "Bespoke UI/UX design and component system",
      "Complex interactive workflows & user dashboards",
      "Third-party REST & GraphQL API integrations",
      "Role-based authentication and secure member areas",
      "Scalable cloud deployment & automated CI/CD",
    ],
    technologies: ["Next.js", "Node.js", "PostgreSQL", "Tailwind CSS", "Prisma"],
    benefits: [
      "100% tailor-made to your business process",
      "Zero bloat or unnecessary third-party plugins",
      "Long-term scalability without platform lock-in",
    ],
    badge: "Tailored Solutions",
  },
  {
    id: "ecommerce-website-development",
    title: "Ecommerce Website Development",
    category: "Web & Digital",
    shortDescription:
      "High-converting storefronts with streamlined checkout funnels, inventory syncing, and frictionless payment processing.",
    fullDescription:
      "Turn casual browsers into loyal repeat buyers. We build high-converting ecommerce platforms featuring rapid catalog search, frictionless one-page checkouts, automated tax & shipping calculations, multi-currency support, and seamless omnichannel ERP/CRM inventory sync.",
    iconName: "ShoppingBag",
    deliverables: [
      "Frictionless checkout UX with Apple Pay, Google Pay & Stripe",
      "Real-time inventory and catalog management",
      "Advanced faceted search and product filtering",
      "Automated transactional emails & SMS notifications",
      "Abandoned cart recovery flows & conversion rate optimization",
    ],
    technologies: ["Shopify Plus", "Next.js Commerce", "Stripe", "MedusaJS", "Tailwind CSS"],
    benefits: [
      "Higher average order value (AOV)",
      "Frictionless mobile checkout experiences",
      "Automated stock and order fulfillment synchronization",
    ],
  },
  {
    id: "website-redesign",
    title: "Website Redesign",
    category: "Web & Digital",
    shortDescription:
      "Strategic modernization of outdated sites to revamp UX, enhance conversion rates, and elevate modern brand authority.",
    fullDescription:
      "Modernize your digital presence without risking hard-earned SEO authority. Our website redesign methodology conducts comprehensive technical audits, preserves URL architecture with 301 mapping, eliminates tech debt, and rebuilds your brand identity into a sleek, contemporary experience.",
    iconName: "RefreshCw",
    deliverables: [
      "Full technical SEO & content equity audit",
      "Contemporary, minimalist UI design system",
      "Flawless 301 redirect mapping preventing organic rank loss",
      "Page speed and responsive mobile overhaul",
      "Accessibility (WCAG AA) compliance upgrade",
    ],
    technologies: ["Next.js", "Figma", "Tailwind CSS", "Semantic HTML5", "SEO Tooling"],
    benefits: [
      "Retain organic search rankings while refreshing the brand",
      "Elevated brand perception among enterprise buyers",
      "Dramatically reduced load times and bounce rates",
    ],
  },
  {
    id: "software-development",
    title: "Software Development",
    category: "Software & SaaS",
    shortDescription:
      "Enterprise-grade, modular software engineering built for security, high throughput, and seamless operational scaling.",
    fullDescription:
      "We engineer custom enterprise software solutions designed to solve intricate organizational bottlenecks. From internal operational portals to data management platforms, our software combines clean architecture, automated testing, robust API endpoints, and rock-solid cloud infrastructure.",
    iconName: "Cpu",
    deliverables: [
      "Microservices & modular monolith cloud architectures",
      "Strict data modeling, schema migrations & ORM layer",
      "Comprehensive unit, integration, and end-to-end test suites",
      "Enterprise security audits, encryption & OAuth/SSO",
      "Automated monitoring, logging & error tracing",
    ],
    technologies: ["TypeScript", "Node.js", "Python", "PostgreSQL", "Docker", "AWS"],
    benefits: [
      "Eliminates repetitive manual workflows",
      "High availability and 99.9% uptime architecture",
      "Full IP ownership with clean, documented code",
    ],
    badge: "Enterprise Grade",
  },
  {
    id: "saas-product-development",
    title: "SaaS Product Development",
    category: "Software & SaaS",
    shortDescription:
      "End-to-end multi-tenant SaaS architecture, recurring subscription billing, user onboarding, and scalable cloud engines.",
    fullDescription:
      "Take your software product from idea to recurring revenue. We partner with visionaries and established enterprises to build market-ready SaaS applications with robust multi-tenant data isolation, Stripe billing tiers, self-serve onboarding, analytics, and role-based permissions.",
    iconName: "Layers",
    deliverables: [
      "Multi-tenant architecture with tenant data isolation",
      "Stripe recurring subscription tiers & usage-based billing",
      "Intuitive self-serve onboarding & product walkthroughs",
      "Customer usage metrics, telemetry, and admin dashboards",
      "Automated CI/CD deployment pipelines on AWS/Vercel",
    ],
    technologies: ["Next.js", "React", "Node.js", "Stripe Billing", "Supabase", "Tailwind CSS"],
    benefits: [
      "Rapid time-to-market for MVP and feature iterations",
      "Predictable infrastructure scaling as user base grows",
      "Delightful customer onboarding that boosts trial conversion",
    ],
    badge: "Full Lifecycle",
  },
  {
    id: "mobile-app-development",
    title: "Mobile App Development",
    category: "Software & SaaS",
    shortDescription:
      "Native and cross-platform iOS & Android mobile applications engineered for smooth 60fps performance and offline resilience.",
    fullDescription:
      "Deliver intuitive mobile experiences your customers love. We build cross-platform mobile apps for iOS and Android utilizing modern frameworks that ensure a single unified codebase, 60fps animations, biometric authentication, push notifications, and offline data synchronization.",
    iconName: "Smartphone",
    deliverables: [
      "Native iOS & Android compilation from a unified codebase",
      "Biometric security (FaceID / Fingerprint) & Apple/Google sign-in",
      "Push notification systems with segmentation targeting",
      "Offline-first data caching and seamless sync",
      "App Store & Google Play Store submission & compliance handling",
    ],
    technologies: ["React Native", "Expo", "TypeScript", "Tailwind (NativeWind)", "Firebase"],
    benefits: [
      "Up to 50% faster delivery than separate native codebases",
      "Fluid, responsive native feel on both iOS and Android",
      "Reliable offline functionality for on-the-go users",
    ],
  },
  {
    id: "facebook-google-ads",
    title: "Facebook & Google Ads",
    category: "Marketing & Ads",
    shortDescription:
      "Data-driven paid media campaigns engineered with full-funnel tracking, audience segmentation, and high-converting landing pages.",
    fullDescription:
      "Stop wasting ad spend on vanity metrics. Smarter World's performance marketing team combines technical conversion tracking (Meta CAPI & Google Offline Conversions), high-intent keyword targeting, dynamic creative testing, and bespoke landing pages to produce measurable customer acquisition ROI.",
    iconName: "Target",
    deliverables: [
      "Advanced Google Search, Performance Max, and Display setups",
      "Meta Ads (Facebook & Instagram) audience testing & creative matrix",
      "Server-side tracking (Meta Conversions API & GA4)",
      "High-velocity A/B testing of ad copy & bespoke landing pages",
      "Weekly transparent ROI, CPA, and ROAS reporting dashboard",
    ],
    technologies: ["Google Ads", "Meta Business Suite", "Google Analytics 4", "GTM Server-Side", "Looker Studio"],
    benefits: [
      "Lower Cost Per Acquisition (CPA) and higher qualified lead volume",
      "Resilient conversion tracking immune to iOS privacy blockades",
      "Continuous optimization based on actual bottom-line revenue",
    ],
    badge: "High ROI",
  },
  {
    id: "ai-integration",
    title: "AI Integration",
    category: "AI & Automation",
    shortDescription:
      "Embed state-of-the-art LLMs, semantic vector search, and intelligent APIs seamlessly into your existing apps and workflows.",
    fullDescription:
      "Enhance your current software ecosystem with intelligent capabilities. We integrate enterprise OpenAI, Claude, Gemini, and open-source models directly into your databases, CRM, and web applications, enabling contextual semantic search, document Q&A, and smart content generation.",
    iconName: "Sparkles",
    deliverables: [
      "Vector embeddings & semantic retrieval (Pinecone, pgvector, Qdrant)",
      "Enterprise LLM pipeline orchestration (OpenAI, Claude, Gemini)",
      "Retrieval-Augmented Generation (RAG) over company knowledge bases",
      "Automated document summarization & categorization APIs",
      "Privacy-first token usage limits, caching, and PII anonymization",
    ],
    technologies: ["OpenAI API", "Anthropic Claude", "Gemini", "LangChain", "Pinecone", "pgvector"],
    benefits: [
      "Extract instant value from unstructured organizational data",
      "Zero need to rebuild existing software from scratch",
      "Strict data privacy controls ensuring your data is never trained on",
    ],
    badge: "AI Powered",
  },
  {
    id: "ai-automation",
    title: "AI Automation",
    category: "AI & Automation",
    shortDescription:
      "Intelligent process automation that eliminates manual data entry, routes complex customer tickets, and orchestrates workflows.",
    fullDescription:
      "Supercharge operational efficiency by replacing repetitive administrative tasks with automated intelligence. We design end-to-end automation pipelines that ingest unstructured emails, extract invoice line items, synchronize across CRM/ERP, and trigger business actions with zero human delay.",
    iconName: "Workflow",
    deliverables: [
      "Automated document, PDF & invoice data extraction",
      "Multi-system workflow orchestration (HubSpot, Salesforce, Slack, ERP)",
      "Intelligent email triage and auto-draft responses",
      "Error detection, fallback alerts, and human-in-the-loop review",
      "Continuous process telemetry and audit logging",
    ],
    technologies: ["Make", "n8n", "Zapier", "Python", "OpenAI", "Node.js"],
    benefits: [
      "Saves hundreds of manual hours every month",
      "Near 0% transcription and data entry errors",
      "Instant 24/7 turnaround for operational requests",
    ],
    badge: "Efficiency Boost",
  },
  {
    id: "ai-agent-automation",
    title: "AI Agent Automation",
    category: "AI & Automation",
    shortDescription:
      "Autonomous, multi-agent AI systems capable of executing multi-step reasoning, customer support, and sales outreach around the clock.",
    fullDescription:
      "The next frontier of digital agency engineering. We construct autonomous AI agents equipped with tool-use capabilities, long-term memory, and self-correcting reasoning loops. These agents research leads, execute multi-step customer inquiries, verify CRM data, and proactively accomplish goals without micromanagement.",
    iconName: "Bot",
    deliverables: [
      "Autonomous 24/7 AI Customer Support & SDR qualification agents",
      "Multi-agent collaborative loops with specialized role division",
      "Tool calling integrations (SQL databases, REST APIs, Web Browsing)",
      "Persistent memory management and conversational guardrails",
      "Real-time human oversight dashboard and intervention triggers",
    ],
    technologies: ["LangGraph", "AutoGPT", "CrewAI", "Next.js", "Vector DB", "FastAPI"],
    benefits: [
      "Instant response times to inbound leads at any hour",
      "Handles 80%+ of repetitive tier-1 customer inquiries autonomously",
      "Exponential scalability without linear headcount expansion",
    ],
    badge: "Cutting-Edge",
  },
];

export const CATEGORIES = [
  "All",
  "Web & Digital",
  "Software & SaaS",
  "AI & Automation",
  "Marketing & Ads",
] as const;

export const CASE_STUDIES = [
  {
    client: "Finova Capital",
    service: "Custom SaaS & AI Automation",
    title: "Automating Loan Processing & Underwriting Platform",
    metric: "84% faster processing",
    description:
      "Architected a Next.js multi-tenant underwriting portal with automated document parsing and AI risk analysis, cutting approval cycles from 4 days to 45 minutes.",
    technologies: ["Next.js", "TypeScript", "OpenAI", "PostgreSQL", "Tailwind CSS"],
  },
  {
    client: "Apex Athletics",
    service: "Ecommerce Website & Performance Ads",
    title: "High-Performance Headless Storefront & Funnel Scale",
    metric: "3.4x revenue uplift",
    description:
      "Redesigned the brand's digital commerce experience with sub-second page transitions and targeted Meta & Google Ads campaigns, increasing checkout conversions by 42%.",
    technologies: ["Next.js Commerce", "Shopify", "Tailwind CSS", "Meta CAPI", "Google Ads"],
  },
  {
    client: "OmniHealth Logistics",
    service: "AI Agent Automation",
    title: "Autonomous Dispatch & Patient Scheduling Agent",
    metric: "92% automated resolutions",
    description:
      "Deployed autonomous multi-agent systems connected to medical scheduling APIs, resolving patient routing and dispatch inquiries 24/7 with zero human intervention required.",
    technologies: ["LangGraph", "Python", "Next.js", "Twilio", "FastAPI"],
  },
];

export const STATS = [
  { value: "150+", label: "Projects Delivered", detail: "Across Web, SaaS & AI" },
  { value: "99.4%", label: "Client Satisfaction", detail: "Long-term partnership focus" },
  { value: "3.8x", label: "Average ROI Uplift", detail: "Measured client impact" },
  { value: "24/7", label: "AI Agent Availability", detail: "Continuous intelligent operations" },
];

export const TESTIMONIALS = [
  {
    quote:
      "Smarter World revolutionized our digital presence. They rebuilt our core web platform with Next.js and implemented AI automated lead scoring that immediately boosted our sales qualified leads by 180%. Truly world-class engineers.",
    author: "Elena Vance",
    role: "VP of Product",
    company: "CloudSphere Technologies",
    avatar: "EV",
  },
  {
    quote:
      "Unlike traditional agencies that push cookie-cutter templates, Smarter World understands modern software engineering and autonomous AI agents. Their work on our multi-tenant SaaS platform was flawless.",
    author: "Marcus Sterling",
    role: "Founder & CEO",
    company: "ScaleFlow Systems",
    avatar: "MS",
  },
  {
    quote:
      "Their execution on our Google and Meta ad campaigns combined with custom landing pages brought our CPA down by 47% in the first quarter alone. Highly recommended.",
    author: "Sarah Jenkins",
    role: "Chief Marketing Officer",
    company: "Lumina Retail Group",
    avatar: "SJ",
  },
];

export const PROCESS_STEPS = [
  {
    step: "01",
    title: "Discovery & Architecture",
    description:
      "We unpack your business objectives, analyze user personas, map technical constraints, and define a clear roadmap with deterministic milestones.",
  },
  {
    step: "02",
    title: "Engineering & Integration",
    description:
      "Our senior team builds clean, maintainable, TypeScript-driven applications and integrates intelligent AI models or paid marketing engines.",
  },
  {
    step: "03",
    title: "Testing & Quality Assurance",
    description:
      "Rigorous cross-device responsiveness checks, WCAG accessibility validation, automated end-to-end testing, and Core Web Vitals optimization.",
  },
  {
    step: "04",
    title: "Launch, Scale & Automation",
    description:
      "Smooth zero-downtime deployment, continuous monitoring, and ongoing AI agent refinement to ensure sustainable compounding growth.",
  },
];
