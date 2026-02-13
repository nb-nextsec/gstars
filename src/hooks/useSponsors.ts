import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { sponsorsApi } from '../api';
import type { Sponsor, SponsorFormData } from '../types';

const DEV_MODE = import.meta.env.DEV;

// Mock data for dev mode
const mockSponsors: Sponsor[] = [
  { id: 1, name: 'Breakwater Hotel', logo_url: '/images/breakwater.avif', website_url: 'https://example.com', description: 'A proud Geelong hospitality venue.', display_order: 1, is_active: true, created_at: new Date().toISOString() },
  { id: 2, name: 'Meys Meats', logo_url: '/images/Meys-Logo-web_png.avif', website_url: 'https://example.com', description: 'Quality local butcher.', display_order: 2, is_active: true, created_at: new Date().toISOString() },
  { id: 3, name: 'Bunnings', logo_url: '/images/Bunnings-logo_edited.avif', website_url: 'https://example.com', description: 'Home improvement retailer.', display_order: 3, is_active: true, created_at: new Date().toISOString() },
  { id: 4, name: 'Rotary Club', logo_url: '/images/rotary club_edited.avif', website_url: 'https://example.com', description: 'Community leaders.', display_order: 4, is_active: true, created_at: new Date().toISOString() },
  { id: 5, name: 'Repco', logo_url: '/images/repco.avif', website_url: 'https://example.com', description: 'Auto parts retailer.', display_order: 5, is_active: true, created_at: new Date().toISOString() },
  { id: 6, name: 'Lektrix', logo_url: '/images/Lektrix_edited_edited.avif', website_url: 'https://example.com', description: 'Electrical services.', display_order: 6, is_active: true, created_at: new Date().toISOString() },
];

export const sponsorKeys = {
  all: ['sponsors'] as const,
  lists: () => [...sponsorKeys.all, 'list'] as const,
  list: (filters: Record<string, unknown>) => [...sponsorKeys.lists(), filters] as const,
  details: () => [...sponsorKeys.all, 'detail'] as const,
  detail: (id: number) => [...sponsorKeys.details(), id] as const,
};

export function useSponsors(activeOnly: boolean = false) {
  return useQuery({
    queryKey: sponsorKeys.list({ activeOnly }),
    queryFn: async () => {
      try {
        const response = await sponsorsApi.getAll(activeOnly);
        if (!response.success) throw new Error(response.error);
        return response.data!;
      } catch {
        if (DEV_MODE) return mockSponsors;
        throw new Error('Failed to load sponsors');
      }
    },
  });
}

export function useSponsor(id: number) {
  return useQuery({
    queryKey: sponsorKeys.detail(id),
    queryFn: async () => {
      try {
        const response = await sponsorsApi.getById(id);
        if (!response.success) throw new Error(response.error);
        return response.data!;
      } catch {
        if (DEV_MODE) return mockSponsors.find(s => s.id === id) || mockSponsors[0];
        throw new Error('Failed to load sponsor');
      }
    },
    enabled: id > 0,
  });
}

export function useCreateSponsor() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: SponsorFormData) => {
      if (DEV_MODE) {
        const newSponsor: Sponsor = {
          id: Date.now(),
          name: data.name,
          logo_url: data.logo_url || null,
          website_url: data.website_url || null,
          description: data.description || null,
          display_order: data.display_order || 0,
          is_active: true,
          created_at: new Date().toISOString()
        };
        return newSponsor;
      }
      const response = await sponsorsApi.create(data);
      if (!response.success) throw new Error(response.error);
      return response.data!;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: sponsorKeys.all });
    },
  });
}

export function useUpdateSponsor() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }: { id: number; data: Partial<SponsorFormData> }) => {
      if (DEV_MODE) {
        const existing = mockSponsors.find(s => s.id === id);
        return { ...existing, ...data } as Sponsor;
      }
      const response = await sponsorsApi.update(id, data);
      if (!response.success) throw new Error(response.error);
      return response.data!;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: sponsorKeys.detail(variables.id) });
      queryClient.invalidateQueries({ queryKey: sponsorKeys.lists() });
    },
  });
}

export function useDeleteSponsor() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      if (DEV_MODE) return;
      const response = await sponsorsApi.delete(id);
      if (!response.success) throw new Error(response.error);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: sponsorKeys.all });
    },
  });
}

export function useReorderSponsors() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (sponsorIds: number[]) => {
      if (DEV_MODE) return;
      const response = await sponsorsApi.reorder(sponsorIds);
      if (!response.success) throw new Error(response.error);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: sponsorKeys.all });
    },
  });
}
