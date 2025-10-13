import { useState, useEffect } from 'react';
import { Button } from '../../ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../ui/tabs';
import { Badge } from '../../ui/badge';
import { Input } from '../../ui/input';
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Package,
  Globe,
  Save,
  DollarSign
} from 'lucide-react';
import { toast } from 'sonner';
import { productService, Product } from '../../../firebase/firestore';
import { useAuth } from '../../../hooks/useAuth';
import { ProductEditor } from './ProductEditor';
import { 
  AlertDialog, 
  AlertDialogAction, 
  AlertDialogCancel, 
  AlertDialogContent, 
  AlertDialogDescription, 
  AlertDialogFooter, 
  AlertDialogHeader, 
  AlertDialogTitle, 
  AlertDialogTrigger 
} from '../../ui/alert-dialog';

export const ProductManager = () => {
  const { user } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [draftProducts, setDraftProducts] = useState<Product[]>([]);
  const [publishedProducts, setPublishedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('all');

  useEffect(() => {
    const unsubscribeAll = productService.onSnapshot((products) => {
      setProducts(products);
      setDraftProducts(products.filter(product => product.status === 'draft'));
      setPublishedProducts(products.filter(product => product.status === 'published'));
      setLoading(false);
    });

    return unsubscribeAll;
  }, []);

  const filteredProducts = (list: Product[]) => {
    return list.filter(product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const handleEdit = (product: Product) => {
    setSelectedProduct(product);
    setIsEditing(true);
  };

  const handleCreate = () => {
    const newProduct: Partial<Product> = {
      name: '',
      description: '',
      price: 0,
      currency: 'INR',
      images: [],
      features: [],
      category: '',
      specifications: {},
      status: 'draft',
      slug: '',
      lastEditedBy: user?.email || '',
      seo: {
        metaTitle: '',
        metaDescription: '',
        keywords: []
      }
    };
    setSelectedProduct(newProduct as Product);
    setIsEditing(true);
  };

  const handlePublish = async (product: Product) => {
    try {
      await productService.publish(product.id, user?.email || '');
      toast.success('Product published successfully!');
    } catch (error) {
      toast.error('Failed to publish product');
      console.error(error);
    }
  };

  const handleUnpublish = async (product: Product) => {
    try {
      await productService.unpublish(product.id, user?.email || '');
      toast.success('Product moved to drafts');
    } catch (error) {
      toast.error('Failed to unpublish product');
      console.error(error);
    }
  };

  const handleDelete = async (product: Product) => {
    try {
      await productService.delete(product.id);
      toast.success('Product deleted successfully!');
    } catch (error) {
      toast.error('Failed to delete product');
      console.error(error);
    }
  };

  const handleCloseEditor = () => {
    setSelectedProduct(null);
    setIsEditing(false);
  };

  if (isEditing && selectedProduct) {
    return (
      <ProductEditor 
        product={selectedProduct} 
        onClose={handleCloseEditor}
        onSave={() => {
          handleCloseEditor();
          toast.success('Product saved successfully!');
        }}
      />
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold mb-2">Product Management</h2>
          <p className="text-muted-foreground">
            Create, edit, and manage your products. Monitor live and draft content.
          </p>
        </div>
        <Button onClick={handleCreate}>
          <Plus className="mr-2 h-4 w-4" />
          New Product
        </Button>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-9"
        />
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="all" className="flex items-center gap-2">
            <Package className="h-4 w-4" />
            All Products ({products.length})
          </TabsTrigger>
          <TabsTrigger value="published" className="flex items-center gap-2">
            <Globe className="h-4 w-4" />
            Published ({publishedProducts.length})
          </TabsTrigger>
          <TabsTrigger value="drafts" className="flex items-center gap-2">
            <Edit className="h-4 w-4" />
            Drafts ({draftProducts.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <ProductList 
            products={filteredProducts(products)} 
            loading={loading}
            onEdit={handleEdit}
            onPublish={handlePublish}
            onUnpublish={handleUnpublish}
            onDelete={handleDelete}
          />
        </TabsContent>

        <TabsContent value="published">
          <ProductList 
            products={filteredProducts(publishedProducts)} 
            loading={loading}
            onEdit={handleEdit}
            onPublish={handlePublish}
            onUnpublish={handleUnpublish}
            onDelete={handleDelete}
          />
        </TabsContent>

        <TabsContent value="drafts">
          <ProductList 
            products={filteredProducts(draftProducts)} 
            loading={loading}
            onEdit={handleEdit}
            onPublish={handlePublish}
            onUnpublish={handleUnpublish}
            onDelete={handleDelete}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

interface ProductListProps {
  products: Product[];
  loading: boolean;
  onEdit: (product: Product) => void;
  onPublish: (product: Product) => void;
  onUnpublish: (product: Product) => void;
  onDelete: (product: Product) => void;
}

const ProductList = ({ products, loading, onEdit, onPublish, onUnpublish, onDelete }: ProductListProps) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 gap-4">
        {[...Array(3)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardHeader>
              <div className="h-6 bg-muted rounded w-3/4"></div>
              <div className="h-4 bg-muted rounded w-1/2"></div>
            </CardHeader>
            <CardContent>
              <div className="h-4 bg-muted rounded w-full mb-2"></div>
              <div className="h-4 bg-muted rounded w-2/3"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <Card>
        <CardContent className="text-center py-12">
          <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium mb-2">No products found</h3>
          <p className="text-muted-foreground">
            Create your first product to get started.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {products.map((product) => (
        <Card key={product.id} className="hover:shadow-md transition-shadow">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <CardTitle className="text-lg">{product.name || 'Untitled'}</CardTitle>
                  <Badge variant={product.status === 'published' ? 'default' : 'secondary'}>
                    {product.status}
                  </Badge>
                  <Badge variant="outline">
                    {product.category || 'Uncategorized'}
                  </Badge>
                </div>
                <CardDescription className="line-clamp-2">
                  {product.description || 'No description available'}
                </CardDescription>
              </div>
              {product.images && product.images.length > 0 && (
                <div className="ml-4 flex-shrink-0">
                  <img 
                    src={product.images[0]} 
                    alt={product.name}
                    className="w-20 h-20 object-cover rounded"
                  />
                </div>
              )}
            </div>
          </CardHeader>
          
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <DollarSign className="h-3 w-3" />
                  ₹{product.price?.toLocaleString() || '0'}
                </div>
                <div>
                  Updated: {product.updatedAt.toLocaleDateString()}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={() => onEdit(product)}>
                  <Edit className="h-3 w-3 mr-1" />
                  Edit
                </Button>

                {product.status === 'draft' ? (
                  <Button size="sm" onClick={() => onPublish(product)}>
                    <Globe className="h-3 w-3 mr-1" />
                    Publish
                  </Button>
                ) : (
                  <Button variant="outline" size="sm" onClick={() => onUnpublish(product)}>
                    <Save className="h-3 w-3 mr-1" />
                    Unpublish
                  </Button>
                )}

                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="outline" size="sm">
                      <Trash2 className="h-3 w-3 mr-1" />
                      Delete
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Delete Product</AlertDialogTitle>
                      <AlertDialogDescription>
                        Are you sure you want to delete "{product.name}"? This action cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={() => onDelete(product)} className="bg-destructive text-destructive-foreground">
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};