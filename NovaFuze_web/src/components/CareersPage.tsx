import { CareersHeroSection } from "./CareersHeroSection"
import { TestimonialsSection } from "./TestimonialsSection"
import { CompanyCultureSection } from "./CompanyCultureSection"
// Newsletter section removed

export function CareersPage() {
  return (
    <>
      <CareersHeroSection />
      <CompanyCultureSection />
      <TestimonialsSection />
    </>
  )
}