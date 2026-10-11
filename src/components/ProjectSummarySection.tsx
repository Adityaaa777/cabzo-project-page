type ProjectTypeGroupProps = {
  items: string[]
}

function ProjectTypeGroup({ items }: ProjectTypeGroupProps) {
  return (
    <section className="project-type-group">
      <h3>PROJECT TYPE :</h3>
      <div className="project-type-list">
        {items.map((item, index) => (
          <span className="project-type-pill" key={`${item}-${index}`}>
            {item}
          </span>
        ))}
      </div>
    </section>
  )
}

/** Project summary from Figma node 5:159. */
export function ProjectSummarySection() {
  return (
    <section
      className="project-summary"
      aria-labelledby="project-summary-title"
      data-node-id="5:159"
    >
      <h1 id="project-summary-title">Cabzo Ride Booking App UI</h1>

      <section
        className="project-introduction"
        aria-labelledby="introduction-title"
      >
        <h2 id="introduction-title">INTRODUCTION :</h2>
        <div className="project-copy">
          <p>
            Cabzo was designed as a modern urban mobility platform built to{" "}
            <br className="desktop-break" />
            simplify everyday commuting. <br className="desktop-break" />
            The focus of this product was to create a fast, visually clean, and{" "}
            <br className="desktop-break" />
            highly intuitive ride-booking experience for daily users who{" "}
            <br className="desktop-break" />
            prioritize speed, convenience, and real-time visibility.
          </p>

          <p>
            The platform was designed around the idea that booking a ride{" "}
            <br className="desktop-break" />
            should feel effortless — from location detection to ride{" "}
            <br className="desktop-break" />
            confirmation, every interaction was optimized to reduce friction.
          </p>

          <p>
            Cabzo combines a rider app, driver interface, and operational{" "}
            <br className="desktop-break" />
            backend into a connected mobility ecosystem.
          </p>
        </div>
      </section>

      <aside className="project-metadata" aria-label="Project metadata">
        <ProjectTypeGroup items={["Mobile App Design"]} />
        <ProjectTypeGroup items={["Mobile App Design", "Mobile App Design"]} />
      </aside>
    </section>
  )
}
