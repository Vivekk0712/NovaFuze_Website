import { Card, CardContent } from "./ui/card"
import { Badge } from "./ui/badge"
import { Star, Quote } from "lucide-react"
import { ImageWithFallback } from "./figma/ImageWithFallback"

interface Testimonial {
  id: string
  name: string
  role: string
  company: string
  image: string
  quote: string
  rating: number
  project: string
}

interface ServiceTestimonialsProps {
  title: string
  description: string
  testimonials: Testimonial[]
}

export function ServiceTestimonials({ title, description, testimonials }: ServiceTestimonialsProps) {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Client Success Stories
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            {description}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <Card 
              key={testimonial.id}
              className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white relative overflow-hidden"
            >
              <div className="absolute top-4 right-4 text-[#4E6BDF] opacity-20">
                <Quote className="h-8 w-8" />
              </div>
              
              <CardContent className="p-6">
                {/* Rating */}
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>

                {/* Quote */}
                <blockquote className="text-muted-foreground mb-6 leading-relaxed italic">
                  "{testimonial.quote}"
                </blockquote>

                {/* Client Info */}
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden">
                    <ImageWithFallback
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                    <div className="text-sm font-medium text-[#4E6BDF]">{testimonial.company}</div>
                  </div>
                </div>

                {/* Project Badge */}
                <div className="mt-4">
                  <Badge variant="secondary" className="text-xs bg-[#F1F4FD] text-[#4E6BDF]">
                    {testimonial.project}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 bg-[#F1F4FD] rounded-3xl p-8 lg:p-12">
          <div className="text-center mb-8">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">Trusted by Industry Leaders</h3>
            <p className="text-lg text-muted-foreground">
              Join the companies that trust NovaFuze-Tech with their digital transformation
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="flex items-center justify-center gap-1 mb-2">
                <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                <span className="text-2xl font-bold text-[#4E6BDF]">4.9/5</span>
              </div>
              <div className="text-muted-foreground">Average Rating</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-[#4E6BDF] mb-2">3+</div>
              <div className="text-muted-foreground">Happy Clients</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-[#4E6BDF] mb-2">100%</div>
              <div className="text-muted-foreground">Project Success Rate</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}