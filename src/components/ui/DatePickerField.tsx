'use client'
import { useState } from 'react'
import * as Popover from '@radix-ui/react-popover'
import { DayPicker } from 'react-day-picker'
import { format, parse, isValid } from 'date-fns'
import { ru } from 'date-fns/locale'
import { cn } from '@/lib/utils'

interface DatePickerFieldProps {
  name: string
  label: string
  /** ISO string YYYY-MM-DD */
  value?: string
  onChange?: (value: string) => void
  error?: string
  required?: boolean
  hint?: string
  className?: string
  /** Минимальная дата (ISO) */
  fromDate?: Date
}

const inputBase = [
  'w-full flex items-center justify-between',
  'bg-white border border-[var(--color-marker)]',
  'px-3 py-2.5 md:px-4 md:py-3 text-sm md:text-base',
  'transition-colors duration-200 outline-none cursor-pointer',
].join(' ')

export function DatePickerField({
  name,
  label,
  value,
  onChange,
  error,
  required,
  hint,
  className,
  fromDate,
}: DatePickerFieldProps) {
  const [open, setOpen] = useState(false)

  const selected = value?.trim()
    ? parse(value, 'yyyy-MM-dd', new Date())
    : undefined

  const displayValue = selected && isValid(selected)
    ? format(selected, 'd MMMM yyyy', { locale: ru })
    : ''

  function handleSelect(day: Date | undefined) {
    if (day) {
      onChange?.(format(day, 'yyyy-MM-dd'))
    }
    setOpen(false)
  }

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
            id={name}
            type="button"
            aria-label={label}
            aria-invalid={!!error}
            className={cn(
              inputBase,
              error && 'border-red-400',
              !displayValue && 'text-[var(--color-muted)]'
            )}
          >
            <span>{displayValue || 'Выберите дату'}</span>
            <CalendarIcon />
          </button>
        </Popover.Trigger>

        <Popover.Portal>
          <Popover.Content
            align="start"
            sideOffset={4}
            className={cn(
              'z-[100] bg-white border border-[var(--color-marker)] shadow-md p-0',
              'data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95',
              'data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95',
            )}
          >
            <DayPicker
              mode="single"
              selected={selected}
              onSelect={handleSelect}
              locale={ru}
              fromDate={fromDate ?? new Date()}
              classNames={{
                root: 'p-3',
                month_caption: 'flex justify-center mb-2',
                caption_label: 'text-sm font-semibold text-[var(--color-dark)] capitalize',
                nav: 'flex items-center justify-between mb-2',
                button_previous: cn(
                  'p-1 text-[var(--color-muted)] hover:text-[var(--color-dark)]',
                  'transition-colors cursor-pointer'
                ),
                button_next: cn(
                  'p-1 text-[var(--color-muted)] hover:text-[var(--color-dark)]',
                  'transition-colors cursor-pointer'
                ),
                month_grid: 'w-full border-collapse',
                weekdays: 'flex',
                weekday: 'text-[10px] uppercase tracking-wide text-[var(--color-muted)] w-9 text-center py-1',
                week: 'flex mt-1',
                day: 'p-0',
                day_button: cn(
                  'w-9 h-9 text-sm text-[var(--color-dark)] flex items-center justify-center',
                  'hover:bg-[var(--color-pink)] transition-colors cursor-pointer',
                  'outline-none focus-visible:ring-1 focus-visible:ring-[var(--color-dark)]',
                ),
                // Эти классы идут на <td>. Через [&>button]: таргетим кнопку внутри —
                // это единственный способ перебить прямой класс на day_button.
                selected: '[&>button]:bg-[var(--color-dark)] [&>button]:text-[#FAF7F4] [&>button]:hover:bg-[var(--color-dark)]',
                today: '[&>button]:ring-2 [&>button]:ring-[var(--color-orange)] [&>button]:ring-offset-1 [&>button]:font-bold',
                outside: 'opacity-30',
                disabled: 'opacity-20 cursor-not-allowed',
              }}
            />
          </Popover.Content>
        </Popover.Portal>
      </Popover.Root>

      {hint && !error && <p className="text-xs text-[var(--color-muted)]">{hint}</p>}
      {error && <p className="text-xs text-red-500" role="alert">{error}</p>}
    </div>
  )
}

function CalendarIcon() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-[var(--color-muted)] flex-shrink-0"
      aria-hidden
    >
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  )
}
