'use client'
import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { getHeaderHeight } from '@/lib/constants'

/**
 * Контроллер эффекта stacked sections.
 *
 * Для секций выше viewport: секция залипает (sticky), а её внутренний контент
 * плавно прокручивается вверх синхронно со скроллом документа.
 *
 * Edge cases:
 * - Reload на середине страницы — позиции вычисляются через getBoundingClientRect + scrollY
 * - Resize / orientation change — пересчёт через ResizeObserver + window resize
 * - Динамический контент (FAQ аккордеон) — ResizeObserver на каждой секции
 * - SSR — компонент 'use client', запускается только в браузере
 */
export function StickyStackController() {
  const pathname = usePathname()

  // Скролл к якорю при навигации на '/' с другой страницы.
  // Отдельный эффект с [pathname] — перезапускается при каждом переходе,
  // в отличие от основного эффекта sticky-контроллера (зависимость []).
  useEffect(() => {
    if (pathname !== '/') return

    const scrollToHash = () => {
      const hash = window.location.hash.slice(1)
      if (!hash) return

      const main = document.querySelector<HTMLElement>('main')
      if (!main) return

      const sections = Array.from(main.querySelectorAll<HTMLElement>(':scope > section'))
      const el = document.getElementById(hash)
      if (!el) return

      const mainTop = main.getBoundingClientRect().top + window.scrollY
      let accumulated = 0
      for (const section of sections) {
        if (section === el || section.contains(el)) break
        accumulated += section.offsetHeight
      }

      window.scrollTo({ top: mainTop + accumulated - getHeaderHeight(), behavior: 'smooth' })
    }

    // setTimeout даёт React время отрендерить секции перед подсчётом высот
    const t = setTimeout(scrollToHash, 100)
    return () => clearTimeout(t)
  }, [pathname])

  // Основной sticky-контроллер — запускается один раз при маунте layout'а
  useEffect(() => {
    const main = document.querySelector<HTMLElement>('main')
    if (!main) return

    const sections = Array.from(
      main.querySelectorAll<HTMLElement>(':scope > section')
    )

    // Вычисляем абсолютные top-позиции секций в документе.
    // Используем BoundingClientRect + scrollY чтобы корректно работать
    // при reload с восстановлением позиции скролла браузером.
    const computeTops = (): number[] => {
      const mainTop = main.getBoundingClientRect().top + window.scrollY
      let accumulated = 0
      return sections.map(section => {
        const top = mainTop + accumulated
        accumulated += section.offsetHeight
        return top
      })
    }

    let tops = computeTops()

    const update = () => {
      const vh = window.innerHeight

      sections.forEach((section, i) => {
        const sectionHeight = section.offsetHeight
        const extra = sectionHeight - vh
        const inner = section.firstElementChild as HTMLElement | null
        if (!inner) return

        if (extra <= 0) {
          // Секция помещается в экран — убираем трансформацию и центрируем
          inner.style.transform = ''
          section.style.justifyContent = ''
          return
        }

        // Секция выше экрана — выравниваем по верху и прокручиваем контент
        section.style.justifyContent = 'flex-start'

        const scrolled = window.scrollY - tops[i]
        const translateY = Math.min(Math.max(scrolled, 0), extra)
        inner.style.transform = `translateY(-${translateY}px)`
        inner.style.willChange = 'transform'
      })
    }

    const onResize = () => {
      tops = computeTops()
      update()
    }

    // ResizeObserver пересчитывает позиции при изменении высоты любой секции
    // (например, открытие/закрытие FAQ аккордеона).
    // rAF гарантирует что layout завершён до пересчёта позиций.
    let rafId: number
    const ro = new ResizeObserver(() => {
      cancelAnimationFrame(rafId)
      rafId = requestAnimationFrame(() => {
        tops = computeTops()
        update()
      })
    })
    sections.forEach(s => ro.observe(s))

    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', onResize)

    // Первый прогон — применяем корректные трансформации сразу при маунте
    update()

    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', onResize)
      cancelAnimationFrame(rafId)
      ro.disconnect()

      // Сброс инлайн-стилей
      sections.forEach(section => {
        const inner = section.firstElementChild as HTMLElement | null
        if (inner) {
          inner.style.transform = ''
          inner.style.willChange = ''
        }
        section.style.justifyContent = ''
      })
    }
  }, [])

  return null
}
