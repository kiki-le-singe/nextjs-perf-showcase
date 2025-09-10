import { z } from 'zod'

import {
  UserSchema,
  DashboardSchema,
  ProductSchema,
  BlogPostSchema,
  ProductsSchema,
  BlogPostsSchema,
  ApiErrorSchema,
} from './schemas'

export type User = z.infer<typeof UserSchema>
export type DashboardData = z.infer<typeof DashboardSchema>
export type Product = z.infer<typeof ProductSchema>
export type BlogPost = z.infer<typeof BlogPostSchema>
export type Products = z.infer<typeof ProductsSchema>
export type BlogPosts = z.infer<typeof BlogPostsSchema>
export type ApiError = z.infer<typeof ApiErrorSchema>
