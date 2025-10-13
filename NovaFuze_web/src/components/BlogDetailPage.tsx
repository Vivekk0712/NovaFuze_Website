import { Header } from "./Header"
import { Footer } from "./Footer"
import { BlogBreadcrumb } from "./BlogBreadcrumb"
import { Card, CardContent } from "./ui/card"
import { Badge } from "./ui/badge"
import { Button } from "./ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { Separator } from "./ui/separator"
import { 
  Calendar, 
  Clock, 
  Share2, 
  Twitter, 
  Facebook, 
  Linkedin, 
  Copy,
  ArrowRight,
  User,
  MapPin,
  Mail
} from "lucide-react"
import { ImageWithFallback } from "./figma/ImageWithFallback"
import { useEffect } from "react"
import vamsiKrishnaAvatar from "figma:asset/af5b3ab8264ed44dc18aaa9511c1fdb76259d814.png"

export function BlogDetailPage() {
  // Extract slug from current route
  const slug = window.location.hash.slice(1).split('/')[1] || 'default-slug';
  
  // Function to get blog post by slug
  const getBlogPostBySlug = (slug: string) => {
    const blogPosts = {
      'ai-powered-web-development-2025': {
        id: "1",
        title: "The Future of AI-Powered Web Development in 2025",
        content: `
          <p>Explore how AI is revolutionizing web development, from automated code generation to intelligent UX optimization and the tools shaping the industry.</p>
          
          <h2>The Current State of AI in Web Development</h2>
          <p>Today's web development landscape is already being transformed by AI tools. From code completion in IDEs to automated testing frameworks, developers are leveraging AI to increase productivity and reduce errors. But this is just the beginning.</p>
          
          <h3>Key Areas of AI Integration</h3>
          <ul>
            <li><strong>Automated Code Generation:</strong> AI can now write functional code snippets based on natural language descriptions</li>
            <li><strong>Bug Detection and Fixing:</strong> Machine learning algorithms can identify and suggest fixes for common coding errors</li>
            <li><strong>User Experience Optimization:</strong> AI analyzes user behavior to suggest UI/UX improvements</li>
            <li><strong>Performance Optimization:</strong> Intelligent systems can automatically optimize website performance</li>
          </ul>
          
          <h2>Emerging Trends for 2025</h2>
          <p>As we look ahead, several exciting trends are emerging that will shape the future of AI-driven web development:</p>
          
          <h3>1. Intelligent Design Systems</h3>
          <p>AI-powered design systems will automatically generate responsive layouts, choose optimal color schemes, and ensure accessibility compliance. These systems will learn from user interactions and continuously improve the design.</p>
          
          <h3>2. Conversational Interfaces</h3>
          <p>Chatbots and voice interfaces powered by advanced language models will become standard features on websites, providing personalized user experiences and customer support.</p>
          
          <h3>3. Predictive Analytics Integration</h3>
          <p>Websites will leverage AI to predict user behavior, preload content, and personalize experiences in real-time, significantly improving user engagement and conversion rates.</p>
          
          <h2>Conclusion</h2>
          <p>The integration of AI in web development is not just a trend—it's the future. As developers who embrace these technologies will be better positioned to create innovative, efficient, and user-centric web experiences.</p>
        `,
        excerpt: "Explore how AI is revolutionizing web development, from automated code generation to intelligent UX optimization and the tools shaping the industry.",
        featuredImage: "https://images.unsplash.com/photo-1557324232-b8917d3c3dcb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHx3ZWIlMjBkZXZlbG9wbWVudCUyMGNvZGluZyUyMGNvbXB1dGVyfGVufDF8fHx8MTc1ODE2MTMzOXww&ixlib=rb-4.1.0&q=80&w=1080",
        author: {
          id: "1",
          name: "Vamsi Krishna",
          role: "AI Development Lead",
          avatar: vamsiKrishnaAvatar,
          bio: "Vamsi is our AI Development Lead with expertise in machine learning and modern web technologies.",
          location: "Hyderabad, India",
          email: "vamsikrishna@novafuze.in",
          social: {
            twitter: "@NovaFuze_LLP",
            linkedin: "company/105298593"
          }
        },
        publishDate: "2025-01-15",
        readTime: "8 min read",
        tags: ["AI/ML", "Web Development", "Technology Trends"],
        category: "AI/ML",
        metaTitle: "The Future of AI-Powered Web Development in 2025",
        metaDescription: "Explore how AI is revolutionizing web development, from automated code generation to intelligent UX optimization.",
        slug: "ai-powered-web-development-2025"
      },
      'scalable-saas-applications-best-practices': {
        id: "2",
        title: "Building Scalable SaaS Applications: Best Practices",
        content: `
          <p>Learn the essential architectural patterns and technologies for building SaaS applications that can scale from MVP to enterprise-level solutions.</p>
          
          <h2>Understanding SaaS Architecture</h2>
          <p>Building scalable SaaS applications requires careful planning and the right architectural decisions from the start. This guide covers the essential patterns and practices you need to know.</p>
          
          <h3>Key Principles for Scalable SaaS</h3>
          <ul>
            <li><strong>Multi-tenancy:</strong> Efficiently serve multiple customers from a single application instance</li>
            <li><strong>Microservices:</strong> Break down functionality into manageable, independently scalable services</li>
            <li><strong>API-First Design:</strong> Build robust APIs that can support multiple client applications</li>
            <li><strong>Database Optimization:</strong> Design data models that can handle growth efficiently</li>
          </ul>
          
          <h2>Technology Stack Considerations</h2>
          <p>Choosing the right technology stack is crucial for long-term scalability and maintainability of your SaaS application.</p>
          
          <h2>Conclusion</h2>
          <p>Building scalable SaaS applications requires thoughtful architecture and the right technology choices from day one.</p>
        `,
        excerpt: "Learn the essential architectural patterns and technologies for building SaaS applications that can scale from MVP to enterprise-level solutions.",
        featuredImage: "https://images.unsplash.com/photo-1730818875087-182c15e1e7a4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxtb2JpbGUlMjBhcHAlMjBkZXZlbG9wbWVudCUyMHNtYXJ0cGhvbmV8ZW58MXx8fHx8MTc1ODE4NzY3MHww&ixlib=rb-4.1.0&q=80&w=1080",
        author: {
          id: "2",
          name: "Vamsi Krishna",
          role: "Senior Full Stack Developer",
          avatar: vamsiKrishnaAvatar,
          bio: "Expert in building scalable web applications and SaaS platforms.",
          location: "Hyderabad, India",
          email: "vamsikrishna@novafuze.in",
          social: {
            twitter: "@NovaFuze_LLP",
            linkedin: "company/105298593"
          }
        },
        publishDate: "2025-01-10",
        readTime: "12 min read",
        tags: ["Development", "SaaS", "Architecture"],
        category: "Development",
        metaTitle: "Building Scalable SaaS Applications: Best Practices",
        metaDescription: "Learn essential techniques for creating SaaS applications that can scale from MVP to enterprise-level solutions.",
        slug: "scalable-saas-applications-best-practices"
      },
      'ux-design-trends-2025': {
        id: "3", 
        title: "UX Design Trends That Will Dominate 2025",
        content: `
          <p>Discover the latest UX design trends including micro-interactions, voice interfaces, and AI-driven personalization that are reshaping user experiences.</p>
          
          <h2>The Evolution of User Experience</h2>
          <p>User experience design continues to evolve rapidly, driven by new technologies, changing user behaviors, and innovative design thinking.</p>
          
          <h3>Top UX Trends for 2025</h3>
          <ul>
            <li><strong>Micro-interactions:</strong> Small animations and feedback that enhance user engagement</li>
            <li><strong>Voice Interfaces:</strong> Conversational UI that makes applications more accessible</li>
            <li><strong>AI Personalization:</strong> Intelligent systems that adapt to individual user preferences</li>
            <li><strong>Inclusive Design:</strong> Creating experiences that work for everyone</li>
          </ul>
          
          <h2>Implementation Strategies</h2>
          <p>Understanding trends is one thing, but implementing them effectively requires careful planning and user research.</p>
          
          <h2>Conclusion</h2>
          <p>Staying current with UX trends helps create better user experiences that delight and engage your audience.</p>
        `,
        excerpt: "Discover the latest UX design trends including micro-interactions, voice interfaces, and AI-driven personalization that are reshaping user experiences.",
        featuredImage: "https://images.unsplash.com/photo-1743004873139-5bc0e3d937d4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBvZmZpY2UlMjB0ZWNobm9sb2d5JTIwd29ya3NwYWNlfGVufDF8fHx8MTc1ODEyMTEwOXww&ixlib=rb-4.1.0&q=80&w=1080",
        author: {
          id: "3",
          name: "Vamsi Krishna", 
          role: "UX Design Lead",
          avatar: vamsiKrishnaAvatar,
          bio: "Leading UX designer passionate about creating intuitive and accessible user experiences.",
          location: "Hyderabad, India",
          email: "vamsikrishna@novafuze.in",
          social: {
            twitter: "@NovaFuze_LLP",
            linkedin: "company/105298593"
          }
        },
        publishDate: "2025-01-05",
        readTime: "6 min read", 
        tags: ["Design", "UX", "Trends"],
        category: "Design",
        metaTitle: "UX Design Trends That Will Dominate 2025",
        metaDescription: "Discover the latest UX design trends that are reshaping user experiences in 2025.",
        slug: "ux-design-trends-2025"
      }
    };
    
    return blogPosts[slug] || blogPosts['ai-powered-web-development-2025']; // fallback to first post
  };
  
  // Get blog post data based on slug
  const blogPost = getBlogPostBySlug(slug);

  // Related posts
  const relatedPosts = [
    {
      id: "2",
      title: "Building Scalable React Applications: Best Practices and Performance Tips",
      excerpt: "Learn essential techniques for creating React applications that can handle growth.",
      image: "https://images.unsplash.com/photo-1742072594003-abf6ca86e154?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWIlMjBkZXZlbG9wbWVudCUyMGNvZGluZyUyMHNjcmVlbnxlbnwxfHx8fDE3NTgxNzk2ODF8MA&ixlib=rb-4.1.0&q=80&w=1080",
      slug: "scalable-react-applications-best-practices",
      readTime: "12 min read"
    },
    {
      id: "3",
      title: "Modern Web Security: Protecting Your Applications in 2024",
      excerpt: "Comprehensive guide to securing your web applications against modern threats.",
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHx3ZWIlMjBzZWN1cml0eSUyMGN5YmVyc2VjdXJpdHl8ZW58MXx8fHwxNzU4MTc5NzI4fDA&ixlib=rb-4.1.0&q=80&w=1080",
      slug: "modern-web-security-2024",
      readTime: "15 min read"
    },
    {
      id: "4",
      title: "The Rise of Jamstack: Building Faster, Secure Websites",
      excerpt: "Discover how Jamstack architecture is changing the way we build websites.",
      image: "https://images.unsplash.com/photo-1504639725590-34d0984388bd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwzfHx3ZWIlMjBkZXZlbG9wbWVudCUyMGFyY2hpdGVjdHVyZXxlbnwxfHx8fDE3NTgxNzk3NTZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
      slug: "jamstack-architecture-guide",
      readTime: "10 min read"
    }
  ];

  // Share functionality
  const handleShare = (platform: string) => {
    const url = window.location.href;
    const title = blogPost.title;
    
    switch (platform) {
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`, '_blank');
        break;
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'linkedin':
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'copy':
        navigator.clipboard.writeText(url);
        // You might want to show a toast notification here
        break;
    }
  };

  useEffect(() => {
    // Update document title
    document.title = `${blogPost.title} | NovaFuze-Tech Blog`;
    
    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', blogPost.metaDescription);
    }
  }, [slug, blogPost]);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 lg:px-8 py-12">
        <BlogBreadcrumb currentPage={blogPost.title} />
        
        <div className="max-w-4xl mx-auto">
          {/* Hero Image */}
          <div className="relative mb-8 rounded-2xl overflow-hidden shadow-2xl">
            <ImageWithFallback
              src={blogPost.featuredImage}
              alt={blogPost.title}
              className="w-full h-[400px] md:h-[500px] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
            <div className="absolute bottom-8 left-8 right-8">
              <Badge className="mb-4 bg-[#4E6BDF] hover:bg-[#3D51D3]">
                {blogPost.category}
              </Badge>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
                {blogPost.title}
              </h1>
              <p className="text-white/90 text-lg md:text-xl mb-6">
                {blogPost.excerpt}
              </p>
            </div>
          </div>

          {/* Article Meta */}
          <Card className="mb-8 border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={blogPost.author.avatar} alt={blogPost.author.name} />
                    <AvatarFallback>{blogPost.author.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold">{blogPost.author.name}</p>
                    <p className="text-sm text-muted-foreground">{blogPost.author.role}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>{new Date(blogPost.publishDate).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{blogPost.readTime}</span>
                  </div>
                </div>
              </div>
              
              <Separator className="my-4" />
              
              <div className="flex flex-wrap gap-2">
                {blogPost.tags.map((tag, index) => (
                  <Badge key={index} variant="secondary" className="bg-[#F1F4FD] text-[#4E6BDF] hover:bg-[#E6EBFD]">
                    {tag}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Article Content */}
          <Card className="mb-8 border-0 shadow-lg">
            <CardContent className="p-8">
              <div 
                className="prose prose-lg max-w-none
                  prose-headings:text-[#4E6BDF] 
                  prose-headings:font-bold
                  prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4
                  prose-h3:text-xl prose-h3:mt-6 prose-h3:mb-3
                  prose-p:text-muted-foreground prose-p:leading-relaxed prose-p:mb-4
                  prose-ul:text-muted-foreground prose-ul:mb-4
                  prose-li:mb-2
                  prose-strong:text-foreground prose-strong:font-semibold"
                dangerouslySetInnerHTML={{ __html: blogPost.content }}
              />
            </CardContent>
          </Card>

          {/* Share Buttons */}
          <Card className="mb-8 border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Share2 className="h-5 w-5 text-[#4E6BDF]" />
                  <span className="font-semibold">Share this article</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleShare('twitter')}
                    className="border-[#4E6BDF] text-[#4E6BDF] hover:bg-[#4E6BDF] hover:text-white"
                  >
                    <Twitter className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleShare('facebook')}
                    className="border-[#4E6BDF] text-[#4E6BDF] hover:bg-[#4E6BDF] hover:text-white"
                  >
                    <Facebook className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleShare('linkedin')}
                    className="border-[#4E6BDF] text-[#4E6BDF] hover:bg-[#4E6BDF] hover:text-white"
                  >
                    <Linkedin className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleShare('copy')}
                    className="border-[#4E6BDF] text-[#4E6BDF] hover:bg-[#4E6BDF] hover:text-white"
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Author Bio */}
          <Card className="mb-12 border-0 shadow-lg">
            <CardContent className="p-8">
              <div className="flex flex-col md:flex-row gap-6">
                <Avatar className="h-20 w-20 mx-auto md:mx-0">
                  <AvatarImage src={blogPost.author.avatar} alt={blogPost.author.name} />
                  <AvatarFallback className="text-xl">{blogPost.author.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-xl font-semibold mb-2">{blogPost.author.name}</h3>
                  <p className="text-[#4E6BDF] font-medium mb-3">{blogPost.author.role}</p>
                  <p className="text-muted-foreground mb-4 leading-relaxed">{blogPost.author.bio}</p>
                  
                  <div className="flex items-center justify-center md:justify-start gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      <span>{blogPost.author.location}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Mail className="h-4 w-4" />
                      <span>{blogPost.author.email}</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Related Posts */}
          <div>
            <h2 className="text-2xl font-bold mb-8">Related Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map((post) => (
                <Card 
                  key={post.id}
                  className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-0 shadow-lg overflow-hidden bg-white cursor-pointer"
                  onClick={() => window.location.hash = `blog/${post.slug}`}
                >
                  <div className="relative overflow-hidden">
                    <ImageWithFallback
                      src={post.image}
                      alt={post.title}
                      className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  
                  <CardContent className="p-4">
                    <h3 className="font-semibold mb-2 line-clamp-2 group-hover:text-[#4E6BDF] transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">{post.readTime}</span>
                      <ArrowRight className="h-4 w-4 text-[#4E6BDF] group-hover:translate-x-1 transition-transform" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}