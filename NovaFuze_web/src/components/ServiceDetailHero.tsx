import { Button } from "./ui/button"
import { Badge } from "./ui/badge"
import { ArrowRight, Clock, DollarSign } from "lucide-react"
import { ImageWithFallback } from "./figma/ImageWithFallback"

interface ServiceDetailHeroProps {
  title: string
  subtitle: string
  description: string
  pricing: string
  deliveryTime: string
  technologies: string[]
  heroImage: string
  features: string[]
}

export function ServiceDetailHero({
  title,
  subtitle,
  description,
  pricing,
  deliveryTime,
  technologies,
  heroImage,
  features
}: ServiceDetailHeroProps) {
  return (
    <section className="py-24 lg:py-32 bg-gradient-to-br from-[#F1F4FD] to-[#DFE6FA] relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-20 w-32 h-32 bg-[#4E6BDF]/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 left-20 w-24 h-24 bg-[#4E6BDF]/10 rounded-full blur-xl"></div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div>
            <div className="mb-6">
              <Badge className="bg-[#4E6BDF] text-white mb-4">Service</Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
                {title}
              </h1>
              <p className="text-xl md:text-2xl text-[#4E6BDF] font-semibold mb-6">
                {subtitle}
              </p>
            </div>
            
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              {description}
            </p>

            {/* Key Features */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-4">What's Included:</h3>
              <div className="grid grid-cols-2 gap-2">
                {features.slice(0, 6).map((feature, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#4E6BDF]"></div>
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Pricing & Timeline */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-white rounded-2xl p-4 shadow-md">
                <div className="flex items-center gap-2 mb-2">
                  <DollarSign className="h-4 w-4 text-[#4E6BDF]" />
                  <span className="text-sm font-medium">Starting Price</span>
                </div>
                <div className="text-lg font-bold text-[#4E6BDF]">{pricing}</div>
              </div>
              <div className="bg-white rounded-2xl p-4 shadow-md">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="h-4 w-4 text-[#4E6BDF]" />
                  <span className="text-sm font-medium">Timeline</span>
                </div>
                <div className="text-lg font-bold">{deliveryTime}</div>
              </div>
            </div>

            {/* Technologies */}
            <div className="mb-8">
              <h4 className="text-sm font-semibold mb-3">Technologies We Use:</h4>
              <div className="flex flex-wrap gap-2">
                {technologies.map((tech, index) => (
                  <Badge key={index} variant="outline" className="border-[#4E6BDF] text-[#4E6BDF]">
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-[#4E6BDF] hover:bg-[#3D51D3]">
                Start Your Project
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" className="border-[#4E6BDF] text-[#4E6BDF] hover:bg-[#4E6BDF] hover:text-white">
                View Portfolio
              </Button>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <ImageWithFallback
                src={heroImage}
                alt={`${title} service illustration`}
                className="w-full h-[400px] lg:h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#4E6BDF]/20 to-transparent"></div>
            </div>
            
            {/* Floating stats card */}
            <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl p-6 border">
              <div className="text-center">
                <div className="text-2xl font-bold text-[#4E6BDF] mb-1">3+</div>
                <div className="text-sm text-muted-foreground">Projects Delivered</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}