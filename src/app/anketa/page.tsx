import { Suspense } from 'react'
import { Header } from '@/components/layout'
import { Footer } from '@/components/layout'
import { Container, PageHeading } from '@/components/ui'
import { AnketaForm } from './AnketaForm'

export const metadata = {
  title: 'Анкета — Karpenko Wedding',
  description: 'Заполните анкету и получите предварительную смету вашей свадьбы в короткие сроки.',
}

export default function AnketaPage() {
  return (
    <>
      <Header />
      {/*
        Используем <div> вместо <section>, чтобы не попасть под CSS-правила
        sticky stacking (main > section), которые применяются только к главной.
      */}
      <main className="pt-16 nav:pt-20 min-h-screen">
        <div className="py-14 md:py-20">
          <Container size="narrow">
            <PageHeading title="Анкета" />

            {/* Форма — обёрнута в Suspense из-за useSearchParams */}
            <Suspense fallback={
              <div className="py-16 flex justify-center">
                <span className="text-[var(--color-muted)] text-sm">Загрузка...</span>
              </div>
            }>
              <AnketaForm />
            </Suspense>
          </Container>
        </div>
      </main>
      <Footer />
    </>
  )
}
