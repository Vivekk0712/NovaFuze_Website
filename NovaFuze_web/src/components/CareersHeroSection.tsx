import { Button } from "./ui/button"
import { Badge } from "./ui/badge"
import { ArrowRight, Users, Building, Globe, Heart } from "lucide-react"

export function CareersHeroSection() {
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
            <Users className="w-4 h-4 mr-2" />
            Join Our Team
          </Badge>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Build the Future with NovaFuze-Tech
          </h1>
          
          <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed max-w-3xl mx-auto">
            Join a team of passionate innovators creating cutting-edge solutions that 
            transform businesses and shape the digital landscape. Your next career 
            adventure starts here.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button 
              size="lg" 
              className="bg-white text-[#4E6BDF] hover:bg-[#F1F4FD] hover:text-[#3D51D3] font-semibold px-8 py-6 text-lg"
            >
              View Open Positions
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            
            <Button 
              size="lg" 
              variant="outline" 
              className="border-white text-white hover:bg-white hover:text-[#4E6BDF] font-semibold px-8 py-6 text-lg"
            >
              Learn About Our Culture
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-white">
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Users className="h-5 w-5" />
                <span className="text-2xl font-bold">5+</span>
              </div>
              <div className="text-white/80">Team Members</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Building className="h-5 w-5" />
                <span className="text-2xl font-bold">3</span>
              </div>
              <div className="text-white/80">Office Locations</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Globe className="h-5 w-5" />
                <span className="text-2xl font-bold">3+</span>
              </div>
              <div className="text-white/80">Countries Served</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Heart className="h-5 w-5" />
                <span className="text-2xl font-bold">4.8/5</span>
              </div>
              <div className="text-white/80">Employee Satisfaction</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}