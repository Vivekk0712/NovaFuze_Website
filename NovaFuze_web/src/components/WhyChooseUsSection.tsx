import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Badge } from "./ui/badge"
import { 
  Shield, 
  Clock, 
  Users, 
  Zap, 
  Lightbulb,
  Headphones,
  Target
} from "lucide-react"
import { ImageWithFallback } from "./figma/ImageWithFallback"

export function WhyChooseUsSection() {
  const reasons = [
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Cutting-Edge Technology",
      description: "We leverage the latest AI and web technologies to deliver solutions that are future-ready and scalable.",
      badge: "Innovation"
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: "Fast Delivery",
      description: "Our agile development process ensures rapid project completion without compromising on quality.",
      badge: "Efficiency"
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Quality Assurance",
      description: "Rigorous testing and quality control processes guarantee reliable, secure, and high-performing solutions.",
      badge: "Reliability"
    },
    {
      icon: <Headphones className="h-6 w-6" />,
      title: "24/7 Support",
      description: "Continuous support and maintenance to keep your digital solutions running smoothly at all times.",
      badge: "Support"
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Expert Team",
      description: "Skilled professionals with years of experience in AI, web development, and digital transformation.",
      badge: "Expertise"
    },
    {
      icon: <Target className="h-6 w-6" />,
      title: "Results-Driven",
      description: "Focused on delivering measurable business outcomes and ROI through strategic technology implementation.",
      badge: "Performance"
    }
  ]



  const getBadgeColor = (badge: string) => {
    switch (badge) {
      case 'Innovation': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
      case 'Efficiency': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
      case 'Reliability': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
      case 'Support': return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200'
      case 'Expertise': return 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200'
      case 'Performance': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200'
    }
  }

  return (
    <section className="py-24 bg-gradient-to-br from-[#F8F9FF] to-[#F1F4FD] dark:from-background dark:to-background">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-[#4E6BDF]/10 text-[#4E6BDF] border-[#4E6BDF]/20">
            Why NovaFuze
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Why Choose NovaFuze for Your Next Project?
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            We combine technical expertise with creative innovation to deliver solutions 
            that don't just meet your needs—they exceed your expectations.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-16">
          {/* Content */}
          <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {reasons.map((reason, index) => (
                <Card key={index} className="border-0 shadow-md hover:shadow-lg transition-all duration-300 bg-white/70 backdrop-blur-sm">
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 bg-[#4E6BDF] rounded-lg flex items-center justify-center text-white">
                        {reason.icon}
                      </div>
                      <Badge className={getBadgeColor(reason.badge)} variant="secondary">
                        {reason.badge}
                      </Badge>
                    </div>
                    <CardTitle className="text-lg">{reason.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {reason.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Image */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1690264459607-a90b23d887f8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWFtJTIwY29sbGFib3JhdGlvbiUyMG9mZmljZSUyMG1lZXRpbmd8ZW58MXx8fHwxNzU4Nzc5ODY2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="NovaFuze team collaboration and innovation"
                className="w-full h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#4E6BDF]/30 to-transparent"></div>
            </div>

            {/* Floating quote card */}
            <div className="absolute -bottom-8 -left-8 bg-white rounded-2xl shadow-xl p-6 border max-w-sm">
              <div className="flex items-center gap-3 mb-3">
                <Lightbulb className="h-5 w-5 text-[#4E6BDF]" />
                <span className="font-semibold text-sm">Client Testimonial</span>
              </div>
              <p className="text-sm text-muted-foreground mb-3">
                "NovaFuze transformed our business with their innovative approach. The results exceeded all expectations."
              </p>
              <div className="text-xs text-muted-foreground">
                - Tech Startup CEO
              </div>
            </div>
          </div>
        </div>


      </div>
    </section>
  )
}