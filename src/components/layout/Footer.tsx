'use client'
import Link from 'next/link'
import { Container, SocialIcon, AnchorLink } from '@/components/ui'

const CURRENT_YEAR = new Date().getFullYear()

const NAV_LINKS = [
  { label: 'О нас', href: '/#about' },
  { label: 'Услуги и стоимость', href: '/#price' },
  { label: 'Как мы работаем', href: '/#process' },
  { label: 'Контакты', href: '/#contacts' },
]

export function Footer() {
  return (
    <footer className="bg-[var(--color-pink)]">
      <Container>
        <div className="py-12 md:py-16 grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          {/* Логотип */}
          <div>
            <Link href="/" className="flex flex-col leading-tight mb-4">
              <span className="font-bold text-2xl text-[var(--color-dark)] uppercase tracking-widest">
                KARPENKO
              </span>
              <span className="text-xs text-[var(--color-muted)] tracking-[0.2em] uppercase">
                Wedding Agency
              </span>
            </Link>
            <p className="text-sm text-[var(--color-muted)]">
              Ателье событий Екатерины Карпенко
            </p>
          </div>

          {/* Навигация */}
          <nav className="flex flex-col gap-3">
            {NAV_LINKS.map((link) => (
              <AnchorLink
                key={link.href}
                href={link.href}
                className="text-sm text-[var(--color-dark)] hover:text-[var(--color-orange)] transition-colors"
              >
                {link.label}
              </AnchorLink>
            ))}
            <Link
              href="/privacy"
              className="text-sm text-[var(--color-muted)] hover:text-[var(--color-orange)] transition-colors mt-2"
            >
              Политика конфиденциальности
            </Link>
          </nav>

          {/* Контакты + соцсети */}
          <div className="flex flex-col gap-3">
            <a
              href="tel:+70000000000"
              className="text-sm font-semibold text-[var(--color-dark)] hover:text-[var(--color-orange)] transition-colors"
            >
              +7 (000) 000-00-00
            </a>
            <div className="flex gap-4 mt-1">
              <SocialIcon type="instagram" href="#" />
              <SocialIcon type="telegram" href="#" />
            </div>
          </div>
        </div>

        {/* Нижняя строка */}
        <div className="border-t border-[var(--color-dark)]/20 py-4 flex flex-col md:flex-row justify-between items-center gap-2 text-xs text-[var(--color-muted)]">
          <span>
            © {CURRENT_YEAR} Ателье событий Екатерины Карпенко. Все права защищены.
          </span>
          <span>ИП Карпенко Е.А. | ИНН: 000000000000</span>
        </div>
      </Container>
    </footer>
  )
}
