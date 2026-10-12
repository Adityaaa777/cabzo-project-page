import { useEffect, useRef, useState } from "react"
import type { CSSProperties, PointerEvent } from "react"

type Point = { x: number; y: number }

export function useLightboxZoom(isOpen: boolean) {
  const [level, setLevel] = useState(1)
  const [offset, setOffset] = useState<Point>({ x: 0, y: 0 })
  const drag = useRef<{ pointerId: number; x: number; y: number } | null>(null)
  const moved = useRef(false)

  useEffect(() => {
    if (isOpen) return
    setLevel(1)
    setOffset({ x: 0, y: 0 })
    drag.current = null
  }, [isOpen])

  const zoomIn = () => setLevel((value) => Math.min(3, value + 0.5))
  const reset = () => {
    setLevel(1)
    setOffset({ x: 0, y: 0 })
  }
  const zoomOut = () => {
    if (level <= 1.5) reset()
    else setLevel(level - 0.5)
  }

  const mediaStyle: CSSProperties = {
    transform: `translate(${offset.x}px, ${offset.y}px) scale(${level})`,
    transformOrigin: "center center",
    cursor: level > 1 ? "grab" : "zoom-in",
    touchAction: "none",
  }

  const mediaHandlers = {
    onClick: () => {
      if (moved.current) {
        moved.current = false
        return
      }
      if (level === 3) reset()
      else zoomIn()
    },
    onPointerDown: (event: PointerEvent<HTMLElement>) => {
      if (level === 1) return
      event.preventDefault()
      drag.current = { pointerId: event.pointerId, x: event.clientX, y: event.clientY }
      moved.current = false
      event.currentTarget.setPointerCapture(event.pointerId)
    },
    onPointerMove: (event: PointerEvent<HTMLElement>) => {
      const active = drag.current
      if (!active || active.pointerId !== event.pointerId) return
      const dx = event.clientX - active.x
      const dy = event.clientY - active.y
      if (Math.abs(dx) + Math.abs(dy) > 2) moved.current = true
      setOffset((value) => ({ x: value.x + dx, y: value.y + dy }))
      drag.current = { ...active, x: event.clientX, y: event.clientY }
    },
    onPointerUp: (event: PointerEvent<HTMLElement>) => {
      if (drag.current?.pointerId !== event.pointerId) return
      drag.current = null
      if (event.currentTarget.hasPointerCapture(event.pointerId)) {
        event.currentTarget.releasePointerCapture(event.pointerId)
      }
    },
  }

  return { level, mediaStyle, mediaHandlers, zoomIn, zoomOut, reset }
}

type LightboxZoomControlsProps = Pick<ReturnType<typeof useLightboxZoom>, "level" | "zoomIn" | "zoomOut" | "reset">

export function LightboxZoomControls({ level, zoomIn, zoomOut, reset }: LightboxZoomControlsProps) {
  return (
    <div className="gallery-zoom-controls" aria-label="Screen zoom controls">
      <button type="button" aria-label="Zoom out" disabled={level === 1} onClick={zoomOut}>−</button>
      <button type="button" aria-label="Reset zoom" onClick={reset}>{Math.round(level * 100)}%</button>
      <button type="button" aria-label="Zoom in" disabled={level === 3} onClick={zoomIn}>+</button>
    </div>
  )
}
