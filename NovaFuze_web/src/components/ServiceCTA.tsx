import { Button } from "./ui/button"
import { Badge } from "./ui/badge"
import { ArrowRight, CheckCircle, Clock, Shield } from "lucide-react"

interface ServiceCTAProps {
  title: string
  pricing: string
  deliveryTime: string
}

export function ServiceCTA({ title, pricing, deliveryTime }: ServiceCTAProps) {
  return (
    <section className="py-24 bg-gradient-to-br from-[#4E6BDF] to-[#333FC2] relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 right-20 w-24 h-24 bg-white/10 rounded-full blur-xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-white/5 rounded-full blur-2xl"></div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <Badge className="bg-white/20 text-white border-white/30 mb-4">
              Ready to Start?
            </Badge>
            
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
              Start Your {title} Project Today
            </h2>
            
            <p className="text-xl text-white/90 mb-8 leading-relaxed max-w-2xl mx-auto">
              Transform your business with our expert {title.toLowerCase()} services. 
              Get a free consultation and project estimate within 24 hours.
            </p>
          </div>

          {/* Key Benefits */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white/10 rounded-2xl p-6 backdrop-blur-sm">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-semibold text-white mb-2">Quality Guarantee</h3>
              <p className="text-white/80 text-sm">100% satisfaction or money back</p>
            </div>

            <div className="bg-white/10 rounded-2xl p-6 backdrop-blur-sm">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-semibold text-white mb-2">Fast Delivery</h3>
              <p className="text-white/80 text-sm">{deliveryTime} typical timeline</p>
            </div>

            <div className="bg-white/10 rounded-2xl p-6 backdrop-blur-sm">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-semibold text-white mb-2">Ongoing Support</h3>
              <p className="text-white/80 text-sm">6 months free maintenance</p>
            </div>
          </div>

          {/* Pricing & CTA */}
          <div className="bg-white/10 rounded-3xl p-8 backdrop-blur-sm mb-8">
            <div className="text-center mb-6">
              <div className="text-4xl font-bold text-white mb-2">{pricing}</div>
              <div className="text-white/80">Starting price for {title.toLowerCase()}</div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-white text-[#4E6BDF] hover:bg-[#F1F4FD] hover:text-[#3D51D3] font-semibold px-8 py-6 text-lg"
              >
                Start a Project
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white hover:text-[#4E6BDF] font-semibold px-8 py-6 text-lg"
              >
                Free Consultation
              </Button>
            </div>
          </div>

          {/* Contact Information */}
          <div className="text-center text-white/80">
            <p className="mb-2">Questions? Call us directly</p>
            <div className="text-xl font-semibold text-white">
              +91-8074678571
            </div>
            <div className="text-sm mt-2">
              Or email us at{" "}
              <a href="mailto:support@novafuze.in" className="text-white font-medium underline">
                support@novafuze.in
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}