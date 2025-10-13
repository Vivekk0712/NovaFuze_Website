import { useState, useCallback, useEffect } from 'react'
import { StorageService } from '../firebase/storage-service'

export interface FileItem {
  name: string
  fullPath: string
  downloadURL: string
  uploadedAt?: Date
}

export const useFileManager = (initialPath?: string) => {
  const [files, setFiles] = useState<FileItem[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const loadFiles = useCallback(async (path: string) => {
    if (!path) return
    
    setLoading(true)
    setError(null)
    
    try {
      const fileList = await StorageService.listFiles(path)
      setFiles(fileList)
    } catch (err: any) {
      console.error('Error loading files:', err)
      setError(err.message || 'Failed to load files')
      setFiles([])
    } finally {
      setLoading(false)
    }
  }, [])

  const removeFile = useCallback(async (filePath: string): Promise<boolean> => {
    try {
      await StorageService.deleteFile(filePath)
      setFiles(prev => prev.filter(file => file.fullPath !== filePath))
      return true
    } catch (error: any) {
      console.error('Error removing file:', error)
      setError(error.message || 'Failed to remove file')
      return false
    }
  }, [])

  const refreshFiles = useCallback(() => {
    if (initialPath) {
      loadFiles(initialPath)
    }
  }, [loadFiles, initialPath])

  const clearError = useCallback(() => {
    setError(null)
  }, [])

  // Load initial files
  useEffect(() => {
    if (initialPath) {
      loadFiles(initialPath)
    }
  }, [initialPath, loadFiles])

  return {
    files,
    loading,
    error,
    loadFiles,
    removeFile,
    refreshFiles,
    clearError
  }
}