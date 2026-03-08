import { cn } from '@/lib/utils'

interface QuoteProps {
  children: React.ReactNode
  className?: string
}

export function Quote({ children, className }: QuoteProps) {
  return (
    <blockquote
      className={cn(
        'border-l-2 border-[var(--color-marker)] pl-5 py-1',
        className,
      )}
    >
      <p className="font-display italic text-base md:text-lg text-[var(--color-muted)] leading-relaxed">
        {children}
      </p>
    </blockquote>
  )
}
