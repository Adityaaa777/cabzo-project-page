import type { CSSProperties } from "react"
import { DetailImage } from "./DetailImage"

type ShowcaseScreen = {
  alt: string
  className: string
  src: string
}

type DriverGalleryScreen = {
  alt: string
  height: number
  src: string
  x: number
  y: number
}

const showcaseScreens: ShowcaseScreen[] = [
  { alt: "Cabzo user app onboarding screen", className: "showcase-screen--user-onboarding", src: "/assets/user-onboarding.png" },
  { alt: "Cabzo user app home screen", className: "showcase-screen--user-home", src: "/assets/user-home.png" },
  { alt: "Cabzo driver app onboarding screen", className: "showcase-screen--driver-onboarding", src: "/assets/driver-onboarding.png" },
  { alt: "Cabzo driver app dashboard", className: "showcase-screen--driver-dashboard", src: "/assets/driver-dashboard.png" },
]

const driverGalleryScreens: DriverGalleryScreen[] = [
  { src: "/assets/driver-signup.png", alt: "Cabzo driver signup", x: -59, y: -201, height: 539 },
  { src: "/assets/driver-registration.png", alt: "Driver vehicle registration", x: -59, y: 362, height: 539 },
  { src: "/assets/driver-arriving-client.png", alt: "Driver arriving at client", x: 214, y: -246, height: 539 },
  { src: "/assets/driver-request.png", alt: "Incoming ride request", x: 214, y: 317, height: 539 },
  { src: "/assets/driver-ride-history.png", alt: "Driver ride history", x: 487, y: -110, height: 573 },
  { src: "/assets/driver-documents.png", alt: "Driver documents", x: 487, y: 487, height: 539 },
  { src: "/assets/driver-registration.png", alt: "Driver vehicle preference", x: 760, y: -246, height: 539 },
  { src: "/assets/driver-earnings.png", alt: "Driver earnings report", x: 760, y: 317, height: 557 },
  { src: "/assets/driver-request.png", alt: "Incoming ride request timer", x: 1033, y: -187, height: 539 },
  { src: "/assets/driver-signup.png", alt: "Join Cabzo signup", x: 1033, y: 376, height: 539 },
]

const showcaseGallery = showcaseScreens.map(({ alt, src }) => ({ alt, src }))
const driverGallery = driverGalleryScreens.map(({ alt, src }) => ({ alt, src }))

/** Figma nodes 18:163 and 18:165, combined as consecutive showcase frames. */
export function AppShowcaseSection() {
  return (
    <section aria-label="Cabzo user and driver applications" className="app-showcase-section">
      <div className="showcase-frame" data-node-id="18:163">
        <div className="showcase-panel" data-node-id="1:662">
          <header className="showcase-heading showcase-heading--user">
            <h2>User App</h2>
            <p>Onboarding &amp; Home Experience</p>
          </header>

          <header className="showcase-heading showcase-heading--driver">
            <h2>Driver App</h2>
            <p>Onboarding &amp; Home Dashboard</p>
          </header>

          {showcaseScreens.map((screen, index) => (
            <DetailImage
              alt={screen.alt}
              className={`showcase-screen ${screen.className}`}
              draggable="false"
              gallery={showcaseGallery}
              galleryIndex={index}
              key={screen.src}
              src={screen.src}
            />
          ))}
        </div>
      </div>

      <div className="driver-gallery-frame" data-node-id="18:165">
        <div aria-label="Cabzo driver application screens" className="driver-gallery-panel" data-node-id="1:674">
          {driverGalleryScreens.map((screen, index) => (
            <DetailImage
              alt={screen.alt}
              className="driver-gallery-screen"
              draggable="false"
              gallery={driverGallery}
              galleryIndex={index}
              key={`${screen.src}-${index}`}
              src={screen.src}
              style={{
                "--gallery-screen-x": `${screen.x / 14.4}cqw`,
                "--gallery-screen-y": `${screen.y / 14.4}cqw`,
                "--gallery-screen-height": `${screen.height / 14.4}cqw`,
              } as CSSProperties}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
