import { Button } from "./ui/button"
import { ArrowRight } from "lucide-react"

export function HeroSection() {
  const heroData = {
    headline: "Transform Your Vision",
    subheadline: "Into Digital Reality",
    description: "Building modern digital experiences with AI-powered solutions. We transform ideas into scalable, innovative technology solutions that drive business growth.",
    buttons: {
      primary: {
        text: "Get Started",
        href: "#contact",
        bgColor: "#4E6BDF"
      },
      secondary: {
        text: "View Portfolio",
        href: "#portfolio"
      }
    },
    stats: [
      { id: 1, number: "3+", label: "Projects Delivered", order: 1 },
      { id: 2, number: "3+", label: "Happy Clients", order: 2 },
      { id: 3, number: "1", label: "Year Experience", order: 3 },
      { id: 4, number: "24/7", label: "Support", order: 4 }
    ]
  }

  // Using NovaFuze-Tech brand colors
  const brandData = {
    primaryColor: '#4E6BDF',
    primaryHoverColor: '#3D51D3',
    accentColor: '#F1F4FD'
  }
  
  // Sort stats by order
  const stats = heroData.stats.sort((a, b) => a.order - b.order)
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Enhanced background with better contrast */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/95 to-primary/80">
        <div className="absolute inset-0 bg-black/30 dark:bg-black/50"></div>
        {/* Background pattern with better opacity */}
        <div 
          className="absolute inset-0 w-full h-full opacity-10"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1743004873139-5bc0e3d937d4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBvZmZpY2UlMjB0ZWNobm9sb2d5JTIwd29ya3NwYWNlfGVufDF8fHx8MTc1ODEyMTEwOXww&ixlib=rb-4.1.0&q=80&w=1080')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
      </div>

      {/* Enhanced Content with better hierarchy */}
      <div className="relative z-10 container mx-auto px-4 lg:px-8 text-center">
        <div className="max-w-5xl mx-auto">
          {/* Trust badge above headline */}
          <div className="mb-6">
            <div className="inline-flex items-center px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm text-white font-medium border border-white/30">
              ⭐ Trusted by 3+ Clients Across India
            </div>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-black text-white mb-8 leading-tight tracking-tight">
            {heroData.headline}{' '}
            <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent block md:inline">
              {heroData.subheadline}
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-white/95 mb-12 leading-relaxed max-w-3xl mx-auto font-medium">
            {heroData.description}
          </p>

          {/* Enhanced dual CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Button 
              size="lg" 
              className="bg-white text-primary hover:bg-white/90 font-bold px-10 py-4 text-lg shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105 rounded-xl"
              asChild
            >
              <a href={heroData.buttons.primary.href}>
                {heroData.buttons.primary.text}
                <ArrowRight className="ml-2 h-6 w-6" />
              </a>
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="border-white/30 text-white hover:bg-white/10 font-semibold px-10 py-4 text-lg backdrop-blur-sm rounded-xl"
              asChild
            >
              <a href={heroData.buttons.secondary.href}>
                {heroData.buttons.secondary.text}
              </a>
            </Button>
          </div>

          {/* Enhanced stats with better visual treatment */}
          <div className={`grid grid-cols-2 md:grid-cols-4 gap-6 text-white`}>
            {stats.map((stat) => (
              <div key={stat.id} className="text-center bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <div className="text-3xl md:text-4xl font-black text-yellow-300 mb-2">{stat.number}</div>
                <div className="text-sm md:text-base font-medium text-white/90">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Enhanced decorative elements */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-background via-background/50 to-transparent"></div>
    </section>
  )
}