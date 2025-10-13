import { useState, useEffect, useCallback } from 'react';
import { adminLogin, getAdminToken, setAdminToken, removeAdminToken, getAdminUser, setAdminUser, removeAdminUser, AdminUser } from '../services/adminApi';

export interface UseAdminAuthReturn {
  admin: AdminUser | null;
  isAdminAuthenticated: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  loading: boolean;
}

export const useAdminAuth = (): UseAdminAuthReturn => {
  const [admin, setAdmin] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState(true);

  // Always clear admin session on mount - require fresh login every time
  useEffect(() => {
    const clearAdminSession = () => {
      try {
        console.log('useAdminAuth - Clearing admin session on page load');
        // Clear any existing admin session
        removeAdminToken();
        removeAdminUser();
        setAdmin(null);
      } catch (error) {
        console.error('Error clearing admin session:', error);
      } finally {
        setLoading(false);
      }
    };

    clearAdminSession();
  }, []);

  const login = useCallback(async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    try {
      setLoading(true);
      const result = await adminLogin({ email, password });
      
      if (result.success && result.token && result.admin) {
        setAdminToken(result.token);
        setAdminUser(result.admin);
        setAdmin(result.admin);
        return { success: true };
      } else {
        return { success: false, error: result.error || 'Login failed' };
      }
    } catch (error: any) {
      console.error('Admin login error:', error);
      return { success: false, error: 'Login failed' };
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    removeAdminToken();
    removeAdminUser();
    setAdmin(null);
  }, []);

  return {
    admin,
    isAdminAuthenticated: !!admin,
    login,
    logout,
    loading
  };
};
