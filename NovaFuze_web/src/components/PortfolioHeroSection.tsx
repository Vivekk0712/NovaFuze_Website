import { Badge } from "./ui/badge"
import { Button } from "./ui/button"
import { ArrowRight, ExternalLink, Github } from "lucide-react"

export function PortfolioHeroSection() {
  return (
    <section className="py-20 bg-gradient-to-br from-[#4E6BDF] via-[#3D51D3] to-[#2A3B9A] text-white relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full blur-xl"></div>
        <div className="absolute top-32 right-20 w-24 h-24 bg-white rounded-full blur-lg"></div>
        <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-white rounded-full blur-2xl"></div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          <Badge className="bg-white/20 text-white border-white/30 mb-6 text-sm px-4 py-1.5">
            Our Portfolio
          </Badge>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Showcasing Our
            <span className="block bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
              Digital Masterpieces
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed max-w-3xl mx-auto">
            Explore our collection of successful projects that have transformed businesses 
            and delivered exceptional digital experiences across various industries.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              variant="outline" 
              className="border-white text-white hover:bg-white hover:text-[#4E6BDF] font-semibold px-8 py-3"
            >
              <ExternalLink className="h-5 w-5 mr-2" />
              View All Projects
              <ArrowRight className="h-5 w-5 ml-2" />
            </Button>
            
            <Button 
              size="lg" 
              variant="outline" 
              className="border-white/50 text-white/90 hover:bg-white/10 font-semibold px-8 py-3"
            >
              <Github className="h-5 w-5 mr-2" />
              Open Source Work
            </Button>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold mb-2">25+</div>
              <div className="text-white/80">Projects Completed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold mb-2">15+</div>
              <div className="text-white/80">Happy Clients</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold mb-2">100%</div>
              <div className="text-white/80">Success Rate</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}