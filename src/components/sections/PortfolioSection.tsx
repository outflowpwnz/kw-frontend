'use client'
import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Container, Section, MarkerHeading } from '@/components/ui'
import { cn } from '@/lib/utils'

interface Case {
  title: string
  description: string
  photo: string
}

const CASES: Case[] = [
  {
    title: 'Свадьба Фа и Кирилла',
    description: 'Камерная свадьба в загородном доме с живой музыкой и авторской флористикой в стиле "сад-огород".',
    photo: '/images/wedding-days/wedding-day-2024-fa-kirill.jpg',
  },
  {
    title: 'Свадьба Игоря и Анастасии',
    description: 'Роскошное торжество в банкетном зале с кастомным декором в лилово-золотой палитре.',
    photo: '/images/wedding-days/wedding-day-2025-igor-anastasiya.jpg',
  },
  {
    title: 'Свадьба Юлии и Артёма',
    description: 'Выездная церемония на берегу озера с чаепитием вместо фуршета.',
    photo: '/images/wedding-days/wedding-day-2025-yulia-artem.jpg',
  },
]

export function PortfolioSection() {
  const [active, setActive] = useState(0)

  const prev = () => setActive((i) => (i - 1 + CASES.length) % CASES.length)
  const next = () => setActive((i) => (i + 1) % CASES.length)

  return (
    <Section id="portfolio">
      <Container>
        <MarkerHeading
          as="h2"
          className="text-3xl md:text-4xl lg:text-5xl mb-8"
          highlight={['УНИКАЛЬНА, ЭСТЕТИЧНА И ПРОДУМАННА']}
          markerDelay={400}
        >
          КАЖДАЯ НАША СВАДЬБА УНИКАЛЬНА, ЭСТЕТИЧНА И ПРОДУМАННА ДО МЕЛОЧЕЙ
        </MarkerHeading>

        {/* Миниатюры-навигация */}
        <div className="flex gap-3 mb-8">
          {CASES.map((c, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={cn(
                'w-14 h-14 rounded-full overflow-hidden flex-shrink-0 transition-all duration-200 relative',
                i === active
                  ? 'ring-2 ring-offset-2 ring-[var(--color-orange)]'
                  : 'opacity-60 hover:opacity-100'
              )}
              aria-label={c.title}
            >
              <Image src={c.photo} alt={c.title} fill className="object-cover" />
            </button>
          ))}
        </div>

        {/* Слайд */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mb-8">
          {/* Текст */}
          <div>
            <h3 className="text-2xl font-bold uppercase text-[var(--color-dark)] mb-4">
              {CASES[active].title}
            </h3>
            <p className="text-[var(--color-muted)] leading-relaxed">{CASES[active].description}</p>
          </div>
          {/* Фото */}
          <div className="relative aspect-[4/3] overflow-hidden">
            <Image
              key={active}
              src={CASES[active].photo}
              alt={CASES[active].title}
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Стрелки */}
        <div className="flex gap-3 mb-8">
          <button
            onClick={prev}
            className="w-12 h-12 border border-[var(--color-dark)] flex items-center justify-center hover:bg-[var(--color-orange)] hover:border-[var(--color-orange)] hover:text-white transition-all"
            aria-label="Предыдущий"
          >
            ←
          </button>
          <button
            onClick={next}
            className="w-12 h-12 border border-[var(--color-dark)] flex items-center justify-center hover:bg-[var(--color-orange)] hover:border-[var(--color-orange)] hover:text-white transition-all"
            aria-label="Следующий"
          >
            →
          </button>
        </div>

        <Link
          href="/anketa"
          className="inline-flex items-center justify-center font-semibold px-8 py-4 text-lg bg-[var(--color-orange)] text-white hover:opacity-90 transition-opacity"
        >
          Хочу уникальную свадьбу
        </Link>
      </Container>
    </Section>
  )
}
