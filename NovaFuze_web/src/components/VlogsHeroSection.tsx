import { Button } from "./ui/button"
import { Badge } from "./ui/badge"
import { ArrowRight, Play, Video, Calendar, Users } from "lucide-react"

export function VlogsHeroSection() {
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
            <Video className="w-4 h-4 mr-2" />
            Video Content
          </Badge>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Video Stories & Tutorials
          </h1>
          
          <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed max-w-3xl mx-auto">
            Learn from our team of experts through in-depth video tutorials, 
            behind-the-scenes vlogs, and insightful tech talks. Visual learning 
            made simple and engaging.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button 
              size="lg" 
              className="bg-white text-[#4E6BDF] hover:bg-[#F1F4FD] hover:text-[#3D51D3] font-semibold px-8 py-6 text-lg"
            >
              <Play className="mr-2 h-5 w-5" />
              Watch Latest Videos
            </Button>
            
            <Button 
              size="lg" 
              variant="outline" 
              className="border-white text-white hover:bg-white hover:text-[#4E6BDF] font-semibold px-8 py-6 text-lg"
            >
              Subscribe for Updates
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-white">
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Video className="h-5 w-5" />
                <span className="text-2xl font-bold">25+</span>
              </div>
              <div className="text-white/80">Video Tutorials</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Calendar className="h-5 w-5" />
                <span className="text-2xl font-bold">Weekly</span>
              </div>
              <div className="text-white/80">New Content</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Users className="h-5 w-5" />
                <span className="text-2xl font-bold">5K+</span>
              </div>
              <div className="text-white/80">Subscribers</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}