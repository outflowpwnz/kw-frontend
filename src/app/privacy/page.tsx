import { Header } from '@/components/layout'
import { Footer } from '@/components/layout'
import { Container, Section } from '@/components/ui'

export const metadata = {
  title: 'Политика конфиденциальности — Karpenko Wedding',
}

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <main className="pt-16 md:pt-20">
        <Section>
          <Container size="narrow">
            <h1 className="text-4xl font-bold uppercase mb-8">
              Политика конфиденциальности
            </h1>
            <p className="text-[var(--color-muted)]">
              Текст политики конфиденциальности — будет добавлен.
            </p>
          </Container>
        </Section>
      </main>
      <Footer />
    </>
  )
}
