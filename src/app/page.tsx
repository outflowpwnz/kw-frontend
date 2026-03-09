import { Header, Footer } from '@/components/layout'
import {
  HeroSection,
  WeddingCountdownSection,
  AboutSection,
  ReviewsSection,
  PortfolioSection,
  ProcessSection,
  FaqSection,
  PackagesSection,
  ContactsSection,
} from '@/components/sections'
import { api } from '@/lib/api'
import type { SiteSettings, TeamMember, Review, PortfolioCase, FaqItem, Package } from '@/lib/api'

// Все данные ревалидируются раз в час
export const revalidate = 3600

export default async function HomePage() {
  const [settings, team, reviews, portfolio, faq, packages] = await Promise.all([
    api.getSettings().catch((): SiteSettings => ({})),
    api.getTeam().catch((): TeamMember[] => []),
    api.getReviews().catch((): Review[] => []),
    api.getPortfolio().catch((): PortfolioCase[] => []),
    api.getFaq().catch((): FaqItem[] => []),
    api.getPackages().catch((): Package[] => []),
  ])

  return (
    <>
      <Header />
      <main className="pt-0">
        <HeroSection settings={settings} />
        <WeddingCountdownSection settings={settings} />
        <AboutSection team={team} />
        <ReviewsSection reviews={reviews} />
        <PortfolioSection cases={portfolio} />
        <ProcessSection />
        <FaqSection items={faq} />
        <PackagesSection packages={packages} />
        <ContactsSection settings={settings} />
      </main>
      <Footer settings={settings} />
    </>
  )
}
