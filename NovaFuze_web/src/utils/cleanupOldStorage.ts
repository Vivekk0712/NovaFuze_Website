/**
 * Cleanup utility for old localStorage keys
 * Removes legacy chat history keys that don't use app-specific prefixes
 */

export const cleanupOldLocalStorage = (): void => {
  try {
    // Find old keys that match the legacy format: chatHistory_userId
    // But NOT the new format: appId_chatHistory_userId
    const oldKeys = Object.keys(localStorage).filter(
      key => key.startsWith('chatHistory_') && !key.includes('_chatHistory_')
    );
    
    if (oldKeys.length > 0) {
      console.log(`🧹 Cleaning up ${oldKeys.length} old localStorage keys...`);
      
      oldKeys.forEach(key => {
        try {
          localStorage.removeItem(key);
          console.log(`✅ Removed old key: ${key}`);
        } catch (error) {
          console.error(`❌ Failed to remove key: ${key}`, error);
        }
      });
      
      console.log('✅ Cleanup complete!');
    } else {
      console.log('✅ No old localStorage keys to clean up');
    }
  } catch (error) {
    console.error('❌ Error during localStorage cleanup:', error);
  }
};

/**
 * List all chat history keys in localStorage (for debugging)
 */
export const listChatHistoryKeys = (): string[] => {
  try {
    const chatKeys = Object.keys(localStorage).filter(
      key => key.includes('chatHistory')
    );
    
    console.log('📋 Current chat history keys:');
    chatKeys.forEach(key => console.log(`  - ${key}`));
    
    return chatKeys;
  } catch (error) {
    console.error('❌ Error listing localStorage keys:', error);
    return [];
  }
};

/**
 * Get storage statistics
 */
export const getStorageStats = (): {
  totalKeys: number;
  chatHistoryKeys: number;
  oldFormatKeys: number;
  newFormatKeys: number;
} => {
  try {
    const allKeys = Object.keys(localStorage);
    const chatKeys = allKeys.filter(key => key.includes('chatHistory'));
    const oldKeys = chatKeys.filter(
      key => key.startsWith('chatHistory_') && !key.includes('_chatHistory_')
    );
    const newKeys = chatKeys.filter(key => key.includes('_chatHistory_'));
    
    const stats = {
      totalKeys: allKeys.length,
      chatHistoryKeys: chatKeys.length,
      oldFormatKeys: oldKeys.length,
      newFormatKeys: newKeys.length
    };
    
    console.log('📊 localStorage Statistics:');
    console.log(`  Total keys: ${stats.totalKeys}`);
    console.log(`  Chat history keys: ${stats.chatHistoryKeys}`);
    console.log(`  Old format (needs cleanup): ${stats.oldFormatKeys}`);
    console.log(`  New format (app-specific): ${stats.newFormatKeys}`);
    
    return stats;
  } catch (error) {
    console.error('❌ Error getting storage stats:', error);
    return {
      totalKeys: 0,
      chatHistoryKeys: 0,
      oldFormatKeys: 0,
      newFormatKeys: 0
    };
  }
};

/**
 * Clear all chat history for current app only
 * @param appId - The app identifier (e.g., 'novafuze-v1')
 */
export const clearAppChatHistory = (appId: string): void => {
  try {
    const appKeys = Object.keys(localStorage).filter(
      key => key.startsWith(`${appId}_chatHistory_`)
    );
    
    if (appKeys.length > 0) {
      console.log(`🧹 Clearing ${appKeys.length} chat history keys for app: ${appId}`);
      
      appKeys.forEach(key => {
        localStorage.removeItem(key);
        console.log(`✅ Removed: ${key}`);
      });
      
      console.log('✅ App chat history cleared!');
    } else {
      console.log(`ℹ️ No chat history found for app: ${appId}`);
    }
  } catch (error) {
    console.error('❌ Error clearing app chat history:', error);
  }
};

// Export for use in browser console
if (typeof window !== 'undefined') {
  (window as any).storageUtils = {
    cleanup: cleanupOldLocalStorage,
    list: listChatHistoryKeys,
    stats: getStorageStats,
    clearApp: clearAppChatHistory
  };
  
  console.log('💡 Storage utilities available in console:');
  console.log('  - storageUtils.cleanup() - Remove old keys');
  console.log('  - storageUtils.list() - List all chat keys');
  console.log('  - storageUtils.stats() - Show statistics');
  console.log('  - storageUtils.clearApp("app-id") - Clear app data');
}
