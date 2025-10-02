import { Zap, Check, X, ChevronRight, BookOpen } from 'lucide-react'
import Link from 'next/link'
import { Suspense } from 'react'

import BackTo from '@/components/back-to'
import { CacheDemoToggle } from '@/components/rendering-methods/ssr/cache-demo-toggle'
import { DashboardContent } from '@/components/rendering-methods/ssr/dashboard-content'
import { DashboardContentSkeleton } from '@/components/rendering-methods/ssr/dashboard-content-skeleton'
import { DashboardStats } from '@/components/rendering-methods/ssr/dashboard-stats'
import { StatsSkeleton } from '@/components/rendering-methods/ssr/dashboard-stats-skeleton'
import { UserHeader } from '@/components/rendering-methods/ssr/user-header'
import { UserHeaderSkeleton } from '@/components/rendering-methods/ssr/user-header-skeleton'

export default async function SSRPage({
  searchParams,
}: {
  searchParams: Promise<{ cache?: string }>
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-100">
      <div className="container mx-auto px-4 md:px-6 py-8 md:py-12">
        <BackTo href="/rendering-methods" text="Back to Rendering Methods" />

        {/* Brief Intro */}
        <div className="text-center mb-8">
          <h1 className="text-2xl md:text-4xl font-bold text-gray-900 mb-2">
            SSR - Server-Side Rendering
          </h1>
          <p className="text-lg text-gray-600">
            See how fresh data is delivered on every page request ↓
          </p>
        </div>

        {/* Cache Demo Toggle */}
        <CacheDemoToggle />

        {/* User Header with Suspense */}
        <Suspense fallback={<UserHeaderSkeleton />}>
          <UserHeader searchParams={searchParams} />
        </Suspense>

        {/* Dashboard Stats with Suspense */}
        <Suspense fallback={<StatsSkeleton />}>
          <DashboardStats searchParams={searchParams} />
        </Suspense>

        {/* Dashboard Content with Suspense */}
        <Suspense fallback={<DashboardContentSkeleton />}>
          <DashboardContent searchParams={searchParams} />
        </Suspense>

        {/* SSR Explanation */}
        <div className="text-center mb-8 md:mb-12">
          <div className="inline-flex items-center justify-center w-12 h-12 md:w-16 md:h-16 bg-orange-100 rounded-full mb-4">
            <Zap className="w-6 h-6 md:w-8 md:h-8 text-orange-600" />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">How does it work?</h2>
          <p className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto mb-6">
            The dashboard above demonstrates modern SSR with{' '}
            <strong className="text-blue-600">interactive cache comparison</strong>. Use the toggle
            above to switch between{' '}
            <code className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm">
              default (no-store)
            </code>{' '}
            and{' '}
            <code className="bg-orange-100 text-orange-800 px-2 py-1 rounded text-sm">
              force-cache
            </code>{' '}
            modes to see the difference in loading behavior and console logs.
          </p>

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
            <BookOpen className="w-4 h-4 text-blue-600 mr-2" /> SSR Examples
          </h3>
          <div className="bg-gray-900 rounded-lg p-3 md:p-4 mb-4 overflow-x-auto">
            <pre className="text-blue-400 text-xs md:text-sm whitespace-pre overflow-x-auto min-w-0">
              <code className="block">{`// Next.js 15+ (current behavior)
export default async function SSRPage() {
  // Automatically no-store by default
  const user = await fetch('/api/user');
  const dashboard = await fetch('/api/dashboard');
  return <div>...</div>;
}

// Next.js 14 and below (legacy behavior)  
export default async function SSRPage() {
  // Explicit cache needed for SSR
  const user = await fetch('/api/user', { 
    cache: 'no-store' 
  });
  const dashboard = await fetch('/api/dashboard', { 
    cache: 'no-store' 
  });
  return <div>...</div>;
}`}</code>
            </pre>
          </div>
        </div>

        {/* When to Use SSR */}
        <div className="bg-gradient-to-r from-orange-500 to-red-600 rounded-xl text-white p-8 mb-12">
          <h3 className="text-2xl font-bold mb-6">When to Use SSR</h3>
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
