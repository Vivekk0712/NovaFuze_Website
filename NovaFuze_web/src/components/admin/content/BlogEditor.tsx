import { useState, useEffect } from 'react';
import { Button } from '../../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Input } from '../../ui/input';
import { Label } from '../../ui/label';
import { Textarea } from '../../ui/textarea';
import { Badge } from '../../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../ui/tabs';
import { 
  Save, 
  X, 
  Eye, 
  Globe, 
  FileText, 
  Upload,
  Tag,
  Settings,
  Clock,
  User
} from 'lucide-react';
import { toast } from 'sonner';
import { BlogPost, blogService } from '../../../firebase/firestore';
import { useAuth } from '../../../hooks/useAuth';
import { useAutoSave } from '../../../hooks/useAutoSave';
import { uploadImage } from '../../../firebase/storage';
import { ImageWithFallback } from '../../figma/ImageWithFallback';

interface BlogEditorProps {
  blog: BlogPost;
  onClose: () => void;
  onSave: () => void;
}

export const BlogEditor = ({ blog, onClose, onSave }: BlogEditorProps) => {
  const { user } = useAuth();
  const [tags, setTags] = useState<string[]>(blog.tags || []);
  const [newTag, setNewTag] = useState('');
  const [imageUploading, setImageUploading] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);

  // Auto-save functionality
  const {
    data: blogData,
    updateData,
    save,
    isSaving,
    lastSaved,
    hasUnsavedChanges,
    error
  } = useAutoSave(blogService, blog, { delay: 2000 });

  useEffect(() => {
    updateData({ tags });
  }, [tags, updateData]);

  // Generate slug from title
  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  };

  const handleTitleChange = (title: string) => {
    const slug = generateSlug(title);
    updateData({ title, slug });
  };

  const handleAddTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()]);
      setNewTag('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleImageUpload = async (file: File) => {
    try {
      setImageUploading(true);
      const imageUrl = await uploadImage(file, 'blogs', (progress) => {
        toast.loading(`Uploading... ${Math.round(progress.progress)}%`);
      });
      updateData({ featuredImage: imageUrl });
      toast.success('Image uploaded successfully!');
    } catch (error) {
      toast.error('Failed to upload image');
      console.error(error);
    } finally {
      setImageUploading(false);
    }
  };

  const handlePublish = async () => {
    try {
      await save();
      if (blogData.id) {
        await blogService.publish(blogData.id, user?.email || '');
        toast.success('Blog post published successfully!');
        onSave();
      }
    } catch (error) {
      toast.error('Failed to publish blog post');
      console.error(error);
    }
  };

  const handleSaveAsDraft = async () => {
    try {
      await updateData({ status: 'draft' });
      await save();
      toast.success('Blog post saved as draft!');
      onSave();
    } catch (error) {
      toast.error('Failed to save blog post');
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
              {blogData.id ? 'Edit Blog Post' : 'New Blog Post'}
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
            <FileText className="h-4 w-4 mr-2" />
            Save Draft
          </Button>
          
          <Button onClick={handlePublish}>
            <Globe className="h-4 w-4 mr-2" />
            Publish
          </Button>
        </div>
      </div>

      {previewMode ? (
        <BlogPreview blog={blogData} />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Content</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    value={blogData.title || ''}
                    onChange={(e) => handleTitleChange(e.target.value)}
                    placeholder="Enter blog post title..."
                  />
                </div>

                <div>
                  <Label htmlFor="slug">Slug (URL)</Label>
                  <Input
                    id="slug"
                    value={blogData.slug || ''}
                    onChange={(e) => updateData({ slug: e.target.value })}
                    placeholder="blog-post-url"
                  />
                </div>

                <div>
                  <Label htmlFor="excerpt">Excerpt</Label>
                  <Textarea
                    id="excerpt"
                    value={blogData.excerpt || ''}
                    onChange={(e) => updateData({ excerpt: e.target.value })}
                    placeholder="Brief description of the blog post..."
                    rows={3}
                  />
                </div>

                <div>
                  <Label htmlFor="content">Content</Label>
                  <Textarea
                    id="content"
                    value={blogData.content || ''}
                    onChange={(e) => updateData({ content: e.target.value })}
                    placeholder="Write your blog post content here..."
                    rows={15}
                  />
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
                    value={blogData.seo?.metaTitle || ''}
                    onChange={(e) => updateData({ 
                      seo: { ...blogData.seo, metaTitle: e.target.value } 
                    })}
                    placeholder="SEO optimized title..."
                  />
                </div>

                <div>
                  <Label htmlFor="metaDescription">Meta Description</Label>
                  <Textarea
                    id="metaDescription"
                    value={blogData.seo?.metaDescription || ''}
                    onChange={(e) => updateData({ 
                      seo: { ...blogData.seo, metaDescription: e.target.value } 
                    })}
                    placeholder="SEO description for search engines..."
                    rows={3}
                  />
                </div>

                <div>
                  <Label htmlFor="keywords">Keywords (comma separated)</Label>
                  <Input
                    id="keywords"
                    value={blogData.seo?.keywords?.join(', ') || ''}
                    onChange={(e) => updateData({ 
                      seo: { 
                        ...blogData.seo, 
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
                  <Label htmlFor="author">Author</Label>
                  <Input
                    id="author"
                    value={blogData.author || ''}
                    onChange={(e) => updateData({ author: e.target.value })}
                    placeholder="Author name"
                  />
                </div>

                <div>
                  <Label htmlFor="readTime">Read Time (minutes)</Label>
                  <Input
                    id="readTime"
                    type="number"
                    value={blogData.readTime || 5}
                    onChange={(e) => updateData({ readTime: parseInt(e.target.value) || 5 })}
                    min="1"
                  />
                </div>

                <div>
                  <Label htmlFor="status">Status</Label>
                  <select
                    id="status"
                    value={blogData.status || 'draft'}
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
                <CardTitle>Featured Image</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {blogData.featuredImage ? (
                  <div className="space-y-2">
                    <ImageWithFallback
                      src={blogData.featuredImage}
                      alt="Featured image"
                      className="w-full h-32 object-cover rounded"
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => updateData({ featuredImage: '' })}
                    >
                      Remove Image
                    </Button>
                  </div>
                ) : (
                  <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
                    <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground mb-2">Upload featured image</p>
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
                      <Button variant="outline" size="sm" asChild>
                        <span>Choose File</span>
                      </Button>
                    </label>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Tags</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <Input
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    placeholder="Add tag..."
                    onKeyPress={(e) => e.key === 'Enter' && handleAddTag()}
                  />
                  <Button onClick={handleAddTag} size="sm">
                    <Tag className="h-4 w-4" />
                  </Button>
                </div>

                <div className="flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className="cursor-pointer"
                      onClick={() => handleRemoveTag(tag)}
                    >
                      {tag} ×
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
};

const BlogPreview = ({ blog }: { blog: BlogPost }) => {
  return (
    <Card>
      <CardContent className="p-8">
        <article className="prose prose-lg max-w-none">
          {blog.featuredImage && (
            <ImageWithFallback
              src={blog.featuredImage}
              alt={blog.title}
              className="w-full h-64 object-cover rounded-lg mb-8"
            />
          )}
          
          <header className="mb-8">
            <h1 className="text-4xl font-bold mb-4">{blog.title || 'Untitled'}</h1>
            <div className="flex items-center gap-4 text-muted-foreground">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                {blog.author}
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                {blog.readTime} min read
              </div>
            </div>
            {blog.excerpt && (
              <p className="text-xl text-muted-foreground mt-4 italic">
                {blog.excerpt}
              </p>
            )}
          </header>

          <div className="whitespace-pre-wrap">
            {blog.content || 'Start writing your blog post content...'}
          </div>

          {blog.tags && blog.tags.length > 0 && (
            <footer className="mt-8 pt-8 border-t">
              <div className="flex flex-wrap gap-2">
                {blog.tags.map((tag) => (
                  <Badge key={tag} variant="outline">
                    {tag}
                  </Badge>
                ))}
              </div>
            </footer>
          )}
        </article>
      </CardContent>
    </Card>
  );
};