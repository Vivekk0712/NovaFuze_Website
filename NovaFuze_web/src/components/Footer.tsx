import { Button } from "./ui/button"
import { Separator } from "./ui/separator"
import { 
  Mail, 
  Phone, 
  MapPin, 
  Linkedin, 
  Github, 
  Twitter, 
  Instagram,
  ArrowUp
} from "lucide-react"
import novaFuzeLogo from '../assets/b8120387b6ec249e0e1c5e71a9f6e337f9f42039.png';
import startupKarnatakaLogo from '../assets/0bbb9de8f8fad1c4e576e83232da3465b13c1389.png'
import dpiitStartupIndiaLogo from '../assets/b541470d22c77d565be497d99fa25a79dc5b8df5.png'

export function Footer() {
  const services = [
    { name: "Web Development", href: "#services/web-development" },
    { name: "Mobile App Development", href: "#services" },
    { name: "UI/UX Design", href: "#services" },
    { name: "Digital Consulting", href: "#services" }
  ]

  const products = [
    { name: "Nomad-Nest", href: "#products" },
    { name: "LiveEazy", href: "#products" }
  ]

  const company = [
    { name: "About Us", href: "#about-us" },
    { name: "Portfolio", href: "#portfolio" },
    { name: "Blog", href: "#blog" },
    { name: "Careers", href: "#careers" },
    { name: "Contact", href: "#contact" }
  ]

  const legal = [
    { name: "Privacy Policy", href: "#legal/privacy" },
    { name: "Terms of Service", href: "#legal/terms" },
    { name: "Refund Policy", href: "#legal/refund" }
  ]

  const socialLinks = [
    { name: "LinkedIn", icon: Linkedin, href: "https://www.linkedin.com/company/105298593/" },
    { name: "GitHub", icon: Github, href: "https://github.com/novafuze-tech" },
    { name: "Twitter", icon: Twitter, href: "https://x.com/NovaFuze_LLP" },
    { name: "Instagram", icon: Instagram, href: "https://www.instagram.com/vamsikrishna_2410/" }
  ]

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="bg-background border-t">
      <div className="container mx-auto px-4 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-6">
              <div className="h-8 w-8 flex items-center justify-center">
                <img src={novaFuzeLogo} alt="NovaFuze-Tech Logo" className="h-8 w-8 object-contain" />
              </div>
              <span className="font-semibold text-xl">NovaFuze-Tech</span>
            </div>
            
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Building modern digital experiences with AI-powered solutions. 
              We transform ideas into scalable, innovative technology solutions 
              that drive business growth.
            </p>

            <div className="space-y-4">
              <div className="flex items-start gap-3 text-sm">
                <MapPin className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-muted-foreground leading-relaxed">
                  #52, 1st main, 1st cross, Prasanth layout, Whitefield Bangalore, 560066
                </span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Phone className="h-5 w-5 text-primary" />
                <div className="flex flex-col gap-1">
                  <a href="tel:+918074678571" className="text-muted-foreground hover:text-primary transition-colors">
                    +91-8074678571
                  </a>
                  <a href="tel:+919535318620" className="text-muted-foreground hover:text-primary transition-colors">
                    +91-9535318620
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Mail className="h-5 w-5 text-primary" />
                <a href="mailto:support@novafuze.in" className="text-muted-foreground hover:text-primary transition-colors">
                  support@novafuze.in
                </a>
              </div>
            </div>

            <div className="flex items-center gap-4 mt-6">
              {socialLinks.map((social) => {
                const Icon = social.icon
                return (
                  <Button
                    key={social.name}
                    variant="ghost"
                    size="sm"
                    className="h-9 w-9 p-0 hover:bg-accent hover:text-primary"
                    onClick={() => window.open(social.href, '_blank')}
                  >
                    <Icon className="h-4 w-4" />
                    <span className="sr-only">{social.name}</span>
                  </Button>
                )
              })}
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              {services.map((service) => (
                <li key={service.name}>
                  <a 
                    href={service.href}
                    className="text-muted-foreground hover:text-primary transition-colors block py-1 text-sm"
                  >
                    {service.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              {company.map((item) => (
                <li key={item.name}>
                  <a 
                    href={item.href}
                    className="text-muted-foreground hover:text-primary transition-colors block py-1 text-sm"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              {legal.map((item) => (
                <li key={item.name}>
                  <a 
                    href={item.href}
                    className="text-muted-foreground hover:text-primary transition-colors block py-1 text-sm"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
            
            <Button
              variant="outline"
              size="sm"
              className="mt-4 border-primary text-primary hover:bg-primary hover:text-primary-foreground"
              onClick={scrollToTop}
            >
              <ArrowUp className="h-4 w-4 mr-1" />
              Back to Top
            </Button>
          </div>
        </div>

        <Separator className="my-8" />

        {/* Government Recognition Section */}
        <div className="mb-8">
          <h4 className="text-sm font-semibold text-center mb-4 text-muted-foreground">
            Recognized By Government of India & Karnataka
          </h4>
          <div className="flex flex-wrap justify-center items-center gap-8">
            <div className="flex items-center justify-center">
              <img 
                src={dpiitStartupIndiaLogo} 
                alt="DPIIT Startup India Recognition" 
                className="h-12 w-auto object-contain opacity-90 hover:opacity-100 transition-opacity"
              />
            </div>
            <div className="flex items-center justify-center">
              <img 
                src={startupKarnatakaLogo} 
                alt="Startup Karnataka Recognition" 
                className="h-12 w-auto object-contain opacity-90 hover:opacity-100 transition-opacity"
              />
            </div>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-sm text-muted-foreground">
            © 2025 NovaFuze-Tech. All rights reserved. | Made with ❤️ in India
          </div>
          <div className="flex gap-6 text-sm">
            <a href="#legal/privacy" className="text-muted-foreground hover:text-primary transition-colors">
              Privacy
            </a>
            <a href="#legal/terms" className="text-muted-foreground hover:text-primary transition-colors">
              Terms
            </a>
            <a href="#legal/refund" className="text-muted-foreground hover:text-primary transition-colors">
              Refund Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}