import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Target, Eye, Heart, Zap } from "lucide-react"

export function MissionVisionSection() {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Our Mission & Vision
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Driven by innovation, guided by values, and committed to creating 
            meaningful digital experiences that make a difference.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Mission */}
          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="text-center pb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-[#4E6BDF] to-[#333FC2] rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-2xl">Our Mission</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-lg text-muted-foreground leading-relaxed">
                To empower businesses and individuals with cutting-edge AI-driven 
                technology solutions that simplify complex problems, enhance productivity, 
                and create meaningful digital experiences that drive real-world impact.
              </p>
            </CardContent>
          </Card>

          {/* Vision */}
          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="text-center pb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-[#4E6BDF] to-[#333FC2] rounded-full flex items-center justify-center mx-auto mb-4">
                <Eye className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-2xl">Our Vision</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-lg text-muted-foreground leading-relaxed">
                To be the leading force in democratizing advanced technology, 
                making AI and modern web solutions accessible to businesses of all sizes, 
                ultimately shaping a future where technology serves humanity's greatest potential.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Core Values */}
        <div className="bg-[#F1F4FD] rounded-3xl p-8 lg:p-12">
          <div className="text-center mb-12">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">Our Core Values</h3>
            <p className="text-lg text-muted-foreground">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-[#4E6BDF] rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="h-6 w-6 text-white" />
              </div>
              <h4 className="font-semibold mb-2">Innovation</h4>
              <p className="text-sm text-muted-foreground">
                Constantly pushing boundaries to deliver cutting-edge solutions
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-[#4E6BDF] rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="h-6 w-6 text-white" />
              </div>
              <h4 className="font-semibold mb-2">Integrity</h4>
              <p className="text-sm text-muted-foreground">
                Building trust through transparency and honest communication
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-[#4E6BDF] rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="h-6 w-6 text-white" />
              </div>
              <h4 className="font-semibold mb-2">Excellence</h4>
              <p className="text-sm text-muted-foreground">
                Delivering exceptional quality in every project we undertake
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-[#4E6BDF] rounded-full flex items-center justify-center mx-auto mb-4">
                <Eye className="h-6 w-6 text-white" />
              </div>
              <h4 className="font-semibold mb-2">Vision</h4>
              <p className="text-sm text-muted-foreground">
                Seeing possibilities where others see challenges
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}