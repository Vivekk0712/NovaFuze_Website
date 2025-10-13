import { Badge } from "./ui/badge"
import { Card, CardContent } from "./ui/card"
import { Shield, Award, Users, CheckCircle } from "lucide-react"

export function TrustSection() {
  const clientLogos = [
    "TEDxGCEM",
    "HFB Academy", 
    "Mono Mode",
    "Digital Partners",
    "Innovation Hub",
    "Tech Solutions"
  ]

  const trustBadges = [
    {
      icon: Shield,
      title: "Secure & Reliable",
      description: "100% Data Security"
    },
    {
      icon: Award,
      title: "Quality Assured", 
      description: "ISO Standards"
    },
    {
      icon: Users,
      title: "Expert Team",
      description: "Certified Developers"
    },
    {
      icon: CheckCircle,
      title: "Proven Results",
      description: "100% Success Rate"
    }
  ]

  return (
    <section className="py-16 bg-background border-t border-b border-border/50">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Trust Badges */}
        <div className="text-center mb-12">
          <h3 className="text-lg font-semibold text-muted-foreground mb-8">
            Why Leading Companies Choose NovaFuze-Tech
          </h3>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            {trustBadges.map((badge, index) => {
              const Icon = badge.icon
              return (
                <Card key={index} className="border-primary/20 hover:border-primary/40 transition-colors">
                  <CardContent className="p-4 text-center">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <div className="font-semibold text-sm mb-1">{badge.title}</div>
                    <div className="text-xs text-muted-foreground">{badge.description}</div>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {/* Client Logos */}
          <div className="border-t border-border pt-8">
            <p className="text-sm text-muted-foreground mb-6">
              Trusted by forward-thinking companies across India
            </p>
            
            <div className="flex flex-wrap justify-center items-center gap-6 md:gap-12 opacity-60">
              {clientLogos.map((logo, index) => (
                <div 
                  key={index} 
                  className="text-sm font-semibold text-muted-foreground hover:text-primary transition-colors cursor-pointer"
                >
                  {logo}
                </div>
              ))}
            </div>
          </div>

          {/* Stats Bar */}
          <div className="mt-8 pt-8 border-t border-border">
            <div className="flex flex-wrap justify-center items-center gap-8 text-sm">
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="bg-green-100 text-green-800 border-green-200">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  3+ Projects Delivered
                </Badge>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="bg-blue-100 text-blue-800 border-blue-200">
                  <Users className="h-3 w-3 mr-1" />
                  100% Client Satisfaction
                </Badge>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                  <Award className="h-3 w-3 mr-1" />
                  Quality Guaranteed
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}