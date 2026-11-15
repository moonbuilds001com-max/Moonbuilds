interface LogoProps {
  className?: string;
}

/**
 * The MOONBUILDS logomark: a crescent moon set against a skyline line.
 * Hand-authored SVG — reused from the original identity.
 */
export function LogoMark({ className }: LogoProps) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      {/* Crescent: full moon disc masked by an offset circle */}
      <path
        d="M16 2a14 14 0 1 0 0 28A14 14 0 0 0 16 2Zm0 4.4a9.6 9.6 0 1 1 0 19.2 9.6 9.6 0 0 1 0-19.2Z"
        fill="currentColor"
      />
      <path
        d="M16 2a14 14 0 0 1 0 28 14 14 0 0 0 0-28Zm0 4.4a9.6 9.6 0 0 1 0 19.2 9.6 9.6 0 0 0 0-19.2Z"
        fill="currentColor"
        opacity="0.001"
      />
      {/* Crescent mask */}
      <circle cx="21" cy="12" r="11" fill="#080808" className="logo-mask" />
      {/* Skyline line through the mark */}
      <path
        d="M3 21.5h4v-3h2.5v3H12v-5h2.5v5H17v-2.5h2v2.5h4.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}

export function Logo({ className }: LogoProps) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className ?? ""}`}>
      <LogoMark className="h-6 w-6 text-cream" />
      <span className="font-display text-sm font-bold tracking-[0.22em] text-cream">
        MOONBUILDS
      </span>
    </span>
  );
}
