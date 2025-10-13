import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Upload, Image, Video, File, Trash2, Download, Copy } from 'lucide-react'
import { useCMS } from '../../hooks/useCMS'
import { toast } from 'sonner@2.0.3'

export function MediaManager() {
  const [uploading, setUploading] = useState(false)
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null)
  const cms = useCMS()

  const handleFileUpload = async (files: FileList) => {
    if (!files.length) return

    setUploading(true)
    try {
      const uploadPromises = Array.from(files).map(file => 
        cms.uploadImage(file, 'media')
      )
      
      const urls = await Promise.all(uploadPromises)
      toast.success(`${files.length} file(s) uploaded successfully`)
      
      // Reset selection
      setSelectedFiles(null)
      const fileInput = document.getElementById('media-upload') as HTMLInputElement
      if (fileInput) fileInput.value = ''
      
    } catch (error) {
      console.error('Error uploading files:', error)
      toast.error('Failed to upload files')
    } finally {
      setUploading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Media Manager</CardTitle>
        <CardDescription>
          Upload and manage images and files
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
          <Upload className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <div className="space-y-2">
            <p className="text-lg font-medium">Upload Files</p>
            <p className="text-sm text-muted-foreground">
              Select images, videos, or documents to upload
            </p>
          </div>
          <Input
            id="media-upload"
            type="file"
            multiple
            accept="image/*,video/*,.pdf,.doc,.docx"
            onChange={(e) => {
              if (e.target.files) {
                setSelectedFiles(e.target.files)
              }
            }}
            className="mt-4"
          />
          {selectedFiles && (
            <Button 
              onClick={() => handleFileUpload(selectedFiles)}
              disabled={uploading}
              className="mt-4"
            >
              {uploading ? 'Uploading...' : `Upload ${selectedFiles.length} file(s)`}
            </Button>
          )}
        </div>

        <div className="text-center py-8 text-muted-foreground">
          <Image className="h-8 w-8 mx-auto mb-2" />
          <p>Media library will appear here</p>
          <p className="text-sm">Upload files to start building your media library</p>
        </div>
      </CardContent>
    </Card>
  )
}