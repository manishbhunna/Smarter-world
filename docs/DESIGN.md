# UI/UX Design System Specification

**Product:** Acovate Web Platform  
**Design Philosophy:** Editorial Engineering & High-Contrast Precision  
**Theme:** Bespoke Light Canvas (Linen + Deep Forest Green + Black)  
**Last Updated:** October 2026  

---

## 1. Design Principles

1. **Editorial Rigor Over Generic SaaS**: Unlike ubiquitous blue SaaS templates or dark neon gradient sites, Acovate uses an organic, tactile, editorial aesthetic inspired by physical architecture monographs and elite engineering journals.
2. **Deterministic Clarity**: High information density paired with generous whitespace, crisp lines, and zero visual ambiguity.
3. **Subtle Motion**: Animations are purposeful and micro-interactive (hover lifts, smooth fades, gentle pulse indicators) without impeding sub-second rendering.
4. **Accessible High Contrast**: Strict compliance with WCAG 2.1 AA standards; all text and interactive states guarantee readability across varied lighting conditions.

---

## 2. Color System

The Acovate design system is anchored around three primary tones: **Warm Linen**, **Deep Forest Green**, and **Sharp Black**.

| Color Token | Hex Value | CSS Variable | Semantic Role |
| :--- | :--- | :--- | :--- |
| **Canvas Background** | `#dbd8cf` | `--background` | Main page canvas, cards, panels, and modal backdrops. |
| **Sharp Black** | `#000000` | `--foreground` | Primary typography, high-impact headings, active borders. |
| **Deep Forest Green** | `#093103` | `--primary` | Primary brand accent, primary CTA buttons, selection fill, focus rings. |
| **White** | `#ffffff` | `--primary-foreground`| Text on primary buttons, badge highlights, icon accents. |
| **Subtle Border** | `rgba(9, 49, 3, 0.20)` | `--border` | Card outlines, divider rules, subtle table separators. |
| **Active Border** | `#093103` | `--ring` | Hover states, active input outlines, highlighted cards. |
| **Text Secondary** | `rgba(0, 0, 0, 0.75)` | N/A | Subheadings, article excerpts, secondary metadata. |
| **Text Muted** | `rgba(0, 0, 0, 0.55)` | N/A | Captions, placeholders, disabled indicators. |

### Box Shadows
- **`shadow-forest`**: `0 4px 20px -2px rgba(9, 49, 3, 0.25)` — Used for primary buttons and interactive hover elevations.
- **`shadow-forest-lg`**: `0 10px 30px -5px rgba(9, 49, 3, 0.35)` — Used for prominent CTA buttons and floating action elements.
- **`shadow-card`**: `0 2px 12px 0 rgba(9, 49, 3, 0.08)` — Standard subtle card elevation.

---

## 3. Typography

The platform utilizes a clean, modern system sans-serif font stack with high-legibility features enabled (`font-feature-settings: "rlig" 1, "calt" 1; -webkit-font-smoothing: antialiased;`).

### Hierarchy & Scale

| Style / Scale | Tailwind Classes | Desktop Size | Mobile Size | Line Height | Usage |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Display 1** | `text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight` | 72px | 36px | 1.08 | Hero main headlines, high-impact titles |
| **Heading 1** | `text-3xl sm:text-5xl font-extrabold tracking-tight` | 48px | 30px | 1.15 | Section main titles, case study titles |
| **Heading 2** | `text-2xl sm:text-3xl font-bold tracking-tight` | 30px | 24px | 1.25 | Card headers, subsection titles |
| **Heading 3** | `text-xl font-bold` | 20px | 18px | 1.30 | Feature headers, dialog titles |
| **Body Large** | `text-base sm:text-xl font-normal leading-relaxed` | 20px | 16px | 1.60 | Editorial lead intros, hero descriptions |
| **Body Base** | `text-sm sm:text-base font-normal leading-relaxed` | 16px | 14px | 1.60 | Standard paragraphs, service descriptions |
| **Eyebrow / Badge** | `text-xs font-bold uppercase tracking-wider` | 12px | 12px | 1.40 | Category tags, status badges, section eyebrows |
| **Fine Print** | `text-[10px] sm:text-xs text-black/60` | 11px | 10px | 1.40 | Legal disclaimers, timestamps, copyright |

---

## 4. Spacing & Layout Grid

- **Global Container**: Centered container with max-width:
  - Default: `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8` (1280px max).
  - Editorial Reading Width: `max-w-4xl mx-auto` (896px max) for articles.
  - Form & Scoping Tool: `max-w-3xl mx-auto` (768px max).
- **Vertical Spacing Cadence**:
  - Section Padding: `py-16 sm:py-20 lg:py-24`
  - Component Gap: `space-y-4` to `space-y-8`
  - Card Grids: `gap-6` or `gap-8`
- **Border Radii**:
  - Cards: `rounded-2xl` (16px)
  - Buttons & Inputs: `rounded-xl` (12px)
  - Badges & Pills: `rounded-full` (9999px)
  - Small Elements / Checkboxes: `rounded-lg` (8px)

### Architectural Textures & Grids
- **Matrix Grid (`bg-grid-white`)**:
  `background-size: 40px 40px;` with subtle green rule `rgba(9, 49, 3, 0.08) 1px`.
