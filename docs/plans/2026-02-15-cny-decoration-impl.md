# Chinese New Year Decoration — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add temporary, auto-toggling Chinese New Year decorations to the homepage (lantern icon in navbar, greeting text, subtle background texture).

**Architecture:** A lookup table in `lib/cny.ts` holds CNY dates and zodiac signs for 2025–2050. A client-side React hook (`useCnyStatus`) checks whether today falls within the display window (7 days before CNY → Lantern Festival). Three visual components (lantern SVG, greeting text, background texture) conditionally render on the homepage only.

**Tech Stack:** Next.js 15, React 19, TypeScript, Tailwind CSS. No new dependencies.

---

### Task 1: Create CNY Data & Logic (`lib/cny.ts`)

**Files:**
- Create: `lib/cny.ts`

**Step 1: Create the CNY lookup table and helper**

```typescript
// lib/cny.ts

export type CnyInfo = {
  /** Chinese New Year date (first day of lunar year) in YYYY-MM-DD */
  date: string;
  /** Chinese zodiac animal character, e.g. "马" */
  zodiac: string;
};

/**
 * Chinese New Year dates and zodiac animals, 2025–2050.
 * Source: Hong Kong Observatory / timeanddate.com
 */
const CNY_DATA: Record<number, CnyInfo> = {
  2025: { date: "2025-01-29", zodiac: "蛇" },
  2026: { date: "2026-02-17", zodiac: "马" },
  2027: { date: "2027-02-06", zodiac: "羊" },
  2028: { date: "2028-01-26", zodiac: "猴" },
  2029: { date: "2029-02-13", zodiac: "鸡" },
  2030: { date: "2030-02-03", zodiac: "狗" },
  2031: { date: "2031-01-23", zodiac: "猪" },
  2032: { date: "2032-02-11", zodiac: "鼠" },
  2033: { date: "2033-01-31", zodiac: "牛" },
  2034: { date: "2034-02-19", zodiac: "虎" },
  2035: { date: "2035-02-08", zodiac: "兔" },
  2036: { date: "2036-01-28", zodiac: "龙" },
  2037: { date: "2037-02-15", zodiac: "蛇" },
  2038: { date: "2038-02-04", zodiac: "马" },
  2039: { date: "2039-01-24", zodiac: "羊" },
  2040: { date: "2040-02-12", zodiac: "猴" },
  2041: { date: "2041-02-01", zodiac: "鸡" },
  2042: { date: "2042-01-22", zodiac: "狗" },
  2043: { date: "2043-02-10", zodiac: "猪" },
  2044: { date: "2044-01-30", zodiac: "鼠" },
  2045: { date: "2045-02-17", zodiac: "牛" },
  2046: { date: "2046-02-06", zodiac: "虎" },
  2047: { date: "2047-01-26", zodiac: "兔" },
  2048: { date: "2048-02-14", zodiac: "龙" },
  2049: { date: "2049-02-02", zodiac: "蛇" },
  2050: { date: "2050-01-23", zodiac: "马" },
};

/** Days before CNY to start showing decorations */
const LEAD_DAYS = 7;
/** Days after CNY for Lantern Festival (正月十五) */
const LANTERN_OFFSET = 14;

export type CnyStatus = {
  active: true;
  zodiac: string;
  year: number;
} | {
  active: false;
};

/**
 * Check if a given date falls within the CNY display window.
 * Window: 7 days before CNY → 14 days after CNY (Lantern Festival).
 * Checks both the current year and the next year's CNY to handle
 * edge cases near year boundaries.
 */
export function getCnyStatus(today: Date = new Date()): CnyStatus {
  const currentYear = today.getFullYear();
  // Check current year and next year (CNY can be in Jan/Feb)
  const yearsToCheck = [currentYear, currentYear + 1, currentYear - 1];

  for (const year of yearsToCheck) {
    const data = CNY_DATA[year];
    if (!data) continue;

    const cnyDate = new Date(data.date + "T00:00:00");
    const startDate = new Date(cnyDate);
    startDate.setDate(startDate.getDate() - LEAD_DAYS);
    const endDate = new Date(cnyDate);
    endDate.setDate(endDate.getDate() + LANTERN_OFFSET);

    if (today >= startDate && today <= endDate) {
      return { active: true, zodiac: data.zodiac, year };
    }
  }

  return { active: false };
}
```

**Step 2: Verify the file compiles**

Run: `npx tsc --noEmit lib/cny.ts`
Expected: No errors

**Step 3: Commit**

```bash
git add lib/cny.ts
git commit -m "feat: add CNY date lookup table and status helper"
```

---

### Task 2: Create `useCnyStatus` Hook (`lib/useCnyStatus.ts`)

