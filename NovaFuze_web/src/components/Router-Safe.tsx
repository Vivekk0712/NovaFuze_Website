import { useState, useEffect, Suspense, lazy, useCallback } from "react"

// Test with direct imports first to see if lazy loading is the issue
import { HeroSection } from "./HeroSection"

// Lazy load other components
const ServicesSection = lazy(() => import("./ServicesSection").then(module => ({ default: module.ServicesSection })))
const ProductsSection = lazy(() => import("./ProductsSection").then(module => ({ default: module.ProductsSection })))
const TestimonialsSection = lazy(() => import("./TestimonialsSection").then(module => ({ default: module.TestimonialsSection })))
const BlogSection = lazy(() => import("./BlogSection").then(module => ({ default: module.BlogSection })))

const AboutPage = lazy(() => import("./AboutPage").then(module => ({ default: module.AboutPage })))
const ServicesPage = lazy(() => import("./ServicesPage").then(module => ({ default: module.ServicesPage })))
const ProductsPage = lazy(() => import("./ProductsPage").then(module => ({ default: module.ProductsPage })))
const BlogPage = lazy(() => import("./BlogPage").then(module => ({ default: module.BlogPage })))
const VlogsPage = lazy(() => import("./VlogsPage").then(module => ({ default: module.VlogsPage })))
const CareersPage = lazy(() => import("./CareersPage").then(module => ({ default: module.CareersPage })))
const ContactPage = lazy(() => import("./ContactPage").then(module => ({ default: module.ContactPage })))
const PortfolioPage = lazy(() => import("./PortfolioPage").then(module => ({ default: module.PortfolioPage })))

const WebDevelopmentServicePage = lazy(() => import("./WebDevelopmentServicePage").then(module => ({ default: module.WebDevelopmentServicePage })))
const BlogDetailPage = lazy(() => import("./BlogDetailPage").then(module => ({ default: module.BlogDetailPage })))
const VlogDetailPage = lazy(() => import("./VlogDetailPage").then(module => ({ default: module.VlogDetailPage })))
const ProductDetailPage = lazy(() => import("./ProductDetailPage").then(module => ({ default: module.ProductDetailPage })))

const PrivacyPolicyPage = lazy(() => import("./PrivacyPolicyPage").then(module => ({ default: module.PrivacyPolicyPage })))
const TermsOfServicePage = lazy(() => import("./TermsOfServicePage").then(module => ({ default: module.TermsOfServicePage })))
const RefundPolicyPage = lazy(() => import("./RefundPolicyPage").then(module => ({ default: module.RefundPolicyPage })))

const SimpleAdminLogin = lazy(() => import("./SimpleAdminLogin").then(module => ({ default: module.SimpleAdminLogin })))

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
  | "services/web-development"
  | "services/mobile-development"
  | "services/ui-ux-design"
  | "services/digital-marketing"
  | "services/cloud-solutions"
  | "services/consulting"
  | "blog/detail"
  | "vlogs/detail"
  | "products/detail"
  | "legal/privacy"
  | "legal/terms"
  | "legal/refund"
  | "admin/login"
  | "admin/dashboard"
  | string

interface RouterProps {
  onRouteChange?: (route: Route) => void
}

const RouteLoading = () => (
  <div className="min-h-[50vh] flex items-center justify-center">
    <div className="flex flex-col items-center gap-4">
      <div className="flex items-center gap-2">
        <div className="w-4 h-4 bg-primary rounded-full animate-pulse"></div>
        <div className="w-4 h-4 bg-primary rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
        <div className="w-4 h-4 bg-primary rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
      </div>
      <p className="text-sm text-muted-foreground">Loading page...</p>
    </div>
  </div>
)

export function RouterSafe({ onRouteChange }: RouterProps) {
  const [currentRoute, setCurrentRoute] = useState<Route>("home")

  const handleRouteChange = useCallback((newRoute: Route) => {
    setCurrentRoute(newRoute)
    onRouteChange?.(newRoute)
  }, [onRouteChange])

  useEffect(() => {
    let isMounted = true

    const handleHashChange = () => {
      if (!isMounted) return
      
      const hash = window.location.hash.slice(1) as Route
      const route = hash || "home"
      handleRouteChange(route)
    }

    // Set initial route
    const initialHash = window.location.hash.slice(1) as Route
    const initialRoute = initialHash || "home"
    handleRouteChange(initialRoute)

    window.addEventListener("hashchange", handleHashChange)
    
    return () => {
      isMounted = false
      window.removeEventListener("hashchange", handleHashChange)
    }
  }, [handleRouteChange])

  const renderPage = () => {
    try {
      switch (currentRoute) {
        case "home":
          return (
            <>
              <HeroSection />
              <Suspense fallback={<RouteLoading />}>
                <ServicesSection />
              </Suspense>
              <Suspense fallback={<RouteLoading />}>
                <ProductsSection />
              </Suspense>
              <Suspense fallback={<RouteLoading />}>
                <TestimonialsSection />
              </Suspense>
              <Suspense fallback={<RouteLoading />}>
                <BlogSection />
              </Suspense>
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
            <Suspense fallback={<RouteLoading />}>
              <PortfolioPage />
            </Suspense>
          )
        
        case "contact":
          return (
            <Suspense fallback={<RouteLoading />}>
              <ContactPage />
            </Suspense>
          )
        
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
        
        case "admin/login":
        case "admin/dashboard":
          return (
            <Suspense fallback={<RouteLoading />}>
              <SimpleAdminLogin />
            </Suspense>
          )
        
        default:
          // Handle dynamic routes
          if (currentRoute.startsWith("blog/") && currentRoute !== "blog/detail") {
            return (
              <Suspense fallback={<RouteLoading />}>
                <BlogDetailPage />
              </Suspense>
            )
          }
          
          if (currentRoute.startsWith("vlogs/") && currentRoute !== "vlogs/detail") {
            return (
              <Suspense fallback={<RouteLoading />}>
                <VlogDetailPage />
              </Suspense>
            )
          }
          
          if (currentRoute.startsWith("products/") && currentRoute !== "products/detail") {
            return (
              <Suspense fallback={<RouteLoading />}>
                <ProductDetailPage />
              </Suspense>
            )
          }
          
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
    } catch (error) {
      console.error('Router error:', error)
      return (
        <div className="py-24 bg-background">
          <div className="container mx-auto px-4 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-red-500 mb-4">
              Error Loading Page
            </h1>
            <p className="text-muted-foreground mb-8">
              Something went wrong. Please try again.
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

  return renderPage()
}

export const navigateTo = (route: Route) => {
  window.location.hash = route === "home" ? "" : route
}

export const getCurrentRoute = (): Route => {
  const hash = window.location.hash.slice(1) as Route
  return hash || "home"
}