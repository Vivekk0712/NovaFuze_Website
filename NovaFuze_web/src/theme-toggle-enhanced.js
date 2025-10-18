/**
 * Enhanced Theme Toggle Script
 * Provides robust theme switching with localStorage persistence and system preference detection
 * 
 * Features:
 * - Persistent theme storage
 * - System preference detection
 * - Smooth transitions
 * - Accessibility support
 * - Performance optimized
 */

(function() {
  'use strict';
  
  const THEME_KEY = 'novafuze-tech-ui-theme';
  const THEMES = {
    LIGHT: 'light',
    DARK: 'dark',
    SYSTEM: 'system'
  };
  
  const root = document.documentElement;
  
  /**
   * Apply theme to document
   */
  function applyTheme(theme) {
    // Remove existing theme classes
    root.classList.remove(THEMES.LIGHT, THEMES.DARK);
    
    if (theme === THEMES.SYSTEM) {
      // Use system preference
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches 
        ? THEMES.DARK 
        : THEMES.LIGHT;
      root.classList.add(systemTheme);
      
      // Set color-scheme for browser controls
      root.style.colorScheme = systemTheme;
    } else {
      // Use explicit theme
      root.classList.add(theme);
      root.style.colorScheme = theme;
    }
    
    // Store the preference (not the resolved theme)
    localStorage.setItem(THEME_KEY, theme);
    
    // Dispatch custom event for theme change
    window.dispatchEvent(new CustomEvent('themechange', {
      detail: { theme }
    }));
  }
  
  /**
   * Get stored theme or detect system preference
   */
  function getInitialTheme() {
    // Check localStorage first
    const stored = localStorage.getItem(THEME_KEY);
    if (stored && Object.values(THEMES).includes(stored)) {
      return stored;
    }
    
    // Fall back to system preference
    return THEMES.SYSTEM;
  }
  
  /**
   * Initialize theme on page load
   */
  function initializeTheme() {
    const theme = getInitialTheme();
    applyTheme(theme);
  }
  
  /**
   * Set up system preference change listener
   */
  function setupSystemPreferenceListener() {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    function handleSystemChange() {
      const currentTheme = localStorage.getItem(THEME_KEY);
      if (currentTheme === THEMES.SYSTEM || !currentTheme) {
        applyTheme(THEMES.SYSTEM);
      }
    }
    
    // Use addEventListener if available, fallback to addListener
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleSystemChange);
    } else {
      mediaQuery.addListener(handleSystemChange);
    }
  }
  
  /**
   * Toggle between themes
   */
  function toggleTheme() {
    const current = localStorage.getItem(THEME_KEY) || THEMES.SYSTEM;
    
    const nextTheme = {
      [THEMES.LIGHT]: THEMES.DARK,
      [THEMES.DARK]: THEMES.SYSTEM,
      [THEMES.SYSTEM]: THEMES.LIGHT
    }[current];
    
    applyTheme(nextTheme);
  }
  
  /**
   * Set specific theme
   */
  function setTheme(theme) {
    if (Object.values(THEMES).includes(theme)) {
      applyTheme(theme);
    }
  }
  
  /**
   * Get current theme
   */
  function getCurrentTheme() {
    return localStorage.getItem(THEME_KEY) || THEMES.SYSTEM;
  }
  
  /**
   * Get resolved theme (actual theme being displayed)
   */
  function getResolvedTheme() {
    const stored = getCurrentTheme();
    if (stored === THEMES.SYSTEM) {
      return window.matchMedia('(prefers-color-scheme: dark)').matches 
        ? THEMES.DARK 
        : THEMES.LIGHT;
    }
    return stored;
  }
  
  // Initialize immediately to prevent flash
  initializeTheme();
  
  // Set up listeners when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupSystemPreferenceListener);
  } else {
    setupSystemPreferenceListener();
  }
  
  // Expose API to global scope
  window.NovaFuzeTheme = {
    toggle: toggleTheme,
    set: setTheme,
    get: getCurrentTheme,
    getResolved: getResolvedTheme,
    THEMES
  };
  
  // Set up automatic toggle button binding
  document.addEventListener('DOMContentLoaded', function() {
    const toggleButtons = document.querySelectorAll('[data-theme-toggle]');
    toggleButtons.forEach(button => {
      button.addEventListener('click', toggleTheme);
    });
    
    // Set up theme selector dropdowns
    const themeSelectors = document.querySelectorAll('[data-theme-selector]');
    themeSelectors.forEach(selector => {
      selector.addEventListener('change', function() {
        setTheme(this.value);
      });
      
      // Set current value
      selector.value = getCurrentTheme();
    });
  });
  
})();

/**
 * Usage Examples:
 * 
 * // Simple toggle button
 * <button data-theme-toggle>Toggle Theme</button>
 * 
 * // Theme selector dropdown
 * <select data-theme-selector>
 *   <option value="light">Light</option>
 *   <option value="dark">Dark</option>
 *   <option value="system">System</option>
 * </select>
 * 
 * // Programmatic usage
 * NovaFuzeTheme.set('dark');
 * NovaFuzeTheme.toggle();
 * NovaFuzeTheme.get(); // Current theme preference
 * NovaFuzeTheme.getResolved(); // Actual theme being shown
 * 
 * // Listen for theme changes
 * window.addEventListener('themechange', (e) => {
 *   // Handle theme change: e.detail.theme
 * });
 */