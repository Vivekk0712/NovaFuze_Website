import { AboutHeroSection } from "./AboutHeroSection"
import { MissionVisionSection } from "./MissionVisionSection"
import { GovernmentRecognitionSection } from "./GovernmentRecognitionSection"
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
      <GovernmentRecognitionSection />
      <WhyChooseUsSection />
      <TeamSection />
      <CompanyCultureSection />
      <TestimonialsSection />
    </>
  )
}