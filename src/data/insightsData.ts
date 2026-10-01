export interface Author {
  name: string;
  role: string;
  avatar: string;
}

export interface MetricHighlight {
  label: string;
  value: string;
}

export interface TechnicalSection {
  heading: string;
  content: string[];
  codeSnippet?: string;
  codeLanguage?: string;
}

export type InsightArticleCategory = "AI & Automation" | "Web & Performance" | "SaaS & Architecture" | "Growth & Ads" | "UI/UX & Design";

export interface InsightItem {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  category: InsightArticleCategory;
  readTime: string;
  date: string;
  featured?: boolean;
  image: string;
  imageAlt?: string;
  summary: string;
  author: Author;
  tags: string[];
  metrics: MetricHighlight[];
  executiveTakeaways: string[];
  sections: TechnicalSection[];
  stack: string[];
}

export interface WhitepaperItem {
  id: string;
  title: string;
  category: string;
  pages: string;
  readTime: string;
  format: string;
  description: string;
  highlights: string[];
  badge: string;
}

export interface BenchmarkStat {
  metric: string;
  conventional: string;
  acovate: string;
  improvement: string;
  description: string;
}

export const INSIGHT_CATEGORIES = [
  "All",
  "AI & Automation",
  "Web & Performance",
  "SaaS & Architecture",
  "Growth & Ads",
  "UI/UX & Design",
] as const;

export type InsightCategory = (typeof INSIGHT_CATEGORIES)[number];

