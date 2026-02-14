'use client';

import { useCallback, useState } from 'react';
import axios from 'axios';
import { useToast } from './use-toast';

export interface AuthUser {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  phone?: string;
  profileImage?: string;
  isVerified: boolean;
  dateOfBirth?: string | Date;
}

export function useAuth() {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const login = useCallback(
    async (email: string, password: string) => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await axios.post('/api/auth/login', {
          email,
          password,
        });

        if (response.data.success) {
          setUser(response.data.user);
          toast({
            title: 'Success',
            description: 'Logged in successfully',
          });
          return response.data;
        }
      } catch (err: any) {
        const errorMsg = err.response?.data?.error || 'Login failed';
        setError(errorMsg);
        toast({
          title: 'Error',
          description: errorMsg,
          variant: 'destructive',
        });
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    [toast]
  );

  const register = useCallback(
    async (
      email: string,
      password: string,
      firstName: string,
      lastName: string,
      role?: string
    ) => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await axios.post('/api/auth/register', {
          email,
          password,
          firstName,
          lastName,
          role: role || 'patient',
        });

        if (response.data.success) {
          setUser(response.data.user);
          toast({
            title: 'Success',
            description: 'Account created successfully',
          });
          return response.data;
        }
      } catch (err: any) {
        const errorMsg = err.response?.data?.error || 'Registration failed';
        setError(errorMsg);
        toast({
          title: 'Error',
          description: errorMsg,
          variant: 'destructive',
        });
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    [toast]
  );

  const logout = useCallback(async () => {
    setIsLoading(true);
    try {
      await axios.post('/api/auth/logout');
      setUser(null);
      setError(null);
      toast({
        title: 'Success',
        description: 'Logged out successfully',
      });
    } catch (err: any) {
      const errorMsg = err.response?.data?.error || 'Logout failed';
      setError(errorMsg);
      toast({
        title: 'Error',
        description: errorMsg,
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  const checkAuth = useCallback(async () => {
    try {
      const response = await axios.get('/api/auth/me');
      if (response.data.success) {
        setUser(response.data.user);
      }
    } catch (err) {
      setUser(null);
    }
  }, []);

  return {
    user,
    isLoading,
    error,
    login,
    register,
    logout,
    checkAuth,
    isAuthenticated: !!user,
  };
}
