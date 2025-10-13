import { useEffect, useRef } from 'react';

interface PerformanceMonitorProps {
  children: React.ReactNode;
  label: string;
  enabled?: boolean;
}

// Only enable performance monitoring in development
const PERF_MONITORING_ENABLED = process.env.NODE_ENV === 'development';

export const PerformanceMonitor = ({ children, label, enabled = PERF_MONITORING_ENABLED }: PerformanceMonitorProps) => {
  const startTimeRef = useRef<number>(performance.now());
  const hasLoggedRef = useRef<boolean>(false);

  useEffect(() => {
    if (!enabled || hasLoggedRef.current) return;
    
    // Log render time after initial mount, not on unmount
    const renderTimer = setTimeout(() => {
      const renderTime = performance.now() - startTimeRef.current;
      
      if (renderTime > 1000) {
        console.error(`🚨 Critical Performance Issue: ${label} took ${renderTime.toFixed(2)}ms to render`);
      } else if (renderTime > 500) {
        console.warn(`⚠️ Performance Warning: ${label} took ${renderTime.toFixed(2)}ms to render`);
      } else if (renderTime > 100) {
        console.log(`📊 Performance Note: ${label} took ${renderTime.toFixed(2)}ms to render`);
      }
      
      hasLoggedRef.current = true;
    }, 50); // Small delay to capture initial render
    
    return () => {
      clearTimeout(renderTimer);
    };
  }, [label, enabled]);

  return <>{children}</>;
};

// Hook for measuring async operations
export const usePerformanceTimer = (label: string) => {
  const startTimer = () => {
    const startTime = performance.now();
    
    return {
      end: () => {
        const endTime = performance.now();
        const duration = endTime - startTime;
        
        if (duration > 1000) { // Log if operation takes more than 1 second
          console.error(`🚨 Slow Operation: ${label} took ${duration.toFixed(2)}ms`);
        } else if (duration > 500) {
          console.warn(`⚠️ Slow Operation: ${label} took ${duration.toFixed(2)}ms`);
        } else {
          console.log(`⏱️ Operation: ${label} took ${duration.toFixed(2)}ms`);
        }
      }
    };
  };

  return { startTimer };
};