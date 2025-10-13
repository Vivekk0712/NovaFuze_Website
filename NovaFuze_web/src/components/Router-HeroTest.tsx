import { useState, useEffect } from "react"
import { HeroSection } from "./HeroSection"

export type Route = "home" | string

interface RouterProps {
  onRouteChange?: (route: Route) => void
}

export function RouterHeroTest({ onRouteChange }: RouterProps) {
  const [currentRoute, setCurrentRoute] = useState<Route>("home")

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1) as Route
      const route = hash || "home"
      setCurrentRoute(route)
      onRouteChange?.(route)
    }

    handleHashChange()
    window.addEventListener("hashchange", handleHashChange)
    
    return () => {
      window.removeEventListener("hashchange", handleHashChange)
    }
  }, [onRouteChange])

  // Test if HeroSection is causing the issue
  return (
    <div>
      <HeroSection />
      <div className="py-12 text-center bg-background">
        <p className="text-muted-foreground">
          Testing HeroSection component for performance issues
        </p>
      </div>
    </div>
  )
}

export const navigateTo = (route: Route) => {
  window.location.hash = route === "home" ? "" : route
}

export const getCurrentRoute = (): Route => {
  const hash = window.location.hash.slice(1) as Route
  return hash || "home"
}