import { useState, useEffect, Suspense, lazy } from "react"
import { allowFirebase, blockFirebase, isAdminRouteActive } from "../firebase/initialization-blocker"

// Homepage components - load immediately for faster initial render
import { HeroSection } from "./HeroSection"
import { ServicesSection } from "./ServicesSection"
import { ProductsSection } from "./ProductsSection"
import { PortfolioSection } from "./PortfolioSection"
import { TestimonialsSection } from "./TestimonialsSection"
import { BlogSection } from "./BlogSection"
import { NewsletterSection } from "./NewsletterSection"

// Lazy load other components to improve initial load time
const AboutPage = lazy(() => import("./AboutPage").then(module => ({ default: module.AboutPage })))
const ServicesPage = lazy(() => import("./ServicesPage").then(module => ({ default: module.ServicesPage })))
const ProductsPage = lazy(() => import("./ProductsPage").then(module => ({ default: module.ProductsPage })))
const BlogPage = lazy(() => import("./BlogPage").then(module => ({ default: module.BlogPage })))
const VlogsPage = lazy(() => import("./VlogsPage").then(module => ({ default: module.VlogsPage })))
const CareersPage = lazy(() => import("./CareersPage").then(module => ({ default: module.CareersPage })))
const ContactPage = lazy(() => import("./ContactPage").then(module => ({ default: module.ContactPage })))

// Individual service and detail pages
const WebDevelopmentServicePage = lazy(() => import("./WebDevelopmentServicePage").then(module => ({ default: module.WebDevelopmentServicePage })))
const BlogDetailPage = lazy(() => import("./BlogDetailPage").then(module => ({ default: module.BlogDetailPage })))
const VlogDetailPage = lazy(() => import("./VlogDetailPage").then(module => ({ default: module.VlogDetailPage })))
const ProductDetailPage = lazy(() => import("./ProductDetailPage").then(module => ({ default: module.ProductDetailPage })))

// Legal pages
const PrivacyPolicyPage = lazy(() => import("./PrivacyPolicyPage").then(module => ({ default: module.PrivacyPolicyPage })))
const TermsOfServicePage = lazy(() => import("./TermsOfServicePage").then(module => ({ default: module.TermsOfServicePage })))
const RefundPolicyPage = lazy(() => import("./RefundPolicyPage").then(module => ({ default: module.RefundPolicyPage })))

// Admin pages
const AdminAuthWrapper = lazy(() => import("./admin/AdminAuthWrapper").then(module => ({ default: module.AdminAuthWrapper })))

export type Route = 
  | "home" 
  | "about-us" 
  | "services" 
  | "products" 
  | "blog" 
  | "vlogs" 
  | "careers"
  | "portfolio"
  | "contact"
  // Service detail pages
  | "services/web-development"
  | "services/mobile-development"
  | "services/ui-ux-design"
  | "services/digital-marketing"
  | "services/cloud-solutions"
  | "services/consulting"
  // Content detail pages
  | "blog/detail"
  | "vlogs/detail"
  | "products/detail"
  // Legal pages
  | "legal/privacy"
  | "legal/terms"
  | "legal/refund"
  // Admin pages
  | "admin/login"
  | "admin/dashboard"

interface RouterProps {
  onRouteChange?: (route: Route) => void
}

// Loading component for lazy-loaded routes
const RouteLoading = () => (
  <div className="min-h-[50vh] flex items-center justify-center">
    <div className="flex items-center gap-2">
      <div className="w-4 h-4 bg-primary rounded-full animate-pulse"></div>
      <div className="w-4 h-4 bg-primary rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
      <div className="w-4 h-4 bg-primary rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
    </div>
  </div>
)

