import { Card, CardContent } from "./ui/card"
import { Badge } from "./ui/badge"
import { CheckCircle, Target, Users, Zap } from "lucide-react"

interface ServiceOverviewSectionProps {
  title: string
  overview: string
  benefits: string[]
  deliverables: string[]
  targetAudience: string[]
}

export function ServiceOverviewSection({
  title,
  overview,
  benefits,
  deliverables,
  targetAudience
}: ServiceOverviewSectionProps) {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Service Overview
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            {overview}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Benefits */}
          <Card className="border-0 shadow-lg">
            <CardContent className="p-8">
              <div className="w-12 h-12 bg-[#4E6BDF] rounded-full flex items-center justify-center mb-6">
                <CheckCircle className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Key Benefits</h3>
              <ul className="space-y-3">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#4E6BDF] mt-2 flex-shrink-0"></div>
                    <span className="text-muted-foreground">{benefit}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Deliverables */}
          <Card className="border-0 shadow-lg">
            <CardContent className="p-8">
              <div className="w-12 h-12 bg-[#4E6BDF] rounded-full flex items-center justify-center mb-6">
                <Target className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-4">What You Get</h3>
              <ul className="space-y-3">
                {deliverables.map((deliverable, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#4E6BDF] mt-2 flex-shrink-0"></div>
                    <span className="text-muted-foreground">{deliverable}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Target Audience */}
          <Card className="border-0 shadow-lg">
            <CardContent className="p-8">
              <div className="w-12 h-12 bg-[#4E6BDF] rounded-full flex items-center justify-center mb-6">
                <Users className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Perfect For</h3>
              <div className="space-y-2">
                {targetAudience.map((audience, index) => (
                  <Badge key={index} variant="secondary" className="mr-2 mb-2 bg-[#F1F4FD] text-[#4E6BDF]">
                    {audience}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Why Choose Us */}
        <div className="mt-16 bg-[#F1F4FD] rounded-3xl p-8 lg:p-12">
          <div className="text-center mb-12">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">Why Choose NovaFuze-Tech for {title}?</h3>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our expertise and commitment to excellence speak for themselves
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-[#4E6BDF] rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="h-8 w-8 text-white" />
              </div>
              <h4 className="font-semibold mb-2">Expert Team</h4>
              <p className="text-sm text-muted-foreground">
                Skilled professionals with years of experience
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-[#4E6BDF] rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-8 w-8 text-white" />
              </div>
              <h4 className="font-semibold mb-2">Proven Results</h4>
              <p className="text-sm text-muted-foreground">
                3+ successful projects with 100% client satisfaction
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-[#4E6BDF] rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="h-8 w-8 text-white" />
              </div>
              <h4 className="font-semibold mb-2">Quality Focus</h4>
              <p className="text-sm text-muted-foreground">
                Rigorous testing and quality assurance processes
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-[#4E6BDF] rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h4 className="font-semibold mb-2">Client-Centric</h4>
              <p className="text-sm text-muted-foreground">
                Dedicated support throughout the entire process
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}