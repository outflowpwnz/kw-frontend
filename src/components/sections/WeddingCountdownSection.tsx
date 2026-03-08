'use client'
import { useState, useEffect } from 'react'
import { Container, Section, MarkerHeading, FadeUp } from '@/components/ui'

// Конфиг — пока хардкод, потом переедет в бэк
export const WEDDING_CONFIG = {
  nextWeddingDate: new Date('2026-04-05T14:00:00'),
  totalWeddings: 200,
}

function useCountdown(target: Date) {
  const [diff, setDiff] = useState(0)

  useEffect(() => {
    const update = () => setDiff(Math.max(0, target.getTime() - Date.now()))
    update()
    const id = setInterval(update, 1000)
    return () => clearInterval(id)
  }, [target])

  const totalSeconds = Math.floor(diff / 1000)
  const days = Math.floor(totalSeconds / 86400)
  const hours = Math.floor((totalSeconds % 86400) / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const seconds = totalSeconds % 60

  return { days, hours, minutes, seconds }
}

function pad(n: number) {
  return String(n).padStart(2, '0')
}

export function WeddingCountdownSection() {
  const { days, hours, minutes, seconds } = useCountdown(WEDDING_CONFIG.nextWeddingDate)

  const units = [
    { value: days,    label: 'дней'   },
    { value: hours,   label: 'часов'  },
    { value: minutes, label: 'минут'  },
    { value: seconds, label: 'секунд' },
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

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-10">
          {units.map(({ value, label }, i) => (
            <FadeUp key={label} delay={i * 80}>
              <div className="border border-white/20 p-6 md:p-8 text-center">
                <div className="text-5xl md:text-7xl font-bold tabular-nums text-white leading-none">
                  {pad(value)}
                </div>
                <div className="text-xs text-white/50 uppercase tracking-[0.2em] mt-3">
                  {label}
                </div>
              </div>
            </FadeUp>
          ))}
        </div>

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
