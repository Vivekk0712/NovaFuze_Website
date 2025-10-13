import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Badge } from "./ui/badge"
import { Button } from "./ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { ArrowRight, Calendar, Clock, User } from "lucide-react"
import { ImageWithFallback } from "./figma/ImageWithFallback"

interface BlogPost {
  id: string
  title: string
  excerpt: string
  content: string
  featuredImage: string
  author: {
    id: string
    name: string
    role: string
    avatar: string
    bio: string
  }
  publishDate: string
  readTime: string
  tags: string[]
  category: string
  metaTitle: string
  metaDescription: string
  slug: string
}

interface BlogListingSectionProps {
  featured?: boolean
  limit?: number
}

export function BlogListingSection({ featured = false, limit }: BlogListingSectionProps) {
  // Sample blog posts data - in real app this would come from CMS
  const blogPosts: BlogPost[] = [
    {
      id: "1",
      title: "The Future of AI in Web Development: Trends to Watch in 2024",
      excerpt: "Explore how artificial intelligence is revolutionizing web development, from automated code generation to intelligent user interfaces that adapt to user behavior.",
      content: "Full article content here...",
      featuredImage: "https://images.unsplash.com/photo-1655891709738-a48aad482a3d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnRpZmljaWFsJTIwaW50ZWxsaWdlbmNlJTIwbWFjaGluZSUyMGxlYXJuaW5nfGVufDF8fHx8MTc1ODEwOTUzNXww&ixlib=rb-4.1.0&q=80&w=1080",
      author: {
        id: "1",
        name: "Arjun Mehta",
        role: "Lead AI Developer",
        avatar: "https://images.unsplash.com/photo-1739298061757-7a3339cee982?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxwcm9mZXNzaW9uYWwlMjBidXNpbmVzcyUyMHBlcnNvbiUyMGhlYWRzaG90fGVufDF8fHx8MTc1ODE2NTE0OHww&ixlib=rb-4.1.0&q=80&w=1080",
        bio: "Arjun is our Lead AI Developer with 8+ years of experience in machine learning and web technologies."
      },
      publishDate: "2024-03-15",
      readTime: "8 min read",
      tags: ["AI", "Web Development", "Technology Trends"],
      category: "Technology",
      metaTitle: "The Future of AI in Web Development: Trends to Watch in 2024",
      metaDescription: "Explore how artificial intelligence is revolutionizing web development, from automated code generation to intelligent user interfaces.",
      slug: "future-ai-web-development-2024"
    },
    {
      id: "2",
      title: "Building Scalable React Applications: Best Practices and Performance Tips",
      excerpt: "Learn essential techniques for creating React applications that can handle growth, from component architecture to state management and performance optimization.",
      content: "Full article content here...",
      featuredImage: "https://images.unsplash.com/photo-1742072594003-abf6ca86e154?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWIlMjBkZXZlbG9wbWVudCUyMGNvZGluZyUyMHNjcmVlbnxlbnwxfHx8fDE3NTgxNzk2ODF8MA&ixlib=rb-4.1.0&q=80&w=1080",
      author: {
        id: "2",
        name: "Priya Sharma",
        role: "Senior Frontend Developer",
        avatar: "https://images.unsplash.com/photo-1739298061757-7a3339cee982?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxwcm9mZXNzaW9uYWwlMjBidXNpbmVzcyUyMHBlcnNvbiUyMGhlYWRzaG90fGVufDF8fHx8MTc1ODE2NTE0OHww&ixlib=rb-4.1.0&q=80&w=1080",
        bio: "Priya specializes in modern React development and has built applications serving millions of users."
      },
      publishDate: "2024-03-12",
      readTime: "12 min read",
      tags: ["React", "Performance", "Best Practices"],
      category: "Development",
      metaTitle: "Building Scalable React Applications: Best Practices and Performance Tips",
      metaDescription: "Learn essential techniques for creating React applications that can handle growth, from component architecture to performance optimization.",
      slug: "scalable-react-applications-best-practices"
    },
    {
      id: "3",
      title: "Digital Transformation in Indian SMEs: A Complete Guide",
      excerpt: "How small and medium enterprises in India can leverage digital technologies to compete with larger corporations and reach new markets effectively.",
      content: "Full article content here...",
      featuredImage: "https://images.unsplash.com/photo-1726065235158-d9c3f817f331?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMGRpZ2l0YWwlMjB0cmFuc2Zvcm1hdGlvbnxlbnwxfHx8fDE3NTgyMTI4MzN8MA&ixlib=rb-4.1.0&q=80&w=1080",
      author: {
        id: "3",
        name: "Ravi Patel",
        role: "Business Strategy Consultant",
        avatar: "https://images.unsplash.com/photo-1739298061757-7a3339cee982?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHhwcm9mZXNzaW9uYWwlMjBidXNpbmVzcyUyMHBlcnNvbiUyMGhlYWRzaG90fGVufDF8fHx8MTc1ODE2NTE0OHww&ixlib=rb-4.1.0&q=80&w=1080",
        bio: "Ravi helps businesses navigate digital transformation with over 10 years of consulting experience."
      },
      publishDate: "2024-03-10",
      readTime: "10 min read",
      tags: ["Digital Transformation", "SME", "Business Strategy"],
      category: "Business",
      metaTitle: "Digital Transformation in Indian SMEs: A Complete Guide",
      metaDescription: "How small and medium enterprises in India can leverage digital technologies to compete effectively and reach new markets.",
      slug: "digital-transformation-indian-smes-guide"
    },
    {
      id: "4",
      title: "Modern Web Security: Protecting Your Applications in 2024",
      excerpt: "Essential security practices every web developer should implement, from authentication strategies to preventing common vulnerabilities and attacks.",
      content: "Full article content here...",
      featuredImage: "https://images.unsplash.com/photo-1732284081090-8880f1e1905b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNobm9sb2d5JTIwaW5ub3ZhdGlvbiUyMHdvcmtzcGFjZXxlbnwxfHx8fDE3NTgxMTgwNTJ8MA&ixlib=rb-4.1.0&q=80&w=1080",
      author: {
        id: "4",
        name: "Sneha Reddy",
        role: "Security Engineer",
        avatar: "https://images.unsplash.com/photo-1739298061757-7a3339cee982?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHhwcm9mZXNzaW9uYWwlMjBidXNpbmVzcyUyMHBlcnNvbiUyMGhlYWRzaG90fGVufDF8fHx8MTc1ODE2NTE0OHww&ixlib=rb-4.1.0&q=80&w=1080",
        bio: "Sneha is our security expert, specializing in web application security and threat prevention."
      },
      publishDate: "2024-03-08",
      readTime: "15 min read",
      tags: ["Security", "Web Development", "Best Practices"],
      category: "Security",
      metaTitle: "Modern Web Security: Protecting Your Applications in 2024",
      metaDescription: "Essential security practices every web developer should implement to protect applications from vulnerabilities and attacks.",
      slug: "modern-web-security-2024"
    },
    {
      id: "5",
      title: "The Rise of No-Code Development: Tools and Opportunities",
      excerpt: "Explore the growing no-code movement and how it's democratizing software development, making it accessible to non-technical professionals.",
      content: "Full article content here...",
      featuredImage: "https://images.unsplash.com/photo-1742072594003-abf6ca86e154?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWIlMjBkZXZlbG9wbWVudCUyMGNvZGluZyUyMHNjcmVlbnxlbnwxfHx8fDE3NTgxNzk2ODF8MA&ixlib=rb-4.1.0&q=80&w=1080",
      author: {
        id: "5",
        name: "Amit Singh",
        role: "Product Manager",
        avatar: "https://images.unsplash.com/photo-1739298061757-7a3339cee982?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHhwcm9mZXNzaW9uYWwlMjBidXNpbmVzcyUyMHBlcnNvbiUyMGhlYWRzaG90fGVufDF8fHx8MTc1ODE2NTE0OHww&ixlib=rb-4.1.0&q=80&w=1080",
        bio: "Amit leads product development at NovaFuze and has extensive experience with no-code platforms."
      },
      publishDate: "2024-03-05",
      readTime: "7 min read",
      tags: ["No-Code", "Development Tools", "Innovation"],
      category: "Tools",
      metaTitle: "The Rise of No-Code Development: Tools and Opportunities",
      metaDescription: "Explore the growing no-code movement and how it's democratizing software development for non-technical professionals.",
      slug: "rise-no-code-development-tools"
    },
    {
      id: "6",
      title: "UI/UX Design Trends That Will Dominate 2024",
      excerpt: "Discover the latest design trends shaping user experiences, from minimalism to immersive interfaces and accessibility-first design approaches.",
      content: "Full article content here...",
      featuredImage: "https://images.unsplash.com/photo-1732284081090-8880f1e1905b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNobm9sb2d5JTIwaW5ub3ZhdGlvbiUyMHdvcmtzcGFjZXxlbnwxfHx8fDE3NTgxMTgwNTJ8MA&ixlib=rb-4.1.0&q=80&w=1080",
      author: {
        id: "6",
        name: "Kavya Jain",
        role: "UI/UX Designer",
        avatar: "https://images.unsplash.com/photo-1739298061757-7a3339cee982?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHhwcm9mZXNzaW9uYWwlMjBidXNpbmVzcyUyMHBlcnNvbiUyMGhlYWRzaG90fGVufDF8fHx8MTc1ODE2NTE0OHww&ixlib=rb-4.1.0&q=80&w=1080",
        bio: "Kavya is our lead designer, creating beautiful and functional user experiences for our clients."
      },
      publishDate: "2024-03-03",
      readTime: "9 min read",
      tags: ["UI/UX", "Design Trends", "User Experience"],
      category: "Design",
      metaTitle: "UI/UX Design Trends That Will Dominate 2024",
      metaDescription: "Discover the latest design trends shaping user experiences, from minimalism to accessibility-first approaches.",
      slug: "ui-ux-design-trends-2024"
    }
  ]

  const displayPosts = limit ? blogPosts.slice(0, limit) : blogPosts
  const featuredPost = featured ? blogPosts[0] : null

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-IN', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  }

  const handleReadMore = (slug: string) => {
    // Navigate to blog post detail page using hash routing
    window.location.hash = `blog/${slug}`
  }

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        {!featured && (
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Latest Articles
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Stay updated with the latest insights, tutorials, and industry trends 
              from our team of experts.
            </p>
          </div>
        )}

        {/* Featured Post */}
        {featuredPost && (
          <div className="mb-16">
            <div className="text-center mb-8">
              <Badge className="bg-[#4E6BDF] text-white mb-4">Featured Article</Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Editor's Pick</h2>
            </div>
            
            <Card className="border-0 shadow-xl overflow-hidden bg-white hover:shadow-2xl transition-shadow duration-300">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="relative overflow-hidden">
                  <ImageWithFallback
                    src={featuredPost.featuredImage}
                    alt={featuredPost.title}
                    className="w-full h-64 lg:h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-[#4E6BDF] text-white">
                      {featuredPost.category}
                    </Badge>
                  </div>
                </div>
                
                <CardContent className="p-8 flex flex-col justify-between">
                  <div>
                    <CardTitle className="text-2xl lg:text-3xl mb-4 hover:text-[#4E6BDF] transition-colors cursor-pointer leading-tight">
                      {featuredPost.title}
                    </CardTitle>
                    <CardDescription className="text-lg mb-6 leading-relaxed">
                      {featuredPost.excerpt}
                    </CardDescription>
                    
                    <div className="flex flex-wrap gap-2 mb-6">
                      {featuredPost.tags.map((tag, index) => (
                        <Badge key={index} variant="secondary" className="bg-[#F1F4FD] text-[#4E6BDF]">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex items-center gap-4 mb-6">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={featuredPost.author.avatar} alt={featuredPost.author.name} />
                        <AvatarFallback>{featuredPost.author.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-semibold">{featuredPost.author.name}</div>
                        <div className="text-sm text-muted-foreground">{featuredPost.author.role}</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>{formatDate(featuredPost.publishDate)}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>{featuredPost.readTime}</span>
                      </div>
                    </div>
                    
                    <Button 
                      className="bg-[#4E6BDF] hover:bg-[#3D51D3] w-full lg:w-auto"
                      onClick={() => handleReadMore(featuredPost.slug)}
                    >
                      Read Full Article
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </div>
            </Card>
          </div>
        )}

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayPosts.map((post, index) => {
            // Skip featured post in grid if it's already shown
            if (featured && index === 0) return null
            
            return (
              <Card 
                key={post.id}
                className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-0 shadow-lg overflow-hidden bg-white rounded-2xl"
              >
                {/* Post Image */}
                <div className="relative overflow-hidden">
                  <ImageWithFallback
                    src={post.featuredImage}
                    alt={post.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  {/* Category Badge */}
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-[#4E6BDF] text-white">
                      {post.category}
                    </Badge>
                  </div>
                </div>

                <CardHeader className="pb-3">
                  <CardTitle className="text-lg mb-2 group-hover:text-[#4E6BDF] transition-colors cursor-pointer leading-tight line-clamp-2">
                    {post.title}
                  </CardTitle>
                  <CardDescription className="text-sm leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="pt-0">
                  {/* Tags */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {post.tags.slice(0, 2).map((tag, tagIndex) => (
                      <Badge key={tagIndex} variant="outline" className="text-xs border-[#4E6BDF] text-[#4E6BDF]">
                        {tag}
                      </Badge>
                    ))}
                    {post.tags.length > 2 && (
                      <Badge variant="outline" className="text-xs border-[#4E6BDF] text-[#4E6BDF]">
                        +{post.tags.length - 2}
                      </Badge>
                    )}
                  </div>

                  {/* Author Info */}
                  <div className="flex items-center gap-3 mb-4">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={post.author.avatar} alt={post.author.name} />
                      <AvatarFallback className="text-xs">{post.author.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium text-sm">{post.author.name}</div>
                      <div className="text-xs text-muted-foreground">{post.author.role}</div>
                    </div>
                  </div>

                  {/* Meta Info */}
                  <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      <span>{formatDate(post.publishDate)}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                  
                  <Button 
                    className="w-full bg-[#4E6BDF] hover:bg-[#3D51D3] group-hover:bg-[#333FC2] justify-between text-sm"
                    onClick={() => handleReadMore(post.slug)}
                  >
                    Read More
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
              Load More Articles
            </Button>
          </div>
        )}
      </div>
    </section>
  )
}