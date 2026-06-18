/**
 * useAuth Hook
 * Manages authentication state and operations
 */

import { useEffect } from 'react';
import { useStore } from '../store/store';

const useAuth = () => {
  const user = useStore((state) => state.user);
  const isAuthenticated = useStore((state) => state.isAuthenticated);
  const setUser = useStore((state) => state.setUser);
  const logout = useStore((state) => state.logout);

  // Check if user is authenticated on mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token && !user) {
      // Optionally verify token with backend
      // dispatch(verifyToken(token));
    }
  }, [user]);

  const login = async (email, password) => {
    // API call will be handled by store
    try {
      // const response = await apiClient.post('/auth/login', { email, password });
      // setUser(response.data.user);
      // localStorage.setItem('token', response.data.token);
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  };

  const register = async (userData) => {
    try {
      // const response = await apiClient.post('/auth/register', userData);
      // setUser(response.data.user);
      // localStorage.setItem('token', response.data.token);
    } catch (error) {
      console.error('Registration failed:', error);
      throw error;
    }
  };

  return {
    user,
    isAuthenticated,
    login,
    register,
    logout,
  };
};

export default useAuth;
