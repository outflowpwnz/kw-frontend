import { cn } from '@/lib/utils'

interface ProseProps {
  /** HTML-строка из редактора (dangerouslySetInnerHTML) */
  html?: string
  children?: React.ReactNode
  className?: string
}

/**
 * Обёртка для текстового контента из редактора или статических страниц.
 * Автоматически стилизует h1-h6, p, blockquote, ul/ol, a, hr и другие теги
 * через @tailwindcss/typography, перекрашенный под нашу дизайн-систему.
 */
export function Prose({ html, children, className }: ProseProps) {
  const classes = cn(
    'prose max-w-none',
    // Перекрашиваем стандартные токены typography под нашу палитру
    '[--tw-prose-body:var(--color-dark)]',
    '[--tw-prose-headings:var(--color-dark)]',
    '[--tw-prose-lead:var(--color-muted)]',
    '[--tw-prose-links:var(--color-orange)]',
    '[--tw-prose-bold:var(--color-dark)]',
    '[--tw-prose-counters:var(--color-muted)]',
    '[--tw-prose-bullets:var(--color-marker)]',
    '[--tw-prose-hr:var(--color-marker)]',
    '[--tw-prose-quotes:var(--color-dark)]',
    '[--tw-prose-quote-borders:var(--color-marker)]',
    '[--tw-prose-captions:var(--color-muted)]',
    '[--tw-prose-code:var(--color-dark)]',
    '[--tw-prose-th-borders:var(--color-marker)]',
    '[--tw-prose-td-borders:var(--color-marker)]',
    // Заголовки — Cormorant, uppercase, как в остальном сайте
    '[&_h1]:font-display [&_h1]:uppercase [&_h1]:font-normal [&_h1]:tracking-[0.08em]',
    '[&_h2]:font-display [&_h2]:uppercase [&_h2]:font-normal [&_h2]:tracking-[0.08em]',
    '[&_h3]:font-sans [&_h3]:font-bold',
    // Цитаты — как компонент Quote: полоса слева, Cormorant italic muted
    '[&_blockquote]:not-italic [&_blockquote]:border-l-2 [&_blockquote]:border-[var(--color-marker)] [&_blockquote]:pl-5 [&_blockquote]:py-1 [&_blockquote]:my-0',
    '[&_blockquote_p]:font-display [&_blockquote_p]:italic [&_blockquote_p]:text-base [&_blockquote_p]:md:text-lg [&_blockquote_p]:text-[var(--color-muted)] [&_blockquote_p]:leading-relaxed [&_blockquote_p]:my-0',
    className,
  )

  if (html) {
    return <div className={classes} dangerouslySetInnerHTML={{ __html: html }} />
  }

  return <div className={classes}>{children}</div>
}
