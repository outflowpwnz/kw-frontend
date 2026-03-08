'use client'
import { ChangeEvent, InputHTMLAttributes, SelectHTMLAttributes, TextareaHTMLAttributes } from 'react'
import { cn } from '@/lib/utils'
import type { SelectOption } from './SelectField'

export type { SelectOption }

// ─── Phone formatter ─────────────────────────────────────────────────────────

function formatPhone(raw: string): string {
  const digits = raw.replace(/\D/g, '').slice(0, 11)
  if (!digits) return ''
  const d = digits.startsWith('7') || digits.startsWith('8') ? digits.slice(1) : digits
  if (d.length === 0) return '+7'
  if (d.length <= 3) return `+7 (${d}`
  if (d.length <= 6) return `+7 (${d.slice(0, 3)}) ${d.slice(3)}`
  if (d.length <= 8) return `+7 (${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}`
  return `+7 (${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6, 8)}-${d.slice(8, 10)}`
}

// ─── Shared styles ────────────────────────────────────────────────────────────

const fieldBase = [
  'w-full bg-white text-[var(--color-dark)] placeholder:text-[var(--color-muted)]',
  'border border-[var(--color-marker)] focus:border-[var(--color-dark)]',
  'px-3 py-2.5 md:px-4 md:py-3 text-sm md:text-base',
  'transition-colors duration-200 focus:outline-none',
].join(' ')

const fieldErrorClass = 'border-red-400 focus:border-red-500'

// ─── Types ────────────────────────────────────────────────────────────────────

type BaseProps = {
  label: string
  error?: string
  required?: boolean
  hint?: string
  className?: string
}

type InputProps = BaseProps &
  Omit<InputHTMLAttributes<HTMLInputElement>, 'name'> & {
    as?: 'input'
    name: string
    /** Применить российскую маску +7 (___) ___-__-__ */
    phoneMask?: boolean
  }

type SelectProps = BaseProps &
  Omit<SelectHTMLAttributes<HTMLSelectElement>, 'name'> & {
    as: 'select'
    name: string
    options: SelectOption[]
    placeholder?: string
  }

type TextareaProps = BaseProps &
  Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'name'> & {
    as: 'textarea'
    name: string
  }

export type FormFieldProps = InputProps | SelectProps | TextareaProps

// ─── Component ───────────────────────────────────────────────────────────────

export function FormField(props: FormFieldProps) {
  const { label, name, error, required, hint, className } = props

  return (
    <div className={cn('flex flex-col gap-1.5', className)}>
      <label
        htmlFor={name}
        className="text-[11px] uppercase tracking-[0.14em] text-[var(--color-dark)] font-semibold select-none"
      >
        {label}
        {required && <span className="text-[var(--color-orange)] ml-1">*</span>}
      </label>

      {props.as === 'select' ? (
        <SelectField {...props} fieldBase={fieldBase} fieldErrorClass={fieldErrorClass} />
      ) : props.as === 'textarea' ? (
        <TextareaField {...props} fieldBase={fieldBase} fieldErrorClass={fieldErrorClass} />
      ) : (
        <InputField {...props} fieldBase={fieldBase} fieldErrorClass={fieldErrorClass} />
      )}

      {hint && !error && (
        <p className="text-xs text-[var(--color-muted)]">{hint}</p>
      )}
      {error && (
        <p className="text-xs text-red-500" role="alert">{error}</p>
      )}
    </div>
  )
}

// ─── Sub-renderers ────────────────────────────────────────────────────────────

function InputField({
  as: _as,
  label: _l,
  error,
  required: _r,
  hint: _h,
  className: _c,
  phoneMask,
  onChange,
  fieldBase,
  fieldErrorClass,
  ...rest
}: InputProps & { fieldBase: string; fieldErrorClass: string }) {
  const handleChange = phoneMask
    ? (e: ChangeEvent<HTMLInputElement>) => {
        const formatted = formatPhone(e.target.value)
        // Передаём родителю событие с отформатированным значением
        onChange?.({
          ...e,
          target: Object.assign(e.target, { value: formatted }),
        } as ChangeEvent<HTMLInputElement>)
      }
    : onChange

  return (
    <input
      {...rest}
      onChange={handleChange}
      className={cn(fieldBase, error && fieldErrorClass)}
      aria-invalid={!!error}
      aria-describedby={error ? `${rest.name}-error` : undefined}
    />
  )
}

function SelectField({
  as: _as,
  label: _l,
  error,
  required: _r,
  hint: _h,
  className: _c,
  options,
  placeholder,
  fieldBase,
  fieldErrorClass,
  ...rest
}: SelectProps & { fieldBase: string; fieldErrorClass: string }) {
  return (
    <select
      {...rest}
      className={cn(fieldBase, error && fieldErrorClass, 'cursor-pointer')}
      aria-invalid={!!error}
    >
      <option value="" disabled>{placeholder ?? '— выберите —'}</option>
      {options.map((o) => (
        <option key={o.value} value={o.value}>{o.label}</option>
      ))}
    </select>
  )
}

function TextareaField({
  as: _as,
  label: _l,
  error,
  required: _r,
  hint: _h,
  className: _c,
  fieldBase,
  fieldErrorClass,
  ...rest
}: TextareaProps & { fieldBase: string; fieldErrorClass: string }) {
  return (
    <textarea
      {...rest}
      rows={rest.rows ?? 4}
      className={cn(fieldBase, error && fieldErrorClass, 'resize-y min-h-[96px]')}
      aria-invalid={!!error}
    />
  )
}
