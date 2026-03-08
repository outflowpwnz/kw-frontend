import { Header } from '@/components/layout'
import { Footer } from '@/components/layout'
import { Container, Section } from '@/components/ui'

export const metadata = {
  title: 'Анкета — Karpenko Wedding',
  description: 'Заполните анкету и получите предварительную смету вашей свадьбы',
}

export default function AnketaPage() {
  return (
    <>
      <Header />
      <main className="pt-16 md:pt-20">
        <Section>
          <Container size="narrow">
            <h1 className="text-4xl font-bold uppercase mb-8">Анкета</h1>
            <p className="text-[var(--color-muted)]">Форма анкеты — в разработке</p>
          </Container>
        </Section>
      </main>
      <Footer />
    </>
  )
}
