import { Button } from "./ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Badge } from "./ui/badge"
import { ArrowRight, Calendar, Clock, User } from "lucide-react"
import { ImageWithFallback } from "./figma/ImageWithFallback"

export function BlogSection() {
  const blogPosts = [
    {
      title: "The Future of AI-Powered Web Development in 2025",
      excerpt: "Explore how AI is revolutionizing web development, from automated code generation to intelligent UX optimization and the tools shaping the industry.",
      image: "https://images.unsplash.com/photo-1557324232-b8917d3c3dcb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHx3ZWIlMjBkZXZlbG9wbWVudCUyMGNvZGluZyUyMGNvbXB1dGVyfGVufDF8fHx8MTc1ODE2MTMzOXww&ixlib=rb-4.1.0&q=80&w=1080",
      category: "AI/ML",
      author: "Vamsi Krishna",
      date: "Jan 15, 2025",
      readTime: "8 min read",
      slug: "ai-powered-web-development-2025"
    },
    {
      title: "Building Scalable SaaS Applications: Best Practices",
      excerpt: "Learn the essential architectural patterns and technologies for building SaaS applications that can scale from MVP to enterprise-level solutions.",
      image: "https://images.unsplash.com/photo-1730818875087-182c15e1e7a4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxtb2JpbGUlMjBhcHAlMjBkZXZlbG9wbWVudCUyMHNtYXJ0cGhvbmV8ZW58MXx8fHx8MTc1ODE4NzY3MHww&ixlib=rb-4.1.0&q=80&w=1080",
      category: "Development",
      author: "Vamsi Krishna",
      date: "Jan 10, 2025",
      readTime: "12 min read",
      slug: "scalable-saas-applications-best-practices"
    },
    {
      title: "UX Design Trends That Will Dominate 2025",
      excerpt: "Discover the latest UX design trends including micro-interactions, voice interfaces, and AI-driven personalization that are reshaping user experiences.",
      image: "https://images.unsplash.com/photo-1743004873139-5bc0e3d937d4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBvZmZpY2UlMjB0ZWNobm9sb2d5JTIwd29ya3NwYWNlfGVufDF8fHx8MTc1ODEyMTEwOXww&ixlib=rb-4.1.0&q=80&w=1080",
      category: "Design",
      author: "Vamsi Krishna",
      date: "Jan 5, 2025",
      readTime: "6 min read",
      slug: "ux-design-trends-2025"
    }
  ]

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'AI/ML': return 'bg-purple-100 text-purple-800'
      case 'Development': return 'bg-blue-100 text-blue-800'
      case 'Design': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <section className="py-24 bg-[#F1F4FD]">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Latest from Our Blog
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Stay updated with the latest trends, insights, and best practices in web development, 
            AI, and digital innovation from our team of experts.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <Card 
              key={index} 
              className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-0 shadow-lg overflow-hidden bg-white"
            >
              <div className="relative overflow-hidden">
                <ImageWithFallback
                  src={post.image}
                  alt={post.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4">
                  <Badge className={getCategoryColor(post.category)}>
                    {post.category}
                  </Badge>
                </div>
              </div>

              <CardHeader className="pb-4">
                <CardTitle className="text-xl leading-tight group-hover:text-primary transition-colors line-clamp-2">
                  {post.title}
                </CardTitle>
                <CardDescription className="text-base leading-relaxed line-clamp-3">
                  {post.excerpt}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="pt-0">
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                  <div className="flex items-center gap-1">
                    <User className="h-3 w-3" />
                    <span>{post.author}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    <span>{post.date}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    <span>{post.readTime}</span>
                  </div>
                  
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className="group/btn text-primary hover:text-primary/80 hover:bg-accent p-2"
                    onClick={() => window.location.hash = `blog/${post.slug}`}
                  >
                    Read More
                    <ArrowRight className="ml-1 h-3 w-3 group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button 
            size="lg" 
            className="bg-primary hover:bg-primary/90"
            onClick={() => window.location.hash = 'blog'}
          >
            View All Articles
          </Button>
        </div>
      </div>
    </section>
  )
}