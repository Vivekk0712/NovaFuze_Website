import { useState, useEffect } from 'react';
import { Button } from '../../ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/card';
import { Badge } from '../../ui/badge';
import { Input } from '../../ui/input';
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Video,
  Globe,
  Save,
  Play,
  Clock
} from 'lucide-react';
import { toast } from 'sonner';
import { vlogService, Vlog } from '../../../firebase/firestore';
import { useAuth } from '../../../hooks/useAuth';

export const VlogManager = () => {
  const { user } = useAuth();
  const [vlogs, setVlogs] = useState<Vlog[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const unsubscribe = vlogService.onSnapshot((vlogs) => {
      setVlogs(vlogs);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const filteredVlogs = vlogs.filter(vlog =>
    vlog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vlog.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vlog.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreate = () => {
    toast.info('Vlog creation will be implemented soon!');
  };

  const handleEdit = (vlog: Vlog) => {
    toast.info('Vlog editing will be implemented soon!');
  };

  const handlePublish = async (vlog: Vlog) => {
    try {
      await vlogService.publish(vlog.id, user?.email || '');
      toast.success('Vlog published successfully!');
    } catch (error) {
      toast.error('Failed to publish vlog');
    }
  };

  const handleUnpublish = async (vlog: Vlog) => {
    try {
      await vlogService.unpublish(vlog.id, user?.email || '');
      toast.success('Vlog moved to drafts');
    } catch (error) {
      toast.error('Failed to unpublish vlog');
    }
  };

  const handleDelete = async (vlog: Vlog) => {
    try {
      await vlogService.delete(vlog.id);
      toast.success('Vlog deleted successfully!');
    } catch (error) {
      toast.error('Failed to delete vlog');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold mb-2">Vlog Management</h2>
          <p className="text-muted-foreground">
            Manage your video content and vlogs.
          </p>
        </div>
        <Button onClick={handleCreate}>
          <Plus className="mr-2 h-4 w-4" />
          New Vlog
        </Button>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search vlogs..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-9"
        />
      </div>

      {/* Vlogs List */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader>
                <div className="h-40 bg-muted rounded mb-4"></div>
                <div className="h-6 bg-muted rounded w-3/4"></div>
                <div className="h-4 bg-muted rounded w-1/2"></div>
              </CardHeader>
            </Card>
          ))}
        </div>
      ) : filteredVlogs.length === 0 ? (
        <Card>
          <CardContent className="text-center py-12">
            <Video className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">No vlogs found</h3>
            <p className="text-muted-foreground">
              Create your first vlog to get started.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredVlogs.map((vlog) => (
            <Card key={vlog.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="relative">
                  {vlog.thumbnail ? (
                    <img 
                      src={vlog.thumbnail} 
                      alt={vlog.title}
                      className="w-full h-40 object-cover rounded"
                    />
                  ) : (
                    <div className="w-full h-40 bg-muted rounded flex items-center justify-center">
                      <Video className="h-12 w-12 text-muted-foreground" />
                    </div>
                  )}
                  
                  <div className="absolute inset-0 bg-black/20 rounded flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                    <Play className="h-12 w-12 text-white" />
                  </div>
                  
                  {vlog.duration && (
                    <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                      {vlog.duration}
                    </div>
                  )}
                </div>
                
                <div className="space-y-2 mt-4">
                  <div className="flex items-center gap-2">
                    <CardTitle className="text-lg line-clamp-1">{vlog.title}</CardTitle>
                    <Badge variant={vlog.status === 'published' ? 'default' : 'secondary'}>
                      {vlog.status}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Badge variant="outline">{vlog.category}</Badge>
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      {vlog.duration || 'Unknown'}
                    </div>
                  </div>
                  <CardDescription className="line-clamp-2">
                    {vlog.description}
                  </CardDescription>
                </div>
              </CardHeader>
              
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex flex-wrap gap-1">
                    {vlog.tags && vlog.tags.slice(0, 2).map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                    {vlog.tags && vlog.tags.length > 2 && (
                      <Badge variant="outline" className="text-xs">
                        +{vlog.tags.length - 2}
                      </Badge>
                    )}
                  </div>

                  <div className="flex items-center gap-1">
                    <Button variant="outline" size="sm" onClick={() => handleEdit(vlog)}>
                      <Edit className="h-3 w-3" />
                    </Button>

                    {vlog.status === 'draft' ? (
                      <Button size="sm" onClick={() => handlePublish(vlog)}>
                        <Globe className="h-3 w-3" />
                      </Button>
                    ) : (
                      <Button variant="outline" size="sm" onClick={() => handleUnpublish(vlog)}>
                        <Save className="h-3 w-3" />
                      </Button>
                    )}

                    <Button variant="outline" size="sm" onClick={() => handleDelete(vlog)}>
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};