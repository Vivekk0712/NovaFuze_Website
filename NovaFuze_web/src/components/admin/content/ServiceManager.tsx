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
  Briefcase,
  Globe,
  Save,
  DollarSign
} from 'lucide-react';
import { toast } from 'sonner';
import { serviceService, Service } from '../../../firebase/firestore';
import { useAuth } from '../../../hooks/useAuth';

export const ServiceManager = () => {
  const { user } = useAuth();
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const unsubscribe = serviceService.onSnapshot((services) => {
      setServices(services);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const filteredServices = services.filter(service =>
    service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    service.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    service.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreate = () => {
    toast.info('Service creation will be implemented soon!');
  };

  const handleEdit = (service: Service) => {
    toast.info('Service editing will be implemented soon!');
  };

  const handlePublish = async (service: Service) => {
    try {
      await serviceService.publish(service.id, user?.email || '');
      toast.success('Service published successfully!');
    } catch (error) {
      toast.error('Failed to publish service');
    }
  };

  const handleUnpublish = async (service: Service) => {
    try {
      await serviceService.unpublish(service.id, user?.email || '');
      toast.success('Service moved to drafts');
    } catch (error) {
      toast.error('Failed to unpublish service');
    }
  };

  const handleDelete = async (service: Service) => {
    try {
      await serviceService.delete(service.id);
      toast.success('Service deleted successfully!');
    } catch (error) {
      toast.error('Failed to delete service');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold mb-2">Service Management</h2>
          <p className="text-muted-foreground">
            Manage your services and offerings.
          </p>
        </div>
        <Button onClick={handleCreate}>
          <Plus className="mr-2 h-4 w-4" />
          New Service
        </Button>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search services..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-9"
        />
      </div>

      {/* Services List */}
      {loading ? (
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader>
                <div className="h-6 bg-muted rounded w-3/4"></div>
                <div className="h-4 bg-muted rounded w-1/2"></div>
              </CardHeader>
            </Card>
          ))}
        </div>
      ) : filteredServices.length === 0 ? (
        <Card>
          <CardContent className="text-center py-12">
            <Briefcase className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">No services found</h3>
            <p className="text-muted-foreground">
              Create your first service to get started.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {filteredServices.map((service) => (
            <Card key={service.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <CardTitle className="text-lg">{service.name}</CardTitle>
                      <Badge variant={service.status === 'published' ? 'default' : 'secondary'}>
                        {service.status}
                      </Badge>
                      <Badge variant="outline">
                        {service.category}
                      </Badge>
                    </div>
                    <CardDescription className="line-clamp-2">
                      {service.shortDescription}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <DollarSign className="h-3 w-3" />
                      Starting from ₹{service.pricing?.startingPrice?.toLocaleString() || 'Contact'}
                    </div>
                    <div>
                      Updated: {service.updatedAt.toLocaleDateString()}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" onClick={() => handleEdit(service)}>
                      <Edit className="h-3 w-3 mr-1" />
                      Edit
                    </Button>

                    {service.status === 'draft' ? (
                      <Button size="sm" onClick={() => handlePublish(service)}>
                        <Globe className="h-3 w-3 mr-1" />
                        Publish
                      </Button>
                    ) : (
                      <Button variant="outline" size="sm" onClick={() => handleUnpublish(service)}>
                        <Save className="h-3 w-3 mr-1" />
                        Unpublish
                      </Button>
                    )}

                    <Button variant="outline" size="sm" onClick={() => handleDelete(service)}>
                      <Trash2 className="h-3 w-3 mr-1" />
                      Delete
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