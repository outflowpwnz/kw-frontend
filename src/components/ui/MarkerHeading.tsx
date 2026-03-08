'use client'
import { useEffect, useRef, useState, ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface MarkerHeadingProps {
  as?: 'h1' | 'h2' | 'h3'
  children: ReactNode
  className?: string
  highlight?: string[]
  /** Задержка маркера относительно момента появления заголовка в viewport, мс */
  markerDelay?: number
}

type Segment = { text: string; highlighted: boolean }

function parseHighlights(text: string, highlights: string[]): Segment[] {
  let segments: Segment[] = [{ text, highlighted: false }]

  highlights.forEach((word) => {
    const next: Segment[] = []
    segments.forEach((seg) => {
      if (seg.highlighted) { next.push(seg); return }
      const parts = seg.text.split(word)
      parts.forEach((part, i) => {
        if (part) next.push({ text: part, highlighted: false })
        if (i < parts.length - 1) next.push({ text: word, highlighted: true })
      })
    })
    segments = next
  })

  return segments
}

export function MarkerHeading({
  as: Tag = 'h2',
  children,
  className,
  highlight,
  markerDelay = 0,
}: MarkerHeadingProps) {
  const ref = useRef<HTMLHeadingElement>(null)
  const [inView, setInView] = useState(false)
  const [markerVisible, setMarkerVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    let timeoutId: ReturnType<typeof setTimeout>

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          timeoutId = setTimeout(() => setMarkerVisible(true), markerDelay)
          observer.disconnect()
        }
      },
      { threshold: 0.3 }
    )

    observer.observe(el)
    return () => {
      observer.disconnect()
      clearTimeout(timeoutId)
    }
  }, [markerDelay])

  const fadeClasses = cn(
    'transition-[opacity,transform] duration-[600ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)]',
    inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-7'
  )

  if (!highlight || typeof children !== 'string') {
    return (
      <Tag ref={ref} className={cn(fadeClasses, 'text-[var(--color-dark)]', className)}>
        {children}
      </Tag>
    )
  }

  const segments = parseHighlights(children, highlight)

  return (
    <Tag ref={ref} className={cn(fadeClasses, 'text-[var(--color-dark)]', className)}>
      {segments.map((seg, i) =>
        seg.highlighted ? (
          <mark
            key={i}
            className={cn('marker-highlight bg-transparent', markerVisible && 'is-visible')}
          >
            {seg.text}
          </mark>
        ) : (
          <span key={i}>{seg.text}</span>
        )
      )}
    </Tag>
  )
}
