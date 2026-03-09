import type {
  PortfolioCase,
  Package,
  FaqItem,
  Review,
  TeamMember,
  SiteSettings,
} from './types'

// ─── Re-exports ───────────────────────────────────────────────────────────────

export { submitApplication } from './applications'
export type {
  ApplicationPayload,
  ApplicationResponse,
  PortfolioCase,
  Package,
  FaqItem,
  Review,
  TeamMember,
  SiteSettings,
} from './types'

// ─── Server-side fetch helper ─────────────────────────────────────────────────
// Использует нативный fetch для поддержки Next.js ISR ({ next: { revalidate } })

// SSR (сервер): API_URL_INTERNAL — прямой доступ к бэку внутри Docker-сети
// Client (браузер): NEXT_PUBLIC_API_URL — публичный адрес через nginx
const API_URL =
  (typeof window === 'undefined' ? process.env.API_URL_INTERNAL : undefined) ??
  process.env.NEXT_PUBLIC_API_URL ??
  'http://localhost:4000/api/v1'

async function apiFetch<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, options)
  if (!res.ok) throw new Error(`API ${path} failed: ${res.status}`)
  const json = await res.json()
  return (json.data ?? json) as T
}

// ─── Public URL helper ────────────────────────────────────────────────────────

export const BACKEND_BASE = API_URL.replace('/api/v1', '')

export function resolveMediaUrl(url: string): string {
  if (!url) return ''
  if (url.startsWith('http')) return url
  return `${BACKEND_BASE}${url}`
}

// ─── GET methods (вызываются только на сервере из page.tsx) ───────────────────

export const api = {
  getPortfolio: (opts?: RequestInit) =>
    apiFetch<PortfolioCase[]>('/portfolio', opts),

  getPackages: (opts?: RequestInit) =>
    apiFetch<Package[]>('/packages', opts),

  getFaq: (opts?: RequestInit) =>
    apiFetch<FaqItem[]>('/faq', opts),

  getReviews: (opts?: RequestInit) =>
    apiFetch<Review[]>('/reviews', opts),

  getTeam: (opts?: RequestInit) =>
    apiFetch<TeamMember[]>('/team', opts),

  getSettings: (opts?: RequestInit) =>
    apiFetch<SiteSettings>('/settings', opts),
}
