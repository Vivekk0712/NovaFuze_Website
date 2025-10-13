import api from './authApi';

export interface AdminLoginRequest {
  email: string;
  password: string;
}

export interface AdminLoginResponse {
  success: boolean;
  token?: string;
  admin?: {
    id: string;
    email: string;
    name: string;
  };
  error?: string;
}

export interface AdminUser {
  id: string;
  email: string;
  name: string;
  is_active: boolean;
}

// Admin Authentication
export const adminLogin = async (credentials: AdminLoginRequest): Promise<AdminLoginResponse> => {
  try {
    const response = await api.post('/api/admin/login', credentials);
    return response.data;
  } catch (error: any) {
    console.error('Admin login error:', error);
    return {
      success: false,
      error: error.response?.data?.error?.message || 'Login failed'
    };
  }
};

export const adminCreate = async (adminData: {
  email: string;
  password: string;
  name: string;
}): Promise<AdminLoginResponse> => {
  try {
    const response = await api.post('/api/admin/create', adminData);
    return response.data;
  } catch (error: any) {
    console.error('Admin creation error:', error);
    return {
      success: false,
      error: error.response?.data?.error?.message || 'Admin creation failed'
    };
  }
};

// Admin File Management
export const getAdminFiles = async (token: string) => {
  try {
    const response = await api.get('/api/admin/files', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error: any) {
    console.error('Error fetching admin files:', error);
    throw error;
  }
};

export const getAdminFileDetails = async (fileId: string, token: string) => {
  try {
    const response = await api.get(`/api/admin/files/${fileId}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error: any) {
    console.error('Error fetching admin file details:', error);
    throw error;
  }
};

export const deleteAdminFile = async (fileId: string, token: string) => {
  try {
    const response = await api.delete(`/api/admin/files/${fileId}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error: any) {
    console.error('Error deleting admin file:', error);
    throw error;
  }
};

export const getAdminStats = async (token: string) => {
  try {
    const response = await api.get('/api/admin/stats', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error: any) {
    console.error('Error fetching admin stats:', error);
    throw error;
  }
};

// Token management
export const getAdminToken = (): string | null => {
  return localStorage.getItem('admin_token');
};

export const setAdminToken = (token: string): void => {
  localStorage.setItem('admin_token', token);
};

export const removeAdminToken = (): void => {
  localStorage.removeItem('admin_token');
};

export const getAdminUser = (): AdminUser | null => {
  const adminData = localStorage.getItem('admin_user');
  return adminData ? JSON.parse(adminData) : null;
};

export const setAdminUser = (admin: AdminUser): void => {
  localStorage.setItem('admin_user', JSON.stringify(admin));
};

export const removeAdminUser = (): void => {
  localStorage.removeItem('admin_user');
};
