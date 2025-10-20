import { useEffect } from 'react';
import { cleanupOldLocalStorage } from '../utils/cleanupOldStorage';

/**
 * One-time migration component to clean up old localStorage keys
 * Add this to your App.tsx and it will run once on mount
 */
const StorageMigration = () => {
  useEffect(() => {
    // Check if migration has already been done
    const migrationKey = 'storage_migration_v1_complete';
    const migrationDone = localStorage.getItem(migrationKey);
    
    if (!migrationDone) {
      console.log('🔄 Running one-time storage migration...');
      
      // Clean up old keys
      cleanupOldLocalStorage();
      
      // Mark migration as complete
      localStorage.setItem(migrationKey, 'true');
      console.log('✅ Storage migration complete!');
    }
  }, []);
  
  // This component doesn't render anything
  return null;
};

export default StorageMigration;
