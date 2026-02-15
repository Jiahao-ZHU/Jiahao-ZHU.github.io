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
