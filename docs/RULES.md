# AI Coding Rules & Engineering Standards

**Project:** Acovate Web Platform  
**Target:** AI Coding Agents & Human Contributors  
**Status:** Mandatory Project Guidance  
**Last Updated:** October 2026  

---

## 1. Core Operating Principles & Autonomy

1. **Mandatory Compliance**: All AI agents and software engineers contributing to this repository must treat this file as the authoritative standard. Do not deviate from these rules without explicit user approval.
2. **Autonomous Execution**: Full access is granted for file creation, edits, package operations, and command executions within `D:\Agency`. Do not pause execution or prompt the user for routine steps (terminal commands, refactors, dependencies, builds). Solve problems end-to-end.
3. **Build Integrity Rule**: Never leave the repository in a broken build state. After making code changes, always verify that `npx next build` executes with zero errors.

---

## 2. Next.js 14 & Static Export Constraints

Because this project is configured for **Static Site Generation (`output: "export"`)**, you must strictly follow these constraints:

1. **No Runtime Server APIs**:
   - Do NOT use dynamic server functions like `headers()`, `cookies()`, or server-side request parsing in page routes.
   - Do NOT create dynamic server API routes (`/api/...`) that require a live Node.js process at runtime.
2. **Static Route Generation (`generateStaticParams`)**:
   - Any dynamic route (such as `src/app/insights/[slug]/page.tsx`) MUST export a `generateStaticParams()` function that returns all valid slug parameters at build time.
3. **Suspense Boundaries for Search Parameters**:
   - In Next.js App Router static builds, any Client Component reading `useSearchParams()` MUST be wrapped in a `<React.Suspense>` boundary. Failing to do so will cause `next build` to fail immediately.
4. **Base Path & Asset Resolution**:
   - Always use `getAssetPath(path)` from `@/lib/utils` or reference `NEXT_PUBLIC_BASE_PATH` for images, links, or static public assets to ensure compatibility with GitHub Pages (`/Smarter-world`).
   - Never use unoptimized `<Image>` without `unoptimized: true` configured or verify against `next.config.mjs`.

---

## 3. TypeScript & Type Safety Standards

1. **Strict Type Safety**: The repository enforces `"strict": true` in `tsconfig.json`. Code must compile without implicit `any`, unresolved imports, or unused type discrepancies.
2. **No `any` Types**: Avoid using `any`. Define explicit interfaces, types, or generics. If an unknown external input is received, type it as `unknown` and narrow it with type guards.
3. **Component Props**:
   - Every React component must define an explicit `interface` or `type` for its props (e.g. `interface ButtonProps`, `interface BlogPostClientProps`).
   - Use `React.forwardRef` with proper generic types when creating reusable UI primitives that accept DOM refs.
4. **Domain Types Co-location**:
   - Place domain data structures in `src/data/` (e.g., `ServiceItem`, `InsightItem`, `Author`).
   - Shared utility types belong in `@/lib/` or alongside their respective components.

---

## 4. UI/UX & Design System Constraints

1. **Brand Palette Preservation**:
   - Never introduce arbitrary colors outside the defined design system.
   - **Background**: `#dbd8cf` (Warm linen canvas).
   - **Foreground / Text**: `#000000` (Sharp black).
   - **Primary / Accent**: `#093103` (Deep forest green).
   - **Primary Foreground**: `#ffffff` (Pure white on forest green).
   - **Muted / Secondary**: `#dbd8cf` with border/tint variations.
2. **Class Merging with `cn()`**:
   - Always use `cn(...)` from `@/lib/utils` to combine Tailwind classes and merge conflicting utilities.
   - Do NOT use manual string concatenations for class names (`"px-4 " + className`).
3. **Responsive Breakpoints**:
   - Design mobile-first. Every component must be tested across mobile (`sm: 640px`), tablet (`md: 768px`), desktop (`lg: 1024px`), and wide screens (`xl: 1280px`).
   - Ensure touch targets on mobile are at least 44x44px.

---

## 5. File & Folder Organization

