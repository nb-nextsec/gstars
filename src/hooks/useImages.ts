import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { imagesApi } from '../api';
import type { ImageFormData, ImageCategory } from '../types';

export const imageKeys = {
  all: ['images'] as const,
  lists: () => [...imageKeys.all, 'list'] as const,
  list: (category?: ImageCategory) => [...imageKeys.lists(), category] as const,
  details: () => [...imageKeys.all, 'detail'] as const,
  detail: (id: number) => [...imageKeys.details(), id] as const,
};

export function useImages(category?: ImageCategory) {
  return useQuery({
    queryKey: imageKeys.list(category),
    queryFn: async () => {
      const response = await imagesApi.getAll(category);
      if (!response.success) throw new Error(response.error);
      return response.data!;
    },
  });
}

export function useImage(id: number) {
  return useQuery({
    queryKey: imageKeys.detail(id),
    queryFn: async () => {
      const response = await imagesApi.getById(id);
      if (!response.success) throw new Error(response.error);
      return response.data!;
    },
    enabled: id > 0,
  });
}

export function useUploadImage() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ file, data }: { file: File; data: ImageFormData }) => {
      const response = await imagesApi.upload(file, data);
      if (!response.success) throw new Error(response.error);
      return response.data!;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: imageKeys.all });
    },
  });
}

export function useUpdateImage() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }: { id: number; data: Partial<ImageFormData> }) => {
      const response = await imagesApi.update(id, data);
      if (!response.success) throw new Error(response.error);
      return response.data!;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: imageKeys.detail(variables.id) });
      queryClient.invalidateQueries({ queryKey: imageKeys.lists() });
    },
  });
}

export function useDeleteImage() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      const response = await imagesApi.delete(id);
      if (!response.success) throw new Error(response.error);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: imageKeys.all });
    },
  });
}
