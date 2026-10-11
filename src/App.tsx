import { AppShowcaseSection } from "./components/AppShowcaseSection"
import { CoverSection } from "./components/CoverSection"
import CabzoScreenGallery from "./components/CabzoScreenGallery"
import { DesignSystemSection } from "./components/DesignSystemSection"
import { ProjectFooter } from "./components/ProjectFooter"
import { ProjectSummarySection } from "./components/ProjectSummarySection"
import { RelatedProjectsSection } from "./components/RelatedProjectsSection"

/** Composes the complete Cabzo case study into one continuous page. */
export default function App() {
  return (
    <main className="project-page">
      <CoverSection />
      <ProjectSummarySection />
      <CabzoScreenGallery />
      <AppShowcaseSection />
      <DesignSystemSection />
      <RelatedProjectsSection />
      <ProjectFooter />
    </main>
  )
}
