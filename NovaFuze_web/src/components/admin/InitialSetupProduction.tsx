import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { Alert, AlertDescription } from '../ui/alert'
import { Loader2, CheckCircle, AlertTriangle, Info, ExternalLink } from 'lucide-react'
import { initializeDefaultAdmin } from '../../firebase/admin-management'
import { signUpWithEmailPassword, signInWithEmailPassword } from '../../firebase/auth'
import { getInitializationError } from '../../firebase/config'
import { toast } from 'sonner'

interface InitialSetupProductionProps {
  onSetupComplete: () => void
}

export function InitialSetupProduction({ onSetupComplete }: InitialSetupProductionProps) {
  const [step, setStep] = useState<'check' | 'create-admin' | 'create-account' | 'complete'>('check')
  const [isLoading, setIsLoading] = useState(false)
  const [firebaseError, setFirebaseError] = useState<string | null>(null)
  const [adminData, setAdminData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })

  useEffect(() => {
    // Check for Firebase initialization errors with delay
    const timeoutId = setTimeout(() => {
      const initError = getInitializationError()
      if (initError) {
        setFirebaseError(initError)
      }
    }, 2000)

    return () => clearTimeout(timeoutId)
  }, [])

  const handleCreateInitialAdmin = async () => {
    if (!adminData.name || !adminData.email) {
      toast.error('Please fill in all required fields')
      return
    }

    if (!adminData.email.includes('@')) {
      toast.error('Please enter a valid email address')
      return
    }

    setIsLoading(true)
    try {
      await initializeDefaultAdmin(adminData.email, adminData.name)
      toast.success('Admin user created in database!')
      setStep('create-account')
    } catch (error: any) {
      console.error('Error creating admin:', error)
      const errorMessage = error.message || 'Unknown error occurred'
      
      if (errorMessage.includes('transport errored') || errorMessage.includes('WebChannelConnection')) {
        toast.error('Connection issue. Please check your Firebase configuration and try again.')
        setFirebaseError('Network connection to Firebase failed. Please verify your project settings.')
      } else {
        toast.error(`Failed to create admin: ${errorMessage}`)
      }
    } finally {
      setIsLoading(false)
    }
  }

  const handleCreateAuthAccount = async () => {
    if (!adminData.password || adminData.password.length < 6) {
      toast.error('Password must be at least 6 characters long')
      return
    }

    if (adminData.password !== adminData.confirmPassword) {
      toast.error('Passwords do not match')
      return
    }

    setIsLoading(true)
    try {
      await signUpWithEmailPassword(adminData.email, adminData.password)
      toast.success('Admin account created successfully!')
      setStep('complete')
    } catch (error: any) {
      console.error('Error creating auth account:', error)
      toast.error(`Failed to create account: ${error.message}`)
    } finally {
      setIsLoading(false)
    }
  }

  const handleCompleteSetup = () => {
    onSetupComplete()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-secondary/10 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center">
            🚀 NovaFuze Tech - Initial Setup
          </CardTitle>
          <p className="text-center text-sm text-muted-foreground">
            Set up your first admin account for the CMS
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Firebase Status */}
          {firebaseError ? (
            <Alert variant="destructive">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                <strong>Firebase Configuration Issue</strong><br />
                {firebaseError}
                <div className="mt-2 space-y-1">
                  <p className="text-xs">Please check:</p>
                  <ul className="text-xs space-y-1 ml-4">
                    <li>• Firestore Database is enabled in your Firebase project</li>
                    <li>• Storage is enabled in your Firebase project</li>
                    <li>• Authentication is enabled with Email/Password provider</li>
                    <li>• Your domain is added to authorized domains</li>
                  </ul>
                  <a 
                    href="https://console.firebase.google.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs underline mt-2"
                  >
                    Open Firebase Console <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              </AlertDescription>
            </Alert>
          ) : (
            <Alert>
              <Info className="h-4 w-4" />
              <AlertDescription>
                <strong>Firebase Connected</strong><br />
                Your Firebase configuration is active and ready for production use.
              </AlertDescription>
            </Alert>
          )}

          {step === 'check' && (
            <div className="space-y-4">
              <div className="text-center">
                <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Firebase Configuration Detected</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Your Firebase project is ready. Let's create your first admin account.
                </p>
              </div>
              
              <Button 
                onClick={() => setStep('create-admin')} 
                className="w-full"
              >
                Start Setup
              </Button>
            </div>
          )}

          {step === 'create-admin' && (
            <div className="space-y-4">
              <div className="text-center mb-4">
                <h3 className="font-semibold">Step 1: Create Admin User</h3>
                <p className="text-sm text-muted-foreground">
                  This will add you as an admin in the database
                </p>
              </div>

              <div className="space-y-3">
                <div>
                  <Label htmlFor="admin-name">Full Name *</Label>
                  <Input
                    id="admin-name"
                    type="text"
                    placeholder="Your full name"
                    value={adminData.name}
                    onChange={(e) => setAdminData(prev => ({ ...prev, name: e.target.value }))}
                    disabled={isLoading}
                  />
                </div>

                <div>
                  <Label htmlFor="admin-email">Email Address *</Label>
                  <Input
                    id="admin-email"
                    type="email"
                    placeholder="admin@novafuze.in"
                    value={adminData.email}
                    onChange={(e) => setAdminData(prev => ({ ...prev, email: e.target.value }))}
                    disabled={isLoading}
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    This email will be used for admin login
                  </p>
                </div>
              </div>

              <Button 
                onClick={handleCreateInitialAdmin} 
                disabled={isLoading || !adminData.name || !adminData.email}
                className="w-full"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Creating Admin...
                  </>
                ) : (
                  'Create Admin User'
                )}
              </Button>
            </div>
          )}

          {step === 'create-account' && (
            <div className="space-y-4">
              <div className="text-center mb-4">
                <CheckCircle className="h-8 w-8 text-green-500 mx-auto mb-2" />
                <h3 className="font-semibold">Step 2: Create Authentication Account</h3>
                <p className="text-sm text-muted-foreground">
                  Now create your login password for <strong>{adminData.email}</strong>
                </p>
              </div>

              <div className="space-y-3">
                <div>
                  <Label htmlFor="admin-password">Password *</Label>
                  <Input
                    id="admin-password"
                    type="password"
                    placeholder="Choose a strong password"
                    value={adminData.password}
                    onChange={(e) => setAdminData(prev => ({ ...prev, password: e.target.value }))}
                    disabled={isLoading}
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Minimum 6 characters
                  </p>
                </div>

                <div>
                  <Label htmlFor="admin-confirm-password">Confirm Password *</Label>
                  <Input
                    id="admin-confirm-password"
                    type="password"
                    placeholder="Confirm your password"
                    value={adminData.confirmPassword}
                    onChange={(e) => setAdminData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                    disabled={isLoading}
                  />
                </div>
              </div>

              <Button 
                onClick={handleCreateAuthAccount} 
                disabled={isLoading || !adminData.password || adminData.password !== adminData.confirmPassword}
                className="w-full"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Creating Account...
                  </>
                ) : (
                  'Create Authentication Account'
                )}
              </Button>
            </div>
          )}

          {step === 'complete' && (
            <div className="space-y-4">
              <div className="text-center">
                <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Setup Complete! 🎉</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Your NovaFuze Tech CMS is ready to use. You can now access the admin dashboard.
                </p>
              </div>

              <div className="bg-muted p-4 rounded-lg space-y-2">
                <p className="text-sm"><strong>Admin Email:</strong> {adminData.email}</p>
                <p className="text-sm"><strong>Role:</strong> Super Admin</p>
                <p className="text-sm"><strong>Status:</strong> Active</p>
              </div>

              <Alert>
                <Info className="h-4 w-4" />
                <AlertDescription className="text-sm">
                  <strong>Important:</strong> Save your login credentials securely. You can add more admin users later from the admin dashboard.
                </AlertDescription>
              </Alert>
              
              <Button 
                onClick={handleCompleteSetup} 
                className="w-full"
              >
                Continue to Admin Dashboard
              </Button>
            </div>
          )}

          {step !== 'complete' && (
            <div className="text-center">
              <p className="text-xs text-muted-foreground">
                This is a one-time setup process for your NovaFuze Tech website
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}