import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { contentApi } from '../api';
import type { ContentFormData } from '../types';

export const contentKeys = {
  all: ['content'] as const,
  page: (page: string) => [...contentKeys.all, page] as const,
  section: (page: string, section: string) => [...contentKeys.all, page, section] as const,
};

export function usePageContent(page: string) {
  return useQuery({
    queryKey: contentKeys.page(page),
    queryFn: async () => {
      const response = await contentApi.getByPage(page);
      if (!response.success) throw new Error(response.error);
      return response.data!;
    },
  });
}

export function useSectionContent(page: string, section: string) {
  return useQuery({
    queryKey: contentKeys.section(page, section),
    queryFn: async () => {
      const response = await contentApi.getBySection(page, section);
      if (!response.success) throw new Error(response.error);
      return response.data!;
    },
  });
}

export function useUpdateContent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: ContentFormData) => {
      const response = await contentApi.update(data);
      if (!response.success) throw new Error(response.error);
      return response.data!;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: contentKeys.page(variables.page) });
      queryClient.invalidateQueries({ queryKey: contentKeys.section(variables.page, variables.section) });
    },
  });
}

// Helper to transform content array to object for easy access
export function contentToObject(content: { section: string; content: string | null }[]): Record<string, string> {
  return content.reduce((acc, item) => {
    acc[item.section] = item.content || '';
    return acc;
  }, {} as Record<string, string>);
}
