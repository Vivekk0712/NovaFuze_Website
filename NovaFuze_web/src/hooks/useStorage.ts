import { useState, useCallback } from 'react'
import { StorageService, STORAGE_PATHS } from '../firebase/storage'

export interface UploadState {
  isUploading: boolean
  progress: number
  error: string | null
  success: boolean
}

export interface UploadResult {
  downloadURL: string
  filePath: string
  fileName?: string
}

export const useStorage = () => {
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
        (progress) => {
          setUploadState(prev => ({ ...prev, progress }))
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
      setUploadState({
        isUploading: false,
        progress: 0,
        error: error.message || 'Upload failed',
        success: false
      })
      return null
    }
  }, [])

  const uploadDocument = useCallback(async (
    file: File,
    category: keyof typeof STORAGE_PATHS.DOCUMENTS = 'RESOURCES'
  ): Promise<UploadResult | null> => {
    try {
      setUploadState({
        isUploading: true,
        progress: 0,
        error: null,
        success: false
      })

      const result = await StorageService.uploadDocument(
        file,
        category,
        (progress) => {
          setUploadState(prev => ({ ...prev, progress }))
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
      setUploadState({
        isUploading: false,
        progress: 0,
        error: error.message || 'Upload failed',
        success: false
      })
      return null
    }
  }, [])

  const uploadMultipleFiles = useCallback(async (
    files: File[],
    path: string
  ): Promise<UploadResult[]> => {
    try {
      setUploadState({
        isUploading: true,
        progress: 0,
        error: null,
        success: false
      })

      const results = await StorageService.uploadMultipleFiles(
        files,
        path,
        (fileIndex, progress) => {
          const totalProgress = ((fileIndex * 100) + progress) / files.length
          setUploadState(prev => ({ ...prev, progress: totalProgress }))
        }
      )

      setUploadState({
        isUploading: false,
        progress: 100,
        error: null,
        success: true
      })

      return results
    } catch (error: any) {
      setUploadState({
        isUploading: false,
        progress: 0,
        error: error.message || 'Upload failed',
        success: false
      })
      return []
    }
  }, [])

  const deleteFile = useCallback(async (filePath: string): Promise<boolean> => {
    try {
      await StorageService.deleteFile(filePath)
      return true
    } catch (error: any) {
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
      setUploadState(prev => ({ 
        ...prev, 
        error: error.message || 'Failed to get file URL' 
      }))
      return null
    }
  }, [])

  const listFiles = useCallback(async (path: string) => {
    try {
      return await StorageService.listFiles(path)
    } catch (error: any) {
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
    return StorageService.isAvailable() || StorageService.isDemoMode()
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
    uploadMultipleFiles,
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

// Hook for managing file lists (useful for admin galleries)
export const useFileManager = (initialPath?: string) => {
  const [files, setFiles] = useState<Array<{ name: string; fullPath: string; downloadURL: string }>>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { listFiles, deleteFile } = useStorage()

  const loadFiles = useCallback(async (path: string) => {
    if (!path) return
    
    setLoading(true)
    setError(null)
    
    try {
      const fileList = await listFiles(path)
      setFiles(fileList)
    } catch (err: any) {
      setError(err.message || 'Failed to load files')
    } finally {
      setLoading(false)
    }
  }, [listFiles])

  const removeFile = useCallback(async (filePath: string) => {
    const success = await deleteFile(filePath)
    if (success) {
      setFiles(prev => prev.filter(file => file.fullPath !== filePath))
    }
    return success
  }, [deleteFile])

  const refreshFiles = useCallback(() => {
    if (initialPath) {
      loadFiles(initialPath)
    }
  }, [loadFiles, initialPath])

  // Load initial files
  useState(() => {
    if (initialPath) {
      loadFiles(initialPath)
    }
  })

  return {
    files,
    loading,
    error,
    loadFiles,
    removeFile,
    refreshFiles
  }
}