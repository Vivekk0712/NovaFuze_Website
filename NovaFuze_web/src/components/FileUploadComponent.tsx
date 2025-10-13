import { useState, useRef, useCallback } from 'react'
import { Upload, X, Image, FileText, CheckCircle, AlertCircle, Loader2 } from 'lucide-react'
import { Button } from './ui/button'
import { Progress } from './ui/progress'
import { Card, CardContent } from './ui/card'
import { Badge } from './ui/badge'
import { useStorageUpload, UploadState } from '../hooks/useStorageUpload'
import { StorageService, UploadResult, STORAGE_PATHS, ALLOWED_IMAGE_TYPES, ALLOWED_DOCUMENT_TYPES } from '../firebase/storage-service'

interface FileUploadComponentProps {
  onUploadComplete?: (results: UploadResult[]) => void
  onUploadError?: (error: string) => void
  allowMultiple?: boolean
  acceptedTypes?: 'images' | 'documents' | 'all'
  storageCategory?: keyof typeof STORAGE_PATHS.IMAGES | keyof typeof STORAGE_PATHS.DOCUMENTS
  maxFiles?: number
  compressImages?: boolean
  showPreview?: boolean
  className?: string
}

interface FilePreview {
  file: File
  id: string
  preview?: string
  status: 'pending' | 'uploading' | 'complete' | 'error'
  result?: UploadResult
  error?: string
}

