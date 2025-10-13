import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Alert, AlertDescription } from '../ui/alert'
import { Button } from '../ui/button'
import { ExternalLink, AlertTriangle, CheckCircle, Info } from 'lucide-react'
import { getInitializationError, shouldEnableFirebase } from '../../firebase/config'
import { useFirebase } from '../FirebaseProvider'

export function FirebaseTroubleshooting() {
  const { isInitialized, isConnected, hasStorage, error, retryConnection } = useFirebase()
  const initError = getInitializationError()

  const troubleshootingSteps = [
    {
      title: "1. Enable Firestore Database",
      description: "Make sure Firestore Database is enabled in your Firebase project",
      link: "https://console.firebase.google.com/project/novafuze-tech/firestore",
      status: isConnected ? 'success' : 'error'
    },
    {
      title: "2. Enable Firebase Storage",
      description: "Enable Cloud Storage for Firebase in your project",
      link: "https://console.firebase.google.com/project/novafuze-tech/storage",
      status: hasStorage ? 'success' : 'error'
    },
    {
      title: "3. Enable Authentication",
      description: "Enable Email/Password authentication provider",
      link: "https://console.firebase.google.com/project/novafuze-tech/authentication/providers",
      status: isInitialized ? 'success' : 'error'
    },
    {
      title: "4. Configure Authorized Domains",
      description: "Add your domain to the authorized domains list",
      link: "https://console.firebase.google.com/project/novafuze-tech/authentication/settings",
      status: 'info'
    }
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case 'error':
        return <AlertTriangle className="h-4 w-4 text-red-500" />
      default:
        return <Info className="h-4 w-4 text-blue-500" />
    }
  }

  const firebaseRules = {
    firestore: `rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow read/write access to authenticated users
    match /{document=**} {
      allow read, write: if request.auth != null;
    }
  }
}`,
    storage: `rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read, write: if request.auth != null;
    }
  }
}`
  }

  if (!shouldEnableFirebase()) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Firebase Configuration</CardTitle>
        </CardHeader>
        <CardContent>
          <Alert>
            <Info className="h-4 w-4" />
            <AlertDescription>
              Firebase is currently disabled. The system is running in demo mode.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Firebase Connection Status</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {error && (
            <Alert variant="destructive">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                <strong>Connection Error:</strong> {error}
                <Button 
                  variant="link" 
                  size="sm" 
                  onClick={retryConnection}
                  className="ml-2 p-0 h-auto"
                >
                  Retry Connection
                </Button>
              </AlertDescription>
            </Alert>
          )}

          {initError && (
            <Alert variant="destructive">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                <strong>Initialization Error:</strong> {initError}
              </AlertDescription>
            </Alert>
          )}

          <div className="grid gap-4">
            {troubleshootingSteps.map((step, index) => (
              <div key={index} className="flex items-start gap-3 p-3 border rounded-lg">
                {getStatusIcon(step.status)}
                <div className="flex-1">
                  <h4 className="font-medium">{step.title}</h4>
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                  <a 
                    href={step.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-sm text-primary hover:underline mt-1"
                  >
                    Open in Firebase Console <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Security Rules</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert>
            <Info className="h-4 w-4" />
            <AlertDescription>
              Make sure your Firebase Security Rules allow authenticated users to read and write data.
            </AlertDescription>
          </Alert>

          <div>
            <h4 className="font-medium mb-2">Firestore Rules</h4>
            <pre className="text-xs bg-muted p-3 rounded-lg overflow-x-auto">
              {firebaseRules.firestore}
            </pre>
          </div>

          <div>
            <h4 className="font-medium mb-2">Storage Rules</h4>
            <pre className="text-xs bg-muted p-3 rounded-lg overflow-x-auto">
              {firebaseRules.storage}
            </pre>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Common Issues</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div>
              <h4 className="font-medium">Transport Errors</h4>
              <p className="text-sm text-muted-foreground">
                If you see "WebChannelConnection transport errored" messages, check that:
              </p>
              <ul className="text-sm text-muted-foreground ml-4 mt-1 space-y-1">
                <li>• Your Firebase project exists and is active</li>
                <li>• Firestore and Storage are enabled</li>
                <li>• Your billing account is set up (if required)</li>
                <li>• Network connectivity is stable</li>
              </ul>
            </div>

            <div>
              <h4 className="font-medium">Authentication Issues</h4>
              <p className="text-sm text-muted-foreground">
                If login fails, verify that:
              </p>
              <ul className="text-sm text-muted-foreground ml-4 mt-1 space-y-1">
                <li>• Email/Password provider is enabled</li>
                <li>• Your domain is in authorized domains</li>
                <li>• User accounts exist in Authentication</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}