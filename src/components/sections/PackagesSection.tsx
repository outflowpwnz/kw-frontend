import Link from 'next/link'
import { Container, Section, MarkerHeading, FadeUp } from '@/components/ui'

interface Package {
  slug: string
  name: string
  desc: string
}

const PACKAGES: Package[] = [
  { slug: 'organizatsiya', name: 'Организация', desc: 'Мы берем на себя все заботы: от первой встречи и составления концепции до финала вашего свадебного дня.' },
  { slug: 'koordinatsiya', name: 'Координация', desc: 'Для тех, кто хочет подготовить свадьбу самостоятельно, но боится, что в самый важный день всё пойдет не по плану.' },
  { slug: 'rasporyad', name: 'Распорядительство', desc: 'Для тех, у кого всё уже готово, но нужен помощник, который решит вопросы в день свадьбы.' },
  { slug: 'tseremoniya', name: 'Проведение церемонии', desc: 'Для тех, кто мечтает о красивой и трогательной выездной регистрации.' },
  { slug: 'audit', name: 'Свадебный аудит', desc: 'Для тех, кто хочет организовать свадьбу сам, но не знает с чего начать.' },
  { slug: 'kurator', name: 'Куратор свадьбы', desc: 'Для тех, кто хочет организовать свадьбу сам, но с умом: без ошибок в начале и без переживаний в день свадьбы.' },
  { slug: 'konsultatsiya', name: 'Консультация', desc: 'Формат обсуждения волнующих вас вопросов с опытным организатором на любом этапе подготовки.' },
  { slug: 'stilist', name: 'Свадебный стилист', desc: 'Уникальная услуга для пар, которые хотят идеальные образы, продуманные до мелочей.' },
]

export function PackagesSection() {
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

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {PACKAGES.map((pkg, i) => (
            <FadeUp key={pkg.slug} delay={(i % 4) * 80}>
              <div className="border border-gray-200 p-5 flex flex-col gap-3 hover:border-[var(--color-orange)] transition-colors h-full">
                <h3 className="font-bold text-[var(--color-dark)] uppercase text-sm md:text-base leading-tight">
                  {pkg.name}
                </h3>
                <p className="text-[var(--color-muted)] text-sm leading-relaxed flex-1">{pkg.desc}</p>
                <Link
                  href={`/paket-${pkg.slug}`}
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
          className="inline-flex items-center justify-center font-semibold px-8 py-4 text-base border-2 border-[var(--color-orange)] text-[var(--color-orange)] hover:bg-[var(--color-orange)] hover:text-white transition-all"
        >
          Нужна помощь с выбором пакета
        </Link>
      </Container>
    </Section>
  )
}
