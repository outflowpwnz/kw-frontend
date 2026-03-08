'use client'
import { useState, useEffect, useCallback } from 'react'
import { createPortal } from 'react-dom'
import Link from 'next/link'
import { Container, buttonVariants, SocialIcon, AnchorLink } from '@/components/ui'
import { cn } from '@/lib/utils'

const NAV_ITEMS = [
  { label: 'О нас', href: '/#about' },
  { label: 'Услуги и стоимость', href: '/#price' },
  { label: 'Что мы делаем', href: '/#process' },
  { label: 'Контакты', href: '/#contacts' },
]

const btnBase = buttonVariants({ variant: 'primary', size: 'sm' })

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => { setMounted(true) }, [])

  // Блокируем скролл страницы при открытом меню
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const close = useCallback(() => setMenuOpen(false), [])

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100">
        <Container>
          <div className="flex items-center justify-between h-16 nav:h-20">
            {/* Логотип */}
            <Link href="/" className="flex flex-col leading-tight">
              <span className="font-bold text-xl text-[var(--color-dark)] uppercase tracking-widest">
                KARPENKO
              </span>
              <span className="text-xs text-[var(--color-muted)] tracking-[0.2em] uppercase">
                Wedding Agency
              </span>
            </Link>

            {/* Навигация — desktop */}
            <nav className="hidden nav:flex items-center gap-8">
              {NAV_ITEMS.map((item) => (
                <AnchorLink
                  key={item.href}
                  href={item.href}
                  className="text-sm text-[var(--color-dark)] hover:text-[var(--color-orange)] transition-colors"
                >
                  {item.label}
                </AnchorLink>
              ))}
            </nav>

            {/* Правая часть — desktop */}
            <div className="hidden nav:flex items-center gap-4">
              <SocialIcon type="telegram" href="#" size={24} />
              <Link href="/anketa" className={`${btnBase} px-4 py-2 text-sm`}>
                Заполнить анкету
              </Link>
            </div>

            {/* Бургер — mobile */}
            <button
              className="nav:hidden flex flex-col gap-1.5 p-2"
              onClick={() => setMenuOpen(true)}
              aria-label="Открыть меню"
            >
              <span className="w-6 h-0.5 bg-[var(--color-dark)] block" />
              <span className="w-6 h-0.5 bg-[var(--color-dark)] block" />
              <span className="w-6 h-0.5 bg-[var(--color-dark)] block" />
            </button>
          </div>
        </Container>
      </header>

      {/*
        Мобильное меню — через portal в document.body.
        Это обходит backdrop-filter на <header>, который создаёт новый
        containing block и ограничивает дочерний fixed-элемент хедером.
      */}
      {mounted && createPortal(
        <div
          className={cn(
            'fixed inset-0 z-[200]',
            menuOpen ? 'pointer-events-auto' : 'pointer-events-none'
          )}
          aria-hidden={!menuOpen}
        >
          {/* Затемнение фона */}
          <div
            className={cn(
              'absolute inset-0 bg-black/50 transition-opacity duration-300',
              menuOpen ? 'opacity-100' : 'opacity-0'
            )}
            onClick={close}
          />

          {/* Панель — выезжает справа */}
          <div
            className={cn(
              'absolute top-0 right-0 h-full w-[300px] bg-white flex flex-col shadow-2xl',
              'transition-transform duration-300 ease-in-out',
              menuOpen ? 'translate-x-0' : 'translate-x-full'
            )}
          >
            {/* Шапка панели */}
            <div className="flex items-center justify-between px-6 h-16 flex-shrink-0">
              <span className="text-xs font-semibold text-[var(--color-muted)] uppercase tracking-widest">
                Меню
              </span>
              <button
                onClick={close}
                aria-label="Закрыть меню"
                className="w-8 h-8 flex items-center justify-center text-[var(--color-dark)] hover:text-[var(--color-orange)] transition-colors"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none">
                  <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            <div className="h-px bg-gray-100 flex-shrink-0" />

            {/* Пункты навигации */}
            <nav className="flex flex-col px-6 pt-8 gap-6 overflow-y-auto flex-1">
              {NAV_ITEMS.map((item, i) => (
                <AnchorLink
                  key={item.href}
                  href={item.href}
                  onClick={close}
                  className={cn(
                    'text-xl font-bold text-[var(--color-dark)] uppercase',
                    'hover:text-[var(--color-orange)] transition-all duration-300',
                    menuOpen ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-6'
                  )}
                  style={{ transitionDelay: menuOpen ? `${i * 60 + 120}ms` : '0ms' }}
                >
                  {item.label}
                </AnchorLink>
              ))}
            </nav>

            {/* CTA кнопка внизу */}
            <div className="px-6 pb-10 flex-shrink-0">
              <Link
                href="/anketa"
                onClick={close}
                className={cn(
                  `${btnBase} w-full py-4 text-base`,
                  'transition-all duration-300',
                  menuOpen ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-6'
                )}
                style={{ transitionDelay: menuOpen ? `${NAV_ITEMS.length * 60 + 120}ms` : '0ms' }}
              >
                Заполнить анкету
              </Link>
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  )
}
