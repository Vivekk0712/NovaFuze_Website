import { Header } from "./components/Header"
import { Router } from "./components/Router"
import { Footer } from "./components/Footer" 
import { SupportWidget } from "./components/SupportWidget"
import MCPToggle from "./components/MCPToggle"
import { ThemeProvider } from "./components/ThemeProvider"
import { Toaster } from "./components/ui/sonner"
import { ErrorBoundary } from "./components/ErrorBoundary"
import { useAuth } from "./hooks/useAuth"
import LoginPage from "./pages/LoginPage"

export default function App() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <ThemeProvider defaultTheme="light" storageKey="novafuze-tech-ui-theme">
        <div className="min-h-screen bg-background flex items-center justify-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </ThemeProvider>
    );
  }

  if (!user) {
    return (
      <ThemeProvider defaultTheme="light" storageKey="novafuze-tech-ui-theme">
        <ErrorBoundary>
          <LoginPage />
        </ErrorBoundary>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider defaultTheme="light" storageKey="novafuze-tech-ui-theme">
      <ErrorBoundary>
        <div className="min-h-screen bg-background">
          <Header />
          <main>
            <ErrorBoundary>
              <Router />
            </ErrorBoundary>
          </main>
          <Footer />
          <SupportWidget />
          <MCPToggle user={user} />
          <Toaster />
        </div>
      </ErrorBoundary>
    </ThemeProvider>
  )
}