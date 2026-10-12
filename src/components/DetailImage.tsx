import { useEffect, useState } from "react"
import type { CSSProperties, KeyboardEvent } from "react"
import { createPortal } from "react-dom"
import { LightboxZoomControls, useLightboxZoom } from "./LightboxZoom"

type DetailImageProps = {
  alt: string
  className: string
  draggable?: boolean | "true" | "false"
  src: string
  style?: CSSProperties
  viewCrop?: { sourceWidth: number; x: number; y: number; width: number; height: number }
}

/** An image that opens its uncropped source in an accessible detail viewer. */
export function DetailImage({
  alt,
  className,
  draggable = false,
  src,
  style,
  viewCrop,
}: DetailImageProps) {
  const [isOpen, setIsOpen] = useState(false)
  const zoom = useLightboxZoom(isOpen)

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
    setIsOpen(true)
  }

  return (
    <>
      <img
        alt={alt}
        aria-expanded={isOpen}
        aria-haspopup="dialog"
        className={`${className} detail-image-trigger`}
        draggable={draggable}
        onClick={() => setIsOpen(true)}
        onKeyDown={openFromKeyboard}
        role="button"
        src={src}
        style={style}
        tabIndex={0}
      />

      {isOpen && createPortal(
        <div
          aria-label={`${alt} detailed view`}
          aria-modal="true"
          className="gallery-lightbox"
          onClick={() => setIsOpen(false)}
          role="dialog"
        >
          <figure className={`gallery-lightbox-figure${viewCrop ? " gallery-lightbox-figure--cropped" : ""}`} onClick={(event) => event.stopPropagation()}>
            {viewCrop ? (
              <div className="gallery-lightbox-crop" style={{ aspectRatio: `${viewCrop.width} / ${viewCrop.height}`, width: `min(92vw, calc(84vh * ${viewCrop.width / viewCrop.height}))`, ...zoom.mediaStyle }} {...zoom.mediaHandlers}>
                <img
                  alt={alt}
                  src={src}
                  style={{ left: `${(-viewCrop.x / viewCrop.width) * 100}%`, top: `${(-viewCrop.y / viewCrop.height) * 100}%`, width: `${(viewCrop.sourceWidth / viewCrop.width) * 100}%` }}
                />
              </div>
            ) : <img alt={alt} src={src} style={zoom.mediaStyle} {...zoom.mediaHandlers} />}
            <figcaption>{alt}</figcaption>
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
