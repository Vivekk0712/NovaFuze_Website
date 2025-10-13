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
  FolderOpen,
  Globe,
  Save,
  ExternalLink,
  Github
} from 'lucide-react';
import { toast } from 'sonner';
import { portfolioService, PortfolioProject } from '../../../firebase/firestore';
import { useAuth } from '../../../hooks/useAuth';

export const PortfolioManager = () => {
  const { user } = useAuth();
  const [projects, setProjects] = useState<PortfolioProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const unsubscribe = portfolioService.onSnapshot((projects) => {
      setProjects(projects);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const filteredProjects = projects.filter(project =>
    project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreate = () => {
    toast.info('Portfolio project creation will be implemented soon!');
  };

  const handleEdit = (project: PortfolioProject) => {
    toast.info('Portfolio project editing will be implemented soon!');
  };

  const handlePublish = async (project: PortfolioProject) => {
    try {
      await portfolioService.publish(project.id, user?.email || '');
      toast.success('Portfolio project published successfully!');
    } catch (error) {
      toast.error('Failed to publish portfolio project');
    }
  };

  const handleUnpublish = async (project: PortfolioProject) => {
    try {
      await portfolioService.unpublish(project.id, user?.email || '');
      toast.success('Portfolio project moved to drafts');
    } catch (error) {
      toast.error('Failed to unpublish portfolio project');
    }
  };

  const handleDelete = async (project: PortfolioProject) => {
    try {
      await portfolioService.delete(project.id);
      toast.success('Portfolio project deleted successfully!');
    } catch (error) {
      toast.error('Failed to delete portfolio project');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold mb-2">Portfolio Management</h2>
          <p className="text-muted-foreground">
            Manage your portfolio projects and case studies.
          </p>
        </div>
        <Button onClick={handleCreate}>
          <Plus className="mr-2 h-4 w-4" />
          New Project
        </Button>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search projects..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-9"
        />
      </div>

      {/* Projects List */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[...Array(4)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader>
                <div className="h-40 bg-muted rounded mb-4"></div>
                <div className="h-6 bg-muted rounded w-3/4"></div>
                <div className="h-4 bg-muted rounded w-1/2"></div>
              </CardHeader>
            </Card>
          ))}
        </div>
      ) : filteredProjects.length === 0 ? (
        <Card>
          <CardContent className="text-center py-12">
            <FolderOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">No portfolio projects found</h3>
            <p className="text-muted-foreground">
              Create your first portfolio project to get started.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredProjects.map((project) => (
            <Card key={project.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                {project.images && project.images.length > 0 ? (
                  <img 
                    src={project.images[0]} 
                    alt={project.title}
                    className="w-full h-40 object-cover rounded mb-4"
                  />
                ) : (
                  <div className="w-full h-40 bg-muted rounded mb-4 flex items-center justify-center">
                    <FolderOpen className="h-12 w-12 text-muted-foreground" />
                  </div>
                )}
                
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <CardTitle className="text-lg">{project.title}</CardTitle>
                    <Badge variant={project.status === 'published' ? 'default' : 'secondary'}>
                      {project.status}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Badge variant="outline">{project.category}</Badge>
                    <span className="text-muted-foreground">Client: {project.clientName}</span>
                  </div>
                  <CardDescription className="line-clamp-2">
                    {project.shortDescription}
                  </CardDescription>
                </div>
              </CardHeader>
              
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {project.projectUrl && (
                      <a href={project.projectUrl} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground">
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    )}
                    {project.githubUrl && (
                      <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground">
                        <Github className="h-4 w-4" />
                      </a>
                    )}
                    <span className="text-sm text-muted-foreground">
                      {project.completionDate.toLocaleDateString()}
                    </span>
                  </div>

                  <div className="flex items-center gap-1">
                    <Button variant="outline" size="sm" onClick={() => handleEdit(project)}>
                      <Edit className="h-3 w-3" />
                    </Button>

                    {project.status === 'draft' ? (
                      <Button size="sm" onClick={() => handlePublish(project)}>
                        <Globe className="h-3 w-3" />
                      </Button>
                    ) : (
                      <Button variant="outline" size="sm" onClick={() => handleUnpublish(project)}>
                        <Save className="h-3 w-3" />
                      </Button>
                    )}

                    <Button variant="outline" size="sm" onClick={() => handleDelete(project)}>
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