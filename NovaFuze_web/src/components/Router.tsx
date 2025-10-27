import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { usePageTransition, getTransitionForRoute } from "../hooks/usePageTransition"

// Homepage components - load immediately for faster initial render
import { HeroSection } from "./HeroSection"
import { TrustSection } from "./TrustSection"
import { ServicesSection } from "./ServicesSection"
import { ProductsSection } from "./ProductsSection"
import { TestimonialsSection } from "./TestimonialsSection"
import { BlogSection } from "./BlogSection"

// Direct imports to avoid lazy loading issues
import { AboutPage } from "./AboutPage"
import { ServicesPage } from "./ServicesPage"
import { ProductsPage } from "./ProductsPage"
import { BlogPage } from "./BlogPage"
import { VlogsPage } from "./VlogsPage"
import { CareersPage } from "./CareersPage"
import { ContactPage } from "./ContactPage"
import { PortfolioPage } from "./PortfolioPage"
import { WebDevelopmentServicePage } from "./WebDevelopmentServicePage"
import { BlogDetailPage } from "./BlogDetailPage"
import { VlogDetailPage } from "./VlogDetailPage"
import { ProductDetailPage } from "./ProductDetailPage"
import { PrivacyPolicyPage } from "./PrivacyPolicyPage"
import { TermsOfServicePage } from "./TermsOfServicePage"
import { RefundPolicyPage } from "./RefundPolicyPage"
import AdminPage from "../pages/AdminPage"
import PaymentPage from "./PaymentPage"
import ProfilePage from "./ProfilePage"
import LoginPage from "../pages/LoginPage"
import PhoneLoginPage from "../pages/PhoneLoginPage"
import { useAuth } from "../hooks/useAuth"

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
  | "admin"
  | "payment"
  | "profile"
  | "login"
  | "login-phone"
  | "signup"
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
  // Dynamic routes (handled as strings)
  | string

interface RouterProps {
  onRouteChange?: (route: Route) => void
}

// Protected routes that require authentication
const PROTECTED_ROUTES: Route[] = ["admin", "payment", "profile"];

export function Router({ onRouteChange }: RouterProps) {
  const [currentRoute, setCurrentRoute] = useState<Route>("home")
  const { user } = useAuth()

  const handleRouteChange = useCallback((newRoute: Route) => {
    setCurrentRoute(newRoute)
    onRouteChange?.(newRoute)
    
    // Smooth scroll to top on route change
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [onRouteChange])

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1) as Route
      const route = hash || "home"
      handleRouteChange(route)
    }

    // Set initial route
    const initialHash = window.location.hash.slice(1) as Route
    const initialRoute = initialHash || "home"
    handleRouteChange(initialRoute)

    // Listen for hash changes
    window.addEventListener("hashchange", handleHashChange)
    
    return () => {
      window.removeEventListener("hashchange", handleHashChange)
    }
  }, [handleRouteChange])

  const renderPage = () => {
    // Check if route requires authentication
    if (PROTECTED_ROUTES.includes(currentRoute) && !user) {
      return <LoginPage />
    }

    switch (currentRoute) {
      case "home":
        return (
          <>
            <HeroSection />
            <TrustSection />
            <ServicesSection />
            <ProductsSection />
            <TestimonialsSection />
            <BlogSection />
          </>
        )
      
      case "about-us":
        return <AboutPage />
      
      case "services":
        return <ServicesPage />
      
      case "services/web-development":
        return <WebDevelopmentServicePage />
      
      case "products":
        return <ProductsPage />
      
      case "products/detail":
        return <ProductDetailPage />
      
      case "blog":
        return <BlogPage />
      
      case "blog/detail":
        return <BlogDetailPage />
      
      case "vlogs":
        return <VlogsPage />
      
      case "vlogs/detail":
        return <VlogDetailPage />
      
      case "careers":
        return <CareersPage />
      
      case "portfolio":
        return <PortfolioPage />
      
      case "contact":
        return <ContactPage />
      
      case "admin":
        return <AdminPage />
      
      case "payment":
        return <PaymentPage />
      
      case "profile":
        return <ProfilePage />
      
      case "login":
        return <LoginPage />
      
      case "login-phone":
        return <PhoneLoginPage />
      
      case "signup":
        return <LoginPage />
      
      // Legal pages
      case "legal/privacy":
        return <PrivacyPolicyPage />
      
      case "legal/terms":
        return <TermsOfServicePage />
      
      case "legal/refund":
        return <RefundPolicyPage />
      
      default:
        // Handle dynamic routes like blog/post-slug
        if (currentRoute.startsWith("blog/") && currentRoute !== "blog/detail") {
          return <BlogDetailPage />
        }
        
        // Handle dynamic routes like vlogs/post-slug
        if (currentRoute.startsWith("vlogs/") && currentRoute !== "vlogs/detail") {
          return <VlogDetailPage />
        }
        
        // Handle dynamic routes like products/product-slug
        if (currentRoute.startsWith("products/") && currentRoute !== "products/detail") {
          return <ProductDetailPage />
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
  }

  // Get dynamic transition based on route
  const transitionType = getTransitionForRoute(currentRoute);
  const pageVariants = usePageTransition({ type: transitionType, duration: 0.4 });

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={currentRoute}
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        {renderPage()}
      </motion.div>
    </AnimatePresence>
  )
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