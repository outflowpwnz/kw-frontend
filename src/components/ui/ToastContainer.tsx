'use client'
import { useEffect, useState } from 'react'
import { toast, Toast, ToastType } from '@/lib/toast'
import { cn } from '@/lib/utils'

const DURATION = 4000 // мс до автозакрытия

const icons: Record<ToastType, string> = {
  success: '✓',
  error:   '✕',
  info:    'i',
}

const accents: Record<ToastType, string> = {
  success: 'border-l-[var(--color-marker)]',
  error:   'border-l-red-400',
  info:    'border-l-[var(--color-muted)]',
}

function ToastItem({ item, onDismiss }: { item: Toast; onDismiss: () => void }) {
  const [visible, setVisible] = useState(false)

  // Монтирование — триггер анимации появления
  useEffect(() => {
    const in_ = requestAnimationFrame(() => setVisible(true))
    const out = setTimeout(() => {
      setVisible(false)
      setTimeout(onDismiss, 300) // ждём анимацию исчезновения
    }, DURATION)
    return () => { cancelAnimationFrame(in_); clearTimeout(out) }
  }, [onDismiss])

  return (
    <div
      role="alert"
      className={cn(
        'flex items-start gap-3 px-4 py-3 bg-white shadow-md border-l-4 min-w-[260px] max-w-[360px]',
        'transition-[opacity,transform] duration-300 ease-out',
        accents[item.type],
        visible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-6'
      )}
    >
      <span className="text-xs font-bold text-[var(--color-dark)] mt-0.5 select-none">
        {icons[item.type]}
      </span>
      <p className="text-sm text-[var(--color-dark)] leading-snug flex-1">{item.message}</p>
      <button
        onClick={() => { setVisible(false); setTimeout(onDismiss, 300) }}
        className="text-[var(--color-muted)] hover:text-[var(--color-dark)] transition-colors text-xs leading-none mt-0.5 select-none cursor-pointer"
        aria-label="Закрыть"
      >
        ✕
      </button>
    </div>
  )
}

export function ToastContainer() {
  const [toasts, setToasts] = useState<Toast[]>([])

  useEffect(() => {
    const unsubscribe = toast.subscribe((t) => setToasts((prev) => [...prev, t]))
    return () => unsubscribe()
  }, [])

  const dismiss = (id: string) =>
    setToasts((prev) => prev.filter((t) => t.id !== id))

  if (!toasts.length) return null

  return (
    <div className="fixed bottom-6 right-4 z-[300] flex flex-col gap-2 items-end">
      {toasts.map((t) => (
        <ToastItem key={t.id} item={t} onDismiss={() => dismiss(t.id)} />
      ))}
    </div>
  )
}
