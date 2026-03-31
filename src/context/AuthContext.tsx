import React, { createContext, useState, useCallback, useEffect } from 'react';
import type { User, LoginRequest, RegisterRequest, OAuthCallbackParams } from '../types';
import { authService } from '../services/authService';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isLoggedIn: boolean;
  login: (data: LoginRequest) => Promise<void>;
  register: (data: RegisterRequest) => Promise<void>;
  startGoogleLogin: () => void;
  completeOAuthLogin: (params: OAuthCallbackParams) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  // Initialize user from localStorage on mount
  useEffect(() => {
    const currentUser = authService.getCurrentUser();
    const token = authService.getToken();

    if (currentUser) {
      setUser(currentUser);
      return;
    }

    if (token) {
      authService
        .hydrateUserFromApi()
        .then(setUser)
        .catch(() => authService.logout());
    }
  }, []);

  const login = useCallback(async (data: LoginRequest) => {
    setLoading(true);
    try {
      const response = await authService.login(data);
      setUser(response.user);
    } finally {
      setLoading(false);
    }
  }, []);

  const register = useCallback(async (data: RegisterRequest) => {
    setLoading(true);
    try {
      const response = await authService.register(data);
      setUser(response.user);
    } finally {
      setLoading(false);
    }
  }, []);

  const startGoogleLogin = useCallback(() => {
    authService.startGoogleLogin();
  }, []);

  const completeOAuthLogin = useCallback(async (params: OAuthCallbackParams) => {
    setLoading(true);
    try {
      authService.completeOAuthCallback(params);
      const userData = await authService.hydrateUserFromApi();
      setUser(userData);
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    authService.logout();
    setUser(null);
  }, []);

  const value: AuthContextType = {
    user,
    loading,
    isLoggedIn: !!user,
    login,
    register,
    startGoogleLogin,
    completeOAuthLogin,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
