import { Header } from "./components/Header"
import { Router } from "./components/Router"
import { Footer } from "./components/Footer" 
import MCPToggle from "./components/MCPToggle"
import { ThemeProvider } from "./components/ThemeProvider"
import { Toaster } from "./components/ui/sonner"
import { ErrorBoundary } from "./components/ErrorBoundary"
import { useAuth } from "./hooks/useAuth"
import { useAdminAuth } from "./hooks/useAdminAuth"

export default function App() {
  const { user, loading } = useAuth();
  const { isAdminAuthenticated, admin } = useAdminAuth();

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
          
          {/* ChatBot - Always visible, but locked when not logged in */}
          <MCPToggle user={user} />
          
          {/* Admin Link - Only show when logged in */}
          {user && (
            <div className="fixed bottom-20 left-6 z-50 hidden md:block">
              <a
                href="#admin"
                className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm block shadow-xl hover:shadow-2xl transition-all duration-300"
              >
                Admin Panel
              </a>
            </div>
          )}

          <Toaster />
        </div>
      </ErrorBoundary>
    </ThemeProvider>
  )
}