'use client'
import { useEffect, useRef, useState, ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface FadeUpProps {
  children: ReactNode
  className?: string
  /** Задержка перед стартом анимации (stagger), мс */
  delay?: number
}

export function FadeUp({ children, className, delay = 0 }: FadeUpProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setInView(true), delay)
          observer.disconnect()
        }
      },
      { threshold: 0.1 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [delay])

  return (
    <div
      ref={ref}
      className={cn(
        'transition-[opacity,transform] duration-[600ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)]',
        inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-7',
        className
      )}
    >
      {children}
    </div>
  )
}
