import { Card, CardContent } from "./ui/card"
import { Badge } from "./ui/badge"
import { AlertTriangle, ArrowRight, CheckCircle } from "lucide-react"

interface Challenge {
  problem: string
  impact: string
  solution: string
  result: string
}

interface ChallengesSectionProps {
  title: string
  description: string
  challenges: Challenge[]
}

export function ChallengesSection({ title, description, challenges }: ChallengesSectionProps) {
  return (
    <section className="py-24 bg-[#F1F4FD]">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Challenges We Solve
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            {description}
          </p>
        </div>

        <div className="space-y-8">
          {challenges.map((challenge, index) => (
            <Card key={index} className="border-0 shadow-lg overflow-hidden bg-white">
              <CardContent className="p-8">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-center">
                  {/* Problem */}
                  <div className="text-center lg:text-left">
                    <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto lg:mx-0 mb-4">
                      <AlertTriangle className="h-6 w-6 text-red-600" />
                    </div>
                    <h3 className="font-semibold mb-2 text-red-700">Problem</h3>
                    <p className="text-sm text-muted-foreground mb-2">{challenge.problem}</p>
                    <Badge variant="destructive" className="text-xs">
                      {challenge.impact}
                    </Badge>
                  </div>

                  {/* Arrow */}
                  <div className="flex justify-center">
                    <ArrowRight className="h-6 w-6 text-[#4E6BDF] transform lg:rotate-0 rotate-90" />
                  </div>

                  {/* Solution */}
                  <div className="text-center lg:text-left">
                    <div className="w-12 h-12 bg-[#F1F4FD] rounded-full flex items-center justify-center mx-auto lg:mx-0 mb-4">
                      <CheckCircle className="h-6 w-6 text-[#4E6BDF]" />
                    </div>
                    <h3 className="font-semibold mb-2 text-[#4E6BDF]">Our Solution</h3>
                    <p className="text-sm text-muted-foreground">{challenge.solution}</p>
                  </div>

                  {/* Arrow */}
                  <div className="flex justify-center">
                    <ArrowRight className="h-6 w-6 text-green-600 transform lg:rotate-0 rotate-90" />
                  </div>

                  {/* Result */}
                  <div className="text-center lg:text-left">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto lg:mx-0 mb-4">
                      <CheckCircle className="h-6 w-6 text-green-600" />
                    </div>
                    <h3 className="font-semibold mb-2 text-green-700">Result</h3>
                    <p className="text-sm text-muted-foreground mb-2">{challenge.result}</p>
                    <Badge className="bg-green-100 text-green-800 text-xs">
                      Problem Solved
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>


      </div>
    </section>
  )
}