import Image from 'next/image'
import { cn } from '@/lib/utils'

const SOFT_WHITE = 'oklch(0.97 0.01 250)'
const ELECTRIC_BLUE = 'oklch(0.66 0.19 255)'
const STROKE = 3.4

/**
 * Custom GOAT letterforms on a 20-unit cap height. Round letters overshoot
 * the cap line slightly for optical balance, and the T's bar overhangs the
 * A's right foot to tighten the A–T pair.
 */
export function Wordmark({ className, title = 'GOAT' }: { className?: string; title?: string }) {
  return (
    <svg
      viewBox="-0.5 1.5 78 21"
      role={title ? 'img' : undefined}
      aria-label={title || undefined}
      aria-hidden={title ? undefined : true}
      className={cn('block h-4 w-auto shrink-0', className)}
    >
      <g fill="none" stroke={SOFT_WHITE} strokeWidth={STROKE} strokeLinejoin="miter">
        <path d="M15.975 6.025A8.45 8.45 0 1 0 18.45 12H11.2" />
        <circle cx="33" cy="12" r="8.45" />
      </g>
      <path d="M44 22 52.2 2h3.6L64 22h-3.67L54 6.56 47.67 22H44Z" fill={SOFT_WHITE} />
      <path d="M50.95 14h6.1l1.31 3.2h-8.72L50.95 14Z" fill={ELECTRIC_BLUE} />
      <path d="M60 2h17v3.4h-6.8V22h-3.4V5.4H60V2Z" fill={SOFT_WHITE} />
    </svg>
  )
}

export function MascotLogo({ className, priority = false }: { className?: string; priority?: boolean }) {
  return (
    <Image
      src="/images/goat-mascot.png"
      alt="GOAT"
      width={1536}
      height={1024}
      priority={priority}
      className={cn('block h-10 w-auto shrink-0 rounded-md object-contain', className)}
    />
  )
}

export function Logo({ className }: { className?: string }) {
  return (
    <div className={cn('flex h-10 items-center', className)}>
      <MascotLogo priority />
    </div>
  )
}
