import { useState, useEffect } from 'react';
import { Button } from '../../ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../ui/tabs';
import { Badge } from '../../ui/badge';
import { Input } from '../../ui/input';
import { 
  Plus, 
  Search, 
  Eye, 
  Edit, 
  Trash2, 
  Calendar,
  User,
  Clock,
  FileText,
  Globe,
  Save,
  X
} from 'lucide-react';
import { toast } from 'sonner';
import { blogService, BlogPost } from '../../../firebase/firestore';
import { useAuth } from '../../../hooks/useAuth';
import { BlogEditor } from './BlogEditor';
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

export const BlogManager = () => {
  const { user } = useAuth();
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [draftBlogs, setDraftBlogs] = useState<BlogPost[]>([]);
  const [publishedBlogs, setPublishedBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBlog, setSelectedBlog] = useState<BlogPost | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('all');

  useEffect(() => {
    let unsubscribe: () => void | undefined;
    let pollInterval: NodeJS.Timeout;

    const loadData = async () => {
      try {
        // Try using real-time listeners first (only for admin users with proper Firebase connection)
        if (user && window.location.hash.startsWith('#admin')) {
          unsubscribe = blogService.onSnapshot((blogs) => {
            setBlogs(blogs);
            setDraftBlogs(blogs.filter(blog => blog.status === 'draft'));
            setPublishedBlogs(blogs.filter(blog => blog.status === 'published'));
            setLoading(false);
          });
        } else {
          // Fallback to polling for non-admin or when Firebase is not ready
          const fetchBlogs = async () => {
            try {
              const allBlogs = await blogService.getAll();
              setBlogs(allBlogs);
              setDraftBlogs(allBlogs.filter(blog => blog.status === 'draft'));
              setPublishedBlogs(allBlogs.filter(blog => blog.status === 'published'));
              setLoading(false);
            } catch (error) {
              console.warn('Failed to fetch blogs, using empty state:', error);
              setBlogs([]);
              setDraftBlogs([]);
              setPublishedBlogs([]);
              setLoading(false);
            }
          };

          // Initial load
          await fetchBlogs();
          
          // Poll every 30 seconds
          pollInterval = setInterval(fetchBlogs, 30000);
        }
      } catch (error) {
        console.error('Error setting up blog data loading:', error);
        setLoading(false);
      }
    };

    loadData();

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
      if (pollInterval) {
        clearInterval(pollInterval);
      }
    };
  }, [user]);

  const filteredBlogs = (list: BlogPost[]) => {
    return list.filter(blog =>
      blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.author.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const handleEdit = (blog: BlogPost) => {
    setSelectedBlog(blog);
    setIsEditing(true);
  };

  const handleCreate = () => {
    const newBlog: Partial<BlogPost> = {
      title: '',
      content: '',
      excerpt: '',
      featuredImage: '',
      tags: [],
      author: user?.displayName || user?.email || '',
      readTime: 5,
      status: 'draft',
      slug: '',
      lastEditedBy: user?.email || '',
      seo: {
        metaTitle: '',
        metaDescription: '',
        keywords: []
      }
    };
    setSelectedBlog(newBlog as BlogPost);
    setIsEditing(true);
  };

  const handlePublish = async (blog: BlogPost) => {
    try {
      await blogService.publish(blog.id, user?.email || '');
      toast.success('Blog post published successfully!');
    } catch (error) {
      toast.error('Failed to publish blog post');
      console.error(error);
    }
  };

  const handleUnpublish = async (blog: BlogPost) => {
    try {
      await blogService.unpublish(blog.id, user?.email || '');
      toast.success('Blog post moved to drafts');
    } catch (error) {
      toast.error('Failed to unpublish blog post');
      console.error(error);
    }
  };

  const handleDelete = async (blog: BlogPost) => {
    try {
      await blogService.delete(blog.id);
      toast.success('Blog post deleted successfully!');
    } catch (error) {
      toast.error('Failed to delete blog post');
      console.error(error);
    }
  };

  const handleCloseEditor = () => {
    setSelectedBlog(null);
    setIsEditing(false);
  };

  if (isEditing && selectedBlog) {
    return (
      <BlogEditor 
        blog={selectedBlog} 
        onClose={handleCloseEditor}
        onSave={() => {
          handleCloseEditor();
          toast.success('Blog post saved successfully!');
        }}
      />
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold mb-2">Blog Management</h2>
          <p className="text-muted-foreground">
            Create, edit, and manage your blog posts. Monitor live and draft content.
          </p>
        </div>
        <Button onClick={handleCreate}>
          <Plus className="mr-2 h-4 w-4" />
          New Blog Post
        </Button>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search blog posts..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-9"
        />
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="all" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            All Posts ({blogs.length})
          </TabsTrigger>
          <TabsTrigger value="published" className="flex items-center gap-2">
            <Globe className="h-4 w-4" />
            Published ({publishedBlogs.length})
          </TabsTrigger>
          <TabsTrigger value="drafts" className="flex items-center gap-2">
            <Edit className="h-4 w-4" />
            Drafts ({draftBlogs.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <BlogList 
            blogs={filteredBlogs(blogs)} 
            loading={loading}
            onEdit={handleEdit}
            onPublish={handlePublish}
            onUnpublish={handleUnpublish}
            onDelete={handleDelete}
          />
        </TabsContent>

        <TabsContent value="published">
          <BlogList 
            blogs={filteredBlogs(publishedBlogs)} 
            loading={loading}
            onEdit={handleEdit}
            onPublish={handlePublish}
            onUnpublish={handleUnpublish}
            onDelete={handleDelete}
          />
        </TabsContent>

        <TabsContent value="drafts">
          <BlogList 
            blogs={filteredBlogs(draftBlogs)} 
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

interface BlogListProps {
  blogs: BlogPost[];
  loading: boolean;
  onEdit: (blog: BlogPost) => void;
  onPublish: (blog: BlogPost) => void;
  onUnpublish: (blog: BlogPost) => void;
  onDelete: (blog: BlogPost) => void;
}

const BlogList = ({ blogs, loading, onEdit, onPublish, onUnpublish, onDelete }: BlogListProps) => {
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

  if (blogs.length === 0) {
    return (
      <Card>
        <CardContent className="text-center py-12">
          <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium mb-2">No blog posts found</h3>
          <p className="text-muted-foreground">
            Create your first blog post to get started.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {blogs.map((blog) => (
        <Card key={blog.id} className="hover:shadow-md transition-shadow">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <CardTitle className="text-lg">{blog.title || 'Untitled'}</CardTitle>
                  <Badge variant={blog.status === 'published' ? 'default' : 'secondary'}>
                    {blog.status}
                  </Badge>
                </div>
                <CardDescription className="line-clamp-2">
                  {blog.excerpt || 'No excerpt available'}
                </CardDescription>
              </div>
              {blog.featuredImage && (
                <div className="ml-4 flex-shrink-0">
                  <img 
                    src={blog.featuredImage} 
                    alt={blog.title}
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
                  <User className="h-3 w-3" />
                  {blog.author}
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  {blog.updatedAt.toLocaleDateString()}
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {blog.readTime} min read
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={() => onEdit(blog)}>
                  <Edit className="h-3 w-3 mr-1" />
                  Edit
                </Button>

                {blog.status === 'draft' ? (
                  <Button size="sm" onClick={() => onPublish(blog)}>
                    <Globe className="h-3 w-3 mr-1" />
                    Publish
                  </Button>
                ) : (
                  <Button variant="outline" size="sm" onClick={() => onUnpublish(blog)}>
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
                      <AlertDialogTitle>Delete Blog Post</AlertDialogTitle>
                      <AlertDialogDescription>
                        Are you sure you want to delete "{blog.title}"? This action cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={() => onDelete(blog)} className="bg-destructive text-destructive-foreground">
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