- **Radial Dot Pattern (`bg-dots-pattern`)**:
  `background-size: 24px 24px;` with radial dots `rgba(9, 49, 3, 0.12) 1px`.

---

## 5. Component Specifications

### 5.1 Buttons (`Button.tsx`)
Built using `class-variance-authority` (CVA):

```tsx
// Primary CTA Variant
<Button variant="default" size="lg">
  Schedule Technical Discovery
  <ArrowRight className="w-4 h-4 ml-2" />
</Button>
```

- **Variants**:
  - `default`: Background `#093103`, text white, `shadow-forest`, hover `bg-black`, active `scale-[0.98]`.
  - `outline`: Border `2px solid #093103`, background transparent, text black, hover `bg-[#093103]` with white text.
  - `ghost`: Transparent background, hover `bg-[#093103]` with white text.
  - `secondary`: `#093103` solid with hover `bg-black`.
  - `dark`: Pure black `#000000` background, hover `bg-[#093103]`.
- **Sizes**:
  - `sm`: `h-9 px-3.5 text-xs`
  - `default`: `h-11 px-5 py-2.5 text-sm`
  - `lg`: `h-12 px-7 text-base font-semibold`
  - `icon`: `h-10 w-10 rounded-xl`

### 5.2 Badges (`Badge.tsx`)
Pill badges used for category classification and status indicators:
- Base: `rounded-full px-3 py-1 text-xs font-semibold tracking-wide`.
- Variants:
  - `default`: Solid `#093103` with white text.
  - `secondary`: `#dbd8cf` background with `#093103` border.
  - `outline`: Border `#093103`, text black.

### 5.3 Cards (`Card.tsx` & `.glass-card`)
- Base styling:
  `rounded-2xl border border-[#093103]/20 bg-[#dbd8cf] text-black shadow-card transition-all duration-300`
- Hover state:
  `hover:border-[#093103] hover:shadow-forest hover:-translate-y-1`
- Sub-components: `CardHeader`, `CardTitle`, `CardDescription`, `CardContent`, `CardFooter`.

### 5.4 Form Controls (`Input.tsx`)
- Height: `h-11` for standard input.
- Styling: `rounded-xl border border-[#093103]/40 bg-[#dbd8cf] px-4 text-sm text-black placeholder:text-black/50`.
- Focus ring: `focus:border-[#093103] focus:ring-2 focus:ring-[#093103]/25 outline-none`.

### 5.5 Navigation Bar (`Navbar.tsx`)
- Positioning: `sticky top-0 z-50 w-full`
- Backdrop: `bg-[#dbd8cf]/70 backdrop-blur-md border-b border-[#093103]/15`
- Dynamic on scroll: When scrolled > 20px, deepens blur to `bg-[#dbd8cf]/90 backdrop-blur-xl shadow-card`.
- Desktop menu: Pill-shaped navigation floating in header center.
- Mobile menu: Smooth slide-down drawer with full viewport touch targets.

### 5.6 Floating WhatsApp Button (`WhatsAppButton.tsx`)
- Fixed position: `fixed bottom-6 right-6 z-50`
- Circular container: `w-12 h-12 rounded-full bg-[#093103] text-white shadow-forest`
- Hover micro-interaction: `hover:scale-110 hover:bg-black hover:shadow-forest-lg`

---

## 6. Interactive States & Micro-Interactions

### 6.1 Loading States
- **Spinners**: Dual-tone rotating loader:
  `w-8 h-8 border-2 border-[#093103] border-t-transparent rounded-full animate-spin`
- **Pulsing Badges**: Small green or white pulsating dots signaling live systems (`animate-pulse`).

### 6.2 Empty & 404 States
- Centered card container with an iconic illustration/symbol (`FileText`, `Search`).
- Clear heading: "Article Not Found" or "No Services Found".
- Explanatory copy with a one-click action to reset filters or return home.

### 6.3 Focus & Accessibility Outlines
- All interactive controls feature visible focus outlines:
  `*:focus-visible { outline: 2px solid #093103; outline-offset: 2px; }`
- Custom high-contrast scrollbar styled to match the linen canvas with forest green thumb.

---

## 7. Responsive Breakpoints

| Breakpoint | Minimum Width | Target Devices | Layout Behavior |
| :--- | :--- | :--- | :--- |
| **`xs`** | `< 640px` | Phones (iPhone, Pixel) | 1-column layouts, stacked cards, drawer navigation |
| **`sm`** | `640px` | Large phones, phablets | 2-column stats, expanded padding |
| **`md`** | `768px` | Tablets (iPad Portrait) | 2-column card grids, desktop navbar enabled |
| **`lg`** | `1024px` | Laptops, iPad Landscape | 3-column service grids, sticky sidebars |
| **`xl`** | `1280px` | Desktop Monitors | Full 4-column metric grids, 1280px container max |

---

## 8. Dark / Light Mode Policy

- **Intentional Light Aesthetic**: The site is explicitly locked to `color-scheme: light;` in `src/app/globals.css`.
- **Rationale**: The editorial brand identity depends on the physical texture of warm linen canvas (`#dbd8cf`) paired with dark organic forest green ink (`#093103`). Automatic browser dark mode inversions are disabled to preserve brand integrity.
