import { HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  size?: 'default' | 'narrow' | 'wide'
}

export function Container({
  className,
  size = 'default',
  children,
  ...props
}: ContainerProps) {
  const sizes = {
    default: 'max-w-[1440px]',
    narrow: 'max-w-[900px]',
    wide: 'max-w-full',
  }

  return (
    <div
      className={cn(
        'mx-auto w-full px-4 md:px-8 lg:px-16',
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}
