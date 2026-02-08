import { apiClient } from './client';
import type { ContactFormData, ApiResponse } from '../types';

export const contactApi = {
  send: async (data: ContactFormData): Promise<ApiResponse<void>> => {
    return apiClient.post<void>('/contact/send', data);
  },
};

export default contactApi;
