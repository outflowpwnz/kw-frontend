'use client'
import { useState, useEffect, useMemo } from 'react'
import { Container, Section, MarkerHeading, FadeUp } from '@/components/ui'
import type { SiteSettings } from '@/lib/api'

function useCountdown(target: Date | null) {
  const [diff, setDiff] = useState<number | null>(null)

  useEffect(() => {
    if (!target) return
    const update = () => setDiff(Math.max(0, target.getTime() - Date.now()))
    update()
    const id = setInterval(update, 1000)
    return () => clearInterval(id)
  }, [target])

  const totalSeconds = Math.floor((diff ?? 0) / 1000)
  const days    = Math.floor(totalSeconds / 86400)
  const hours   = Math.floor((totalSeconds % 86400) / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const seconds = totalSeconds % 60
  const isPast  = diff === 0

  return { days, hours, minutes, seconds, isPast, ready: diff !== null }
}

function pad(n: number) { return String(n).padStart(2, '0') }

function pluralize(n: number, one: string, few: string, many: string) {
  const m = n % 10, c = n % 100
  if (m === 1 && c !== 11) return one
  if (m >= 2 && m <= 4 && (c < 10 || c >= 20)) return few
  return many
}

interface Props {
  settings: SiteSettings
}

export function WeddingCountdownSection({ settings }: Props) {
  const weddingDate = useMemo(
    () => settings.countdown_next_wedding_date
      ? new Date(settings.countdown_next_wedding_date)
      : null,
    [settings.countdown_next_wedding_date]
  )
  const totalWeddings = settings.countdown_total_weddings ?? '200'

  const { days, hours, minutes, seconds, isPast, ready } = useCountdown(weddingDate)

  const units = [
    { id: 'days',    value: days,    label: pluralize(days,    'день',   'дня',    'дней')    },
    { id: 'hours',   value: hours,   label: pluralize(hours,   'час',    'часа',   'часов')   },
    { id: 'minutes', value: minutes, label: pluralize(minutes, 'минута', 'минуты', 'минут')   },
    { id: 'seconds', value: seconds, label: pluralize(seconds, 'секунда','секунды','секунд')  },
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
            {units.map(({ id, value, label }, i) => (
              <FadeUp key={id} delay={i * 80}>
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
            <span className="font-bold text-white">{totalWeddings}+</span>{' '}
            свадеб
          </p>
        </FadeUp>
      </Container>
    </Section>
  )
}
