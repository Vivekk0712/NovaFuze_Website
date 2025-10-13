import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Badge } from "./ui/badge"
import { Button } from "./ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { Play, Clock, Eye, Calendar, ArrowRight } from "lucide-react"
import { ImageWithFallback } from "./figma/ImageWithFallback"

interface VideoContent {
  id: string
  title: string
  description: string
  posterImage: string
  duration: string
  author: {
    id: string
    name: string
    role: string
    avatar: string
  }
  publishDate: string
  views: string
  category: string
  tags: string[]
  videoUrl: string
  slug: string
  featured?: boolean
}

interface VlogsGridSectionProps {
  featured?: boolean
  limit?: number
}

export function VlogsGridSection({ featured = false, limit }: VlogsGridSectionProps) {
  // Sample video content data - in real app this would come from CMS
  const videoContent: VideoContent[] = [
    {
      id: "1",
      title: "Building a Full-Stack React App with Next.js 14 - Complete Tutorial",
      description: "Learn how to create a modern full-stack application using Next.js 14, TypeScript, and Tailwind CSS. We'll cover everything from setup to deployment.",
      posterImage: "https://images.unsplash.com/photo-1630442923896-244dd3717b35?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2RpbmclMjB0dXRvcmlhbCUyMHNjcmVlbiUyMHJlY29yZGluZ3xlbnwxfHx8fDE3NTgyMTMxNDB8MA&ixlib=rb-4.1.0&q=80&w=1080",
      duration: "45:32",
      author: {
        id: "1",
        name: "Arjun Mehta",
        role: "Lead Developer",
        avatar: "https://images.unsplash.com/photo-1739298061757-7a3339cee982?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHhwcm9mZXNzaW9uYWwlMjBidXNpbmVzcyUyMHBlcnNvbiUyMGhlYWRzaG90fGVufDF8fHx8MTc1ODE2NTE0OHww&ixlib=rb-4.1.0&q=80&w=1080"
      },
      publishDate: "2024-03-15",
      views: "12.5K",
      category: "Tutorial",
      tags: ["React", "Next.js", "TypeScript"],
      videoUrl: "https://example.com/video1",
      slug: "fullstack-react-nextjs-tutorial",
      featured: true
    },
    {
      id: "2",
      title: "AI Integration in Modern Web Apps - Live Coding Session",
      description: "Watch as we integrate AI capabilities into a web application using OpenAI API and create intelligent user experiences.",
      posterImage: "https://images.unsplash.com/photo-1735199854026-fe3ceb557f36?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aWRlbyUyMHByb2R1Y3Rpb24lMjBzdHVkaW8lMjBzZXR1cHxlbnwxfHx8fDE3NTgyMTMxMzd8MA&ixlib=rb-4.1.0&q=80&w=1080",
      duration: "38:15",
      author: {
        id: "2",
        name: "Priya Sharma",
        role: "AI Engineer",
        avatar: "https://images.unsplash.com/photo-1739298061757-7a3339cee982?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHhwcm9mZXNzaW9uYWwlMjBidXNpbmVzcyUyMHBlcnNvbiUyMGhlYWRzaG90fGVufDF8fHx8MTc1ODE2NTE0OHww&ixlib=rb-4.1.0&q=80&w=1080"
      },
      publishDate: "2024-03-12",
      views: "8.2K",
      category: "Live Coding",
      tags: ["AI", "JavaScript", "API Integration"],
      videoUrl: "https://example.com/video2",
      slug: "ai-integration-web-apps"
    },
    {
      id: "3",
      title: "Behind the Scenes: How We Built NovaFuze's Dashboard",
      description: "Get an inside look at our development process and the decisions behind building our analytics dashboard from scratch.",
      posterImage: "https://images.unsplash.com/photo-1582192904915-d89c7250b235?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNoJTIwcHJlc2VudGF0aW9uJTIwY29uZmVyZW5jZSUyMHNwZWFrZXJ8ZW58MXx8fHwxNzU4MjEzMTQ0fDA&ixlib=rb-4.1.0&q=80&w=1080",
      duration: "28:47",
      author: {
        id: "3",
        name: "Ravi Patel",
        role: "Product Manager",
        avatar: "https://images.unsplash.com/photo-1739298061757-7a3339cee982?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHhwcm9mZXNzaW9uYWwlMjBidXNpbmVzcyUyMHBlcnNvbiUyMGhlYWRzaG90fGVufDF8fHx8MTc1ODE2NTE0OHww&ixlib=rb-4.1.0&q=80&w=1080"
      },
      publishDate: "2024-03-10",
      views: "6.8K",
      category: "Behind the Scenes",
      tags: ["Product Development", "UI/UX", "Team"],
      videoUrl: "https://example.com/video3",
      slug: "behind-scenes-novafuze-dashboard"
    },
    {
      id: "4",
      title: "Web Performance Optimization: Speed Up Your React Apps",
      description: "Learn advanced techniques to optimize your React applications for better performance, including code splitting and lazy loading.",
      posterImage: "https://images.unsplash.com/photo-1630442923896-244dd3717b35?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWIlMjBkZXZlbG9wbWVudCUyMGxpdmVzdHJlYW0lMjBzZXR1cHxlbnwxfHx8fDE3NTgyMTMxNDd8MA&ixlib=rb-4.1.0&q=80&w=1080",
      duration: "35:20",
      author: {
        id: "4",
        name: "Sneha Reddy",
        role: "Senior Developer",
        avatar: "https://images.unsplash.com/photo-1739298061757-7a3339cee982?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHhwcm9mZXNzaW9uYWwlMjBidXNpbmVzcyUyMHBlcnNvbiUyMGhlYWRzaG90fGVufDF8fHx8MTc1ODE2NTE0OHww&ixlib=rb-4.1.0&q=80&w=1080"
      },
      publishDate: "2024-03-08",
      views: "9.1K",
      category: "Tutorial",
      tags: ["React", "Performance", "Optimization"],
      videoUrl: "https://example.com/video4",
      slug: "react-performance-optimization"
    },
    {
      id: "5",
      title: "Database Design Fundamentals for Web Developers",
      description: "Understanding database design principles and how to structure your data for scalable web applications.",
      posterImage: "https://images.unsplash.com/photo-1735199854026-fe3ceb557f36?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aWRlbyUyMHByb2R1Y3Rpb24lMjBzdHVkaW8lMjBzZXR1cHxlbnwxfHx8fDE3NTgyMTMxMzd8MA&ixlib=rb-4.1.0&q=80&w=1080",
      duration: "42:10",
      author: {
        id: "5",
        name: "Amit Singh",
        role: "Backend Engineer",
        avatar: "https://images.unsplash.com/photo-1739298061757-7a3339cee982?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHhwcm9mZXNzaW9uYWwlMjBidXNpbmVzcyUyMHBlcnNvbiUyMGhlYWRzaG90fGVufDF8fHx8MTc1ODE2NTE0OHww&ixlib=rb-4.1.0&q=80&w=1080"
      },
      publishDate: "2024-03-05",
      views: "7.3K",
      category: "Tutorial",
      tags: ["Database", "Backend", "Architecture"],
      videoUrl: "https://example.com/video5",
      slug: "database-design-fundamentals"
    },
    {
      id: "6",
      title: "Mobile-First Design Workshop: Creating Responsive UIs",
      description: "Join our design team as they walk through the process of creating mobile-first, responsive user interfaces.",
      posterImage: "https://images.unsplash.com/photo-1582192904915-d89c7250b235?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNoJTIwcHJlc2VudGF0aW9uJTIwY29uZmVyZW5jZSUyMHNwZWFrZXJ8ZW58MXx8fHwxNzU4MjEzMTQ0fDA&ixlib=rb-4.1.0&q=80&w=1080",
      duration: "31:55",
      author: {
        id: "6",
        name: "Kavya Jain",
        role: "UI/UX Designer",
        avatar: "https://images.unsplash.com/photo-1739298061757-7a3339cee982?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHhwcm9mZXNzaW9uYWwlMjBidXNpbmVzcyUyMHBlcnNvbiUyMGhlYWRzaG90fGVufDF8fHx8MTc1ODE2NTE0OHww&ixlib=rb-4.1.0&q=80&w=1080"
      },
      publishDate: "2024-03-03",
      views: "5.9K",
      category: "Workshop",
      tags: ["UI/UX", "Responsive Design", "Mobile"],
      videoUrl: "https://example.com/video6",
      slug: "mobile-first-design-workshop"
    }
  ]

  const displayVideos = limit ? videoContent.slice(0, limit) : videoContent
  const featuredVideo = featured ? videoContent.find(v => v.featured) || videoContent[0] : null

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-IN', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  }

  const handleWatchVideo = (slug: string) => {
    // In a real app, this would navigate to the video detail page
    window.location.href = `/vlogs/${slug}`
  }

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        {!featured && (
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Latest Videos
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Watch our latest tutorials, behind-the-scenes content, and tech talks 
              to level up your development skills.
            </p>
          </div>
        )}

        {/* Featured Video */}
        {featuredVideo && (
          <div className="mb-16">
            <div className="text-center mb-8">
              <Badge className="bg-[#4E6BDF] text-white mb-4">Featured Video</Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Must Watch</h2>
            </div>
            
            <Card className="border-0 shadow-xl overflow-hidden bg-white hover:shadow-2xl transition-shadow duration-300">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="relative overflow-hidden group cursor-pointer">
                  <ImageWithFallback
                    src={featuredVideo.posterImage}
                    alt={featuredVideo.title}
                    className="w-full h-64 lg:h-full object-cover rounded-2xl"
                  />
                  
                  {/* Dark overlay */}
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-colors duration-300 rounded-2xl"></div>
                  
                  {/* Play button overlay */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-20 h-20 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:bg-white group-hover:scale-110 transition-all duration-300 shadow-xl">
                      <Play className="h-8 w-8 text-[#4E6BDF] ml-1" />
                    </div>
                  </div>
                  
                  {/* Duration badge */}
                  <div className="absolute bottom-4 right-4 bg-black/80 text-white px-3 py-1 rounded-lg text-sm font-semibold">
                    {featuredVideo.duration}
                  </div>
                  
                  {/* Category badge */}
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-[#4E6BDF] text-white">
                      {featuredVideo.category}
                    </Badge>
                  </div>
                </div>
                
                <CardContent className="p-8 flex flex-col justify-between">
                  <div>
                    <CardTitle className="text-2xl lg:text-3xl mb-4 hover:text-[#4E6BDF] transition-colors cursor-pointer leading-tight">
                      {featuredVideo.title}
                    </CardTitle>
                    <CardDescription className="text-lg mb-6 leading-relaxed">
                      {featuredVideo.description}
                    </CardDescription>
                    
                    <div className="flex flex-wrap gap-2 mb-6">
                      {featuredVideo.tags.map((tag, index) => (
                        <Badge key={index} variant="secondary" className="bg-[#F1F4FD] text-[#4E6BDF]">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex items-center gap-4 mb-6">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={featuredVideo.author.avatar} alt={featuredVideo.author.name} />
                        <AvatarFallback>{featuredVideo.author.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-semibold">{featuredVideo.author.name}</div>
                        <div className="text-sm text-muted-foreground">{featuredVideo.author.role}</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-6 text-sm text-muted-foreground mb-6">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>{formatDate(featuredVideo.publishDate)}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Eye className="h-4 w-4" />
                        <span>{featuredVideo.views} views</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>{featuredVideo.duration}</span>
                      </div>
                    </div>
                    
                    <Button 
                      className="bg-[#4E6BDF] hover:bg-[#3D51D3] w-full lg:w-auto"
                      onClick={() => handleWatchVideo(featuredVideo.slug)}
                    >
                      <Play className="mr-2 h-4 w-4" />
                      Watch Now
                    </Button>
                  </div>
                </CardContent>
              </div>
            </Card>
          </div>
        )}

        {/* Videos Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayVideos.map((video, index) => {
            // Skip featured video in grid if it's already shown
            if (featured && video.featured) return null
            
            return (
              <Card 
                key={video.id}
                className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-0 shadow-lg overflow-hidden bg-white rounded-2xl"
              >
                {/* Video Poster */}
                <div className="relative overflow-hidden cursor-pointer" onClick={() => handleWatchVideo(video.slug)}>
                  <ImageWithFallback
                    src={video.posterImage}
                    alt={video.title}
                    className="w-full h-48 object-cover rounded-2xl"
                  />
                  
                  {/* Dark overlay */}
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-colors duration-300 rounded-2xl"></div>
                  
                  {/* Play button overlay */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-16 h-16 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                      <Play className="h-6 w-6 text-[#4E6BDF] ml-1" />
                    </div>
                  </div>
                  
                  {/* Duration badge */}
                  <div className="absolute bottom-3 right-3 bg-black/80 text-white px-2 py-1 rounded text-xs font-semibold">
                    {video.duration}
                  </div>
                  
                  {/* Category badge */}
                  <div className="absolute top-3 left-3">
                    <Badge className="bg-[#4E6BDF] text-white text-xs">
                      {video.category}
                    </Badge>
                  </div>
                </div>

                <CardHeader className="pb-3">
                  <CardTitle className="text-lg mb-2 group-hover:text-[#4E6BDF] transition-colors cursor-pointer leading-tight line-clamp-2">
                    {video.title}
                  </CardTitle>
                  <CardDescription className="text-sm leading-relaxed line-clamp-3">
                    {video.description}
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="pt-0">
                  {/* Tags */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {video.tags.slice(0, 2).map((tag, tagIndex) => (
                      <Badge key={tagIndex} variant="outline" className="text-xs border-[#4E6BDF] text-[#4E6BDF]">
                        {tag}
                      </Badge>
                    ))}
                    {video.tags.length > 2 && (
                      <Badge variant="outline" className="text-xs border-[#4E6BDF] text-[#4E6BDF]">
                        +{video.tags.length - 2}
                      </Badge>
                    )}
                  </div>

                  {/* Author Info */}
                  <div className="flex items-center gap-3 mb-4">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={video.author.avatar} alt={video.author.name} />
                      <AvatarFallback className="text-xs">{video.author.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium text-sm">{video.author.name}</div>
                      <div className="text-xs text-muted-foreground">{video.author.role}</div>
                    </div>
                  </div>

                  {/* Meta Info */}
                  <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      <span>{formatDate(video.publishDate)}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Eye className="h-3 w-3" />
                      <span>{video.views}</span>
                    </div>
                  </div>
                  
                  <Button 
                    className="w-full bg-[#4E6BDF] hover:bg-[#3D51D3] group-hover:bg-[#333FC2] justify-between text-sm"
                    onClick={() => handleWatchVideo(video.slug)}
                  >
                    <Play className="h-3 w-3 mr-2" />
                    Watch Video
                    <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Load More Button */}
        {!limit && (
          <div className="text-center mt-12">
            <Button 
              size="lg" 
              variant="outline" 
              className="border-[#4E6BDF] text-[#4E6BDF] hover:bg-[#4E6BDF] hover:text-white"
            >
              Load More Videos
            </Button>
          </div>
        )}
      </div>
    </section>
  )
}