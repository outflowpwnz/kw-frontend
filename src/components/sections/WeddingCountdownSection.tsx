'use client'
import { useState, useEffect } from 'react'
import { Container, Section, MarkerHeading, FadeUp } from '@/components/ui'

// Конфиг — пока хардкод, потом переедет в бэк
export const WEDDING_CONFIG = {
  nextWeddingDate: new Date('2026-04-05T14:00:00'),
  totalWeddings: 200,
}

function useCountdown(target: Date) {
  // null = ещё не инициализировано (SSR), 0 = дата в прошлом
  const [diff, setDiff] = useState<number | null>(null)

  useEffect(() => {
    const update = () => setDiff(Math.max(0, target.getTime() - Date.now()))
    update()
    const id = setInterval(update, 1000)
    return () => clearInterval(id)
  }, [target])

  const totalSeconds = Math.floor((diff ?? 0) / 1000)
  const days = Math.floor(totalSeconds / 86400)
  const hours = Math.floor((totalSeconds % 86400) / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const seconds = totalSeconds % 60
  const isPast = diff === 0

  return { days, hours, minutes, seconds, isPast, ready: diff !== null }
}

function pad(n: number) {
  return String(n).padStart(2, '0')
}

/** Склонение числительного по трём формам (1 день / 2 дня / 5 дней) */
function pluralize(n: number, one: string, few: string, many: string): string {
  const mod10 = n % 10
  const mod100 = n % 100
  if (mod10 === 1 && mod100 !== 11) return one
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20)) return few
  return many
}

export function WeddingCountdownSection() {
  const { days, hours, minutes, seconds, isPast, ready } = useCountdown(WEDDING_CONFIG.nextWeddingDate)

  const units = [
    { value: days,    label: pluralize(days,    'день',   'дня',    'дней')    },
    { value: hours,   label: pluralize(hours,   'час',    'часа',   'часов')   },
    { value: minutes, label: pluralize(minutes, 'минута', 'минуты', 'минут')   },
    { value: seconds, label: pluralize(seconds, 'секунда','секунды','секунд')  },
  ]

  return (
    <Section id="countdown" className="bg-[var(--color-dark)]">
      <Container>
        <MarkerHeading
          as="h2"
          className="text-3xl md:text-4xl lg:text-5xl mb-12 text-white"
          highlight={['СЛЕДУЮЩАЯ СВАДЬБА']}
          markerDelay={400}
        >
          СЛЕДУЮЩАЯ СВАДЬБА УЖЕ СКОРО
        </MarkerHeading>

        {ready && isPast ? (
          <FadeUp>
            <p className="text-white/60 text-lg mb-10">
              Дата следующей свадьбы уточняется — следите за обновлениями.
            </p>
          </FadeUp>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-10">
            {units.map(({ value, label }, i) => (
              <FadeUp key={label} delay={i * 80}>
                <div className="border border-white/20 p-6 md:p-8 text-center">
                  <div className="text-5xl md:text-7xl font-bold tabular-nums text-white leading-none">
                    {ready ? pad(value) : '--'}
                  </div>
                  <div className="text-xs text-white/50 uppercase tracking-[0.2em] mt-3">
                    {label}
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        )}

        <FadeUp delay={320}>
          <p className="text-white/60 text-sm">
            Уже организовано{' '}
            <span className="font-bold text-white">{WEDDING_CONFIG.totalWeddings}+</span>{' '}
            свадеб
          </p>
        </FadeUp>
      </Container>
    </Section>
  )
}
