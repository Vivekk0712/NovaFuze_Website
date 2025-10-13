import { BlogHeroSection } from "./BlogHeroSection"
import { BlogListingSection } from "./BlogListingSection"
// Newsletter section removed

export function BlogPage() {
  return (
    <>
      <BlogHeroSection />
      <BlogListingSection featured={true} />

    </>
  )
}