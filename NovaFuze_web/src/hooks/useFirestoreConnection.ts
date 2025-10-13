import { useState, useEffect, useRef } from 'react';
import { isFirestoreConnected, reconnectFirestore, disconnectFirestore, shouldEnableFirebase } from '../firebase/config';
import { cleanupAllListeners } from '../firebase/firestore';
import { useNetworkStatus } from './useNetworkStatus';

export const useFirestoreConnection = () => {
  const [connectionStatus, setConnectionStatus] = useState<'connected' | 'disconnected' | 'reconnecting'>('connected');
  const [retryCount, setRetryCount] = useState(0);
  const { isOnline, connectionType } = useNetworkStatus();
  const reconnectingRef = useRef(false);

  useEffect(() => {
    // If Firebase is disabled, always show as connected (no need to monitor)
    if (!shouldEnableFirebase()) {
      setConnectionStatus('connected');
      return;
    }

    // If offline, immediately set status to disconnected
    if (!isOnline) {
      setConnectionStatus('disconnected');
      return;
    }

    let retryTimeout: NodeJS.Timeout;
    let connectionCheckInterval: NodeJS.Timeout;
    let startMonitoring: NodeJS.Timeout;
    
    // Declare event handlers outside the setTimeout to ensure proper cleanup
    let handleVisibilityChange: () => void;
    let handleOnline: () => void;
    let handleOffline: () => void;

    // Defer connection monitoring to avoid blocking render
    startMonitoring = setTimeout(() => {
      const checkConnection = () => {
        if (!isOnline) {
          setConnectionStatus('disconnected');
          return;
        }
        
        // Only check Firestore if we have network
        setConnectionStatus(isFirestoreConnected ? 'connected' : 'disconnected');
      };

      const handleConnectionLoss = async () => {
        if (!isOnline || reconnectingRef.current) {
          setConnectionStatus('disconnected');
          return;
        }

        if (connectionStatus === 'connected' && !isFirestoreConnected) {
          setConnectionStatus('disconnected');
          reconnectingRef.current = true;
          
          // Start retry mechanism with adjusted delays for slow connections
          let attempts = 0;
          const maxRetries = connectionType === 'slow' ? 2 : 3; // Reduced retry attempts
          
          const attemptReconnection = async () => {
            if (attempts >= maxRetries || !isOnline) {
              console.warn('Stopped reconnection attempts:', attempts >= maxRetries ? 'max retries' : 'offline');
              setConnectionStatus('disconnected');
              reconnectingRef.current = false;
              return;
            }

            attempts++;
            setRetryCount(attempts);
            setConnectionStatus('reconnecting');

            try {
              // Much shorter timeout to prevent page blocking
              await Promise.race([
                reconnectFirestore(),
                new Promise((_, reject) => 
                  setTimeout(() => reject(new Error('Reconnection timeout')), 5000) // Reduced to 5 seconds
                )
              ]);
              
              if (isFirestoreConnected) {
                setConnectionStatus('connected');
                setRetryCount(0);
                reconnectingRef.current = false;
                return; // Success, stop retrying
              }
            } catch (error) {
              console.warn(`Reconnection attempt ${attempts} failed:`, error);
            }

            // Faster, shorter delays to avoid blocking
            const baseDelay = 2000; // Much shorter base delay
            const delay = Math.min(baseDelay * Math.pow(1.5, attempts - 1), 10000); // Max 10 seconds
            retryTimeout = setTimeout(attemptReconnection, delay);
          };

          attemptReconnection();
        }
      };

      // Check connection status periodically (less frequently to reduce load)
      const checkInterval = connectionType === 'slow' ? 30000 : 15000; // Much less frequent checks
      connectionCheckInterval = setInterval(checkConnection, checkInterval);

      // Initial check
      checkConnection();

      // Define event handlers
      handleVisibilityChange = () => {
        if (document.visibilityState === 'visible') {
          checkConnection();
          if (!isFirestoreConnected) {
            handleConnectionLoss();
          }
        }
      };

      handleOnline = () => {
        if (!isFirestoreConnected) {
          handleConnectionLoss();
        }
      };

      handleOffline = () => {
        setConnectionStatus('disconnected');
      };

      // Add event listeners
      document.addEventListener('visibilitychange', handleVisibilityChange);
      window.addEventListener('online', handleOnline);
      window.addEventListener('offline', handleOffline);
    }, 1000); // 1 second delay to avoid blocking render

    return () => {
      clearTimeout(startMonitoring);
      clearTimeout(retryTimeout);
      clearInterval(connectionCheckInterval);
      
      // Only remove listeners if they were added
      if (handleVisibilityChange) {
        document.removeEventListener('visibilitychange', handleVisibilityChange);
      }
      if (handleOnline) {
        window.removeEventListener('online', handleOnline);
      }
      if (handleOffline) {
        window.removeEventListener('offline', handleOffline);
      }
    };
  }, [connectionStatus, isOnline, connectionType]);

  const forceReconnect = async () => {
    if (!shouldEnableFirebase()) {
      console.warn('Cannot reconnect: Firebase is disabled');
      return;
    }

    if (!isOnline) {
      console.warn('Cannot reconnect: device is offline');
      return;
    }

    if (reconnectingRef.current) {
      console.warn('Reconnection already in progress');
      return;
    }

    reconnectingRef.current = true;
    setConnectionStatus('reconnecting');
    
    try {
      // Clean up existing listeners
      cleanupAllListeners();
      
      // Attempt reconnection with shorter timeout to avoid blocking
      await Promise.race([
        reconnectFirestore(),
        new Promise((_, reject) => 
          setTimeout(() => reject(new Error('Force reconnection timeout')), 8000) // Reduced to 8 seconds
        )
      ]);
      
      setConnectionStatus('connected');
      setRetryCount(0);
    } catch (error) {
      console.error('Force reconnection failed:', error);
      setConnectionStatus('disconnected');
    } finally {
      reconnectingRef.current = false;
    }
  };

  const disconnect = async () => {
    if (!shouldEnableFirebase()) {
      return;
    }

    try {
      cleanupAllListeners();
      await disconnectFirestore();
      setConnectionStatus('disconnected');
    } catch (error) {
      console.error('Disconnect failed:', error);
    }
  };

  return {
    connectionStatus,
    retryCount,
    forceReconnect,
    disconnect,
    isConnected: connectionStatus === 'connected'
  };
};