export const INSIGHTS_DATA: InsightItem[] = [
  {
    id: "autonomous-multi-agent-architectures",
    slug: "autonomous-multi-agent-architectures",
    title: "Autonomous Multi-Agent Architectures: Moving Beyond Simple LLM Wrappers",
    subtitle:
      "How to architect deterministic state machines, supervisor routers, and fault-tolerant tool-calling pipelines for mission-critical enterprise workflows.",
    category: "AI & Automation",
    readTime: "7 min read",
    date: "Sep 2026",
    featured: true,
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Autonomous multi-agent neural network architecture",
    summary:
      "Simple prompt chains fail when faced with real-world enterprise edge cases. This architecture breakdown explores how our engineering team builds deterministic multi-agent graphs with LangGraph, isolated sandbox executors, and recursive self-correcting validation loops that maintain 99.8% execution accuracy.",
    author: {
      name: "Devon Chen",
      role: "Head of AI & Autonomous Systems",
      avatar: "DC",
    },
    tags: ["Autonomous Agents", "LangGraph", "FastAPI", "Tool Calling", "Deterministic AI"],
    metrics: [
      { label: "Execution Accuracy", value: "99.8%" },
      { label: "Token Efficiency Gain", value: "4.2x" },
      { label: "Human Escalation Drop", value: "-84%" },
    ],
    executiveTakeaways: [
      "Linear prompt chaining degrades quickly beyond 3 conversational turns due to context window pollution and hallucination drift.",
      "Deterministic state graphs with explicit supervisor routing enforce strict schemas and guardrails before any external API mutation occurs.",
      "Semantic caching layers combined with local embedding lookups reduce LLM API billing by up to 68% while slashing round-trip latency.",
    ],
    sections: [
      {
        heading: "1. The Failure of Monolithic Agent Prompts",
        content: [
          "Most early-generation AI apps stuffed system prompts with hundreds of instructions, dozens of JSON schemas, and extensive rulebooks. In production, this causes instruction decay, inconsistent reasoning chains, and unexpected hallucinated tool arguments.",
          "Enterprise systems require deterministic boundaries. Rather than having a single general agent attempt triage, database queries, and ticket creation simultaneously, we decouple concerns into specialized, narrow-scope agent nodes orchestrated via a centralized supervisor.",
        ],
        codeSnippet: `// Deterministic State Machine Topology
interface AgentState {
  messages: BaseMessage[];
  currentWorker: "triage" | "data_retriever" | "action_executor" | "validator";
  validatedPayload?: Record<string, unknown>;
  retryCount: number;
}

const workflow = new StateGraph<AgentState>({
  channels: {
    messages: { value: (x, y) => x.concat(y), default: () => [] },
    currentWorker: { value: (x, y) => y ?? x, default: () => "triage" },
  }
});`,
        codeLanguage: "typescript",
      },
      {
        heading: "2. The Supervisor Routing Pattern & Validation Loops",
        content: [
          "In our architecture, the Supervisor agent evaluates user intent and passes execution control exclusively to the appropriate domain agent. Crucially, before any persistent state mutation occurs (such as an order cancellation, refund, or CRM write), an independent Validator node verifies the JSON payload against strict Zod/Pydantic schemas.",
          "If validation fails, the error message is routed back to the executing agent with structured feedback, prompting a self-healing iteration without human intervention.",
        ],
      },
      {
        heading: "3. Semantic Caching & Latency Optimization",
        content: [
          "To achieve sub-second conversational latency, we deploy Redis vector similarity search in front of primary model invocations. If an incoming query has a cosine similarity score >= 0.94 against verified previous queries, the pre-validated answer is returned immediately in under 45ms.",
          "This architecture provides enterprise clients with instant responsiveness while buffering downstream APIs against burst traffic spikes.",
        ],
      },
    ],
    stack: ["TypeScript", "Python", "LangGraph", "FastAPI", "Redis Vector DB", "PostgreSQL"],
  },
  {
    id: "sub-100ms-nextjs-performance",
    slug: "sub-100ms-nextjs-performance",
    title: "Sub-100ms Worldwide: Next.js App Router Edge Optimization Playbook",
    subtitle:
      "Deep architectural teardown of Partial Prerendering, speculative streaming, dynamic cache tags, and asset optimization for enterprise web platforms.",
    category: "Web & Performance",
    readTime: "5 min read",
    date: "Aug 2026",
    featured: false,
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Sub-100ms Next.js Edge optimization server architecture",
    summary:
      "How we engineered the Acovate web platform and client enterprise apps to consistently achieve 100/100 Lighthouse scores, sub-80ms First Contentful Paint, and zero layout shift across global edge networks.",
    author: {
      name: "Marcus Vance",
      role: "Lead Fullstack Architect",
      avatar: "MV",
    },
    tags: ["Next.js 14/15", "Edge Network", "Core Web Vitals", "SSR", "Vercel"],
    metrics: [
      { label: "Lighthouse Performance", value: "100/100" },
      { label: "Global Edge Latency", value: "< 78ms" },
      { label: "Cumulative Layout Shift", value: "0.000" },
    ],
    executiveTakeaways: [
      "Partial Prerendering (PPR) combines static shell instant delivery with streaming dynamic holes for the ultimate user perceived speed.",
      "Granular revalidateTag patterns eliminate wasteful whole-page rebuilds while ensuring content updates propagate globally within 2 seconds.",
      "Zero-runtime CSS via Tailwind coupled with strict font subsetting prevents font flash (FOIT/FOUT) and eradicates CLS.",
    ],
    sections: [
      {
        heading: "1. The Partial Prerendering (PPR) Paradigm",
        content: [
          "Traditional web architectures force a painful compromise: static generation (fast but stale) or dynamic server-side rendering (fresh but high Time-to-First-Byte). With Next.js Partial Prerendering, we deliver the entire page skeleton from CDN edge caches in under 20ms.",
          "Dynamic segments—such as personalized user recommendations, cart counters, and inventory tallies—stream in parallel without blocking initial layout paint.",
        ],
        codeSnippet: `// next.config.mjs configuration
const nextConfig = {
  experimental: {
    ppr: 'incremental',
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 31536000,
  },
};
export default nextConfig;`,
        codeLanguage: "javascript",
      },
      {
        heading: "2. Strategic Cache Tag Invalidation",
        content: [
          "Instead of polling or relying on short TTL headers, we tag every fetch request with entity-specific identifiers (e.g., 'product:1049', 'pricing-matrix'). When content updates occur in CMS or database webhooks, Next.js 'revalidateTag' updates the edge cache instantaneously.",
        ],
      },
    ],
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Vercel Edge", "Cloudflare CDN"],
  },
  {
    id: "engineering-high-velocity-b2b-saas",
    slug: "engineering-high-velocity-b2b-saas",
    title: "Engineering High-Velocity B2B SaaS: Multi-Tenancy & Row-Level Security",
    subtitle:
      "A complete guide to architecting scalable multi-tenant SaaS backends with PostgreSQL RLS, automated billing webhooks, and tenant isolation.",
    category: "SaaS & Architecture",
    readTime: "8 min read",
    date: "Aug 2026",
    featured: false,
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "B2B SaaS multi-tenancy cloud infrastructure",
    summary:
      "When scaling B2B SaaS platforms from 10 to 10,000 corporate accounts, data leaks and query slowdowns represent fatal existential risks. Learn how we enforce database-level tenant isolation using PostgreSQL Row Level Security (RLS) and transaction pooling.",
    author: {
      name: "Sophia Sterling",
      role: "Principal Systems Engineer",
      avatar: "SS",
    },
    tags: ["SaaS Architecture", "PostgreSQL", "Row-Level Security", "Prisma", "Docker"],
    metrics: [
      { label: "Data Leak Vulnerability", value: "0%" },
      { label: "Query Execution P95", value: "14ms" },
      { label: "Concurrent Tenant Capacity", value: "50,000+" },
    ],
    executiveTakeaways: [
      "Application-level 'where tenant_id = ?' clauses eventually fail due to developer oversight; database-level RLS provides absolute tenant boundary guarantees.",
      "Connection pooling with PgBouncer or Supabase pooling prevents PostgreSQL connection exhaustion during tenant traffic bursts.",
      "Idempotent billing webhooks with cryptographic signature verification eliminate duplicate seat activations and missed renewals.",
    ],
    sections: [
      {
        heading: "1. Enforcing Zero-Trust Isolation with PostgreSQL RLS",
        content: [
          "By configuring PostgreSQL policies on every table containing tenant data, the database itself rejects queries that attempt to access rows outside the active transaction's session variable. Even if an API endpoint has an SQL injection or omitted filter, foreign tenant data remains physically unreadable.",
        ],
        codeSnippet: `-- PostgreSQL Row Level Security Setup
ALTER TABLE workspaces ENABLE ROW LEVEL SECURITY;
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;

CREATE POLICY tenant_isolation_policy ON documents
  FOR ALL
  USING (tenant_id = current_setting('app.current_tenant_id')::uuid);`,
        codeLanguage: "sql",
      },
      {
        heading: "2. Idempotent Event Handlers for Billing & Seats",
        content: [
          "Payment processors deliver webhooks out of order or with duplicate retries. Our SaaS architectures utilize an append-only event ledger with distributed lock checks to ensure each subscription lifecycle transition is recorded exactly once.",
        ],
      },
    ],
    stack: ["Node.js", "PostgreSQL", "Supabase", "Redis", "Docker", "Stripe API"],
  },
  {
    id: "first-party-meta-google-capi-architecture",
    slug: "first-party-meta-google-capi-architecture",
    title: "The Post-Cookie Era: Engineering First-Party Meta CAPI & Server Tracking",
    subtitle:
      "How to reclaim lost attribution, bypass ad blockers, and increase ROAS by 40%+ using server-side event tracking pipelines.",
    category: "Growth & Ads",
    readTime: "6 min read",
    date: "Jul 2026",
    featured: false,
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Server-side Meta and Google CAPI event telemetry",
    summary:
      "Browser ad blockers and iOS privacy updates silently degrade 30-50% of client-side tracking pixels. We build deterministic server-to-server Conversions API (CAPI) gateways on edge cloud workers, restoring complete attribution transparency.",
    author: {
      name: "Sarah Jenkins",
      role: "Growth Engineering Director",
      avatar: "SJ",
    },
    tags: ["Meta CAPI", "Google Offline Conversions", "Edge Workers", "Attribution", "ROAS"],
    metrics: [
      { label: "Attribution Recovery", value: "+38%" },
      { label: "Ad Event Match Quality", value: "9.2 / 10" },
      { label: "Average Client ROAS", value: "3.4x" },
    ],
    executiveTakeaways: [
      "Client-side pixels suffer from 30%+ signal degradation due to browser privacy extensions and network firewalls.",
      "Edge-based event forwarding deduplicates browser and server signals using cryptographically hashed customer data (SHA-256).",
      "Accurate downstream conversion signals feed Meta and Google AI bidding algorithms, driving immediate CAC reductions.",
    ],
    sections: [
      {
        heading: "1. The Anatomy of Server-Side Conversions (CAPI)",
        content: [
          "Instead of relying on third-party scripts running inside user browsers, our architecture captures events directly on our Next.js edge route handlers. We normalize user data, compute SHA-256 hashes for emails and phone numbers, and dispatch payloads to Meta and Google servers via secure HTTPS.",
        ],
        codeSnippet: `// Server-Side Event Dispatcher
export async function sendMetaConversion(event: ConversionEvent) {
  const payload = {
    event_name: event.name,
    event_time: Math.floor(Date.now() / 1000),
    event_id: event.eventId, // Matches client-side pixel event_id
    user_data: {
      em: [hashSha256(event.user.email)],
      ph: [hashSha256(event.user.phone)],
      client_ip_address: event.ip,
      client_user_agent: event.userAgent,
    },
    custom_data: {
      currency: "USD",
      value: event.value,
    }
  };
  await fetch(\`https://graph.facebook.com/v19.0/\${PIXEL_ID}/events\`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ data: [payload], access_token: ACCESS_TOKEN }),
  });
}`,
        codeLanguage: "typescript",
      },
      {
        heading: "2. Real-Time Event Deduplication",
        content: [
          "By issuing identical unique 'event_id' tokens from the server to both browser and backend runners, advertising platforms automatically deduplicate signals. This prevents double-counting while capturing conversions that ad-blockers would have otherwise concealed.",
        ],
      },
    ],
    stack: ["Next.js API Routes", "Cloudflare Workers", "Meta Graph API", "Google Ads API"],
  },
  {
    id: "design-systems-zero-runtime-overhead",
    slug: "design-systems-zero-runtime-overhead",
    title: "Design Systems That Scale: Zero-Runtime Overhead & Micro-Interactions",
    subtitle:
      "Crafting unified enterprise design tokens, fluid typography, and accessible component architectures without performance penalties.",
    category: "UI/UX & Design",
    readTime: "6 min read",
    date: "Jul 2026",
    featured: false,
    image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Zero-runtime enterprise design system components",
    summary:
      "Enterprise software often buckles under fragmented CSS, bloated component libraries, and inconsistent UX. Our design engineering framework establishes deterministic tokens, WCAG AAA accessibility, and ultra-fluid micro-interactions.",
    author: {
      name: "Devon Chen",
      role: "Lead Product Designer & Architect",
      avatar: "DC",
    },
    tags: ["Design Systems", "Tailwind CSS", "Figma Tokens", "Accessibility", "WCAG"],
    metrics: [
      { label: "Bundle Size Overhead", value: "0 KB" },
      { label: "Accessibility Score", value: "100% WCAG" },
      { label: "Design-to-Code Velocity", value: "3x Faster" },
    ],
    executiveTakeaways: [
      "Replacing heavy CSS-in-JS runtimes (like styled-components) with atomic CSS engines eliminates style re-computation overhead.",
      "Automating token synchronization from Figma directly into Tailwind theme definitions removes manual translation errors.",
      "Compound component patterns ensure clean API consumption for engineering teams without brittle prop drilling.",
    ],
    sections: [
      {
        heading: "1. The Shift to Atomic Zero-Runtime Styling",
        content: [
          "Traditional CSS-in-JS libraries inject `<style>` tags at runtime, which causes CPU thread contention and stutter during complex animations. We leverage Tailwind CSS with utility-first compiler extraction so that production bundles contain minimal, deduped CSS classes that compress down to under 12KB gzip.",
        ],
      },
      {
        heading: "2. Radix UI Primitives & Accessibility Standards",
        content: [
          "Every dropdown, modal, tooltip, and accordion is built upon headless accessible primitives with full keyboard navigation (Tab, Arrow keys, Esc), screen reader ARIA roles, and focus traps baked in by default.",
        ],
      },
    ],
    stack: ["Tailwind CSS", "Radix Primitives", "TypeScript", "Lucide Icons", "Figma Tokens"],
  },
  {
    id: "autonomous-rag-semantic-cache",
    slug: "autonomous-rag-semantic-cache",
    title: "Production RAG at 99.8% Accuracy: Hybrid Search, Rerankers & Cache",
    subtitle:
      "Solving hallucination and slow response times in enterprise knowledge retrieval with cross-encoder re-ranking and semantic vector caching.",
    category: "AI & Automation",
    readTime: "8 min read",
    date: "Jun 2026",
    featured: false,
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Production RAG hybrid search and semantic cache",
    summary:
      "Naive Retrieval-Augmented Generation (RAG) suffers from irrelevant context retrieval and high latency. We implement reciprocal rank fusion, BGE re-rankers, and vector caches to deliver factual, citations-backed answers in under 300ms.",
    author: {
      name: "Sophia Sterling",
      role: "Principal Systems Engineer",
      avatar: "SS",
    },
    tags: ["RAG Systems", "Hybrid Search", "Vector Embeddings", "Re-ranking", "Enterprise AI"],
    metrics: [
      { label: "Retrieval Precision", value: "98.7%" },
      { label: "End-to-End Latency", value: "< 280ms" },
      { label: "Hallucination Reduction", value: "96.4%" },
    ],
    executiveTakeaways: [
      "Dense vector search alone misses exact keywords (e.g., error codes or SKUs); hybrid dense + BM25 sparse search is essential.",
      "Applying a secondary cross-encoder re-ranking stage eliminates false positives before prompt synthesis.",
      "Source citation anchors allow enterprise users to verify exact document origins with a single click.",
    ],
    sections: [
      {
        heading: "1. The Hybrid Search Pipeline",
        content: [
          "Vector embeddings capture conceptual meaning but struggle with exact numbers, technical acronyms, or proper nouns. Our architecture combines dense vector embeddings with BM25 sparse lexical search via Reciprocal Rank Fusion (RRF), yielding superior context retrieval across diverse corpus types.",
        ],
      },
      {
        heading: "2. Cross-Encoder Re-Ranking",
        content: [
          "Top-50 candidates from hybrid search are fed into a lightweight cross-encoder re-ranker. The model scores true relevance between query and chunk, discarding low-signal passages so the final LLM context contains only high-density, authoritative data.",
        ],
      },
    ],
    stack: ["Python", "FastAPI", "Pinecone", "Qdrant", "Cohere Rerank", "LangChain"],
  },
  {
    id: "event-driven-microservices-resilience",
    slug: "event-driven-microservices-resilience",
    title: "Event-Driven Microservices: Zero-Data-Loss Streaming with Kafka & Go",
    subtitle:
      "Architecting distributed event sourcing, idempotent consumer groups, and automated dead-letter re-drives for high-throughput backends.",
    category: "SaaS & Architecture",
    readTime: "7 min read",
    date: "May 2026",
    featured: false,
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Distributed event streaming and Kafka architecture",
    summary:
      "Synchronous REST microservices cascade failures under enterprise loads. Here is how we engineer fault-tolerant event streams with Apache Kafka and Go, handling partition rebalances, exactly-once semantics, and zero data loss.",
    author: {
      name: "Marcus Vance",
      role: "Lead Fullstack Architect",
      avatar: "MV",
    },
    tags: ["Kafka", "Go", "Distributed Systems", "Event Sourcing", "Microservices"],
    metrics: [
      { label: "Stream Throughput", value: "120k msg/s" },
      { label: "Data Loss Incidents", value: "0" },
      { label: "Consumer Lag P99", value: "< 12ms" },
    ],
    executiveTakeaways: [
      "Replacing synchronous HTTP microservice chains with append-only event logs completely decouples service availability.",
      "Consumer idempotency keys stored in distributed Redis caches prevent double-processing during partition rebalance events.",
      "Dead-letter queues with automated exponential backoff protect main streaming partitions from poison-pill payloads.",
    ],
    sections: [
      {
        heading: "1. The Pitfalls of Synchronous Microservice Mesh",
        content: [
          "When Service A calls Service B, which calls Service C, any slight latency spike or network blip causes timeouts to cascade upstream. By publishing immutable domain events to distributed Kafka topics, upstream services acknowledge writes immediately while downstream workers process asynchronously at their own throughput capacity.",
        ],
      },
      {
        heading: "2. Idempotent Consumer Processing & Dead Letter Queues",
        content: [
          "In distributed messaging, network partitions mean 'at least once' delivery is standard. To achieve virtual 'exactly once' guarantees, every event contains a cryptographically unique transaction ID. Consumers execute business logic inside an atomic database transaction alongside the ID write.",
        ],
      },
    ],
    stack: ["Go", "Apache Kafka", "Docker", "PostgreSQL", "Redis", "Prometheus"],
  },
];