export function FileUploadComponent({
  onUploadComplete,
  onUploadError,
  allowMultiple = false,
  acceptedTypes = 'images',
  storageCategory,
  maxFiles = 5,
  compressImages = true,
  showPreview = true,
  className = ''
}: FileUploadComponentProps) {
  const [files, setFiles] = useState<FilePreview[]>([])
  const [isDragOver, setIsDragOver] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const fileInputRef = useRef<HTMLInputElement>(null)
  
  const { uploadImage, uploadDocument, uploadMultipleImages, validateFile, isDemoMode } = useStorageUpload()

  // Get accepted file types
  const getAcceptedTypes = () => {
    switch (acceptedTypes) {
      case 'images':
        return ALLOWED_IMAGE_TYPES
      case 'documents':
        return ALLOWED_DOCUMENT_TYPES
      case 'all':
        return [...ALLOWED_IMAGE_TYPES, ...ALLOWED_DOCUMENT_TYPES]
      default:
        return ALLOWED_IMAGE_TYPES
    }
  }

  const getAcceptString = () => {
    const types = getAcceptedTypes()
    return types.join(',')
  }

  // Generate preview for images
  const generatePreview = (file: File): Promise<string> => {
    return new Promise((resolve) => {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader()
        reader.onload = (e) => resolve(e.target?.result as string)
        reader.onerror = () => resolve('')
        reader.readAsDataURL(file)
      } else {
        resolve('')
      }
    })
  }

  // Validate and add files
  const addFiles = useCallback(async (newFiles: File[]) => {
    const acceptedTypes = getAcceptedTypes()
    const validFiles: File[] = []
    const errors: string[] = []

    // Validate each file
    for (const file of newFiles) {
      const validation = validateFile(file, acceptedTypes)
      if (validation.isValid) {
        validFiles.push(file)
      } else {
        errors.push(`${file.name}: ${validation.error}`)
      }
    }

    if (errors.length > 0) {
      onUploadError?.(errors.join('\n'))
    }

    if (validFiles.length === 0) return

    // Limit number of files
    const filesToAdd = allowMultiple 
      ? validFiles.slice(0, Math.max(0, maxFiles - files.length))
      : validFiles.slice(0, 1)

    // Create file previews
    const filePreviewsPromises = filesToAdd.map(async (file) => {
      const id = `${Date.now()}_${Math.random().toString(36).substring(2, 9)}`
      const preview = showPreview ? await generatePreview(file) : undefined
      
      return {
        file,
        id,
        preview,
        status: 'pending' as const
      }
    })

    const filePreviews = await Promise.all(filePreviewsPromises)
    
    if (allowMultiple) {
      setFiles(prev => [...prev, ...filePreviews])
    } else {
      setFiles(filePreviews)
    }
  }, [files.length, maxFiles, allowMultiple, showPreview, validateFile, onUploadError])

  // Handle file input change
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(event.target.files || [])
    if (selectedFiles.length > 0) {
      addFiles(selectedFiles)
    }
    event.target.value = '' // Reset input
  }

  // Handle drag and drop
  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault()
    setIsDragOver(true)
  }

  const handleDragLeave = (event: React.DragEvent) => {
    event.preventDefault()
    setIsDragOver(false)
  }

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault()
    setIsDragOver(false)
    
    const droppedFiles = Array.from(event.dataTransfer.files)
    if (droppedFiles.length > 0) {
      addFiles(droppedFiles)
    }
  }

  // Remove file from list
  const removeFile = (id: string) => {
    setFiles(prev => prev.filter(file => file.id !== id))
  }

  // Upload all pending files
  const handleUpload = async () => {
    const pendingFiles = files.filter(f => f.status === 'pending')
    if (pendingFiles.length === 0) return

    setIsUploading(true)
    setUploadProgress(0)

    // Update all pending files to uploading status
    setFiles(prev => prev.map(file => 
      file.status === 'pending' 
        ? { ...file, status: 'uploading' as const }
        : file
    ))

    const results: UploadResult[] = []
    const errors: string[] = []

    try {
      if (acceptedTypes === 'images' && pendingFiles.length > 1) {
        // Use batch upload for multiple images
        const fileList = pendingFiles.map(fp => fp.file)
        const category = storageCategory as keyof typeof STORAGE_PATHS.IMAGES || 'GENERAL'
        
        // Simulate progress for individual files
        for (let i = 0; i < pendingFiles.length; i++) {
          const filePreview = pendingFiles[i]
          try {
            const result = await uploadImage(filePreview.file, category, compressImages)
            if (result) {
              results.push(result)
              setFiles(prev => prev.map(file => 
                file.id === filePreview.id 
                  ? { ...file, status: 'complete' as const, result }
                  : file
              ))
            }
            setUploadProgress(((i + 1) / pendingFiles.length) * 100)
          } catch (error: any) {
            errors.push(`${filePreview.file.name}: ${error.message}`)
            setFiles(prev => prev.map(file => 
              file.id === filePreview.id 
                ? { ...file, status: 'error' as const, error: error.message }
                : file
            ))
          }
        }
      } else {
        // Upload files individually
        for (let i = 0; i < pendingFiles.length; i++) {
          const filePreview = pendingFiles[i]
          try {
            let result: UploadResult | null = null

            if (filePreview.file.type.startsWith('image/')) {
              const category = storageCategory as keyof typeof STORAGE_PATHS.IMAGES || 'GENERAL'
              result = await uploadImage(filePreview.file, category, compressImages)
            } else {
              const category = storageCategory as keyof typeof STORAGE_PATHS.DOCUMENTS || 'RESOURCES'
              result = await uploadDocument(filePreview.file, category)
            }

            if (result) {
              results.push(result)
              setFiles(prev => prev.map(file => 
                file.id === filePreview.id 
                  ? { ...file, status: 'complete' as const, result }
                  : file
              ))
            }

            setUploadProgress(((i + 1) / pendingFiles.length) * 100)
          } catch (error: any) {
            const errorMessage = error.message || 'Upload failed'
            errors.push(`${filePreview.file.name}: ${errorMessage}`)
            setFiles(prev => prev.map(file => 
              file.id === filePreview.id 
                ? { ...file, status: 'error' as const, error: errorMessage }
                : file
            ))
          }
        }
      }

      if (results.length > 0) {
        onUploadComplete?.(results)
      }

      if (errors.length > 0) {
        onUploadError?.(errors.join('\n'))
      }

    } catch (error: any) {
      console.error('Upload process error:', error)
      onUploadError?.(error.message || 'Upload process failed')
    } finally {
      setIsUploading(false)
      setUploadProgress(0)
    }
  }

  // Clear all files
  const clearFiles = () => {
    setFiles([])
    setUploadProgress(0)
  }

  const pendingFiles = files.filter(f => f.status === 'pending')
  const hasCompletedFiles = files.some(f => f.status === 'complete')
  const hasErrors = files.some(f => f.status === 'error')

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Demo Mode Warning */}
      {isDemoMode() && (
        <div className="p-3 bg-orange-50 dark:bg-orange-950/20 border border-orange-200 dark:border-orange-800 rounded-lg">
          <p className="text-sm text-orange-800 dark:text-orange-200">
            <strong>Demo Mode:</strong> Files are stored temporarily in memory. They will be lost when you refresh the page.
          </p>
        </div>
      )}

      {/* Upload Area */}
      <div
        className={`
          border-2 border-dashed rounded-lg p-8 text-center transition-colors cursor-pointer
          ${isDragOver ? 'border-primary bg-primary/5' : 'border-border'}
          ${files.length > 0 ? 'bg-muted/30' : 'hover:bg-muted/50'}
          ${isUploading ? 'pointer-events-none opacity-50' : ''}
        `}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => !isUploading && fileInputRef.current?.click()}
      >
        <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
        <div className="space-y-2">
          <p className="text-sm font-medium">
            {isDragOver ? 'Drop files here' : 'Click to upload or drag and drop'}
          </p>
          <p className="text-xs text-muted-foreground">
            {acceptedTypes === 'images' && 'PNG, JPG, GIF up to 10MB'}
            {acceptedTypes === 'documents' && 'PDF, DOC, DOCX up to 10MB'}
            {acceptedTypes === 'all' && 'Images and documents up to 10MB'}
          </p>
          {allowMultiple && (
            <p className="text-xs text-muted-foreground">
              Maximum {maxFiles} files
            </p>
          )}
        </div>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        multiple={allowMultiple}
        accept={getAcceptString()}
        onChange={handleFileChange}
        className="hidden"
        disabled={isUploading}
      />

      {/* File List */}
      {files.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-medium">
              Files ({files.length})
            </h4>
            <Button
              variant="outline"
              size="sm"
              onClick={clearFiles}
              disabled={isUploading}
            >
              Clear All
            </Button>
          </div>

          <div className="space-y-2">
            {files.map((filePreview) => (
              <Card key={filePreview.id} className="p-3">
                <CardContent className="p-0">
                  <div className="flex items-center gap-3">
                    {/* Preview */}
                    <div className="flex-shrink-0">
                      {filePreview.preview ? (
                        <img 
                          src={filePreview.preview} 
                          alt="Preview" 
                          className="w-12 h-12 rounded object-cover"
                        />
                      ) : filePreview.file.type.startsWith('image/') ? (
                        <div className="w-12 h-12 rounded bg-muted flex items-center justify-center">
                          <Image className="w-6 h-6 text-muted-foreground" />
                        </div>
                      ) : (
                        <div className="w-12 h-12 rounded bg-muted flex items-center justify-center">
                          <FileText className="w-6 h-6 text-muted-foreground" />
                        </div>
                      )}
                    </div>

                    {/* File Info */}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">
                        {filePreview.file.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {(filePreview.file.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>

                    {/* Status */}
                    <div className="flex items-center gap-2">
                      <Badge
                        variant={
                          filePreview.status === 'complete' ? 'default' :
                          filePreview.status === 'error' ? 'destructive' :
                          filePreview.status === 'uploading' ? 'secondary' : 'outline'
                        }
                      >
                        {filePreview.status === 'complete' && <CheckCircle className="w-3 h-3 mr-1" />}
                        {filePreview.status === 'error' && <AlertCircle className="w-3 h-3 mr-1" />}
                        {filePreview.status === 'uploading' && <Loader2 className="w-3 h-3 mr-1 animate-spin" />}
                        {filePreview.status}
                      </Badge>

                      {filePreview.status === 'pending' && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeFile(filePreview.id)}
                          disabled={isUploading}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  </div>

                  {filePreview.error && (
                    <div className="mt-2 text-xs text-destructive">
                      {filePreview.error}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Upload Progress */}
      {isUploading && (
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Uploading...</span>
            <span>{Math.round(uploadProgress)}%</span>
          </div>
          <Progress value={uploadProgress} />
        </div>
      )}

      {/* Actions */}
      {pendingFiles.length > 0 && (
        <div className="flex gap-2">
          <Button
            onClick={handleUpload}
            disabled={isUploading || pendingFiles.length === 0}
            className="flex-1"
          >
            {isUploading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Uploading...
              </>
            ) : (
              `Upload ${pendingFiles.length} file${pendingFiles.length > 1 ? 's' : ''}`
            )}
          </Button>
        </div>
      )}

      {/* Success/Error Messages */}
      {hasCompletedFiles && !isUploading && (
        <div className="text-sm text-green-600 dark:text-green-400 flex items-center gap-2">
          <CheckCircle className="w-4 h-4" />
          Files uploaded successfully!
        </div>
      )}
    </div>
  )
}