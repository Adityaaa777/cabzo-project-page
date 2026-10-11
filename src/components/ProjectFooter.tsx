import "./project-footer.css"

const icons = "/assets/section-09-footer"

/** Closing project footer from Figma node 65:1750. */
export function ProjectFooter() {
  return (
    <footer id="contact" className="cabzo-section-09" aria-labelledby="cabzo-footer-title" data-node-id="65:1750">
      <div className="cabzo-footer-content">
        <h2 id="cabzo-footer-title">Thanks for Exploring <span>This Project</span></h2>
        <div className="cabzo-footer-message">
          <p>I hope you enjoyed the process as much as I enjoyed creating it.</p>
          <p>Let’s build something impactful together.</p>
        </div>
        <div className="cabzo-footer-actions">
          <a className="cabzo-footer-contact" href="mailto:shrutipandey040307@gmail.com">Contact Me <img src={`${icons}/send.svg`} alt="" /></a>
          <a className="cabzo-footer-projects" href="#related-heading">Explore More Projects <img src={`${icons}/arrow-right.svg`} alt="" /></a>
        </div>
        <div className="cabzo-footer-links" aria-label="Contact options">
          <a href="mailto:shrutipandey040307@gmail.com"><img src={`${icons}/email.svg`} alt="" />Email</a>
          <a href="https://www.linkedin.com/in/shruti-pandey-0a7715243/"><img src={`${icons}/linkedin.svg`} alt="" />LinkedIn</a>
          <a href="tel:"><img src={`${icons}/phone.svg`} alt="" />Phone no.</a>
        </div>
      </div>
      <div className="cabzo-footer-copyright">©&nbsp; 2026, Shruti</div>
    </footer>
  )
}
