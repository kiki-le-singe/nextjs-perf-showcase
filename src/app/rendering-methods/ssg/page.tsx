import { Rocket, Check, X, ChevronRight, BookOpen } from 'lucide-react'
import Link from 'next/link'

import BackTo from '@/components/back-to'
import { BlogPostCard } from '@/components/rendering-methods/ssg/blog-post-card'
import { STATIC_BLOG_POSTS } from '@/lib/static-data'

// True SSG: no 'use cache', no fetch, no dynamic signals
// Build output: ○ (static)
const buildTime = new Date().toISOString()

export default function SSGPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-cyan-100">
      <div className="container mx-auto px-4 md:px-6 py-8 md:py-12">
        <BackTo href="/rendering-methods" text="Back to Rendering Methods" />

        {/* Brief Intro */}
        <div className="text-center mb-8">
          <h1 className="text-2xl md:text-4xl font-bold text-gray-900 mb-2">
            SSG - Static Site Generation
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            Truly static pages — content hardcoded at build time, never revalidated ↓
          </p>

          <div className="bg-teal-50 border-l-4 border-teal-500 p-4 max-w-3xl mx-auto text-left mb-8">
            <p className="text-teal-900">
              <strong>💡 This demo shows true SSG</strong>. No <code>fetch</code>, no{' '}
              <code>&apos;use cache&apos;</code>, no API calls. The content is hardcoded in the
              source code and generated once at build time. It never changes until the next
              deployment.
            </p>
          </div>
        </div>

        {/* Build Time Info */}
        <div className="bg-gradient-to-r from-teal-100 to-cyan-100 rounded-xl p-4 max-w-2xl mx-auto mb-8">
          <div className="text-center mb-2">
            <p className="text-xs text-gray-700 mb-1">Generated at Build Time:</p>
            <p className="text-lg font-mono font-bold text-teal-700">
              {new Date(buildTime).toLocaleString()}
            </p>
          </div>
          <div className="text-center">
            <p className="text-xs text-gray-600">
              This timestamp is frozen at build time — it will never change until the next deployment
            </p>
          </div>
        </div>

        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 max-w-3xl mx-auto mb-8">
          <p className="text-sm text-blue-900">
            <strong>📝 True SSG Demo:</strong> This page has{' '}
            <strong className="text-teal-600">no fetch calls</strong> and{' '}
            <strong className="text-teal-600">no &apos;use cache&apos; directive</strong>. The blog
            posts below are imported from a static data file. In the build output, this page shows
            as <code className="bg-gray-100 px-1 rounded">○</code> (static), not{' '}
            <code className="bg-gray-100 px-1 rounded">◐</code> (ISR).
          </p>
        </div>

        {/* Blog Posts Grid */}
        <div className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 text-center">
            Blog Posts (Static Content)
          </h2>
          <div className="grid md:grid-cols-2 gap-6 md:gap-8">
            {STATIC_BLOG_POSTS.map(post => (
              <BlogPostCard key={post.id} post={post} />
            ))}
          </div>
        </div>

        {/* SSG Explanation */}
        <div className="text-center mb-8 md:mb-12">
          <div className="inline-flex items-center justify-center w-12 h-12 md:w-16 md:h-16 bg-teal-100 rounded-full mb-4">
            <Rocket className="w-6 h-6 md:w-8 md:h-8 text-teal-600" />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">How does it work?</h2>

          <p className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto mb-8">
            In this demo, SSG means <strong>purely static content</strong> — no{' '}
            <code className="bg-gray-100 px-2 py-1 rounded text-sm">&apos;use cache&apos;</code>,
            no <code className="bg-gray-100 px-2 py-1 rounded text-sm">fetch</code>, no{' '}
            <code className="bg-gray-100 px-2 py-1 rounded text-sm">cookies()</code> or{' '}
            <code className="bg-gray-100 px-2 py-1 rounded text-sm">headers()</code>. Data lives in
            the source code and is baked into the HTML at build time.
          </p>

          <div className="grid md:grid-cols-2 gap-6 text-left max-w-4xl mx-auto mb-8">
            <div className="bg-teal-50 p-4 rounded-lg border border-teal-100">
              <h4 className="font-bold text-teal-800 mb-2">Key Benefits:</h4>
              <ul className="space-y-2 text-sm text-teal-900">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 flex-shrink-0" /> Fastest possible performance
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 flex-shrink-0" /> Served directly from CDN
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 flex-shrink-0" /> Zero server computation at runtime
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 flex-shrink-0" /> Perfect SEO (pre-rendered HTML)
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 flex-shrink-0" /> No API dependency at runtime
                </li>
              </ul>
            </div>
            <div className="bg-orange-50 p-4 rounded-lg border border-orange-100">
              <h4 className="font-bold text-orange-800 mb-2">Trade-offs:</h4>
              <ul className="space-y-2 text-sm text-orange-900">
                <li className="flex items-center gap-2">
                  <X className="w-4 h-4 flex-shrink-0" /> Requires redeployment to update content
                </li>
                <li className="flex items-center gap-2">
                  <X className="w-4 h-4 flex-shrink-0" /> Data is frozen until next build
                </li>
                <li className="flex items-center gap-2">
                  <X className="w-4 h-4 flex-shrink-0" /> Not suitable for dynamic or user-specific
                  content
                </li>
                <li className="flex items-center gap-2">
                  <X className="w-4 h-4 flex-shrink-0" /> No runtime data fetching (use ISR or SSR
                  instead)
                </li>
              </ul>
            </div>
          </div>

          {/* Build Output Info */}
          <div className="bg-white rounded-lg shadow-md p-4 max-w-md mx-auto">
            <div className="flex items-center gap-2 mb-2">
              <Rocket className="w-4 h-4 text-teal-600" />
              <h3 className="font-semibold text-gray-900">Build Output Symbols</h3>
            </div>
            <div className="text-sm text-gray-600 space-y-1">
              <div className="flex items-center gap-2">
                <code className="text-teal-600 font-bold">○</code>
                <span>Static (SSG) — this page</span>
              </div>
              <div className="flex items-center gap-2">
                <code className="text-green-600 font-bold">◐</code>
                <span>ISR — revalidates periodically</span>
              </div>
              <div className="flex items-center gap-2">
                <code className="text-orange-600 font-bold">λ</code>
                <span>SSR — rendered on every request</span>
              </div>
            </div>
          </div>
        </div>

        {/* Code Examples */}
        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 mb-12">
          <h3 className="flex items-center text-xl md:text-2xl font-bold text-gray-900 mb-6">
            <BookOpen className="w-4 h-4 text-blue-600 mr-2" /> Next.js 16 SSG Pattern
          </h3>

          <div className="mb-4">
            <h4 className="font-semibold text-gray-900 mb-2">
              🟢 True SSG (This Demo)
            </h4>
            <div className="bg-gray-900 rounded-lg p-3 md:p-4 overflow-x-auto">
              <pre className="text-teal-400 text-xs md:text-sm whitespace-pre overflow-x-auto min-w-0">
                <code className="block">{`// True SSG — no fetch, no 'use cache', no dynamic signals
import { STATIC_BLOG_POSTS } from '@/lib/static-data'

const buildTime = new Date().toISOString()  // Frozen at build

export default function BlogPage() {
  return (
    <div>
      <p>Built at: {buildTime}</p>
      {STATIC_BLOG_POSTS.map(post => (
        <BlogPostCard key={post.id} post={post} />
      ))}
    </div>
  )
}

// Build output: ○ (static)
// No server needed at runtime — pure HTML served from CDN`}</code>
              </pre>
            </div>
          </div>

          <div className="mb-4">
            <h4 className="font-semibold text-gray-900 mb-2">
              🟡 ISR Page-Level (Different Pattern)
            </h4>
            <div className="bg-gray-900 rounded-lg p-3 md:p-4 overflow-x-auto">
              <pre className="text-yellow-400 text-xs md:text-sm whitespace-pre overflow-x-auto min-w-0">
                <code className="block">{`// ISR — fetches data, revalidates every 15 min
export default async function BlogPage() {
  'use cache'  // ← This makes it ISR (default profile = revalidate 15 min)

  const posts = await fetch('/api/posts')  // ← Dynamic data
  return <BlogGrid posts={posts} />
}

// Build output: ◐ (ISR)
// Server revalidates in background every 15 min`}</code>
              </pre>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-2">
              🔑 Key Difference
            </h4>
            <div className="bg-teal-50 p-4 rounded-lg border border-teal-200">
              <p className="text-sm text-teal-900">
                In Next.js 16, <code className="bg-white px-1 rounded">&apos;use cache&apos;</code>{' '}
                always applies a revalidation profile — making the page ISR, not pure SSG. True SSG
                means <strong>no dynamic signals at all</strong>: no fetch, no{' '}
                <code className="bg-white px-1 rounded">&apos;use cache&apos;</code>, data lives in
                the source code.
              </p>
            </div>
          </div>
        </div>

        {/* SSG vs ISR Page-Level */}
        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 mb-8">
          <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
            SSG vs ISR Page-Level
          </h3>
          <p className="text-gray-600 mb-6">
            Both produce fast, pre-rendered HTML. The key difference is{' '}
            <strong>how and when content updates</strong>.
          </p>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="bg-teal-50 p-4 rounded-lg border-2 border-teal-500">
              <h4 className="font-bold text-teal-800 mb-2">
                ✅ SSG (This Demo)
              </h4>
              <code className="text-sm font-mono text-teal-700 block mb-2">
                No &apos;use cache&apos;, no fetch
              </code>
              <p className="text-sm text-teal-900">
                Content is hardcoded in the source code. Frozen at build time. Requires
                redeployment to update. Build output: <code>○</code>
              </p>
            </div>

            <div className="bg-green-50 p-4 rounded-lg border-2 border-green-500">
              <h4 className="font-bold text-green-800 mb-2">⚡ ISR Page-Level</h4>
              <code className="text-sm font-mono text-green-700 block mb-2">
                &apos;use cache&apos; + fetch
              </code>
              <p className="text-sm text-green-900">
                Content fetched from API and cached. Auto-revalidates every 15 min. No redeployment
                needed. Build output: <code>◐</code>
              </p>
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-semibold text-gray-900 mb-3">Quick Comparison:</h4>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-2 px-3 font-semibold text-gray-900">Feature</th>
                    <th className="text-left py-2 px-3 font-semibold text-teal-600">SSG</th>
                    <th className="text-left py-2 px-3 font-semibold text-green-600">ISR Page-Level</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  <tr>
                    <td className="py-2 px-3 font-medium text-gray-900">Data source</td>
                    <td className="py-2 px-3 text-gray-700">Source code</td>
                    <td className="py-2 px-3 text-gray-700">API (fetch)</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 font-medium text-gray-900">Updates</td>
                    <td className="py-2 px-3 text-gray-700">Redeployment only</td>
                    <td className="py-2 px-3 text-gray-700">Auto every 15 min</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 font-medium text-gray-900">Build output</td>
                    <td className="py-2 px-3 text-gray-700">○ (static)</td>
                    <td className="py-2 px-3 text-gray-700">◐ (ISR)</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 font-medium text-gray-900">Runtime server</td>
                    <td className="py-2 px-3 text-gray-700">Not needed</td>
                    <td className="py-2 px-3 text-gray-700">Needed (revalidation)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* When to Use SSG */}
        <div className="bg-gradient-to-r from-teal-500 to-cyan-600 rounded-xl text-white p-8 mb-12">
          <h3 className="text-2xl font-bold mb-6">When to Use True SSG</h3>
          <p className="mb-6 font-medium bg-white/10 p-4 rounded-lg">
            Use SSG for content that only changes when you deploy. No API, no revalidation — just
            static HTML served from CDN.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h4 className="text-lg font-semibold mb-4">Perfect for:</h4>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <Check className="w-5 h-5 mr-3" />
                  Documentation sites
                </li>
                <li className="flex items-center">
                  <Check className="w-5 h-5 mr-3" />
                  Landing pages
                </li>
                <li className="flex items-center">
                  <Check className="w-5 h-5 mr-3" />
                  About / Legal pages
                </li>
                <li className="flex items-center">
                  <Check className="w-5 h-5 mr-3" />
                  Marketing websites
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Key benefits:</h4>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <Check className="w-5 h-5 mr-3" />
                  Fastest possible load time
                </li>
                <li className="flex items-center">
                  <Check className="w-5 h-5 mr-3" />
                  No server needed at runtime
                </li>
                <li className="flex items-center">
                  <Check className="w-5 h-5 mr-3" />
                  Perfect SEO
                </li>
                <li className="flex items-center">
                  <Check className="w-5 h-5 mr-3" />
                  Handles unlimited traffic
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Not suitable for:</h4>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <X className="w-5 h-5 mr-3" />
                  Dynamic data (use ISR or SSR)
                </li>
                <li className="flex items-center">
                  <X className="w-5 h-5 mr-3" />
                  Frequently changing content
                </li>
                <li className="flex items-center">
                  <X className="w-5 h-5 mr-3" />
                  User-specific content
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
            className="inline-flex items-center text-teal-600 hover:text-teal-700 font-medium"
          />

          <Link
            href="/rendering-methods/isr-page"
            className="inline-flex items-center text-teal-600 hover:text-teal-700 font-medium"
          >
            Next: ISR Page-Level Example
            <ChevronRight className="w-4 h-4 ml-2" />
          </Link>
        </div>
      </div>
    </div>
  )
}
