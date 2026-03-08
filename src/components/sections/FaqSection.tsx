'use client'
import { useState } from 'react'
import { Container, Section, MarkerHeading, FadeUp } from '@/components/ui'
import { cn } from '@/lib/utils'

interface FaqItem {
  q: string
  a: string
}

const FAQ_ITEMS: FaqItem[] = [
  { q: 'Сколько стоит организация свадьбы?', a: 'Стоимость зависит от выбранного пакета услуг, количества гостей и сложности мероприятия. Заполните анкету — мы подготовим предварительную смету.' },
  { q: 'За сколько месяцев нужно начинать подготовку?', a: 'Рекомендуем начинать за 10–12 месяцев до даты свадьбы, особенно если она планируется в высокий сезон (май–сентябрь).' },
  { q: 'Работаете ли вы только в Минске?', a: 'Нет, мы работаем по всей Беларуси и выезжаем в другие города по договорённости.' },
  { q: 'Нужно ли заключать договор?', a: 'Да, мы всегда работаем по договору. Это защищает обе стороны и гарантирует чёткое выполнение обязательств.' },
  { q: 'Что входит в пакет "Организация"?', a: 'Полное сопровождение: от первой встречи и составления концепции до финала вашего свадебного дня. Подробнее — на странице пакета.' },
]

export function FaqSection() {
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
          {FAQ_ITEMS.map((item, i) => (
            <FadeUp key={item.q} delay={i * 80}>
              <div className={cn('transition-colors', openIndex === i ? 'bg-gray-50' : '')}>
                <button
                  className="w-full flex items-center justify-between py-5 px-2 text-left gap-4"
                  onClick={() => toggle(i)}
                  aria-expanded={openIndex === i}
                  aria-controls={`faq-answer-${i}`}
                >
                  <span className="font-semibold text-[var(--color-dark)] text-base md:text-lg">
                    {item.q}
                  </span>
                  <span
                    className={cn(
                      'text-2xl font-light text-[var(--color-orange)] flex-shrink-0 transition-transform duration-300',
                      openIndex === i ? 'rotate-45' : ''
                    )}
                  >
                    +
                  </span>
                </button>
                {openIndex === i && (
                  <div id={`faq-answer-${i}`} className="px-2 pb-5 text-[var(--color-muted)] leading-relaxed">
                    {item.a}
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
