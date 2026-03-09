import Link from 'next/link'
import { Container, Section, MarkerHeading, FadeUp, buttonVariants } from '@/components/ui'
import type { Package } from '@/lib/api'

interface Props {
  packages: Package[]
}

export function PackagesSection({ packages }: Props) {
  return (
    <Section id="price" className="bg-gray-50">
      <Container>
        <MarkerHeading
          as="h2"
          className="text-3xl md:text-4xl lg:text-5xl mb-12"
          highlight={['ПАКЕТЫ УСЛУГ']}
          markerDelay={400}
        >
          ПАКЕТЫ УСЛУГ
        </MarkerHeading>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-10">
          {packages.map((pkg, i) => (
            <FadeUp key={pkg.id} delay={(i % 4) * 80}>
              <div className="border border-gray-200 p-5 flex flex-col gap-3 hover:border-[var(--color-orange)] transition-colors h-full">
                <h3 className="font-bold text-[var(--color-dark)] uppercase text-sm md:text-base leading-tight">
                  {pkg.name}
                </h3>
                <p className="text-[var(--color-muted)] text-sm leading-relaxed flex-1">
                  {pkg.shortDescription}
                </p>
                <Link
                  href="/anketa"
                  className="text-sm font-semibold text-[var(--color-orange)] hover:underline mt-auto"
                >
                  Подробнее →
                </Link>
              </div>
            </FadeUp>
          ))}
        </div>

        <Link
          href="/anketa"
          className={buttonVariants({ variant: 'outline', size: 'lg' })}
        >
          Нужна помощь с выбором пакета
        </Link>
      </Container>
    </Section>
  )
}
