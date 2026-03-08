'use client'
import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Container, MarkerHeading, buttonVariants } from '@/components/ui'

interface Stat {
  num: number
  suffix: string
  label: string
}

const STATS: Stat[] = [
  { num: 11,  suffix: '',  label: 'лет опыта' },
  { num: 200, suffix: '+', label: 'свадеб' },
  { num: 3,   suffix: '',  label: 'организатора' },
  { num: 5,   suffix: '★', label: 'средний рейтинг' },
]

function useCounter(target: number, duration: number, active: boolean) {
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!active) return

    let rafId: number
    const startTime = performance.now()

    const tick = (now: number) => {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setValue(Math.round(eased * target))
      if (progress < 1) rafId = requestAnimationFrame(tick)
    }

    rafId = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafId)
  }, [active, target, duration])

  return value
}

function StatItem({ stat, active }: { stat: Stat; active: boolean }) {
  const count = useCounter(stat.num, 1800, active)
  return (
    <div className="text-center md:text-left">
      <div className="text-4xl md:text-5xl font-bold text-[var(--color-dark)] tabular-nums">
        {count}{stat.suffix}
      </div>
      <div className="text-sm text-[var(--color-muted)] mt-1 uppercase tracking-wide">
        {stat.label}
      </div>
    </div>
  )
}

export function HeroSection() {
  const statsRef = useRef<HTMLDivElement>(null)
  const [statsActive, setStatsActive] = useState(false)

  useEffect(() => {
    const el = statsRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStatsActive(true)
          observer.disconnect()
        }
      },
      { threshold: 0.3 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section className="relative min-h-screen flex flex-col justify-between overflow-hidden pt-16 md:pt-20">
      {/* Фоновое изображение */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/banners/banner-1.jpg"
          alt="Karpenko Wedding"
          fill
          className="object-cover object-center"
          priority
        />
      </div>

      {/* Градиент снизу */}
      <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-white to-transparent z-10" />

      {/* Основной контент — слева */}
      <Container className="relative z-20 flex-1 flex items-start pt-16 md:pt-24">
        <div className="max-w-2xl">
          <MarkerHeading
            as="h1"
            className="text-4xl md:text-5xl lg:text-6xl mb-8 leading-tight"
            highlight={['ПОМОГАЕМ ВОПЛОТИТЬ В ЖИЗНЬ ВАШ СВАДЕБНЫЙ ДЕНЬ']}
            markerDelay={700}
          >
            ПОМОГАЕМ ВОПЛОТИТЬ В ЖИЗНЬ ВАШ СВАДЕБНЫЙ ДЕНЬ
          </MarkerHeading>
          <Link
            href="/anketa"
            className={buttonVariants({ variant: 'primary', size: 'lg' })}
          >
            Заполнить анкету
          </Link>
        </div>
      </Container>

      {/* Статистика */}
      <Container className="relative z-20 pb-12">
        <div ref={statsRef} className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {STATS.map((stat) => (
            <StatItem key={stat.label} stat={stat} active={statsActive} />
          ))}
        </div>
      </Container>
    </section>
  )
}
