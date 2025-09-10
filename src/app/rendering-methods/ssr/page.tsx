import {
  Zap,
  Check,
  X,
  ChevronLeft,
  ChevronRight,
  BookOpen,
  FileText,
  Rocket,
  Paintbrush,
  Scale,
  RotateCcw,
  Sparkles,
} from 'lucide-react'
import Link from 'next/link'
import { Suspense } from 'react'

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
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">How SSR Works</h2>
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
          <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-6">SSR Best Practice</h3>
          <div className="space-y-8 lg:grid lg:grid-cols-2 lg:gap-8 lg:space-y-0">
            <div>
              <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                <Check className="w-4 h-4 text-green-600 mr-2" />
                Cleanest Approach (Default)
              </h4>
              <div className="bg-gray-900 rounded-lg p-3 md:p-4 mb-4 overflow-x-auto">
                <pre className="text-green-400 text-xs md:text-sm whitespace-pre overflow-x-auto min-w-0">
                  <code className="block">{`// SSR - Clean approach (Next.js 15+ default)
export default async function SSRPage() {
  // These are automatically no-store by default
  const user = await fetchUserData();
  const dashboard = await fetchDashboardData();
  return <div>...</div>;
}`}</code>
                </pre>
              </div>
              <div className="space-y-2 text-sm text-gray-600">
                <p>
                  <Paintbrush className="w-4 h-4 text-blue-600 mr-1 inline" />
                  <span className="font-medium">Cleanest code</span> - leverages framework defaults
                </p>
                <p>
                  <Rocket className="w-4 h-4 text-purple-600 mr-1 inline" />
                  <span className="font-medium">Modern approach</span> - Next.js 15+ behavior
                </p>
                <p>
                  <Zap className="w-4 h-4 text-yellow-600 mr-1 inline" />
                  <span className="font-medium">Same result</span> - fresh data on every request
                </p>
                <p>
                  <FileText className="w-4 h-4 text-green-600 mr-1 inline" />
                  <span className="font-medium">Less verbose</span> - no redundant cache options
                </p>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                <BookOpen className="w-4 h-4 text-blue-600 mr-2" />
                Version Differences
              </h4>
              <div className="bg-gray-900 rounded-lg p-3 md:p-4 mb-4 overflow-x-auto">
                <pre className="text-blue-400 text-xs md:text-sm whitespace-pre overflow-x-auto min-w-0">
                  <code className="block">{`// Next.js 15+ (current behavior)
const data = await fetch('/api/data'); 
// ↑ Automatically no-store by default

// Next.js 14 and below (legacy behavior)  
const data = await fetch('/api/data', { 
  cache: 'no-store' 
});
// ↑ Explicit cache needed for SSR

// Both achieve the same result!`}</code>
                </pre>
              </div>
              <div className="space-y-2 text-sm text-gray-600">
                <p>
                  🆕 <span className="font-medium">Next.js 15+</span> - fetch is uncached by default
                </p>
                <p>
                  <RotateCcw className="w-4 h-4 text-orange-600 mr-1 inline" />
                  <span className="font-medium">Next.js 14-</span> - fetch was cached by default
                </p>
                <p>
                  <Scale className="w-4 h-4 text-gray-600 mr-1 inline" />
                  <span className="font-medium">Both work</span> - explicit cache still valid
                </p>
                <p>
                  <Sparkles className="w-4 h-4 text-indigo-600 mr-1 inline" />
                  <span className="font-medium">Cleaner</span> - use defaults when possible
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Code Example */}
        <div className="bg-gray-900 rounded-lg p-4 md:p-6 mb-12 overflow-x-auto">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 space-y-2 sm:space-y-0">
            <h3 className="text-white font-semibold text-sm md:text-base">
              SSR + Suspense Implementation
            </h3>
            <span className="bg-orange-600 text-white px-2 py-1 rounded text-xs self-start">
              default (no-store)
            </span>
          </div>
          <pre className="text-orange-400 text-xs md:text-sm whitespace-pre overflow-x-auto min-w-0">
            <code className="block">{`// Modern SSR with Suspense boundaries
export default async function DashboardPage() {
  return (
    <div>
      <Suspense fallback={<UserSkeleton />}>
        <UserHeader />
      </Suspense>
      
      <Suspense fallback={<StatsSkeleton />}>
        <DashboardStats />
      </Suspense>
    </div>
  );
}`}</code>
          </pre>
        </div>

        {/* SSR Implementation Details */}
        <div className="bg-white rounded-xl shadow-lg p-4 md:p-8 mb-8 md:mb-12">
          <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-6">
            SSR Implementation Details
          </h3>
          <div className="space-y-6 lg:grid lg:grid-cols-2 lg:gap-8 lg:space-y-0">
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Request Details</h4>
              <div className="space-y-3 text-sm">
                <div className="flex flex-col sm:flex-row sm:justify-between gap-1">
                  <span className="text-gray-600">Rendering strategy:</span>
                  <span className="font-mono text-orange-600 break-all">SSR (Server-Side)</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:justify-between gap-1">
                  <span className="text-gray-600">Cache strategy:</span>
                  <span className="font-mono text-orange-600 break-all">no-store (default)</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:justify-between gap-1">
                  <span className="text-gray-600">Data freshness:</span>
                  <span className="text-green-600 font-medium">Real-time</span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Why This Approach?</h4>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 text-sm leading-relaxed">
                    User-specific personalized data
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 text-sm leading-relaxed">
                    Real-time activity feeds
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 text-sm leading-relaxed">
                    Authentication-required content
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 text-sm leading-relaxed">
                    Following modern best practices
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Performance Trade-offs */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mt-6">
            <div className="flex items-center gap-2 mb-4">
              <Zap className="w-4 h-4 text-yellow-600" />
              <h4 className="font-semibold text-gray-900">Performance Trade-offs</h4>
            </div>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-yellow-500 rounded-full flex-shrink-0 mt-2"></div>
                <div>
                  <strong className="text-gray-900">Higher server load</strong>: Each request
                  generates fresh HTML, increasing backend workload compared to cached SSG pages.
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-yellow-500 rounded-full flex-shrink-0 mt-2"></div>
                <div>
                  <strong className="text-gray-900">Performance comparison</strong>: SSR is slower
                  than SSG but faster than CSR for initial page load.
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0 mt-2"></div>
                <div>
                  <strong className="text-gray-900">Best for</strong>: When data freshness outweighs
                  server efficiency concerns.
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* When to Use SSR */}
        <div className="bg-gradient-to-r from-orange-500 to-red-600 rounded-xl text-white p-8 mb-12">
          <h3 className="text-2xl font-bold mb-4">When to Use SSR</h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h4 className="text-lg font-semibold mb-4">Perfect for:</h4>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <Check className="w-5 h-5 mr-3" />
                  User-specific dashboards
                </li>
                <li className="flex items-center">
                  <Check className="w-5 h-5 mr-3" />
                  Real-time content
                </li>
                <li className="flex items-center">
                  <Check className="w-5 h-5 mr-3" />
                  Personalized experiences
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Benefits:</h4>
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
              </ul>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <Link
            href="/rendering-methods/isr"
            className="inline-flex items-center text-orange-600 hover:text-orange-700 font-medium"
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            Previous: ISR Example
          </Link>

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
