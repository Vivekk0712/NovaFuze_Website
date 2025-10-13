import { useEffect, useState } from "react"
import { Card, CardContent } from "./ui/card"
import { Badge } from "./ui/badge"
import { Button } from "./ui/button"
import { ChevronLeft, ChevronRight, Star, Quote, Eye, EyeOff } from "lucide-react"
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
  approved: boolean // Admin toggle for approval
}

interface TestimonialsCarouselProps {
  showAdminControls?: boolean // Hidden in Figma, shown for admin users
}

export function TestimonialsCarousel({ showAdminControls = false }: TestimonialsCarouselProps) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  
  const [testimonials, setTestimonials] = useState<Testimonial[]>([
    {
      id: "1",
      name: "Sunjay",
      role: "TEDx License Holder",
      company: "TEDxGCEM",
      image: "https://images.unsplash.com/photo-1556157382-97eda2d62296?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBidXNpbmVzcyUyMG1hbiUyMGhlYWRzaG90fGVufDF8fHx8MTc1ODEyOTAwNHww&ixlib=rb-4.1.0&q=80&w=1080",
      quote: "NovaFuze-Tech created an exceptional website for TEDxGCEM that perfectly captures our vision and mission. The platform is user-friendly, engaging, and has significantly improved our event registration and community engagement. Outstanding work!",
      rating: 5,
      project: "TEDxGCEM Website",
      approved: true
    },
    {
      id: "2",
      name: "Mohan",
      role: "Academy Owner",
      company: "HFB Badminton Academy, Hoodi",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcG9ydHMlMjBjb2FjaCUyMGhlYWRzaG90fGVufDF8fHx8MTc1ODEyOTAwNHww&ixlib=rb-4.1.0&q=80&w=1080",
      quote: "As a proud owner of a badminton academy in Hoodi, I needed a professional online presence. NovaFuze-Tech delivered beyond expectations with a comprehensive academy management system that handles everything from student registrations to scheduling. Highly recommended!",
      rating: 5,
      project: "HFB Academy Website",
      approved: true
    },
    {
      id: "3",
      name: "Balaji",
      role: "Founder & Designer",
      company: "Mono Mode, Whitefield",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3VuZyUyMGVudHJlcHJlbmV1ciUyMGhlYWRzaG90fGVufDF8fHx8MTc1ODEyOTAwNHww&ixlib=rb-4.1.0&q=80&w=1080",
      quote: "As a young entrepreneur from Whitefield focused on unique design clothing solutions for Gen-Z, I needed a website that truly represents our brand. NovaFuze-Tech created a stunning, modern platform that perfectly captures our aesthetic and has boosted our online sales tremendously!",
      rating: 5,
      project: "Mono Mode E-commerce",
      approved: true
    }
  ])

  // Filter approved testimonials for public display
  const approvedTestimonials = showAdminControls 
    ? testimonials 
    : testimonials.filter(t => t.approved)

  // Get slides per view based on screen size
  const getSlidesPerView = () => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth >= 1024) return 3 // Desktop: 3 slides
      if (window.innerWidth >= 768) return 2  // Tablet: 2 slides
      return 1 // Mobile: 1 slide
    }
    return 3 // Default to desktop
  }

  const [slidesPerView, setSlidesPerView] = useState(getSlidesPerView())

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setSlidesPerView(getSlidesPerView())
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentSlide(prev => {
        const maxSlide = Math.max(0, approvedTestimonials.length - slidesPerView)
        return prev >= maxSlide ? 0 : prev + 1
      })
    }, 4000)

    return () => clearInterval(interval)
  }, [isAutoPlaying, approvedTestimonials.length, slidesPerView])

  const toggleApproval = (id: string) => {
    setTestimonials(prev => 
      prev.map(testimonial => 
        testimonial.id === id 
          ? { ...testimonial, approved: !testimonial.approved }
          : testimonial
      )
    )
  }

  const nextSlide = () => {
    const maxSlide = Math.max(0, approvedTestimonials.length - slidesPerView)
    setCurrentSlide(prev => prev >= maxSlide ? 0 : prev + 1)
  }

  const prevSlide = () => {
    const maxSlide = Math.max(0, approvedTestimonials.length - slidesPerView)
    setCurrentSlide(prev => prev <= 0 ? maxSlide : prev - 1)
  }

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  const maxSlide = Math.max(0, approvedTestimonials.length - slidesPerView)

  return (
    <section className="py-24 bg-background overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            What Our Clients Say
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Don't just take our word for it. Here's what our clients have to say about 
            working with NovaFuze-Tech and the results we've delivered.
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative">
          {/* Custom Navigation Arrows */}
          <Button
            variant="outline"
            size="icon"
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white shadow-lg border-[#4E6BDF] text-[#4E6BDF] hover:bg-[#4E6BDF] hover:text-white transition-all duration-300"
            onClick={prevSlide}
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          
          <Button
            variant="outline"
            size="icon"
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white shadow-lg border-[#4E6BDF] text-[#4E6BDF] hover:bg-[#4E6BDF] hover:text-white transition-all duration-300"
            onClick={nextSlide}
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
          >
            <ChevronRight className="h-5 w-5" />
          </Button>

          {/* Testimonials Carousel */}
          <div 
            className="mx-12"
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
          >
            <div className="overflow-hidden">
              <div 
                className="flex transition-transform duration-700 ease-in-out"
                style={{ 
                  transform: `translateX(-${currentSlide * (100 / slidesPerView)}%)`,
                  width: `${(approvedTestimonials.length / slidesPerView) * 100}%`
                }}
              >
                {approvedTestimonials.map((testimonial) => (
                  <div 
                    key={testimonial.id} 
                    className="px-4"
                    style={{ width: `${100 / approvedTestimonials.length}%` }}
                  >
                    <div className="relative">
                      {/* Speech Bubble Card */}
                      <Card className="relative bg-white border-2 border-[#4E6BDF]/20 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 rounded-3xl overflow-hidden group h-full">
                        {/* Blue accent border - enhanced on hover */}
                        <div className="absolute inset-0 bg-gradient-to-br from-[#4E6BDF]/5 to-transparent group-hover:from-[#4E6BDF]/10 transition-all duration-500 rounded-3xl"></div>
                        
                        {/* Top border accent */}
                        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#4E6BDF] via-[#3D51D3] to-[#333FC2]"></div>
                        
                        {/* Quote icon */}
                        <div className="absolute top-6 right-6 text-[#4E6BDF] opacity-20 group-hover:opacity-40 transition-opacity duration-300">
                          <Quote className="h-12 w-12" />
                        </div>

                        <CardContent className="p-8 relative z-10 h-full flex flex-col">
                          {/* Rating Stars */}
                          <div className="flex items-center gap-1 mb-6">
                            {[...Array(testimonial.rating)].map((_, i) => (
                              <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                            ))}
                          </div>

                          {/* Quote Text */}
                          <blockquote className="text-muted-foreground mb-8 leading-relaxed text-lg italic relative flex-grow">
                            "{testimonial.quote}"
                          </blockquote>

                          {/* Client Info */}
                          <div className="flex items-center gap-4 mb-6">
                            <div className="relative">
                              <div className="w-16 h-16 rounded-full overflow-hidden border-4 border-[#4E6BDF]/20 group-hover:border-[#4E6BDF]/40 transition-all duration-300">
                                <ImageWithFallback
                                  src={testimonial.image}
                                  alt={testimonial.name}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              {/* Online indicator */}
                              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-4 border-white"></div>
                            </div>
                            
                            <div className="flex-1">
                              <div className="font-semibold text-lg">{testimonial.name}</div>
                              <div className="text-muted-foreground">{testimonial.role}</div>
                              <div className="font-medium text-[#4E6BDF]">{testimonial.company}</div>
                            </div>
                          </div>

                          {/* Project Badge and Admin Controls */}
                          <div className="flex items-center justify-between">
                            <Badge 
                              variant="secondary" 
                              className="bg-[#F1F4FD] text-[#4E6BDF] border border-[#4E6BDF]/20 hover:bg-[#4E6BDF] hover:text-white transition-all duration-300"
                            >
                              {testimonial.project}
                            </Badge>

                            {/* Admin Controls */}
                            {showAdminControls && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => toggleApproval(testimonial.id)}
                                className={`ml-2 ${
                                  testimonial.approved 
                                    ? 'text-green-600 hover:text-green-700' 
                                    : 'text-red-600 hover:text-red-700'
                                }`}
                              >
                                {testimonial.approved ? (
                                  <Eye className="h-4 w-4" />
                                ) : (
                                  <EyeOff className="h-4 w-4" />
                                )}
                              </Button>
                            )}
                          </div>
                        </CardContent>

                        {/* Speech Bubble Tail */}
                        <div className="absolute -bottom-4 left-8 w-8 h-8 bg-white border-r-2 border-b-2 border-[#4E6BDF]/20 transform rotate-45 group-hover:border-[#4E6BDF]/40 transition-all duration-300"></div>
                      </Card>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Custom Dot Indicators */}
          <div className="flex justify-center gap-2 mt-8">
            {Array.from({ length: maxSlide + 1 }).map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  currentSlide === index ? 'bg-[#4E6BDF]' : 'bg-gray-300'
                }`}
                onMouseEnter={() => setIsAutoPlaying(false)}
                onMouseLeave={() => setIsAutoPlaying(true)}
              />
            ))}
          </div>
        </div>

        {/* Statistics */}
        <div className="text-center mt-16">
          <div className="flex flex-wrap items-center justify-center gap-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="font-medium">4.9/5 Average Rating</span>
            </div>
            <div className="w-1 h-1 rounded-full bg-muted-foreground"></div>
            <div>
              <span className="font-medium">3+ Happy Clients</span>
            </div>
            <div className="w-1 h-1 rounded-full bg-muted-foreground"></div>
            <div>
              <span className="font-medium">100% Project Success Rate</span>
            </div>
          </div>
        </div>

        {/* Developer Note for Admin Controls */}
        {showAdminControls && (
          <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-sm text-yellow-800">
              <strong>Developer Note:</strong> Admin controls are visible for content moderation. 
              In production, set <code>showAdminControls=false</code> for public display.
            </p>
          </div>
        )}
      </div>
    </section>
  )
}