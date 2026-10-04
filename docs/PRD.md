# Product Requirements Document (PRD)

**Product Name:** Acovate — Digital Engineering & Autonomous AI Agency Web Platform  
**Document Version:** 1.0.0  
**Current Status:** Production / Active Deployment  
**Domain:** [https://acovate.agency](https://acovate.agency)  
**Repository:** `Smarter-world`  
**Last Updated:** October 2026  

---

## 1. Product Overview

Acovate is a digital agency web platform engineered for high-growth enterprises, venture-backed startups, and modern founders. The platform showcases full-spectrum engineering services ranging from high-performance Next.js web development and multi-tenant SaaS architectures to autonomous multi-agent AI systems and performance growth marketing.

The web platform serves as both a high-converting digital storefront and an engineering authority hub. It features interactive scoping tools, deep technical insights, transparent architectural comparisons, and an editorial management interface designed to operate flawlessly within a high-performance static architecture.

---

## 2. Problem Statement

Traditional digital agency websites suffer from four systemic issues:
1. **Generic Marketing Fluff**: Agencies promise everything without demonstrating concrete technical depth, architectures, or deliverables.
2. **Sluggish Performance**: Heavy WordPress/Webflow sites bloated with plugins deliver low Core Web Vitals, leading to high bounce rates and poor mobile conversion.
3. **Opaque Pricing & Timelines**: Prospective clients must submit contact forms and wait days to obtain even rough estimates for project feasibility and schedules.
4. **Lack of AI Native Competence**: Most agencies treat AI as an afterthought or superficial wrapper, failing to demonstrate deep mastery of retrieval-augmented generation (RAG), vector databases, autonomous agent orchestration, and deterministic workflows.

Acovate solves this by presenting a sub-second, type-safe, engineering-first web platform that provides immediate scoping estimates, architectural transparency, and direct communication channels with senior engineering leads.

---

## 3. Goals & Key Objectives

### Business & Conversion Goals
- **Lead Generation**: Convert senior decision-makers (CTOs, VPs of Product, Founders) via direct communication channels and interactive scoping tools.
- **Brand Authority**: Establish undeniable engineering prestige through detailed technical playbooks, whitepapers, benchmark data, and transparent architectural standards.
- **Zero Friction**: Guarantee 24-hour turnaround on technical discovery requests without bureaucratic gatekeeping.

### Technical & Performance Goals
- **Core Web Vitals**: Achieve 95+ scores on Google Lighthouse for Performance, Accessibility, Best Practices, and SEO.
- **Edge Latency**: Deliver sub-second page loads (< 120ms first contentful paint) globally through static generation (SSG) and edge CDN caching.
- **Zero CLS**: Ensure zero Cumulative Layout Shift across all responsive viewports (mobile, tablet, desktop, ultra-wide).
- **Static Export Resilience**: Maintain 100% static export compatibility (`output: "export"`) deployable to GitHub Pages, Cloudflare Pages, Vercel, or AWS S3.

---

## 4. Target Users & Personas

| Persona | Role & Organization | Primary Needs & Pain Points | Key Features Leveraged |
| :--- | :--- | :--- | :--- |
| **Enterprise Technology Leader** | CTO / VP Engineering (Scale-up to Enterprise) | Needs reliable engineering partners for complex microservices, SaaS modernization, or secure enterprise AI integration without vendor lock-in. | Services architecture breakdown, comparison matrix, 100% IP ownership guarantee, technical insights. |
| **Early-to-Growth Founder** | Seed to Series B Founder / CEO | Needs rapid MVP development, deterministic timelines, and clear architectural roadmaps before fundraising or launch. | Interactive Project Scope Calculator, 4-stage engineering methodology, case studies. |
| **D2C / E-Commerce Executive** | VP eCommerce / Head of Growth | Needs lightning-fast storefronts, frictionless checkout flows, and automated inventory sync to lower CAC and boost AOV. | E-commerce service deep-dive, performance benchmarks, direct inquiry channels. |
| **Editorial Content Manager / Admin** | Acovate Internal Lead Author | Needs to publish and maintain engineering insights, case studies, and technical briefings without modifying source code or triggering rebuilds. | Editorial Admin Panel (`/admin`), MS Word-style rich text editor, localStorage synchronization. |

---

## 5. Core Features & Capabilities

### 5.1 Interactive Homepage (`/`)
- **Editorial Hero Section**: Bold agency positioning, dynamic visual badges, and immediate CTA pathways.
- **Trust Metrics & Core Disciplines**: Fast-scan statistics (11 Core Practices, 100% Source Code IP, < 120ms Edge Latency, 24/7 AI Automation).
- **Interactive Capabilities Filter**: Categorized service explorer allowing visitors to filter by practice.
- **4-Stage Engineering Methodology**: Transparent execution roadmap (Discovery & Blueprinting, Sprint Engineering, Hardening & Security, Handover & IP Transfer).
- **Real-World Case Studies**: Production metric breakdowns with client outcomes and architectural stack badges.
- **Interactive Project Scope & Timeline Calculator**: Real-time project estimation engine calculating delivery timelines and phases based on selected disciplines and project complexity.
- **Client Testimonials & Executive Proof**: Verified leader quotes highlighting delivery reliability and technical rigor.
- **High-Converting CTA Banner**: Immediate discovery call scheduling trigger.

### 5.2 Deep-Dive Services Directory (`/services`)
- **11 Full-Spectrum Service Modules**:
  1. Website Development
  2. Custom Website Development
  3. Ecommerce Website Development
  4. Website Redesign
  5. Software Development
  6. SaaS Product Development
  7. Mobile App Development
  8. Facebook & Google Ads
  9. AI Integration
  10. AI Automation
  11. AI Agent Automation
- **Multi-Tab Filtering & Search**: Instant client-side search across service titles, descriptions, and technology keywords.
- **Technical Deliverables Checklist**: Detailed bulleted deliverables for every service.
- **Technology Stack Tags**: Exact tools, frameworks, and databases utilized per discipline.
- **Business Benefits Grid**: Measurable ROI points per discipline.
- **Agency Comparison Matrix**: Direct side-by-side contrast between Acovate, traditional agencies, and freelance marketplaces.
- **Interactive FAQ Accordion**: Expandable questions addressing IP ownership, timelines, and technical standards.

### 5.3 Technical Insights & Research Hub (`/insights`, `/insights/[slug]`, `/insights/post`)
- **Category Filter & Real-Time Search**: Search articles by title, excerpt, author, or tags across AI, Web Performance, SaaS Architecture, and Growth.
- **Featured Hero Perspective**: Dynamic highlighting of flagship engineering research.
- **Dynamic SSG Routing + Fallback**: Static site generation for pre-built insights (`/insights/[slug]`) and client-side query reader (`/insights/post?slug=...`) for newly created articles.
- **Technical Article Layout**: Includes executive takeaways, metric callouts, code syntax snippets, author bios, and related articles.
- **Schema.org Structured Data**: Automatic `BlogPosting` and `CollectionPage` JSON-LD emission for search engine indexing.

### 5.4 Editorial Admin Panel & Word-Style CMS (`/admin`)
- **Session Authentication**: Client-side secure password gate guarding administrative operations.
- **Article Lifecycle Management**: Add, update, preview, delete, and reset articles with live storage sync.
- **Full Word-Style Rich Text Editor (`WordEditor.tsx`)**:
  - Typography controls: Bold, Italic, Underline, Strikethrough, Heading 1/2/3.
  - Alignment: Left, Center, Right, Justify.
  - Lists: Bulleted and Numbered lists.
  - Blockquotes, Inline Code, and Horizontal Rules.
  - Links and Image URL embedding.
  - Section-to-HTML and HTML-to-Section bidirectional parser (`insightsStorage.ts`).
  - Undo, Redo, and formatting reset.
  - Real-time article preview and validation.

### 5.5 Direct Contact & Communication (`/contact`, Floating WhatsApp)
- **Direct Multi-Channel Contact**: Email (`contact@acovate.agency`), direct telephone (`+1 (800) 582-9675`), San Francisco physical address, and standard operating hours.
- **Floating WhatsApp Quick-Action**: Persistent fixed bottom-right floating widget launching a pre-populated inquiry on WhatsApp Web/Mobile.
- **Guaranteed Turnaround SLA**: Explicit 24-hour turnaround commitment on architecture roadmaps.

### 5.6 About & Legal Transparency (`/about`, `/privacy`, `/terms`)
- **Mission & Core Principles**: Engineering rigor, AI-first pragmatism, performance without compromise, and radical transparency.
- **Company Milestones**: Historical timeline from founding to multi-agent deployment.
- **Legal Compliance**: Comprehensive Privacy Policy and Terms of Service outlining data minimization and client IP ownership.

---

## 6. Functional Requirements

### Priority 0 (Critical — Production Requirement)
- [x] **FR-01**: Static site build must complete cleanly without errors (`npx next build` with `output: "export"`).
- [x] **FR-02**: All 11 services must render detailed metadata, deliverables, technologies, and anchor targets.
- [x] **FR-03**: Interactive Project Scope Calculator must recalculate timelines dynamically based on selected services and deployment pace.
- [x] **FR-04**: Search and filtering on `/services` and `/insights` must execute instantaneously in-memory without page reloads.
- [x] **FR-05**: Dynamic article viewer (`/insights/post`) must resolve articles created via the in-browser admin panel from `localStorage`.
- [x] **FR-06**: Dynamic sitemap (`sitemap.xml`) and robots directives (`robots.txt`) must generate automatically at build time.
- [x] **FR-07**: Mobile navigation drawer must toggle smoothly and automatically close on route transition.

### Priority 1 (High — Platform Completeness)
- [x] **FR-08**: Floating WhatsApp button must encode the agency contact phone number and inquiry message cleanly.
- [x] **FR-09**: Rich text Word-style editor must parse HTML into structured sections and save to client persistence.
- [x] **FR-10**: Schema.org JSON-LD must inject `Organization`, `WebSite`, and `ProfessionalService` structured data into root `<head>`.
- [x] **FR-11**: GitHub Pages asset prefixing (`basePath` / `assetPrefix`) must resolve correctly across production deployments.

### Priority 2 (Medium / Enhancements)
- [ ] **FR-12**: Server-side database integration (e.g. Supabase, PostgreSQL) for multi-user persistent content management without relying on browser `localStorage` (Status: **TBD**).
- [ ] **FR-13**: Direct contact form submission handler connecting to email dispatch webhook or CRM API (Status: **TBD**).
- [ ] **FR-14**: Interactive code sandbox in technical insight articles (Status: **TBD**).

---

## 7. Non-Functional Requirements

### 7.1 Performance
- **First Contentful Paint (FCP)**: < 1.0s on 4G mobile connections.
- **Time to Interactive (TTI)**: < 1.5s globally.
- **Cumulative Layout Shift (CLS)**: 0.00 across all routes.
- **Bundle Optimization**: Initial JavaScript payload shared by all routes kept under 90 kB.
- **Asset Handling**: Static image optimization flags configured for zero-runtime dependencies.

### 7.2 Accessibility & Usability (WCAG 2.1 AA)
- Semantic HTML tags used universally (`<header>`, `<main>`, `<nav>`, `<article>`, `<section>`, `<footer>`, `<aside>`).
- Keyboard navigability with visible focus rings (`focus-visible:ring-2 focus-visible:ring-[#093103]`).
- Screen reader friendly ARIA labels for icon-only buttons, social links, and drawer triggers.
- High contrast ratios exceeding 4.5:1 between text (`#000000`) and linen background (`#dbd8cf`), and white (`#ffffff`) on forest green (`#093103`).

### 7.3 Compatibility & Responsiveness
- Fluid responsive layout verified across standard screen breakpoints:
  - Mobile Small: 320px – 375px
  - Mobile Large: 375px – 640px
  - Tablet: 641px – 1024px
  - Desktop: 1025px – 1440px
  - Wide Desktop: 1440px+
- Cross-browser compatibility across modern Chromium (Chrome, Edge, Brave), WebKit (Safari iOS/macOS), and Gecko (Firefox).

---

## 8. User Flows

### Flow 1: Prospective Client Exploration to Technical Inquiry
```
Visitor enters (/) 
  -> Views Trust Metrics & Value Proposition 
  -> Explores Interactive Scope Calculator 
  -> Selects Services & Timeline Pace 
  -> Navigates to (/services) for deep deliverables check 
  -> Clicks "Schedule Technical Discovery" or WhatsApp float 
  -> Direct email/phone connection initiated within 24h SLA
```

### Flow 2: Engineering Decision-Maker Content Research
```
Visitor lands on (/insights) or direct article link (/insights/[slug])
  -> Reads Executive Takeaways & Metric Highlights
  -> Inspects Code Snippets & Architecture Diagrams
  -> Browses Author Credentials & Related Discipline Services
  -> Navigates to (/about) for engineering philosophy
  -> Reaches out to discuss custom enterprise engagement
```

### Flow 3: Editorial Admin Publishing Flow
```
Editor accesses (/admin)
  -> Enters admin credentials
  -> Selects "New Article"
  -> Uses Word-style toolbar (headings, bold, lists, quotes, images)
  -> Configures metadata (title, slug, category, author, metrics)
  -> Previews article in live container
  -> Clicks "Publish Article"
  -> Dispatched to localStorage & available immediately via (/insights/post?slug=...)
```

---

## 9. Edge Cases & Resilience

| Edge Case | Potential Impact | System Mitigation |
| :--- | :--- | :--- |
| **New article published via admin panel on static site** | Route does not exist as pre-rendered SSG file in `/out/insights/[slug]/index.html`. | Handled by `/insights/post?slug=...` client fallback page which queries `localStorage` on the fly. |
| **User visits site on private/incognito mode** | `localStorage` might throw security exceptions or be cleared on session end. | `insightsStorage.ts` contains `try/catch` wrappers falling back to static `INSIGHTS_DATA` constants gracefully. |
| **Deployment to GitHub Pages subpath** | Image assets and internal links could break if hardcoded to root `/`. | Controlled via `NEXT_PUBLIC_BASE_PATH`, `basePath` in `next.config.mjs`, and `getAssetPath()` helper utility. |
| **Slug collisions in custom articles** | Two articles sharing identical slug could cause routing ambiguity. | Admin creation logic generates unique timestamp-appended slugs if duplicates are detected. |

---

## 10. Acceptance Criteria

1. **Build Quality**: Running `npm run build` generates 23+ static pages into `/out` with zero TypeScript or syntax errors.
2. **Design Cohesion**: 100% adherence to the Acovate brand identity (Linen `#dbd8cf` + Deep Forest Green `#093103` + Black `#000000`).
3. **Interactive Features**: Scope Calculator, Services Search, Insights Category Filter, and Admin Word Editor operate without console warnings.
4. **SEO Coverage**: All primary routes emit valid metadata, canonical links, OpenGraph cards, and schema tags.
5. **No Broken Links**: Internal links across navigation, footer, services, insights, and CTAs resolve correctly.

---

## 11. Out-of-Scope Items & TBDs

### Explicitly Out-of-Scope (Current Phase)
- In-app payment processing and automated billing subscriptions (engagements are billed via external enterprise invoicing).
- Public user registration or consumer customer accounts.
- Multi-language localization (i18n) beyond American English (`en_US`).

### Items Marked as TBD (Pending Future Requirements)
- **Database Backend Migration**: Moving from browser-local storage to managed PostgreSQL (Supabase/Prisma) for distributed multi-author publishing: **TBD**.
- **Serverless Form Endpoint**: Direct SMTP or Resend/SendGrid transactional email integration replacing direct mailto/tel: **TBD**.
- **Interactive ROI Calculator**: Automated dollar ROI estimation tool for AI workflow automation: **TBD**.
