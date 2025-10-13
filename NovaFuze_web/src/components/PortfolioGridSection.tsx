import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader } from "./ui/card"
import { Badge } from "./ui/badge"
import { Button } from "./ui/button"
import { ExternalLink, Github, Calendar, ArrowRight } from "lucide-react"
import { getStaticData, PortfolioProject } from "../data/static-data"



export function PortfolioGridSection() {
  const [projects, setProjects] = useState<PortfolioProject[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState<string>("All")

  useEffect(() => {
    try {
      const portfolioProjects = getStaticData('portfolio') as PortfolioProject[]
      setProjects(portfolioProjects)
      setLoading(false)
    } catch (error) {
      console.error('Error loading portfolio projects:', error)
      setLoading(false)
      setProjects([])
    }
  }, [])

  const categories = ["All", ...Array.from(new Set(projects.map(p => p.category)))]
  
  const filteredProjects = selectedCategory === "All" 
    ? projects 
    : projects.filter(p => p.category === selectedCategory)

  if (loading) {
    return (
      <section className="py-24 bg-[#F8F9FF]">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#4E6BDF] mb-4">
              Our Recent Work
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Loading our portfolio projects...
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="animate-pulse">
                <div className="h-48 bg-muted rounded-t-lg"></div>
                <CardHeader>
                  <div className="h-6 bg-muted rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-muted rounded w-1/2"></div>
                </CardHeader>
                <CardContent>
                  <div className="h-16 bg-muted rounded mb-4"></div>
                  <div className="flex gap-2 mb-4">
                    <div className="h-6 bg-muted rounded w-16"></div>
                    <div className="h-6 bg-muted rounded w-16"></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-24 bg-[#F8F9FF]">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-20">
          <div className="inline-flex items-center px-4 py-2 bg-primary/10 rounded-full text-sm text-primary font-semibold mb-6">
            Success Stories
          </div>
          <h2 className="text-4xl md:text-5xl font-black mb-6 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            Our Recent Work
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Discover the innovative solutions we've crafted for our clients across various industries and technologies. 
            Each project represents our commitment to excellence and innovation.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              onClick={() => setSelectedCategory(category)}
              className={selectedCategory === category 
                ? "bg-[#4E6BDF] text-white hover:bg-[#3D51D3]" 
                : "border-[#4E6BDF] text-[#4E6BDF] hover:bg-[#4E6BDF] hover:text-white"
              }
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <Card 
              key={project.id} 
              className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-white border-0 shadow-lg overflow-hidden cursor-pointer"
              onClick={() => project.projectUrl && window.open(project.projectUrl, '_blank')}
            >
              {/* Enhanced Project Image with larger size */}
              <div className="relative h-64 overflow-hidden rounded-t-lg">
                <img 
                  src={project.images[0]} 
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                
                {/* Enhanced Overlay with project summary */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <div className="font-semibold text-lg mb-2">{project.title}</div>
                    <div className="text-sm opacity-90 line-clamp-2">{project.shortDescription}</div>
                  </div>
                </div>
                
                {/* Enhanced Action Buttons */}
                <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {project.projectUrl && (
                    <Button
                      size="sm"
                      className="bg-white/95 text-primary hover:bg-white shadow-lg"
                      onClick={(e) => {
                        e.stopPropagation();
                        window.open(project.projectUrl, '_blank');
                      }}
                    >
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  )}
                  {project.githubUrl && (
                    <Button
                      size="sm"
                      className="bg-white/95 text-primary hover:bg-white shadow-lg"
                      onClick={(e) => {
                        e.stopPropagation();
                        window.open(project.githubUrl, '_blank');
                      }}
                    >
                      <Github className="h-4 w-4" />
                    </Button>
                  )}
                </div>

                {/* "See Details" Call-to-action overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Button 
                    className="bg-primary hover:bg-primary/90 text-white font-semibold px-6 py-3 shadow-xl"
                    onClick={(e) => {
                      e.stopPropagation();
                      project.projectUrl && window.open(project.projectUrl, '_blank');
                    }}
                  >
                    See Details
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>

              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg group-hover:text-[#4E6BDF] transition-colors duration-300">
                      {project.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">{project.clientName}</p>
                  </div>
                  <Badge variant="outline" className="ml-2 border-[#4E6BDF]/20 text-[#4E6BDF]">
                    {project.category}
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className="pt-0">
                <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                  {project.shortDescription}
                </p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {project.technologies.slice(0, 3).map((tech, index) => (
                    <Badge key={index} variant="secondary" className="text-xs bg-[#F1F4FD] text-[#4E6BDF]">
                      {tech}
                    </Badge>
                  ))}
                  {project.technologies.length > 3 && (
                    <Badge variant="secondary" className="text-xs bg-[#F1F4FD] text-[#4E6BDF]">
                      +{project.technologies.length - 3} more
                    </Badge>
                  )}
                </div>

                {/* Date and Actions */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-xs text-muted-foreground">
                    <Calendar className="h-3 w-3 mr-1" />
                    {project.completionDate.toLocaleDateString()}
                  </div>
                  
                  <Button 
                    size="sm" 
                    variant="ghost" 
                    className="text-[#4E6BDF] hover:bg-[#F1F4FD] p-1"
                    onClick={(e) => {
                      e.stopPropagation();
                      project.projectUrl && window.open(project.projectUrl, '_blank');
                    }}
                  >
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredProjects.length === 0 && !loading && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">
              No projects found in this category.
            </p>
          </div>
        )}

        {/* Load More Button */}
        <div className="text-center mt-12">
          <Button 
            size="lg" 
            variant="outline" 
            className="border-[#4E6BDF] text-[#4E6BDF] hover:bg-[#4E6BDF] hover:text-white"
          >
            Load More Projects
          </Button>
        </div>
      </div>
    </section>
  )
}