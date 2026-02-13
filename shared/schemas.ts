import { z } from 'zod'

export const UserSchema = z.object({
  id: z.number().positive(),
  name: z.string().min(1, 'Name is required').max(100),
  email: z.email('Invalid email format'),
  avatar: z.url('Avatar must be a valid URL').or(
    z
      .string()
      .startsWith('/')
      .transform(url => url)
  ),
  role: z.enum(['Premium User', 'Basic User', 'Admin', 'Guest']),
  joinDate: z.iso.date('Invalid date format'),
  lastLogin: z.iso.datetime('Invalid datetime format'),
  preferences: z.object({
    theme: z.enum(['light', 'dark', 'system']),
    notifications: z.boolean(),
    language: z.string().min(2).max(5),
  }),
})

const ActivityItemSchema = z.object({
  id: z.number().positive(),
  type: z.enum(['order', 'payment', 'support', 'notification', 'system']),
  message: z.string().min(1).max(500),
  time: z.iso.datetime(),
  status: z.enum(['success', 'pending', 'info', 'warning', 'error']),
})

const NotificationSchema = z.object({
  id: z.number().positive(),
  title: z.string().min(1).max(100),
  message: z.string().min(1).max(500),
  type: z.enum(['info', 'warning', 'error', 'success']),
  unread: z.boolean(),
})

const StatsSchema = z.object({
  totalOrders: z.number().nonnegative(),
  revenue: z.string().regex(/^\d+(\.\d{1,2})?$/, 'Invalid revenue format'),
  activeSubscriptions: z.number().nonnegative(),
  supportTickets: z.number().nonnegative(),
})

export const DashboardSchema = z.object({
  stats: StatsSchema,
  recentActivity: z.array(ActivityItemSchema).max(50),
  notifications: z.array(NotificationSchema).max(20),
  currentTime: z.iso.datetime(),
  serverLocation: z.string().min(1),
})

export const ProductSchema = z.object({
  id: z.number().positive(),
  name: z.string().min(1).max(200),
  price: z.number().positive(),
  originalPrice: z.number().positive(),
  rating: z.number().min(0).max(5),
  reviews: z.number().nonnegative(),
  image: z.url().or(z.string().startsWith('/')),
  category: z.string().min(1),
  inStock: z.boolean(),
  discount: z.number().min(0).max(100),
  description: z.string().min(1).max(1000),
  stockLevel: z.number().nonnegative().optional(),
  lastUpdated: z.iso.datetime().optional(),
})

export const BlogPostSchema = z.object({
  id: z.number().positive(),
  title: z.string().min(1).max(200),
  excerpt: z.string().min(1).max(500),
  author: z.string().min(1).max(100),
  date: z.iso.date(),
  readTime: z.string().regex(/^\d+\s+min\s+read$/, 'Invalid read time format'),
  category: z.string().min(1).max(50),
  tags: z.array(z.string().min(1).max(30)).max(10),
})

export const ProductsSchema = z.array(ProductSchema)
export const BlogPostsSchema = z.array(BlogPostSchema)

export const ApiErrorSchema = z.object({
  error: z.string(),
  message: z.string(),
  details: z.record(z.string(), z.unknown()).optional(),
  timestamp: z.iso.datetime(),
  success: z.literal(false),
})

export const safeParse = <T>(schema: z.ZodSchema<T>, data: unknown) => {
  try {
    return {
      success: true as const,
      data: schema.parse(data),
    }
  } catch (error) {
    return {
      success: false as const,
      error: error instanceof z.ZodError ? error.format() : 'Unknown validation error',
    }
  }
}
