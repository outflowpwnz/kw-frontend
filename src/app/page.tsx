import { Header } from '@/components/layout'
import { Footer } from '@/components/layout'
import {
  HeroSection,
  AboutSection,
  ReviewsSection,
  PortfolioSection,
  ProcessSection,
  FaqSection,
  PackagesSection,
  ContactsSection,
} from '@/components/sections'

export default function HomePage() {
  return (
    <>
      <Header />
      <main className="pt-0">
        <HeroSection />
        <AboutSection />
        <ReviewsSection />
        <PortfolioSection />
        <ProcessSection />
        <FaqSection />
        <PackagesSection />
        <ContactsSection />
      </main>
      <Footer />
    </>
  )
}
