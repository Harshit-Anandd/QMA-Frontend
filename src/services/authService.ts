import httpClient from '../utils/http';
import type { LoginRequest, RegisterRequest, AuthResponse, OAuthCallbackParams, User } from '../types';

const TOKEN_KEY = 'qm_token';
const USER_KEY = 'qm_user';
const OAUTH2_URL = import.meta.env.VITE_OAUTH2_AUTHORIZATION_URL || '/oauth2/authorization/google';

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

  startGoogleLogin: (): void => {
    window.location.href = OAUTH2_URL;
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
    localStorage.setItem(TOKEN_KEY, res.accessToken);
    localStorage.setItem(USER_KEY, JSON.stringify(res.user));
  },

  completeOAuthCallback: (params: OAuthCallbackParams): void => {
    if (params.error) {
      throw new Error(params.message || 'Google authentication failed');
    }

    if (!params.accessToken) {
      throw new Error('Missing OAuth access token');
    }

    const accessToken = params.accessToken;
    localStorage.setItem(TOKEN_KEY, accessToken);
  },

  hydrateUserFromApi: async (): Promise<User> => {
    const response = await httpClient.get<User>('/users/me');
    localStorage.setItem(USER_KEY, JSON.stringify(response.data));
    return response.data;
  },
};
