import Link from 'next/link'
import { Container } from '@/components/ui'

const CURRENT_YEAR = new Date().getFullYear()

const NAV_LINKS = [
  { label: 'О нас', href: '/#about' },
  { label: 'Услуги и стоимость', href: '/#price' },
  { label: 'Как мы работаем', href: '/#process' },
  { label: 'Контакты', href: '/#contacts' },
]

export function Footer() {
  return (
    <footer style={{ backgroundColor: 'var(--color-lime)' }}>
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
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-[var(--color-dark)] hover:text-[var(--color-orange)] transition-colors"
              >
                {link.label}
              </Link>
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
              {/* Instagram */}
              <a
                href="#"
                aria-label="Instagram"
                className="text-[var(--color-dark)] hover:text-[var(--color-orange)] transition-colors"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                </svg>
              </a>
              {/* Telegram */}
              <a
                href="#"
                aria-label="Telegram"
                className="text-[var(--color-dark)] hover:text-[var(--color-orange)] transition-colors"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12l-6.871 4.326-2.962-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.833.941z" />
                </svg>
              </a>
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
