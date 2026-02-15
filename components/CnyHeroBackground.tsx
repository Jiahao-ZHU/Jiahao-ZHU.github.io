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
