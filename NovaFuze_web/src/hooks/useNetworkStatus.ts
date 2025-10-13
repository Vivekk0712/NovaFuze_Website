import { useState, useEffect } from 'react';

export const useNetworkStatus = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [isSlowConnection, setIsSlowConnection] = useState(false);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      setIsSlowConnection(false);
    };

    const handleOffline = () => {
      setIsOnline(false);
    };

    // Simplified connection detection - only check on network change events
    const checkConnectionSpeed = () => {
      // Use navigator connection API if available (more reliable than fetch)
      if ('connection' in navigator) {
        const connection = (navigator as any).connection;
        if (connection) {
          // Set slow connection based on actual connection type
          const slowConnectionTypes = ['slow-2g', '2g', '3g'];
          setIsSlowConnection(slowConnectionTypes.includes(connection.effectiveType));
          return;
        }
      }
      
      // Fallback: assume fast connection if no API available
      setIsSlowConnection(false);
    };

    // Only check speed on initial load and network changes (not periodically)
    let speedCheckTimeout: NodeJS.Timeout;

    const handleOnlineWithSpeedCheck = () => {
      handleOnline();
      // Check speed when coming back online
      speedCheckTimeout = setTimeout(checkConnectionSpeed, 1000);
    };

    window.addEventListener('online', handleOnlineWithSpeedCheck);
    window.addEventListener('offline', handleOffline);

    // Defer initial speed check to avoid blocking render
    if (isOnline) {
      speedCheckTimeout = setTimeout(checkConnectionSpeed, 2000);
    }

    return () => {
      clearTimeout(speedCheckTimeout);
      window.removeEventListener('online', handleOnlineWithSpeedCheck);
      window.removeEventListener('offline', handleOffline);
    };
  }, []); // Remove isOnline dependency to prevent excessive re-runs

  return {
    isOnline,
    isSlowConnection,
    connectionType: !isOnline ? 'offline' : isSlowConnection ? 'slow' : 'fast'
  };
};