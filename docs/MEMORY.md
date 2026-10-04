# Persistent Project Memory & Context

**Project:** Acovate Web Platform  
**Target:** AI Coding Agents across all sessions  
**Status:** Active Persistent Context  
**Last Updated:** October 2026  

---

## 1. Project Identity & Summary

- **Agency Name:** Acovate
- **Tagline:** Next-Generation Digital Engineering & AI Solutions
- **Primary Domain:** [https://acovate.agency](https://acovate.agency)
- **Deployment Repository:** `Smarter-world` (GitHub Pages)
- **Core Positioning:** Premier digital engineering agency delivering sub-second Next.js web systems, custom enterprise software, multi-tenant SaaS, and autonomous multi-agent AI systems with 100% intellectual property transfer.

---

## 2. Current Implementation Status

- **Build Status:** Verified passing. `npx next build` successfully compiles and generates 23 static HTML pages into `/out`.
- **Core Architecture:** Next.js 14 App Router with pure static export (`output: "export"`).
- **Active Pages:**
  - `/` (Homepage: Hero, 11-discipline capabilities filter, 4-stage process, case studies, scope calculator, testimonials, CTA)
  - `/services` (Comprehensive directory of all 11 services, deliverables, comparison matrix, tech stacks, and FAQs)
  - `/insights` (Engineering perspectives hub with category filter and search)
  - `/insights/[slug]` (Static SSG individual article pages generated via `generateStaticParams`)
  - `/insights/post` (Client-side fallback dynamic article reader reading from `localStorage`)
  - `/admin` (Client-side editorial CMS with MS Word-style rich text editor)
  - `/about` (Mission, core values, milestones, engineering principles)
  - `/contact` (Direct communication channels, phone, email, 24h SLA)
  - `/privacy` & `/terms` (Legal compliance pages)
  - `/sitemap.xml`, `/robots.txt`, `/manifest.webmanifest` (Automated SEO suite)

---

## 3. Decisions That Must NOT Be Reversed Without Explicit User Approval

1. **Static Site Export (`output: "export"`)**:
   - The platform is designed for zero-server edge hosting on GitHub Pages and CDNs. Do NOT add server-side Node runtime dependencies (`cookies()`, `headers()`, dynamic Node API routes) that break static export.
2. **Suspense Boundaries Around `useSearchParams()`**:
   - In Next.js App Router, any Client Component reading `useSearchParams()` (e.g. `src/app/insights/post/page.tsx`) MUST remain wrapped in `<Suspense>`. Removing this boundary breaks static compilation immediately.
3. **Brand Color Palette**:
   - Do NOT change the intentional editorial palette:
     - Background: Warm Linen `#dbd8cf`
     - Foreground: Sharp Black `#000000`
     - Primary / Accent: Deep Forest Green `#093103`
     - Primary Foreground: Pure White `#ffffff`
   - Do NOT introduce generic purple/blue tech SaaS gradients or automatic dark mode inversions.
4. **Base Path Helper (`getAssetPath`)**:
   - All references to images and public assets must continue using `getAssetPath()` or respect `NEXT_PUBLIC_BASE_PATH` to prevent broken asset links on GitHub Pages (`/Smarter-world`).

---

## 4. Architectural Patterns & Conventions to Remember

- **Dual-Route Article Architecture**:
  - Pre-seeded articles exist in `src/data/insightsData.ts` and are rendered at build time to `/insights/[slug]/index.html`.
  - In-browser articles authored via `/admin` are saved to `localStorage` (`acovate_insights_v1`) and viewed dynamically at `/insights/post?slug=<slug>`.
  - `BlogPostClient.tsx` handles both models gracefully.
- **Event Bus for Storage Synchronization**:
  - Mutations to `localStorage` emit `window.dispatchEvent(new CustomEvent("insights_updated", { detail: items }))`. Other listening components react without needing page reloads.
- **Styling Utility**:
  - Always use `cn(...)` from `@/lib/utils` for combining Tailwind class names.
- **UI Primitives**:
  - Reusable components reside in `src/components/ui/` and use `class-variance-authority` (CVA).
- **Admin High-Security Suite (`src/lib/adminSecurity.ts`)**:
  - Cryptographic Web Crypto SHA-256 password salting (no plaintext passwords stored or verified in code).
  - Strict 1-hour session cookie (`Max-Age=3600`, `SameSite=Strict`, `Secure`) with signed HMAC payload and auto-logout timer.
  - Client-side sliding-window rate limiter (progressive delay after 3 failed attempts, 15-minute complete lockout after 5 failed attempts).
  - Anti-hijacking browser/device fingerprinting.
  - Honeypot anti-bot form field protection.

---

## 5. Known Limitations & Technical Debt

1. **LocalStorage Editorial Isolation**:
   - Articles written in `/admin` persist only in the user's specific browser `localStorage`. They are not synchronized across devices or across different users until exported to `insightsData.ts` or backed by a cloud database.
2. **ESLint Interactive Prompt**:
   - Running `npm run lint` prompts interactively because `.eslintrc.json` is not yet present. (Adding a non-interactive `.eslintrc.json` is on the task roadmap).
3. **Hero Image Size**:
   - `public/images/hero-agency.jpg` is ~823 kB. It functions well, but should be compressed to modern WebP format when optimizing network payloads.

---

## 6. Important Dependencies & Versions

- `next`: `^14.2.20`
- `react`: `^18.3.1`
- `react-dom`: `^18.3.1`
- `typescript`: `^5.7.2`
- `tailwindcss`: `^3.4.16`
- `lucide-react`: `^0.468.0`
- `class-variance-authority`: `^0.7.1`
- `clsx`: `^2.1.1`
- `tailwind-merge`: `^2.5.5`

---

## 7. Lessons Learned Across Iterations

- **GitHub Pages Subpath Handling**: Deploying to GitHub Pages requires both `basePath` in `next.config.mjs` and careful handling of public assets (`getAssetPath()`). Hardcoded `/images/...` paths cause 404s on subpaths.
- **Rich Text HTML to Section Conversion**: The MS Word-style editor in `WordEditor.tsx` uses bidirectional conversion (`htmlToSections` / `sectionsToHtml`) to allow authors to write natural WYSIWYG rich text while maintaining the structured `TechnicalSection[]` schema used throughout the site.