export function Router({ onRouteChange }: RouterProps) {
  const [currentRoute, setCurrentRoute] = useState<Route>("home")
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const handleHashChange = () => {
      setIsLoading(true)
      const hash = window.location.hash.slice(1) as Route
      const route = hash || "home"
      
      // Handle Firebase state based on route
      if (route.startsWith('admin/')) {
        console.log('🔓 Admin route detected - allowing Firebase');
        allowFirebase();
      } else {
        console.log('🚫 Non-admin route - blocking Firebase');
        blockFirebase();
      }
      
      setCurrentRoute(route)
      onRouteChange?.(route)
      
      // Reset loading state after a short delay
      setTimeout(() => setIsLoading(false), 100)
    }

    // Set initial route
    handleHashChange()

    // Listen for hash changes
    window.addEventListener("hashchange", handleHashChange)
    
    return () => {
      window.removeEventListener("hashchange", handleHashChange)
    }
  }, [onRouteChange])

  const renderPage = () => {
    if (isLoading) {
      return <RouteLoading />
    }

    switch (currentRoute) {
      case "home":
        return (
          <>
            <HeroSection />
            <ServicesSection />
            <ProductsSection />
            <PortfolioSection />
            <TestimonialsSection />
            <BlogSection />
            <NewsletterSection />
          </>
        )
      
      case "about-us":
        return (
          <Suspense fallback={<RouteLoading />}>
            <AboutPage />
          </Suspense>
        )
      
      case "services":
        return (
          <Suspense fallback={<RouteLoading />}>
            <ServicesPage />
          </Suspense>
        )
      
      case "services/web-development":
        return (
          <Suspense fallback={<RouteLoading />}>
            <WebDevelopmentServicePage />
          </Suspense>
        )
      
      case "products":
        return (
          <Suspense fallback={<RouteLoading />}>
            <ProductsPage />
          </Suspense>
        )
      
      case "products/detail":
        return (
          <Suspense fallback={<RouteLoading />}>
            <ProductDetailPage />
          </Suspense>
        )
      
      case "blog":
        return (
          <Suspense fallback={<RouteLoading />}>
            <BlogPage />
          </Suspense>
        )
      
      case "blog/detail":
        return (
          <Suspense fallback={<RouteLoading />}>
            <BlogDetailPage />
          </Suspense>
        )
      
      case "vlogs":
        return (
          <Suspense fallback={<RouteLoading />}>
            <VlogsPage />
          </Suspense>
        )
      
      case "vlogs/detail":
        return (
          <Suspense fallback={<RouteLoading />}>
            <VlogDetailPage />
          </Suspense>
        )
      
      case "careers":
        return (
          <Suspense fallback={<RouteLoading />}>
            <CareersPage />
          </Suspense>
        )
      
      case "portfolio":
        return (
          <>
            <div className="py-24 bg-background">
              <div className="container mx-auto px-4 lg:px-8">
                <div className="text-center mb-16">
                  <h1 className="text-4xl md:text-5xl font-bold text-[#4E6BDF] mb-6">
                    Our Portfolio
                  </h1>
                  <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                    Discover our featured projects and success stories
                  </p>
                </div>
              </div>
            </div>
            <PortfolioSection />
            <TestimonialsSection />
            <NewsletterSection />
          </>
        )
      
      case "contact":
        return (
          <Suspense fallback={<RouteLoading />}>
            <ContactPage />
          </Suspense>
        )
      
      // Legal pages
      case "legal/privacy":
        return (
          <Suspense fallback={<RouteLoading />}>
            <PrivacyPolicyPage />
          </Suspense>
        )
      
      case "legal/terms":
        return (
          <Suspense fallback={<RouteLoading />}>
            <TermsOfServicePage />
          </Suspense>
        )
      
      case "legal/refund":
        return (
          <Suspense fallback={<RouteLoading />}>
            <RefundPolicyPage />
          </Suspense>
        )
      
      // Admin pages
      case "admin/login":
      case "admin/dashboard":
        return (
          <Suspense fallback={<RouteLoading />}>
            <AdminAuthWrapper />
          </Suspense>
        )
      
      default:
        return (
          <div className="py-24 bg-background">
            <div className="container mx-auto px-4 lg:px-8 text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-[#4E6BDF] mb-4">
                Page Not Found
              </h1>
              <p className="text-muted-foreground mb-8">
                The page you're looking for doesn't exist.
              </p>
              <a 
                href="#home" 
                className="inline-flex items-center px-6 py-3 bg-[#4E6BDF] text-white rounded-lg hover:bg-[#3D51D3] transition-colors"
              >
                Go Home
              </a>
            </div>
          </div>
        )
    }
  }

  return <>{renderPage()}</>
}

// Navigation helper function
export const navigateTo = (route: Route) => {
  window.location.hash = route === "home" ? "" : route
}

// Get current route helper
export const getCurrentRoute = (): Route => {
  const hash = window.location.hash.slice(1) as Route
  return hash || "home"
}