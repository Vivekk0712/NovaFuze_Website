import { AboutHeroSection } from "./AboutHeroSection"
import { MissionVisionSection } from "./MissionVisionSection"
import { WhyChooseUsSection } from "./WhyChooseUsSection"
import { TeamSection } from "./TeamSection"
import { CompanyCultureSection } from "./CompanyCultureSection"
import { TestimonialsSection } from "./TestimonialsSection"
// Newsletter section removed
// Timeline section removed

export function AboutPage() {
  return (
    <>
      <AboutHeroSection />
      <MissionVisionSection />
      <WhyChooseUsSection />
      <TeamSection />
      <CompanyCultureSection />
      <TestimonialsSection />
    </>
  )
}