import { apiClient } from './client';
import type { Sponsor, SponsorFormData, ApiResponse } from '../types';

export const sponsorsApi = {
  getAll: async (activeOnly: boolean = false): Promise<ApiResponse<Sponsor[]>> => {
    const query = activeOnly ? '?active=true' : '';
    return apiClient.get<Sponsor[]>(`/sponsors${query}`);
  },

  getById: async (id: number): Promise<ApiResponse<Sponsor>> => {
    return apiClient.get<Sponsor>(`/sponsors/${id}`);
  },

  create: async (data: SponsorFormData): Promise<ApiResponse<Sponsor>> => {
    return apiClient.post<Sponsor>('/sponsors', data);
  },

  update: async (id: number, data: Partial<SponsorFormData>): Promise<ApiResponse<Sponsor>> => {
    return apiClient.put<Sponsor>(`/sponsors/${id}`, data);
  },

  delete: async (id: number): Promise<ApiResponse<void>> => {
    return apiClient.delete<void>(`/sponsors/${id}`);
  },

  reorder: async (sponsorIds: number[]): Promise<ApiResponse<void>> => {
    return apiClient.post<void>('/sponsors/reorder', { order: sponsorIds });
  },
};

export default sponsorsApi;
