import { Button } from "./ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { ArrowRight, Code, Smartphone, Palette, Megaphone, Cloud, Users } from "lucide-react"

export function ServicesSection() {
  const servicesData = {
    title: "Our Services",
    subtitle: "Comprehensive Digital Solutions",
    description: "From concept to deployment, we provide end-to-end digital services tailored to your business needs.",
    items: [
      {
        id: 1,
        title: "Web Development",
        description: "Custom websites and web applications built with modern technologies and best practices.",
        price: "Starting from ₹25,000",
        icon: "Code",
        popular: true,
        features: [
          "Responsive Design",
          "SEO Optimized",
          "Fast Loading",
          "Mobile First",
          "Modern Technologies"
        ],
        order: 1
      },
      {
        id: 2,
        title: "Mobile Development",
        description: "Native and cross-platform mobile applications for iOS and Android platforms.",
        price: "Starting from ₹50,000",
        icon: "Smartphone",
        popular: false,
        features: [
          "Cross-platform Support",
          "Native Performance",
          "App Store Deployment",
          "Push Notifications",
          "Offline Functionality"
        ],
        order: 2
      },
      {
        id: 3,
        title: "UI/UX Design",
        description: "User-centered design solutions that enhance user experience and drive engagement.",
        price: "Starting from ₹15,000",
        icon: "Palette",
        popular: false,
        features: [
          "User Research",
          "Wireframing",
          "Prototyping",
          "Visual Design",
          "Usability Testing"
        ],
        order: 3
      },
      {
        id: 4,
        title: "Digital Marketing",
        description: "Comprehensive digital marketing strategies to grow your online presence and reach.",
        price: "Starting from ₹20,000/month",
        icon: "Megaphone",
        popular: false,
        features: [
          "SEO Optimization",
          "Social Media Marketing",
          "Content Strategy",
          "PPC Campaigns",
          "Analytics & Reporting"
        ],
        order: 4
      },
      {
        id: 5,
        title: "Cloud Solutions",
        description: "Scalable cloud infrastructure and deployment solutions for modern applications.",
        price: "Starting from ₹30,000",
        icon: "Cloud",
        popular: false,
        features: [
          "Cloud Migration",
          "Auto Scaling",
          "Backup Solutions",
          "Security Implementation",
          "Performance Monitoring"
        ],
        order: 5
      },
      {
        id: 6,
        title: "Consulting",
        description: "Strategic technology consulting to help you make informed decisions about your digital transformation.",
        price: "Starting from ₹5,000/hour",
        icon: "Users",
        popular: false,
        features: [
          "Technology Assessment",
          "Digital Strategy",
          "Architecture Planning",
          "Team Training",
          "Best Practices"
        ],
        order: 6
      }
    ]
  }
  
  // Sort services by order
  const services = servicesData.items.sort((a, b) => a.order - b.order)
  
  // Helper to render icons
  const renderIcon = (iconName: string) => {
    const iconMap = {
      Code,
      Smartphone,
      Palette,
      Megaphone,
      Cloud,
      Users
    } as any
    const Icon = iconMap[iconName] || Code
    return <Icon className="h-8 w-8 text-primary" />
  }

  return (
    <section className="py-24 bg-muted/30" id="services">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-20">
          <div className="inline-flex items-center px-4 py-2 bg-primary/10 rounded-full text-sm text-primary font-semibold mb-6">
            What We Do Best
          </div>
          <h2 className="text-4xl md:text-5xl font-black mb-6 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            {servicesData.title}
          </h2>
          <h3 className="text-2xl font-bold mb-6 text-foreground">
            {servicesData.subtitle}
          </h3>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            {servicesData.description}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Website Building */}
          <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-0 shadow-lg overflow-hidden bg-card">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center">
                  {renderIcon('Code')}
                </div>
              </div>
              <CardTitle className="text-xl mb-2">Website Building</CardTitle>
              <CardDescription className="text-base leading-relaxed">
                Custom websites and web applications built with modern technologies and best practices for optimal performance.
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <ul className="space-y-2 mb-6">
                <li className="flex items-center text-sm text-muted-foreground">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mr-3"></div>
                  Responsive Design
                </li>
                <li className="flex items-center text-sm text-muted-foreground">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mr-3"></div>
                  SEO Optimized
                </li>
                <li className="flex items-center text-sm text-muted-foreground">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mr-3"></div>
                  Modern Technologies
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Application Building */}
          <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-0 shadow-lg overflow-hidden bg-card">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center">
                  {renderIcon('Smartphone')}
                </div>
              </div>
              <CardTitle className="text-xl mb-2">Application Building</CardTitle>
              <CardDescription className="text-base leading-relaxed">
                Native and cross-platform mobile applications for iOS and Android platforms with superior performance.
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <ul className="space-y-2 mb-6">
                <li className="flex items-center text-sm text-muted-foreground">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mr-3"></div>
                  Cross-platform Support
                </li>
                <li className="flex items-center text-sm text-muted-foreground">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mr-3"></div>
                  Native Performance
                </li>
                <li className="flex items-center text-sm text-muted-foreground">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mr-3"></div>
                  App Store Deployment
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Technology Consulting */}
          <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-0 shadow-lg overflow-hidden bg-card">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center">
                  {renderIcon('Users')}
                </div>
              </div>
              <CardTitle className="text-xl mb-2">Technology Consulting</CardTitle>
              <CardDescription className="text-base leading-relaxed">
                Strategic technology consulting to help you make informed decisions about your digital transformation journey.
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <ul className="space-y-2 mb-6">
                <li className="flex items-center text-sm text-muted-foreground">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mr-3"></div>
                  Technology Assessment
                </li>
                <li className="flex items-center text-sm text-muted-foreground">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mr-3"></div>
                  Digital Strategy
                </li>
                <li className="flex items-center text-sm text-muted-foreground">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mr-3"></div>
                  Best Practices
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Enhanced CTA Section */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 rounded-2xl p-8 mb-8">
            <h3 className="text-2xl font-bold mb-4">Ready to Start Your Project?</h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Let's discuss your requirements and create something amazing together. 
              Our experts are ready to bring your vision to life.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold px-8 py-3 shadow-lg hover:shadow-xl transition-all duration-200"
                asChild
              >
                <a href="#contact">
                  Start Your Project
                  <ArrowRight className="ml-2 h-5 w-5" />
                </a>
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="border-primary text-primary hover:bg-primary hover:text-primary-foreground font-semibold px-8 py-3"
                asChild
              >
                <a href="#services">
                  View All Services
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}