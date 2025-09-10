import { NextRequest, NextResponse } from 'next/server'

import { BlogPostsSchema, ApiErrorSchema, safeParse } from '@/lib/schemas'

// Mock blog data for SSG demo
const blogPosts = [
  {
    id: 1,
    title: 'Getting Started with Next.js 15',
    excerpt:
      'Learn the fundamentals of Next.js 15 and its new features including the App Router and Server Components.',
    author: 'Jane Doe',
    date: '2024-01-15',
    readTime: '5 min read',
    category: 'Tutorial',
    tags: ['Next.js', 'React', 'Web Development'],
  },
  {
    id: 2,
    title: 'Static Site Generation vs Server-Side Rendering',
    excerpt:
      'Understand the differences between SSG and SSR, and when to use each rendering method in your applications.',
    author: 'John Smith',
    date: '2024-01-10',
    readTime: '8 min read',
    category: 'Performance',
    tags: ['SSG', 'SSR', 'Performance'],
  },
  {
    id: 3,
    title: 'Building Fast Websites with Static Generation',
    excerpt:
      "Discover how static site generation can dramatically improve your website's performance and user experience.",
    author: 'Alice Johnson',
    date: '2024-01-05',
    readTime: '6 min read',
    category: 'Performance',
    tags: ['Static', 'Performance', 'Optimization'],
  },
  {
    id: 4,
    title: 'SEO Best Practices for Static Sites',
    excerpt:
      'Learn how to optimize your statically generated sites for search engines and improve your rankings.',
    author: 'Bob Wilson',
    date: '2024-01-01',
    readTime: '7 min read',
    category: 'SEO',
    tags: ['SEO', 'Static Sites', 'Marketing'],
  },
]

export async function GET(_request: NextRequest) {
  try {
    // Simulate API delay for realistic demo
    await new Promise(resolve => setTimeout(resolve, 100))

    const validation = safeParse(BlogPostsSchema, blogPosts)

    if (!validation.success) {
      return NextResponse.json(
        {
          error: 'Validation Error',
          message: 'Blog posts data failed validation',
          details: validation.error,
          timestamp: new Date().toISOString(),
          success: false,
        } satisfies Parameters<typeof ApiErrorSchema.parse>[0],
        { status: 500 }
      )
    }

    return NextResponse.json(validation.data, {
      headers: {
        // Cache forever for SSG
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    })
  } catch {
    return NextResponse.json(
      {
        error: 'Internal Server Error',
        message: 'Failed to fetch blog posts data',
        timestamp: new Date().toISOString(),
        success: false,
      } satisfies Parameters<typeof ApiErrorSchema.parse>[0],
      { status: 500 }
    )
  }
}
