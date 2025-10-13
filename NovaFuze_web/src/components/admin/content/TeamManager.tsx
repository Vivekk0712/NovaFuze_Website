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
  Users,
  Globe,
  Save,
  Mail,
  Linkedin
} from 'lucide-react';
import { toast } from 'sonner';
import { teamService, TeamMember } from '../../../firebase/firestore';
import { useAuth } from '../../../hooks/useAuth';

export const TeamManager = () => {
  const { user } = useAuth();
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const unsubscribe = teamService.onSnapshot((members) => {
      setTeamMembers(members);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const filteredMembers = teamMembers.filter(member =>
    member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.bio.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreate = () => {
    toast.info('Team member creation will be implemented soon!');
  };

  const handleEdit = (member: TeamMember) => {
    toast.info('Team member editing will be implemented soon!');
  };

  const handlePublish = async (member: TeamMember) => {
    try {
      await teamService.publish(member.id, user?.email || '');
      toast.success('Team member published successfully!');
    } catch (error) {
      toast.error('Failed to publish team member');
    }
  };

  const handleUnpublish = async (member: TeamMember) => {
    try {
      await teamService.unpublish(member.id, user?.email || '');
      toast.success('Team member moved to drafts');
    } catch (error) {
      toast.error('Failed to unpublish team member');
    }
  };

  const handleDelete = async (member: TeamMember) => {
    try {
      await teamService.delete(member.id);
      toast.success('Team member deleted successfully!');
    } catch (error) {
      toast.error('Failed to delete team member');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold mb-2">Team Management</h2>
          <p className="text-muted-foreground">
            Manage your team members and their profiles.
          </p>
        </div>
        <Button onClick={handleCreate}>
          <Plus className="mr-2 h-4 w-4" />
          Add Team Member
        </Button>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search team members..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-9"
        />
      </div>

      {/* Team Members List */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader>
                <div className="w-16 h-16 bg-muted rounded-full mx-auto mb-4"></div>
                <div className="h-6 bg-muted rounded w-3/4 mx-auto"></div>
                <div className="h-4 bg-muted rounded w-1/2 mx-auto"></div>
              </CardHeader>
            </Card>
          ))}
        </div>
      ) : filteredMembers.length === 0 ? (
        <Card>
          <CardContent className="text-center py-12">
            <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">No team members found</h3>
            <p className="text-muted-foreground">
              Add your first team member to get started.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredMembers.map((member) => (
            <Card key={member.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="text-center">
                {member.image ? (
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-16 h-16 rounded-full mx-auto mb-4 object-cover"
                  />
                ) : (
                  <div className="w-16 h-16 rounded-full bg-muted mx-auto mb-4 flex items-center justify-center">
                    <Users className="h-8 w-8 text-muted-foreground" />
                  </div>
                )}
                
                <div className="space-y-2">
                  <div className="flex items-center justify-center gap-2">
                    <CardTitle className="text-lg">{member.name}</CardTitle>
                    <Badge variant={member.status === 'published' ? 'default' : 'secondary'}>
                      {member.status}
                    </Badge>
                  </div>
                  <CardDescription>{member.position}</CardDescription>
                </div>
              </CardHeader>
              
              <CardContent>
                <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
                  {member.bio}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {member.email && (
                      <a href={`mailto:${member.email}`} className="text-muted-foreground hover:text-foreground">
                        <Mail className="h-4 w-4" />
                      </a>
                    )}
                    {member.socialLinks?.linkedin && (
                      <a href={member.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground">
                        <Linkedin className="h-4 w-4" />
                      </a>
                    )}
                  </div>

                  <div className="flex items-center gap-1">
                    <Button variant="outline" size="sm" onClick={() => handleEdit(member)}>
                      <Edit className="h-3 w-3" />
                    </Button>

                    {member.status === 'draft' ? (
                      <Button size="sm" onClick={() => handlePublish(member)}>
                        <Globe className="h-3 w-3" />
                      </Button>
                    ) : (
                      <Button variant="outline" size="sm" onClick={() => handleUnpublish(member)}>
                        <Save className="h-3 w-3" />
                      </Button>
                    )}

                    <Button variant="outline" size="sm" onClick={() => handleDelete(member)}>
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