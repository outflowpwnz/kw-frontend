// ─── Domain types ─────────────────────────────────────────────────────────────

export interface PortfolioCase {
  id: string
  title: string
  photoUrl: string
  description: string
  sortOrder: number
}

export interface Package {
  id: string
  name: string
  shortDescription: string
  price: string | null
}

export interface FaqItem {
  id: string
  question: string
  answer: string
  sortOrder: number
}

export interface Review {
  id: string
  text: string
  sortOrder: number
}

export interface TeamMember {
  id: string
  name: string
  description: string
  photoUrl: string
  sortOrder: number
}

export interface SiteSettings {
  // Статистика (HeroSection)
  stat_years_experience?: string
  stat_weddings_count?: string
  stat_team_size?: string
  stat_rating?: string
  // Обратный отсчёт (WeddingCountdownSection)
  countdown_next_wedding_date?: string
  countdown_total_weddings?: string
  // Контакты (ContactsSection)
  phone?: string
  instagram_url?: string
  telegram_url?: string
  // Дополнительные ключи из бэка
  [key: string]: string | undefined
}

// ─── Application types ────────────────────────────────────────────────────────

export interface ApplicationPayload {
  source?: string
  coupleName?: string
  instagram: string
  contact: string
  weddingDate?: string
  guestsCount?: number
  budget?: string
  venuePreferences?: string
  hasCeremony?: boolean
  hasWalk?: boolean
  hasBuffet?: boolean
  stylistService?: string
  photographerService?: string
  videographerService?: string
  hostService?: string
  eveningEntertainment?: string
  decor?: string
  vision?: string
  noGo?: string
  otherWeddingsFeedback?: string
  howFound?: string
  preferredMeetingTime?: string
  privacyAccepted: boolean
}

export interface ApplicationResponse {
  id: string
}