**Files:**
- Create: `lib/useCnyStatus.ts`

**Step 1: Create the client-side hook**

This hook wraps `getCnyStatus` for safe client-side usage, avoiding SSG hydration mismatch by defaulting to inactive during SSR.

```typescript
// lib/useCnyStatus.ts
"use client";

import { useState, useEffect } from "react";
import { getCnyStatus, type CnyStatus } from "./cny";

/**
 * Client-side hook that checks CNY status after mount.
 * Returns { active: false } during SSR/SSG to avoid hydration mismatch.
 */
export function useCnyStatus(): CnyStatus {
  const [status, setStatus] = useState<CnyStatus>({ active: false });

  useEffect(() => {
    setStatus(getCnyStatus());
  }, []);

  return status;
}
```

**Step 2: Verify the file compiles**

Run: `npx tsc --noEmit lib/useCnyStatus.ts`
Expected: No errors

**Step 3: Commit**

```bash
git add lib/useCnyStatus.ts
git commit -m "feat: add useCnyStatus client-side hook"
```

---

### Task 3: Create Lantern Icon Component (`components/LanternIcon.tsx`)

**Files:**
- Create: `components/LanternIcon.tsx`

**Step 1: Create the SVG lantern component**

A minimal, stroke-only lantern SVG that matches the site's accent color.

```tsx
// components/LanternIcon.tsx

export function LanternIcon({ className }: { className?: string }) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {/* Top hook */}
      <line x1="12" y1="1" x2="12" y2="4" />
      {/* Top cap */}
      <line x1="8" y1="4" x2="16" y2="4" />
      {/* Lantern body (elliptical) */}
      <ellipse cx="12" cy="12" rx="6" ry="8" />
      {/* Center horizontal line (decorative band) */}
      <line x1="6" y1="12" x2="18" y2="12" />
      {/* Bottom cap */}
      <line x1="9" y1="20" x2="15" y2="20" />
      {/* Bottom tassel */}
      <line x1="12" y1="20" x2="12" y2="23" />
    </svg>
  );
}
```

**Step 2: Commit**

```bash
git add components/LanternIcon.tsx
git commit -m "feat: add minimal stroke-only lantern SVG icon"
```

---

### Task 4: Create CNY Greeting Component (`components/CnyGreeting.tsx`)

**Files:**
- Create: `components/CnyGreeting.tsx`

**Step 1: Create the greeting component**

A small greeting line that matches the existing `section-label` style (11px, uppercase-like letter-spacing, secondary color).

```tsx
// components/CnyGreeting.tsx
"use client";

import { useCnyStatus } from "@/lib/useCnyStatus";

export function CnyGreeting() {
  const status = useCnyStatus();

  if (!status.active) return null;

  return (
    <p
      className="text-[11px] text-text-secondary tracking-[0.15em] mt-3 mb-1"
    >
      恭贺新禧 · {status.zodiac}年大吉
    </p>
  );
}
```

**Step 2: Commit**

```bash
git add components/CnyGreeting.tsx
git commit -m "feat: add CNY greeting text component"
```

---

### Task 5: Create CNY Hero Background Component (`components/CnyHeroBackground.tsx`)

**Files:**
- Create: `components/CnyHeroBackground.tsx`

**Step 1: Create the background texture component**

An absolutely-positioned overlay with a faint 回纹 (meander/Greek key) pattern. Renders behind hero content.

```tsx
// components/CnyHeroBackground.tsx
"use client";

import { useCnyStatus } from "@/lib/useCnyStatus";

/**
 * Subtle meander pattern (回纹) background overlay for the hero section.
 * Uses an inline SVG pattern at 3% opacity.
 */
export function CnyHeroBackground() {
  const status = useCnyStatus();

  if (!status.active) return null;

  // Simplified meander/回纹 pattern as inline SVG data URI
  const pattern = `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h10v10H0zm10 0h10v10h-5v5H10zm20 0h10v10H30zm-10 10h10v10h-5v5H20zm20 0h10v10H40zM0 20h10v10H0zm20 0h10v10H30zM10 30h10v10h-5v5H10zm20 0h10v10h-5v5H30z' fill='currentColor' fill-opacity='1'/%3E%3C/svg%3E")`;

  return (
    <div
      className="absolute inset-0 pointer-events-none opacity-[0.03] text-text"
      style={{ backgroundImage: pattern, backgroundSize: "40px 40px" }}
      aria-hidden="true"
    />
  );
}
```

**Step 2: Commit**

```bash
git add components/CnyHeroBackground.tsx
git commit -m "feat: add CNY hero background texture component"
```

---

### Task 6: Integrate Lantern Icon into Navbar (`components/Nav.tsx`)

**Files:**
- Modify: `components/Nav.tsx:1-39`

**Step 1: Add lantern icon to navbar**

Add the `CnyNavLantern` (a small client wrapper) next to the brand link.

First, create a tiny client component to keep `Nav.tsx` as a server component:

Create `components/CnyNavLantern.tsx`:

```tsx
// components/CnyNavLantern.tsx
"use client";

