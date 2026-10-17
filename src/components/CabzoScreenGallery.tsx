import { useEffect, useState } from "react"
import type { CSSProperties } from "react"
import { createPortal } from "react-dom"
import { LightboxZoomControls, useLightboxZoom } from "./LightboxZoom"

type ScreenPlacement = {
  height: number
  left: number
  name: string
  nodeId: string
  src: string
  top: number
  width: number
}

const galleryWidth = 1270
const galleryHeight = 855

const screenPlacements: ScreenPlacement[] = [
  {
    name: "Ride confirmed screen, lower left",
    nodeId: "1:652",
    src: "/assets/ride-confirmed.png",
    left: -59,
    top: 362,
    width: 249,
    height: 539,
  },
  {
    name: "Rental duration screen",
    nodeId: "1:653",
    src: "/assets/rental.png",
    left: 214,
    top: 317,
    width: 249,
    height: 539,
  },
  {
    name: "Ride confirmed screen, upper left",
    nodeId: "1:654",
    src: "/assets/ride-confirmed.png",
    left: 214,
    top: -246,
    width: 249,
    height: 539,
  },
  {
    name: "Cabzo home screen, upper centre",
    nodeId: "1:655",
    src: "/assets/home.png",
    left: 487,
    top: -222,
    width: 239,
    height: 685,
  },
  {
    name: "Cabzo home screen, lower centre",
    nodeId: "1:656",
    src: "/assets/home.png",
    left: 487,
    top: 487,
    width: 239,
    height: 685,
  },
  {
    name: "Safety screen",
    nodeId: "1:657",
    src: "/assets/safety.png",
    left: 750,
    top: -242,
    width: 249,
    height: 539,
  },
  {
    name: "Add money screen",
    nodeId: "1:658",
    src: "/assets/wallet-add-money.png",
    left: 750.279296875,
    top: 321.919921875,
    width: 243,
    height: 539,
  },
  {
    name: "Ride confirmed screen, upper right",
    nodeId: "1:659",
    src: "/assets/ride-confirmed.png",
    left: 1023,
    top: -187,
    width: 249,
    height: 539,
  },
  {
    name: "Waiting for ride screen",
    nodeId: "1:660",
    src: "/assets/waiting-for-ride.png",
    left: -59,
    top: -195,
    width: 249,
    height: 539,
  },
  {
    name: "No rides screen",
    nodeId: "1:661",
    src: "/assets/no-rides.png",
    left: 1018,
    top: 376,
    width: 249,
    height: 539,
  },
]

function placementStyle(screen: ScreenPlacement): CSSProperties {
  return {
    height: `${(screen.height / galleryHeight) * 100}%`,
    left: `${(screen.left / galleryWidth) * 100}%`,
    top: `${(screen.top / galleryHeight) * 100}%`,
    width: `${(screen.width / galleryWidth) * 100}%`,
  }
}

/** Displays the ten exported Cabzo app screens with Figma-authored crops. */
export default function CabzoScreenGallery() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  const selectedScreen = selectedIndex === null ? null : screenPlacements[selectedIndex]
  const zoom = useLightboxZoom(selectedIndex !== null)

  const move = (direction: -1 | 1) => {
    zoom.reset()
    setSelectedIndex((index) => index === null ? null : (index + direction + screenPlacements.length) % screenPlacements.length)
  }

  useEffect(() => {
    if (!selectedScreen) return

    const previousOverflow = document.body.style.overflow
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelectedIndex(null)
    }

    document.body.style.overflow = "hidden"
    window.addEventListener("keydown", closeOnEscape)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener("keydown", closeOnEscape)
    }
  }, [selectedScreen])

  return (
    <>
      <section
        aria-label="Cabzo mobile application screen gallery"
        className="screen-gallery-section"
        data-node-id="12:161"
      >
        <div className="screen-gallery" data-node-id="1:651">
          {screenPlacements.map((screen, index) => (
            <button
              aria-label={`View ${screen.name} in detail`}
              className="screen-placement"
              data-node-id={screen.nodeId}
              key={screen.nodeId}
              onClick={() => setSelectedIndex(index)}
              style={placementStyle(screen)}
              type="button"
            >
              <img alt={screen.name} draggable="false" src={screen.src} />
            </button>
          ))}
        </div>
      </section>

      {selectedScreen && createPortal(
        <div
          aria-label={`${selectedScreen.name} detailed view`}
          aria-modal="true"
          className="gallery-lightbox"
          onClick={() => setSelectedIndex(null)}
          onKeyDown={(event) => {
            if (event.key === "ArrowLeft") { event.preventDefault(); move(-1) }
            if (event.key === "ArrowRight") { event.preventDefault(); move(1) }
          }}
          role="dialog"
        >
          <figure className="gallery-lightbox-figure" onClick={(event) => event.stopPropagation()}>
            <img alt={selectedScreen.name} src={selectedScreen.src} style={zoom.mediaStyle} {...zoom.mediaHandlers} />
            <figcaption aria-live="polite">{selectedScreen.name}</figcaption>
            <button aria-label="Previous screen" className="gallery-lightbox-nav gallery-lightbox-nav--previous" onClick={() => move(-1)} type="button">
              <svg aria-hidden="true" viewBox="0 0 24 24"><path d="m15 18-6-6 6-6" /></svg>
            </button>
            <button aria-label="Next screen" className="gallery-lightbox-nav gallery-lightbox-nav--next" onClick={() => move(1)} type="button">
              <svg aria-hidden="true" viewBox="0 0 24 24"><path d="m9 18 6-6-6-6" /></svg>
            </button>
            <LightboxZoomControls {...zoom} />
            <button
              aria-label="Close detailed view"
              className="gallery-lightbox-close"
              onClick={() => setSelectedIndex(null)}
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
