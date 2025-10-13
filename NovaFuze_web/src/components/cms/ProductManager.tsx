import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { Textarea } from '../ui/textarea'
import { Badge } from '../ui/badge'
import { Switch } from '../ui/switch'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog'
import { 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  EyeOff, 
  Save, 
  Upload,
  Package,
  IndianRupee,
  Tag
} from 'lucide-react'
import { useCMS } from '../../hooks/useCMS'
import type { Product } from '../../types/cms'
import { toast } from 'sonner@2.0.3'

export function ProductManager() {
  const [products, setProducts] = useState<Product[]>([])
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [isCreating, setIsCreating] = useState(false)
  const [loading, setLoading] = useState(false)
  const [featuredImageFile, setFeaturedImageFile] = useState<File | null>(null)
  const cms = useCMS()

  // Form state
  const [formData, setFormData] = useState<Partial<Product>>({
    name: '',
    slug: '',
    description: '',
    shortDescription: '',
    price: 0,
    currency: 'INR',
    features: [],
    category: '',
    tags: [],
    specifications: {},
    published: false,
    inStock: true
  })

  const categories = [
    'Software Solutions',
    'Web Applications',
    'Mobile Apps',
    'SaaS Products',
    'Digital Tools',
    'Templates',
    'Plugins',
    'Services'
  ]

  useEffect(() => {
    loadProducts()
  }, [])

  const loadProducts = async () => {
    try {
      const allProducts = await cms.products.getAll()
      setProducts(allProducts)
    } catch (error) {
      console.error('Error loading products:', error)
    }
  }

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9 -]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim()
  }

  const handleCreateProduct = async () => {
    if (!formData.name || !formData.description) {
      toast.error('Please provide name and description')
      return
    }

    setLoading(true)
    try {
      let featuredImage = ''
      if (featuredImageFile) {
        featuredImage = await cms.uploadImage(featuredImageFile, 'products')
      }

      const newProduct: Product = {
        id: formData.slug || generateSlug(formData.name!),
        name: formData.name!,
        slug: formData.slug || generateSlug(formData.name!),
        description: formData.description!,
        shortDescription: formData.shortDescription || '',
        price: formData.price || 0,
        currency: formData.currency || 'INR',
        featuredImage,
        gallery: [],
        features: formData.features || [],
        category: formData.category || 'Software Solutions',
        tags: formData.tags || [],
        specifications: formData.specifications || {},
        published: formData.published || false,
        inStock: formData.inStock !== false,
        lastModified: new Date()
      }

      await cms.products.create(newProduct.id, newProduct)
      await loadProducts()
      setIsCreating(false)
      resetForm()
      toast.success('Product created successfully')
    } catch (error) {
      console.error('Error creating product:', error)
      toast.error('Failed to create product')
    } finally {
      setLoading(false)
    }
  }

  const handleUpdateProduct = async () => {
    if (!selectedProduct || !formData.name) return

    setLoading(true)
    try {
      let featuredImage = selectedProduct.featuredImage
      if (featuredImageFile) {
        featuredImage = await cms.uploadImage(featuredImageFile, 'products')
      }

      const updatedData = {
        ...formData,
        featuredImage
      }

      await cms.products.update(selectedProduct.id, updatedData)
      await loadProducts()
      setIsEditing(false)
      setSelectedProduct(null)
      resetForm()
      toast.success('Product updated successfully')
    } catch (error) {
      console.error('Error updating product:', error)
      toast.error('Failed to update product')
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteProduct = async (productId: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return

    setLoading(true)
    try {
      await cms.products.delete(productId)
      await loadProducts()
      toast.success('Product deleted successfully')
    } catch (error) {
      console.error('Error deleting product:', error)
      toast.error('Failed to delete product')
    } finally {
      setLoading(false)
    }
  }

  const handleEditProduct = (product: Product) => {
    setSelectedProduct(product)
    setFormData({
      name: product.name,
      slug: product.slug,
      description: product.description,
      shortDescription: product.shortDescription,
      price: product.price,
      currency: product.currency,
      features: product.features,
      category: product.category,
      tags: product.tags,
      specifications: product.specifications,
      published: product.published,
      inStock: product.inStock
    })
    setIsEditing(true)
  }

  const resetForm = () => {
    setFormData({
      name: '',
      slug: '',
      description: '',
      shortDescription: '',
      price: 0,
      currency: 'INR',
      features: [],
      category: '',
      tags: [],
      specifications: {},
      published: false,
      inStock: true
    })
    setFeaturedImageFile(null)
  }

  const handleFeaturesChange = (featuresString: string) => {
    const features = featuresString.split('\n').map(feature => feature.trim()).filter(feature => feature)
    setFormData(prev => ({ ...prev, features }))
  }

  const handleTagsChange = (tagsString: string) => {
    const tags = tagsString.split(',').map(tag => tag.trim()).filter(tag => tag)
    setFormData(prev => ({ ...prev, tags }))
  }

  const formatPrice = (price: number, currency: string) => {
    if (currency === 'INR') {
      return `₹${price.toLocaleString('en-IN')}`
    }
    return `${currency} ${price}`
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Product Management</h2>
          <p className="text-muted-foreground">
            Manage your products and services catalog
          </p>
        </div>
        <Dialog open={isCreating} onOpenChange={(open) => {
          setIsCreating(open)
          if (!open) resetForm()
        }}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Product
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Create New Product</DialogTitle>
              <DialogDescription>
                Add a new product to your catalog
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-6 py-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Product Name</Label>
                  <Input
                    id="name"
                    value={formData.name || ''}
                    onChange={(e) => {
                      setFormData(prev => ({ 
                        ...prev, 
                        name: e.target.value,
                        slug: generateSlug(e.target.value)
                      }))
                    }}
                    placeholder="Enter product name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="slug">Slug</Label>
                  <Input
                    id="slug"
                    value={formData.slug || ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
                    placeholder="product-url"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select
                    value={formData.category || ''}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="price">Price</Label>
                  <Input
                    id="price"
                    type="number"
                    value={formData.price || 0}
                    onChange={(e) => setFormData(prev => ({ ...prev, price: parseFloat(e.target.value) || 0 }))}
                    placeholder="0"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="currency">Currency</Label>
                  <Select
                    value={formData.currency || 'INR'}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, currency: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="INR">INR (₹)</SelectItem>
                      <SelectItem value="USD">USD ($)</SelectItem>
                      <SelectItem value="EUR">EUR (€)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="shortDescription">Short Description</Label>
                <Textarea
                  id="shortDescription"
                  value={formData.shortDescription || ''}
                  onChange={(e) => setFormData(prev => ({ ...prev, shortDescription: e.target.value }))}
                  placeholder="Brief product description"
                  rows={2}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Full Description</Label>
                <Textarea
                  id="description"
                  value={formData.description || ''}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Detailed product description"
                  rows={6}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="features">Features (one per line)</Label>
                <Textarea
                  id="features"
                  value={formData.features?.join('\n') || ''}
                  onChange={(e) => handleFeaturesChange(e.target.value)}
                  placeholder="Feature 1&#10;Feature 2&#10;Feature 3"
                  rows={4}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="tags">Tags (comma separated)</Label>
                <Input
                  id="tags"
                  value={formData.tags?.join(', ') || ''}
                  onChange={(e) => handleTagsChange(e.target.value)}
                  placeholder="web, development, react"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="featuredImage">Featured Image</Label>
                <Input
                  id="featuredImage"
                  type="file"
                  accept="image/*"
                  onChange={(e) => setFeaturedImageFile(e.target.files?.[0] || null)}
                />
              </div>

              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="published"
                    checked={formData.published || false}
                    onCheckedChange={(checked) => setFormData(prev => ({ ...prev, published: checked }))}
                  />
                  <Label htmlFor="published">Published</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="inStock"
                    checked={formData.inStock !== false}
                    onCheckedChange={(checked) => setFormData(prev => ({ ...prev, inStock: checked }))}
                  />
                  <Label htmlFor="inStock">In Stock</Label>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsCreating(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreateProduct} disabled={loading}>
                <Save className="mr-2 h-4 w-4" />
                {loading ? 'Creating...' : 'Create Product'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Products List */}
      <div className="grid gap-4">
        {products.map((product) => (
          <Card key={product.id}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-medium">{product.name}</h3>
                    <Badge variant={product.published ? "default" : "secondary"}>
                      {product.published ? (
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
                    <Badge variant={product.inStock ? "default" : "destructive"}>
                      {product.inStock ? 'In Stock' : 'Out of Stock'}
                    </Badge>
                    <Badge variant="outline">{product.category}</Badge>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <IndianRupee className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium text-lg">
                      {formatPrice(product.price, product.currency)}
                    </span>
                  </div>
                  
                  {product.shortDescription && (
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {product.shortDescription}
                    </p>
                  )}
                  
                  {product.tags && product.tags.length > 0 && (
                    <div className="flex items-center gap-1 flex-wrap">
                      <Tag className="h-3 w-3 text-muted-foreground" />
                      {product.tags.map((tag, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  )}

                  <p className="text-xs text-muted-foreground">
                    Last modified: {new Date(product.lastModified).toLocaleDateString()}
                  </p>
                </div>
                
                {product.featuredImage && (
                  <img 
                    src={product.featuredImage} 
                    alt={product.name}
                    className="w-24 h-24 object-cover rounded"
                  />
                )}
                
                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleEditProduct(product)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleDeleteProduct(product.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {products.length === 0 && (
          <Card>
            <CardHeader>
              <CardTitle>No Products</CardTitle>
              <CardDescription>
                Add your first product to get started
              </CardDescription>
            </CardHeader>
          </Card>
        )}
      </div>

      {/* Edit Product Dialog (similar structure to create, with pre-filled data) */}
      <Dialog open={isEditing} onOpenChange={(open) => {
        setIsEditing(open)
        if (!open) {
          setSelectedProduct(null)
          resetForm()
        }
      }}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Product: {selectedProduct?.name}</DialogTitle>
            <DialogDescription>
              Update your product information
            </DialogDescription>
          </DialogHeader>
          {/* Same form structure as create dialog */}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditing(false)}>
              Cancel
            </Button>
            <Button onClick={handleUpdateProduct} disabled={loading}>
              <Save className="mr-2 h-4 w-4" />
              {loading ? 'Saving...' : 'Save Changes'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}