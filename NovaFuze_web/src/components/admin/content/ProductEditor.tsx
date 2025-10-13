import { useState, useEffect } from 'react';
import { Button } from '../../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Input } from '../../ui/input';
import { Label } from '../../ui/label';
import { Textarea } from '../../ui/textarea';
import { Badge } from '../../ui/badge';
import { 
  Save, 
  X, 
  Eye, 
  Globe, 
  Package, 
  Upload,
  DollarSign,
  Settings,
  Clock,
  Plus,
  Trash2
} from 'lucide-react';
import { toast } from 'sonner';
import { Product, productService } from '../../../firebase/firestore';
import { useAuth } from '../../../hooks/useAuth';
import { useAutoSave } from '../../../hooks/useAutoSave';
import { uploadImage } from '../../../firebase/storage';
import { ImageWithFallback } from '../../figma/ImageWithFallback';

interface ProductEditorProps {
  product: Product;
  onClose: () => void;
  onSave: () => void;
}

export const ProductEditor = ({ product, onClose, onSave }: ProductEditorProps) => {
  const { user } = useAuth();
  const [features, setFeatures] = useState<string[]>(product.features || []);
  const [newFeature, setNewFeature] = useState('');
  const [specifications, setSpecifications] = useState<Record<string, string>>(product.specifications || {});
  const [newSpecKey, setNewSpecKey] = useState('');
  const [newSpecValue, setNewSpecValue] = useState('');
  const [imageUploading, setImageUploading] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);

  // Auto-save functionality
  const {
    data: productData,
    updateData,
    save,
    isSaving,
    lastSaved,
    hasUnsavedChanges,
    error
  } = useAutoSave(productService, product, { delay: 2000 });

  useEffect(() => {
    updateData({ features, specifications });
  }, [features, specifications, updateData]);

  // Generate slug from name
  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  };

  const handleNameChange = (name: string) => {
    const slug = generateSlug(name);
    updateData({ name, slug });
  };

  const handleAddFeature = () => {
    if (newFeature.trim() && !features.includes(newFeature.trim())) {
      setFeatures([...features, newFeature.trim()]);
      setNewFeature('');
    }
  };

  const handleRemoveFeature = (featureToRemove: string) => {
    setFeatures(features.filter(feature => feature !== featureToRemove));
  };

  const handleAddSpecification = () => {
    if (newSpecKey.trim() && newSpecValue.trim()) {
      setSpecifications({ ...specifications, [newSpecKey.trim()]: newSpecValue.trim() });
      setNewSpecKey('');
      setNewSpecValue('');
    }
  };

  const handleRemoveSpecification = (key: string) => {
    const { [key]: removed, ...rest } = specifications;
    setSpecifications(rest);
  };

  const handleImageUpload = async (file: File) => {
    try {
      setImageUploading(true);
      const imageUrl = await uploadImage(file, 'products', (progress) => {
        toast.loading(`Uploading... ${Math.round(progress.progress)}%`);
      });
      const currentImages = productData.images || [];
      updateData({ images: [...currentImages, imageUrl] });
      toast.success('Image uploaded successfully!');
    } catch (error) {
      toast.error('Failed to upload image');
      console.error(error);
    } finally {
      setImageUploading(false);
    }
  };

  const handleRemoveImage = (imageToRemove: string) => {
    const updatedImages = (productData.images || []).filter(img => img !== imageToRemove);
    updateData({ images: updatedImages });
  };

  const handlePublish = async () => {
    try {
      await save();
      if (productData.id) {
        await productService.publish(productData.id, user?.email || '');
        toast.success('Product published successfully!');
        onSave();
      }
    } catch (error) {
      toast.error('Failed to publish product');
      console.error(error);
    }
  };

  const handleSaveAsDraft = async () => {
    try {
      await updateData({ status: 'draft' });
      await save();
      toast.success('Product saved as draft!');
      onSave();
    } catch (error) {
      toast.error('Failed to save product');
      console.error(error);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm" onClick={onClose}>
            <X className="h-4 w-4 mr-2" />
            Close
          </Button>
          <div>
            <h2 className="text-2xl font-semibold">
              {productData.id ? 'Edit Product' : 'New Product'}
            </h2>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              {isSaving && (
                <Badge variant="secondary">
                  <Clock className="h-3 w-3 mr-1" />
                  Saving...
                </Badge>
              )}
              {lastSaved && !isSaving && (
                <span>Last saved: {lastSaved.toLocaleTimeString()}</span>
              )}
              {hasUnsavedChanges && !isSaving && (
                <Badge variant="outline">Unsaved changes</Badge>
              )}
              {error && (
                <Badge variant="destructive">Save failed</Badge>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPreviewMode(!previewMode)}
          >
            <Eye className="h-4 w-4 mr-2" />
            {previewMode ? 'Edit' : 'Preview'}
          </Button>
          
          <Button variant="outline" onClick={handleSaveAsDraft}>
            <Package className="h-4 w-4 mr-2" />
            Save Draft
          </Button>
          
          <Button onClick={handlePublish}>
            <Globe className="h-4 w-4 mr-2" />
            Publish
          </Button>
        </div>
      </div>

      {previewMode ? (
        <ProductPreview product={productData} />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Product Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="name">Product Name</Label>
                  <Input
                    id="name"
                    value={productData.name || ''}
                    onChange={(e) => handleNameChange(e.target.value)}
                    placeholder="Enter product name..."
                  />
                </div>

                <div>
                  <Label htmlFor="slug">Slug (URL)</Label>
                  <Input
                    id="slug"
                    value={productData.slug || ''}
                    onChange={(e) => updateData({ slug: e.target.value })}
                    placeholder="product-url"
                  />
                </div>

                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={productData.description || ''}
                    onChange={(e) => updateData({ description: e.target.value })}
                    placeholder="Product description..."
                    rows={6}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="price">Price (INR)</Label>
                    <Input
                      id="price"
                      type="number"
                      value={productData.price || ''}
                      onChange={(e) => updateData({ price: parseFloat(e.target.value) || 0 })}
                      placeholder="0"
                      min="0"
                      step="0.01"
                    />
                  </div>

                  <div>
                    <Label htmlFor="category">Category</Label>
                    <Input
                      id="category"
                      value={productData.category || ''}
                      onChange={(e) => updateData({ category: e.target.value })}
                      placeholder="Product category"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Features</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <Input
                    value={newFeature}
                    onChange={(e) => setNewFeature(e.target.value)}
                    placeholder="Add feature..."
                    onKeyPress={(e) => e.key === 'Enter' && handleAddFeature()}
                  />
                  <Button onClick={handleAddFeature} size="sm">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>

                <div className="space-y-2">
                  {features.map((feature, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-muted rounded">
                      <span>{feature}</span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleRemoveFeature(feature)}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Specifications</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-2">
                  <Input
                    value={newSpecKey}
                    onChange={(e) => setNewSpecKey(e.target.value)}
                    placeholder="Specification name"
                  />
                  <div className="flex gap-2">
                    <Input
                      value={newSpecValue}
                      onChange={(e) => setNewSpecValue(e.target.value)}
                      placeholder="Specification value"
                      onKeyPress={(e) => e.key === 'Enter' && handleAddSpecification()}
                    />
                    <Button onClick={handleAddSpecification} size="sm">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  {Object.entries(specifications).map(([key, value]) => (
                    <div key={key} className="flex items-center justify-between p-2 bg-muted rounded">
                      <span><strong>{key}:</strong> {value}</span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleRemoveSpecification(key)}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>SEO Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="metaTitle">Meta Title</Label>
                  <Input
                    id="metaTitle"
                    value={productData.seo?.metaTitle || ''}
                    onChange={(e) => updateData({ 
                      seo: { ...productData.seo, metaTitle: e.target.value } 
                    })}
                    placeholder="SEO optimized title..."
                  />
                </div>

                <div>
                  <Label htmlFor="metaDescription">Meta Description</Label>
                  <Textarea
                    id="metaDescription"
                    value={productData.seo?.metaDescription || ''}
                    onChange={(e) => updateData({ 
                      seo: { ...productData.seo, metaDescription: e.target.value } 
                    })}
                    placeholder="SEO description for search engines..."
                    rows={3}
                  />
                </div>

                <div>
                  <Label htmlFor="keywords">Keywords (comma separated)</Label>
                  <Input
                    id="keywords"
                    value={productData.seo?.keywords?.join(', ') || ''}
                    onChange={(e) => updateData({ 
                      seo: { 
                        ...productData.seo, 
                        keywords: e.target.value.split(',').map(k => k.trim()).filter(k => k) 
                      } 
                    })}
                    placeholder="keyword1, keyword2, keyword3"
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="status">Status</Label>
                  <select
                    id="status"
                    value={productData.status || 'draft'}
                    onChange={(e) => updateData({ status: e.target.value as 'draft' | 'published' })}
                    className="w-full p-2 border rounded-md"
                  >
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                  </select>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Product Images</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  {(productData.images || []).map((image, index) => (
                    <div key={index} className="relative">
                      <ImageWithFallback
                        src={image}
                        alt={`Product image ${index + 1}`}
                        className="w-full h-32 object-cover rounded"
                      />
                      <Button
                        variant="outline"
                        size="sm"
                        className="absolute top-2 right-2"
                        onClick={() => handleRemoveImage(image)}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                </div>

                <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
                  <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground mb-2">Upload product images</p>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleImageUpload(file);
                    }}
                    className="hidden"
                    id="image-upload"
                  />
                  <label htmlFor="image-upload">
                    <Button variant="outline" size="sm" asChild disabled={imageUploading}>
                      <span>Choose File</span>
                    </Button>
                  </label>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
};

const ProductPreview = ({ product }: { product: Product }) => {
  return (
    <Card>
      <CardContent className="p-8">
        <div className="max-w-4xl mx-auto">
          {/* Product Images */}
          {product.images && product.images.length > 0 && (
            <div className="mb-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {product.images.map((image, index) => (
                  <ImageWithFallback
                    key={index}
                    src={image}
                    alt={`${product.name} - Image ${index + 1}`}
                    className="w-full h-64 object-cover rounded-lg"
                  />
                ))}
              </div>
            </div>
          )}
          
          <div className="space-y-6">
            <header>
              <div className="flex items-center gap-2 mb-2">
                <h1 className="text-4xl font-bold">{product.name || 'Untitled Product'}</h1>
                {product.category && (
                  <Badge variant="outline">{product.category}</Badge>
                )}
              </div>
              
              <div className="flex items-center gap-2 text-3xl font-bold text-primary mb-4">
                <DollarSign className="h-8 w-8" />
                ₹{product.price?.toLocaleString() || '0'}
              </div>

              {product.description && (
                <p className="text-lg text-muted-foreground">
                  {product.description}
                </p>
              )}
            </header>

            {/* Features */}
            {product.features && product.features.length > 0 && (
              <div>
                <h3 className="text-xl font-semibold mb-4">Features</h3>
                <ul className="space-y-2">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-primary rounded-full" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Specifications */}
            {product.specifications && Object.keys(product.specifications).length > 0 && (
              <div>
                <h3 className="text-xl font-semibold mb-4">Specifications</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <div key={key} className="flex justify-between p-3 bg-muted rounded">
                      <span className="font-medium">{key}</span>
                      <span>{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};