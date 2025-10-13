import { useState, useEffect, useCallback, useRef } from 'react';
import { FirestoreService } from '../firebase/firestore';
import { useAuth } from './useAuth';

interface UseAutoSaveOptions {
  delay?: number; // Auto-save delay in milliseconds (default: 2000)
  enabled?: boolean; // Whether auto-save is enabled (default: true)
}

export const useAutoSave = <T extends { id?: string }>(
  service: FirestoreService<any>,
  initialData: T,
  options: UseAutoSaveOptions = {}
) => {
  const { delay = 2000, enabled = true } = options;
  const { user } = useAuth();
  const [data, setData] = useState<T>(initialData);
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const timeoutRef = useRef<NodeJS.Timeout>();
  const isInitialRender = useRef(true);

  // Update data and trigger auto-save
  const updateData = useCallback((newData: Partial<T> | ((prev: T) => T)) => {
    setData(prev => {
      const updated = typeof newData === 'function' ? newData(prev) : { ...prev, ...newData };
      return updated;
    });
    
    if (!isInitialRender.current) {
      setHasUnsavedChanges(true);
    }
  }, []);

  // Manual save function
  const save = useCallback(async (dataToSave?: T) => {
    if (!user || !enabled) return;

    const saveData = dataToSave || data;
    
    try {
      setIsSaving(true);
      setError(null);

      if (saveData.id) {
        // Update existing
        await service.update(saveData.id, saveData, user.email || '');
      } else {
        // Create new
        const newId = await service.create(saveData);
        setData(prev => ({ ...prev, id: newId }));
      }

      setLastSaved(new Date());
      setHasUnsavedChanges(false);
    } catch (error: any) {
      setError(error.message);
      console.error('Auto-save error:', error);
    } finally {
      setIsSaving(false);
    }
  }, [data, service, user, enabled]);

  // Auto-save effect
  useEffect(() => {
    if (!enabled || !hasUnsavedChanges || isInitialRender.current) {
      if (isInitialRender.current) {
        isInitialRender.current = false;
      }
      return;
    }

    // Clear existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Set new timeout for auto-save
    timeoutRef.current = setTimeout(() => {
      save();
    }, delay);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [data, delay, enabled, hasUnsavedChanges, save]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  // Save on page unload if there are unsaved changes
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (hasUnsavedChanges) {
        e.preventDefault();
        e.returnValue = 'You have unsaved changes. Are you sure you want to leave?';
        return 'You have unsaved changes. Are you sure you want to leave?';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [hasUnsavedChanges]);

  return {
    data,
    updateData,
    save,
    isSaving,
    lastSaved,
    hasUnsavedChanges,
    error,
    setData
  };
};