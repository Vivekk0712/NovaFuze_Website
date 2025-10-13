import { useState } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Alert, AlertDescription } from '../ui/alert';
import { Badge } from '../ui/badge';
import { 
  HelpCircle, 
  CheckCircle, 
  AlertTriangle, 
  ExternalLink,
  Chrome,
  Globe,
  Monitor,
  Smartphone
} from 'lucide-react';

interface AuthTroubleshootProps {
  onBack: () => void;
}

export const AuthTroubleshoot = ({ onBack }: AuthTroubleshootProps) => {
  const [checkedItems, setCheckedItems] = useState<string[]>([]);

  const toggleCheck = (item: string) => {
    setCheckedItems(prev => 
      prev.includes(item) 
        ? prev.filter(i => i !== item)
        : [...prev, item]
    );
  };

  const troubleshootingSteps = [
    {
      id: 'popups',
      title: 'Enable Popups',
      description: 'Allow popups for this website in your browser settings',
      icon: <Monitor className="w-5 h-5" />,
      steps: [
        'Click the popup blocked icon in your address bar',
        'Select "Always allow popups from this site"',
        'Reload the page and try signing in again'
      ]
    },
    {
      id: 'adblocker',
      title: 'Disable Ad Blockers',
      description: 'Temporarily disable ad blockers or extensions',
      icon: <AlertTriangle className="w-5 h-5" />,
      steps: [
        'Disable browser extensions (AdBlock, uBlock Origin, etc.)',
        'Add this site to your ad blocker whitelist',
        'Try signing in again'
      ]
    },
    {
      id: 'incognito',
      title: 'Try Incognito/Private Mode',
      description: 'Use a private browsing window',
      icon: <Chrome className="w-5 h-5" />,
      steps: [
        'Open a new incognito/private browsing window',
        'Navigate to this admin page',
        'Try signing in with the redirect method'
      ]
    },
    {
      id: 'browser',
      title: 'Try a Different Browser',
      description: 'Some browsers handle authentication better than others',
      icon: <Globe className="w-5 h-5" />,
      steps: [
        'Try Chrome, Firefox, Safari, or Edge',
        'Make sure the browser is up to date',
        'Clear browser cache and cookies'
      ]
    }
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-full">
              <HelpCircle className="h-8 w-8 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
          <CardTitle className="text-2xl">Authentication Troubleshooting</CardTitle>
          <CardDescription>
            Follow these steps to resolve sign-in issues. Check off each step as you complete it.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <Alert>
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              Most authentication issues are caused by browser popup blocking or security extensions.
              Try the steps below in order.
            </AlertDescription>
          </Alert>

          <div className="space-y-4">
            {troubleshootingSteps.map((step) => (
              <Card 
                key={step.id} 
                className={`cursor-pointer transition-all duration-200 ${
                  checkedItems.includes(step.id) 
                    ? 'bg-green-50 dark:bg-green-900/10 border-green-200 dark:border-green-800' 
                    : 'hover:bg-muted/50'
                }`}
                onClick={() => toggleCheck(step.id)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="flex items-center gap-2 mt-1">
                      {checkedItems.includes(step.id) ? (
                        <CheckCircle className="w-5 h-5 text-green-600" />
                      ) : (
                        <div className="w-5 h-5 border-2 border-muted-foreground rounded" />
                      )}
                      {step.icon}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-medium">{step.title}</h3>
                        {checkedItems.includes(step.id) && (
                          <Badge variant="secondary" className="text-xs">
                            Completed
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">
                        {step.description}
                      </p>
                      <ol className="text-sm space-y-1">
                        {step.steps.map((stepText, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <span className="text-muted-foreground text-xs mt-1">
                              {index + 1}.
                            </span>
                            {stepText}
                          </li>
                        ))}
                      </ol>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Alert>
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription className="space-y-2">
              <p><strong>Still having issues?</strong></p>
              <p className="text-sm">
                If none of these steps work, please contact the NovaFuze team with:
              </p>
              <ul className="text-xs list-disc list-inside space-y-1 ml-2">
                <li>Your browser name and version</li>
                <li>Operating system (Windows, Mac, etc.)</li>
                <li>Any error messages you see</li>
                <li>Screenshots if possible</li>
              </ul>
            </AlertDescription>
          </Alert>

          <div className="flex gap-3">
            <Button onClick={onBack} variant="outline" className="flex-1">
              Back to Sign In
            </Button>
            <Button 
              variant="outline" 
              className="flex-1"
              onClick={() => window.open('mailto:admin@novafuze.in', '_blank')}
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              Contact Support
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};