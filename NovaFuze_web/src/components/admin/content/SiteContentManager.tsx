import { useState, useEffect } from 'react';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { Label } from '../../ui/label';
import { Textarea } from '../../ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../ui/tabs';
import { Switch } from '../../ui/switch';
import { Alert, AlertDescription } from '../../ui/alert';
import { Badge } from '../../ui/badge';
import { Separator } from '../../ui/separator';
import { 
  Save, 
  Loader2, 
  Eye, 
  EyeOff, 
  Image as ImageIcon, 
  Type, 
  Link as LinkIcon,
  Settings,
  Home,
  Info,
  Briefcase,
  Users,
  FileText,
  Video,
  Phone,
  RefreshCw
} from 'lucide-react';
import { useContent } from '../../ContentManagerOptimizedFixed';
import { MediaManager } from './MediaManager';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../../ui/dialog';
import { toast } from 'sonner';

interface SiteSection {
  id: string;
  title: string;
  icon: React.ReactNode;
  fields: SiteField[];
}

interface SiteField {
  id: string;
  label: string;
  type: 'text' | 'textarea' | 'image' | 'url' | 'boolean' | 'richtext';
  placeholder?: string;
  description?: string;
  maxLength?: number;
  required?: boolean;
}

export const SiteContentManager = () => {
  const { content, updateContent, loading } = useContent();
  const [activeSection, setActiveSection] = useState('hero');
  const [isDirty, setIsDirty] = useState(false);
  const [saving, setSaving] = useState(false);
  const [localContent, setLocalContent] = useState<any>({});
  const [showMediaManager, setShowMediaManager] = useState(false);
  const [selectedImageField, setSelectedImageField] = useState<string>('');

  // Define all editable site sections
  const siteSections: SiteSection[] = [
    {
      id: 'hero',
      title: 'Hero Section',
      icon: <Home className="h-4 w-4" />,
      fields: [
        { id: 'title', label: 'Main Title', type: 'text', required: true, maxLength: 100 },
        { id: 'subtitle', label: 'Subtitle', type: 'textarea', maxLength: 200 },
        { id: 'description', label: 'Description', type: 'textarea', maxLength: 500 },
        { id: 'backgroundImage', label: 'Background Image', type: 'image' },
        { id: 'ctaText', label: 'CTA Button Text', type: 'text', maxLength: 30 },
        { id: 'ctaUrl', label: 'CTA Button URL', type: 'url' },
        { id: 'ctaEnabled', label: 'Show CTA Button', type: 'boolean' },
        { id: 'secondaryCtaText', label: 'Secondary CTA Text', type: 'text', maxLength: 30 },
        { id: 'secondaryCtaUrl', label: 'Secondary CTA URL', type: 'url' },
        { id: 'secondaryCtaEnabled', label: 'Show Secondary CTA', type: 'boolean' }
      ]
    },
    {
      id: 'about',
      title: 'About Section',
      icon: <Info className="h-4 w-4" />,
      fields: [
        { id: 'title', label: 'Section Title', type: 'text', required: true, maxLength: 100 },
        { id: 'subtitle', label: 'Subtitle', type: 'text', maxLength: 200 },
        { id: 'description', label: 'Description', type: 'richtext' },
        { id: 'image', label: 'About Image', type: 'image' },
        { id: 'stats', label: 'Statistics (JSON)', type: 'textarea', description: 'Array of stat objects with value, label, and description' },
        { id: 'enabled', label: 'Show About Section', type: 'boolean' }
      ]
    },
    {
      id: 'services',
      title: 'Services Section',
      icon: <Briefcase className="h-4 w-4" />,
      fields: [
        { id: 'title', label: 'Section Title', type: 'text', required: true, maxLength: 100 },
        { id: 'subtitle', label: 'Subtitle', type: 'text', maxLength: 200 },
        { id: 'description', label: 'Description', type: 'textarea', maxLength: 500 },
        { id: 'ctaText', label: 'View All Services Text', type: 'text', maxLength: 30 },
        { id: 'ctaUrl', label: 'View All Services URL', type: 'url' },
        { id: 'ctaEnabled', label: 'Show View All Button', type: 'boolean' },
        { id: 'enabled', label: 'Show Services Section', type: 'boolean' }
      ]
    },
    {
      id: 'portfolio',
      title: 'Portfolio Section',
      icon: <FileText className="h-4 w-4" />,
      fields: [
        { id: 'title', label: 'Section Title', type: 'text', required: true, maxLength: 100 },
        { id: 'subtitle', label: 'Subtitle', type: 'text', maxLength: 200 },
        { id: 'description', label: 'Description', type: 'textarea', maxLength: 500 },
        { id: 'ctaText', label: 'View Portfolio Text', type: 'text', maxLength: 30 },
        { id: 'ctaUrl', label: 'View Portfolio URL', type: 'url' },
        { id: 'ctaEnabled', label: 'Show View Portfolio Button', type: 'boolean' },
        { id: 'enabled', label: 'Show Portfolio Section', type: 'boolean' }
      ]
    },
    {
      id: 'team',
      title: 'Team Section',
      icon: <Users className="h-4 w-4" />,
      fields: [
        { id: 'title', label: 'Section Title', type: 'text', required: true, maxLength: 100 },
        { id: 'subtitle', label: 'Subtitle', type: 'text', maxLength: 200 },
        { id: 'description', label: 'Description', type: 'textarea', maxLength: 500 },
        { id: 'ctaText', label: 'Join Team Text', type: 'text', maxLength: 30 },
        { id: 'ctaUrl', label: 'Join Team URL', type: 'url' },
        { id: 'ctaEnabled', label: 'Show Join Team Button', type: 'boolean' },
        { id: 'enabled', label: 'Show Team Section', type: 'boolean' }
      ]
    },
    {
      id: 'blog',
      title: 'Blog Section',
      icon: <FileText className="h-4 w-4" />,
      fields: [
        { id: 'title', label: 'Section Title', type: 'text', required: true, maxLength: 100 },
        { id: 'subtitle', label: 'Subtitle', type: 'text', maxLength: 200 },
        { id: 'description', label: 'Description', type: 'textarea', maxLength: 500 },
        { id: 'ctaText', label: 'View All Posts Text', type: 'text', maxLength: 30 },
        { id: 'ctaUrl', label: 'View All Posts URL', type: 'url' },
        { id: 'ctaEnabled', label: 'Show View All Button', type: 'boolean' },
        { id: 'enabled', label: 'Show Blog Section', type: 'boolean' }
      ]
    },
    {
      id: 'testimonials',
      title: 'Testimonials Section',
      icon: <Users className="h-4 w-4" />,
      fields: [
        { id: 'title', label: 'Section Title', type: 'text', required: true, maxLength: 100 },
        { id: 'subtitle', label: 'Subtitle', type: 'text', maxLength: 200 },
        { id: 'description', label: 'Description', type: 'textarea', maxLength: 500 },
        { id: 'enabled', label: 'Show Testimonials Section', type: 'boolean' }
      ]
    },
    {
      id: 'contact',
      title: 'Contact Section',
      icon: <Phone className="h-4 w-4" />,
      fields: [
        { id: 'title', label: 'Section Title', type: 'text', required: true, maxLength: 100 },
        { id: 'subtitle', label: 'Subtitle', type: 'text', maxLength: 200 },
        { id: 'description', label: 'Description', type: 'textarea', maxLength: 500 },
        { id: 'ctaText', label: 'Contact Button Text', type: 'text', maxLength: 30 },
        { id: 'ctaUrl', label: 'Contact Button URL', type: 'url' },
        { id: 'ctaEnabled', label: 'Show Contact Button', type: 'boolean' },
        { id: 'enabled', label: 'Show Contact Section', type: 'boolean' }
      ]
    },
    {
      id: 'footer',
      title: 'Footer Content',
      icon: <Settings className="h-4 w-4" />,
      fields: [
        { id: 'companyDescription', label: 'Company Description', type: 'textarea', maxLength: 300 },
        { id: 'copyright', label: 'Copyright Text', type: 'text', maxLength: 100 },
        { id: 'socialLinks', label: 'Social Links (JSON)', type: 'textarea', description: 'Array of social link objects' },
        { id: 'quickLinks', label: 'Quick Links (JSON)', type: 'textarea', description: 'Array of navigation link objects' },
        { id: 'contactInfo', label: 'Contact Information (JSON)', type: 'textarea', description: 'Contact details object' }
      ]
    },
    {
      id: 'header',
      title: 'Header & Navigation',
      icon: <Settings className="h-4 w-4" />,
      fields: [
        { id: 'logoUrl', label: 'Logo Image', type: 'image' },
        { id: 'companyName', label: 'Company Name', type: 'text', maxLength: 50 },
        { id: 'tagline', label: 'Company Tagline', type: 'text', maxLength: 100 },
        { id: 'navigationLinks', label: 'Navigation Links (JSON)', type: 'textarea', description: 'Array of navigation link objects' },
        { id: 'ctaText', label: 'Header CTA Text', type: 'text', maxLength: 30 },
        { id: 'ctaUrl', label: 'Header CTA URL', type: 'url' },
        { id: 'ctaEnabled', label: 'Show Header CTA', type: 'boolean' }
      ]
    }
  ];

  useEffect(() => {
    if (content) {
      setLocalContent(content);
    }
  }, [content]);

  const handleFieldChange = (sectionId: string, fieldId: string, value: any) => {
    setLocalContent((prev: any) => ({
      ...prev,
      [sectionId]: {
        ...prev[sectionId],
        [fieldId]: value
      }
    }));
    setIsDirty(true);
  };

  const handleImageSelect = (file: any) => {
    if (selectedImageField) {
      const [sectionId, fieldId] = selectedImageField.split('.');
      handleFieldChange(sectionId, fieldId, file.url);
      setShowMediaManager(false);
      setSelectedImageField('');
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await updateContent(localContent);
      setIsDirty(false);
      toast.success('Site content updated successfully');
    } catch (error) {
      console.error('Error saving content:', error);
      toast.error('Failed to save content');
    } finally {
      setSaving(false);
    }
  };

  const handleReset = () => {
    setLocalContent(content);
    setIsDirty(false);
    toast.success('Changes reset');
  };

  const renderField = (sectionId: string, field: SiteField) => {
    const value = localContent[sectionId]?.[field.id] || '';
    const fieldKey = `${sectionId}.${field.id}`;

    switch (field.type) {
      case 'text':
        return (
          <div key={field.id} className="space-y-2">
            <Label htmlFor={fieldKey}>{field.label} {field.required && '*'}</Label>
            <Input
              id={fieldKey}
              value={value}
              onChange={(e) => handleFieldChange(sectionId, field.id, e.target.value)}
              placeholder={field.placeholder}
              maxLength={field.maxLength}
            />
            {field.description && (
              <p className="text-sm text-muted-foreground">{field.description}</p>
            )}
            {field.maxLength && (
              <p className="text-xs text-muted-foreground text-right">
                {(value || '').length}/{field.maxLength}
              </p>
            )}
          </div>
        );

      case 'textarea':
        return (
          <div key={field.id} className="space-y-2">
            <Label htmlFor={fieldKey}>{field.label} {field.required && '*'}</Label>
            <Textarea
              id={fieldKey}
              value={value}
              onChange={(e) => handleFieldChange(sectionId, field.id, e.target.value)}
              placeholder={field.placeholder}
              maxLength={field.maxLength}
              rows={4}
            />
            {field.description && (
              <p className="text-sm text-muted-foreground">{field.description}</p>
            )}
            {field.maxLength && (
              <p className="text-xs text-muted-foreground text-right">
                {(value || '').length}/{field.maxLength}
              </p>
            )}
          </div>
        );

      case 'richtext':
        return (
          <div key={field.id} className="space-y-2">
            <Label htmlFor={fieldKey}>{field.label} {field.required && '*'}</Label>
            <Textarea
              id={fieldKey}
              value={value}
              onChange={(e) => handleFieldChange(sectionId, field.id, e.target.value)}
              placeholder={field.placeholder}
              rows={6}
              className="font-mono text-sm"
            />
            {field.description && (
              <p className="text-sm text-muted-foreground">{field.description}</p>
            )}
            <p className="text-xs text-muted-foreground">
              Supports HTML and markdown formatting
            </p>
          </div>
        );

      case 'url':
        return (
          <div key={field.id} className="space-y-2">
            <Label htmlFor={fieldKey}>{field.label} {field.required && '*'}</Label>
            <div className="relative">
              <LinkIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id={fieldKey}
                type="url"
                value={value}
                onChange={(e) => handleFieldChange(sectionId, field.id, e.target.value)}
                placeholder="https://..."
                className="pl-10"
              />
            </div>
            {field.description && (
              <p className="text-sm text-muted-foreground">{field.description}</p>
            )}
          </div>
        );

      case 'boolean':
        return (
          <div key={field.id} className="flex items-center justify-between space-y-2">
            <div className="space-y-0.5">
              <Label htmlFor={fieldKey}>{field.label}</Label>
              {field.description && (
                <p className="text-sm text-muted-foreground">{field.description}</p>
              )}
            </div>
            <Switch
              id={fieldKey}
              checked={Boolean(value)}
              onCheckedChange={(checked) => handleFieldChange(sectionId, field.id, checked)}
            />
          </div>
        );

      case 'image':
        return (
          <div key={field.id} className="space-y-2">
            <Label>{field.label} {field.required && '*'}</Label>
            <div className="space-y-3">
              {value && (
                <div className="relative w-full max-w-xs">
                  <img 
                    src={value} 
                    alt={field.label} 
                    className="w-full h-32 object-cover rounded border"
                  />
                  <Button
                    size="sm"
                    variant="destructive"
                    className="absolute top-2 right-2"
                    onClick={() => handleFieldChange(sectionId, field.id, '')}
                  >
                    Remove
                  </Button>
                </div>
              )}
              <Dialog open={showMediaManager && selectedImageField === fieldKey} onOpenChange={(open) => {
                setShowMediaManager(open);
                if (open) setSelectedImageField(fieldKey);
                else setSelectedImageField('');
              }}>
                <DialogTrigger asChild>
                  <Button variant="outline" className="w-full">
                    <ImageIcon className="h-4 w-4 mr-2" />
                    {value ? 'Change Image' : 'Select Image'}
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-4xl max-h-[90vh]">
                  <DialogHeader>
                    <DialogTitle>Select Image for {field.label}</DialogTitle>
                  </DialogHeader>
                  <MediaManager
                    onSelectFile={handleImageSelect}
                    allowedTypes={['image']}
                    maxSelections={1}
                  />
                </DialogContent>
              </Dialog>
            </div>
            {field.description && (
              <p className="text-sm text-muted-foreground">{field.description}</p>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  const activeTab = siteSections.find(s => s.id === activeSection);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold">Site Content Manager</h2>
          <p className="text-muted-foreground">
            Manage all website content from one place. Changes are applied instantly across the site.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleReset} disabled={!isDirty || saving}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Reset
          </Button>
          <Button onClick={handleSave} disabled={!isDirty || saving}>
            {saving ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </>
            )}
          </Button>
        </div>
      </div>

      {isDirty && (
        <Alert>
          <AlertDescription>
            You have unsaved changes. Don't forget to save your modifications.
          </AlertDescription>
        </Alert>
      )}

      <Card>
        <CardContent className="p-0">
          <Tabs value={activeSection} onValueChange={setActiveSection} className="w-full">
            <div className="border-b bg-muted/30">
              <TabsList className="grid w-full grid-cols-5 lg:grid-cols-10 h-auto p-1">
                {siteSections.map((section) => (
                  <TabsTrigger
                    key={section.id}
                    value={section.id}
                    className="flex flex-col gap-1 p-3 h-auto data-[state=active]:bg-background"
                  >
                    {section.icon}
                    <span className="text-xs">{section.title}</span>
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>

            {siteSections.map((section) => (
              <TabsContent key={section.id} value={section.id} className="p-6 mt-0">
                <div className="space-y-6">
                  <div className="flex items-center gap-2">
                    {section.icon}
                    <h3 className="text-lg font-semibold">{section.title}</h3>
                    {localContent[section.id]?.enabled !== undefined && (
                      <Badge variant={localContent[section.id]?.enabled ? "default" : "secondary"}>
                        {localContent[section.id]?.enabled ? "Enabled" : "Disabled"}
                      </Badge>
                    )}
                  </div>

                  <div className="grid gap-6 md:grid-cols-2">
                    {section.fields.map((field) => renderField(section.id, field))}
                  </div>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};