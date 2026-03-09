import { Container, Section, MarkerHeading, FadeUp } from '@/components/ui'
import type { Review } from '@/lib/api'

// Паттерн из 3 позиций — повторяется для любого кол-ва отзывов
// mr-auto / ml-auto — прижимает карточку к левому/правому краю
// mt — вертикальный сдвиг для эффекта рассыпанных записок
const CARD_PATTERN = [
  'mr-auto',                    // левый край, без сдвига
  'ml-auto md:mt-20',           // правый край, сдвинут вниз
  'ml-8 md:ml-16 md:mt-6',      // чуть правее левого края, небольшой сдвиг
] as const

interface Props {
  reviews: Review[]
}

export function ReviewsSection({ reviews }: Props) {
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

        <div className="flex flex-col gap-6 md:gap-4">
          {reviews.map((review, i) => (
            <FadeUp
              key={review.id}
              delay={i * 200}
              className={`max-w-xs ${CARD_PATTERN[i % CARD_PATTERN.length]}`}
            >
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
