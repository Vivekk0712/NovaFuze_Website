import { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Alert, AlertDescription } from '../ui/alert';
import { Shield, Loader2, CheckCircle } from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import { initializeDefaultAdmin } from '../../firebase/admin-management';

interface InitializeAdminProps {
  onComplete: () => void;
}

export const InitializeAdmin = ({ onComplete }: InitializeAdminProps) => {
  const [email, setEmail] = useState('admin@novafuze.in');
  const [name, setName] = useState('Administrator');
  const [isInitializing, setIsInitializing] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const handleInitialize = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !name) {
      toast.error('Please fill in all fields');
      return;
    }

    setIsInitializing(true);
    
    try {
      await initializeDefaultAdmin(email.trim(), name.trim());
      setIsComplete(true);
      toast.success('Default admin user created successfully!');
      
      // Wait a moment then call onComplete
      setTimeout(() => {
        onComplete();
      }, 2000);
    } catch (error: any) {
      toast.error(error.message || 'Failed to initialize admin user');
    } finally {
      setIsInitializing(false);
    }
  };

  if (isComplete) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-background to-secondary/5 p-4">
        <Card className="w-full max-w-md shadow-lg">
          <CardHeader className="text-center space-y-4">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
            </div>
            
            <div className="space-y-2">
              <CardTitle className="text-2xl text-green-600">
                Admin Initialized!
              </CardTitle>
              <CardDescription>
                Your admin user has been created successfully. You can now sign in to the admin dashboard.
              </CardDescription>
            </div>
          </CardHeader>

          <CardContent>
            <Alert>
              <Shield className="h-4 w-4" />
              <AlertDescription>
                <div className="space-y-2">
                  <p className="font-medium">Next Steps:</p>
                  <ol className="text-sm space-y-1 list-decimal list-inside">
                    <li>Go to the admin login page</li>
                    <li>Create an account using: <strong>{email}</strong></li>
                    <li>Set a secure password</li>
                    <li>Access the admin dashboard</li>
                  </ol>
                </div>
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-background to-secondary/5 p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="text-center space-y-4">
          {/* NovaFuze Logo */}
          <div className="flex justify-center mb-4">
            <div className="relative">
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary/80 rounded-2xl flex items-center justify-center shadow-lg">
                <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                  <div className="w-6 h-6 bg-gradient-to-br from-primary to-primary/80 rounded-md"></div>
                </div>
              </div>
              <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-br from-primary to-primary/60 rounded-full flex items-center justify-center">
                <div className="w-3 h-3 bg-white rounded-full"></div>
              </div>
            </div>
          </div>
          
          <div className="space-y-2">
            <CardTitle className="text-2xl bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
              Initialize Admin
            </CardTitle>
            <CardDescription>
              Set up the first admin user for your NovaFuze CMS
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          <Alert>
            <Shield className="h-4 w-4" />
            <AlertDescription>
              <div className="space-y-2">
                <p className="font-medium">First Time Setup</p>
                <p className="text-sm">This will create the first admin user in your system. After this, you can add more admin users from the dashboard.</p>
              </div>
            </AlertDescription>
          </Alert>

          <form onSubmit={handleInitialize} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="admin-email">Admin Email</Label>
              <Input
                id="admin-email"
                type="email"
                placeholder="admin@novafuze.in"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isInitializing}
                required
              />
              <p className="text-xs text-muted-foreground">
                This email will be authorized to create an admin account
              </p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="admin-name">Admin Name</Label>
              <Input
                id="admin-name"
                type="text"
                placeholder="Administrator"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={isInitializing}
                required
              />
            </div>
            
            <Button
              type="submit"
              disabled={isInitializing || !email || !name}
              className="w-full"
              size="lg"
            >
              {isInitializing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Initializing...
                </>
              ) : (
                <>
                  <Shield className="mr-2 h-4 w-4" />
                  Initialize Admin User
                </>
              )}
            </Button>
          </form>

          <div className="text-center text-sm text-muted-foreground">
            <p>This is a one-time setup process.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};