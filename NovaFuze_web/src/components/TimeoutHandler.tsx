import { useEffect, useState } from 'react';
import { Card, CardContent } from './ui/card';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import { Button } from './ui/button';

interface TimeoutHandlerProps {
  children: React.ReactNode;
  timeout?: number;
  label?: string;
}

export const TimeoutHandler = ({ 
  children, 
  timeout = 10000, // 10 seconds default
  label = 'Component' 
}: TimeoutHandlerProps) => {
  const [hasTimedOut, setHasTimedOut] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      console.error(`⏰ Timeout Warning: ${label} is taking longer than expected to load`);
      setHasTimedOut(true);
    }, timeout);

    // Simulate loading completion
    const loadingTimer = setTimeout(() => {
      setIsLoading(false);
      clearTimeout(timer);
    }, 100);

    return () => {
      clearTimeout(timer);
      clearTimeout(loadingTimer);
    };
  }, [timeout, label]);

  if (hasTimedOut && isLoading) {
    return (
      <Card className="m-4">
        <CardContent className="flex flex-col items-center justify-center py-8 text-center">
          <AlertTriangle className="w-12 h-12 text-yellow-500 mb-4" />
          <h3 className="text-lg font-semibold mb-2">Loading Taking Longer Than Expected</h3>
          <p className="text-muted-foreground mb-4">
            {label} is taking longer to load than usual. This might be due to network issues.
          </p>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              onClick={() => {
                setHasTimedOut(false);
                setIsLoading(false);
              }}
            >
              Continue Anyway
            </Button>
            <Button onClick={() => window.location.reload()}>
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh Page
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return <>{children}</>;
};