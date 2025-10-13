import { useState, useEffect } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Badge } from '../ui/badge'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog'
import { FileUploader } from '../FileUploader'
import { useStorage, useFileManager, UploadResult } from '../../hooks/useStorage'
import { useFirebase } from '../FirebaseProvider'
import { FirebaseConnectionStatus } from '../FirebaseProvider'
import { STORAGE_PATHS } from '../../firebase/storage'
import { shouldEnableFirebase } from '../../firebase/config'
import { Copy, Download, Trash2, Eye, Search, Grid, List, Image, FileText } from 'lucide-react'
import { toast } from 'sonner'

export function MediaLibrary() {
  const [selectedCategory, setSelectedCategory] = useState<string>('GENERAL')
  const [searchTerm, setSearchTerm] = useState('')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [selectedFile, setSelectedFile] = useState<any>(null)
  const { hasStorage } = useFirebase()
  const { deleteFile } = useStorage()

  // File managers for different categories
  const imageManager = useFileManager(STORAGE_PATHS.IMAGES[selectedCategory as keyof typeof STORAGE_PATHS.IMAGES])

  const handleUploadComplete = (results: UploadResult[]) => {
    toast.success(`${results.length} file(s) uploaded successfully!`)
    imageManager.refreshFiles()
  }

  const handleUploadError = (error: string) => {
    toast.error(`Upload failed: ${error}`)
  }

  const handleDeleteFile = async (filePath: string, fileName: string) => {
    if (confirm(`Are you sure you want to delete "${fileName}"?`)) {
      const success = await deleteFile(filePath)
      if (success) {
        toast.success('File deleted successfully!')
        imageManager.refreshFiles()
      } else {
        toast.error('Failed to delete file')
      }
    }
  }

  const copyToClipboard = (url: string) => {
    navigator.clipboard.writeText(url)
    toast.success('URL copied to clipboard!')
  }

  const filteredFiles = imageManager.files.filter(file =>
    file.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const isDemoMode = !shouldEnableFirebase()

  if (!hasStorage && !isDemoMode) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Media Library</CardTitle>
          <FirebaseConnectionStatus />
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <p className="text-muted-foreground mb-4">
              Firebase Storage is not available. Please configure Firebase to use the media library.
            </p>
            <Button variant="outline" disabled>
              Configure Firebase
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Media Library</h2>
          <p className="text-muted-foreground">
            Manage your uploaded files and media
            {isDemoMode && ' (Demo Mode - Files stored temporarily)'}
          </p>
        </div>
        <FirebaseConnectionStatus />
      </div>

      {/* Upload Section */}
      <Card>
        <CardHeader>
          <CardTitle>Upload New Files</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex gap-4 items-end">
              <div className="flex-1">
                <label className="text-sm font-medium">Category</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full mt-1 px-3 py-2 border rounded-md bg-background"
                >
                  {Object.keys(STORAGE_PATHS.IMAGES).map(category => (
                    <option key={category} value={category}>
                      {category.toLowerCase().replace('_', ' ')}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <FileUploader
              allowMultiple={true}
              acceptedTypes="images"
              storageCategory={selectedCategory as keyof typeof STORAGE_PATHS.IMAGES}
              maxFiles={10}
              onUploadComplete={handleUploadComplete}
              onUploadError={handleUploadError}
              compressImages={true}
              showPreview={true}
            />
          </div>
        </CardContent>
      </Card>

      {/* File Browser */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Browse Files</CardTitle>
            <div className="flex items-center gap-2">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('grid')}
              >
                <Grid className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('list')}
              >
                <List className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Filters and Search */}
            <div className="flex gap-4 items-center">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    placeholder="Search files..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-3 py-2 border rounded-md bg-background"
                >
                  {Object.keys(STORAGE_PATHS.IMAGES).map(category => (
                    <option key={category} value={category}>
                      {category.toLowerCase().replace('_', ' ')}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* File Grid/List */}
            {imageManager.loading ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground">Loading files...</p>
              </div>
            ) : filteredFiles.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground">No files found in this category</p>
              </div>
            ) : viewMode === 'grid' ? (
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {filteredFiles.map((file) => (
                  <Card key={file.fullPath} className="overflow-hidden hover:shadow-md transition-shadow">
                    <div className="aspect-square relative group">
                      <img
                        src={file.downloadURL}
                        alt={file.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button size="sm" variant="secondary">
                              <Eye className="w-4 h-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-4xl">
                            <DialogHeader>
                              <DialogTitle>{file.name}</DialogTitle>
                            </DialogHeader>
                            <div className="flex items-center justify-center">
                              <img
                                src={file.downloadURL}
                                alt={file.name}
                                className="max-w-full max-h-[70vh] object-contain"
                              />
                            </div>
                            <div className="flex gap-2 justify-center">
                              <Button
                                variant="outline"
                                onClick={() => copyToClipboard(file.downloadURL)}
                              >
                                <Copy className="w-4 h-4 mr-2" />
                                Copy URL
                              </Button>
                              <Button
                                variant="outline"
                                asChild
                              >
                                <a href={file.downloadURL} download={file.name}>
                                  <Download className="w-4 h-4 mr-2" />
                                  Download
                                </a>
                              </Button>
                              <Button
                                variant="destructive"
                                onClick={() => handleDeleteFile(file.fullPath, file.name)}
                              >
                                <Trash2 className="w-4 h-4 mr-2" />
                                Delete
                              </Button>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </div>
                    <CardContent className="p-2">
                      <p className="text-xs truncate" title={file.name}>
                        {file.name}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="space-y-2">
                {filteredFiles.map((file) => (
                  <Card key={file.fullPath}>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-4">
                        <div className="flex-shrink-0">
                          <img
                            src={file.downloadURL}
                            alt={file.name}
                            className="w-12 h-12 object-cover rounded"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium truncate">{file.name}</p>
                          <p className="text-xs text-muted-foreground truncate">
                            {file.fullPath}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => copyToClipboard(file.downloadURL)}
                          >
                            <Copy className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            asChild
                          >
                            <a href={file.downloadURL} download={file.name}>
                              <Download className="w-4 h-4" />
                            </a>
                          </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => handleDeleteFile(file.fullPath, file.name)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}