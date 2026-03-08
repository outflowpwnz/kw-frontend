import Image from 'next/image'
import Link from 'next/link'
import { Container, Section, MarkerHeading, FadeUp, buttonVariants, SocialIcon } from '@/components/ui'

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
                <SocialIcon
                  type="instagram"
                  href="#"
                  size={18}
                  className="w-10 h-10 border border-[var(--color-dark)] flex items-center justify-center hover:bg-[var(--color-orange)] hover:border-[var(--color-orange)] hover:text-white transition-all"
                />
                <SocialIcon
                  type="telegram"
                  href="#"
                  size={18}
                  className="w-10 h-10 border border-[var(--color-dark)] flex items-center justify-center hover:bg-[var(--color-orange)] hover:border-[var(--color-orange)] hover:text-white transition-all"
                />
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
                className={buttonVariants({ variant: 'primary', size: 'md' })}
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
