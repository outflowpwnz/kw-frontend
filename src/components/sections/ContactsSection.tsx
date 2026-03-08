import Image from 'next/image'
import Link from 'next/link'
import { Container, Section, MarkerHeading, FadeUp } from '@/components/ui'

export function ContactsSection() {
  return (
    <Section id="contacts">
      <Container>
        <MarkerHeading
          as="h2"
          className="text-3xl md:text-4xl lg:text-5xl mb-12"
          highlight={['КАК С НАМИ СВЯЗАТЬСЯ']}
          markerDelay={400}
        >
          КАК С НАМИ СВЯЗАТЬСЯ
        </MarkerHeading>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Левый блок */}
          <FadeUp delay={0}>
            <div className="flex flex-col gap-6">
              <div className="flex gap-4">
                <a
                  href="#"
                  aria-label="Instagram"
                  className="w-10 h-10 border border-[var(--color-dark)] flex items-center justify-center hover:bg-[var(--color-orange)] hover:border-[var(--color-orange)] hover:text-white transition-all"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <rect x="2" y="2" width="20" height="20" rx="5" />
                    <circle cx="12" cy="12" r="4" />
                    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                  </svg>
                </a>
                <a
                  href="#"
                  aria-label="Telegram"
                  className="w-10 h-10 border border-[var(--color-dark)] flex items-center justify-center hover:bg-[var(--color-orange)] hover:border-[var(--color-orange)] hover:text-white transition-all"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12l-6.871 4.326-2.962-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.833.941z" />
                  </svg>
                </a>
              </div>

              <a
                href="tel:+70000000000"
                className="text-2xl font-bold text-[var(--color-dark)] hover:text-[var(--color-orange)] transition-colors"
              >
                +7 (000) 000-00-00
              </a>

              <p className="text-[var(--color-muted)]">
                Или вы можете заполнить анкету — мы свяжемся с вами в ближайшее время.
              </p>

              <Link
                href="/anketa"
                className="inline-flex items-center justify-center font-semibold px-8 py-4 text-base bg-[var(--color-orange)] text-white hover:opacity-90 transition-opacity w-fit"
              >
                Заполнить анкету
              </Link>
            </div>
          </FadeUp>

          {/* Правый блок */}
          <FadeUp delay={200}>
            <div className="relative aspect-[4/5] overflow-hidden">
              <Image
                src="/images/banners/team-members.jpg"
                alt="Команда Karpenko Wedding"
                fill
                className="object-cover object-top"
              />
            </div>
          </FadeUp>
        </div>
      </Container>
    </Section>
  )
}
