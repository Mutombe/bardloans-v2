/**
 * Bard Santner brand pattern band — sits flush inside a dark section as a
 * decorative edge strip. Meant to be placed at the very top or bottom of
 * a section so it reads as part of that section's background.
 *
 * variant: "navy" (light strokes on dark) | "orange" (orange strokes on dark)
 */

export default function BrandPattern({ variant = 'navy', className = '' }) {
  const isNavy = variant === 'navy'
  const patternId = `bp-${variant}-${Math.random().toString(36).slice(2, 7)}`
  const stroke = isNavy ? '#5EEAD4' : '#E8891D'

  return (
    <div className={`w-full ${className}`}>
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
        <defs>
          <pattern id={patternId} x="0" y="0" width="36" height="36" patternUnits="userSpaceOnUse">
            {/* Diamond */}
            <path d="M18 3 L33 18 L18 33 L3 18 Z" fill="none" stroke={stroke} strokeOpacity="0.12" strokeWidth="0.7" />
            {/* Inner diamond */}
            <path d="M18 10 L26 18 L18 26 L10 18 Z" fill={stroke} fillOpacity="0.03" stroke={stroke} strokeOpacity="0.08" strokeWidth="0.5" />
            {/* Cross lines */}
            <line x1="18" y1="0" x2="18" y2="36" stroke={stroke} strokeOpacity="0.06" strokeWidth="0.5" />
            <line x1="0" y1="18" x2="36" y2="18" stroke={stroke} strokeOpacity="0.06" strokeWidth="0.5" />
            {/* Corner diagonals — the interlocking part */}
            <line x1="0" y1="0" x2="7" y2="7" stroke={stroke} strokeOpacity="0.1" strokeWidth="0.6" />
            <line x1="36" y1="0" x2="29" y2="7" stroke={stroke} strokeOpacity="0.1" strokeWidth="0.6" />
            <line x1="0" y1="36" x2="7" y2="29" stroke={stroke} strokeOpacity="0.1" strokeWidth="0.6" />
            <line x1="36" y1="36" x2="29" y2="29" stroke={stroke} strokeOpacity="0.1" strokeWidth="0.6" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#${patternId})`} />
      </svg>
    </div>
  )
}
