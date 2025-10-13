import { useState, useEffect } from 'react';
import { useAuth } from '../../../hooks/useAuth';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { Label } from '../../ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/card';
import { Alert, AlertDescription } from '../../ui/alert';
import { Badge } from '../../ui/badge';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from '../../ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../ui/table';
import { 
  UserPlus, 
  Trash2, 
  Shield, 
  UserCheck, 
  AlertTriangle,
  RefreshCw
} from 'lucide-react';
import { toast } from 'sonner@2.0.3';

import { 
  AdminUser, 
  getAdminUsers, 
  addAdminUser, 
  removeAdminUser, 
  subscribeToAdminUsers,
  initializeDefaultAdmin 
} from '../../../firebase/admin-management';

export const AdminManager = () => {
  const { user } = useAuth();
  const [admins, setAdmins] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAddingAdmin, setIsAddingAdmin] = useState(false);
  const [isDeletingAdmin, setIsDeletingAdmin] = useState<string | null>(null);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [isInitializing, setIsInitializing] = useState(false);
  
  // Form state
  const [newAdminEmail, setNewAdminEmail] = useState('');
  const [newAdminName, setNewAdminName] = useState('');
  const [newAdminRole, setNewAdminRole] = useState<'admin' | 'manager'>('manager');

  useEffect(() => {
    // Subscribe to admin users changes
    const unsubscribe = subscribeToAdminUsers((adminUsers) => {
      setAdmins(adminUsers);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleAddAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newAdminEmail || !newAdminName || !user?.email) {
      toast.error('Please fill in all fields');
      return;
    }

    setIsAddingAdmin(true);
    
    try {
      await addAdminUser({
        email: newAdminEmail.toLowerCase().trim(),
        name: newAdminName.trim(),
        role: newAdminRole,
        createdBy: user.email,
        isActive: true
      });

      toast.success('Admin user added successfully');
      setNewAdminEmail('');
      setNewAdminName('');
      setNewAdminRole('manager');
      setShowAddDialog(false);
    } catch (error: any) {
      toast.error(error.message || 'Failed to add admin user');
    } finally {
      setIsAddingAdmin(false);
    }
  };

  const handleRemoveAdmin = async (adminId: string, adminEmail: string) => {
    if (!adminId) return;
    
    // Prevent removing self
    if (adminEmail === user?.email) {
      toast.error('You cannot remove your own admin access');
      return;
    }

    // Confirm deletion
    if (!confirm(`Are you sure you want to remove admin access for ${adminEmail}? This action cannot be undone.`)) {
      return;
    }

    setIsDeletingAdmin(adminId);
    
    try {
      await removeAdminUser(adminId);
      toast.success('Admin user removed successfully');
    } catch (error: any) {
      toast.error(error.message || 'Failed to remove admin user');
    } finally {
      setIsDeletingAdmin(null);
    }
  };

  const handleInitializeDefault = async () => {
    if (!user?.email) return;
    
    setIsInitializing(true);
    
    try {
      await initializeDefaultAdmin(user.email, user.displayName || 'Administrator');
      toast.success('Default admin initialized successfully');
    } catch (error: any) {
      toast.error(error.message || 'Failed to initialize default admin');
    } finally {
      setIsInitializing(false);
    }
  };

  const handleRefreshAdmins = async () => {
    setLoading(true);
    try {
      const adminUsers = await getAdminUsers();
      setAdmins(adminUsers);
    } catch (error) {
      toast.error('Failed to refresh admin users');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-semibold mb-2">Admin Management</h2>
            <p className="text-muted-foreground">Manage admin users and permissions</p>
          </div>
        </div>
        <div className="flex items-center justify-center py-12">
          <RefreshCw className="h-6 w-6 animate-spin text-muted-foreground" />
        </div>
      </div>
    );
  }

  // Show initialization option if no admins exist
  if (admins.length === 0) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-semibold mb-2">Admin Management</h2>
            <p className="text-muted-foreground">Manage admin users and permissions</p>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-amber-500" />
              No Admin Users Found
            </CardTitle>
            <CardDescription>
              No admin users are currently configured in the system. Initialize the default admin user to get started.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button 
              onClick={handleInitializeDefault}
              disabled={isInitializing}
              className="w-full"
            >
              {isInitializing ? (
                <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Shield className="mr-2 h-4 w-4" />
              )}
              Initialize Default Admin
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold mb-2">Admin Management</h2>
          <p className="text-muted-foreground">
            Manage admin users and their permissions. Only admins can add or remove other admins.
          </p>
        </div>
        
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleRefreshAdmins} disabled={loading}>
            <RefreshCw className="mr-2 h-4 w-4" />
            Refresh
          </Button>
          
          <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
            <DialogTrigger asChild>
              <Button>
                <UserPlus className="mr-2 h-4 w-4" />
                Add Admin
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Admin User</DialogTitle>
                <DialogDescription>
                  Add a new admin or manager user. They will need to create an account using this email address.
                </DialogDescription>
              </DialogHeader>
              
              <form onSubmit={handleAddAdmin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="admin-email">Email Address</Label>
                  <Input
                    id="admin-email"
                    type="email"
                    placeholder="admin@novafuze.in"
                    value={newAdminEmail}
                    onChange={(e) => setNewAdminEmail(e.target.value)}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="admin-name">Full Name</Label>
                  <Input
                    id="admin-name"
                    type="text"
                    placeholder="John Doe"
                    value={newAdminName}
                    onChange={(e) => setNewAdminName(e.target.value)}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="admin-role">Role</Label>
                  <Select value={newAdminRole} onValueChange={(value: 'admin' | 'manager') => setNewAdminRole(value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="admin">Admin (Full Access)</SelectItem>
                      <SelectItem value="manager">Manager (Limited Access)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex justify-end space-x-2 pt-4">
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => setShowAddDialog(false)}
                    disabled={isAddingAdmin}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" disabled={isAddingAdmin}>
                    {isAddingAdmin ? (
                      <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      <UserPlus className="mr-2 h-4 w-4" />
                    )}
                    Add Admin
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Alert>
        <Shield className="h-4 w-4" />
        <AlertDescription>
          <strong>Important:</strong> Only add trusted team members as admin users. Admins have full access to manage website content and other admin users.
        </AlertDescription>
      </Alert>

      <Card>
        <CardHeader>
          <CardTitle>Admin Users ({admins.length})</CardTitle>
          <CardDescription>
            List of all admin users with access to the CMS dashboard
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Added By</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {admins.map((admin) => (
                <TableRow key={admin.id}>
                  <TableCell className="font-medium">{admin.name}</TableCell>
                  <TableCell>{admin.email}</TableCell>
                  <TableCell>
                    <Badge variant={admin.role === 'admin' ? 'default' : 'secondary'}>
                      {admin.role === 'admin' ? (
                        <>
                          <Shield className="mr-1 h-3 w-3" />
                          Admin
                        </>
                      ) : (
                        <>
                          <UserCheck className="mr-1 h-3 w-3" />
                          Manager
                        </>
                      )}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{admin.createdBy}</TableCell>
                  <TableCell>
                    <Badge variant={admin.isActive ? 'default' : 'secondary'}>
                      {admin.isActive ? 'Active' : 'Inactive'}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    {admin.email !== user?.email && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemoveAdmin(admin.id!, admin.email)}
                        disabled={isDeletingAdmin === admin.id}
                        className="text-destructive hover:text-destructive"
                      >
                        {isDeletingAdmin === admin.id ? (
                          <RefreshCw className="h-4 w-4 animate-spin" />
                        ) : (
                          <Trash2 className="h-4 w-4" />
                        )}
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};