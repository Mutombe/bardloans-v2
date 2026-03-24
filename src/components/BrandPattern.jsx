/**
 * Bard Santner brand pattern.
 *
 * variant:
 * - "navy" — mint strokes on transparent (for navy bg sections)
 * - "orange" — orange strokes on transparent (for CTA transitions)
 * - "orange-bg" — navy/white strokes on transparent (for orange bg sections, used as full overlay)
 */

export default function BrandPattern({ variant = 'navy', className = '' }) {
  const patternId = `bp-${variant}-${Math.random().toString(36).slice(2, 7)}`

  let stroke, strokeOp, fillOp
  if (variant === 'orange-bg') {
    stroke = '#1B1464'
    strokeOp = '0.08'
    fillOp = '0.02'
  } else if (variant === 'orange') {
    stroke = '#E8891D'
    strokeOp = '0.12'
    fillOp = '0.03'
  } else {
    stroke = '#5EEAD4'
    strokeOp = '0.12'
    fillOp = '0.03'
  }

  return (
    <div className={`w-full ${className}`}>
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
        <defs>
          <pattern id={patternId} x="0" y="0" width="36" height="36" patternUnits="userSpaceOnUse">
            <path d="M18 3 L33 18 L18 33 L3 18 Z" fill="none" stroke={stroke} strokeOpacity={strokeOp} strokeWidth="0.7" />
            <path d="M18 10 L26 18 L18 26 L10 18 Z" fill={stroke} fillOpacity={fillOp} stroke={stroke} strokeOpacity={parseFloat(strokeOp) * 0.7} strokeWidth="0.5" />
            <line x1="18" y1="0" x2="18" y2="36" stroke={stroke} strokeOpacity={parseFloat(strokeOp) * 0.5} strokeWidth="0.5" />
            <line x1="0" y1="18" x2="36" y2="18" stroke={stroke} strokeOpacity={parseFloat(strokeOp) * 0.5} strokeWidth="0.5" />
            <line x1="0" y1="0" x2="7" y2="7" stroke={stroke} strokeOpacity={strokeOp} strokeWidth="0.6" />
            <line x1="36" y1="0" x2="29" y2="7" stroke={stroke} strokeOpacity={strokeOp} strokeWidth="0.6" />
            <line x1="0" y1="36" x2="7" y2="29" stroke={stroke} strokeOpacity={strokeOp} strokeWidth="0.6" />
            <line x1="36" y1="36" x2="29" y2="29" stroke={stroke} strokeOpacity={strokeOp} strokeWidth="0.6" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#${patternId})`} />
      </svg>
    </div>
  )
}
