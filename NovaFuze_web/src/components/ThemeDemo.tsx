import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Alert, AlertDescription } from './ui/alert';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Switch } from './ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  Sun, 
  Moon, 
  Star, 
  Heart, 
  CheckCircle, 
  AlertTriangle, 
  Info, 
  Settings,
  Palette
} from 'lucide-react';
import { useTheme } from './ThemeProvider';

export const ThemeDemo = () => {
  const { theme } = useTheme();

  return (
    <div className="space-y-8 p-6">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
          NovaFuze Theme System
        </h1>
        <p className="text-lg text-muted-foreground">
          Experience seamless light and dark mode transitions with our optimized color palette
        </p>
        <Badge variant="outline" className="text-sm">
          Current theme: {theme}
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Color Palette Showcase */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Palette className="h-5 w-5" />
              Color System
            </CardTitle>
            <CardDescription>
              Our primary and secondary colors adapt beautifully
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <div className="h-12 bg-primary rounded-md"></div>
                <p className="text-sm text-center">Primary</p>
              </div>
              <div className="space-y-2">
                <div className="h-12 bg-secondary rounded-md"></div>
                <p className="text-sm text-center">Secondary</p>
              </div>
              <div className="space-y-2">
                <div className="h-12 bg-accent rounded-md"></div>
                <p className="text-sm text-center">Accent</p>
              </div>
              <div className="space-y-2">
                <div className="h-12 bg-muted rounded-md"></div>
                <p className="text-sm text-center">Muted</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Components Showcase */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Interactive Elements
            </CardTitle>
            <CardDescription>
              Buttons and inputs with consistent theming
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <Button className="w-full">Primary Button</Button>
              <Button variant="outline" className="w-full">Outline Button</Button>
              <Button variant="secondary" className="w-full">Secondary Button</Button>
              <Button variant="ghost" className="w-full">Ghost Button</Button>
            </div>
            <div className="space-y-2">
              <Label htmlFor="demo-input">Input Field</Label>
              <Input id="demo-input" placeholder="Type something..." />
            </div>
            <div className="flex items-center space-x-2">
              <Switch id="demo-switch" />
              <Label htmlFor="demo-switch">Toggle switch</Label>
            </div>
          </CardContent>
        </Card>

        {/* Alerts & Badges */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="h-5 w-5" />
              Status Elements
            </CardTitle>
            <CardDescription>
              Various states and notification styles
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <Badge variant="default">Default Badge</Badge>
              <Badge variant="secondary">Secondary Badge</Badge>
              <Badge variant="outline">Outline Badge</Badge>
              <Badge variant="destructive">Destructive Badge</Badge>
            </div>
            
            <Alert>
              <Info className="h-4 w-4" />
              <AlertDescription>
                This is an info alert with automatic theme adaptation.
              </AlertDescription>
            </Alert>
            
            <Alert variant="destructive">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                Destructive alerts maintain readability in both themes.
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>
      </div>

      {/* Tabs Showcase */}
      <Card>
        <CardHeader>
          <CardTitle>Tabbed Interface</CardTitle>
          <CardDescription>
            Navigation components with theme-aware styling
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="features" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="features">Features</TabsTrigger>
              <TabsTrigger value="design">Design</TabsTrigger>
              <TabsTrigger value="accessibility">A11y</TabsTrigger>
            </TabsList>
            
            <TabsContent value="features" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                  <div>
                    <h4 className="font-medium">Automatic Theme Detection</h4>
                    <p className="text-sm text-muted-foreground">
                      Respects user's system preferences by default
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                  <div>
                    <h4 className="font-medium">Persistent Storage</h4>
                    <p className="text-sm text-muted-foreground">
                      User preferences saved locally
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                  <div>
                    <h4 className="font-medium">Smooth Transitions</h4>
                    <p className="text-sm text-muted-foreground">
                      Animated theme switching without jarring changes
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                  <div>
                    <h4 className="font-medium">Brand Consistency</h4>
                    <p className="text-sm text-muted-foreground">
                      NovaFuze primary color maintained across themes
                    </p>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="design" className="space-y-4">
              <div className="text-center space-y-4">
                <div className="flex justify-center space-x-8">
                  <div className="text-center">
                    <Sun className="h-12 w-12 mx-auto mb-2 text-yellow-500" />
                    <h4 className="font-medium">Light Mode</h4>
                    <p className="text-sm text-muted-foreground">Clean, bright interface</p>
                  </div>
                  <div className="text-center">
                    <Moon className="h-12 w-12 mx-auto mb-2 text-blue-400" />
                    <h4 className="font-medium">Dark Mode</h4>
                    <p className="text-sm text-muted-foreground">Easy on the eyes</p>
                  </div>
                </div>
                <p className="text-muted-foreground">
                  Both themes are carefully crafted to provide optimal readability and user experience
                  while maintaining the NovaFuze brand identity.
                </p>
              </div>
            </TabsContent>
            
            <TabsContent value="accessibility" className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Heart className="h-5 w-5 text-red-500 mt-0.5" />
                  <div>
                    <h4 className="font-medium">WCAG Compliant</h4>
                    <p className="text-sm text-muted-foreground">
                      All color combinations meet accessibility standards for contrast ratios
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                  <div>
                    <h4 className="font-medium">Reduced Motion Support</h4>
                    <p className="text-sm text-muted-foreground">
                      Respects user preferences for reduced motion
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                  <div>
                    <h4 className="font-medium">Screen Reader Friendly</h4>
                    <p className="text-sm text-muted-foreground">
                      Proper semantic markup and ARIA labels throughout
                    </p>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};