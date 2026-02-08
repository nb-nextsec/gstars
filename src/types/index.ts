// User types
export interface User {
  id: number;
  username: string;
  created_at: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

// Event types
export interface Event {
  id: number;
  title: string;
  description: string | null;
  date: string;
  time: string | null;
  location: string | null;
  image_url: string | null;
  is_active: boolean;
  created_at: string;
}

export interface EventFormData {
  title: string;
  description?: string;
  date: string;
  time?: string;
  location?: string;
  image_url?: string;
  is_active?: boolean;
}

// Sponsor types
export type SponsorTier = 'gold' | 'silver' | 'bronze';

export interface Sponsor {
  id: number;
  name: string;
  logo_url: string | null;
  website_url: string | null;
  tier: SponsorTier;
  display_order: number;
  is_active: boolean;
  created_at: string;
}

export interface SponsorFormData {
  name: string;
  logo_url?: string;
  website_url?: string;
  tier?: SponsorTier;
  display_order?: number;
  is_active?: boolean;
}

// Image types
export type ImageCategory = 'hero' | 'gallery' | 'programs' | 'social' | 'general';

export interface SiteImage {
  id: number;
  name: string;
  description: string | null;
  url: string;
  category: ImageCategory | null;
  created_at: string;
}

export interface ImageFormData {
  name: string;
  description?: string;
  category?: ImageCategory;
}

export interface ImageUploadResponse {
  url: string;
  id: number;
}

// Content types
export interface SiteContent {
  id: number;
  page: string;
  section: string;
  content: string | null;
  updated_at: string;
}

export interface ContentFormData {
  page: string;
  section: string;
  content: string;
}

// Contact form types
export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

// API response types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

// Navigation types
export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

// Program types (static content for now)
export interface Program {
  id: string;
  name: string;
  description: string;
  ageGroups: string[];
  schedule: string;
  image?: string;
}

// Committee member types (static content for now)
export interface CommitteeMember {
  id: string;
  name: string;
  role: string;
  image?: string;
  bio?: string;
}
