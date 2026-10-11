import { useRef } from "react"
import "./related-projects-section.css"

const projects = [
  {
    title: "Nzcu",
    description:
      "Book cars, scooters, e-rickshaws, and\nloaders—all from one platform.",
    image: "/assets/nzcu.png",
    imageAlt: "Nzcu mobile application project cover",
  },
  {
    title: "Corezap",
    description:
      "Manage rides and fleet operations from one\nintelligent platform.",
    image: "/assets/corezap.png",
    imageAlt: "Corezap fleet platform project cover",
  },
  {
    title: "Safe 2 Destination",
    description:
      "Book safe daily or monthly rides with a\nseamless travel experience.",
    image: "/assets/safe-2-destination.png",
    imageAlt: "Safe 2 Destination ride booking project cover",
  },
]

/** Standalone related project carousel from Figma node 67:3793. */
export function RelatedProjectsSection() {
  const track = useRef<HTMLDivElement>(null)
  const move = (direction: -1 | 1) => {
    const element = track.current
    if (!element) return
    const card = element.querySelector<HTMLElement>(".cabzo-related-card")
    element.scrollBy({ left: direction * (card?.offsetWidth ?? 400) + direction * 32, behavior: "smooth" })
  }

  return (
    <section className="cabzo-section-08" id="more-projects" aria-labelledby="cabzo-related-title" data-node-id="67:3793">
      <div className="cabzo-related-content">
        <header className="cabzo-related-header">
          <h2 id="cabzo-related-title">Related Projects</h2>
          <nav className="cabzo-related-controls" aria-label="Related project carousel">
            <button type="button" onClick={() => move(-1)} aria-label="Previous projects"><img src="/assets/arrow-left.svg" alt="" /></button>
            <button type="button" onClick={() => move(1)} aria-label="Next projects"><img src="/assets/arrow-left.svg" alt="" /></button>
          </nav>
        </header>
        <div className="cabzo-related-track" ref={track}>
          {projects.map((project) => (
            <article className="cabzo-related-card" key={project.title}>
              <img className="cabzo-related-cover" src={project.image} alt={`${project.title} project cover`} />
              <div className="cabzo-related-card-content">
                <div className="cabzo-related-meta">
                  <span>Mobile App Design</span>
                  <a className="cabzo-related-card-arrow" href="#more-projects" aria-label={`Open ${project.title} project`}>
                    <img src="/assets/section-08-related/project-arrow-alt.svg" alt="" />
                  </a>
                </div>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
