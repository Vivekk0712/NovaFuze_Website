import { Button } from "./ui/button"
import { Menu } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle, SheetDescription } from "./ui/sheet"
import { ThemeToggle } from "./ThemeToggle"
import ProfileDropdown from "./ProfileDropdown"
import { useAuth } from "../hooks/useAuth"

import novaFuzeLogo from '../assets/b8120387b6ec249e0e1c5e71a9f6e337f9f42039.png';

export function Header() {
  const { user, signOut } = useAuth();
  
  const headerData = {
    logo: {
      text: "NovaFuze-Tech",
      bgGradient: "from-blue-500 to-purple-600"
    },
    navigation: [
      { name: "Home", href: "#home", order: 1 },
      { name: "Services", href: "#services", order: 2 },
      { name: "Products", href: "#products", order: 3 },
      { name: "Portfolio", href: "#portfolio", order: 4 },
      { name: "About", href: "#about-us", order: 5 },
      { name: "Blog", href: "#blog", order: 6 },
      { name: "Contact", href: "#contact", order: 7 }
    ],
    buttons: {
      contact: {
        text: "Contact Us",
        href: "#contact"
      },
      cta: {
        text: "Get Started",
        href: "#contact",
        bgColor: "#4E6BDF",
        hoverColor: "#3E5BCF"
      }
    }
  }
  
  // Sort navigation items by order
  const navigation = headerData.navigation.sort((a, b) => a.order - b.order)

  return (
    <header className="sticky top-0 z-50 w-full border-b-2 border-primary/20 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-lg">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* Enhanced Logo with larger size and better branding */}
          <a href="#home" className="flex items-center space-x-3 hover:opacity-80 transition-opacity group">
            <div className="h-12 w-12 flex items-center justify-center group-hover:scale-105 transition-transform">
              <img src={novaFuzeLogo} alt="NovaFuze-Tech Logo" className="h-10 w-10 object-contain" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-2xl bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">{headerData.logo.text}</span>
              <span className="text-xs text-muted-foreground -mt-1">Innovative Digital Solutions</span>
            </div>
          </a>

          {/* Enhanced Desktop Navigation with better visibility */}
          <nav className="hidden md:flex items-center space-x-1">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="px-4 py-2 rounded-lg text-sm font-semibold text-foreground hover:text-primary hover:bg-primary/10 transition-all duration-200 relative group"
              >
                {item.name}
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-200"></div>
              </a>
            ))}
          </nav>

          {/* Enhanced CTA Buttons with stronger prominence */}
          <div className="hidden md:flex items-center space-x-3">
            <ThemeToggle />

            <Button variant="outline" size="sm" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground font-semibold" asChild>
              <a href={headerData.buttons.contact.href}>{headerData.buttons.contact.text}</a>
            </Button>
            <Button 
              size="sm" 
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold px-6 py-2 shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105" 
              asChild
            >
              <a href={headerData.buttons.cta.href}>{headerData.buttons.cta.text}</a>
            </Button>
            {user && <ProfileDropdown user={user} onSignOut={signOut} />}
          </div>

          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="sm" aria-label="Open navigation menu">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <SheetHeader className="sr-only">
                <SheetTitle>Navigation Menu</SheetTitle>
                <SheetDescription>
                  Navigate through NovaFuze-Tech website sections and get started with our services.
                </SheetDescription>
              </SheetHeader>
              <div className="flex flex-col space-y-4 mt-8">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {item.name}
                  </a>
                ))}
                <div className="flex flex-col space-y-2 pt-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">Theme</span>
                    <ThemeToggle />
                  </div>
                  <Button variant="outline" size="sm" asChild>
                    <a href={headerData.buttons.contact.href}>{headerData.buttons.contact.text}</a>
                  </Button>
                  <Button 
                    size="sm" 
                    style={{ backgroundColor: headerData.buttons.cta.bgColor }}
                    asChild
                  >
                    <a href={headerData.buttons.cta.href}>{headerData.buttons.cta.text}</a>
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}