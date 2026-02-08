import { apiClient } from './client';
import type { SiteContent, ContentFormData, ApiResponse } from '../types';

export const contentApi = {
  getByPage: async (page: string): Promise<ApiResponse<SiteContent[]>> => {
    return apiClient.get<SiteContent[]>(`/content?page=${page}`);
  },

  getBySection: async (page: string, section: string): Promise<ApiResponse<SiteContent>> => {
    return apiClient.get<SiteContent>(`/content?page=${page}&section=${section}`);
  },

  update: async (data: ContentFormData): Promise<ApiResponse<SiteContent>> => {
    return apiClient.put<SiteContent>('/content', data);
  },

  getAll: async (): Promise<ApiResponse<SiteContent[]>> => {
    return apiClient.get<SiteContent[]>('/content');
  },
};

export default contentApi;
