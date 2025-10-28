import { useState } from "react"
import { Button } from "./ui/button"
import { Menu, X } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle, SheetDescription, SheetClose } from "./ui/sheet"
import { ThemeToggle } from "./ThemeToggle"
import ProfileDropdown from "./ProfileDropdown"
import { useAuth } from "../hooks/useAuth"

import novaFuzeLogo from '../assets/b8120387b6ec249e0e1c5e71a9f6e337f9f42039.png';

export function Header() {
  const { user, signOut } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  
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

            {user ? (
              // Logged in: Show Contact, Get Started, and Profile
              <>
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
                <ProfileDropdown user={user} onSignOut={signOut} />
              </>
            ) : (
              // Not logged in: Show Sign In / Sign Up
              <>
                <Button variant="outline" size="sm" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground font-semibold" asChild>
                  <a href="#login">Sign In</a>
                </Button>
                <Button 
                  size="sm" 
                  className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold px-6 py-2 shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105" 
                  asChild
                >
                  <a href="#signup">Sign Up</a>
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="sm" aria-label="Open navigation menu">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[350px]">
              <SheetHeader className="text-left mb-6">
                <div className="flex items-center justify-between">
                  <SheetTitle className="text-xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                    Menu
                  </SheetTitle>
                  <SheetClose asChild>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <X className="h-4 w-4" />
                    </Button>
                  </SheetClose>
                </div>
                <SheetDescription className="text-xs">
                  Navigate through NovaFuze-Tech
                </SheetDescription>
              </SheetHeader>
              
              <div className="flex flex-col space-y-1">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="px-4 py-3 text-base font-medium text-foreground hover:bg-primary/10 hover:text-primary rounded-lg transition-all duration-200 flex items-center justify-between group"
                  >
                    <span>{item.name}</span>
                    <span className="text-primary opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                  </a>
                ))}
                
                <div className="border-t my-4"></div>
                
                <div className="flex items-center justify-between px-4 py-2">
                  <span className="text-sm font-medium text-muted-foreground">Theme</span>
                  <ThemeToggle />
                </div>
                
                <div className="border-t my-4"></div>
                
                <div className="flex flex-col space-y-2 px-2">
                  {user ? (
                    // Logged in: Show Contact, Get Started, and Profile
                    <>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="w-full justify-start"
                        asChild
                      >
                        <a href={headerData.buttons.contact.href} onClick={() => setIsOpen(false)}>
                          {headerData.buttons.contact.text}
                        </a>
                      </Button>
                      <Button 
                        size="sm" 
                        className="w-full justify-start bg-primary hover:bg-primary/90"
                        asChild
                      >
                        <a href={headerData.buttons.cta.href} onClick={() => setIsOpen(false)}>
                          {headerData.buttons.cta.text}
                        </a>
                      </Button>
                      <div className="pt-2">
                        <ProfileDropdown user={user} onSignOut={signOut} />
                      </div>
                    </>
                  ) : (
                    // Not logged in: Show Sign In / Sign Up
                    <>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="w-full justify-start"
                        asChild
                      >
                        <a href="#login" onClick={() => setIsOpen(false)}>
                          Sign In
                        </a>
                      </Button>
                      <Button 
                        size="sm" 
                        className="w-full justify-start bg-primary hover:bg-primary/90"
                        asChild
                      >
                        <a href="#signup" onClick={() => setIsOpen(false)}>
                          Sign Up
                        </a>
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}