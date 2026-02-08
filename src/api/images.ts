import { apiClient } from './client';
import type { SiteImage, ImageFormData, ImageCategory, ImageUploadResponse, ApiResponse } from '../types';

export const imagesApi = {
  getAll: async (category?: ImageCategory): Promise<ApiResponse<SiteImage[]>> => {
    const query = category ? `?category=${category}` : '';
    return apiClient.get<SiteImage[]>(`/images${query}`);
  },

  getById: async (id: number): Promise<ApiResponse<SiteImage>> => {
    return apiClient.get<SiteImage>(`/images/${id}`);
  },

  upload: async (file: File, data: ImageFormData): Promise<ApiResponse<ImageUploadResponse>> => {
    return apiClient.upload<ImageUploadResponse>('/images/upload', file, {
      name: data.name,
      description: data.description || '',
      category: data.category || 'general',
    });
  },

  update: async (id: number, data: Partial<ImageFormData>): Promise<ApiResponse<SiteImage>> => {
    return apiClient.put<SiteImage>(`/images/${id}`, data);
  },

  delete: async (id: number): Promise<ApiResponse<void>> => {
    return apiClient.delete<void>(`/images/${id}`);
  },
};

export default imagesApi;
