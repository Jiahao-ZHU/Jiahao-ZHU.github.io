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
