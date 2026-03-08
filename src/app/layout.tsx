import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { CustomCursor } from '@/components/ui'

const inter = Inter({ subsets: ['latin', 'cyrillic'] })

export const metadata: Metadata = {
  title: 'Ателье событий Екатерины Карпенко',
  description: 'Профессиональная организация свадеб. Помогаем воплотить в жизнь ваш идеальный свадебный день.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru">
      <body className={inter.className}>
        <CustomCursor />
        {children}
      </body>
    </html>
  )
}
