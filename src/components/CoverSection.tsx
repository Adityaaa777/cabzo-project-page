import type { CSSProperties } from "react"
import { DetailImage } from "./DetailImage"

const assetPathPrefix = "/assets"
const frameWidth = 1439
const frameHeight = 722

type FrameBox = {
  height: number
  left: number
  top: number
  width: number
}

type CoverShot = {
  alt: string
  box: FrameBox
  image: CSSProperties
  src: string
}

const coverShots: CoverShot[] = [
  {
    alt: "Cabzo rider onboarding screen",
    src: "42f6b.png",
    box: { height: 634, left: 483, top: 44, width: 307 },
    image: {
      height: "143.16%",
      left: "-161.48%",
      top: "-21.56%",
      width: "422.36%",
    },
  },
  {
    alt: "Cabzo ride selection screen",
    src: "b4216.png",
    box: { height: 390, left: 814, top: 424, width: 191 },
    image: {
      height: "145.14%",
      left: "-162.55%",
      top: "-23.37%",
      width: "423.52%",
    },
  },
  {
    alt: "Cabzo rental duration screen",
    src: "af02c.png",
    box: { height: 390, left: 1029, top: 230, width: 194 },
    image: {
      height: "146.14%",
      left: "-160.94%",
      top: "-23.4%",
      width: "420.24%",
    },
  },
  {
    alt: "Cabzo driver onboarding screen",
    src: "b6fa6.png",
    box: { height: 388, left: 814, top: 16, width: 191 },
    image: {
      height: "145.68%",
      left: "-161.65%",
      top: "-23.07%",
      width: "423.76%",
    },
  },
  {
    alt: "Cabzo driver dashboard screen",
    src: "eb5d9.png",
    box: { height: 390, left: 1243, top: 44, width: 193 },
    image: {
      height: "145.25%",
      left: "-160.45%",
      top: "-22.87%",
      width: "419.95%",
    },
  },
  {
    alt: "Cabzo project information screen",
    src: "db5ab.png",
    box: { height: 390, left: 1029, top: -180, width: 190 },
    image: {
      height: "143.82%",
      left: "-160.82%",
      top: "-21.68%",
      width: "420.94%",
    },
  },
  {
    alt: "Cabzo sign-in screen",
    src: "b28ce.png",
    box: { height: 385, left: 1247, top: 454, width: 189 },
    image: {
      height: "143.25%",
      left: "-158.33%",
      top: "-22.79%",
      width: "416.67%",
    },
  },
  {
    alt: "Cabzo map screen",
    src: "d247a.png",
    box: { height: 390, left: 1029, top: 640, width: 190 },
    image: {
      height: "144.43%",
      left: "-161.79%",
      top: "-22.7%",
      width: "422.61%",
    },
  },
]

function asFrameBox(box: FrameBox): CSSProperties {
  return {
    height: `${(box.height / frameHeight) * 100}%`,
    left: `${(box.left / frameWidth) * 100}%`,
    top: `${(box.top / frameHeight) * 100}%`,
    width: `${(box.width / frameWidth) * 100}%`,
  }
}

type CoverNavigationLinkProps = {
  direction: "back" | "next"
  href: string
  label: string
}

function CoverNavigationLink({
  direction,
  href,
  label,
}: CoverNavigationLinkProps) {
  const icon = (
    <img
      alt=""
      aria-hidden="true"
      className={
        direction === "next"
          ? "cover-nav-icon cover-nav-icon--next"
          : "cover-nav-icon"
      }
      src={`${assetPathPrefix}/${
        direction === "back" ? "650df.svg" : "f8b17.svg"
      }`}
    />
  )

  return (
    <a className="cover-nav-link" href={href}>
      {direction === "back" && icon}
      <span>{label}</span>
      {direction === "next" && icon}
    </a>
  )
}

/** Fixed-ratio Cabzo cover from Figma node 1:627. */
export function CoverSection() {
  return (
    <section
      className="cover-frame"
      aria-label="Cabzo project cover"
      data-node-id="1:627"
    >
      <div className="cover-artwork">
        {coverShots.map((shot) => (
          <div
            className="cover-shot"
            key={shot.src}
            style={asFrameBox(shot.box)}
          >
            <DetailImage
              alt={shot.alt}
              className="cover-shot-image"
              src={`${assetPathPrefix}/${shot.src}`}
              style={shot.image}
            />
          </div>
        ))}
      </div>

      <div className="cover-logo" aria-label="Cabzo" role="img">
        <span aria-hidden="true" className="cover-logo-word">
          Cabz
        </span>
        <span aria-hidden="true" className="cover-logo-disc" />
        <span aria-hidden="true" className="cover-logo-highlight" />
        <span aria-hidden="true" className="cover-logo-letter">
          o
        </span>
      </div>

      <p className="cover-tagline">
        Cabzo — where every ride feels first-class.
      </p>

      <nav aria-label="Project navigation" className="cover-navigation">
        <CoverNavigationLink direction="back" href="#back" label="Go Back" />
        <CoverNavigationLink
          direction="next"
          href="#next"
          label="Next Project"
        />
      </nav>
    </section>
  )
}
