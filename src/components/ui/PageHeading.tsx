import { cn } from '@/lib/utils'

interface PageHeadingProps {
  /** Надпись над заголовком (eyebrow) */
  eyebrow?: string
  title: string
  className?: string
}

/**
 * Заголовок текстовых / утилитарных страниц (anketa, privacy и т.п.).
 * Не использует анимации — в отличие от MarkerHeading для лендинговых секций.
 */
export function PageHeading({ eyebrow, title, className }: PageHeadingProps) {
  return (
    <div className={cn('mb-10 md:mb-14', className)}>
      {eyebrow && (
        <p className="text-xs uppercase tracking-[0.2em] text-[var(--color-muted)] mb-3">
          {eyebrow}
        </p>
      )}
      <h1 className="text-4xl md:text-5xl lg:text-6xl text-[var(--color-dark)]">
        {title}
      </h1>
    </div>
  )
}
