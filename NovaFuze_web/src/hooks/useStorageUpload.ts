import { useState, useCallback } from 'react'
import { StorageService, UploadResult, UploadProgress, STORAGE_PATHS } from '../firebase/storage-service'

export interface UploadState {
  isUploading: boolean
  progress: number
  error: string | null
  success: boolean
}

export const useStorageUpload = () => {
  const [uploadState, setUploadState] = useState<UploadState>({
    isUploading: false,
    progress: 0,
    error: null,
    success: false
  })

  const resetState = useCallback(() => {
    setUploadState({
      isUploading: false,
      progress: 0,
      error: null,
      success: false
    })
  }, [])

  const uploadImage = useCallback(async (
    file: File,
    category: keyof typeof STORAGE_PATHS.IMAGES = 'GENERAL',
    compress: boolean = true
  ): Promise<UploadResult | null> => {
    try {
      resetState()
      setUploadState({
        isUploading: true,
        progress: 0,
        error: null,
        success: false
      })

      // Compress image if requested
      const fileToUpload = compress ? await StorageService.compressImage(file) : file

      const result = await StorageService.uploadImage(
        fileToUpload,
        category,
        (progress: UploadProgress) => {
          setUploadState(prev => ({ 
            ...prev, 
            progress: Math.round(progress.percentage) 
          }))
        }
      )

      setUploadState({
        isUploading: false,
        progress: 100,
        error: null,
        success: true
      })

      return result
    } catch (error: any) {
      console.error('Upload error:', error)
      setUploadState({
        isUploading: false,
        progress: 0,
        error: error.message || 'Upload failed',
        success: false
      })
      return null
    }
  }, [resetState])

  const uploadDocument = useCallback(async (
    file: File,
    category: keyof typeof STORAGE_PATHS.DOCUMENTS = 'RESOURCES'
  ): Promise<UploadResult | null> => {
    try {
      resetState()
      setUploadState({
        isUploading: true,
        progress: 0,
        error: null,
        success: false
      })

      const result = await StorageService.uploadDocument(
        file,
        category,
        (progress: UploadProgress) => {
          setUploadState(prev => ({ 
            ...prev, 
            progress: Math.round(progress.percentage) 
          }))
        }
      )

      setUploadState({
        isUploading: false,
        progress: 100,
        error: null,
        success: true
      })

      return result
    } catch (error: any) {
      console.error('Upload error:', error)
      setUploadState({
        isUploading: false,
        progress: 0,
        error: error.message || 'Upload failed',
        success: false
      })
      return null
    }
  }, [resetState])

  const uploadMultipleImages = useCallback(async (
    files: File[],
    category: keyof typeof STORAGE_PATHS.IMAGES = 'GENERAL',
    compress: boolean = true
  ): Promise<UploadResult[]> => {
    try {
      resetState()
      setUploadState({
        isUploading: true,
        progress: 0,
        error: null,
        success: false
      })

      const results: UploadResult[] = []
      
      for (let i = 0; i < files.length; i++) {
        const file = files[i]
        const fileToUpload = compress ? await StorageService.compressImage(file) : file
        
        const result = await StorageService.uploadImage(
          fileToUpload,
          category,
          (progress: UploadProgress) => {
            const overallProgress = ((i * 100) + progress.percentage) / files.length
            setUploadState(prev => ({ 
              ...prev, 
              progress: Math.round(overallProgress) 
            }))
          }
        )

        results.push(result)
      }

      setUploadState({
        isUploading: false,
        progress: 100,
        error: null,
        success: true
      })

      return results
    } catch (error: any) {
      console.error('Multiple upload error:', error)
      setUploadState({
        isUploading: false,
        progress: 0,
        error: error.message || 'Multiple upload failed',
        success: false
      })
      return []
    }
  }, [resetState])

  const deleteFile = useCallback(async (filePath: string): Promise<boolean> => {
    try {
      await StorageService.deleteFile(filePath)
      return true
    } catch (error: any) {
      console.error('Delete error:', error)
      setUploadState(prev => ({ 
        ...prev, 
        error: error.message || 'Delete failed' 
      }))
      return false
    }
  }, [])

  const getFileURL = useCallback(async (filePath: string): Promise<string | null> => {
    try {
      return await StorageService.getFileURL(filePath)
    } catch (error: any) {
      console.error('Get URL error:', error)
      setUploadState(prev => ({ 
        ...prev, 
        error: error.message || 'Failed to get file URL' 
      }))
      return null
    }
  }, [])

  const listFiles = useCallback(async (pathPrefix: string) => {
    try {
      return await StorageService.listFiles(pathPrefix)
    } catch (error: any) {
      console.error('List files error:', error)
      setUploadState(prev => ({ 
        ...prev, 
        error: error.message || 'Failed to list files' 
      }))
      return []
    }
  }, [])

  const validateFile = useCallback((file: File, allowedTypes: string[]) => {
    return StorageService.validateFile(file, allowedTypes)
  }, [])

  const isStorageAvailable = useCallback(() => {
    return StorageService.isFirebaseEnabled() || StorageService.isDemoMode()
  }, [])

  const isDemoMode = useCallback(() => {
    return StorageService.isDemoMode()
  }, [])

  return {
    // State
    uploadState,
    
    // Actions
    uploadImage,
    uploadDocument,
    uploadMultipleImages,
    deleteFile,
    getFileURL,
    listFiles,
    validateFile,
    resetState,
    
    // Utilities
    isStorageAvailable,
    isDemoMode,
    storagePaths: STORAGE_PATHS
  }
}