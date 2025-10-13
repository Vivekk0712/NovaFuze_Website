import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { Textarea } from '../ui/textarea'
import { Badge } from '../ui/badge'
import { Switch } from '../ui/switch'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog'
import { 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  EyeOff, 
  Save, 
  FileText,
  Settings,
  Image as ImageIcon,
  Type,
  Link,
  List
} from 'lucide-react'
import { useCMS } from '../../hooks/useCMS'
import type { PageContent, ContentBlock } from '../../types/cms'
import { toast } from 'sonner@2.0.3'

export function PageManager() {
  const [pages, setPages] = useState<PageContent[]>([])
  const [selectedPage, setSelectedPage] = useState<PageContent | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [isCreating, setIsCreating] = useState(false)
  const [loading, setLoading] = useState(false)
  const cms = useCMS()

  // Form state for page editing
  const [formData, setFormData] = useState<Partial<PageContent>>({
    title: '',
    slug: '',
    description: '',
    seoTitle: '',
    seoDescription: '',
    published: false,
    blocks: []
  })

  useEffect(() => {
    loadPages()
  }, [])

  const loadPages = async () => {
    try {
      const allPages = await cms.pages.getAll()
      setPages(allPages)
    } catch (error) {
      console.error('Error loading pages:', error)
    }
  }

  const handleCreatePage = async () => {
    if (!formData.title || !formData.slug) {
      toast.error('Please provide title and slug')
      return
    }

    setLoading(true)
    try {
      const newPage: PageContent = {
        id: formData.slug!,
        title: formData.title!,
        slug: formData.slug!,
        description: formData.description || '',
        seoTitle: formData.seoTitle || formData.title!,
        seoDescription: formData.seoDescription || formData.description || '',
        published: formData.published || false,
        blocks: formData.blocks || [],
        lastModified: new Date(),
        lastModifiedBy: 'admin@novafuze.in'
      }

      await cms.pages.create(newPage.id, newPage)
      await loadPages()
      setIsCreating(false)
      setFormData({
        title: '',
        slug: '',
        description: '',
        seoTitle: '',
        seoDescription: '',
        published: false,
        blocks: []
      })
      toast.success('Page created successfully')
    } catch (error) {
      console.error('Error creating page:', error)
      toast.error('Failed to create page')
    } finally {
      setLoading(false)
    }
  }

  const handleUpdatePage = async () => {
    if (!selectedPage || !formData.title) return

    setLoading(true)
    try {
      await cms.pages.update(selectedPage.id, formData)
      await loadPages()
      setIsEditing(false)
      setSelectedPage(null)
      toast.success('Page updated successfully')
    } catch (error) {
      console.error('Error updating page:', error)
      toast.error('Failed to update page')
    } finally {
      setLoading(false)
    }
  }

  const handleDeletePage = async (pageId: string) => {
    if (!confirm('Are you sure you want to delete this page?')) return

    setLoading(true)
    try {
      await cms.pages.delete(pageId)
      await loadPages()
      toast.success('Page deleted successfully')
    } catch (error) {
      console.error('Error deleting page:', error)
      toast.error('Failed to delete page')
    } finally {
      setLoading(false)
    }
  }

  const handleEditPage = (page: PageContent) => {
    setSelectedPage(page)
    setFormData({
      title: page.title,
      slug: page.slug,
      description: page.description,
      seoTitle: page.seoTitle,
      seoDescription: page.seoDescription,
      published: page.published,
      blocks: page.blocks
    })
    setIsEditing(true)
  }

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9 -]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim()
  }

  const addBlock = (type: ContentBlock['type']) => {
    const newBlock: ContentBlock = {
      id: `block_${Date.now()}`,
      type,
      content: getDefaultContent(type)
    }

    setFormData(prev => ({
      ...prev,
      blocks: [...(prev.blocks || []), newBlock]
    }))
  }

  const getDefaultContent = (type: ContentBlock['type']) => {
    switch (type) {
      case 'text':
        return 'Enter your text here...'
      case 'richText':
        return '<p>Enter your rich text content here...</p>'
      case 'image':
        return { url: '', alt: '', caption: '' }
      case 'video':
        return { url: '', title: '', description: '' }
      case 'button':
        return { text: 'Click me', href: '#', variant: 'primary' }
      case 'list':
        return { items: ['Item 1', 'Item 2', 'Item 3'], ordered: false }
      case 'hero':
        return { 
          title: 'Hero Title', 
          subtitle: 'Hero subtitle', 
          backgroundImage: '', 
          ctaText: 'Get Started',
          ctaHref: '#'
        }
      case 'section':
        return { title: 'Section Title', content: 'Section content' }
      default:
        return ''
    }
  }

  const updateBlock = (blockId: string, content: any) => {
    setFormData(prev => ({
      ...prev,
      blocks: prev.blocks?.map(block => 
        block.id === blockId ? { ...block, content } : block
      ) || []
    }))
  }

  const removeBlock = (blockId: string) => {
    setFormData(prev => ({
      ...prev,
      blocks: prev.blocks?.filter(block => block.id !== blockId) || []
    }))
  }

  const defaultPages = [
    { id: 'home', title: 'Home', slug: '/', description: 'Homepage content' },
    { id: 'about', title: 'About', slug: '/about', description: 'About us page' },
    { id: 'services', title: 'Services', slug: '/services', description: 'Our services' },
    { id: 'products', title: 'Products', slug: '/products', description: 'Our products' },
    { id: 'blog', title: 'Blog', slug: '/blog', description: 'Blog listing page' },
    { id: 'contact', title: 'Contact', slug: '/contact', description: 'Contact us page' },
    { id: 'privacy', title: 'Privacy Policy', slug: '/privacy', description: 'Privacy policy' },
    { id: 'terms', title: 'Terms of Service', slug: '/terms', description: 'Terms of service' }
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Page Management</h2>
          <p className="text-muted-foreground">
            Manage all website pages and their content
          </p>
        </div>
        <Dialog open={isCreating} onOpenChange={setIsCreating}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Create Page
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Create New Page</DialogTitle>
              <DialogDescription>
                Add a new page to your website
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Page Title</Label>
                  <Input
                    id="title"
                    value={formData.title || ''}
                    onChange={(e) => {
                      setFormData(prev => ({ 
                        ...prev, 
                        title: e.target.value,
                        slug: generateSlug(e.target.value)
                      }))
                    }}
                    placeholder="Enter page title"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="slug">Page Slug</Label>
                  <Input
                    id="slug"
                    value={formData.slug || ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
                    placeholder="/page-url"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description || ''}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Page description"
                  rows={3}
                />
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="published"
                  checked={formData.published || false}
                  onCheckedChange={(checked) => setFormData(prev => ({ ...prev, published: checked }))}
                />
                <Label htmlFor="published">Publish immediately</Label>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsCreating(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreatePage} disabled={loading}>
                {loading ? 'Creating...' : 'Create Page'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Pages List */}
      <div className="grid gap-4">
        {pages.map((page) => (
          <Card key={page.id}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium">{page.title}</h3>
                    <Badge variant={page.published ? "default" : "secondary"}>
                      {page.published ? (
                        <>
                          <Eye className="mr-1 h-3 w-3" />
                          Published
                        </>
                      ) : (
                        <>
                          <EyeOff className="mr-1 h-3 w-3" />
                          Draft
                        </>
                      )}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{page.slug}</p>
                  {page.description && (
                    <p className="text-sm text-muted-foreground">{page.description}</p>
                  )}
                  <p className="text-xs text-muted-foreground">
                    Last modified: {new Date(page.lastModified).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleEditPage(page)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleDeletePage(page.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {/* Show default pages if no pages exist */}
        {pages.length === 0 && (
          <Card>
            <CardHeader>
              <CardTitle>No Pages Found</CardTitle>
              <CardDescription>
                Create your first page to get started
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-2">
                <p className="text-sm text-muted-foreground mb-4">
                  Suggested pages to create:
                </p>
                {defaultPages.map((page) => (
                  <div key={page.id} className="flex items-center justify-between p-2 border rounded">
                    <div>
                      <p className="text-sm font-medium">{page.title}</p>
                      <p className="text-xs text-muted-foreground">{page.description}</p>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        setFormData({
                          title: page.title,
                          slug: page.slug,
                          description: page.description,
                          published: false,
                          blocks: []
                        })
                        setIsCreating(true)
                      }}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Edit Page Dialog */}
      <Dialog open={isEditing} onOpenChange={setIsEditing}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden">
          <DialogHeader>
            <DialogTitle>Edit Page: {selectedPage?.title}</DialogTitle>
            <DialogDescription>
              Edit page content and settings
            </DialogDescription>
          </DialogHeader>
          
          <Tabs defaultValue="content" className="flex-1 overflow-hidden">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="content">Content</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
              <TabsTrigger value="seo">SEO</TabsTrigger>
            </TabsList>
            
            <div className="overflow-y-auto max-h-[60vh] mt-4">
              <TabsContent value="content" className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">Page Blocks</h4>
                  <div className="flex items-center gap-2">
                    <Button size="sm" variant="outline" onClick={() => addBlock('text')}>
                      <Type className="h-4 w-4 mr-1" />
                      Text
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => addBlock('image')}>
                      <ImageIcon className="h-4 w-4 mr-1" />
                      Image
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => addBlock('button')}>
                      <Link className="h-4 w-4 mr-1" />
                      Button
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => addBlock('list')}>
                      <List className="h-4 w-4 mr-1" />
                      List
                    </Button>
                  </div>
                </div>
                
                <div className="space-y-4">
                  {formData.blocks?.map((block) => (
                    <Card key={block.id}>
                      <CardHeader className="pb-2">
                        <div className="flex items-center justify-between">
                          <Badge variant="outline">{block.type}</Badge>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => removeBlock(block.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardHeader>
                      <CardContent>
                        {block.type === 'text' && (
                          <Textarea
                            value={block.content}
                            onChange={(e) => updateBlock(block.id, e.target.value)}
                            placeholder="Enter text content..."
                          />
                        )}
                        {block.type === 'image' && (
                          <div className="space-y-2">
                            <Input
                              value={block.content.url || ''}
                              onChange={(e) => updateBlock(block.id, { ...block.content, url: e.target.value })}
                              placeholder="Image URL"
                            />
                            <Input
                              value={block.content.alt || ''}
                              onChange={(e) => updateBlock(block.id, { ...block.content, alt: e.target.value })}
                              placeholder="Alt text"
                            />
                          </div>
                        )}
                        {block.type === 'button' && (
                          <div className="space-y-2">
                            <Input
                              value={block.content.text || ''}
                              onChange={(e) => updateBlock(block.id, { ...block.content, text: e.target.value })}
                              placeholder="Button text"
                            />
                            <Input
                              value={block.content.href || ''}
                              onChange={(e) => updateBlock(block.id, { ...block.content, href: e.target.value })}
                              placeholder="Button link"
                            />
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                  
                  {(!formData.blocks || formData.blocks.length === 0) && (
                    <div className="text-center py-8 text-muted-foreground">
                      No content blocks added yet. Use the buttons above to add content.
                    </div>
                  )}
                </div>
              </TabsContent>
              
              <TabsContent value="settings" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="edit-title">Page Title</Label>
                    <Input
                      id="edit-title"
                      value={formData.title || ''}
                      onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="edit-slug">Page Slug</Label>
                    <Input
                      id="edit-slug"
                      value={formData.slug || ''}
                      onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-description">Description</Label>
                  <Textarea
                    id="edit-description"
                    value={formData.description || ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    rows={3}
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="edit-published"
                    checked={formData.published || false}
                    onCheckedChange={(checked) => setFormData(prev => ({ ...prev, published: checked }))}
                  />
                  <Label htmlFor="edit-published">Published</Label>
                </div>
              </TabsContent>
              
              <TabsContent value="seo" className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="seo-title">SEO Title</Label>
                  <Input
                    id="seo-title"
                    value={formData.seoTitle || ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, seoTitle: e.target.value }))}
                    placeholder="SEO optimized title"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="seo-description">SEO Description</Label>
                  <Textarea
                    id="seo-description"
                    value={formData.seoDescription || ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, seoDescription: e.target.value }))}
                    placeholder="SEO meta description"
                    rows={3}
                  />
                </div>
              </TabsContent>
            </div>
          </Tabs>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditing(false)}>
              Cancel
            </Button>
            <Button onClick={handleUpdatePage} disabled={loading}>
              <Save className="mr-2 h-4 w-4" />
              {loading ? 'Saving...' : 'Save Changes'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}