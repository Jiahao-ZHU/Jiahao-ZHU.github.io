// components/CnyThemeProvider.tsx
"use client";

import { useEffect } from "react";
import { getCnyStatus } from "@/lib/cny";

/**
 * Adds/removes the "cny" class on <html> for seasonal styling.
 * Renders nothing — pure side-effect component.
 */
export function CnyThemeProvider() {
  useEffect(() => {
    const status = getCnyStatus();
    if (status.active) {
      document.documentElement.classList.add("cny");
    }
    return () => {
      document.documentElement.classList.remove("cny");
    };
  }, []);

  return null;
}
