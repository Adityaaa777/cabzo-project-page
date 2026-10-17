import { useEffect, useState } from "react"
import type { CSSProperties, KeyboardEvent } from "react"
import { createPortal } from "react-dom"
import { LightboxZoomControls, useLightboxZoom } from "./LightboxZoom"

type DetailImageProps = {
  alt: string
  className: string
  draggable?: boolean | "true" | "false"
  gallery?: { alt: string; src: string }[]
  galleryIndex?: number
  src: string
  style?: CSSProperties
  viewCrop?: { sourceWidth: number; x: number; y: number; width: number; height: number }
}

/** An image that opens its uncropped source in an accessible detail viewer. */
export function DetailImage({
  alt,
  className,
  draggable = false,
  gallery,
  galleryIndex,
  src,
  style,
  viewCrop,
}: DetailImageProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)
  const zoom = useLightboxZoom(isOpen)
  const activeImage = gallery?.[activeIndex] ?? { alt, src }

  const open = () => {
    setActiveIndex(galleryIndex ?? Math.max(0, gallery?.findIndex((image) => image.src === src) ?? 0))
    setIsOpen(true)
  }

  const move = (direction: -1 | 1) => {
    if (!gallery) return
    zoom.reset()
    setActiveIndex((index) => (index + direction + gallery.length) % gallery.length)
  }

  useEffect(() => {
    if (!isOpen) return

    const previousOverflow = document.body.style.overflow
    const closeOnEscape = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false)
    }

    document.body.style.overflow = "hidden"
    window.addEventListener("keydown", closeOnEscape)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener("keydown", closeOnEscape)
    }
  }, [isOpen])

  const openFromKeyboard = (event: KeyboardEvent<HTMLImageElement>) => {
    if (event.key !== "Enter" && event.key !== " ") return
    event.preventDefault()
    open()
  }

  return (
    <>
      <img
        alt={alt}
        aria-expanded={isOpen}
        aria-haspopup="dialog"
        className={`${className} detail-image-trigger`}
        draggable={draggable}
        onClick={open}
        onKeyDown={openFromKeyboard}
        role="button"
        src={src}
        style={style}
        tabIndex={0}
      />

      {isOpen && createPortal(
        <div
          aria-label={`${activeImage.alt} detailed view`}
          aria-modal="true"
          className="gallery-lightbox"
          onClick={() => setIsOpen(false)}
          onKeyDown={(event) => {
            if (!gallery) return
            if (event.key === "ArrowLeft") { event.preventDefault(); move(-1) }
            if (event.key === "ArrowRight") { event.preventDefault(); move(1) }
          }}
          role="dialog"
        >
          <figure className={`gallery-lightbox-figure${viewCrop ? " gallery-lightbox-figure--cropped" : ""}${gallery ? " gallery-lightbox-figure--cover-gallery" : ""}`} onClick={(event) => event.stopPropagation()}>
            {viewCrop ? (
              <div className="gallery-lightbox-crop" style={{ aspectRatio: `${viewCrop.width} / ${viewCrop.height}`, width: `min(92vw, calc(84vh * ${viewCrop.width / viewCrop.height}))`, ...zoom.mediaStyle }} {...zoom.mediaHandlers}>
                <img
                  alt={activeImage.alt}
                  src={activeImage.src}
                  style={{ left: `${(-viewCrop.x / viewCrop.width) * 100}%`, top: `${(-viewCrop.y / viewCrop.height) * 100}%`, width: `${(viewCrop.sourceWidth / viewCrop.width) * 100}%` }}
                />
              </div>
            ) : <img alt={activeImage.alt} src={activeImage.src} style={zoom.mediaStyle} {...zoom.mediaHandlers} />}
            <figcaption aria-live={gallery ? "polite" : undefined}>{activeImage.alt}</figcaption>
            {gallery && (
              <>
                <button aria-label="Previous screen" className="gallery-lightbox-nav gallery-lightbox-nav--previous" onClick={() => move(-1)} type="button">
                  <svg aria-hidden="true" viewBox="0 0 24 24"><path d="m15 18-6-6 6-6" /></svg>
                </button>
                <button aria-label="Next screen" className="gallery-lightbox-nav gallery-lightbox-nav--next" onClick={() => move(1)} type="button">
                  <svg aria-hidden="true" viewBox="0 0 24 24"><path d="m9 18 6-6-6-6" /></svg>
                </button>
              </>
            )}
            <LightboxZoomControls {...zoom} />
            <button
              aria-label="Close detailed view"
              autoFocus
              className="gallery-lightbox-close"
              onClick={() => setIsOpen(false)}
              type="button"
            >
              <span aria-hidden="true">×</span>
            </button>
          </figure>
        </div>,
        document.body,
      )}
    </>
  )
}
