import { useRelatedCarousel } from "./useRelatedCarousel"
import "./related-projects-section.css"

const projects = [
  {
    title: "Nzcu",
    description: "Book cars, scooters, e-rickshaws, and loaders—all from one platform.",
    category: "Mobile App Design",
    image: "/assets/related-covers/nzcu-cover.webp",
    href: "https://adityaaa777.github.io/nzcu-project-page/",
  },
  {
    title: "Safe 2 Destination",
    description: "Book safe daily or monthly rides with a seamless travel experience.",
    category: "Mobile App Design",
    image: "/assets/related-covers/safe-2-destination-cover.webp",
    href: "https://adityaaa777.github.io/safe2destination-project-page/",
  },
  {
    title: "Attach App",
    description: "Connect with caring listeners anytime, anywhere in a safe, supportive space.",
    category: "Mobile App Design",
    image: "/assets/related-covers/attach-app-cover.webp",
    href: "https://adityaaa777.github.io/attach-app-project-page/",
  },
  {
    title: "Attach Website",
    description: "Explore a welcoming space for open conversations and support.",
    category: "Web Design",
    image: "/assets/related-covers/attach-website-cover.webp",
    href: "https://adityaaa777.github.io/attach-website-project-page/",
  },
  {
    title: "Cyrus 24",
    description: "Tap. Ride. Relax. A taxi service designed for simple, comfortable rides.",
    category: "Mobile App Design",
    image: "/assets/related-covers/cyrus-24-cover.webp",
    href: "https://adityaaa777.github.io/cyrus-24-project-page/",
  },
]

/** Standalone related project carousel from Figma node 67:3793. */
export function RelatedProjectsSection() {
  const { track, move } = useRelatedCarousel()

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
            <div className="cabzo-related-card" key={project.title}>
              <a className="cabzo-related-card-main" href={project.href} aria-label={`View ${project.title} project`}>
                <img className="cabzo-related-cover" src={project.image} alt={`${project.title} project cover`} />
                <div className="cabzo-related-card-content">
                  <div className="cabzo-related-meta">
                    <span>{project.category}</span>
                  </div>
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                </div>
              </a>
              <a className="cabzo-related-card-arrow" href={project.href} target="_blank" rel="noopener noreferrer" aria-label={`Open ${project.title} project in a new tab`}>
                <img src="/assets/section-08-related/project-arrow-alt.svg" alt="" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
