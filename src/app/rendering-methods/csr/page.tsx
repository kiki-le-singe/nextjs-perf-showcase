import { Suspense } from 'react'
import { Monitor, Check, X, BookOpen, ChevronRight } from 'lucide-react'
import Link from 'next/link'

import BackTo from '@/components/back-to'
import { CSRDashboard, CSRDashboardSkeleton } from '@/components/rendering-methods/csr/dashboard'

export default function CSRPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-100">
      <div className="container mx-auto px-4 md:px-6 py-8 md:py-12">
        <BackTo href="/rendering-methods" text="Back to Rendering Methods" />

        {/* Brief Intro */}
        <div className="text-center mb-8">
          <h1 className="text-2xl md:text-4xl font-bold text-gray-900 mb-2">
            CSR - Client-Side Rendering
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            The page shell ships instantly, then TanStack Query fetches data in the browser ↓
          </p>

          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 max-w-3xl mx-auto text-left mb-8">
            <p className="text-blue-900">
              <strong>💡 This demo uses TanStack Query for CSR.</strong> The UI loads immediately,
              then client-side requests populate data with caching. Click "Fetch if stale": fresh
              data comes from cache (no request); stale data triggers a network request and updates
              cache.
            </p>
          </div>
        </div>

        {/* Dashboard Demo */}
        <div className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 text-center">
            Interactive CSR Dashboard (Client Components)
          </h2>
          <Suspense fallback={<CSRDashboardSkeleton />}>
            <CSRDashboard />
          </Suspense>
        </div>

        {/* How CSR Works */}
        <div className="text-center mb-8 md:mb-12">
          <div className="inline-flex items-center justify-center w-12 h-12 md:w-16 md:h-16 bg-pink-100 rounded-full mb-4">
            <Monitor className="w-6 h-6 md:w-8 md:h-8 text-pink-600" />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">How does it work?</h2>

          <p className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto mb-8">
            In Next.js App Router, the page shell is server-rendered first, then client-side data
            fetching runs in the browser. TanStack Query keeps data in memory, deduplicates
            requests, and revalidates in the background when data becomes stale.
          </p>

          <div className="grid md:grid-cols-2 gap-6 text-left max-w-4xl mx-auto mb-8">
            <div className="bg-green-50 p-4 rounded-lg border border-green-100">
              <h4 className="font-bold text-green-800 mb-2">CSR strengths:</h4>
              <ul className="space-y-2 text-sm text-green-900">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 flex-shrink-0" /> Instant server-rendered shell, then
                  client-side data fetching
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 flex-shrink-0" /> Rich interactivity and stateful UI
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 flex-shrink-0" /> Automatic caching & request dedupe
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 flex-shrink-0" /> Background refetching on stale data
                </li>
              </ul>
            </div>
            <div className="bg-red-50 p-4 rounded-lg border border-red-100">
              <h4 className="font-bold text-red-800 mb-2">Trade-offs:</h4>
              <ul className="space-y-2 text-sm text-red-900">
                <li className="flex items-center gap-2">
                  <X className="w-4 h-4 flex-shrink-0" /> Limited SEO (data not in HTML)
                </li>
                <li className="flex items-center gap-2">
                  <X className="w-4 h-4 flex-shrink-0" /> Requires JavaScript to render data
                </li>
                <li className="flex items-center gap-2">
                  <X className="w-4 h-4 flex-shrink-0" /> Must design solid loading/error states
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-4 max-w-md mx-auto">
            <div className="flex items-center gap-2 mb-2">
              <Monitor className="w-4 h-4 text-pink-600" />
              <h3 className="font-semibold text-gray-900">CSR vs Server Rendering</h3>
            </div>
            <div className="text-sm text-gray-600 space-y-1">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                <span>SSR/ISR: HTML has data, great for SEO</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                <span>CSR: UI updates fast with client cache</span>
              </div>
              <div className="flex items-center gap-2">
                <Monitor className="w-4 h-4 text-blue-500 flex-shrink-0" />
                <span>Best of both: SSR shell + CSR widgets</span>
              </div>
            </div>
          </div>
        </div>

        {/* Best Practices */}
        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 mb-12">
          <h3 className="flex items-center text-xl md:text-2xl font-bold text-gray-900 mb-6">
            <BookOpen className="w-4 h-4 text-blue-600 mr-2" /> Next.js 16 CSR with TanStack Query
          </h3>

          <div className="mb-4">
            <h4 className="font-semibold text-gray-900 mb-2">
              🟢 Query Client Setup (CSR route-level)
            </h4>
            <div className="bg-gray-900 rounded-lg p-3 md:p-4 overflow-x-auto">
              <pre className="text-blue-400 text-xs md:text-sm whitespace-pre overflow-x-auto min-w-0">
                <code className="block">{`// src/lib/query-client-provider.tsx
'use client'
import { useState } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

export function ClientQueryProvider({ children }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 20_000,
            gcTime: 120_000,
            retry: 1,
            // Demo choice: avoid noisy refetch while switching tabs/windows.
            refetchOnWindowFocus: false,
          },
        },
      })
  )

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}`}</code>
              </pre>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-2">
              🟡 Client Component Query (client file)
            </h4>
            <div className="bg-gray-900 rounded-lg p-3 md:p-4 overflow-x-auto">
              <pre className="text-blue-400 text-xs md:text-sm whitespace-pre overflow-x-auto min-w-0">
                <code className="block">{`'use client'
import { queryOptions, useQueryClient, useSuspenseQuery } from '@tanstack/react-query'

const queryKey = ['csr', 'dashboard'] as const

const dashboardQueryOptions = queryOptions({
  queryKey,
  queryFn: ({ signal }) => fetchDashboard({ signal }),
})

export function DashboardWidget() {
  const queryClient = useQueryClient()
  const { data } = useSuspenseQuery(dashboardQueryOptions)

  const fetchIfStale = () => queryClient.fetchQuery(dashboardQueryOptions)

  return (
    <>
      <Dashboard data={data} />
      <button onClick={fetchIfStale}>Fetch if stale</button>
    </>
  )
}`}</code>
              </pre>
            </div>
          </div>

          <div className="mt-4">
            <h4 className="font-semibold text-gray-900 mb-2">
              🔵 Page Suspense Boundary (server file)
            </h4>
            <div className="bg-gray-900 rounded-lg p-3 md:p-4 overflow-x-auto">
              <pre className="text-blue-400 text-xs md:text-sm whitespace-pre overflow-x-auto min-w-0">
                <code className="block">{`import { Suspense } from 'react'

export default function CSRPage() {
  return (
    <Suspense fallback={<Skeleton />}>
      <DashboardWidget />
    </Suspense>
  )
}`}</code>
              </pre>
            </div>
          </div>
        </div>

        {/* When to Use CSR */}
        <div className="bg-gradient-to-r from-pink-500 to-purple-600 rounded-xl text-white p-8 mb-12">
          <h3 className="text-2xl font-bold mb-6">When to Use CSR</h3>
          <p className="mb-6 font-medium bg-white/10 p-4 rounded-lg">
            CSR shines when interactivity matters more than SEO, and data must feel instant for the
            user.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h4 className="text-lg font-semibold mb-4">Examples:</h4>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <Check className="w-5 h-5 mr-3" />
                  Admin dashboards
                </li>
                <li className="flex items-center">
                  <Check className="w-5 h-5 mr-3" />
                  Analytics workspaces
                </li>
                <li className="flex items-center">
                  <Check className="w-5 h-5 mr-3" />
                  Authenticated portals
                </li>
                <li className="flex items-center">
                  <Check className="w-5 h-5 mr-3" />
                  Complex forms
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Key benefits:</h4>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <Check className="w-5 h-5 mr-3" />
                  Smooth transitions
                </li>
                <li className="flex items-center">
                  <Check className="w-5 h-5 mr-3" />
                  Client-side cache
                </li>
                <li className="flex items-center">
                  <Check className="w-5 h-5 mr-3" />
                  Less server compute for data fetching
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Key trade-offs:</h4>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <X className="w-5 h-5 mr-3" />
                  Weak SEO for data-rich pages
                </li>
                <li className="flex items-center">
                  <X className="w-5 h-5 mr-3" />
                  JS required to render data
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <BackTo
            href="/rendering-methods/ssr"
            text="Previous: SSR Example"
            className="inline-flex items-center text-pink-600 hover:text-pink-700 font-medium"
            iconPosition="left"
          />

          <Link
            href="/rendering-methods/ssg"
            className="inline-flex items-center text-pink-600 hover:text-pink-700 font-medium"
          >
            Next: SSG Example
            <ChevronRight className="w-4 h-4 ml-2" />
          </Link>
        </div>
      </div>
    </div>
  )
}