```
src/
├── app/               # Page routes, layouts, metadata, manifest, sitemap
├── components/        # React components
│   ├── admin/         # CMS and rich text editor components
│   ├── insights/      # Insights and blog-specific components
│   ├── layout/        # Navbar, Footer, WhatsAppButton, JsonLd
│   ├── sections/      # Composable landing page blocks
│   └── ui/            # Atomic, reusable design primitives (Button, Card, Badge)
├── data/              # Static typed data sources (services, insights)
└── lib/               # Utility functions and browser storage adapters
```

- **Naming Conventions**:
  - React components & files: `PascalCase.tsx` (e.g. `HeroSection.tsx`, `WordEditor.tsx`).
  - Route files: `page.tsx`, `layout.tsx`, `loading.tsx`, `not-found.tsx`.
  - Utility and data files: `camelCase.ts` (e.g. `utils.ts`, `servicesData.ts`, `insightsStorage.ts`).
  - CSS variables and custom utility classes: `kebab-case` (e.g. `bg-grid-white`, `glass-card`).

---

## 6. Component Architecture & State Management

1. **Server vs. Client Separation**:
   - Keep page wrappers (`page.tsx`) as Server Components wherever possible to maximize static HTML rendering and dynamic SEO metadata injection.
   - Restrict `"use client"` directives only to components that require React hooks (`useState`, `useEffect`, `useMemo`), DOM event handlers, or browser APIs.
2. **State Minimization**:
   - Prefer deriving state via `useMemo` over synchronizing redundant state variables.
   - Keep UI state close to where it is consumed. Do not introduce heavy global state libraries (Redux, Zustand) for simple landing page interactions.
3. **Browser Storage & Event Bus**:
   - Access `window` or `localStorage` only within `useEffect` or inside event handlers to avoid server-side hydration mismatches (`typeof window !== "undefined"`).
   - Use custom window events (`CustomEvent("insights_updated")`) to synchronize disparate client components when storage mutations occur.

---

## 7. Error Handling, Resilience & Fallbacks

1. **Defensive Storage Operations**:
   - Always wrap `localStorage` access in `try / catch` blocks to handle private browsing modes, quota limitations, or restricted browser permissions.
   - Always provide a deterministic fallback to static mock data if storage access fails.
2. **Graceful 404 / Missing Content**:
   - For missing article slugs, render an informative empty state with a direct CTA back to the directory rather than an unstyled white screen or throw error.
3. **Image Fallbacks**:
   - Ensure all `<img>` tags provide meaningful `alt` attributes and fallbacks for failed image loads.

---

## 8. Accessibility & SEO Standards

1. **Semantic HTML Elements**:
   - Use `<header>`, `<nav>`, `<main>`, `<article>`, `<section>`, `<footer>`, `<aside>` instead of generic `<div>` soup.
2. **Interactive Elements**:
   - Every `<button>` or `<a>` without visible text must have an explicit `aria-label` or `title` (e.g. WhatsApp button, social media icons, mobile menu toggle).
3. **Structured Data (Schema.org)**:
   - When introducing new page types, ensure corresponding JSON-LD structured data is emitted for Google bots (`src/components/layout/JsonLd.tsx`).
4. **Metadata Directives**:
   - Every public page must export a `metadata` object with a title, description, canonical URL, and OpenGraph parameters.

---

## 9. Dependency Management & Code Cleanliness

1. **Zero Unnecessary Dependencies**:
   - Do NOT install heavy libraries (Moment.js, Lodash, jQuery, Axios, Framer Motion) when native TypeScript, vanilla CSS transitions, and native browser APIs suffice.
   - The current stack (`Next.js 14`, `Tailwind CSS`, `Lucide React`, `CVA`) is complete. Consult the user before adding third-party packages.
2. **No Dead or Duplicate Code**:
   - Eliminate unused imports, orphan variables, commented-out dead code, and redundant helper functions before completing any task.
3. **Preserve Documentation Integrity**:
   - Never delete or blindly overwrite existing markdown documentation, comments, or docstrings unless explicitly directed.

---

## 10. Testing, Verification & Git Discipline

1. **Mandatory Build Verification**:
   - Before reporting a task complete, run `npx next build` in the terminal to verify zero compilation or static generation regressions.
2. **Clean Commit Practices**:
   - Keep commits atomic, concise, and descriptive (e.g. `feat: implement project scope calculator`, `fix: resolve mobile navbar contrast`).
   - Do not stage or commit build artifacts like `.next/` or temporary test files.
