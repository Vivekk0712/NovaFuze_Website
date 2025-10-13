import { Card, CardContent } from "./ui/card"
import { Badge } from "./ui/badge"
import { 
  Coffee, 
  Heart, 
  Lightbulb, 
  Users, 
  BookOpen, 
  Zap,
  Target,
  Globe
} from "lucide-react"
import { ImageWithFallback } from "./figma/ImageWithFallback"

export function CompanyCultureSection() {
  const cultureValues = [
    {
      icon: <Heart className="h-6 w-6" />,
      title: "Work-Life Balance",
      description: "We believe in sustainable productivity and personal well-being.",
      color: "text-red-500"
    },
    {
      icon: <Lightbulb className="h-6 w-6" />,
      title: "Continuous Learning",
      description: "Every day is an opportunity to learn, grow, and innovate.",
      color: "text-yellow-500"
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Collaborative Spirit",
      description: "Great ideas emerge when diverse minds work together.",
      color: "text-blue-500"
    },
    {
      icon: <Target className="h-6 w-6" />,
      title: "Results-Oriented",
      description: "We focus on delivering real value and measurable outcomes.",
      color: "text-green-500"
    }
  ]

  const workPerks = [
    { icon: <Coffee className="h-5 w-5" />, perk: "Free Premium Coffee & Snacks" },
    { icon: <BookOpen className="h-5 w-5" />, perk: "Learning & Development Budget" },
    { icon: <Globe className="h-5 w-5" />, perk: "Remote Work Flexibility" },
    { icon: <Zap className="h-5 w-5" />, perk: "Latest Tech & Tools" }
  ]

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-[#4E6BDF]/10 text-[#4E6BDF] border-[#4E6BDF]/20">
            Our Culture
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Life at NovaFuze
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            We've built more than just a company—we've created a community where 
            innovation thrives and every team member can reach their full potential.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-16">
          {/* Image */}
          <div className="relative order-2 lg:order-1">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1732284081090-8880f1e1905b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbm5vdmF0aW9uJTIwdGVjaG5vbG9neSUyMHdvcmtzcGFjZXxlbnwxfHx8fDE3NTg3NjE4NTl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="NovaFuze innovative workspace and team culture"
                className="w-full h-[400px] lg:h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#4E6BDF]/20 to-transparent"></div>
            </div>

            {/* Floating culture card */}
            <div className="absolute -top-6 -right-6 bg-white dark:bg-card rounded-2xl shadow-xl p-6 border max-w-xs">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 bg-[#4E6BDF] rounded-full flex items-center justify-center">
                  <Heart className="h-4 w-4 text-white" />
                </div>
                <span className="font-semibold text-sm">Team Happiness</span>
              </div>
              <div className="text-2xl font-bold text-[#4E6BDF] mb-1">98%</div>
              <div className="text-xs text-muted-foreground">
                Employee Satisfaction Rate
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="order-1 lg:order-2">
            <div className="space-y-6">
              <div className="mb-8">
                <h3 className="text-2xl font-bold mb-4">Our Culture Values</h3>
                <p className="text-muted-foreground leading-relaxed">
                  At NovaFuze, we've cultivated an environment where creativity meets technology, 
                  where challenges become opportunities, and where every team member contributes 
                  to our shared vision of innovation.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {cultureValues.map((value, index) => (
                  <Card key={index} className="border-0 shadow-sm hover:shadow-md transition-shadow duration-300">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <div className={`${value.color} mt-1`}>
                          {value.icon}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold mb-1 text-sm">{value.title}</h4>
                          <p className="text-xs text-muted-foreground leading-relaxed">
                            {value.description}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Work Perks & Benefits */}
        <div className="bg-gradient-to-br from-[#F1F4FD] to-[#E8EDFF] dark:from-card dark:to-card/50 rounded-3xl p-8 lg:p-12">
          <div className="text-center mb-12">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">Perks & Benefits</h3>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We take care of our team so they can focus on creating amazing solutions for our clients.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {workPerks.map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-white dark:bg-card rounded-2xl shadow-lg flex items-center justify-center mx-auto mb-4">
                  <div className="text-[#4E6BDF]">
                    {item.icon}
                  </div>
                </div>
                <p className="font-medium text-sm">{item.perk}</p>
              </div>
            ))}
          </div>

          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-white dark:bg-card px-6 py-3 rounded-full shadow-sm border">
              <Users className="h-4 w-4 text-[#4E6BDF]" />
              <span className="text-sm font-medium">Join Our Growing Team</span>
              <Badge className="bg-[#4E6BDF] text-white">
                We're Hiring!
              </Badge>
            </div>
          </div>
        </div>


      </div>
    </section>
  )
}