export const WHITEPAPERS: WhitepaperItem[] = [
  {
    id: "enterprise-ai-readiness-2026",
    title: "2026 Enterprise AI Readiness & Multi-Agent Architecture Framework",
    category: "Executive AI Briefing",
    pages: "24 Pages",
    readTime: "15 min read",
    format: "PDF Architecture Guide",
    description:
      "A comprehensive evaluation roadmap for CTOs, VPs of Engineering, and Product Leaders looking to safely operationalize autonomous agent systems with deterministic governance and full security compliance.",
    highlights: [
      "Agent State Machine Governance Framework",
      "Cost Model: Self-Hosted SLMs vs Proprietary APIs",
      "Security Guardrails & Prompt Injection Prevention",
      "ROI Evaluation Matrix across Support, Sales, & Ops",
    ],
    badge: "Most Requested",
  },
  {
    id: "sub-second-web-playbook",
    title: "The Sub-Second Web Engineering & Core Web Vitals Audit Playbook",
    category: "Technical Architecture",
    pages: "18 Pages",
    readTime: "12 min read",
    format: "Engineering Manual",
    description:
      "Step-by-step technical teardown of Next.js 14/15, edge rendering strategies, image pipelines, font subsetting, and CDN caching topologies that consistently achieve 100/100 Lighthouse scores.",
    highlights: [
      "Partial Prerendering (PPR) Production Configurations",
      "Zero-Layout-Shift Font Subsetting Blueprints",
      "Edge Middleware Dynamic Cache Tag Invalidation",
      "Real-User-Monitoring (RUM) Telemetry Setup",
    ],
    badge: "Core Guide",
  },
  {
    id: "saas-multi-tenancy-blueprint",
    title: "SaaS Multi-Tenancy & Database Scaling: From Zero to 10k Enterprises",
    category: "Backend & Systems",
    pages: "22 Pages",
    readTime: "14 min read",
    format: "Systems Architecture",
    description:
      "Practical implementation guide for database-level tenant isolation with PostgreSQL RLS, connection pooling strategies, idempotent billing webhooks, and disaster recovery architectures.",
    highlights: [
      "Zero-Trust Tenant Isolation with PostgreSQL RLS",
      "High-Concurrency PgBouncer Pooling Topologies",
      "Stripe Billing Idempotency Ledger Implementations",
      "Automated Database Partitioning Strategies",
    ],
    badge: "Enterprise",
  },
];

