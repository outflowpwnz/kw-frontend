/** Высота фиксированного хедера — совпадает с h-16/h-20 в Header.tsx */
export const HEADER_HEIGHT_MOBILE = 64   // h-16
export const HEADER_HEIGHT_DESKTOP = 80  // h-20, breakpoint nav = 1024px

/** Возвращает актуальную высоту хедера в зависимости от ширины окна */
export function getHeaderHeight(): number {
  return window.innerWidth >= 1024 ? HEADER_HEIGHT_DESKTOP : HEADER_HEIGHT_MOBILE
}
