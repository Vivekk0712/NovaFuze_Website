import { Variants } from 'framer-motion';

export type TransitionType = 'fade' | 'slide' | 'scale' | 'slideUp';

interface PageTransitionConfig {
  type: TransitionType;
  duration?: number;
}

export const usePageTransition = (config: PageTransitionConfig = { type: 'fade' }): Variants => {
  const { type, duration = 0.4 } = config;

  const transitions: Record<TransitionType, Variants> = {
    fade: {
      initial: { opacity: 0 },
      animate: { 
        opacity: 1,
        transition: { duration, ease: 'easeOut' }
      },
      exit: { 
        opacity: 0,
        transition: { duration: duration * 0.75, ease: 'easeIn' }
      }
    },
    
    slide: {
      initial: { opacity: 0, x: 50 },
      animate: { 
        opacity: 1, 
        x: 0,
        transition: { duration, ease: 'easeOut' }
      },
      exit: { 
        opacity: 0, 
        x: -50,
        transition: { duration: duration * 0.75, ease: 'easeIn' }
      }
    },
    
    slideUp: {
      initial: { opacity: 0, y: 30 },
      animate: { 
        opacity: 1, 
        y: 0,
        transition: { duration, ease: 'easeOut' }
      },
      exit: { 
        opacity: 0, 
        y: -30,
        transition: { duration: duration * 0.75, ease: 'easeIn' }
      }
    },
    
    scale: {
      initial: { opacity: 0, scale: 0.95 },
      animate: { 
        opacity: 1, 
        scale: 1,
        transition: { duration, ease: 'easeOut' }
      },
      exit: { 
        opacity: 0, 
        scale: 1.05,
        transition: { duration: duration * 0.75, ease: 'easeIn' }
      }
    }
  };

  return transitions[type];
};

// Helper to get transition type based on route
export const getTransitionForRoute = (route: string): TransitionType => {
  // Home page - fade
  if (route === 'home') return 'fade';
  
  // Auth pages - scale
  if (route === 'login' || route === 'signup') return 'scale';
  
  // Detail pages - slide
  if (route.includes('detail') || route.includes('/')) return 'slide';
  
  // Default - slideUp
  return 'slideUp';
};
