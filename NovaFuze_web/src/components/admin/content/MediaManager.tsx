import { useState, useEffect } from 'react';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { Label } from '../../ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/card';
import { Alert, AlertDescription } from '../../ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../../ui/dialog';
import { Badge } from '../../ui/badge';
import { ScrollArea } from '../../ui/scroll-area';
import { AspectRatio } from '../../ui/aspect-ratio';
import { 
  Upload, 
  Image, 
  Video, 
  FileText, 
  Trash2, 
  Copy, 
  Download, 
  Eye,
  Loader2,
  Search,
  Filter,
  Grid,
  List
} from 'lucide-react';
import { 
  uploadImage, 
  uploadVideo, 
  uploadDocument, 
  listFiles, 
  deleteFile, 
  MediaFile,
  STORAGE_PATHS 
} from '../../../firebase/storage';
import { toast } from 'sonner';

interface MediaManagerProps {
  onSelectFile?: (file: MediaFile) => void;
  allowedTypes?: ('image' | 'video' | 'document')[];
  maxSelections?: number;
}

export const MediaManager = ({ 
  onSelectFile, 
  allowedTypes = ['image', 'video', 'document'],
  maxSelections = 1 
}: MediaManagerProps) => {
  const [files, setFiles] = useState<MediaFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<MediaFile[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedPath, setSelectedPath] = useState<string>(STORAGE_PATHS.GALLERY_IMAGES);

  useEffect(() => {
    loadFiles();
  }, [selectedPath]);

  const loadFiles = async () => {
    try {
      setLoading(true);
      const allFiles: MediaFile[] = [];
      
      // Load files from multiple paths based on allowed types
      const pathsToLoad = [];
      
      if (allowedTypes.includes('image')) {
        pathsToLoad.push(
          STORAGE_PATHS.HERO_IMAGES,
          STORAGE_PATHS.BLOG_IMAGES,
          STORAGE_PATHS.PRODUCT_IMAGES,
          STORAGE_PATHS.SERVICE_IMAGES,
          STORAGE_PATHS.TEAM_IMAGES,
          STORAGE_PATHS.PORTFOLIO_IMAGES,
          STORAGE_PATHS.VLOG_THUMBNAILS,
          STORAGE_PATHS.GALLERY_IMAGES,
          STORAGE_PATHS.LOGOS,
          STORAGE_PATHS.ICONS
        );
      }
      
      if (allowedTypes.includes('video')) {
        pathsToLoad.push(STORAGE_PATHS.VLOG_VIDEOS);
      }
      
      if (allowedTypes.includes('document')) {
        pathsToLoad.push(STORAGE_PATHS.DOCUMENTS);
      }

      for (const path of pathsToLoad) {
        try {
          const pathFiles = await listFiles(path);
          allFiles.push(...pathFiles);
        } catch (error) {
          console.warn(`Failed to load files from ${path}:`, error);
        }
      }
      
      // Sort by upload date (newest first)
      allFiles.sort((a, b) => b.uploadedAt.getTime() - a.uploadedAt.getTime());
      setFiles(allFiles);
    } catch (error) {
      console.error('Error loading files:', error);
      toast.error('Failed to load media files');
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFiles = event.target.files;
    if (!uploadedFiles) return;

    setUploading(true);
    const results: MediaFile[] = [];

    try {
      for (const file of Array.from(uploadedFiles)) {
        let uploadResult;
        
        if (file.type.startsWith('image/')) {
          uploadResult = await uploadImage(file, selectedPath.replace('images/', ''));
        } else if (file.type.startsWith('video/')) {
          uploadResult = await uploadVideo(file, selectedPath.replace('videos/', ''));
        } else {
          uploadResult = await uploadDocument(file, selectedPath.replace('documents/', ''));
        }
        
        results.push({
          name: uploadResult.name,
          url: uploadResult.downloadURL,
          path: uploadResult.path,
          size: file.size,
          type: file.type,
          uploadedAt: new Date()
        });
      }
      
      setFiles(prev => [...results, ...prev]);
      toast.success(`Uploaded ${results.length} file${results.length > 1 ? 's' : ''} successfully`);
    } catch (error) {
      console.error('Error uploading files:', error);
      toast.error('Failed to upload files');
    } finally {
      setUploading(false);
      // Reset input
      event.target.value = '';
    }
  };

  const handleDeleteFile = async (file: MediaFile) => {
    if (!confirm(`Are you sure you want to delete "${file.name}"?`)) return;

    try {
      await deleteFile(file.path);
      setFiles(prev => prev.filter(f => f.path !== file.path));
      setSelectedFiles(prev => prev.filter(f => f.path !== file.path));
      toast.success('File deleted successfully');
    } catch (error) {
      console.error('Error deleting file:', error);
      toast.error('Failed to delete file');
    }
  };

  const handleSelectFile = (file: MediaFile) => {
    if (maxSelections === 1) {
      setSelectedFiles([file]);
      onSelectFile?.(file);
    } else {
      setSelectedFiles(prev => {
        const isSelected = prev.some(f => f.path === file.path);
        if (isSelected) {
          return prev.filter(f => f.path !== file.path);
        } else if (prev.length < maxSelections) {
          return [...prev, file];
        } else {
          toast.error(`You can only select up to ${maxSelections} files`);
          return prev;
        }
      });
    }
  };

  const copyToClipboard = (url: string) => {
    navigator.clipboard.writeText(url);
    toast.success('URL copied to clipboard');
  };

  const filteredFiles = files.filter(file => {
    const matchesSearch = file.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = activeTab === 'all' || 
      (activeTab === 'images' && file.type?.startsWith('image/')) ||
      (activeTab === 'videos' && file.type?.startsWith('video/')) ||
      (activeTab === 'documents' && !file.type?.startsWith('image/') && !file.type?.startsWith('video/'));
    
    return matchesSearch && matchesType;
  });

  const formatFileSize = (bytes?: number) => {
    if (!bytes) return 'Unknown size';
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i];
  };

  const getFileIcon = (type?: string) => {
    if (type?.startsWith('image/')) return <Image className="h-4 w-4" />;
    if (type?.startsWith('video/')) return <Video className="h-4 w-4" />;
    return <FileText className="h-4 w-4" />;
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Upload className="h-5 w-5" />
          Media Manager
        </CardTitle>
        <CardDescription>
          Upload and manage your website media files
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Upload Section */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <Label htmlFor="file-upload">Upload Files</Label>
              <Input
                id="file-upload"
                type="file"
                multiple
                accept={allowedTypes.includes('image') ? 'image/*,' : ''}
                onChange={handleFileUpload}
                disabled={uploading}
                className="cursor-pointer"
              />
            </div>
            <div className="flex items-end">
              <Button disabled={uploading} variant="outline">
                {uploading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Uploading...
                  </>
                ) : (
                  <>
                    <Upload className="h-4 w-4 mr-2" />
                    Upload
                  </>
                )}
              </Button>
            </div>
          </div>
          
          {uploading && (
            <Alert>
              <Loader2 className="h-4 w-4 animate-spin" />
              <AlertDescription>
                Uploading files... Please wait.
              </AlertDescription>
            </Alert>
          )}
        </div>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="flex-1 max-w-sm">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search files..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('grid')}
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('list')}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* File Type Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="all">All Files</TabsTrigger>
            {allowedTypes.includes('image') && <TabsTrigger value="images">Images</TabsTrigger>}
            {allowedTypes.includes('video') && <TabsTrigger value="videos">Videos</TabsTrigger>}
            {allowedTypes.includes('document') && <TabsTrigger value="documents">Documents</TabsTrigger>}
          </TabsList>

          <TabsContent value={activeTab} className="mt-4">
            {loading ? (
              <div className="flex items-center justify-center p-8">
                <Loader2 className="h-8 w-8 animate-spin" />
                <span className="ml-2">Loading files...</span>
              </div>
            ) : filteredFiles.length === 0 ? (
              <div className="text-center p-8 text-muted-foreground">
                {searchTerm ? 'No files match your search.' : 'No files uploaded yet.'}
              </div>
            ) : (
              <ScrollArea className="h-96">
                <div className={viewMode === 'grid' 
                  ? "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4" 
                  : "space-y-2"
                }>
                  {filteredFiles.map((file) => {
                    const isSelected = selectedFiles.some(f => f.path === file.path);
                    
                    return viewMode === 'grid' ? (
                      <Card 
                        key={file.path}
                        className={`cursor-pointer transition-colors hover:bg-muted/50 ${
                          isSelected ? 'ring-2 ring-primary' : ''
                        }`}
                        onClick={() => handleSelectFile(file)}
                      >
                        <CardContent className="p-2">
                          <AspectRatio ratio={1}>
                            {file.type?.startsWith('image/') ? (
                              <img
                                src={file.url}
                                alt={file.name}
                                className="w-full h-full object-cover rounded"
                                loading="lazy"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center bg-muted rounded">
                                {getFileIcon(file.type)}
                              </div>
                            )}
                          </AspectRatio>
                          <div className="mt-2 space-y-1">
                            <p className="text-xs truncate" title={file.name}>{file.name}</p>
                            <p className="text-xs text-muted-foreground">{formatFileSize(file.size)}</p>
                          </div>
                          <div className="flex gap-1 mt-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={(e) => {
                                e.stopPropagation();
                                copyToClipboard(file.url);
                              }}
                              className="h-6 w-6 p-0"
                            >
                              <Copy className="h-3 w-3" />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDeleteFile(file);
                              }}
                              className="h-6 w-6 p-0"
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ) : (
                      <Card 
                        key={file.path}
                        className={`cursor-pointer transition-colors hover:bg-muted/50 ${
                          isSelected ? 'ring-2 ring-primary' : ''
                        }`}
                        onClick={() => handleSelectFile(file)}
                      >
                        <CardContent className="p-3">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 flex items-center justify-center bg-muted rounded">
                              {file.type?.startsWith('image/') ? (
                                <img
                                  src={file.url}
                                  alt={file.name}
                                  className="w-full h-full object-cover rounded"
                                  loading="lazy"
                                />
                              ) : (
                                getFileIcon(file.type)
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="truncate font-medium">{file.name}</p>
                              <p className="text-sm text-muted-foreground">
                                {formatFileSize(file.size)} • {file.uploadedAt.toLocaleDateString()}
                              </p>
                            </div>
                            <div className="flex gap-1">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  copyToClipboard(file.url);
                                }}
                              >
                                <Copy className="h-4 w-4" />
                              </Button>
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={(e) => e.stopPropagation()}
                                  >
                                    <Eye className="h-4 w-4" />
                                  </Button>
                                </DialogTrigger>
                                <DialogContent className="max-w-4xl">
                                  <DialogHeader>
                                    <DialogTitle>{file.name}</DialogTitle>
                                    <DialogDescription>
                                      {formatFileSize(file.size)} • Uploaded {file.uploadedAt.toLocaleDateString()}
                                    </DialogDescription>
                                  </DialogHeader>
                                  <div className="max-h-96 overflow-auto">
                                    {file.type?.startsWith('image/') ? (
                                      <img src={file.url} alt={file.name} className="w-full h-auto" />
                                    ) : file.type?.startsWith('video/') ? (
                                      <video src={file.url} controls className="w-full h-auto" />
                                    ) : (
                                      <div className="text-center p-8">
                                        <FileText className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                                        <p>Document preview not available</p>
                                        <Button
                                          className="mt-4"
                                          onClick={() => window.open(file.url, '_blank')}
                                        >
                                          <Download className="h-4 w-4 mr-2" />
                                          Download
                                        </Button>
                                      </div>
                                    )}
                                  </div>
                                </DialogContent>
                              </Dialog>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleDeleteFile(file);
                                }}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </ScrollArea>
            )}
          </TabsContent>
        </Tabs>

        {selectedFiles.length > 0 && (
          <div className="border-t pt-4">
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                {selectedFiles.length} file{selectedFiles.length > 1 ? 's' : ''} selected
              </p>
              <Button onClick={() => setSelectedFiles([])}>
                Clear Selection
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};