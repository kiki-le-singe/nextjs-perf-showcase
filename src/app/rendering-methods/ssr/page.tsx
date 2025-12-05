import { Zap, Check, X, ChevronRight, BookOpen } from 'lucide-react'
import Link from 'next/link'
import { Suspense } from 'react'

import BackTo from '@/components/back-to'
import { CacheDemoToggle } from '@/components/rendering-methods/ssr/cache-demo-toggle'
import { DashboardWrapper } from '@/components/rendering-methods/ssr/dashboard-wrapper'

export default function SSRPage({ searchParams }: { searchParams: Promise<{ cache?: string }> }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-100">
      <div className="container mx-auto px-4 md:px-6 py-8 md:py-12">
        <BackTo href="/rendering-methods" text="Back to Rendering Methods" />

        {/* Brief Intro */}
        <div className="text-center mb-8">
          <h1 className="text-2xl md:text-4xl font-bold text-gray-900 mb-2">
            SSR - Server-Side Rendering
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            See how fresh data is delivered on every page request ↓
          </p>

          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 max-w-3xl mx-auto text-left mb-8">
            <p className="text-blue-900">
              <strong>💡 This demo shows pure SSR</strong> (no cache by default). Every page request
              fetches fresh data from the server. Use the buttons below to compare with cached mode
              and see the performance difference.
            </p>
          </div>
        </div>

        {/* Cache Demo Toggle */}
        <div className="text-center mb-4">
          <CacheDemoToggle />
        </div>

        {/* Dashboard with searchParams wrapped in Suspense */}
        <Suspense fallback={<div className="text-center py-8">Loading...</div>}>
          <DashboardWrapper searchParams={searchParams} />
        </Suspense>

        {/* SSR Explanation */}
        <div className="text-center mb-8 md:mb-12 mt-12">
          <div className="inline-flex items-center justify-center w-12 h-12 md:w-16 md:h-16 bg-orange-100 rounded-full mb-4">
            <Zap className="w-6 h-6 md:w-8 md:h-8 text-orange-600" />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">How does it work?</h2>

          <p className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto mb-8">
            This page demonstrates <strong>pure SSR (Server-Side Rendering)</strong> where data is
            fetched fresh on every request. Use the buttons to compare with cached mode and see the
            performance difference.
          </p>

          <div className="grid md:grid-cols-2 gap-6 text-left max-w-4xl mx-auto mb-8">
            <div className="bg-green-50 p-4 rounded-lg border border-green-100">
              <h4 className="font-bold text-green-800 mb-2">Default mode (no cache):</h4>
              <ul className="space-y-2 text-sm text-green-900">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 flex-shrink-0" /> Fresh data every request (true SSR)
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 flex-shrink-0" /> Always up-to-date
                </li>
                <li className="flex items-center gap-2">
                  <Zap className="w-4 h-4 flex-shrink-0" /> Slower (fetches on each request)
                </li>
              </ul>
            </div>
            <div className="bg-orange-50 p-4 rounded-lg border border-orange-100">
              <h4 className="font-bold text-orange-800 mb-2">Cached mode (for comparison):</h4>
              <ul className="space-y-2 text-sm text-orange-900">
                <li className="flex items-center gap-2">
                  <Zap className="w-4 h-4 flex-shrink-0" /> Faster (reuses cached data)
                </li>
                <li className="flex items-center gap-2">
                  <X className="w-4 h-4 flex-shrink-0" /> Not pure SSR anymore (stale data possible)
                </li>
              </ul>
            </div>
          </div>

          {/* Request Time Info */}
          <div className="bg-white rounded-lg shadow-md p-4 max-w-md mx-auto">
            <div className="flex items-center gap-2 mb-2">
              <Zap className="w-4 h-4 text-orange-600" />
              <h3 className="font-semibold text-gray-900">SSR Benefits & Trade-offs</h3>
            </div>
            <div className="text-sm text-gray-600 space-y-1">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                <span>Always fresh data</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                <span>Perfect SEO</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                <span>Real-time updates</span>
              </div>
              <div className="flex items-center gap-2">
                <X className="w-4 h-4 text-red-500 flex-shrink-0" />
                <span>Higher server load</span>
              </div>
              <div className="flex items-center gap-2">
                <X className="w-4 h-4 text-red-500 flex-shrink-0" />
                <span>Slower than SSG</span>
              </div>
            </div>
          </div>
        </div>

        {/* SSR Best Practice Section */}
        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 mb-12">
          <h3 className="flex items-center text-xl md:text-2xl font-bold text-gray-900 mb-6">
            <BookOpen className="w-4 h-4 text-blue-600 mr-2" /> Next.js 16 SSR Patterns
          </h3>

          <div className="mb-4">
            <h4 className="font-semibold text-gray-900 mb-2">
              🟢 Pure SSR (No Cache) - Default Mode
            </h4>
            <div className="bg-gray-900 rounded-lg p-3 md:p-4 overflow-x-auto">
              <pre className="text-blue-400 text-xs md:text-sm whitespace-pre overflow-x-auto min-w-0">
                <code className="block">{`// Next.js 16 - Dynamic component (no cache)
export async function UserHeader() {
  // No 'use cache' directive = fresh data at request time
  const user = await fetchUserData()
  return <div>{user.name}</div>
}

// Wrap in Suspense for streaming
<Suspense fallback={<Loading />}>
  <UserHeader />
</Suspense>`}</code>
              </pre>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-2">
              🟠 With Cache (For Comparison) - Not Pure SSR
            </h4>
            <div className="bg-gray-900 rounded-lg p-3 md:p-4 overflow-x-auto">
              <pre className="text-blue-400 text-xs md:text-sm whitespace-pre overflow-x-auto min-w-0">
                <code className="block">{`// Next.js 16 - Cached component with 'use cache'
import { cacheLife, cacheTag } from 'next/cache'

export async function UserHeader() {
  'use cache'              // Enable caching
  cacheLife('hours')       // Revalidate after 1 hour
  cacheTag('user-data')    // Tag for revalidation

  const user = await fetchUserData()
  return <div>{user.name}</div>
}

// Still wrap in Suspense (included in static shell)
<Suspense fallback={<Loading />}>
  <UserHeader />
</Suspense>`}</code>
              </pre>
            </div>
          </div>
        </div>

        {/* When to Use SSR */}
        <div className="bg-gradient-to-r from-orange-500 to-red-600 rounded-xl text-white p-8 mb-12">
          <h3 className="text-2xl font-bold mb-6">When to Use SSR</h3>
          <p className="mb-6 font-medium bg-white/10 p-4 rounded-lg">
            Pure SSR (no cache) is best when you need real-time data and should NOT use cache.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h4 className="text-lg font-semibold mb-4">Examples:</h4>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <Check className="w-5 h-5 mr-3" />
                  Activity dashboard
                </li>
                <li className="flex items-center">
                  <Check className="w-5 h-5 mr-3" />
                  E-commerce (inventory & pricing)
                </li>
                <li className="flex items-center">
                  <Check className="w-5 h-5 mr-3" />
                  Social media feed
                </li>
                <li className="flex items-center">
                  <Check className="w-5 h-5 mr-3" />
                  Media app (latest news)
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Key benefits:</h4>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <Check className="w-5 h-5 mr-3" />
                  Perfect SEO
                </li>
                <li className="flex items-center">
                  <Check className="w-5 h-5 mr-3" />
                  Instant content display
                </li>
                <li className="flex items-center">
                  <Check className="w-5 h-5 mr-3" />
                  Server-side data security
                </li>
                <li className="flex items-center">
                  <Check className="w-5 h-5 mr-3" />
                  Real-time data freshness
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Key trade-offs:</h4>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <X className="w-5 h-5 mr-3" />
                  Higher server load
                </li>
                <li className="flex items-center">
                  <X className="w-5 h-5 mr-3" />
                  Slower than SSG
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <BackTo
            href="/rendering-methods/isr"
            text="Previous: ISR Example"
            className="inline-flex items-center text-orange-600 hover:text-orange-700 font-medium"
          />

          <Link
            href="/rendering-methods/csr"
            className="inline-flex items-center text-orange-600 hover:text-orange-700 font-medium"
          >
            Next: CSR Example
            <ChevronRight className="w-4 h-4 ml-2" />
          </Link>
        </div>
      </div>
    </div>
  )
}
