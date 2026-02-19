import { describe, it, expect } from 'vitest'
import {
  UserSchema,
  DashboardSchema,
  BlogPostSchema,
  ApiErrorSchema,
  safeParse,
} from '../schemas'

// ---------------------------------------------------------------------------
// Fixtures
// ---------------------------------------------------------------------------

const validUser = {
  id: 1,
  name: 'Alice',
  email: 'alice@example.com',
  avatar: 'https://example.com/avatar.jpg',
  role: 'Admin' as const,
  joinDate: '2023-01-15',
  lastLogin: '2024-01-15T10:30:00.000Z',
  preferences: {
    theme: 'dark' as const,
    notifications: true,
    language: 'en',
  },
}

const validBlogPost = {
  id: 1,
  title: 'Hello World',
  excerpt: 'A short excerpt.',
  author: 'Alice',
  date: '2024-01-15',
  readTime: '5 min read',
  category: 'Tech',
  tags: ['next.js'],
}

const validDashboard = {
  stats: {
    totalOrders: 100,
    revenue: '1234.56',
    activeSubscriptions: 50,
    supportTickets: 3,
  },
  recentActivity: [],
  notifications: [],
  currentTime: '2024-01-15T10:30:00.000Z',
  serverLocation: 'us-east-1',
}

// ---------------------------------------------------------------------------
// safeParse
// ---------------------------------------------------------------------------

describe('safeParse', () => {
  it('returns success:true with parsed data for valid input', () => {
    const result = safeParse(UserSchema, validUser)
    expect(result.success).toBe(true)
    if (result.success) expect(result.data.name).toBe('Alice')
  })

  it('returns success:false with a ZodError for invalid input', () => {
    const result = safeParse(UserSchema, { ...validUser, email: 'not-an-email' })
    expect(result.success).toBe(false)
    if (!result.success) expect(result.error).toBeDefined()
  })

  it('returns success:false for a completely invalid value (null)', () => {
    const result = safeParse(UserSchema, null)
    expect(result.success).toBe(false)
  })
})

// ---------------------------------------------------------------------------
// UserSchema
// ---------------------------------------------------------------------------

describe('UserSchema', () => {
  it('parses a valid user', () => {
    expect(UserSchema.safeParse(validUser).success).toBe(true)
  })

  it('rejects an invalid email', () => {
    expect(UserSchema.safeParse({ ...validUser, email: 'not-an-email' }).success).toBe(false)
  })

  it('rejects an unknown role', () => {
    expect(UserSchema.safeParse({ ...validUser, role: 'SuperAdmin' }).success).toBe(false)
  })

  it('rejects a name longer than 100 characters', () => {
    expect(UserSchema.safeParse({ ...validUser, name: 'a'.repeat(101) }).success).toBe(false)
  })

  it('rejects an id of 0 (must be positive)', () => {
    expect(UserSchema.safeParse({ ...validUser, id: 0 }).success).toBe(false)
  })

  it('accepts a relative path as avatar', () => {
    expect(UserSchema.safeParse({ ...validUser, avatar: '/avatars/alice.jpg' }).success).toBe(true)
  })

  it('rejects an invalid ISO date for joinDate', () => {
    expect(UserSchema.safeParse({ ...validUser, joinDate: 'not-a-date' }).success).toBe(false)
  })
})

// ---------------------------------------------------------------------------
// BlogPostSchema — readTime regex
// ---------------------------------------------------------------------------

describe('BlogPostSchema — readTime regex (/^\\d+\\s+min\\s+read$/)', () => {
  it('accepts "5 min read"', () => {
    expect(BlogPostSchema.safeParse(validBlogPost).success).toBe(true)
  })

  it('accepts double-digit minutes ("12 min read")', () => {
    expect(
      BlogPostSchema.safeParse({ ...validBlogPost, readTime: '12 min read' }).success,
    ).toBe(true)
  })

  it('rejects "5min" (no spaces)', () => {
    expect(BlogPostSchema.safeParse({ ...validBlogPost, readTime: '5min' }).success).toBe(false)
  })

  it('rejects "5min read" (no space before "min")', () => {
    expect(
      BlogPostSchema.safeParse({ ...validBlogPost, readTime: '5min read' }).success,
    ).toBe(false)
  })

  it('rejects "5 min" (missing "read")', () => {
    expect(BlogPostSchema.safeParse({ ...validBlogPost, readTime: '5 min' }).success).toBe(false)
  })
})

// ---------------------------------------------------------------------------
// StatsSchema (via DashboardSchema) — revenue regex
// ---------------------------------------------------------------------------

describe('StatsSchema — revenue regex (/^\\d+(\\.\\d{1,2})?$/)', () => {
  it('accepts revenue with two decimal places ("1234.56")', () => {
    expect(DashboardSchema.safeParse(validDashboard).success).toBe(true)
  })

  it('accepts revenue with one decimal place ("1000.5")', () => {
    const result = DashboardSchema.safeParse({
      ...validDashboard,
      stats: { ...validDashboard.stats, revenue: '1000.5' },
    })
    expect(result.success).toBe(true)
  })

  it('accepts revenue with no decimal places ("1000")', () => {
    const result = DashboardSchema.safeParse({
      ...validDashboard,
      stats: { ...validDashboard.stats, revenue: '1000' },
    })
    expect(result.success).toBe(true)
  })

  it('rejects revenue with three decimal places ("1000.123")', () => {
    const result = DashboardSchema.safeParse({
      ...validDashboard,
      stats: { ...validDashboard.stats, revenue: '1000.123' },
    })
    expect(result.success).toBe(false)
  })

  it('rejects a negative revenue ("-100.00")', () => {
    const result = DashboardSchema.safeParse({
      ...validDashboard,
      stats: { ...validDashboard.stats, revenue: '-100.00' },
    })
    expect(result.success).toBe(false)
  })

  it('rejects a non-numeric revenue ("abc")', () => {
    const result = DashboardSchema.safeParse({
      ...validDashboard,
      stats: { ...validDashboard.stats, revenue: 'abc' },
    })
    expect(result.success).toBe(false)
  })
})

// ---------------------------------------------------------------------------
// ApiErrorSchema
// ---------------------------------------------------------------------------

describe('ApiErrorSchema', () => {
  const validError = {
    error: 'Not Found',
    message: 'The requested resource was not found.',
    timestamp: '2024-01-15T10:30:00.000Z',
    success: false as const,
  }

  it('parses a valid API error', () => {
    expect(ApiErrorSchema.safeParse(validError).success).toBe(true)
  })

  it('rejects success: true (must be the literal false)', () => {
    expect(ApiErrorSchema.safeParse({ ...validError, success: true }).success).toBe(false)
  })

  it('rejects a missing timestamp', () => {
    const { timestamp: _, ...noTimestamp } = validError
    expect(ApiErrorSchema.safeParse(noTimestamp).success).toBe(false)
  })

  it('accepts optional details field', () => {
    const withDetails = { ...validError, details: { field: 'email', code: 'invalid' } }
    expect(ApiErrorSchema.safeParse(withDetails).success).toBe(true)
  })
})
