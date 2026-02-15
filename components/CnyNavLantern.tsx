// components/CnyNavLantern.tsx
"use client";

import { useCnyStatus } from "@/lib/useCnyStatus";
import { LanternIcon } from "./LanternIcon";

export function CnyNavLantern() {
  const status = useCnyStatus();

  if (!status.active) return null;

  return <LanternIcon className="text-accent ml-1.5" />;
}
