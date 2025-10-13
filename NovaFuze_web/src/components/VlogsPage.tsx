import { VlogsHeroSection } from "./VlogsHeroSection"
import { VlogsGridSection } from "./VlogsGridSection"
// Newsletter section removed

export function VlogsPage() {
  return (
    <>
      <VlogsHeroSection />
      <VlogsGridSection featured={true} />

    </>
  )
}