import { Button } from "./ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Badge } from "./ui/badge"
import { ExternalLink, Star, ArrowRight, Zap, Shield, Users, Sparkles, Rocket, Target } from "lucide-react"
import { ImageWithFallback } from "./figma/ImageWithFallback"
import { getStaticData, Product } from "../data/static-data"

export function ProductsGridSection() {
  const products = getStaticData('products') as Product[]

  const formatPrice = (price: number, currency: string) => {
    if (price === 0) {
      return "Contact for Pricing"
    }
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: currency
    }).format(price)
  }

  const getStatusBadge = (price: number) => {
    if (price === 0) {
      return <Badge className="bg-gradient-to-r from-amber-100 to-orange-100 text-amber-800 border-amber-200 shadow-sm">Coming Soon</Badge>
    }
    return <Badge className="bg-gradient-to-r from-emerald-100 to-green-100 text-emerald-800 border-emerald-200 shadow-sm">Live</Badge>
  }

  const getProductIcon = (index: number) => {
    const icons = [Zap, Shield, Users, Sparkles, Rocket, Target]
    const Icon = icons[index % icons.length]
    return <Icon className="h-6 w-6" />
  }

  return (
    <section className="py-24 bg-gradient-to-br from-background via-[#F8F9FF] to-[#F1F4FD]">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#4E6BDF]/10 to-[#6B73FF]/10 text-[#4E6BDF] mb-6">
            <Sparkles className="h-4 w-4" />
            <span className="text-sm font-medium">Complete Product Suite</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-[#4E6BDF] via-[#6B73FF] to-[#4E6BDF] bg-clip-text text-transparent">
            Our Products
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Discover our comprehensive range of innovative SaaS products designed to transform 
            your business operations and drive unprecedented growth.
          </p>
        </div>

        {/* Enhanced Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <Card 
              key={product.id} 
              className="group relative overflow-hidden border-0 shadow-2xl bg-white/90 backdrop-blur-md hover:shadow-3xl transition-all duration-700 hover:-translate-y-4 rounded-3xl"
            >
              {/* Animated Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#4E6BDF]/10 via-[#6B73FF]/5 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
              
              {/* Floating Icon */}
              <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0">
                <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-[#4E6BDF]/20 to-[#6B73FF]/20 backdrop-blur-sm flex items-center justify-center text-[#4E6BDF]">
                  {getProductIcon(index)}
                </div>
              </div>

              <div className="relative z-10">
                {/* Product Image with Enhanced Overlay */}
                <div className="relative overflow-hidden rounded-t-3xl">
                  <ImageWithFallback
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-all duration-700"
                  />
                  
                  {/* Status and Category */}
                  <div className="absolute top-4 left-4 flex flex-col gap-2">
                    {getStatusBadge(product.price)}
                    <Badge className="bg-gradient-to-r from-[#4E6BDF] to-[#6B73FF] text-white shadow-lg">
                      {product.category}
                    </Badge>
                  </div>

                  {/* Premium Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
                  
                  {/* Rating Stars */}
                  <div className="absolute bottom-4 left-4 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all duration-500">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                    <span className="text-white text-sm ml-2 font-medium">5.0</span>
                  </div>
                </div>

                <CardHeader className="p-8">
                  <div className="flex items-start justify-between mb-4">
                    <CardTitle className="text-2xl font-bold group-hover:text-[#4E6BDF] transition-all duration-300">
                      {product.name}
                    </CardTitle>
                    <div className="h-2 w-2 rounded-full bg-gradient-to-r from-[#4E6BDF] to-[#6B73FF] opacity-0 group-hover:opacity-100 transition-all duration-300" />
                  </div>
                  
                  <CardDescription className="text-base leading-relaxed text-muted-foreground mb-6 group-hover:text-foreground/80 transition-colors duration-300">
                    {product.description}
                  </CardDescription>

                  {/* Enhanced Features */}
                  <div className="mb-6">
                    <p className="text-sm font-semibold bg-gradient-to-r from-[#4E6BDF] to-[#6B73FF] bg-clip-text text-transparent mb-3">
                      Key Features:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {product.features.slice(0, 2).map((feature, featureIndex) => (
                        <Badge 
                          key={featureIndex} 
                          variant="secondary" 
                          className="bg-gradient-to-r from-[#F1F4FD] to-[#E8ECFF] text-[#4E6BDF] hover:from-[#4E6BDF] hover:to-[#6B73FF] hover:text-white transition-all duration-300 text-xs border-0 shadow-sm"
                        >
                          {feature}
                        </Badge>
                      ))}
                      {product.features.length > 2 && (
                        <Badge 
                          variant="outline" 
                          className="text-xs border-2 border-dashed border-[#4E6BDF]/30 text-[#4E6BDF] hover:border-[#4E6BDF] hover:bg-[#4E6BDF]/5 transition-all duration-300"
                        >
                          +{product.features.length - 2} more
                        </Badge>
                      )}
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="px-8 pb-8">
                  {/* Enhanced Pricing */}
                  <div className="mb-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-3xl font-bold bg-gradient-to-r from-[#4E6BDF] to-[#6B73FF] bg-clip-text text-transparent">
                          {formatPrice(product.price, product.currency)}
                        </span>
                        {product.price > 0 && (
                          <span className="text-sm text-muted-foreground ml-2">/month</span>
                        )}
                      </div>
                      {getStatusBadge(product.price)}
                    </div>
                    {product.price > 0 && (
                      <p className="text-xs text-muted-foreground mt-2">
                        30-day free trial • No setup fees
                      </p>
                    )}
                  </div>

                  {/* Enhanced CTA Buttons */}
                  <div className="flex gap-3">
                    <Button 
                      className="flex-1 bg-gradient-to-r from-[#4E6BDF] to-[#6B73FF] hover:from-[#3D51D3] hover:to-[#5A64F5] text-white shadow-lg hover:shadow-xl transition-all duration-300 group/btn"
                      onClick={() => window.location.hash = `products/${product.slug}`}
                    >
                      {product.price === 0 ? 'Learn More' : 'Get Started'}
                      <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      size="icon"
                      className="border-2 border-[#4E6BDF]/30 text-[#4E6BDF] hover:border-[#4E6BDF] hover:bg-gradient-to-r hover:from-[#4E6BDF] hover:to-[#6B73FF] hover:text-white transition-all duration-300 shadow-sm hover:shadow-lg"
                      onClick={() => window.location.hash = 'contact'}
                    >
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </div>

                  {/* Trust Indicators */}
                  <div className="mt-4 flex items-center justify-center gap-4 text-xs text-muted-foreground opacity-0 group-hover:opacity-100 transition-all duration-500">
                    <div className="flex items-center gap-1">
                      <Shield className="h-3 w-3" />
                      <span>Secure</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Zap className="h-3 w-3" />
                      <span>Fast Setup</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-3 w-3" />
                      <span>24/7 Support</span>
                    </div>
                  </div>
                </CardContent>
              </div>

              {/* Enhanced Decorative Elements */}
              <div className="absolute -bottom-4 -right-4 h-32 w-32 bg-gradient-to-br from-[#4E6BDF]/10 via-[#6B73FF]/10 to-transparent rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-all duration-700" />
              <div className="absolute -top-4 -left-4 h-24 w-24 bg-gradient-to-br from-[#6B73FF]/10 to-[#4E6BDF]/10 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-all duration-700 delay-100" />
              
              {/* Border Glow Effect */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-[#4E6BDF]/20 via-[#6B73FF]/20 to-[#4E6BDF]/20 opacity-0 group-hover:opacity-100 transition-all duration-500 -z-10 blur-sm" />
            </Card>
          ))}
        </div>

        {/* Enhanced Bottom CTA */}
        <div className="text-center mt-20">
          <div className="inline-flex flex-col items-center gap-6 p-12 rounded-3xl bg-gradient-to-br from-white/80 via-white/60 to-white/40 backdrop-blur-xl border border-white/30 shadow-2xl">
            <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-[#4E6BDF] to-[#6B73FF] flex items-center justify-center mb-2">
              <Rocket className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold bg-gradient-to-r from-[#4E6BDF] to-[#6B73FF] bg-clip-text text-transparent">
              Ready to Transform Your Business?
            </h3>
            <p className="text-muted-foreground max-w-2xl leading-relaxed">
              Join thousands of businesses already using our products to streamline operations, 
              boost productivity, and accelerate growth. Start your journey today.
            </p>
            <div className="flex gap-4">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-[#4E6BDF] to-[#6B73FF] hover:from-[#3D51D3] hover:to-[#5A64F5] text-white shadow-xl hover:shadow-2xl transition-all duration-300 px-8"
                onClick={() => window.location.hash = 'contact'}
              >
                Get Started Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="border-2 border-[#4E6BDF]/30 text-[#4E6BDF] hover:border-[#4E6BDF] hover:bg-[#4E6BDF]/5 transition-all duration-300 px-8"
                onClick={() => window.location.hash = 'contact'}
              >
                Schedule Demo
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}