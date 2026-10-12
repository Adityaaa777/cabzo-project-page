import { useCallback, useEffect, useRef } from "react"

export function useRelatedCarousel() {
  const track = useRef<HTMLDivElement>(null)
  const timer = useRef<number | null>(null)

  const advance = useCallback((direction: -1 | 1) => {
    const element = track.current
    const firstCard = element?.firstElementChild as HTMLElement | null
    if (!element || !firstCard) return

    const gap = Number.parseFloat(getComputedStyle(element).columnGap) || 0
    const step = firstCard.getBoundingClientRect().width + gap
    const end = element.scrollWidth - element.clientWidth
    if (end <= 1) return

    if (direction === 1 && element.scrollLeft >= end - 2) {
      element.scrollTo({ left: 0, behavior: "smooth" })
    } else if (direction === -1 && element.scrollLeft <= 2) {
      element.scrollTo({ left: end, behavior: "smooth" })
    } else {
      element.scrollBy({ left: direction * step, behavior: "smooth" })
    }
  }, [])

  const startTimer = useCallback(() => {
    if (timer.current !== null) window.clearInterval(timer.current)
    timer.current = window.setInterval(() => {
      if (document.visibilityState === "visible") advance(1)
    }, 30_000)
  }, [advance])

  useEffect(() => {
    startTimer()
    return () => {
      if (timer.current !== null) window.clearInterval(timer.current)
    }
  }, [startTimer])

  const move = (direction: -1 | 1) => {
    advance(direction)
    startTimer()
  }

  return { track, move }
}
