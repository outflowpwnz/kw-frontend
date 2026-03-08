'use client'
import { useState, useCallback, ChangeEvent, FormEvent } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Button, SelectField, DatePickerField, Quote } from '@/components/ui'
import { FormField } from '@/components/ui/FormField'
import type { SelectOption } from '@/components/ui/SelectField'
import { cn } from '@/lib/utils'
import { submitApplication } from '@/lib/api'

// ─── Select options ───────────────────────────────────────────────────────────

const BUDGET_OPTIONS: SelectOption[] = [
  { value: 'до 300 000', label: 'до 300 000 ₽' },
  { value: '300 000–500 000', label: '300 000 — 500 000 ₽' },
  { value: '500 000–800 000', label: '500 000 — 800 000 ₽' },
  { value: '800 000–1 200 000', label: '800 000 — 1 200 000 ₽' },
  { value: 'свыше 1 200 000', label: 'свыше 1 200 000 ₽' },
  { value: 'не определились', label: 'пока не определились' },
]

const VENUE_OPTIONS: SelectOption[] = [
  { value: 'городской_ресторан', label: 'Городской ресторан / банкетный зал' },
  { value: 'загородный_ресторан', label: 'Загородный ресторан / усадьба' },
  { value: 'лофт', label: 'Лофт / арт-пространство' },
  { value: 'природа', label: 'На природе' },
  { value: 'не_определились', label: 'Пока не определились' },
  { value: 'другое', label: 'Другое' },
]

const YES_NO_OPTIONS: SelectOption[] = [
  { value: 'да', label: 'Да' },
  { value: 'нет', label: 'Нет' },
  { value: 'не_знаем', label: 'Ещё не знаем' },
]

const VENDOR_OPTIONS: SelectOption[] = [
  { value: 'нужен', label: 'Нужен — ищем' },
  { value: 'есть', label: 'Уже есть' },
  { value: 'не_нужен', label: 'Не нужен' },
]

const HOST_OPTIONS: SelectOption[] = [
  { value: 'нужен', label: 'Нужен — ищем' },
  { value: 'есть', label: 'Уже есть' },
  { value: 'рассматриваем_без', label: 'Рассматриваем вариант без ведущего' },
]

const HOW_FOUND_OPTIONS: SelectOption[] = [
  { value: 'instagram', label: 'Instagram' },
  { value: 'vk', label: 'ВКонтакте' },
  { value: 'telegram', label: 'Telegram' },
  { value: 'рекомендация', label: 'Рекомендация знакомых' },
  { value: 'поиск', label: 'Google / Яндекс' },
  { value: 'другое', label: 'Другое' },
]

// ─── Form state ───────────────────────────────────────────────────────────────

interface FormData {
  couple_name: string
  instagram: string
  contact: string
  wedding_date: string
  guests_count: string
  budget: string
  venue_preferences: string
  has_ceremony: string
  has_walk: string
  has_buffet: string
  stylist_service: string
  photographer_service: string
  videographer_service: string
  host_service: string
  evening_entertainment: string
  decor: string
  vision: string
  no_go: string
  other_weddings_feedback: string
  how_found: string
  preferred_meeting_time: string
  privacy_accepted: boolean
}

const INITIAL_FORM: FormData = {
  couple_name: '',
  instagram: '',
  contact: '',
  wedding_date: '',
  guests_count: '',
  budget: '',
  venue_preferences: '',
  has_ceremony: '',
  has_walk: '',
  has_buffet: '',
  stylist_service: '',
  photographer_service: '',
  videographer_service: '',
  host_service: '',
  evening_entertainment: '',
  decor: '',
  vision: '',
  no_go: '',
  other_weddings_feedback: '',
  how_found: '',
  preferred_meeting_time: '',
  privacy_accepted: false,
}

type FormStatus = 'idle' | 'submitting' | 'success' | 'error'
type FormErrors = Partial<Record<keyof FormData, string>>

// ─── Validation ───────────────────────────────────────────────────────────────

