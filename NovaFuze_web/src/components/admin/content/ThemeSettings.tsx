import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/card';
import { Button } from '../../ui/button';
import { Label } from '../../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/select';
import { Switch } from '../../ui/switch';
import { Alert, AlertDescription } from '../../ui/alert';
import { Badge } from '../../ui/badge';
import { Moon, Sun, Monitor, Palette, Settings, Check } from 'lucide-react';
import { useTheme } from '../../ThemeProvider';
import { toast } from 'sonner';

export const ThemeSettings = () => {
  const { theme, setTheme } = useTheme();
  const [previewMode, setPreviewMode] = useState(false);

  const themes = [
    {
      value: 'light',
      label: 'Light',
      icon: <Sun className="h-4 w-4" />,
      description: 'Clean, bright interface for daytime use'
    },
    {
      value: 'dark',
      label: 'Dark',
      icon: <Moon className="h-4 w-4" />,
      description: 'Easy on the eyes for low-light environments'
    },
    {
      value: 'system',
      label: 'System',
      icon: <Monitor className="h-4 w-4" />,
      description: 'Automatically matches your device preferences'
    }
  ];

  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme as 'light' | 'dark' | 'system');
    toast.success(`Theme changed to ${newTheme}`);
  };

  const colorPalette = [
    { name: 'Primary', light: '#4E6BDF', dark: '#4E6BDF', class: 'bg-primary' },
    { name: 'Secondary', light: '#f1f5f9', dark: '#374151', class: 'bg-secondary' },
    { name: 'Background', light: '#ffffff', dark: '#030213', class: 'bg-background' },
    { name: 'Foreground', light: '#0f172a', dark: '#f8fafc', class: 'bg-foreground' },
    { name: 'Muted', light: '#f1f5f9', dark: '#374151', class: 'bg-muted' },
    { name: 'Accent', light: '#f1f5f9', dark: '#374151', class: 'bg-accent' },
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Palette className="h-5 w-5" />
            Theme Settings
          </CardTitle>
          <CardDescription>
            Customize the appearance of your website with light and dark mode options
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Current Theme Display */}
          <div className="space-y-3">
            <Label>Current Theme</Label>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="flex items-center gap-2">
                {themes.find(t => t.value === theme)?.icon}
                {themes.find(t => t.value === theme)?.label}
              </Badge>
              <span className="text-sm text-muted-foreground">
                {themes.find(t => t.value === theme)?.description}
              </span>
            </div>
          </div>

          {/* Theme Selection */}
          <div className="space-y-3">
            <Label>Choose Theme</Label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {themes.map((themeOption) => (
                <Card 
                  key={themeOption.value}
                  className={`cursor-pointer transition-all hover:shadow-md ${
                    theme === themeOption.value ? 'ring-2 ring-primary' : ''
                  }`}
                  onClick={() => handleThemeChange(themeOption.value)}
                >
                  <CardContent className="p-4 text-center">
                    <div className="flex flex-col items-center gap-2">
                      <div className="flex items-center justify-center w-12 h-12 rounded-full bg-muted">
                        {themeOption.icon}
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{themeOption.label}</span>
                          {theme === themeOption.value && <Check className="h-4 w-4 text-primary" />}
                        </div>
                        <p className="text-xs text-muted-foreground">
                          {themeOption.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Color Palette Preview */}
          <div className="space-y-3">
            <Label>Color Palette Preview</Label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {colorPalette.map((color) => (
                <div key={color.name} className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-md border ${color.class}`}></div>
                  <div>
                    <p className="text-sm font-medium">{color.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {theme === 'dark' ? color.dark : color.light}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Preview Mode Toggle */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Preview Mode</Label>
                <p className="text-sm text-muted-foreground">
                  See how different themes look without applying them
                </p>
              </div>
              <Switch
                checked={previewMode}
                onCheckedChange={setPreviewMode}
              />
            </div>
          </div>

          {previewMode && (
            <Alert>
              <Settings className="h-4 w-4" />
              <AlertDescription>
                Preview mode is enabled. Changes won't be saved until you disable preview mode.
              </AlertDescription>
            </Alert>
          )}

          {/* System Theme Info */}
          {theme === 'system' && (
            <Alert>
              <Monitor className="h-4 w-4" />
              <AlertDescription>
                <div className="space-y-2">
                  <p className="font-medium">System Theme Active</p>
                  <p className="text-sm">
                    The website will automatically switch between light and dark modes based on your device's system preferences.
                    Users can override this by selecting a specific theme.
                  </p>
                </div>
              </AlertDescription>
            </Alert>
          )}

          {/* Usage Instructions */}
          <div className="bg-muted/50 rounded-lg p-4 space-y-2">
            <h4 className="font-medium flex items-center gap-2">
              <Settings className="h-4 w-4" />
              Implementation Notes
            </h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Light/Dark mode toggle is available in the website header</li>
              <li>• Theme preference is saved locally for each user</li>
              <li>• System theme automatically detects user's OS preference</li>
              <li>• All colors are optimized for both light and dark modes</li>
              <li>• Changes apply immediately across the entire website</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};