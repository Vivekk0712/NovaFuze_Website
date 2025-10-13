import { ImageWithFallback } from "./figma/ImageWithFallback"

export function AboutHeroSection() {
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
          <div className="text-center lg:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              About{' '}
              <span className="bg-gradient-to-r from-[#4E6BDF] to-[#333FC2] bg-clip-text text-transparent">
                NovaFuze-Tech
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed">
              Founded in 2024, we are a passionate team of innovators, developers, and visionaries 
              dedicated to transforming businesses through AI-powered solutions and cutting-edge 
              web technologies. Based in India, we serve clients globally with fresh perspectives 
              and modern approaches to technology.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start">
              <div className="text-center">
                <div className="text-3xl font-bold text-[#4E6BDF]">2024</div>
                <div className="text-sm text-muted-foreground font-medium">Founded</div>
              </div>
              <div className="hidden sm:block w-px bg-border mx-2"></div>
              <div className="text-center">
                <div className="text-3xl font-bold text-[#4E6BDF]">3+</div>
                <div className="text-sm text-muted-foreground font-medium">Projects Delivered</div>
              </div>
              <div className="hidden sm:block w-px bg-border mx-2"></div>
              <div className="text-center">
                <div className="text-3xl font-bold text-[#4E6BDF]">3+</div>
                <div className="text-sm text-muted-foreground font-medium">Happy Clients</div>
              </div>
              <div className="hidden sm:block w-px bg-border mx-2"></div>
              <div className="text-center">
                <div className="text-3xl font-bold text-[#4E6BDF]">100%</div>
                <div className="text-sm text-muted-foreground font-medium">Satisfaction Rate</div>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1732284081090-8880f1e1905b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBvZmZpY2UlMjB3b3Jrc3BhY2UlMjBpbm5vdmF0aW9ufGVufDF8fHx8MTc1ODIxMjA1MHww&ixlib=rb-4.1.0&q=80&w=1080"
                alt="NovaFuze-Tech team workspace showcasing innovation and collaboration"
                className="w-full h-[400px] lg:h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#4E6BDF]/20 to-transparent"></div>
            </div>
            
            {/* Floating stats card */}
            <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl p-6 border">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-[#4E6BDF] to-[#333FC2] rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">100%</span>
                </div>
                <div>
                  <div className="font-semibold text-sm">Client Satisfaction</div>
                  <div className="text-xs text-muted-foreground">Success Rate</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}