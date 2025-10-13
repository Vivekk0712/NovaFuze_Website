import { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Alert, AlertDescription } from '../ui/alert';
import { Loader2, AlertTriangle, Eye, EyeOff, Settings, Shield, CheckCircle } from 'lucide-react';
import { initializeDefaultAdmin, getAdminUsers } from '../../firebase/admin-management';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { getFirebaseAuth, initializeFirebaseIfNeeded } from '../../firebase/config';

export const InitialSetup = ({ onComplete }: { onComplete: () => void }) => {
  const [loading, setLoading] = useState(false);
  const [checking, setChecking] = useState(true);
  const [hasAdmins, setHasAdmins] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  // Form state
  const [email, setEmail] = useState('admin@novafuze.in');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('NovaFuze Admin');

  useEffect(() => {
    checkExistingAdmins();
  }, []);

  const checkExistingAdmins = async () => {
    try {
      setChecking(true);
      const admins = await getAdminUsers();
      setHasAdmins(admins.length > 0);
      
      if (admins.length > 0) {
        // If admins exist, complete setup
        setTimeout(onComplete, 1000);
      }
    } catch (error) {
      console.error('Error checking existing admins:', error);
      setError('Failed to check existing admin users');
    } finally {
      setChecking(false);
    }
  };

  const handleCreateFirstAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password || !confirmPassword || !name) return;
    
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      console.log('Starting admin creation process...');
      
      // Ensure Firebase is initialized
      console.log('Ensuring Firebase is initialized...');
      const initialized = await initializeFirebaseIfNeeded();
      
      if (!initialized) {
        throw new Error('Firebase initialization failed. Please check your configuration.');
      }
      
      const auth = getFirebaseAuth();
      if (!auth) {
        throw new Error('Firebase Auth failed to initialize. Please check your Firebase configuration.');
      }
      
      // First, create the admin record in Firestore
      console.log('Creating admin record in Firestore...');
      await initializeDefaultAdmin(email, name);
      console.log('Admin record created successfully');
      
      // Then create the Firebase auth user
      console.log('Creating Firebase auth user...');
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log('Firebase auth user created successfully:', userCredential.user.uid);
      
      console.log('Admin creation completed successfully');
      setSuccess(true);
      
      // Complete the setup after a short delay
      setTimeout(() => {
        console.log('Completing setup...');
        onComplete();
      }, 1500);
      
    } catch (error: any) {
      console.error('Error creating first admin:', error);
      
      // Provide more specific error messages
      let errorMessage = 'Failed to create admin user';
      
      if (error.code === 'auth/email-already-in-use') {
        errorMessage = 'An account with this email already exists. Please use a different email or try signing in.';
      } else if (error.code === 'auth/weak-password') {
        errorMessage = 'Password is too weak. Please use at least 6 characters.';
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = 'Invalid email address format.';
      } else if (error.code === 'auth/network-request-failed') {
        errorMessage = 'Network error. Please check your internet connection and try again.';
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  if (checking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-background to-secondary/5 p-4">
        <Card className="w-full max-w-md shadow-lg">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
            <p className="text-muted-foreground">Checking system status...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (hasAdmins) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-background to-secondary/5 p-4">
        <Card className="w-full max-w-md shadow-lg">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <CheckCircle className="h-8 w-8 text-green-500 mb-4" />
            <p className="text-muted-foreground">System is ready</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-background to-secondary/5 p-4">
        <Card className="w-full max-w-md shadow-lg">
          <CardContent className="flex flex-col items-center justify-center py-12 space-y-4">
            <CheckCircle className="h-12 w-12 text-green-500" />
            <div className="text-center space-y-2">
              <h3 className="text-lg font-medium">Setup Complete!</h3>
              <p className="text-sm text-muted-foreground">
                Your admin account has been created successfully.
              </p>
            </div>
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
              Initial Setup Required
            </CardTitle>
            <CardDescription>
              Create the first admin account to get started
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          <Alert>
            <Settings className="h-4 w-4" />
            <AlertDescription>
              <div className="space-y-2">
                <p className="font-medium">First Time Setup</p>
                <p className="text-sm">No admin users exist yet. Create the first admin account to access the CMS dashboard.</p>
              </div>
            </AlertDescription>
          </Alert>

          {error && (
            <Alert variant="destructive">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleCreateFirstAdmin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="admin-name">Admin Name</Label>
              <Input
                id="admin-name"
                type="text"
                placeholder="Your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={loading}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="admin-email">Email Address</Label>
              <Input
                id="admin-email"
                type="email"
                placeholder="admin@novafuze.in"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="admin-password">Password</Label>
              <div className="relative">
                <Input
                  id="admin-password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a secure password (min 6 characters)"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={loading}
                  required
                  minLength={6}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={loading}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="confirm-password">Confirm Password</Label>
              <Input
                id="confirm-password"
                type={showPassword ? "text" : "password"}
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                disabled={loading}
                required
              />
            </div>
            
            <Button
              type="submit"
              disabled={loading || !email || !password || !confirmPassword || !name}
              className="w-full"
              size="lg"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating admin account...
                </>
              ) : (
                'Create First Admin Account'
              )}
            </Button>
          </form>

          <div className="text-center text-sm text-muted-foreground space-y-1">
            <p>This will create the first admin user for your NovaFuze CMS.</p>
            <p>You can add more admins later from the dashboard.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};