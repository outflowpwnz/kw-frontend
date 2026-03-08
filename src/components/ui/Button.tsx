import { ButtonHTMLAttributes, forwardRef } from 'react'
import { cn } from '@/lib/utils'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'ghost' | 'light'
  size?: 'sm' | 'md' | 'lg'
}

const base =
  'inline-flex items-center justify-center uppercase tracking-[0.15em] font-medium text-xs transition-colors duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--color-dark)]'

const variants = {
  primary: 'bg-[var(--color-dark)] text-[#FAF7F4] hover:bg-[#2E2A27]',
  outline: 'border border-[var(--color-dark)] text-[var(--color-dark)] hover:bg-[var(--color-dark)] hover:text-[#FAF7F4]',
  ghost:   'text-[var(--color-dark)] underline-offset-4 hover:text-[var(--color-orange)] hover:underline',
  light:   'bg-white text-[var(--color-dark)] hover:bg-white/90',
}

const sizes = {
  sm: 'px-5 py-2.5',
  md: 'px-7 py-3.5',
  lg: 'px-10 py-4',
}

/** Возвращает строку классов для кнопки — используй с <button> или <Link> */
export function buttonVariants({
  variant = 'primary',
  size = 'md',
  className = '',
}: {
  variant?: keyof typeof variants
  size?: keyof typeof sizes
  className?: string
} = {}) {
  return cn(base, variants[variant], sizes[size], className)
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', children, ...props }, ref) => (
    <button
      ref={ref}
      className={buttonVariants({ variant, size, className })}
      {...props}
    >
      {children}
    </button>
  )
)

Button.displayName = 'Button'
export { Button }
