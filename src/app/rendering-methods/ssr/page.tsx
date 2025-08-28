import Link from "next/link";
import { Suspense } from "react";

import { UserHeader } from "@/components/rendering-methods/ssr/user-header";
import { UserHeaderSkeleton } from "@/components/rendering-methods/ssr/user-header-skeleton";
import { DashboardStats } from "@/components/rendering-methods/ssr/dashboard-stats";
import { StatsSkeleton } from "@/components/rendering-methods/ssr/dashboard-stats-skeleton";
import { DashboardContent } from "@/components/rendering-methods/ssr/dashboard-content";
import { DashboardContentSkeleton } from "@/components/rendering-methods/ssr/dashboard-content-skeleton";



export default async function SSRPage() {
  // SSR: Fresh data on every request (default behavior in Next.js 15+)
  console.log('🔧 [SSR] Starting server-side rendering at:', new Date().toISOString());
  
  const requestTime = new Date().toISOString();
  console.log('🔧 [SSR] Page render completed at:', requestTime);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-100">
      <div className="container mx-auto px-4 md:px-6 py-8 md:py-12">
        {/* Brief Intro */}
        <div className="text-center mb-8">
          <h1 className="text-2xl md:text-4xl font-bold text-gray-900 mb-2">
            SSR - Server-Side Rendering
          </h1>
          <p className="text-lg text-gray-600">
            Experience personalized, real-time dashboard content ↓
          </p>
        </div>

        {/* User Header with Suspense */}
        <Suspense fallback={<UserHeaderSkeleton />}>
          <UserHeader />
        </Suspense>

        {/* Dashboard Stats with Suspense */}
        <Suspense fallback={<StatsSkeleton />}>
          <DashboardStats />
        </Suspense>

        {/* Dashboard Content with Suspense */}
        <Suspense fallback={<DashboardContentSkeleton />}>
          <DashboardContent />
        </Suspense>


        {/* SSR Explanation */}
        <div className="text-center mb-8 md:mb-12">
          <div className="inline-flex items-center justify-center w-12 h-12 md:w-16 md:h-16 bg-orange-100 rounded-full mb-4">
            <svg
              className="w-6 h-6 md:w-8 md:h-8 text-orange-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            How SSR Works
          </h2>
          <p className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto mb-6">
            The dashboard above demonstrates modern SSR using <code className="bg-gray-100 px-2 py-1 rounded text-sm">default behavior</code>. 
            All data was generated fresh on the server with real-time, user-specific content.
          </p>
          
          {/* Request Time Info */}
          <div className="bg-white rounded-lg shadow-md p-4 max-w-md mx-auto">
            <h3 className="font-semibold text-gray-900 mb-2">⚡ SSR Benefits</h3>
            <div className="text-sm text-gray-600 space-y-1">
              <p>✅ Always fresh data</p>
              <p>✅ Personalized content</p>
              <p>✅ Real-time updates</p>
              <p>✅ Perfect SEO</p>
              <p className="text-xs pt-2 border-t">
                <span className="font-medium">Generated on request:</span><br />
                {new Date(requestTime).toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        {/* SSR Best Practice Section */}
        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 mb-12">
          <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-6">SSR Best Practice</h3>
          <div className="space-y-8 lg:grid lg:grid-cols-2 lg:gap-8 lg:space-y-0">
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">✅ Cleanest Approach (Default)</h4>
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
                <p>🧹 <span className="font-medium">Cleanest code</span> - leverages framework defaults</p>
                <p>🚀 <span className="font-medium">Modern approach</span> - Next.js 15+ behavior</p>
                <p>⚡ <span className="font-medium">Same result</span> - fresh data on every request</p>
                <p>📝 <span className="font-medium">Less verbose</span> - no redundant cache options</p>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">📚 Version Differences</h4>
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
                <p>🆕 <span className="font-medium">Next.js 15+</span> - fetch is uncached by default</p>
                <p>⏪ <span className="font-medium">Next.js 14-</span> - fetch was cached by default</p>
                <p>⚖️ <span className="font-medium">Both work</span> - explicit cache still valid</p>
                <p>✨ <span className="font-medium">Cleaner</span> - use defaults when possible</p>
              </div>
            </div>
          </div>
        </div>

        {/* Code Example */}
        <div className="bg-gray-900 rounded-lg p-4 md:p-6 mb-12 overflow-x-auto">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 space-y-2 sm:space-y-0">
            <h3 className="text-white font-semibold text-sm md:text-base">SSR + Suspense Implementation</h3>
            <span className="bg-orange-600 text-white px-2 py-1 rounded text-xs self-start">default (no-store)</span>
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
          <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-6">SSR Implementation Details</h3>
          <div className="space-y-6 lg:grid lg:grid-cols-2 lg:gap-8 lg:space-y-0">
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Request Details</h4>
              <div className="space-y-3 text-sm">
                <div className="flex flex-col sm:flex-row sm:justify-between gap-1">
                  <span className="text-gray-600">Generated at:</span>
                  <span className="font-mono text-gray-900 break-all">{new Date(requestTime).toLocaleTimeString()}</span>
                </div>
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
                  <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700 text-sm leading-relaxed">User-specific personalized data</span>
                </div>
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700 text-sm leading-relaxed">Real-time activity feeds</span>
                </div>
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700 text-sm leading-relaxed">Authentication-required content</span>
                </div>
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700 text-sm leading-relaxed">Following modern best practices</span>
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
                  <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  User-specific dashboards
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Real-time content
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Personalized experiences
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Benefits:</h4>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Perfect SEO
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Instant content display
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
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
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Previous: ISR Example
          </Link>
          
          <Link
            href="/rendering-methods/csr"
            className="inline-flex items-center text-orange-600 hover:text-orange-700 font-medium"
          >
            Next: CSR Example
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}