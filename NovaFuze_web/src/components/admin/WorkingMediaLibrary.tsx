import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog'
import { FileUploadComponent } from '../FileUploadComponent'
import { useFileManager } from '../../hooks/useFileManager'
import { useStorageUpload, UploadState } from '../../hooks/useStorageUpload'
import { StorageService, UploadResult, STORAGE_PATHS } from '../../firebase/storage-service'
import { Copy, Download, Trash2, Eye, Search, Grid, List, RefreshCw } from 'lucide-react'
import { toast } from 'sonner'

export function WorkingMediaLibrary() {
  const [selectedCategory, setSelectedCategory] = useState<string>('GENERAL')
  const [searchTerm, setSearchTerm] = useState('')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const { deleteFile, isDemoMode } = useStorageUpload()

  // File manager for current category
  const currentPath = STORAGE_PATHS.IMAGES[selectedCategory as keyof typeof STORAGE_PATHS.IMAGES]
  const { files, loading, error, refreshFiles } = useFileManager(currentPath)

  const handleUploadComplete = (results: UploadResult[]) => {
    toast.success(`${results.length} file(s) uploaded successfully!`)
    refreshFiles()
  }

  const handleUploadError = (error: string) => {
    toast.error(`Upload failed: ${error}`)
  }

  const handleDeleteFile = async (filePath: string, fileName: string) => {
    if (confirm(`Are you sure you want to delete "${fileName}"?`)) {
      const success = await deleteFile(filePath)
      if (success) {
        toast.success('File deleted successfully!')
        refreshFiles()
      } else {
        toast.error('Failed to delete file')
      }
    }
  }

  const copyToClipboard = (url: string) => {
    navigator.clipboard.writeText(url).then(() => {
      toast.success('URL copied to clipboard!')
    }).catch(() => {
      toast.error('Failed to copy URL')
    })
  }

  const filteredFiles = files.filter(file =>
    file.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Media Library</h2>
          <p className="text-muted-foreground">
            Manage your uploaded files and media
            {isDemoMode() && ' (Demo Mode - Files stored temporarily)'}
          </p>
        </div>
        <div className="flex items-center gap-2">
          {isDemoMode() && (
            <div className="flex items-center gap-1 text-orange-600 dark:text-orange-400 text-sm">
              <div className="w-2 h-2 rounded-full bg-orange-600 dark:bg-orange-400" />
              Demo Mode
            </div>
          )}
          <Button variant="outline" size="sm" onClick={refreshFiles} disabled={loading}>
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </Button>
        </div>
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

            <FileUploadComponent
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

            {/* Error Display */}
            {error && (
              <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-lg text-destructive text-sm">
                Error: {error}
              </div>
            )}

            {/* File Grid/List */}
            {loading ? (
              <div className="text-center py-8">
                <div className="inline-flex items-center gap-2 text-muted-foreground">
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  Loading files...
                </div>
              </div>
            ) : filteredFiles.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground">
                  {searchTerm ? `No files found matching "${searchTerm}"` : 'No files found in this category'}
                </p>
                {!searchTerm && (
                  <p className="text-xs text-muted-foreground mt-2">
                    Upload some files to get started!
                  </p>
                )}
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
                        onError={(e) => {
                          // Handle broken images in demo mode
                          const img = e.target as HTMLImageElement
                          img.style.display = 'none'
                          const parent = img.parentElement
                          if (parent) {
                            parent.innerHTML = `
                              <div class="w-full h-full bg-muted flex items-center justify-center">
                                <svg class="w-8 h-8 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                                </svg>
                              </div>
                            `
                          }
                        }}
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
                            onError={(e) => {
                              const img = e.target as HTMLImageElement
                              img.style.display = 'none'
                              const parent = img.parentElement
                              if (parent) {
                                parent.innerHTML = `
                                  <div class="w-12 h-12 bg-muted rounded flex items-center justify-center">
                                    <svg class="w-6 h-6 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                                    </svg>
                                  </div>
                                `
                              }
                            }}
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