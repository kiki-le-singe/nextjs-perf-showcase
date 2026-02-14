import { Sparkles, Check, X, ChevronRight, BookOpen } from 'lucide-react'
import Link from 'next/link'
import { cacheTag } from 'next/cache'

import BackTo from '@/components/back-to'
import { fetchBlogPostsData } from '@/lib/api'
import { BlogPostCard } from '@/components/rendering-methods/isr-page/blog-post-card'

export default async function ISRPageLevelPage() {
  'use cache' // Next.js 16: Page-level ISR (entire page cached, revalidate 15 min)
  cacheTag('isr-page') // Tag for on-demand revalidation

  // Fetched at build time, auto-revalidates every 15 min (page-level cache)
  const blogPosts = await fetchBlogPostsData()
  const buildTime = new Date().toISOString()

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
      <div className="container mx-auto px-4 md:px-6 py-8 md:py-12">
        <BackTo href="/rendering-methods" text="Back to Rendering Methods" />

        {/* Brief Intro */}
        <div className="text-center mb-8">
          <h1 className="text-2xl md:text-4xl font-bold text-gray-900 mb-2">
            ISR - Page-Level Cache
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            Page-level caching with the default revalidation profile (15 min) ↓
          </p>

          <div className="bg-green-50 border-l-4 border-green-500 p-4 max-w-3xl mx-auto text-left mb-8">
            <p className="text-green-900">
              <strong>💡 This demo shows page-level ISR</strong>. The entire page is cached at
              build time and automatically revalidates every 15 minutes. The{' '}
              <code>&apos;use cache&apos;</code> directive is applied at the page level, caching
              everything as a single unit.
            </p>
          </div>
        </div>

        {/* Build Time Info */}
        <div className="bg-gradient-to-r from-green-100 to-emerald-100 rounded-xl p-4 max-w-2xl mx-auto mb-8">
          <div className="text-center mb-2">
            <p className="text-xs text-gray-700 mb-1">Cached at Build Time:</p>
            <p className="text-lg font-mono font-bold text-green-700">
              {new Date(buildTime).toLocaleString()}
            </p>
          </div>
          <div className="text-center">
            <p className="text-xs text-gray-600">
              This timestamp was captured during build and will update after the 15 min revalidation
              window
            </p>
          </div>
        </div>

        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 max-w-3xl mx-auto mb-8">
          <p className="text-sm text-blue-900">
            <strong>📝 ISR Page-Level Demo:</strong> This entire page uses{' '}
            <strong className="text-green-600">&apos;use cache&apos;</strong> at the page level,
            caching everything as one unit (layout, data, HTML). Next.js revalidates the whole page
            every 15 minutes. The <strong className="text-green-600">timestamp</strong> shows when
            the cache was last generated. 🚀
          </p>
        </div>

        {/* Blog Posts Grid */}
        <div className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 text-center">
            Blog Posts (ISR Cached Content)
          </h2>
          <div className="grid md:grid-cols-2 gap-6 md:gap-8">
            {blogPosts.map(post => (
              <BlogPostCard key={post.id} post={post} />
            ))}
          </div>
        </div>

        {/* ISR Page-Level Explanation */}
        <div className="text-center mb-8 md:mb-12">
          <div className="inline-flex items-center justify-center w-12 h-12 md:w-16 md:h-16 bg-green-100 rounded-full mb-4">
            <Sparkles className="w-6 h-6 md:w-8 md:h-8 text-green-600" />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">How does it work?</h2>

          <p className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto mb-8">
            This page demonstrates <strong>page-level ISR</strong> using the modern Next.js 16{' '}
            <code className="bg-gray-100 px-2 py-1 rounded text-sm">&apos;use cache&apos;</code>{' '}
            directive at the page level. The entire page is cached as one unit at build time and
            automatically revalidates in the background every 15 minutes.
          </p>

          <div className="grid md:grid-cols-2 gap-6 text-left max-w-4xl mx-auto mb-8">
            <div className="bg-green-50 p-4 rounded-lg border border-green-100">
              <h4 className="font-bold text-green-800 mb-2">Key Benefits:</h4>
              <ul className="space-y-2 text-sm text-green-900">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 flex-shrink-0" /> Lightning fast performance
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 flex-shrink-0" /> Auto-revalidates every 15 min
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 flex-shrink-0" /> No explicit cacheLife needed
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 flex-shrink-0" /> Perfect SEO
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 flex-shrink-0" /> Simple page-level pattern
                </li>
              </ul>
            </div>
            <div className="bg-orange-50 p-4 rounded-lg border border-orange-100">
              <h4 className="font-bold text-orange-800 mb-2">Trade-offs:</h4>
              <ul className="space-y-2 text-sm text-orange-900">
                <li className="flex items-center gap-2">
                  <X className="w-4 h-4 flex-shrink-0" /> Data can be up to 15 min stale
                </li>
                <li className="flex items-center gap-2">
                  <X className="w-4 h-4 flex-shrink-0" /> No fine-grained cache control
                </li>
                <li className="flex items-center gap-2">
                  <X className="w-4 h-4 flex-shrink-0" /> Entire page cached as one unit
                </li>
                <li className="flex items-center gap-2">
                  <X className="w-4 h-4 flex-shrink-0" /> Cannot personalize content per user
                </li>
              </ul>
            </div>
          </div>

          {/* Performance Info */}
          <div className="bg-white rounded-lg shadow-md p-4 max-w-md mx-auto">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-4 h-4 text-green-600" />
              <h3 className="font-semibold text-gray-900">ISR Page-Level vs Other Methods</h3>
            </div>
            <div className="text-sm text-gray-600 space-y-1">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                <span>Simpler than ISR custom (no cacheLife config)</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                <span>Much faster than SSR (cached responses)</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                <span>Better SEO than CSR</span>
              </div>
            </div>
          </div>
        </div>

        {/* ISR Best Practice Section */}
        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 mb-12">
          <h3 className="flex items-center text-xl md:text-2xl font-bold text-gray-900 mb-6">
            <BookOpen className="w-4 h-4 text-blue-600 mr-2" /> Next.js 16 ISR Patterns
          </h3>

          <div className="mb-4">
            <h4 className="font-semibold text-gray-900 mb-2">
              🟢 ISR Page-Level Pattern (Next.js 16)
            </h4>
            <div className="bg-gray-900 rounded-lg p-3 md:p-4 overflow-x-auto">
              <pre className="text-green-400 text-xs md:text-sm whitespace-pre overflow-x-auto min-w-0">
                <code className="block">{`// Next.js 16 - Page-level ISR (entire page cached)
import { cacheTag } from 'next/cache'

export default async function BlogPage() {
  'use cache'              // Page-level cache (revalidate 15 min)
  cacheTag('blog-page')    // Tag for on-demand revalidation

  // Cached at build time, auto-revalidates every 15 min
  const posts = await fetchBlogPosts()
  const buildTime = new Date().toISOString()

  return (
    <div>
      <p>Cached at: {buildTime}</p>
      <BlogGrid posts={posts} />
    </div>
  )
}`}</code>
              </pre>
            </div>
          </div>

          <div className="mb-4">
            <h4 className="font-semibold text-gray-900 mb-2">
              🟡 Component-Level Pattern (for mixed static/dynamic)
            </h4>
            <div className="bg-gray-900 rounded-lg p-3 md:p-4 overflow-x-auto">
              <pre className="text-yellow-400 text-xs md:text-sm whitespace-pre overflow-x-auto min-w-0">
                <code className="block">{`// Use when mixing cached and dynamic content
export default function MixedPage() {
  return (
    <>
      <header>Static header</header>
      <CachedBlogPosts />  {/* Cached */}
      <Suspense><UserProfile /></Suspense>  {/* Dynamic */}
    </>
  )
}

async function CachedBlogPosts() {
  'use cache'
  const posts = await fetchBlogPosts()
  return <BlogGrid posts={posts} />
}`}</code>
              </pre>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-2">
              🔴 Legacy Pattern (Being Deprecated)
            </h4>
            <div className="bg-gray-900 rounded-lg p-3 md:p-4 overflow-x-auto">
              <pre className="text-red-400 text-xs md:text-sm whitespace-pre overflow-x-auto min-w-0">
                <code className="block">{`// Old way - being deprecated in Next.js 16
export const dynamic = 'force-static'

export default async function BlogPage() {
  const posts = await fetch(API_URL, { cache: 'force-cache' })
  return <BlogGrid posts={posts} />
}

// ⚠️ Use 'use cache' instead!`}</code>
              </pre>
            </div>
          </div>
        </div>

        {/* ISR Page-Level vs ISR Component-Level */}
        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 mb-8">
          <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
            ISR Page-Level vs ISR Component-Level
          </h3>
          <p className="text-gray-600 mb-6">
            This demo caches the <strong>entire page</strong> as one unit. For finer control, use
            component-level caching with custom cacheLife profiles:
          </p>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="bg-green-50 p-4 rounded-lg border-2 border-green-500">
              <h4 className="font-bold text-green-800 mb-2">
                ✅ ISR Page-Level (This Demo)
              </h4>
              <code className="text-sm font-mono text-green-700 block mb-2">
                &apos;use cache&apos; {/* Entire page cached */}
              </code>
              <p className="text-sm text-green-900">
                Entire page cached as one unit, auto-revalidates every 15 min. Simplest ISR
                pattern — one directive for the whole page.
              </p>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg border-2 border-blue-500">
              <h4 className="font-bold text-blue-800 mb-2">⚡ ISR Component-Level</h4>
              <code className="text-sm font-mono text-blue-700 block mb-2">
                &apos;use cache&apos;
                <br />
                cacheLife(&apos;hours&apos;)
              </code>
              <p className="text-sm text-blue-900">
                Background revalidation after specified time. Automatic updates without rebuilding.
                See ISR demo for this pattern.
              </p>
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-semibold text-gray-900 mb-3">Optional cacheLife Profiles:</h4>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-xs">
              <div>
                <code className="text-purple-600">seconds</code>{' '}
                <span className="text-gray-600">- Real-time</span>
              </div>
              <div>
                <code className="text-purple-600">minutes</code>{' '}
                <span className="text-gray-600">- Frequent updates</span>
              </div>
              <div>
                <code className="text-purple-600">hours</code>{' '}
                <span className="text-gray-600">- Multiple daily</span>
              </div>
              <div>
                <code className="text-purple-600">days</code>{' '}
                <span className="text-gray-600">- Daily updates</span>
              </div>
              <div>
                <code className="text-purple-600">weeks</code>{' '}
                <span className="text-gray-600">- Weekly updates</span>
              </div>
              <div>
                <code className="text-purple-600">max</code>{' '}
                <span className="text-gray-600">- Monthly revalidation</span>
              </div>
            </div>
          </div>
        </div>

        {/* When to Use ISR Page-Level */}
        <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl text-white p-8 mb-12">
          <h3 className="text-2xl font-bold mb-6">When to Use ISR Page-Level</h3>
          <p className="mb-6 font-medium bg-white/10 p-4 rounded-lg">
            Use &apos;use cache&apos; without explicit cacheLife for content that benefits from
            automatic revalidation with minimal configuration.
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
                  Absolute fastest performance
                </li>
                <li className="flex items-center">
                  <Check className="w-5 h-5 mr-3" />
                  Perfect SEO
                </li>
                <li className="flex items-center">
                  <Check className="w-5 h-5 mr-3" />
                  Zero server computation
                </li>
                <li className="flex items-center">
                  <Check className="w-5 h-5 mr-3" />
                  Handles unlimited traffic
                </li>
                <li className="flex items-center">
                  <Check className="w-5 h-5 mr-3" />
                  Predictable content
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
            href="/rendering-methods/ssg"
            text="Previous: SSG Example"
            className="inline-flex items-center text-green-600 hover:text-green-700 font-medium"
          />

          <Link
            href="/rendering-methods/isr"
            className="inline-flex items-center text-green-600 hover:text-green-700 font-medium"
          >
            Next: ISR Component-Level Example
            <ChevronRight className="w-4 h-4 ml-2" />
          </Link>
        </div>
      </div>
    </div>
  )
}

// Next.js 16: Page-level ISR with 'use cache' (entire page cached, revalidate 15 min)
// For component-level control, use 'use cache' + cacheLife() on individual components instead
