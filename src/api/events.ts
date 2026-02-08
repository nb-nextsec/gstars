import { apiClient } from './client';
import type { Event, EventFormData, ApiResponse } from '../types';

export const eventsApi = {
  getAll: async (activeOnly: boolean = false): Promise<ApiResponse<Event[]>> => {
    const query = activeOnly ? '?active=true' : '';
    return apiClient.get<Event[]>(`/events${query}`);
  },

  getById: async (id: number): Promise<ApiResponse<Event>> => {
    return apiClient.get<Event>(`/events/${id}`);
  },

  getUpcoming: async (limit: number = 5): Promise<ApiResponse<Event[]>> => {
    return apiClient.get<Event[]>(`/events?upcoming=true&limit=${limit}`);
  },

  create: async (data: EventFormData): Promise<ApiResponse<Event>> => {
    return apiClient.post<Event>('/events', data);
  },

  update: async (id: number, data: Partial<EventFormData>): Promise<ApiResponse<Event>> => {
    return apiClient.put<Event>(`/events/${id}`, data);
  },

  delete: async (id: number): Promise<ApiResponse<void>> => {
    return apiClient.delete<void>(`/events/${id}`);
  },
};

export default eventsApi;
