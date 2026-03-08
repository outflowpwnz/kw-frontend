// Минималистичный pub/sub для flash-сообщений.
// Не зависит от React — можно вызывать из axios-интерцепторов, сервисов, хуков.

export type ToastType = 'success' | 'error' | 'info'

export interface Toast {
  id: string
  message: string
  type: ToastType
}

type Listener = (toast: Toast) => void

const listeners = new Set<Listener>()

function emit(message: string, type: ToastType) {
  const toast: Toast = { id: crypto.randomUUID(), message, type }
  listeners.forEach((l) => l(toast))
}

export const toast = {
  success: (message: string) => emit(message, 'success'),
  error:   (message: string) => emit(message, 'error'),
  info:    (message: string) => emit(message, 'info'),

  /** Подписаться на тосты. Возвращает функцию отписки. */
  subscribe: (listener: Listener) => {
    listeners.add(listener)
    return () => { listeners.delete(listener) }
  },
}
