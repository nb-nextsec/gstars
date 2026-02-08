import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { eventsApi } from '../api';
import type { EventFormData } from '../types';

export const eventKeys = {
  all: ['events'] as const,
  lists: () => [...eventKeys.all, 'list'] as const,
  list: (filters: Record<string, unknown>) => [...eventKeys.lists(), filters] as const,
  details: () => [...eventKeys.all, 'detail'] as const,
  detail: (id: number) => [...eventKeys.details(), id] as const,
  upcoming: (limit: number) => [...eventKeys.all, 'upcoming', limit] as const,
};

export function useEvents(activeOnly: boolean = false) {
  return useQuery({
    queryKey: eventKeys.list({ activeOnly }),
    queryFn: async () => {
      const response = await eventsApi.getAll(activeOnly);
      if (!response.success) throw new Error(response.error);
      return response.data!;
    },
  });
}

export function useEvent(id: number) {
  return useQuery({
    queryKey: eventKeys.detail(id),
    queryFn: async () => {
      const response = await eventsApi.getById(id);
      if (!response.success) throw new Error(response.error);
      return response.data!;
    },
    enabled: id > 0,
  });
}

export function useUpcomingEvents(limit: number = 5) {
  return useQuery({
    queryKey: eventKeys.upcoming(limit),
    queryFn: async () => {
      const response = await eventsApi.getUpcoming(limit);
      if (!response.success) throw new Error(response.error);
      return response.data!;
    },
  });
}

export function useCreateEvent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: EventFormData) => {
      const response = await eventsApi.create(data);
      if (!response.success) throw new Error(response.error);
      return response.data!;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: eventKeys.all });
    },
  });
}

export function useUpdateEvent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }: { id: number; data: Partial<EventFormData> }) => {
      const response = await eventsApi.update(id, data);
      if (!response.success) throw new Error(response.error);
      return response.data!;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: eventKeys.detail(variables.id) });
      queryClient.invalidateQueries({ queryKey: eventKeys.lists() });
    },
  });
}

export function useDeleteEvent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      const response = await eventsApi.delete(id);
      if (!response.success) throw new Error(response.error);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: eventKeys.all });
    },
  });
}
