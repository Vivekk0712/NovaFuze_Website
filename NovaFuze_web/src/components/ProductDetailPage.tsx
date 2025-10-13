import { Button } from "./ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Badge } from "./ui/badge"
import { Header } from "./Header"
import { Footer } from "./Footer"
import { 
  ExternalLink, 
  Star, 
  Users, 
  CheckCircle, 
  ArrowRight,
  Shield,
  Clock,
  Headphones
} from "lucide-react"
import { ImageWithFallback } from "./figma/ImageWithFallback"

interface ProductDetailPageProps {
  productId: string
}

export function ProductDetailPage({ productId }: ProductDetailPageProps) {
  // Sample product data - in real app this would come from CMS/API
  const product = {
    id: "novafuze-tech-analytics",
    name: "NovaFuze-Tech Analytics",
    tagline: "Transform Data into Actionable Insights",
    description: "Comprehensive business intelligence dashboard with real-time analytics and automated reporting for data-driven decision making.",
    fullDescription: "NovaFuze Analytics is a powerful business intelligence platform that transforms your raw data into meaningful insights. With advanced visualizations, custom dashboards, and AI-powered recommendations, you can make informed decisions that drive your business forward. Our platform integrates with popular tools and provides real-time analytics to keep you ahead of the competition.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYWFzJTIwZGFzaGJvYXJkJTIwYW5hbHl0aWNzfGVufDF8fHx8MTc1ODEzODQyOHww&ixlib=rb-4.1.0&q=80&w=1080",
    price: "₹1,999",
    originalPrice: "₹2,999",
    rating: 4.8,
    users: "500+",
    category: "Analytics",
    status: "live",
    externalUrl: "https://analytics.novafuze.in",
    features: [
      "Real-time Dashboard",
      "Custom Reports",
      "AI-Powered Insights",
      "Team Collaboration",
      "API Integration",
      "Data Export Tools",
      "Mobile Access",
      "24/7 Support"
    ],
    benefits: [
      "Increase decision-making speed by 60%",
      "Reduce report generation time by 80%",
      "Improve data accuracy with automated validation",
      "Scale insights across your entire organization",
      "Connect all your data sources in one place"
    ],
    testimonials: [
      {
        name: "Rajesh Kumar",
        role: "CEO",
        company: "TechStart India",
        quote: "NovaFuze Analytics has revolutionized how we make business decisions. The insights are incredible!",
        rating: 5
      },
      {
        name: "Priya Sharma",
        role: "Data Manager",
        company: "Growth Corp",
        quote: "Finally, a tool that makes complex data simple to understand. Our team loves the intuitive interface.",
        rating: 5
      }
    ],
    pricingPlans: [
      {
        name: "Starter",
        price: "₹999",
        period: "month",
        features: ["Up to 5 dashboards", "Basic reporting", "Email support", "1 user"],
        popular: false
      },
      {
        name: "Professional",
        price: "₹1,999",
        period: "month",
        features: ["Unlimited dashboards", "Advanced analytics", "Priority support", "Up to 10 users", "API access"],
        popular: true
      },
      {
        name: "Enterprise",
        price: "₹4,999",
        period: "month",
        features: ["Everything in Pro", "Custom integrations", "Dedicated support", "Unlimited users", "White-label option"],
        popular: false
      }
    ]
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="py-24 lg:py-32 bg-gradient-to-br from-[#F1F4FD] to-[#DFE6FA] relative overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute top-20 right-20 w-32 h-32 bg-[#4E6BDF]/10 rounded-full blur-xl"></div>
            <div className="absolute bottom-20 left-20 w-24 h-24 bg-[#4E6BDF]/10 rounded-full blur-xl"></div>
          </div>

          <div className="container mx-auto px-4 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Product Info */}
              <div>
                <div className="mb-6">
                  <Badge className="bg-[#4E6BDF] text-white mb-4">{product.category}</Badge>
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
                    {product.name}
                  </h1>
                  <p className="text-xl md:text-2xl text-[#4E6BDF] font-semibold mb-6">
                    {product.tagline}
                  </p>
                </div>
                
                <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                  {product.fullDescription}
                </p>

                {/* Rating and Users */}
                <div className="flex items-center gap-6 mb-8">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <span className="font-semibold">{product.rating}/5</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-[#4E6BDF]" />
                    <span className="font-semibold">{product.users} active users</span>
                  </div>
                </div>

                {/* Pricing */}
                <div className="bg-white rounded-2xl p-6 shadow-md mb-8">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-3xl font-bold text-[#4E6BDF]">{product.price}</span>
                    {product.originalPrice && (
                      <span className="text-lg text-muted-foreground line-through">{product.originalPrice}</span>
                    )}
                    <span className="text-muted-foreground">/month</span>
                    {product.originalPrice && (
                      <Badge className="bg-green-100 text-green-800 ml-2">
                        Save 33%
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">
                    All prices in Indian Rupees (INR). No setup fees. Cancel anytime.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button 
                    size="lg" 
                    className="bg-[#4E6BDF] hover:bg-[#3D51D3]"
                    onClick={() => window.open(product.externalUrl, '_blank')}
                  >
                    Visit Product Site
                    <ExternalLink className="ml-2 h-5 w-5" />
                  </Button>
                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="border-[#4E6BDF] text-[#4E6BDF] hover:bg-[#4E6BDF] hover:text-white"
                  >
                    Free Trial
                  </Button>
                </div>
              </div>

              {/* Product Image */}
              <div className="relative">
                <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                  <ImageWithFallback
                    src={product.image}
                    alt={product.name}
                    className="w-full h-[400px] lg:h-[500px] object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#4E6BDF]/20 to-transparent"></div>
                </div>
                
                {/* Floating feature card */}
                <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl p-6 border">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-[#4E6BDF] mb-1">24/7</div>
                    <div className="text-sm text-muted-foreground">Support Available</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-24 bg-background">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Everything You Need
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Powerful features designed to streamline your analytics workflow and boost productivity.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {product.features.map((feature, index) => (
                <Card key={index} className="border-0 shadow-lg text-center">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 bg-[#F1F4FD] rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="h-6 w-6 text-[#4E6BDF]" />
                    </div>
                    <h3 className="font-semibold mb-2">{feature}</h3>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-24 bg-[#F1F4FD]">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Why Businesses Choose {product.name}
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Join hundreds of companies that have transformed their data analytics with our platform.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {product.benefits.map((benefit, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-[#4E6BDF] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <CheckCircle className="h-4 w-4 text-white" />
                  </div>
                  <p className="text-lg">{benefit}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-24 bg-background">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                What Our Customers Say
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {product.testimonials.map((testimonial, index) => (
                <Card key={index} className="border-0 shadow-lg">
                  <CardContent className="p-8">
                    <div className="flex items-center gap-1 mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <blockquote className="text-lg text-muted-foreground mb-6 italic">
                      "{testimonial.quote}"
                    </blockquote>
                    <div>
                      <div className="font-semibold">{testimonial.name}</div>
                      <div className="text-sm text-muted-foreground">{testimonial.role}, {testimonial.company}</div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-gradient-to-br from-[#4E6BDF] to-[#333FC2] relative overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute top-20 left-20 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
            <div className="absolute bottom-20 right-20 w-24 h-24 bg-white/10 rounded-full blur-xl"></div>
          </div>

          <div className="container mx-auto px-4 lg:px-8 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
                Ready to Transform Your Analytics?
              </h2>
              
              <p className="text-xl text-white/90 mb-8 leading-relaxed max-w-2xl mx-auto">
                Join {product.users} businesses already using {product.name} to make 
                better data-driven decisions every day.
              </p>

              {/* Benefits */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                <div className="bg-white/10 rounded-2xl p-6 backdrop-blur-sm">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Shield className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-white mb-2">30-Day Free Trial</h3>
                  <p className="text-white/80 text-sm">No credit card required</p>
                </div>

                <div className="bg-white/10 rounded-2xl p-6 backdrop-blur-sm">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Clock className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-white mb-2">Quick Setup</h3>
                  <p className="text-white/80 text-sm">Get started in minutes</p>
                </div>

                <div className="bg-white/10 rounded-2xl p-6 backdrop-blur-sm">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Headphones className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-white mb-2">Expert Support</h3>
                  <p className="text-white/80 text-sm">24/7 assistance available</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg" 
                  className="bg-white text-[#4E6BDF] hover:bg-[#F1F4FD] hover:text-[#3D51D3] font-semibold px-8 py-6 text-lg"
                  onClick={() => window.open(product.externalUrl, '_blank')}
                >
                  Visit Product Site
                  <ExternalLink className="ml-2 h-5 w-5" />
                </Button>
                
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-white text-white hover:bg-white hover:text-[#4E6BDF] font-semibold px-8 py-6 text-lg"
                >
                  Contact Sales
                </Button>
              </div>

              <div className="text-center text-white/80 mt-8">
                <p className="mb-2">Questions? Call us directly</p>
                <div className="text-xl font-semibold text-white">
                  +91-8074678571
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  )
}