import { HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

interface SectionProps extends HTMLAttributes<HTMLElement> {
  as?: 'section' | 'div' | 'article'
}

export function Section({
  className,
  as: Tag = 'section',
  children,
  ...props
}: SectionProps) {
  return (
    <Tag className={cn('py-16 md:py-24', className)} {...props}>
      {children}
    </Tag>
  )
}
