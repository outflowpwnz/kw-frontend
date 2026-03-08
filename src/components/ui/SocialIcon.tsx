import { cn } from '@/lib/utils'

type SocialType = 'instagram' | 'telegram'

interface SocialIconProps {
  type: SocialType
  href: string
  className?: string
  size?: number
}

export function SocialIcon({ type, href, className, size = 20 }: SocialIconProps) {
  const label = type === 'instagram' ? 'Instagram' : 'Telegram'

  return (
    <a
      href={href}
      aria-label={label}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        'text-[var(--color-dark)] hover:text-[var(--color-orange)] transition-colors',
        className
      )}
    >
      {type === 'instagram' && (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
        </svg>
      )}
      {type === 'telegram' && (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12l-6.871 4.326-2.962-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.833.941z" />
        </svg>
      )}
    </a>
  )
}
