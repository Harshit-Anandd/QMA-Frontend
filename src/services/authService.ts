import httpClient from '../utils/http';
import type { LoginRequest, RegisterRequest, AuthResponse, User } from '../types';

const TOKEN_KEY = 'qm_token';
const USER_KEY = 'qm_user';

export const authService = {
  register: async (data: RegisterRequest): Promise<AuthResponse> => {
    const response = await httpClient.post<AuthResponse>('/auth/register', data);
    authService.saveSession(response.data);
    return response.data;
  },

  login: async (data: LoginRequest): Promise<AuthResponse> => {
    const response = await httpClient.post<AuthResponse>('/auth/login', data);
    authService.saveSession(response.data);
    return response.data;
  },

  logout: (): void => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  },

  getToken: (): string | null => {
    return localStorage.getItem(TOKEN_KEY);
  },

  isLoggedIn: (): boolean => {
    return !!authService.getToken();
  },

  getCurrentUser: (): User | null => {
    const raw = localStorage.getItem(USER_KEY);
    return raw ? JSON.parse(raw) : null;
  },

  saveSession: (res: AuthResponse): void => {
    localStorage.setItem(TOKEN_KEY, res.token);
    const user: User = {
      email: res.email,
      role: res.role,
      name: res.name,
    };
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  },
};
