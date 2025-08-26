import type { User, DashboardData } from './types';

// Base URL for API calls
export const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

// Simple, reusable API endpoints - no caching logic mixed in
export const API_ENDPOINTS = {
  user: `${BASE_URL}/api/user`,
  dashboard: `${BASE_URL}/api/dashboard`,
} as const;

// Basic fetch utilities - each rendering method adds its own caching strategy
export async function fetchUserData(fetchOptions?: RequestInit): Promise<User> {
  const response = await fetch(API_ENDPOINTS.user, fetchOptions);
  
  if (!response.ok) {
    throw new Error(`Failed to fetch user data: ${response.status}`);
  }
  
  return response.json();
}

export async function fetchDashboardData(fetchOptions?: RequestInit): Promise<DashboardData> {
  const response = await fetch(API_ENDPOINTS.dashboard, fetchOptions);
  
  if (!response.ok) {
    throw new Error(`Failed to fetch dashboard data: ${response.status}`);
  }
  
  return response.json();
}

// Products API for ISR
export async function fetchProductsData(fetchOptions?: RequestInit) {
  const response = await fetch(`${BASE_URL}/api/products`, fetchOptions);
  
  if (!response.ok) {
    throw new Error(`Failed to fetch products data: ${response.status}`);
  }
  
  return response.json();
}

// Blog posts API for SSG
export async function fetchBlogPostsData(fetchOptions?: RequestInit) {
  const response = await fetch(`${BASE_URL}/api/blog-posts`, fetchOptions);
  
  if (!response.ok) {
    throw new Error(`Failed to fetch blog posts data: ${response.status}`);
  }
  
  return response.json();
}