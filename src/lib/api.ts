import {
  UserSchema,
  DashboardSchema,
  ProductsSchema,
  BlogPostsSchema,
  safeParse,
} from '@shared'
import type { User, DashboardData, Product, BlogPost } from '@shared'

import { API_ENDPOINTS } from './config'

export async function fetchUserData(fetchOptions?: RequestInit): Promise<User> {
  const response = await fetch(API_ENDPOINTS.user, {
    next: { tags: ['user-data'] },
    ...fetchOptions,
  })

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}))
    throw new Error(
      `Failed to fetch user data: ${response.status} - ${errorData.message || 'Unknown error'}`
    )
  }

  const data = await response.json()

  const validation = safeParse(UserSchema, data)
  if (!validation.success) {
    console.error('User data validation failed:', validation.error)
    throw new Error('Invalid user data received from server')
  }

  return validation.data
}

export async function fetchDashboardData(fetchOptions?: RequestInit): Promise<DashboardData> {
  const response = await fetch(API_ENDPOINTS.dashboard, {
    next: { tags: ['dashboard-data'] },
    ...fetchOptions,
  })

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}))
    throw new Error(
      `Failed to fetch dashboard data: ${response.status} - ${errorData.message || 'Unknown error'}`
    )
  }

  const data = await response.json()

  const validation = safeParse(DashboardSchema, data)
  if (!validation.success) {
    console.error('Dashboard data validation failed:', validation.error)
    throw new Error('Invalid dashboard data received from server')
  }

  return validation.data
}

export async function fetchProductsData(fetchOptions?: RequestInit): Promise<Product[]> {
  const response = await fetch(API_ENDPOINTS.products, fetchOptions)

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}))
    throw new Error(
      `Failed to fetch products data: ${response.status} - ${errorData.message || 'Unknown error'}`
    )
  }

  const data = await response.json()

  const validation = safeParse(ProductsSchema, data)
  if (!validation.success) {
    console.error('Products data validation failed:', validation.error)
    throw new Error('Invalid products data received from server')
  }

  return validation.data
}

export async function fetchBlogPostsData(fetchOptions?: RequestInit): Promise<BlogPost[]> {
  const response = await fetch(API_ENDPOINTS.blogPosts, fetchOptions)

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}))
    throw new Error(
      `Failed to fetch blog posts data: ${response.status} - ${
        errorData.message || 'Unknown error'
      }`
    )
  }

  const data = await response.json()

  const validation = safeParse(BlogPostsSchema, data)
  if (!validation.success) {
    console.error('Blog posts data validation failed:', validation.error)
    throw new Error('Invalid blog posts data received from server')
  }

  return validation.data
}
