import { Sparkles, Check, X, ChevronRight, BookOpen } from 'lucide-react'
import Link from 'next/link'
import { Suspense } from 'react'

import BackTo from '@/components/back-to'
import { BlogPostsSection } from '@/components/rendering-methods/ssg/blog-posts-section'
import { BlogPostsSectionSkeleton } from '@/components/rendering-methods/ssg/blog-posts-section-skeleton'

export default function SSGPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
      <div className="container mx-auto px-4 md:px-6 py-8 md:py-12">
        <BackTo href="/rendering-methods" text="Back to Rendering Methods" />

        {/* Brief Intro */}
        <div className="text-center mb-8">
          <h1 className="text-2xl md:text-4xl font-bold text-gray-900 mb-2">
            SSG - Static Site Generation
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            Ultra-fast performance with content generated once at build time ↓
          </p>

          <div className="bg-green-50 border-l-4 border-green-500 p-4 max-w-3xl mx-auto text-left mb-8">
            <p className="text-green-900">
              <strong>💡 This demo shows SSG with cacheLife('max')</strong>. Content is cached with
              a 1 month revalidation period and infinite expiration. Perfect for rarely-changing
              content like blogs, documentation, and archived pages.
            </p>
          </div>
        </div>

        {/* Blog Posts Section with Suspense */}
        <Suspense fallback={<BlogPostsSectionSkeleton />}>
          <BlogPostsSection />
        </Suspense>

        {/* SSG Explanation */}
        <div className="text-center mb-8 md:mb-12">
          <div className="inline-flex items-center justify-center w-12 h-12 md:w-16 md:h-16 bg-green-100 rounded-full mb-4">
            <Sparkles className="w-6 h-6 md:w-8 md:h-8 text-green-600" />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">How does it work?</h2>

          <p className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto mb-8">
            This page demonstrates <strong>SSG (Static Site Generation)</strong> using the modern{' '}
            <code className="bg-gray-100 px-2 py-1 rounded text-sm">cacheLife('max')</code> profile
            for rarely-changing content.
          </p>

          <div className="grid md:grid-cols-2 gap-6 text-left max-w-4xl mx-auto mb-8">
            <div className="bg-green-50 p-4 rounded-lg border border-green-100">
              <h4 className="font-bold text-green-800 mb-2">Key Benefits:</h4>
              <ul className="space-y-2 text-sm text-green-900">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 flex-shrink-0" /> Lightning fast performance
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 flex-shrink-0" /> Served from CDN
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 flex-shrink-0" /> No server computation
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 flex-shrink-0" /> Perfect SEO
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 flex-shrink-0" /> Extremely cost-effective
                </li>
              </ul>
            </div>
            <div className="bg-orange-50 p-4 rounded-lg border border-orange-100">
              <h4 className="font-bold text-orange-800 mb-2">Trade-offs:</h4>
              <ul className="space-y-2 text-sm text-orange-900">
                <li className="flex items-center gap-2">
                  <X className="w-4 h-4 flex-shrink-0" /> Content revalidates monthly (with 'max')
                </li>
                <li className="flex items-center gap-2">
                  <X className="w-4 h-4 flex-shrink-0" /> Not suitable for frequently changing data
                </li>
                <li className="flex items-center gap-2">
                  <X className="w-4 h-4 flex-shrink-0" /> Long build times for large sites
                </li>
              </ul>
            </div>
          </div>

          {/* Performance Info */}
          <div className="bg-white rounded-lg shadow-md p-4 max-w-md mx-auto">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-4 h-4 text-green-600" />
              <h3 className="font-semibold text-gray-900">SSG vs Other Methods</h3>
            </div>
            <div className="text-sm text-gray-600 space-y-1">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                <span>Faster than ISR (no revalidation)</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                <span>Much faster than SSR (no server work)</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                <span>Better SEO than CSR</span>
              </div>
            </div>
          </div>
        </div>

        {/* SSG Best Practice Section */}
        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 mb-12">
          <h3 className="flex items-center text-xl md:text-2xl font-bold text-gray-900 mb-6">
            <BookOpen className="w-4 h-4 text-blue-600 mr-2" /> Next.js 16 SSG Patterns
          </h3>

          <div className="mb-4">
            <h4 className="font-semibold text-gray-900 mb-2">
              🟢 Modern SSG Pattern (Next.js 16)
            </h4>
            <div className="bg-gray-900 rounded-lg p-3 md:p-4 overflow-x-auto">
              <pre className="text-green-400 text-xs md:text-sm whitespace-pre overflow-x-auto min-w-0">
                <code className="block">{`// Next.js 16 - Component-level caching for SSG
import { cacheLife, cacheTag } from 'next/cache'

export async function BlogPostsSection() {
  'use cache'               // Enable caching
  cacheLife('max')          // SSG: rarely-changing content
                            // max = { stale: 5min, revalidate: 1 month, expire: Infinity }
  cacheTag('blog-posts')    // Tag for manual revalidation

  const posts = await fetchBlogPosts()
  return <BlogGrid posts={posts} />
}

// In your page
<Suspense fallback={<Loading />}>
  <BlogPostsSection />
</Suspense>`}</code>
              </pre>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-2">
              🟠 Alternative: Fetch API Pattern
            </h4>
            <div className="bg-gray-900 rounded-lg p-3 md:p-4 overflow-x-auto">
              <pre className="text-blue-400 text-xs md:text-sm whitespace-pre overflow-x-auto min-w-0">
                <code className="block">{`// Traditional fetch API approach (still works)
async function getBlogPosts() {
  return fetch(API_URL, {
    cache: 'force-cache'  // SSG with fetch API
  })
}

export default async function BlogPage() {
  const posts = await getBlogPosts()
  return <BlogGrid posts={posts} />
}`}</code>
              </pre>
            </div>
          </div>
        </div>

        {/* cacheLife Profiles */}
        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 mb-8">
          <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
            Available cacheLife Profiles
          </h3>
          <p className="text-gray-600 mb-6">
            Next.js 16 provides built-in cache profiles for different content update frequencies:
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <code className="text-sm font-mono text-purple-600">cacheLife('seconds')</code>
              <p className="text-sm text-gray-600 mt-1">Real-time data (stock prices, live scores)</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <code className="text-sm font-mono text-purple-600">cacheLife('minutes')</code>
              <p className="text-sm text-gray-600 mt-1">Frequently updated (social feeds, news)</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <code className="text-sm font-mono text-purple-600">cacheLife('hours')</code>
              <p className="text-sm text-gray-600 mt-1">
                Multiple daily updates (product inventory)
              </p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <code className="text-sm font-mono text-purple-600">cacheLife('days')</code>
              <p className="text-sm text-gray-600 mt-1">Daily updates (blog posts, articles)</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <code className="text-sm font-mono text-purple-600">cacheLife('weeks')</code>
              <p className="text-sm text-gray-600 mt-1">Weekly updates (podcasts, newsletters)</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg border-2 border-green-500">
              <code className="text-sm font-mono text-green-700 font-bold">cacheLife('max')</code>
              <p className="text-sm text-green-700 mt-1 font-semibold">
                ⭐ Rarely changes (SSG - archived content, legal pages)
              </p>
            </div>
          </div>
        </div>

        {/* When to Use SSG */}
        <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl text-white p-8 mb-12">
          <h3 className="text-2xl font-bold mb-6">When to Use SSG with cacheLife('max')</h3>
          <p className="mb-6 font-medium bg-white/10 p-4 rounded-lg">
            The 'max' profile is perfect for rarely-changing content with a 1-month revalidation
            period and infinite expiration.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h4 className="text-lg font-semibold mb-4">Perfect for:</h4>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <Check className="w-5 h-5 mr-3" />
                  Marketing websites
                </li>
                <li className="flex items-center">
                  <Check className="w-5 h-5 mr-3" />
                  Blog posts & articles
                </li>
                <li className="flex items-center">
                  <Check className="w-5 h-5 mr-3" />
                  Documentation sites
                </li>
                <li className="flex items-center">
                  <Check className="w-5 h-5 mr-3" />
                  Landing pages
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Key benefits:</h4>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <Check className="w-5 h-5 mr-3" />
                  Ultra-fast performance
                </li>
                <li className="flex items-center">
                  <Check className="w-5 h-5 mr-3" />
                  Perfect SEO
                </li>
                <li className="flex items-center">
                  <Check className="w-5 h-5 mr-3" />
                  Background revalidation (1 month)
                </li>
                <li className="flex items-center">
                  <Check className="w-5 h-5 mr-3" />
                  Handles massive traffic
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Not suitable for:</h4>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <X className="w-5 h-5 mr-3" />
                  Real-time data
                </li>
                <li className="flex items-center">
                  <X className="w-5 h-5 mr-3" />
                  User-specific content
                </li>
                <li className="flex items-center">
                  <X className="w-5 h-5 mr-3" />
                  Frequently changing data
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <BackTo
            href="/rendering-methods"
            text="Back to Rendering Methods"
            className="inline-flex items-center text-green-600 hover:text-green-700 font-medium"
          />

          <Link
            href="/rendering-methods/isr"
            className="inline-flex items-center text-green-600 hover:text-green-700 font-medium"
          >
            Next: ISR Example
            <ChevronRight className="w-4 h-4 ml-2" />
          </Link>
        </div>
      </div>
    </div>
  )
}

// Next.js 16: Component-level caching with cacheLife('max')
// Built-in profiles: 'seconds', 'minutes', 'hours', 'days', 'weeks', 'max'
