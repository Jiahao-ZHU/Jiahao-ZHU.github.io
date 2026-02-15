# Chinese New Year Decoration — Design Document

**Date**: 2026-02-15
**Status**: Approved

## Goal

Add subtle Chinese New Year (CNY) decorative elements to the homepage that match the existing minimal academic aesthetic. Elements are temporary and automatically appear/disappear based on the lunar calendar.

## Design Decisions

- **Scope**: Homepage only (hero area + navbar)
- **Duration**: Temporary — auto-show during CNY season, auto-hide otherwise
- **Intensity**: Subtle but noticeable — maintains academic style
- **Date logic**: Lookup table (no external dependencies), covering ~25 years

## Elements

### 1. Navbar Lantern Icon

- Minimal stroke-only SVG lantern (~14px) beside the brand name "Jiahao Zhu"
- Color: existing accent `#C8102E` (light) / `#E8384F` (dark)
- Spacing: 6px gap from brand name

### 2. Hero Greeting Text

- Text: `恭贺新禧 · {zodiac}年大吉` (zodiac auto-filled from lookup table)
- Font size: 11px (matches section label style)
- Color: `var(--color-text-secondary)`
- Letter-spacing: 0.15em (matches section label style)
- Position: below bio paragraph, above existing links row

### 3. Hero Background Texture

- Geometric Chinese pattern (回纹 / meander pattern) as CSS SVG background
- Opacity: 3% — barely visible, adds atmospheric depth
- Scope: hero section only
- Dark mode: white pattern at 3% opacity (instead of dark)

### 4. Date Control Logic

**Lookup table approach**:

```typescript
type CnyData = { date: string; zodiac: string; lanternFestival: string }

const CNY_DATA: Record<number, CnyData> = {
  2026: { date: "2026-02-17", zodiac: "马", lanternFestival: "2026-03-03" },
  2027: { date: "2027-02-06", zodiac: "羊", lanternFestival: "2027-02-20" },
  // ... through 2050
}
```

**Display window**: 7 days before CNY → Lantern Festival (CNY + 14 days)

**Client-side only**: Use `useState` + `useEffect` to avoid SSG hydration mismatch. CSS default is hidden; client JS reveals if within date window.

## Files to Create/Modify

| File | Action | Description |
|------|--------|-------------|
| `lib/cny.ts` | Create | CNY date lookup table + helper functions |
| `components/LanternIcon.tsx` | Create | Minimal SVG lantern component |
| `components/CnyDecorations.tsx` | Create | Wrapper component with date logic + conditional rendering |
| `app/page.tsx` | Modify | Add CnyDecorations to hero section |
| `components/Navbar.tsx` | Modify | Conditionally render LanternIcon beside brand name |

## Constraints

- No external dependencies (no lunar calendar library)
- No SSR — all CNY logic is client-side to avoid hydration issues
- Static export compatibility must be maintained
- Graceful degradation: if year not in table, show nothing
