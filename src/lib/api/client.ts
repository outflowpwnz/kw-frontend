import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios'
import { toast } from '@/lib/toast'

// В dev можно указать NEXT_PUBLIC_API_URL=http://localhost:3001/api/v1
// В prod — пустая строка: nginx проксирует /api/v1 → backend
const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? '/api/v1'

export const apiClient = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, // отправляет httpOnly cookie (access_token, refresh_token)
  headers: { 'Content-Type': 'application/json' },
})

// ─── Auth: обновление токена при 401 ──────────────────────────────────────────

let isRefreshing = false
let refreshQueue: Array<() => void> = []

function processQueue() {
  refreshQueue.forEach((resolve) => resolve())
  refreshQueue = []
}

apiClient.interceptors.response.use(
  (response) => response,

  async (error: AxiosError) => {
    const original = error.config as InternalAxiosRequestConfig & { _retry?: boolean }

    // 401 — пробуем обновить access_token через refresh_token cookie
    if (error.response?.status === 401 && !original._retry) {
      original._retry = true

      if (isRefreshing) {
        // Ставим запрос в очередь до окончания refresh
        return new Promise<void>((resolve) => {
          refreshQueue.push(resolve)
        }).then(() => apiClient(original))
      }

      isRefreshing = true

      try {
        await apiClient.post('/auth/refresh')
        processQueue()
        return apiClient(original)
      } catch {
        refreshQueue = []
        // refresh истёк — выкидываем на логин
        if (typeof window !== 'undefined') {
          window.location.href = '/admin/login'
        }
        return Promise.reject(error)
      } finally {
        isRefreshing = false
      }
    }

    // Остальные ошибки — показываем flash-сообщение
    const serverMessage =
      (error.response?.data as Record<string, unknown> | undefined)?.message
    const message =
      typeof serverMessage === 'string' ? serverMessage : 'Произошла ошибка. Попробуйте ещё раз.'

    toast.error(message)

    return Promise.reject(error)
  }
)
