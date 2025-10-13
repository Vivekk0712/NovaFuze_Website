import { useState, useEffect } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Button } from '../ui/button'
import { Badge } from '../ui/badge'
import { 
  Settings, 
  FileText, 
  Image, 
  Users, 
  ShoppingBag, 
  Briefcase, 
  Star, 
  FolderOpen, 
  Video,
  BarChart3,
  Plus,
  Edit,
  Eye,
  Trash2
} from 'lucide-react'
import { PageManager } from './PageManager'
import { BlogManager } from './BlogManager'
import { ProductManager } from './ProductManager'
import { ServiceManager } from './ServiceManager'
import { TeamManager } from './TeamManager'
import { PortfolioManager } from './PortfolioManager'
import { VlogManager } from './VlogManager'
import { MediaManager } from './MediaManager'
import { SiteSettingsManager } from './SiteSettingsManager'
import { TestimonialManager } from './TestimonialManager'
import { useCMS } from '../../hooks/useCMS'

export function CMSDashboard() {
  const [activeTab, setActiveTab] = useState('overview')
  const [stats, setStats] = useState({
    pages: 0,
    blog: 0,
    products: 0,
    services: 0,
    team: 0,
    portfolio: 0,
    vlogs: 0,
    testimonials: 0
  })
  
  const cms = useCMS()

  useEffect(() => {
    loadStats()
  }, [])

  const loadStats = async () => {
    try {
      const [
        pages,
        blog,
        products,
        services,
        team,
        portfolio,
        vlogs,
        testimonials
      ] = await Promise.all([
        cms.pages.getAll(),
        cms.blog.getAll(),
        cms.products.getAll(),
        cms.services.getAll(),
        cms.team.getAll(),
        cms.portfolio.getAll(),
        cms.vlogs.getAll(),
        cms.testimonials.getAll()
      ])

      setStats({
        pages: pages.length,
        blog: blog.length,
        products: products.length,
        services: services.length,
        team: team.length,
        portfolio: portfolio.length,
        vlogs: vlogs.length,
        testimonials: testimonials.length
      })
    } catch (error) {
      console.error('Error loading stats:', error)
    }
  }

  const statCards = [
    { label: 'Pages', value: stats.pages, icon: FileText, color: 'blue' },
    { label: 'Blog Posts', value: stats.blog, icon: FileText, color: 'green' },
    { label: 'Products', value: stats.products, icon: ShoppingBag, color: 'purple' },
    { label: 'Services', value: stats.services, icon: Briefcase, color: 'orange' },
    { label: 'Team Members', value: stats.team, icon: Users, color: 'cyan' },
    { label: 'Portfolio Items', value: stats.portfolio, icon: FolderOpen, color: 'pink' },
    { label: 'Vlogs', value: stats.vlogs, icon: Video, color: 'red' },
    { label: 'Testimonials', value: stats.testimonials, icon: Star, color: 'yellow' }
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">NovaFuze CMS Dashboard</h1>
        <p className="text-muted-foreground">
          Manage all your website content from this central dashboard
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-10 mb-8">
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="pages" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Pages
          </TabsTrigger>
          <TabsTrigger value="blog" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Blog
          </TabsTrigger>
          <TabsTrigger value="products" className="flex items-center gap-2">
            <ShoppingBag className="h-4 w-4" />
            Products
          </TabsTrigger>
          <TabsTrigger value="services" className="flex items-center gap-2">
            <Briefcase className="h-4 w-4" />
            Services
          </TabsTrigger>
          <TabsTrigger value="team" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Team
          </TabsTrigger>
          <TabsTrigger value="portfolio" className="flex items-center gap-2">
            <FolderOpen className="h-4 w-4" />
            Portfolio
          </TabsTrigger>
          <TabsTrigger value="vlogs" className="flex items-center gap-2">
            <Video className="h-4 w-4" />
            Vlogs
          </TabsTrigger>
          <TabsTrigger value="testimonials" className="flex items-center gap-2">
            <Star className="h-4 w-4" />
            Testimonials
          </TabsTrigger>
          <TabsTrigger value="settings" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            Settings
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {statCards.map((stat) => (
              <Card key={stat.label}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{stat.label}</CardTitle>
                  <stat.icon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>
                  Common tasks to manage your content
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button 
                  className="w-full justify-start" 
                  variant="outline"
                  onClick={() => setActiveTab('blog')}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Create New Blog Post
                </Button>
                <Button 
                  className="w-full justify-start" 
                  variant="outline"
                  onClick={() => setActiveTab('products')}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Add New Product
                </Button>
                <Button 
                  className="w-full justify-start" 
                  variant="outline"
                  onClick={() => setActiveTab('services')}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Add New Service
                </Button>
                <Button 
                  className="w-full justify-start" 
                  variant="outline"
                  onClick={() => setActiveTab('team')}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Add Team Member
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>
                  Latest content updates
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm">Blog post updated</p>
                      <p className="text-xs text-muted-foreground">2 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm">New product added</p>
                      <p className="text-xs text-muted-foreground">5 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm">Team member updated</p>
                      <p className="text-xs text-muted-foreground">1 day ago</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="pages">
          <PageManager />
        </TabsContent>

        <TabsContent value="blog">
          <BlogManager />
        </TabsContent>

        <TabsContent value="products">
          <ProductManager />
        </TabsContent>

        <TabsContent value="services">
          <ServiceManager />
        </TabsContent>

        <TabsContent value="team">
          <TeamManager />
        </TabsContent>

        <TabsContent value="portfolio">
          <PortfolioManager />
        </TabsContent>

        <TabsContent value="vlogs">
          <VlogManager />
        </TabsContent>

        <TabsContent value="testimonials">
          <TestimonialManager />
        </TabsContent>

        <TabsContent value="settings">
          <div className="space-y-8">
            <SiteSettingsManager />
            <MediaManager />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}