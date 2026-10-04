# Development Task Management Roadmap

**Project:** Acovate Web Platform  
**Tracking System:** Markdown Checklist  
**Status:** Phase 3 Complete / Optimization & Expansion Active  
**Last Updated:** October 2026  

---

## 1. Project Setup & Core Configuration

- [x] Initialize Next.js 14 project with App Router and TypeScript strict mode.
- [x] Configure Tailwind CSS with custom design tokens (Linen `#dbd8cf`, Forest `#093103`, Black `#000000`).
- [x] Set up PostCSS and Autoprefixer configurations.
- [x] Install atomic component utilities (`clsx`, `tailwind-merge`, `class-variance-authority`).
- [x] Install and configure Lucide React icons.
- [x] Configure `next.config.mjs` for static HTML export (`output: "export"`) with `trailingSlash: true`.
- [x] Configure GitHub Pages sub-path asset prefixes (`basePath` / `assetPrefix`).
- [x] Create initial repository configuration, `.gitignore`, and README documentation.

---

## 2. Phase 1 — Brand Foundation & Global Layout

- [x] Build root layout (`src/app/layout.tsx`) with font configuration and viewport settings.
- [x] Implement sticky responsive `Navbar.tsx` with scroll-detected backdrop blur.
- [x] Implement mobile navigation drawer with accessible toggle transitions.
- [x] Implement comprehensive `Footer.tsx` with multi-column taxonomy, direct contact info, and social links.
- [x] Implement floating `WhatsAppButton.tsx` linking to WhatsApp Web/Mobile with prefilled message.
- [x] Configure global CSS variables, custom scrollbars, and tactile background grid patterns (`globals.css`).
- [x] Create atomic UI components: `Button.tsx`, `Badge.tsx`, `Card.tsx`, `Input.tsx`.

---

## 3. Phase 2 — Services Architecture & Interactive Scoping

- [x] Define TypeScript domain models and full datasets for 11 core services in `servicesData.ts`.
- [x] Build Homepage Hero section (`HeroSection.tsx`) with value proposition and trust metrics.
- [x] Build 4-Stage Engineering Process Section (`ProcessSection.tsx`).
- [x] Build Real-World Case Studies Section (`CaseStudiesSection.tsx`).
- [x] Build Client Testimonials Section (`TestimonialsSection.tsx`).
- [x] Build High-Converting CTA Banner (`CtaBanner.tsx`).
- [x] Build Interactive Project Scope & Timeline Calculator (`ProjectScopeCalculator.tsx`).
- [x] Build comprehensive `/services` page with real-time category filtering and search.
- [x] Implement Deliverables checklist and Tech Stack tags for all 11 disciplines.
- [x] Implement Agency Comparison Matrix and interactive FAQ accordion.
- [x] Build About page (`/about`) with mission, core principles, and company milestones.
- [x] Build Contact page (`/contact`) with direct communication channels and 24h SLA.
- [x] Build legal compliance pages (`/privacy`, `/terms`).

---

## 4. Phase 3 — Technical Insights & Editorial CMS

- [x] Design domain models for technical articles, whitepapers, benchmarks, and authors (`insightsData.ts`).
- [x] Pre-seed high-value technical articles covering AI agents, Next.js benchmarks, and SaaS architecture.
- [x] Build Insights Directory (`/insights`) with real-time search, category tabs, and hero perspective.
- [x] Implement Static Site Generation (SSG) individual post viewer (`/insights/[slug]`) via `generateStaticParams`.
- [x] Implement client-side storage adapter and event bus (`src/lib/insightsStorage.ts`).
- [x] Implement dynamic article viewer fallback (`/insights/post`) wrapped in `<Suspense>`.
- [x] Build Editorial Admin Panel (`/admin`) with login authentication gate.
- [x] Build MS Word-style rich text WYSIWYG editor (`WordEditor.tsx`) with formatting toolbar.
- [x] Implement bidirectional parser (`htmlToSections` / `sectionsToHtml`) to bridge HTML and structured models.
- [x] Add real-time article preview and delete/reset capabilities to the admin interface.

---

## 5. Phase 4 — SEO, Structured Data & Metadata

- [x] Implement automated XML sitemap generator (`src/app/sitemap.ts`) including dynamic article slugs.
- [x] Implement robots directives generator (`src/app/robots.ts`).
- [x] Implement Web App Manifest (`src/app/manifest.ts`).
- [x] Implement Schema.org JSON-LD component (`JsonLd.tsx`) emitting `Organization`, `WebSite`, and `ProfessionalService`.
- [x] Implement article-specific `BlogPosting` JSON-LD structured data for insight routes.
- [x] Configure OpenGraph images, Twitter summary cards, and canonical URL alternates across all routes.

---

## 6. Testing & Quality Verification

- [ ] Create dedicated non-interactive `.eslintrc.json` config to enable zero-prompt `npm run lint`.
- [ ] Add automated link checker script to ensure zero 404s across internal routes.
- [ ] Perform cross-browser visual verification on Safari iOS and macOS.
- [ ] Test client storage limits and edge cases (incognito mode, corrupted localStorage).
- [ ] Verify keyboard accessibility focus traps on mobile drawer and admin modals.

---

## 7. Performance & Optimization

- [x] Achieve sub-90 kB shared First Load JS bundle size across all routes.
- [ ] Compress and convert `public/images/hero-agency.jpg` (currently 823 kB) to modern WebP / AVIF formats.
- [ ] Implement code splitting / dynamic `React.lazy` loading for the heavy `WordEditor.tsx` admin component.
- [ ] Audit Core Web Vitals using PageSpeed Insights post-deployment to ensure 95+ score.

---

## 8. Security Hardening

- [x] Enforce `rel="noopener noreferrer"` on all external hyperlinks.
- [x] Protect admin routes with `noindex, nofollow` robot directives.
- [x] Implement Web Crypto SHA-256 salted password verification (no plaintext credentials).
- [x] Implement strict 1-hour session cookie (`SameSite=Strict`, `Secure`, `Max-Age=3600`) with HMAC signing.
- [x] Implement sliding-window rate limiter (progressive delay after 3 attempts, 15m lockout after 5 attempts).
- [x] Implement device fingerprinting anti-session hijacking protection.
- [x] Implement honeypot anti-bot submission trap.
- [x] Implement real-time 1-hour session countdown timer, expiry warning, and auto-logout.
- [x] Implement administrative master password management and security audit logging.
- [ ] Implement Content Security Policy (CSP) headers in hosting configuration.

---

## 9. Deployment & Delivery

- [x] Configure GitHub Actions CI/CD workflow (`.github/workflows/deploy.yml`).
- [x] Add `gh-pages` deployment script to `package.json`.
- [ ] Verify custom apex domain routing (`https://acovate.agency`) and SSL termination.
- [ ] Set up automated uptime monitoring and alerting.

---

## 10. Future Improvements & Enhancements

- [ ] Connect cloud database (Supabase / PostgreSQL) for distributed multi-author editorial publishing (Status: **TBD**).
- [ ] Implement serverless email dispatch handler (Resend / SendGrid) for contact inquiries (Status: **TBD**).
- [ ] Build interactive AI workflow ROI calculator calculating annual operational hours saved (Status: **TBD**).
- [ ] Add interactive live code playground to technical architecture insight articles (Status: **TBD**).
