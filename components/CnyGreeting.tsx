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
