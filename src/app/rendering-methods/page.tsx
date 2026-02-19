import Image from 'next/image'
import Link from 'next/link'

import BackTo from '@/components/back-to'

export default function RenderingMethodsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100">
      <div className="container mx-auto px-6 py-12">
        {/* Back to Home Navigation */}
        <BackTo />

        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            <Image
              className="mx-auto mb-4"
              src="/next.svg"
              alt="Next.js logo"
              width={240}
              height={50}
              priority
            />
            Next.js Rendering Methods
          </h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto">
            Discover the main rendering strategies in Next.js 16: SSG, ISR (Page-Level and
            Component-Level), Server-Side Rendering (SSR), and Client-Side Rendering (CSR). Learn
            when and how to use each method for optimal performance.
          </p>
        </div>

        {/* Methods Grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-16">
          {/* SSG Card */}
          <Link href="/rendering-methods/ssg" className="group">
            <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-8 border border-gray-200 group-hover:border-teal-300">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center mr-4">
                  <svg
                    className="w-6 h-6 text-teal-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"
                    />
                  </svg>
                </div>
                <div>
                  <h2 className="text-2xl font-semibold text-gray-900">SSG</h2>
                  <p className="text-sm text-gray-500">Static Site Generation</p>
                </div>
              </div>
              <p className="text-gray-600 mb-6">
                Truly static pages with hardcoded content. Generated once at build time, never
                revalidated. No fetch, no API calls — pure HTML served from CDN.
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                <span className="px-3 py-1 bg-teal-100 text-teal-800 text-sm rounded-full">
                  no fetch
                </span>
                <span className="px-3 py-1 bg-teal-100 text-teal-800 text-sm rounded-full">
                  build time
                </span>
                <span className="px-3 py-1 bg-teal-100 text-teal-800 text-sm rounded-full">
                  truly static
                </span>
              </div>
              <div className="text-sm text-gray-500 mb-4">
                <strong>Best for:</strong> Documentation, landing pages, marketing sites
              </div>
              <div className="flex items-center text-teal-600 font-medium group-hover:text-teal-700">
                View SSG Example
                <svg
                  className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </div>
          </Link>

          {/* ISR Page-Level Card */}
          <Link href="/rendering-methods/isr-page" className="group">
            <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-8 border border-gray-200 group-hover:border-green-300">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4">
                  <svg
                    className="w-6 h-6 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                    />
                  </svg>
                </div>
                <div>
                  <h2 className="text-2xl font-semibold text-gray-900">ISR Page-Level</h2>
                  <p className="text-sm text-gray-500">ISR - Page-Level Cache</p>
                </div>
              </div>
              <p className="text-gray-600 mb-6">
                Cached at build time with automatic revalidation every 15 min. The simplest ISR
                pattern — just add &apos;use cache&apos; without explicit cacheLife.
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                <span className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full">
                  &apos;use cache&apos;
                </span>
                <span className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full">
                  page-level cache
                </span>
                <span className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full">
                  15 min revalidate
                </span>
              </div>
              <div className="text-sm text-gray-500 mb-4">
                <strong>Best for:</strong> Blog posts, documentation, stable content
              </div>
              <div className="flex items-center text-green-600 font-medium group-hover:text-green-700">
                View ISR Page-Level Example
                <svg
                  className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </div>
          </Link>

          {/* ISR Card */}
          <Link href="/rendering-methods/isr" className="group">
            <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-8 border border-gray-200 group-hover:border-blue-300">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                  <svg
                    className="w-6 h-6 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                    />
                  </svg>
                </div>
                <div>
                  <h2 className="text-2xl font-semibold text-gray-900">ISR</h2>
                  <p className="text-sm text-gray-500">Incremental Static Regeneration</p>
                </div>
              </div>
              <p className="text-gray-600 mb-6">
                Static pages that automatically regenerate in the background after a specified time.
                Combines static performance with the freshness of dynamic content.
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                  cacheLife({'{...}'})
                </span>
                <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                  Background Sync
                </span>
                <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                  Auto-Update
                </span>
              </div>
              <div className="text-sm text-gray-500 mb-4">
                <strong>Best for:</strong> Product catalogs, articles with updates, news feeds
              </div>
              <div className="flex items-center text-blue-600 font-medium group-hover:text-blue-700">
                View ISR Example
                <svg
                  className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </div>
          </Link>

          {/* SSR Card */}
          <Link href="/rendering-methods/ssr" className="group">
            <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-8 border border-gray-200 group-hover:border-orange-300">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mr-4">
                  <svg
                    className="w-6 h-6 text-orange-600"
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
                <div>
                  <h2 className="text-2xl font-semibold text-gray-900">SSR</h2>
                  <p className="text-sm text-gray-500">Server-Side Rendering</p>
                </div>
              </div>
              <p className="text-gray-600 mb-6">
                HTML generated on each request with always fresh data. Perfect for dynamic,
                personalized content that changes frequently.
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                <span className="px-3 py-1 bg-orange-100 text-orange-800 text-sm rounded-full">
                  no cache
                </span>
                <span className="px-3 py-1 bg-orange-100 text-orange-800 text-sm rounded-full">
                  Request Time
                </span>
                <span className="px-3 py-1 bg-orange-100 text-orange-800 text-sm rounded-full">
                  Always Fresh
                </span>
              </div>
              <div className="text-sm text-gray-500 mb-4">
                <strong>Best for:</strong> User dashboards, real-time data, personalized content
              </div>
              <div className="flex items-center text-orange-600 font-medium group-hover:text-orange-700">
                View SSR Example
                <svg
                  className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </div>
          </Link>

          {/* CSR Card */}
          <Link href="/rendering-methods/csr" className="group">
            <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-8 border border-gray-200 group-hover:border-pink-300">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center mr-4">
                  <svg
                    className="w-6 h-6 text-pink-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <div>
                  <h2 className="text-2xl font-semibold text-gray-900">CSR</h2>
                  <p className="text-sm text-gray-500">Client-Side Rendering</p>
                </div>
              </div>
              <p className="text-gray-600 mb-6">
                Page served statically, then React fetches data in the browser. Highly interactive
                with smooth user experience, but requires JavaScript.
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                <span className="px-3 py-1 bg-pink-100 text-pink-800 text-sm rounded-full">
                  "use client"
                </span>
                <span className="px-3 py-1 bg-pink-100 text-pink-800 text-sm rounded-full">
                  useSuspenseQuery
                </span>
                <span className="px-3 py-1 bg-pink-100 text-pink-800 text-sm rounded-full">
                  Interactive
                </span>
              </div>
              <div className="text-sm text-gray-500 mb-4">
                <strong>Best for:</strong> Interactive dashboards, filters, complex UI components
              </div>
              <div className="flex items-center text-pink-600 font-medium group-hover:text-pink-700">
                View CSR Example
                <svg
                  className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </div>
          </Link>
        </div>

        {/* Comparison Table */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Quick Comparison</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Method</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">
                    When Generated
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">
                    Data Freshness
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Performance</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">SEO</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-4">
                    <span className="font-medium text-teal-600">SSG</span>
                  </td>
                  <td className="py-3 px-4 text-gray-600">Build time only</td>
                  <td className="py-3 px-4 text-gray-600">Frozen until redeploy</td>
                  <td className="py-3 px-4">
                    <span className="text-green-600 font-medium">Fastest</span>
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-green-600 font-medium">Excellent</span>
                  </td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-4">
                    <span className="font-medium text-green-600">ISR Page-Level</span>
                  </td>
                  <td className="py-3 px-4 text-gray-600">Build + revalidate (15 min)</td>
                  <td className="py-3 px-4 text-gray-600">Auto-revalidates (15 min)</td>
                  <td className="py-3 px-4">
                    <span className="text-green-600 font-medium">Excellent</span>
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-green-600 font-medium">Excellent</span>
                  </td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-4">
                    <span className="font-medium text-blue-600">ISR</span>
                  </td>
                  <td className="py-3 px-4 text-gray-600">Build + background regeneration</td>
                  <td className="py-3 px-4 text-gray-600">Updated automatically</td>
                  <td className="py-3 px-4">
                    <span className="text-green-600 font-medium">Excellent</span>
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-green-600 font-medium">Excellent</span>
                  </td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-4">
                    <span className="font-medium text-orange-600">SSR</span>
                  </td>
                  <td className="py-3 px-4 text-gray-600">Each request</td>
                  <td className="py-3 px-4 text-gray-600">Always fresh</td>
                  <td className="py-3 px-4">
                    <span className="text-yellow-600 font-medium">Good</span>
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-green-600 font-medium">Excellent</span>
                  </td>
                </tr>
                <tr>
                  <td className="py-3 px-4">
                    <span className="font-medium text-pink-600">CSR</span>
                  </td>
                  <td className="py-3 px-4 text-gray-600">Client-side</td>
                  <td className="py-3 px-4 text-gray-600">Real-time</td>
                  <td className="py-3 px-4">
                    <span className="text-yellow-600 font-medium">Good</span>
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-red-600 font-medium">Limited</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Back Link */}
        <div className="text-center">
          <BackTo
            text="Back to Performance Showcase"
            className="inline-flex items-center text-purple-600 hover:text-purple-700 font-medium"
          />
        </div>
      </div>
    </div>
  )
}
