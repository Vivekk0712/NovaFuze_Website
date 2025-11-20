import { Button } from "./ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Badge } from "./ui/badge"
import { 
  Code, 
  Smartphone, 
  Zap, 
  ArrowRight, 
  CheckCircle, 
  Globe, 
  Database,
  Brain,
  Palette,
  ShoppingCart
} from "lucide-react"

export function ServicesGridSection() {
  const services = [
    {
      id: "web-development",
      icon: <Code className="h-8 w-8 text-[#4E6BDF]" />,
      title: "Web Development",
      summary: "Modern, responsive websites and web applications built with cutting-edge technologies.",
      description: "Create powerful, scalable web solutions using React, Next.js, and Node.js. From corporate websites to complex web applications, we deliver performance-first solutions that grow with your business.",
      features: [
        "Responsive Design",
        "SEO Optimization", 
        "Performance First",
        "Modern Tech Stack",
        "API Integration",
        "Database Design"
      ],
      technologies: ["React", "Next.js", "TypeScript", "Node.js", "PostgreSQL"],
      pricing: "₹50,000",
      deliveryTime: "2-8 weeks",
      link: "/services/web-development"
    },
    {
      id: "application-development",
      icon: <Smartphone className="h-8 w-8 text-[#4E6BDF]" />,
      title: "Application Development",
      summary: "Custom mobile and desktop applications tailored to your specific business requirements.",
      description: "Build native and cross-platform applications that provide exceptional user experiences. From mobile apps to desktop software, we create solutions that engage users and drive results.",
      features: [
        "Cross-Platform Development",
        "Native Performance",
        "User-Centric Design", 
        "Real-time Features",
        "Offline Capabilities",
        "Push Notifications"
      ],
      technologies: ["React Native", "Flutter", "Swift", "Kotlin", "Electron"],
      pricing: "₹80,000",
      deliveryTime: "4-12 weeks",
      link: "/services/application-development"
    },
    {
      id: "ai-solutions",
      icon: <Zap className="h-8 w-8 text-[#4E6BDF]" />,
      title: "AI-Powered Solutions",
      summary: "Intelligent automation and AI integration to streamline your business processes.",
      description: "Leverage the power of artificial intelligence to automate workflows, gain insights from data, and create intelligent user experiences. From chatbots to predictive analytics, we make AI work for your business.",
      features: [
        "Process Automation",
        "Predictive Analytics",
        "Natural Language Processing",
        "Computer Vision",
        "Chatbot Development",
        "Data Intelligence"
      ],
      technologies: ["Python", "TensorFlow", "OpenAI", "LangChain", "FastAPI"],
      pricing: "₹1,20,000",
      deliveryTime: "6-16 weeks",
      link: "/services/ai-solutions"
    },
    {
      id: "ui-ux-design",
      icon: <Palette className="h-8 w-8 text-[#4E6BDF]" />,
      title: "UI/UX Design",
      summary: "User-centered design that creates meaningful and engaging digital experiences.",
      description: "Design beautiful, intuitive interfaces that users love. Our design process combines user research, wireframing, prototyping, and testing to create experiences that convert and retain users.",
      features: [
        "User Research",
        "Wireframing & Prototyping",
        "Design Systems",
        "Usability Testing",
        "Brand Identity",
        "Responsive Design"
      ],
      technologies: ["Figma", "Adobe XD", "Sketch", "Principle", "InVision"],
      pricing: "₹40,000",
      deliveryTime: "2-6 weeks",
      link: "/services/ui-ux-design"
    },
    {
      id: "ecommerce-solutions",
      icon: <ShoppingCart className="h-8 w-8 text-[#4E6BDF]" />,
      title: "E-commerce Solutions",
      summary: "Complete online stores and marketplaces with integrated payment and inventory management.",
      description: "Build powerful e-commerce platforms that drive sales and provide seamless shopping experiences. From simple online stores to complex marketplaces, we handle everything from design to deployment.",
      features: [
        "Payment Integration",
        "Inventory Management",
        "Order Processing",
        "Analytics Dashboard",
        "Mobile Optimization",
        "Security Features"
      ],
      technologies: ["Shopify", "WooCommerce", "Magento", "Stripe", "PayPal"],
      pricing: "₹75,000",
      deliveryTime: "4-10 weeks",
      link: "/services/ecommerce-solutions"
    },
    {
      id: "consulting",
      icon: <Globe className="h-8 w-8 text-[#4E6BDF]" />,
      title: "Technology Consulting",
      summary: "Strategic technology guidance to help you make informed decisions and optimize your tech stack.",
      description: "Get expert advice on technology strategy, architecture decisions, and digital transformation. We help businesses choose the right technologies and approaches for their specific needs and goals.",
      features: [
        "Technology Audit",
        "Architecture Planning",
        "Digital Strategy",
        "Performance Optimization",
        "Security Assessment",
        "Scalability Planning"
      ],
      technologies: ["AWS", "Azure", "Docker", "Kubernetes", "Microservices"],
      pricing: "₹25,000",
      deliveryTime: "1-4 weeks",
      link: "/services/consulting"
    }
  ]

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Complete Digital Solutions
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Choose from our comprehensive range of services designed to meet 
            every aspect of your digital transformation journey.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <Card 
              key={service.id}
              className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-0 shadow-lg overflow-hidden bg-white"
            >
              <CardHeader className="pb-4">
                <div className="mb-4 p-3 w-fit rounded-xl bg-[#F1F4FD] group-hover:bg-[#DFE6FA] transition-colors">
                  {service.icon}
                </div>
                <CardTitle className="text-xl mb-2 group-hover:text-[#4E6BDF] transition-colors">
                  {service.title}
                </CardTitle>
                <CardDescription className="text-base leading-relaxed">
                  {service.summary}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="pt-0">
                <div className="space-y-4 mb-6">
                  <div className="flex flex-wrap gap-2">
                    {service.features.slice(0, 4).map((feature, idx) => (
                      <Badge key={idx} variant="secondary" className="text-xs bg-[#F1F4FD] text-[#4E6BDF]">
                        {feature}
                      </Badge>
                    ))}
                    {service.features.length > 4 && (
                      <Badge variant="secondary" className="text-xs bg-[#F1F4FD] text-[#4E6BDF]">
                        +{service.features.length - 4} more
                      </Badge>
                    )}
                  </div>

                  <div className="text-sm text-muted-foreground">
                    <div className="flex items-center justify-between mb-1">
                      <span>Price:</span>
                      <span className="font-semibold text-[#4E6BDF]">{service.pricing}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Timeline:</span>
                      <span className="font-medium">{service.deliveryTime}</span>
                    </div>
                  </div>
                </div>
                
                <Button 
                  className="w-full bg-[#4E6BDF] hover:bg-[#3D51D3] group-hover:bg-[#333FC2] justify-between"
                  onClick={() => window.location.href = service.link}
                >
                  Learn More
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-16">
          <div className="bg-[#F1F4FD] rounded-3xl p-8 lg:p-12">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Need a Custom Solution?
            </h3>
            <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
              Every business is unique. Let's discuss your specific requirements 
              and create a tailored solution that perfectly fits your needs.
            </p>
            <Button size="lg" className="bg-[#4E6BDF] hover:bg-[#3D51D3]">
              Start a Conversation
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}