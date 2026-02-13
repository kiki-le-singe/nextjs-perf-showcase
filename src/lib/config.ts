// Use NestJS server URL for all API endpoints
const API_URL =
  process.env.NEXT_PUBLIC_API_URL ?? process.env.API_URL ?? 'http://localhost:3001/api'

export const API_ENDPOINTS = {
  user: `${API_URL}/user`,
  dashboard: `${API_URL}/dashboard`,
  products: `${API_URL}/products`,
  blogPosts: `${API_URL}/blog-posts`,
} as const
