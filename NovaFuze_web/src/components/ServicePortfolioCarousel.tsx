import { Card, CardContent } from "./ui/card"
import { Badge } from "./ui/badge"
import { Button } from "./ui/button"
import { ArrowLeft, ArrowRight, ExternalLink } from "lucide-react"
import { ImageWithFallback } from "./figma/ImageWithFallback"
import { useState } from "react"

interface PortfolioProject {
  id: string
  title: string
  client: string
  description: string
  image: string
  tags: string[]
  results: {
    metric: string
    value: string
  }[]
  link: string
}

interface ServicePortfolioCarouselProps {
  title: string
  description: string
  projects: PortfolioProject[]
}

export function ServicePortfolioCarousel({ title, description, projects }: ServicePortfolioCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === projects.length - 1 ? 0 : prevIndex + 1
    )
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? projects.length - 1 : prevIndex - 1
    )
  }

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }

  if (!projects || projects.length === 0) {
    return null
  }

  return (
    <section className="py-24 bg-[#F1F4FD]">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Recent Portfolio
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            {description}
          </p>
        </div>

        <div className="relative">
          {/* Main Carousel */}
          <div className="overflow-hidden rounded-3xl">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {projects.map((project, index) => (
                <div key={project.id} className="w-full flex-shrink-0">
                  <Card className="border-0 shadow-xl overflow-hidden bg-white mx-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2">
                      {/* Project Image */}
                      <div className="relative overflow-hidden">
                        <ImageWithFallback
                          src={project.image}
                          alt={project.title}
                          className="w-full h-64 lg:h-full object-cover hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                        <div className="absolute bottom-4 left-4">
                          <Badge className="bg-white/90 text-gray-800">
                            {project.client}
                          </Badge>
                        </div>
                      </div>

                      {/* Project Details */}
                      <CardContent className="p-8 flex flex-col justify-between">
                        <div>
                          <h3 className="text-2xl font-bold mb-3">{project.title}</h3>
                          <p className="text-muted-foreground mb-6 leading-relaxed">
                            {project.description}
                          </p>

                          {/* Tags */}
                          <div className="flex flex-wrap gap-2 mb-6">
                            {project.tags.map((tag, idx) => (
                              <Badge key={idx} variant="secondary" className="bg-[#F1F4FD] text-[#4E6BDF]">
                                {tag}
                              </Badge>
                            ))}
                          </div>

                          {/* Results */}
                          <div className="grid grid-cols-2 gap-4 mb-6">
                            {project.results.map((result, idx) => (
                              <div key={idx} className="text-center p-3 bg-[#F1F4FD] rounded-lg">
                                <div className="text-xl font-bold text-[#4E6BDF]">{result.value}</div>
                                <div className="text-xs text-muted-foreground">{result.metric}</div>
                              </div>
                            ))}
                          </div>
                        </div>

                        <Button 
                          className="w-full bg-[#4E6BDF] hover:bg-[#3D51D3]"
                          onClick={() => window.open(project.link, '_blank')}
                        >
                          View Case Study
                          <ExternalLink className="ml-2 h-4 w-4" />
                        </Button>
                      </CardContent>
                    </div>
                  </Card>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows */}
          <Button
            variant="outline"
            size="icon"
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white border-[#4E6BDF] text-[#4E6BDF] z-10"
            onClick={prevSlide}
            disabled={projects.length <= 1}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white border-[#4E6BDF] text-[#4E6BDF] z-10"
            onClick={nextSlide}
            disabled={projects.length <= 1}
          >
            <ArrowRight className="h-4 w-4" />
          </Button>

          {/* Dot Indicators */}
          {projects.length > 1 && (
            <div className="flex justify-center space-x-2 mt-8">
              {projects.map((_, index) => (
                <button
                  key={index}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentIndex ? 'bg-[#4E6BDF]' : 'bg-gray-300'
                  }`}
                  onClick={() => goToSlide(index)}
                />
              ))}
            </div>
          )}
        </div>

        {/* View All Portfolio CTA */}
        <div className="text-center mt-12">
          <Button size="lg" variant="outline" className="border-[#4E6BDF] text-[#4E6BDF] hover:bg-[#4E6BDF] hover:text-white">
            View Full Portfolio
          </Button>
        </div>
      </div>
    </section>
  )
}