function validate(form: FormData): FormErrors {
  const errors: FormErrors = {}
  if (!form.instagram.trim()) errors.instagram = 'Пожалуйста, укажите ваш Instagram'
  if (!form.contact.trim()) errors.contact = 'Пожалуйста, укажите способ связи'
  if (!form.privacy_accepted) errors.privacy_accepted = 'Необходимо согласие на обработку персональных данных'
  return errors
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function GroupHeading({ children }: { children: string }) {
  return (
    <div className="flex items-center gap-4 mb-6">
      <span className="text-[11px] uppercase tracking-[0.18em] text-[var(--color-muted)] font-semibold whitespace-nowrap">
        {children}
      </span>
      <div className="flex-1 h-px bg-[var(--color-marker)]" />
    </div>
  )
}

// ─── Component ────────────────────────────────────────────────────────────────

export function AnketaForm() {
  const searchParams = useSearchParams()
  const source = searchParams.get('source') ?? ''

  const [form, setForm] = useState<FormData>(INITIAL_FORM)
  const [errors, setErrors] = useState<FormErrors>({})
  const [status, setStatus] = useState<FormStatus>('idle')

  // Для нативных инпутов/textarea
  const handle = useCallback(
    (field: keyof FormData) =>
      (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setForm((prev) => ({ ...prev, [field]: e.target.value }))
        if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }))
      },
    [errors]
  )

  // Для Radix Select и DatePicker — получают строку напрямую
  const handleValue = useCallback(
    (field: keyof FormData) => (value: string) => {
      setForm((prev) => ({ ...prev, [field]: value }))
      if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }))
    },
    [errors]
  )

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const errs = validate(form)
    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      // Скролл к первой ошибке
      const firstErrorKey = Object.keys(errs)[0]
      document.getElementById(firstErrorKey)?.scrollIntoView({ behavior: 'smooth', block: 'center' })
      return
    }

    setStatus('submitting')
    try {
      await submitApplication({
        source: source || undefined,
        couple_name: form.couple_name || undefined,
        instagram: form.instagram,
        contact: form.contact,
        wedding_date: form.wedding_date || undefined,
        guests_count: form.guests_count ? Number(form.guests_count) : undefined,
        budget: form.budget || undefined,
        venue_preferences: form.venue_preferences || undefined,
        has_ceremony: form.has_ceremony ? form.has_ceremony === 'да' : undefined,
        has_walk: form.has_walk ? form.has_walk === 'да' : undefined,
        has_buffet: form.has_buffet ? form.has_buffet === 'да' : undefined,
        stylist_service: form.stylist_service || undefined,
        photographer_service: form.photographer_service || undefined,
        videographer_service: form.videographer_service || undefined,
        host_service: form.host_service || undefined,
        evening_entertainment: form.evening_entertainment || undefined,
        decor: form.decor || undefined,
        vision: form.vision || undefined,
        no_go: form.no_go || undefined,
        other_weddings_feedback: form.other_weddings_feedback || undefined,
        how_found: form.how_found || undefined,
        preferred_meeting_time: form.preferred_meeting_time || undefined,
        privacy_accepted: true,
      })
      setStatus('success')
    } catch {
      // Ошибка уже показана через toast-интерцептор в apiClient
      setStatus('error')
    }
  }

  // ── Success state ──────────────────────────────────────────────────────────
  if (status === 'success') {
    return (
      <div className="py-16 text-center flex flex-col items-center gap-6">
        <div className="w-16 h-16 rounded-full bg-[var(--color-pink)] flex items-center justify-center">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--color-dark)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl md:text-3xl text-[var(--color-dark)]">Спасибо!</h2>
          <p className="text-[var(--color-muted)] max-w-md mx-auto leading-relaxed">
            Мы получили вашу анкету и свяжемся с вами в ближайшее время, чтобы обсудить вашу свадьбу.
          </p>
        </div>
        <Link href="/" className="text-sm text-[var(--color-muted)] underline underline-offset-4 hover:text-[var(--color-dark)] transition-colors">
          Вернуться на главную
        </Link>
      </div>
    )
  }

  // ── Form ───────────────────────────────────────────────────────────────────
  return (
    <form onSubmit={handleSubmit} noValidate>
      {/* Скрытое поле source */}
      <input type="hidden" name="source" value={source} />

      {/* ── Приветственный текст ─────────────────────────────────────── */}
      <Quote className="mb-10 md:mb-14">
        Привет Жених и Невеста! Мы поздравляем вас с этим замечательным днём! Специально для вас
        наша команда Karpenko Wedding разработала удобную анкету, чтобы вы могли получить
        примерную смету своего праздника в короткие сроки. Чем подробнее вы ответите на вопросы
        ниже, тем точнее будет ваша смета. Спасибо за понимание :)
      </Quote>

      {/* ── 1. О вас ────────────────────────────────────────────────── */}
      <section className="mb-10 md:mb-12">
        <GroupHeading>О вас</GroupHeading>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
          <FormField
            as="input"
            type="text"
            id="couple_name"
            name="couple_name"
            label="Имя жениха и невесты"
            placeholder="Александр и Мария"
            value={form.couple_name}
            onChange={handle('couple_name')}
          />
          <FormField
            as="input"
            type="text"
            id="instagram"
            name="instagram"
            label="Профиль в Instagram"
            placeholder="@username"
            required
            value={form.instagram}
            onChange={handle('instagram')}
            error={errors.instagram}
            hint="Это очень обязательный пункт!"
          />
          <FormField
            as="input"
            type="text"
            id="contact"
            name="contact"
            label="Как с вами связаться?"
            placeholder="Телефон, Telegram, ВКонтакте..."
            required
            value={form.contact}
            onChange={handle('contact')}
            error={errors.contact}
            className="md:col-span-2"
          />
        </div>
      </section>

      {/* ── 2. О свадьбе ────────────────────────────────────────────── */}
      <section className="mb-10 md:mb-12">
        <GroupHeading>О свадьбе</GroupHeading>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
          <DatePickerField
            name="wedding_date"
            label="Дата свадьбы"
            value={form.wedding_date}
            onChange={handleValue('wedding_date')}
          />
          <FormField
            as="input"
            type="number"
            id="guests_count"
            name="guests_count"
            label="Планируемое количество гостей"
            placeholder="50"
            min={1}
            value={form.guests_count}
            onChange={handle('guests_count')}
          />
          <SelectField
            name="budget"
            label="Примерный бюджет на свадьбу"
            options={BUDGET_OPTIONS}
            value={form.budget}
            onValueChange={handleValue('budget')}
          />
          <SelectField
            name="venue_preferences"
            label="Пожелания по площадке"
            options={VENUE_OPTIONS}
            value={form.venue_preferences}
            onValueChange={handleValue('venue_preferences')}
          />
          <SelectField
            name="has_ceremony"
            label="Планируется выездная церемония?"
            options={YES_NO_OPTIONS}
            value={form.has_ceremony}
            onValueChange={handleValue('has_ceremony')}
          />
          <SelectField
            name="has_walk"
            label="Планируется прогулка?"
            options={YES_NO_OPTIONS}
            value={form.has_walk}
            onValueChange={handleValue('has_walk')}
          />
          <SelectField
            name="has_buffet"
            label="Планируется фуршет до/после церемонии?"
            options={YES_NO_OPTIONS}
            value={form.has_buffet}
            onValueChange={handleValue('has_buffet')}
            className="md:col-span-2 md:max-w-[calc(50%-12px)]"
          />
        </div>
      </section>

      {/* ── 3. Подрядчики ───────────────────────────────────────────── */}
      <section className="mb-10 md:mb-12">
        <GroupHeading>Подрядчики</GroupHeading>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
          <SelectField
            name="stylist_service"
            label="Услуги стилиста"
            options={VENDOR_OPTIONS}
            value={form.stylist_service}
            onValueChange={handleValue('stylist_service')}
          />
          <SelectField
            name="photographer_service"
            label="Услуги фотографа"
            options={VENDOR_OPTIONS}
            value={form.photographer_service}
            onValueChange={handleValue('photographer_service')}
          />
          <SelectField
            name="videographer_service"
            label="Услуги видеографа"
            options={VENDOR_OPTIONS}
            value={form.videographer_service}
            onValueChange={handleValue('videographer_service')}
          />
          <SelectField
            name="host_service"
            label="Ведущий"
            options={HOST_OPTIONS}
            value={form.host_service}
            onValueChange={handleValue('host_service')}
          />
          <FormField
            as="input"
            type="text"
            id="evening_entertainment"
            name="evening_entertainment"
            label="Дополнительное сопровождение вечера"
            placeholder="Живая музыка, артисты, шоу-программа..."
            value={form.evening_entertainment}
            onChange={handle('evening_entertainment')}
            className="md:col-span-2"
          />
        </div>
      </section>

      {/* ── 4. Концепция ────────────────────────────────────────────── */}
      <section className="mb-10 md:mb-12">
        <GroupHeading>Концепция свадьбы</GroupHeading>
        <div className="flex flex-col gap-5 md:gap-6">
          <FormField
            as="input"
            type="text"
            id="decor"
            name="decor"
            label="Декор"
            placeholder="Опишите пожелания по декору, стилю, цветовой гамме..."
            value={form.decor}
            onChange={handle('decor')}
          />
          <FormField
            as="textarea"
            id="vision"
            name="vision"
            label="Опишите, какой вы видите свою свадьбу"
            placeholder="Что вам особенно нравится, какая атмосфера, детали, которые важны..."
            rows={5}
            value={form.vision}
            onChange={handle('vision')}
          />
          <FormField
            as="input"
            type="text"
            id="no_go"
            name="no_go"
            label="Чего категорически не должно быть на вашей свадьбе?"
            placeholder="Голуби, пушки с конфетти, живые цветы на столах..."
            value={form.no_go}
            onChange={handle('no_go')}
          />
          <FormField
            as="input"
            type="text"
            id="other_weddings_feedback"
            name="other_weddings_feedback"
            label="Что понравилось или не понравилось на других свадьбах?"
            placeholder="Поделитесь впечатлениями..."
            value={form.other_weddings_feedback}
            onChange={handle('other_weddings_feedback')}
          />
        </div>
      </section>

      {/* ── 5. Прочее ───────────────────────────────────────────────── */}
      <section className="mb-10 md:mb-12">
        <GroupHeading>Прочее</GroupHeading>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
          <SelectField
            name="how_found"
            label="Откуда узнали о нашей команде?"
            options={HOW_FOUND_OPTIONS}
            value={form.how_found}
            onValueChange={handleValue('how_found')}
          />
          <FormField
            as="input"
            type="text"
            id="preferred_meeting_time"
            name="preferred_meeting_time"
            label="Укажите удобное время для встречи"
            placeholder="Будни после 18:00, выходные..."
            value={form.preferred_meeting_time}
            onChange={handle('preferred_meeting_time')}
          />
        </div>
      </section>

      {/* ── 6. Подтверждение ────────────────────────────────────────── */}
      <section className="mb-10 md:mb-12 flex flex-col gap-4">
        {/* Поле 22 — UI-напоминание, не сохраняется в БД */}
        <label className={cn(
          'flex items-start gap-3 cursor-pointer group',
          'p-4 border border-[var(--color-marker)] bg-[#FAF7F4]'
        )}>
          <input
            type="checkbox"
            className="mt-0.5 w-4 h-4 accent-[var(--color-dark)] flex-shrink-0 cursor-pointer"
          />
          <span className="text-sm text-[var(--color-muted)] leading-relaxed">
            Проверьте, пожалуйста, правильно ли вы указали способ связи — иначе нам некуда будет
            прислать вашу смету. Спасибо!
          </span>
        </label>

        {/* Поле 23 — согласие на ПД, обязательное */}
        <label className={cn(
          'flex items-start gap-3 cursor-pointer',
          errors.privacy_accepted && 'text-red-500'
        )}>
          <input
            id="privacy_accepted"
            type="checkbox"
            checked={form.privacy_accepted}
            onChange={(e) => {
              setForm((prev) => ({ ...prev, privacy_accepted: e.target.checked }))
              if (errors.privacy_accepted) setErrors((prev) => ({ ...prev, privacy_accepted: undefined }))
            }}
            className="mt-0.5 w-4 h-4 accent-[var(--color-dark)] flex-shrink-0 cursor-pointer"
          />
          <span className="text-sm leading-relaxed">
            Я согласен(а) на обработку персональных данных в соответствии с{' '}
            <Link href="/privacy" className="underline underline-offset-2 hover:text-[var(--color-dark)] transition-colors">
              политикой конфиденциальности
            </Link>
            .{' '}
            <span className="text-[var(--color-orange)]">*</span>
          </span>
        </label>
        {errors.privacy_accepted && (
          <p className="text-xs text-red-500 -mt-2" role="alert">{errors.privacy_accepted}</p>
        )}
      </section>

      {/* ── Submit ───────────────────────────────────────────────────── */}
      {status === 'error' && (
        <p className="mb-4 text-sm text-red-500 text-center" role="alert">
          Что-то пошло не так. Пожалуйста, попробуйте ещё раз или свяжитесь с нами напрямую.
        </p>
      )}

      <Button
        type="submit"
        size="lg"
        disabled={status === 'submitting'}
        className="w-full md:w-auto"
      >
        {status === 'submitting' ? 'Отправляем...' : 'Отправить анкету'}
      </Button>
    </form>
  )
}
