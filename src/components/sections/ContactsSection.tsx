import Image from 'next/image'
import Link from 'next/link'
import { Container, Section, MarkerHeading, FadeUp, buttonVariants, SocialIcon } from '@/components/ui'

export function ContactsSection() {
  return (
    <Section id="contacts" className="bg-[var(--color-dark)]">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:items-stretch">

          {/* Левый блок — заголовок сверху, цитата, контакты снизу */}
          <FadeUp delay={0} className="flex flex-col justify-between gap-12">

            <MarkerHeading
              as="h2"
              className="text-3xl md:text-4xl lg:text-5xl text-white"
              highlight={['КАК С НАМИ СВЯЗАТЬСЯ']}
              markerDelay={400}
            >
              КАК С НАМИ СВЯЗАТЬСЯ
            </MarkerHeading>

            {/* Декоративная цитата */}
            <blockquote className="relative">
              <span className="absolute -top-8 -left-2 text-9xl leading-none text-[var(--color-orange)] font-serif select-none pointer-events-none">
                &ldquo;
              </span>
              <p className="text-xl md:text-2xl italic font-light text-white leading-snug pl-8 pt-4" style={{ fontFamily: 'var(--font-cormorant), serif' }}>
                Ваш идеальный день начинается с одного шага — расскажите нам о нём.
              </p>
              <footer className="mt-4 pl-8 text-xs text-white/40 uppercase tracking-widest">
                — Команда Karpenko Wedding
              </footer>
            </blockquote>

            {/* Контакты */}
            <div className="flex flex-col gap-5">
              <div className="flex gap-3">
                <SocialIcon
                  type="instagram"
                  href="#"
                  size={18}
                  className="w-10 h-10 border border-white/30 text-white flex items-center justify-center hover:bg-[var(--color-orange)] hover:border-[var(--color-orange)] transition-all"
                />
                <SocialIcon
                  type="telegram"
                  href="#"
                  size={18}
                  className="w-10 h-10 border border-white/30 text-white flex items-center justify-center hover:bg-[var(--color-orange)] hover:border-[var(--color-orange)] transition-all"
                />
              </div>

              <a
                href="tel:+70000000000"
                className="text-2xl font-bold text-white hover:text-[var(--color-orange)] transition-colors"
              >
                +7 (000) 000-00-00
              </a>

              <p className="text-white/50 text-sm">
                Или заполните анкету — мы свяжемся с вами в ближайшее время.
              </p>

              <Link
                href="/anketa"
                className={buttonVariants({ variant: 'light', size: 'md' })}
              >
                Заполнить анкету
              </Link>
            </div>
          </FadeUp>

          {/* Правый блок — фото */}
          <FadeUp delay={200}>
            <div className="relative aspect-[1] overflow-hidden">
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