export const INDUSTRY_BENCHMARKS: BenchmarkStat[] = [
  {
    metric: "First Contentful Paint (FCP)",
    conventional: "1,850 ms",
    acovate: "280 ms",
    improvement: "6.6x Faster",
    description: "Measured globally via Chrome UX Report across diverse 4G and broadband mobile connections.",
  },
  {
    metric: "Customer Support Resolution Time",
    conventional: "4.5 Hours",
    acovate: "12 Seconds",
    improvement: "99.8% Faster",
    description: "Autonomous multi-agent routing vs conventional human-in-the-loop email queues.",
  },
  {
    metric: "Ad Attribution Signal Recovery",
    conventional: "62% (Pixel Only)",
    acovate: "98.4% (CAPI + Pixel)",
    improvement: "+36.4% Signal",
    description: "Server-side cryptographic event matching bypassing browser content blockers.",
  },
  {
    metric: "B2B SaaS API Latency (P99)",
    conventional: "480 ms",
    acovate: "68 ms",
    improvement: "7.0x Lower",
    description: "Optimized PostgreSQL indexes, Redis semantic cache, and edge compute execution.",
  },
];

export interface EvaluatorOption {
  id: string;
  label: string;
  category: "currentStack" | "primaryGoal" | "scale";
  description: string;
}

