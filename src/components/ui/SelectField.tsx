'use client'
import { useState, useRef, useEffect, useCallback, KeyboardEvent } from 'react'
import * as Popover from '@radix-ui/react-popover'
import { cn } from '@/lib/utils'

export interface SelectOption {
  value: string
  label: string
}

interface SelectFieldProps {
  name: string
  label: string
  options: SelectOption[]
  value?: string
  onValueChange?: (value: string) => void
  placeholder?: string
  error?: string
  required?: boolean
  hint?: string
  className?: string
  disabled?: boolean
}

const triggerBase = [
  'w-full flex items-center justify-between gap-2',
  'bg-white border border-[var(--color-marker)]',
  'px-3 py-2.5 md:px-4 md:py-3 text-sm md:text-base text-left',
  'transition-colors duration-200 outline-none cursor-pointer',
  'data-[state=open]:border-[var(--color-dark)]',
  'focus-visible:border-[var(--color-dark)]',
].join(' ')

export function SelectField({
  name,
  label,
  options,
  value,
  onValueChange,
  placeholder = '— выберите —',
  error,
  required,
  hint,
  className,
  disabled,
}: SelectFieldProps) {
  const [open, setOpen] = useState(false)
  const listRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)

  const selectedLabel = options.find((o) => o.value === value)?.label

  const select = useCallback(
    (val: string) => {
      onValueChange?.(val)
      setOpen(false)
      triggerRef.current?.focus()
    },
    [onValueChange]
  )

  // Keyboard navigation
  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLDivElement>) => {
      const items = listRef.current?.querySelectorAll<HTMLButtonElement>('[role="option"]')
      if (!items?.length) return

      const current = document.activeElement as HTMLButtonElement
      const idx = Array.from(items).indexOf(current)

      if (e.key === 'ArrowDown') {
        e.preventDefault()
        items[Math.min(idx + 1, items.length - 1)]?.focus()
      } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        items[Math.max(idx - 1, 0)]?.focus()
      } else if (e.key === 'Escape') {
        setOpen(false)
        triggerRef.current?.focus()
      } else if (e.key === 'Home') {
        e.preventDefault()
        items[0]?.focus()
      } else if (e.key === 'End') {
        e.preventDefault()
        items[items.length - 1]?.focus()
      }
    },
    []
  )

  // Focus first item when opened
  useEffect(() => {
    if (!open) return
    const selectedItem = listRef.current?.querySelector<HTMLButtonElement>('[aria-selected="true"]')
    const firstItem = listRef.current?.querySelector<HTMLButtonElement>('[role="option"]')
    ;(selectedItem ?? firstItem)?.focus()
  }, [open])

  return (
    <div className={cn('flex flex-col gap-1.5', className)}>
      <label
        htmlFor={name}
        className="text-[11px] uppercase tracking-[0.14em] text-[var(--color-dark)] font-semibold select-none"
      >
        {label}
        {required && <span className="text-[var(--color-orange)] ml-1">*</span>}
      </label>

      <Popover.Root open={open} onOpenChange={setOpen}>
        <Popover.Trigger asChild>
          <button
            ref={triggerRef}
            id={name}
            type="button"
            role="combobox"
            aria-haspopup="listbox"
            aria-expanded={open}
            aria-label={label}
            aria-invalid={!!error}
            disabled={disabled}
            className={cn(triggerBase, error && 'border-red-400')}
          >
            <span className={cn(!selectedLabel && 'text-[var(--color-muted)]')}>
              {selectedLabel ?? placeholder}
            </span>
            <ChevronIcon open={open} />
          </button>
        </Popover.Trigger>

        <Popover.Portal>
          <Popover.Content
            align="start"
            sideOffset={4}
            // Ширина дропдауна = ширина триггера
            style={{ width: 'var(--radix-popover-trigger-width)' }}
            className={cn(
              'z-[100] bg-white border border-[var(--color-marker)] shadow-md',
              'data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95',
              'data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95',
            )}
            // Не перехватывать фокус — позволяет нормальный скролл страницы
            onOpenAutoFocus={(e) => e.preventDefault()}
          >
            <div
              ref={listRef}
              role="listbox"
              aria-label={label}
              onKeyDown={handleKeyDown}
              className="py-1 max-h-60 overflow-y-auto"
            >
              {options.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  role="option"
                  aria-selected={opt.value === value}
                  onClick={() => select(opt.value)}
                  className={cn(
                    'w-full flex items-center px-3 py-2 text-sm text-[var(--color-dark)] text-left',
                    'cursor-pointer outline-none transition-colors duration-150',
                    'hover:bg-[var(--color-pink)] focus:bg-[var(--color-pink)]',
                    opt.value === value && 'font-medium bg-[#F0EBE4]',
                  )}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </Popover.Content>
        </Popover.Portal>
      </Popover.Root>

      {hint && !error && <p className="text-xs text-[var(--color-muted)]">{hint}</p>}
      {error && <p className="text-xs text-red-500" role="alert">{error}</p>}
    </div>
  )
}

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn(
        'text-[var(--color-muted)] flex-shrink-0 transition-transform duration-200',
        open && 'rotate-180'
      )}
      aria-hidden
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  )
}
