'use client'
import { Container, Section, MarkerHeading, FadeUp } from '@/components/ui'

const REVIEWS = [
  { text: 'Ну вы прямо настоящие свадебные феечки 🧚‍♀️', position: 'top-8 left-0 md:left-8' },
  { text: 'Даже не представляю, как бы мы справлялись со всем в этот день без вас 🙂', position: 'top-32 right-0 md:right-16' },
  { text: 'Безгранично благодарим за помощь и поддержку на протяжении всей подготовки ❤️', position: 'bottom-8 left-8 md:left-24' },
]

export function ReviewsSection() {
  return (
    <Section className="reviews-pattern-bg">
      <Container>
        <MarkerHeading
          as="h2"
          className="text-3xl md:text-4xl lg:text-5xl mb-16 max-w-3xl"
          highlight={['ВЕСЬ ПРОЦЕСС ПОДГОТОВКИ']}
          markerDelay={400}
        >
          МЫ ДЕЛАЕМ КОМФОРТНЫМ НЕ ТОЛЬКО САМ ДЕНЬ СВАДЬБЫ, НО И ВЕСЬ ПРОЦЕСС ПОДГОТОВКИ
        </MarkerHeading>

        <div className="relative min-h-[400px] md:min-h-[320px]">
          {REVIEWS.map((review, i) => (
            <FadeUp key={review.text} delay={i * 200} className={`absolute max-w-xs ${review.position}`}>
              <div className="p-4 shadow-lg text-sm text-[var(--color-dark)] font-medium relative bg-[var(--color-pink)]">
                <p>{review.text}</p>
                <div className="absolute -bottom-2 left-6 w-4 h-4 rotate-45 bg-[var(--color-pink)]" />
              </div>
            </FadeUp>
          ))}
        </div>
      </Container>
    </Section>
  )
}
