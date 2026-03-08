import type { Metadata } from 'next'
import { Cormorant_Garamond, Inter } from 'next/font/google'
import './globals.css'
import { CustomCursor, StickyStackController, ToastContainer } from '@/components/ui'

const cormorant = Cormorant_Garamond({
  subsets: ['latin', 'cyrillic'],
  weight: ['300', '400', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-inter',
  display: 'swap',
})

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
    <html lang="ru" className={`${cormorant.variable} ${inter.variable}`}>
      <body>
        <CustomCursor />
        <StickyStackController />
        {children}
        <ToastContainer />
      </body>
    </html>
  )
}
