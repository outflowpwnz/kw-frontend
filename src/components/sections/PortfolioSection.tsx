'use client'
import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Container, Section, MarkerHeading, buttonVariants } from '@/components/ui'
import { cn } from '@/lib/utils'
import { resolveMediaUrl } from '@/lib/api'
import type { PortfolioCase } from '@/lib/api'

interface Props {
  cases: PortfolioCase[]
}

export function PortfolioSection({ cases }: Props) {
  const [active, setActive] = useState(0)

  const prev = () => setActive((i) => (i - 1 + cases.length) % cases.length)
  const next = () => setActive((i) => (i + 1) % cases.length)

  if (!cases.length) return null

  const current = cases[active]

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
          {cases.map((c, i) => (
            <button
              key={c.id}
              onClick={() => setActive(i)}
              className={cn(
                'w-14 h-14 rounded-full overflow-hidden flex-shrink-0 transition-all duration-200 relative',
                i === active
                  ? 'ring-2 ring-offset-2 ring-[var(--color-orange)]'
                  : 'opacity-60 hover:opacity-100'
              )}
              aria-label={c.title}
            >
              <Image
                src={c.photoUrl}
                alt={c.title}
                fill
                className="object-cover"
                unoptimized
              />
            </button>
          ))}
        </div>

        {/* Слайд */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mb-8">
          <div>
            <h3 className="text-2xl font-bold uppercase text-[var(--color-dark)] mb-4">
              {current.title}
            </h3>
            <p className="text-[var(--color-muted)] leading-relaxed">{current.description}</p>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden">
            <Image
              key={current.id}
              src={current.photoUrl}
              alt={current.title}
              fill
              className="object-cover"
              unoptimized
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
          className={buttonVariants({ variant: 'primary', size: 'lg' })}
        >
          Хочу уникальную свадьбу
        </Link>
      </Container>
    </Section>
  )
}
