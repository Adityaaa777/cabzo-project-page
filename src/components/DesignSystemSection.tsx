const colors = [
  { hex: "#FEBD01", label: "FEBD01" },
  { hex: "#1A2B4C", label: "1A2B4C" },
  { hex: "#242731", label: "242731" },
  { hex: "#E0E4E7", label: "E0E4E7" },
]

const typeRows = [
  {
    sample: "Your destination is just\none ride away.",
    role: "Heading",
    size: "36px",
    className: "ds-heading-row",
  },
  {
    sample: "Your destination is just one\nride away.",
    role: "Subheading",
    size: "24px",
    className: "ds-subheading-row",
  },
  {
    sample: "Your destination is just one ride away.",
    role: "Body",
    size: "16px",
    className: "ds-body-row",
  },
  {
    sample: "Your destination is just one ride away.",
    role: "Body light",
    size: "16px",
    className: "ds-body-light-row",
  },
  {
    sample: "Your destination is just one ride away.",
    role: "Body Bold",
    size: "16px",
    className: "ds-body-bold-row",
  },
]

/** Cabzo color and typography specification from Figma node 18:167. */
export function DesignSystemSection() {
  return (
    <section className="design-system-frame" data-node-id="18:167">
      <div
        aria-label="Cabzo design system specifications"
        className="design-system-card"
      >
        <section className="ds-colors" aria-labelledby="ds-colors-title">
          <h2 id="ds-colors-title">Colors</h2>
          <div className="ds-title-rule" />
          <div className="ds-swatch-list">
            {colors.map((color) => (
              <figure className="ds-swatch" key={color.hex}>
                <div
                  className="ds-swatch-color"
                  style={{ backgroundColor: color.hex }}
                />
                <figcaption>{color.label}</figcaption>
              </figure>
            ))}
          </div>
        </section>

        <section
          className="ds-typography"
          aria-labelledby="ds-typography-title"
        >
          <h2 id="ds-typography-title">Typography</h2>
          <div className="ds-title-rule" />

          <div className="ds-type-card">
            <header className="ds-type-header">
              <strong>Poppins</strong>
              <div className="ds-alphabet" aria-label="Poppins character set">
                <span>ABCDEFGHIJKLMNOPQRSTUVWXYZ</span>
                <span>abcdefghijklmnopqrstuvwxyz</span>
              </div>
            </header>
            <div className="ds-divider" />
            <div className="ds-type-table">
              {typeRows.map((row) => (
                <div className={`ds-type-row ${row.className}`} key={row.role}>
                  <p>{row.sample}</p>
                  <span>{row.role}</span>
                  <span>{row.size}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </section>
  )
}
