import { Card, CardContent } from "./ui/card"
import { Badge } from "./ui/badge"
import { ArrowRight, Search, Code, Rocket } from "lucide-react"

interface ProcessStep {
  step: number
  title: string
  description: string
  icon: React.ReactNode
  duration: string
  deliverables: string[]
}

interface ProcessSectionProps {
  title: string
  description: string
  steps: ProcessStep[]
}

export function ProcessSection({ title, description, steps }: ProcessSectionProps) {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Our Process
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            {description}
          </p>
        </div>

        <div className="relative">
          {/* Process Steps */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            {steps.map((step, index) => (
              <div key={step.step} className="relative">
                {/* Connecting Line - Hidden on mobile, visible on larger screens */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-16 left-full w-full h-0.5 bg-gradient-to-r from-[#4E6BDF] to-[#DFE6FA] transform translate-x-6 z-0"></div>
                )}

                <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 relative z-10 bg-white">
                  <CardContent className="p-8 text-center">
                    {/* Step Number */}
                    <div className="w-16 h-16 bg-gradient-to-br from-[#4E6BDF] to-[#333FC2] rounded-full flex items-center justify-center mx-auto mb-6">
                      <span className="text-white font-bold text-lg">{step.step}</span>
                    </div>

                    {/* Icon */}
                    <div className="w-12 h-12 bg-[#F1F4FD] rounded-full flex items-center justify-center mx-auto mb-4">
                      {step.icon}
                    </div>

                    {/* Content */}
                    <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                    <p className="text-muted-foreground mb-4 leading-relaxed">
                      {step.description}
                    </p>

                    {/* Duration */}
                    <Badge className="bg-[#F1F4FD] text-[#4E6BDF] mb-4">
                      {step.duration}
                    </Badge>

                    {/* Deliverables */}
                    <div className="text-left">
                      <h4 className="text-sm font-semibold mb-2">Deliverables:</h4>
                      <ul className="space-y-1">
                        {step.deliverables.map((deliverable, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <div className="w-1 h-1 rounded-full bg-[#4E6BDF] mt-2 flex-shrink-0"></div>
                            <span>{deliverable}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>

        {/* Process Benefits */}
        <div className="mt-16 bg-gradient-to-br from-[#4E6BDF] to-[#333FC2] rounded-3xl p-8 lg:p-12 text-white">
          <div className="text-center mb-8">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">Why Our Process Works</h3>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Our structured approach ensures consistent quality and predictable outcomes
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <Search className="h-6 w-6 text-white" />
              </div>
              <h4 className="font-semibold mb-2">Research-Driven</h4>
              <p className="text-sm text-white/80">Every decision backed by data and research</p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <Code className="h-6 w-6 text-white" />
              </div>
              <h4 className="font-semibold mb-2">Iterative Development</h4>
              <p className="text-sm text-white/80">Continuous feedback and improvement cycles</p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <Rocket className="h-6 w-6 text-white" />
              </div>
              <h4 className="font-semibold mb-2">Quality Assurance</h4>
              <p className="text-sm text-white/80">Rigorous testing at every stage</p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <ArrowRight className="h-6 w-6 text-white" />
              </div>
              <h4 className="font-semibold mb-2">Transparent Progress</h4>
              <p className="text-sm text-white/80">Regular updates and milestone reviews</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}