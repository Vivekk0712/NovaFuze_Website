import { Header } from "./Header"
import { Footer } from "./Footer"
import { BlogBreadcrumb } from "./BlogBreadcrumb"
import { Card, CardContent } from "./ui/card"
import { Badge } from "./ui/badge"
import { Button } from "./ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { Separator } from "./ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs"
import { 
  Calendar, 
  Clock, 
  Share2, 
  Twitter, 
  Facebook, 
  Linkedin, 
  Copy,
  Play,
  Eye,
  ThumbsUp,
  MessageSquare,
  Download,
  ArrowRight,
  User,
  MapPin,
  Mail
} from "lucide-react"
import { ImageWithFallback } from "./figma/ImageWithFallback"
import { useEffect } from "react"

interface VlogDetailPageProps {
  slug: string
}

export function VlogDetailPage({ slug }: VlogDetailPageProps) {
  // Sample video data - in real app this would come from CMS/API based on slug
  const videoData = {
    id: "1",
    title: "Building a Full-Stack React App with Next.js 14 - Complete Tutorial",
    description: "In this comprehensive tutorial, we'll walk through building a complete full-stack application using Next.js 14, TypeScript, and Tailwind CSS. This video covers everything from initial setup to deployment, including authentication, database integration, and best practices for modern web development.",
    posterImage: "https://images.unsplash.com/photo-1630442923896-244dd3717b35?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2RpbmclMjB0dXRvcmlhbCUyMHNjcmVlbiUyMHJlY29yZGluZ3xlbnwxfHx8fDE3NTgyMTMxNDB8MA&ixlib=rb-4.1.0&q=80&w=1080",
    videoUrl: "https://example.com/video.mp4", // Mock video URL
    duration: "45:32",
    author: {
      id: "1",
      name: "Arjun Mehta",
      role: "Lead Developer",
      avatar: "https://images.unsplash.com/photo-1739298061757-7a3339cee982?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHhwcm9mZXNzaW9uYWwlMjBidXNpbmVzcyUyMHBlcnNvbiUyMGhlYWRzaG90fGVufDF8fHx8MTc1ODE2NTE0OHww&ixlib=rb-4.1.0&q=80&w=1080",
      bio: "Arjun is our Lead Developer with 8+ years of experience in modern web technologies. He specializes in React, Next.js, and full-stack development. When he's not coding, Arjun enjoys creating educational content and mentoring junior developers.",
      location: "Bangalore, India",
      email: "arjun@novafuze.in",
      social: {
        twitter: "@arjunmehta_dev",
        linkedin: "arjun-mehta-ai"
      }
    },
    publishDate: "2024-03-15",
    views: "12.5K",
    likes: "892",
    comments: "156",
    category: "Tutorial",
    tags: ["React", "Next.js", "TypeScript", "Full-Stack"],
    slug: "fullstack-react-nextjs-tutorial",
    transcript: `
      [00:00] Welcome everyone to this complete Next.js 14 tutorial. Today we're going to build a full-stack application from scratch.

      [00:30] First, let's set up our development environment. Make sure you have Node.js version 18 or higher installed on your machine.

      [01:00] We'll start by creating a new Next.js project using the create-next-app command. I'll show you the latest setup options and explain each choice.

      [02:15] Now let's configure TypeScript. TypeScript provides excellent developer experience with type safety and better IDE support.

      [03:30] Setting up Tailwind CSS for styling. Tailwind is a utility-first CSS framework that makes styling fast and consistent.

      [05:00] Let's create our project structure. We'll organize our code into logical folders for components, pages, and utilities.

      [07:20] Building our first component - the Header. We'll make it responsive and add navigation functionality.

      [10:45] Creating the authentication system. We'll implement login and signup functionality with proper error handling.

      [15:30] Database integration with Prisma. Setting up our database schema and creating the necessary models.

      [20:00] Building the main dashboard. This will showcase the core functionality of our application.

      [25:15] Implementing API routes. We'll create RESTful endpoints for our frontend to consume.

      [30:30] Adding state management with React Context. Managing global state in a clean and efficient way.

      [35:45] Styling and responsive design. Making sure our app looks great on all device sizes.

      [40:00] Testing our application. Writing unit tests and integration tests to ensure code quality.

      [43:30] Deployment to Vercel. The easiest way to deploy Next.js applications with automatic CI/CD.

      [45:00] Wrap up and next steps. Resources for continuing your Next.js journey.
    `,
    chapters: [
      { time: "00:00", title: "Introduction & Overview" },
      { time: "01:00", title: "Project Setup" },
      { time: "03:30", title: "TypeScript Configuration" },
      { time: "05:00", title: "Project Structure" },
      { time: "07:20", title: "Building Components" },
      { time: "10:45", title: "Authentication System" },
      { time: "15:30", title: "Database Integration" },
      { time: "20:00", title: "Main Dashboard" },
      { time: "25:15", title: "API Routes" },
      { time: "30:30", title: "State Management" },
      { time: "35:45", title: "Responsive Design" },
      { time: "40:00", title: "Testing" },
      { time: "43:30", title: "Deployment" }
    ]
  }

  // Related videos
  const relatedVideos = [
    {
      id: "2",
      title: "AI Integration in Modern Web Apps - Live Coding Session",
      description: "Watch as we integrate AI capabilities into a web application using OpenAI API.",
      posterImage: "https://images.unsplash.com/photo-1735199854026-fe3ceb557f36?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aWRlbyUyMHByb2R1Y3Rpb24lMjBzdHVkaW8lMjBzZXR1cHxlbnwxfHx8fDE3NTgyMTMxMzd8MA&ixlib=rb-4.1.0&q=80&w=1080",
      slug: "ai-integration-web-apps",
      duration: "38:15"
    },
    {
      id: "3",
      title: "Web Performance Optimization: Speed Up Your React Apps",
      description: "Learn advanced techniques to optimize your React applications for better performance.",
      posterImage: "https://images.unsplash.com/photo-1630442923896-244dd3717b35?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWIlMjBkZXZlbG9wbWVudCUyMGxpdmVzdHJlYW0lMjBzZXR1cHxlbnwxfHx8fDE3NTgyMTMxNDd8MA&ixlib=rb-4.1.0&q=80&w=1080",
      slug: "react-performance-optimization",
      duration: "35:20"
    },
    {
      id: "4",
      title: "Database Design Fundamentals for Web Developers",
      description: "Understanding database design principles and data structure for scalable applications.",
      posterImage: "https://images.unsplash.com/photo-1735199854026-fe3ceb557f36?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aWRlbyUyMHByb2R1Y3Rpb24lMjBzdHVkaW8lMjBzZXR1cHxlbnwxfHx8fDE3NTgyMTMxMzd8MA&ixlib=rb-4.1.0&q=80&w=1080",
      slug: "database-design-fundamentals",
      duration: "42:10"
    }
  ]

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-IN', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  }

  const handleShare = (platform: string) => {
    const url = window.location.href
    const title = videoData.title
    
    switch (platform) {
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`, '_blank')
        break
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank')
        break
      case 'linkedin':
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank')
        break
      case 'copy':
        navigator.clipboard.writeText(url)
        // Could show a toast notification here
        break
    }
  }

  const jumpToChapter = (time: string) => {
    // In a real implementation, this would seek to the specific time in the video player
    console.log(`Jumping to ${time}`)
  }

  // SEO Meta tags
  useEffect(() => {
    document.title = `${videoData.title} | NovaFuze Vlogs`
    
    const metaDescription = document.querySelector('meta[name="description"]')
    if (metaDescription) {
      metaDescription.setAttribute('content', videoData.description)
    } else {
      const meta = document.createElement('meta')
      meta.name = 'description'
      meta.content = videoData.description
      document.head.appendChild(meta)
    }
  }, [videoData])

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Breadcrumb */}
      <BlogBreadcrumb 
        postTitle={videoData.title}
        category={videoData.category}
      />
      
      <main className="py-12">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-6xl mx-auto">
            {/* Video Player Section */}
            <div className="mb-12">
              {/* Video Player */}
              <div className="relative mb-8 rounded-3xl overflow-hidden shadow-2xl bg-black">
                <div className="aspect-video relative">
                  {/* Mock Video Player */}
                  <ImageWithFallback
                    src={videoData.posterImage}
                    alt={videoData.title}
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Dark overlay */}
                  <div className="absolute inset-0 bg-black/60"></div>
                  
                  {/* Play button overlay */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-24 h-24 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white hover:scale-110 transition-all duration-300 shadow-xl cursor-pointer">
                      <Play className="h-10 w-10 text-[#4E6BDF] ml-1" />
                    </div>
                  </div>
                  
                  {/* Duration badge */}
                  <div className="absolute bottom-6 right-6 bg-black/80 text-white px-4 py-2 rounded-lg font-semibold">
                    {videoData.duration}
                  </div>

                  {/* Video controls overlay */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/50 to-transparent p-6">
                    <div className="text-white">
                      <p className="text-sm opacity-80 mb-2">Click to play video</p>
                      <div className="w-full h-1 bg-white/30 rounded-full">
                        <div className="w-0 h-full bg-[#4E6BDF] rounded-full transition-all duration-300"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Video Info */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Content */}
                <div className="lg:col-span-2">
                  <div className="mb-6">
                    <div className="flex items-center gap-4 mb-4">
                      <Badge className="bg-[#4E6BDF] text-white">
                        {videoData.category}
                      </Badge>
                      <div className="flex flex-wrap gap-2">
                        {videoData.tags.map((tag, index) => (
                          <Badge key={index} variant="secondary" className="bg-[#F1F4FD] text-[#4E6BDF]">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 leading-tight">
                      {videoData.title}
                    </h1>

                    {/* Video Stats */}
                    <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground mb-6">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        <span>{formatDate(videoData.publishDate)}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Eye className="h-4 w-4" />
                        <span>{videoData.views} views</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        <span>{videoData.duration}</span>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap items-center gap-4 mb-8">
                      <Button className="bg-[#4E6BDF] hover:bg-[#3D51D3]">
                        <ThumbsUp className="mr-2 h-4 w-4" />
                        Like ({videoData.likes})
                      </Button>
                      <Button variant="outline">
                        <MessageSquare className="mr-2 h-4 w-4" />
                        Comments ({videoData.comments})
                      </Button>
                      <Button variant="outline">
                        <Download className="mr-2 h-4 w-4" />
                        Download
                      </Button>
                      
                      {/* Share Buttons */}
                      <div className="flex items-center gap-2 ml-auto">
                        <span className="text-sm font-medium">Share:</span>
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-8 w-8 p-0"
                          onClick={() => handleShare('twitter')}
                        >
                          <Twitter className="h-3 w-3" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-8 w-8 p-0"
                          onClick={() => handleShare('facebook')}
                        >
                          <Facebook className="h-3 w-3" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-8 w-8 p-0"
                          onClick={() => handleShare('linkedin')}
                        >
                          <Linkedin className="h-3 w-3" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-8 w-8 p-0"
                          onClick={() => handleShare('copy')}
                        >
                          <Copy className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Video Description & Transcript */}
                  <Tabs defaultValue="description" className="w-full">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="description">Description</TabsTrigger>
                      <TabsTrigger value="transcript">Transcript</TabsTrigger>
                      <TabsTrigger value="chapters">Chapters</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="description" className="mt-6">
                      <Card className="border-0 shadow-lg">
                        <CardContent className="p-6">
                          <div className="prose prose-lg max-w-none" style={{ color: 'var(--foreground)' }}>
                            <p className="leading-relaxed">{videoData.description}</p>
                          </div>
                        </CardContent>
                      </Card>
                    </TabsContent>
                    
                    <TabsContent value="transcript" className="mt-6">
                      <Card className="border-0 shadow-lg">
                        <CardContent className="p-6">
                          <div className="prose prose-lg max-w-none" style={{ color: 'var(--foreground)' }}>
                            <pre className="whitespace-pre-wrap font-sans leading-relaxed text-sm">
                              {videoData.transcript}
                            </pre>
                          </div>
                        </CardContent>
                      </Card>
                    </TabsContent>
                    
                    <TabsContent value="chapters" className="mt-6">
                      <Card className="border-0 shadow-lg">
                        <CardContent className="p-6">
                          <div className="space-y-3">
                            {videoData.chapters.map((chapter, index) => (
                              <div 
                                key={index}
                                className="flex items-center gap-4 p-3 rounded-lg hover:bg-[#F1F4FD] cursor-pointer transition-colors"
                                onClick={() => jumpToChapter(chapter.time)}
                              >
                                <div className="text-sm font-mono text-[#4E6BDF] font-semibold min-w-[60px]">
                                  {chapter.time}
                                </div>
                                <div className="flex-1">
                                  <h4 className="font-medium">{chapter.title}</h4>
                                </div>
                                <Play className="h-4 w-4 text-[#4E6BDF]" />
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    </TabsContent>
                  </Tabs>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                  {/* Author Info */}
                  <Card className="border-0 shadow-lg">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4 mb-4">
                        <Avatar className="h-16 w-16">
                          <AvatarImage src={videoData.author.avatar} alt={videoData.author.name} />
                          <AvatarFallback className="text-lg">{videoData.author.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg mb-1">{videoData.author.name}</h3>
                          <p className="text-muted-foreground text-sm mb-3">{videoData.author.role}</p>
                          <Button size="sm" className="bg-[#4E6BDF] hover:bg-[#3D51D3] w-full">
                            Subscribe
                          </Button>
                        </div>
                      </div>
                      
                      <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                        {videoData.author.bio}
                      </p>
                      
                      <div className="flex flex-col gap-2 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4" />
                          <span>{videoData.author.location}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Mail className="h-4 w-4" />
                          <a href={`mailto:${videoData.author.email}`} className="text-[#4E6BDF] hover:underline">
                            {videoData.author.email}
                          </a>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Related Videos */}
                  <Card className="border-0 shadow-lg">
                    <CardContent className="p-6">
                      <h3 className="font-semibold text-lg mb-4">Related Videos</h3>
                      <div className="space-y-4">
                        {relatedVideos.map((video) => (
                          <div 
                            key={video.id}
                            className="flex gap-3 cursor-pointer group"
                            onClick={() => window.location.href = `/vlogs/${video.slug}`}
                          >
                            <div className="relative flex-shrink-0">
                              <ImageWithFallback
                                src={video.posterImage}
                                alt={video.title}
                                className="w-24 h-16 object-cover rounded-lg"
                              />
                              <div className="absolute inset-0 bg-black/30 rounded-lg group-hover:bg-black/50 transition-colors duration-300"></div>
                              <div className="absolute inset-0 flex items-center justify-center">
                                <Play className="h-4 w-4 text-white" />
                              </div>
                              <div className="absolute bottom-1 right-1 bg-black/80 text-white px-1 text-xs rounded">
                                {video.duration}
                              </div>
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="font-medium text-sm line-clamp-2 group-hover:text-[#4E6BDF] transition-colors">
                                {video.title}
                              </h4>
                              <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                                {video.description}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  )
}