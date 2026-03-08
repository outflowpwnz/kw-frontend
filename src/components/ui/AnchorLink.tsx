'use client'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { getHeaderHeight } from '@/lib/constants'

interface AnchorLinkProps {
  /** Формат: '/#about' */
  href: string
  children: React.ReactNode
  className?: string
  style?: React.CSSProperties
  onClick?: () => void
}

/**
 * Ссылка-якорь для навигации к секции главной страницы.
 * - На главной ('/') — плавный скролл через scrollIntoView без перезагрузки роута.
 * - На других страницах — обычная Next.js навигация к /#hash.
 */
export function AnchorLink({ href, children, className, style, onClick }: AnchorLinkProps) {
  const pathname = usePathname()
  const isHomePage = pathname === '/'
  const id = href.replace('/#', '')

  const handleClick = (e: React.MouseEvent) => {
    onClick?.()
    if (!isHomePage) return

    e.preventDefault()
    const el = document.getElementById(id)
    if (!el) return

    // scrollIntoView не работает на position:sticky элементах —
    // браузер считает их уже видимыми. Считаем позицию вручную,
    // суммируя offsetHeight предшествующих секций (как StickyStackController).
    const main = el.closest('main')
    let targetTop: number

    if (main) {
      const sections = Array.from(main.querySelectorAll<HTMLElement>(':scope > section'))
      const mainTop = main.getBoundingClientRect().top + window.scrollY
      let accumulated = 0
      for (const section of sections) {
        if (section === el || section.contains(el)) break
        accumulated += section.offsetHeight
      }
      // Вычитаем высоту фиксированного хедера
      targetTop = mainTop + accumulated - getHeaderHeight()
    } else {
      targetTop = el.getBoundingClientRect().top + window.scrollY - getHeaderHeight()
    }

    window.scrollTo({ top: targetTop, behavior: 'smooth' })
    window.history.pushState(null, '', href)
  }

  if (isHomePage) {
    return (
      <a href={href} onClick={handleClick} className={cn(className)} style={style}>
        {children}
      </a>
    )
  }

  return (
    <Link href={href} onClick={onClick} className={cn(className)} style={style}>
      {children}
    </Link>
  )
}
