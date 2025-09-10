import { BASE_URL } from './env'

export const API_ENDPOINTS = {
  user: `${BASE_URL}/api/user`,
  dashboard: `${BASE_URL}/api/dashboard`,
  products: `${BASE_URL}/api/products`,
  blogPosts: `${BASE_URL}/api/blog-posts`,
} as const
