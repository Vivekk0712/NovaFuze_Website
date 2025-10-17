import { Button } from "./ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Badge } from "./ui/badge"
import { ExternalLink, Star, ArrowRight, Zap, Shield, Users } from "lucide-react"
import { ImageWithFallback } from "./figma/ImageWithFallback"
import { getStaticData, Product } from "../data/static-data"

export function ProductsSection() {
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

  const getProductIcon = (index: number) => {
    const icons = [Zap, Shield, Users]
    const Icon = icons[index % icons.length]
    return <Icon className="h-5 w-5" />
  }

  return (
    <section className="py-24 bg-gradient-to-br from-[#F8F9FF] via-[#F1F4FD] to-[#E8ECFF]">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#4E6BDF]/10 text-[#4E6BDF] mb-6">
            <Star className="h-4 w-4" />
            <span className="text-sm font-medium">Our Product Suite</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-[#4E6BDF] to-[#6B73FF] bg-clip-text text-transparent">
            Innovative Solutions
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Discover our range of cutting-edge SaaS products designed to streamline your 
            business operations and accelerate growth through intelligent automation.
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {products.map((product, index) => (
            <Card 
              key={product.id} 
              className="group relative overflow-hidden border-0 shadow-xl bg-white/80 backdrop-blur-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 rounded-2xl"
            >
              {/* Background Pattern */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#4E6BDF]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              {/* Floating Elements */}
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
                <div className="h-8 w-8 rounded-full bg-[#4E6BDF]/10 flex items-center justify-center">
                  {getProductIcon(index)}
                </div>
              </div>

              <div className="relative z-10">
                {/* Product Image */}
                <div className="relative overflow-hidden rounded-t-2xl">
                  <ImageWithFallback
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  
                  {/* Status Badge */}
                  <div className="absolute top-4 left-4">
                    <Badge className={`${product.price === 0 ? 'bg-amber-100 text-amber-800 border-amber-200' : 'bg-emerald-100 text-emerald-800 border-emerald-200'} border shadow-sm`}>
                      {product.price === 0 ? 'Coming Soon' : 'Live'}
                    </Badge>
                  </div>

                  {/* Category Badge */}
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-[#4E6BDF] text-white shadow-lg">
                      {product.category}
                    </Badge>
                  </div>

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                <CardHeader className="p-8">
                  <div className="flex items-start justify-between mb-4">
                    <CardTitle className="text-2xl font-bold group-hover:text-[#4E6BDF] transition-colors duration-300">
                      {product.name}
                    </CardTitle>
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  </div>
                  
                  <CardDescription className="text-base leading-relaxed text-muted-foreground mb-6">
                    {product.description}
                  </CardDescription>

                  {/* Features */}
                  <div className="mb-6">
                    <p className="text-sm font-semibold text-[#4E6BDF] mb-3">Key Features:</p>
                    <div className="flex flex-wrap gap-2">
                      {product.features.slice(0, 3).map((feature, featureIndex) => (
                        <Badge 
                          key={featureIndex} 
                          variant="secondary" 
                          className="bg-[#F1F4FD] text-[#4E6BDF] hover:bg-[#4E6BDF] hover:text-white transition-colors duration-200 text-xs"
                        >
                          {feature}
                        </Badge>
                      ))}
                      {product.features.length > 3 && (
                        <Badge variant="outline" className="text-xs border-[#4E6BDF] text-[#4E6BDF]">
                          +{product.features.length - 3} more
                        </Badge>
                      )}
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="px-8 pb-8">
                  {/* Pricing */}
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <span className="text-2xl font-bold text-[#4E6BDF]">
                        {formatPrice(product.price, product.currency)}
                      </span>
                      {product.price > 0 && (
                        <span className="text-sm text-muted-foreground ml-2">/month</span>
                      )}
                    </div>
                  </div>

                  {/* CTA Buttons */}
                  <div className="flex gap-3">
                    <Button 
                      className="flex-1 bg-[#4E6BDF] hover:bg-[#3D51D3] text-white group-hover:shadow-lg transition-all duration-300"
                      onClick={() => {
                        if (product.price === 0) {
                          window.location.hash = '#contact';
                        } else if (product.id === 'liveeazy') {
                          window.location.hash = '#payment';
                        } else {
                          window.location.hash = '#contact';
                        }
                      }}
                    >
                      {product.price === 0 ? 'Learn More' : 'Get Started'}
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      size="icon"
                      className="border-[#4E6BDF] text-[#4E6BDF] hover:bg-[#4E6BDF] hover:text-white transition-colors duration-300"
                      onClick={() => window.location.hash = 'contact'}
                    >
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </div>

              {/* Decorative Elements */}
              <div className="absolute -bottom-2 -right-2 h-24 w-24 bg-gradient-to-br from-[#4E6BDF]/10 to-[#6B73FF]/10 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </Card>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="inline-flex flex-col items-center gap-4 p-8 rounded-2xl bg-white/50 backdrop-blur-sm border border-white/20 shadow-xl">
            <h3 className="text-xl font-semibold text-[#4E6BDF]">
              Ready to Transform Your Business?
            </h3>
            <p className="text-muted-foreground max-w-md">
              Explore our complete product suite and discover how we can help accelerate your growth.
            </p>
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-[#4E6BDF] to-[#6B73FF] hover:from-[#3D51D3] to-[#5A64F5] text-white shadow-lg hover:shadow-xl transition-all duration-300"
              onClick={() => window.location.hash = 'products'}
            >
              View All Products
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}