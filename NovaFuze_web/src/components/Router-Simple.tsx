import { useState, useEffect } from "react"

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
  | string

interface RouterProps {
  onRouteChange?: (route: Route) => void
}

// Simple test component to verify router works
const TestHomePage = () => (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#4E6BDF] to-[#333FC2]">
    <div className="text-center text-white">
      <h1 className="text-4xl font-bold mb-4">NovaFuze-Tech</h1>
      <p className="text-xl">Router is working correctly!</p>
      <div className="mt-8">
        <a href="#about-us" className="bg-white text-[#4E6BDF] px-6 py-2 rounded-lg mr-4">About</a>
        <a href="#services" className="bg-white text-[#4E6BDF] px-6 py-2 rounded-lg mr-4">Services</a>
        <a href="#contact" className="bg-white text-[#4E6BDF] px-6 py-2 rounded-lg">Contact</a>
      </div>
    </div>
  </div>
)

const TestPage = ({ title }: { title: string }) => (
  <div className="min-h-screen flex items-center justify-center bg-background">
    <div className="text-center">
      <h1 className="text-4xl font-bold mb-4 text-[#4E6BDF]">{title}</h1>
      <a href="#home" className="bg-[#4E6BDF] text-white px-6 py-2 rounded-lg">Go Home</a>
    </div>
  </div>
)

export function RouterSimple({ onRouteChange }: RouterProps) {
  const [currentRoute, setCurrentRoute] = useState<Route>("home")

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1) as Route
      const route = hash || "home"
      setCurrentRoute(route)
      onRouteChange?.(route)
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
    switch (currentRoute) {
      case "home":
        return <TestHomePage />
      
      case "about-us":
        return <TestPage title="About Us" />
      
      case "services":
        return <TestPage title="Services" />
      
      case "products":
        return <TestPage title="Products" />
      
      case "blog":
        return <TestPage title="Blog" />
      
      case "vlogs":
        return <TestPage title="Vlogs" />
      
      case "careers":
        return <TestPage title="Careers" />
      
      case "portfolio":
        return <TestPage title="Portfolio" />
      
      case "contact":
        return <TestPage title="Contact" />
      
      default:
        return (
          <div className="min-h-screen flex items-center justify-center bg-background">
            <div className="text-center">
              <h1 className="text-4xl font-bold mb-4 text-[#4E6BDF]">Page Not Found</h1>
              <a href="#home" className="bg-[#4E6BDF] text-white px-6 py-2 rounded-lg">Go Home</a>
            </div>
          </div>
        )
    }
  }

  return renderPage()
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