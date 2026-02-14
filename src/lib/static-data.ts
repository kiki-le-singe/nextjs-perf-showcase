import type { BlogPost } from '@shared'

// Static blog posts — hardcoded data for true SSG (no fetch, no revalidation)
export const STATIC_BLOG_POSTS: BlogPost[] = [
  {
    id: 1,
    title: 'Getting Started with Next.js 16',
    excerpt:
      'Learn how to set up a Next.js 16 project from scratch, configure TypeScript, and explore the new App Router features.',
    author: 'Sarah Chen',
    date: '2025-01-15',
    readTime: '8 min read',
    category: 'Tutorial',
    tags: ['Next.js', 'React', 'Getting Started'],
  },
  {
    id: 2,
    title: 'Understanding Static Site Generation',
    excerpt:
      'Deep dive into SSG in Next.js 16: when to use it, how it differs from ISR, and best practices for truly static content.',
    author: 'Marcus Johnson',
    date: '2025-02-10',
    readTime: '6 min read',
    category: 'Architecture',
    tags: ['SSG', 'Performance', 'Static'],
  },
  {
    id: 3,
    title: 'Performance Best Practices for Next.js',
    excerpt:
      'Optimize your Next.js application with code splitting, image optimization, font loading strategies, and caching patterns.',
    author: 'Elena Rodriguez',
    date: '2025-03-05',
    readTime: '10 min read',
    category: 'Performance',
    tags: ['Optimization', 'Core Web Vitals', 'Lighthouse'],
  },
  {
    id: 4,
    title: 'Deploying Next.js to Production',
    excerpt:
      'A comprehensive guide to deploying Next.js apps on Vercel, AWS, and self-hosted environments with CI/CD pipelines.',
    author: 'David Park',
    date: '2025-04-20',
    readTime: '7 min read',
    category: 'DevOps',
    tags: ['Deployment', 'Vercel', 'CI/CD'],
  },
]