export const EVALUATOR_STACKS: EvaluatorOption[] = [
  { id: "legacy-php", label: "Legacy Monolith (WordPress / PHP / Rails)", category: "currentStack", description: "High maintenance, slow TTFB, difficult to scale modern features" },
  { id: "modern-react", label: "Modern SPA / Next.js Setup", category: "currentStack", description: "Good frontend base, but lacks AI automation and advanced edge caching" },
  { id: "early-saas", label: "Early-Stage SaaS Platform", category: "currentStack", description: "Seeking robust multi-tenant architecture and automated billing resilience" },
  { id: "manual-ops", label: "Manual Support & Ops Heavy", category: "currentStack", description: "High human payroll overhead, bottlenecks during peak hours" },
];

export const EVALUATOR_GOALS: EvaluatorOption[] = [
  { id: "ai-automation", label: "Deploy 24/7 Autonomous AI Agents", category: "primaryGoal", description: "Automate tier-1 customer inquiries, lead qualification, and ops triage" },
  { id: "web-conversion", label: "Sub-Second Web & 2x Conversion Rate", category: "primaryGoal", description: "Modernize to Next.js 14/15, achieve 95+ Core Web Vitals, lift ROAS" },
  { id: "saas-scale", label: "Scale SaaS Multi-Tenancy & Reliability", category: "primaryGoal", description: "Implement PostgreSQL RLS, automated billing, and zero-downtime CI/CD" },
  { id: "ads-growth", label: "Meta & Google CAPI Attribution Engine", category: "primaryGoal", description: "Recover lost conversion signals and scale profitable customer acquisition" },
];
