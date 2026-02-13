import { cacheLife, cacheTag } from 'next/cache'

import { fetchBlogPostsData } from '@/lib/api'

import { BlogPostCard } from './blog-post-card'

export async function BlogPostsSection() {
  'use cache' // Next.js 16: Component-level caching for SSG

  // SSG: Use 'max' profile for rarely-changing content
  // max = { stale: 5min, revalidate: 1 month, expire: Infinity }
  cacheLife('max')
  cacheTag('blog-posts')

  // This data is cached at build time and served statically
  const blogPosts = await fetchBlogPostsData()
  const buildTime = new Date().toISOString()

  return (
    <>
      {/* Build Time Info */}
      <div className="bg-gradient-to-r from-green-100 to-emerald-100 rounded-xl p-4 max-w-2xl mx-auto mb-8">
        <div className="text-center mb-2">
          <p className="text-xs text-gray-700 mb-1">Generated at Build Time:</p>
          <p className="text-lg font-mono font-bold text-green-700">
            {new Date(buildTime).toLocaleString()}
          </p>
        </div>
        <div className="text-center">
          <p className="text-xs text-gray-600">
            This content was pre-rendered at build time and is served statically
          </p>
        </div>
      </div>

      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 max-w-3xl mx-auto mb-8">
        <p className="text-sm text-blue-900">
          <strong>📝 Real SSG Demo:</strong> This page uses{' '}
          <strong className="text-green-600">cacheLife('max')</strong> - content is cached with a{' '}
          <strong>1 month revalidation</strong> and <strong>infinite expiration</strong>. Perfect
          for rarely-changing content like blog posts, documentation, and archived content. The{' '}
          <strong className="text-green-600">Build Time timestamp</strong> shows when it was
          generated. 🚀
        </p>
      </div>

      {/* Blog Posts Grid */}
      <div className="mb-12">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 text-center">
          Blog Posts (Static Content)
        </h2>
        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          {blogPosts.map(post => (
            <BlogPostCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </>
  )
}
