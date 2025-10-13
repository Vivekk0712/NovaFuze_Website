import { ContactHeroSection } from "./ContactHeroSection"
import { ContactInfoSection } from "./ContactInfoSection"
import { ContactMapSection } from "./ContactMapSection"
import { ContactFormSection } from "./ContactFormSection"
import { ContactSocialSection } from "./ContactSocialSection"
// Newsletter section removed

export function ContactPage() {
  return (
    <>
      <ContactHeroSection />
      <ContactInfoSection />
      <ContactMapSection />
      <ContactFormSection />
      <ContactSocialSection />

    </>
  )
}