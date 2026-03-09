'use client'
import { useState } from 'react'
import { Container, Section, MarkerHeading, FadeUp } from '@/components/ui'
import { cn } from '@/lib/utils'
import type { FaqItem } from '@/lib/api'

interface Props {
  items: FaqItem[]
}

export function FaqSection({ items }: Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i)

  return (
    <Section id="faq">
      <Container>
        <MarkerHeading
          as="h2"
          className="text-3xl md:text-4xl lg:text-5xl mb-12"
          highlight={['ЧАСТО ЗАДАВАЕМЫЕ ВОПРОСЫ']}
          markerDelay={400}
        >
          ЧАСТО ЗАДАВАЕМЫЕ ВОПРОСЫ
        </MarkerHeading>

        <div className="flex flex-col divide-y divide-gray-200">
          {items.map((item, i) => (
            <FadeUp key={item.id} delay={i * 80}>
              <div className={cn('transition-colors', openIndex === i ? 'bg-gray-50' : '')}>
                <button
                  className="w-full flex items-center justify-between py-5 px-2 text-left gap-4"
                  onClick={() => toggle(i)}
                  aria-expanded={openIndex === i}
                  aria-controls={`faq-answer-${i}`}
                >
                  <span className="font-semibold text-[var(--color-dark)] text-base md:text-lg">
                    {item.question}
                  </span>
                  <span className={cn(
                    'text-2xl font-light text-[var(--color-orange)] flex-shrink-0 transition-transform duration-300',
                    openIndex === i ? 'rotate-45' : ''
                  )}>
                    +
                  </span>
                </button>
                {openIndex === i && (
                  <div id={`faq-answer-${i}`} className="px-2 pb-5 text-[var(--color-muted)] leading-relaxed">
                    {item.answer}
                  </div>
                )}
              </div>
            </FadeUp>
          ))}
        </div>
      </Container>
    </Section>
  )
}