import { useCnyStatus } from "@/lib/useCnyStatus";
import { LanternIcon } from "./LanternIcon";

export function CnyNavLantern() {
  const status = useCnyStatus();

  if (!status.active) return null;

  return <LanternIcon className="text-accent ml-1.5" />;
}
```

Then modify `components/Nav.tsx` — add import and render the lantern beside the brand name:

Change the brand `<Link>` block at lines 15-20 from:

```tsx
        <Link
          href="/"
          className="font-serif text-xl font-semibold text-text tracking-tight"
        >
          Jiahao Zhu
        </Link>
```

To:

```tsx
        <div className="flex items-center">
          <Link
            href="/"
            className="font-serif text-xl font-semibold text-text tracking-tight"
          >
            Jiahao Zhu
          </Link>
          <CnyNavLantern />
        </div>
```

And add the import at the top of `Nav.tsx`:

```typescript
import { CnyNavLantern } from "./CnyNavLantern";
```

**Step 2: Verify dev server renders correctly**

Run: `npm run dev`
Check: http://localhost:3000 — lantern should appear beside "Jiahao Zhu" if within CNY window (or verify by temporarily hardcoding `active: true` in the hook)

**Step 3: Commit**

```bash
git add components/CnyNavLantern.tsx components/Nav.tsx
git commit -m "feat: add CNY lantern icon to navbar"
```

---

### Task 7: Integrate Greeting & Background into Homepage (`app/page.tsx`)

**Files:**
- Modify: `app/page.tsx:1-53` (hero section)

**Step 1: Add CNY components to the hero section**

Add imports at the top of `app/page.tsx` (after line 3):

```typescript
import { CnyGreeting } from "@/components/CnyGreeting";
import { CnyHeroBackground } from "@/components/CnyHeroBackground";
```

Modify the hero `<section>` at line 11 to be `relative` (for background positioning):

Change:
```tsx
      <section className="pt-16 pb-12 flex gap-10 items-start">
```

To:
```tsx
      <section className="pt-16 pb-12 flex gap-10 items-start relative">
        <CnyHeroBackground />
```

Add the `<CnyGreeting />` component after the bio paragraph (after line 32, before the links `<div>`):

Between the closing `</p>` of the bio (line 32) and the `<div className="flex gap-5">` (line 33), add:

```tsx
          <CnyGreeting />
```

**Step 2: Verify dev server renders correctly**

Run: `npm run dev`
Check at http://localhost:3000:
- Greeting text "恭贺新禧 · 马年大吉" appears below bio, above links
- Faint background texture visible in hero area
- Both elements only render during CNY window

**Step 3: Verify static build works**

Run: `npm run build`
Expected: Build completes without errors. Static export in `out/` works correctly.

**Step 4: Commit**

```bash
git add app/page.tsx
git commit -m "feat: integrate CNY greeting and background into homepage hero"
```

---

### Task 8: Visual Verification & Final Adjustments

**Step 1: Test both themes**

Run: `npm run dev`
Check at http://localhost:3000:
- Light mode: lantern and greeting use correct colors
- Dark mode: lantern uses `#E8384F`, greeting uses dark secondary color, background texture uses light pattern at 3%
- Toggle between themes — transitions are smooth

**Step 2: Test date logic edge cases**

Temporarily modify `useCnyStatus.ts` to test:
1. Set date to `2026-02-10` (7 days before CNY) → should show
2. Set date to `2026-03-03` (Lantern Festival) → should show
3. Set date to `2026-03-04` (day after Lantern Festival) → should NOT show
4. Set date to `2026-06-15` (mid-year) → should NOT show
5. Set date to `2027-01-30` (7 days before 2027 CNY) → should show with zodiac "羊"

Revert any test modifications after verification.

**Step 3: Test responsive layout**

Check at various widths:
- Desktop (1200px+): lantern beside brand, greeting below bio
- Tablet (768px): layout still works
- Mobile (375px): elements don't break layout or overflow

**Step 4: Verify static build**

Run: `npm run build && npx serve out`
Check: Site works correctly as static export. CNY elements render client-side after hydration.

**Step 5: Final commit**

If any adjustments were made during testing:
```bash
git add -A
git commit -m "fix: adjust CNY decoration styling after visual review"
```
