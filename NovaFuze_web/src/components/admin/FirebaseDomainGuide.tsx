import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Alert, AlertDescription } from '../ui/alert';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { 
  AlertTriangle, 
  CheckCircle, 
  ExternalLink,
  Copy,
  Settings,
  Globe,
  Shield
} from 'lucide-react';

interface FirebaseDomainGuideProps {
  onClose: () => void;
}

export const FirebaseDomainGuide = ({ onClose }: FirebaseDomainGuideProps) => {
  const [copiedDomain, setCopiedDomain] = useState(false);
  
  const currentDomain = typeof window !== 'undefined' ? window.location.origin : '';
  
  const copyDomain = async () => {
    try {
      // Try modern clipboard API first
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(currentDomain);
        setCopiedDomain(true);
        setTimeout(() => setCopiedDomain(false), 2000);
        return;
      }
      
      // Fallback for unsupported environments
      const textArea = document.createElement('textarea');
      textArea.value = currentDomain;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      textArea.style.top = '-999999px';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      
      try {
        document.execCommand('copy');
        setCopiedDomain(true);
        setTimeout(() => setCopiedDomain(false), 2000);
      } catch (err) {
        console.error('Fallback copy failed:', err);
        // Show manual copy instruction instead
        alert(`Please copy this domain manually: ${currentDomain}`);
      } finally {
        document.body.removeChild(textArea);
      }
    } catch (error) {
      console.error('Failed to copy domain:', error);
      // Show manual copy instruction as last resort
      alert(`Please copy this domain manually: ${currentDomain}`);
    }
  };

  const steps = [
    {
      step: 1,
      title: 'Open Firebase Console',
      content: (
        <div className="space-y-2">
          <p>Go to the Firebase Console and select your project:</p>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => window.open('https://console.firebase.google.com/project/novafuze-tech', '_blank')}
          >
            <ExternalLink className="w-4 h-4 mr-2" />
            Open Firebase Console
          </Button>
        </div>
      )
    },
    {
      step: 2,
      title: 'Navigate to Authentication',
      content: (
        <div className="space-y-2">
          <p>In the left sidebar, click on:</p>
          <ol className="list-decimal list-inside text-sm space-y-1 ml-4">
            <li><strong>Authentication</strong></li>
            <li><strong>Settings</strong> tab</li>
            <li><strong>Authorized domains</strong> section</li>
          </ol>
        </div>
      )
    },
    {
      step: 3,
      title: 'Add Your Domain',
      content: (
        <div className="space-y-3">
          <p>Add the following domain to your authorized domains list:</p>
          <div className="space-y-2">
            <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
              <code className="flex-1 text-sm">{currentDomain}</code>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={copyDomain}
                className="shrink-0"
              >
                {copiedDomain ? (
                  <CheckCircle className="w-4 h-4 mr-1 text-green-600" />
                ) : (
                  <Copy className="w-4 h-4 mr-1" />
                )}
                {copiedDomain ? 'Copied!' : 'Copy'}
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              💡 If copy doesn't work, manually select and copy: <strong>{currentDomain}</strong>
            </p>
          </div>
          <p className="text-sm text-muted-foreground">
            Click "Add domain" and paste the domain above, then save your changes.
          </p>
        </div>
      )
    },
    {
      step: 4,
      title: 'Common Domains to Add',
      content: (
        <div className="space-y-2">
          <p className="text-sm">You might also want to add these common development domains:</p>
          <div className="space-y-1 text-sm">
            <div className="flex items-center gap-2">
              <code className="bg-muted px-2 py-1 rounded text-xs">localhost</code>
              <span className="text-muted-foreground">- For local development</span>
            </div>
            <div className="flex items-center gap-2">
              <code className="bg-muted px-2 py-1 rounded text-xs">127.0.0.1</code>
              <span className="text-muted-foreground">- Alternative localhost</span>
            </div>
            <div className="flex items-center gap-2">
              <code className="bg-muted px-2 py-1 rounded text-xs">yourdomain.com</code>
              <span className="text-muted-foreground">- Your production domain</span>
            </div>
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-orange-100 dark:bg-orange-900/20 rounded-full">
              <Settings className="h-8 w-8 text-orange-600 dark:text-orange-400" />
            </div>
          </div>
          <CardTitle className="text-2xl">Firebase Domain Authorization Required</CardTitle>
          <CardDescription>
            Your current domain needs to be authorized in Firebase Console to enable Google Authentication.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <Alert>
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              <strong>Error:</strong> <code>auth/unauthorized-domain</code>
              <br />
              This domain is not authorized for OAuth operations with your Firebase project.
            </AlertDescription>
          </Alert>

          <div className="space-y-4">
            {steps.map((step) => (
              <Card key={step.step} className="border-l-4 border-l-primary">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <Badge variant="secondary" className="shrink-0">
                      Step {step.step}
                    </Badge>
                    <div className="flex-1">
                      <h3 className="font-medium mb-2">{step.title}</h3>
                      {step.content}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Alert>
            <CheckCircle className="h-4 w-4" />
            <AlertDescription>
              <strong>After completing these steps:</strong>
              <br />
              1. Wait a few minutes for changes to propagate
              <br />
              2. Disable Demo Mode in <code>/firebase/config.ts</code>
              <br />
              3. Try authenticating again
            </AlertDescription>
          </Alert>

          <div className="flex gap-3">
            <Button onClick={onClose} variant="outline" className="flex-1">
              Back to Demo Mode
            </Button>
            <Button 
              variant="outline" 
              className="flex-1"
              onClick={() => window.open('https://firebase.google.com/docs/auth/web/auth-domain', '_blank')}
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              Firebase Documentation
            </Button>
          </div>

          <div className="text-center text-sm text-muted-foreground">
            <p>
              <strong>Current Domain:</strong> <code>{currentDomain}</code>
            </p>
            <p className="mt-1">
              This domain must be added to your Firebase project's authorized domains.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};