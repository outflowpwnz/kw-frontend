import axios, { AxiosError } from 'axios'
import { toast } from '@/lib/toast'

const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? '/api/v1'

export const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
})

apiClient.interceptors.response.use(
  (response) => response,

  (error: AxiosError) => {
    const serverMessage =
      (error.response?.data as Record<string, unknown> | undefined)?.message
    const message =
      typeof serverMessage === 'string' ? serverMessage : 'Произошла ошибка. Попробуйте ещё раз.'

    toast.error(message)

    return Promise.reject(error)
  }
)
