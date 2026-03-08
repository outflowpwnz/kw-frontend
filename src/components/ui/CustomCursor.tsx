'use client'
import { useEffect, useRef } from 'react'

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const pos = useRef({ x: -100, y: -100 })
  const current = useRef({ x: -100, y: -100 })
  const rafRef = useRef<number | undefined>(undefined)

  useEffect(() => {
    // Отключаем на тач-устройствах
    if (window.matchMedia('(pointer: coarse)').matches) return

    const el = cursorRef.current
    if (!el) return

    const onMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY }
      el.style.opacity = '1'
    }

    const onLeave = () => {
      el.style.opacity = '0'
    }

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t

    const animate = () => {
      current.current.x = lerp(current.current.x, pos.current.x, 0.1)
      current.current.y = lerp(current.current.y, pos.current.y, 0.1)
      el.style.transform = `translate(${current.current.x - 20}px, ${current.current.y - 20}px)`
      rafRef.current = requestAnimationFrame(animate)
    }

    document.addEventListener('mousemove', onMove)
    document.addEventListener('mouseleave', onLeave)
    rafRef.current = requestAnimationFrame(animate)

    return () => {
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseleave', onLeave)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <div
      ref={cursorRef}
      className="pointer-events-none fixed top-0 left-0 z-[9999] w-10 h-10 rounded-full bg-white"
      style={{
        mixBlendMode: 'difference',
        opacity: 0,
        transition: 'opacity 0.3s ease',
        willChange: 'transform',
      }}
    />
  )
}
