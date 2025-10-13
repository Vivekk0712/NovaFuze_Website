import { ServicesHeroSection } from "./ServicesHeroSection"
import { ServicesGridSection } from "./ServicesGridSection"
import { TestimonialsSection } from "./TestimonialsSection"
// Newsletter section removed

export function ServicesPage() {
  return (
    <>
      <ServicesHeroSection />
      <ServicesGridSection />
      <TestimonialsSection />

    </>
  )
}