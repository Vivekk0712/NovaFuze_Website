import { Button } from "./ui/button"
import { Badge } from "./ui/badge"
import { ArrowRight, Phone, Mail, MapPin, MessageSquare } from "lucide-react"

export function ContactHeroSection() {
  return (
    <section className="py-24 lg:py-32 bg-gradient-to-br from-[#4E6BDF] via-[#3D51D3] to-[#333FC2] relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 right-20 w-24 h-24 bg-white/10 rounded-full blur-xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-white/5 rounded-full blur-2xl"></div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          <Badge className="bg-white/20 text-white border-white/30 mb-6">
            <MessageSquare className="w-4 h-4 mr-2" />
            Contact Us
          </Badge>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Get in Touch
          </h1>
          
          <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed max-w-3xl mx-auto">
            Ready to transform your digital presence? Let's discuss your project 
            and explore how NovaFuze-Tech can help you achieve your goals.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button 
              size="lg" 
              className="bg-white text-[#4E6BDF] hover:bg-[#F1F4FD] hover:text-[#3D51D3] font-semibold px-8 py-6 text-lg"
            >
              <MessageSquare className="mr-2 h-5 w-5" />
              Start a Conversation
            </Button>
            
            <Button 
              size="lg" 
              variant="outline" 
              className="border-white text-white hover:bg-white hover:text-[#4E6BDF] font-semibold px-8 py-6 text-lg"
            >
              <Phone className="mr-2 h-5 w-5" />
              Schedule a Call
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-white">
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Phone className="h-5 w-5" />
                <span className="text-lg font-semibold">Call Us</span>
              </div>
              <div className="text-white/80">+91-8074678571</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Mail className="h-5 w-5" />
                <span className="text-lg font-semibold">Email Us</span>
              </div>
              <div className="text-white/80">support@novafuze.in</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <MapPin className="h-5 w-5" />
                <span className="text-lg font-semibold">Visit Us</span>
              </div>
              <div className="text-white/80">Bangalore, India</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}