import { apiClient } from './client';
import type { User, LoginCredentials, ApiResponse } from '../types';

export const authApi = {
  login: async (credentials: LoginCredentials): Promise<ApiResponse<User>> => {
    return apiClient.post<User>('/auth/login', credentials);
  },

  logout: async (): Promise<ApiResponse<void>> => {
    return apiClient.post<void>('/auth/logout');
  },

  me: async (): Promise<ApiResponse<User>> => {
    return apiClient.get<User>('/auth/me');
  },
};

export default authApi;
