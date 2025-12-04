import Link from 'next/link'
import { cacheLife, cacheTag } from 'next/cache'
import { Check, X, ChevronRight, Zap } from 'lucide-react'

import BackTo from '@/components/back-to'
import { fetchProductsData } from '@/lib/api'
import { ProductCard } from '@/components/rendering-methods/isr/product-card'
import { RevalidateButton } from '@/components/rendering-methods/isr/revalidate-button'

export default async function ISRPage() {
  'use cache' // Next.js 16: Use 'use cache' directive for ISR
  cacheLife({
    stale: 60, // Serve stale content after 60 seconds
    revalidate: 120, // Revalidate in background after 2 minutes
    expire: 3600, // Expire completely after 1 hour
  })
  cacheTag('products')

  // This data is cached and revalidated based on cacheLife settings
  const productsData = await fetchProductsData()
  const generatedAt = new Date().toISOString()
  const dataVersion = productsData[0]?.lastUpdated || generatedAt

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100">
      <div className="container mx-auto px-4 md:px-6 py-8 md:py-12">
        <BackTo href="/rendering-methods" text="Back to Rendering Methods" />

        {/* Header */}
        <div className="text-center mb-8 md:mb-12">
          <div className="inline-flex items-center justify-center w-12 h-12 md:w-16 md:h-16 bg-purple-100 rounded-full mb-4">
            <svg
              className="w-6 h-6 md:w-8 md:h-8 text-purple-600"
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
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            ISR - Incremental Static Regeneration
          </h1>
          <p className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto mb-6">
            ISR combines the best of SSG and SSR: static performance with automatic updates.
            Content is cached and revalidated in the background.
          </p>

          {/* Generation Time Info */}
          <div className="bg-white rounded-lg shadow-md p-4 max-w-md mx-auto mb-6">
            <h3 className="font-semibold text-gray-900 mb-2">🔄 ISR Configuration</h3>
            <div className="text-sm text-gray-600 space-y-1">
              <p>
                <span className="font-medium">Stale after:</span> 60 seconds
              </p>
              <p>
                <span className="font-medium">Revalidate:</span> 2 minutes
              </p>
              <p>
                <span className="font-medium">Expires:</span> 1 hour
              </p>
              <p className="text-xs pt-2 border-t">
                <span className="font-medium">Page cached at:</span>
                <br />
                {new Date(generatedAt).toLocaleString()}
              </p>
              <p className="text-xs pt-2 border-t">
                <span className="font-medium">Data fetched at:</span>
                <br />
                <span className="font-mono text-purple-600 font-semibold">
                  {new Date(dataVersion).toLocaleString()}
                </span>
              </p>
            </div>
          </div>

          {/* Big visual indicator */}
          <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl p-4 max-w-2xl mx-auto mb-6 shadow-lg">
            <div className="text-center">
              <p className="text-sm font-medium mb-1">Cached Data Version</p>
              <p className="text-2xl font-bold font-mono">
                {new Date(dataVersion).toLocaleTimeString()}
              </p>
              <p className="text-xs mt-2 opacity-90">
                👆 This timestamp shows when the data was fetched from the API.
                It will stay the same until you revalidate or the cache expires!
              </p>
            </div>
          </div>

          {/* On-Demand Revalidation Button */}
          <div className="bg-gradient-to-r from-purple-100 to-indigo-100 rounded-xl p-6 max-w-2xl mx-auto">
            <h3 className="text-lg font-bold text-gray-900 mb-4">
              Try On-Demand Revalidation
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Click below to trigger immediate cache revalidation using{' '}
              <code className="bg-white px-2 py-1 rounded text-xs">
                revalidateTag('products', 'max')
              </code>
            </p>
            <RevalidateButton />
          </div>
        </div>

        {/* ISR Behavior Explanation */}
        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 mb-8 md:mb-12">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-6">How ISR Works</h2>

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">The Process</h3>
              <div className="space-y-4">
                {[
                  {
                    num: 1,
                    title: 'Initial Build',
                    desc: 'Page generated statically at build time or first request',
                  },
                  {
                    num: 2,
                    title: 'Static Serving',
                    desc: 'Fast cached page served to users (static performance)',
                  },
                  {
                    num: 3,
                    title: 'Stale Period',
                    desc: 'After 60s, page becomes stale but still served instantly',
                  },
                  {
                    num: 4,
                    title: 'Background Revalidation',
                    desc: 'After 2min, Next.js regenerates in background',
                  },
                  {
                    num: 5,
                    title: 'Updated Content',
                    desc: 'New version replaces cache, served to next visitors',
                  },
                ].map((step) => (
                  <div key={step.num} className="flex items-start">
                    <div className="flex-shrink-0 w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mr-3">
                      <span className="text-purple-600 font-semibold text-sm">{step.num}</span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{step.title}</p>
                      <p className="text-gray-600 text-sm">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Key Benefits</h3>
              <div className="space-y-3 mb-6">
                {[
                  'Performance of static sites (instant load)',
                  'Content stays fresh automatically',
                  'No full rebuild needed for updates',
                  'Excellent SEO (fully rendered HTML)',
                  'Handles traffic spikes gracefully',
                  'Stale-while-revalidate pattern',
                ].map((benefit) => (
                  <div key={benefit} className="flex items-center">
                    <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                    <span className="text-gray-700 text-sm">{benefit}</span>
                  </div>
                ))}
              </div>

              <h3 className="font-semibold text-gray-900 mb-4">Trade-offs</h3>
              <div className="space-y-3">
                {[
                  'Data may be slightly stale',
                  'Complexity in cache invalidation',
                ].map((tradeoff) => (
                  <div key={tradeoff} className="flex items-center">
                    <X className="w-5 h-5 text-orange-500 mr-3 flex-shrink-0" />
                    <span className="text-gray-700 text-sm">{tradeoff}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Next.js 16 Code Example */}
        <div className="bg-gray-900 rounded-lg p-4 md:p-6 mb-8 md:mb-12 overflow-x-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-2">
            <h3 className="text-white font-semibold">Next.js 16 ISR Implementation</h3>
            <div className="flex gap-2 flex-wrap">
              <span className="bg-purple-600 text-white px-2 py-1 rounded text-xs">
                use cache
              </span>
              <span className="bg-blue-600 text-white px-2 py-1 rounded text-xs">
                cacheLife
              </span>
              <span className="bg-indigo-600 text-white px-2 py-1 rounded text-xs">
                cacheTag
              </span>
            </div>
          </div>
          <pre className="text-blue-400 text-xs md:text-sm overflow-x-auto">
            <code>{`// ISR with Next.js 16 Cache Components
import { cacheLife, cacheTag } from 'next/cache'

export default async function ProductsPage() {
  'use cache'              // Enable caching (Next.js 16)

  cacheLife({
    stale: 60,             // Fresh for 60s
    revalidate: 120,       // Revalidate after 2min
    expire: 3600,          // Expire after 1h
  })

  cacheTag('products')     // Tag for on-demand revalidation

  const products = await fetchProducts()

  return <ProductGrid products={products} />
}

// On-demand revalidation with Server Action
'use server'
import { revalidateTag } from 'next/cache'

export async function updateProduct() {
  // After updating a product...
  revalidateTag('products', 'max')  // Stale-while-revalidate
}`}</code>
          </pre>
        </div>

        {/* Products Grid */}
        <div className="mb-8 md:mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Product Catalog (Live Demo)</h2>
          <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 mb-6">
            <p className="text-sm text-yellow-900">
              <strong>📊 Real ISR Demo:</strong> The backend API generates random data on every request
              (prices, stock levels, discounts change). But you're seeing cached data!
              The <strong className="text-purple-600">Data Version timestamp</strong> above proves the cache is working.
              Click <strong>"Revalidate Now"</strong> to fetch fresh data and watch everything update! 🔄
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {productsData.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>

        {/* When to Use ISR */}
        <div className="bg-gradient-to-r from-purple-500 to-indigo-600 rounded-xl text-white p-6 md:p-8 mb-8 md:mb-12">
          <h3 className="text-xl md:text-2xl font-bold mb-4">When to Use ISR</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-3 flex items-center">
                <Check className="w-5 h-5 mr-2" />
                Perfect for:
              </h4>
              <ul className="space-y-2 text-purple-100 text-sm">
                <li>• E-commerce product catalogs</li>
                <li>• News and blog sites</li>
                <li>• Marketing pages with analytics</li>
                <li>• API-driven content that updates regularly</li>
                <li>• High-traffic sites with changing data</li>
                <li>• CMS-backed content pages</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3 flex items-center">
                <X className="w-5 h-5 mr-2" />
                Consider alternatives for:
              </h4>
              <ul className="space-y-2 text-purple-100 text-sm">
                <li>• Real-time data (use SSR)</li>
                <li>• User-specific content (use SSR + cache)</li>
                <li>• Completely static content (use SSG)</li>
                <li>• Content requiring authentication (use SSR)</li>
                <li>• Sub-second data freshness requirements</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Comparison with Other Methods */}
        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 mb-8 md:mb-12">
          <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-6">
            ISR vs SSG vs SSR
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Feature</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">SSG</th>
                  <th className="text-left py-3 px-4 font-semibold text-purple-600">ISR</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">SSR</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                <tr>
                  <td className="py-3 px-4 font-medium">Performance</td>
                  <td className="py-3 px-4">
                    <Zap className="w-5 h-5 text-green-500 inline" /> Fastest
                  </td>
                  <td className="py-3 px-4">
                    <Zap className="w-5 h-5 text-green-500 inline" /> Fast
                  </td>
                  <td className="py-3 px-4">
                    <Zap className="w-5 h-5 text-yellow-500 inline" /> Slower
                  </td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-medium">Content Freshness</td>
                  <td className="py-3 px-4">Static (build time)</td>
                  <td className="py-3 px-4 font-semibold text-purple-600">
                    Auto-updates
                  </td>
                  <td className="py-3 px-4">Always fresh</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-medium">Build Time</td>
                  <td className="py-3 px-4">Can be long</td>
                  <td className="py-3 px-4 font-semibold text-purple-600">Fast (on-demand)</td>
                  <td className="py-3 px-4">N/A</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-medium">Server Load</td>
                  <td className="py-3 px-4">
                    <Check className="w-5 h-5 text-green-500 inline" /> Minimal
                  </td>
                  <td className="py-3 px-4">
                    <Check className="w-5 h-5 text-green-500 inline" /> Low
                  </td>
                  <td className="py-3 px-4">
                    <X className="w-5 h-5 text-red-500 inline" /> High
                  </td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-medium">Best For</td>
                  <td className="py-3 px-4">Static content</td>
                  <td className="py-3 px-4 font-semibold text-purple-600">
                    Changing content
                  </td>
                  <td className="py-3 px-4">Real-time data</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <BackTo
            href="/rendering-methods/ssg"
            text="Previous: SSG Example"
            className="inline-flex items-center text-purple-600 hover:text-purple-700 font-medium"
          />

          <Link
            href="/rendering-methods/ssr"
            className="inline-flex items-center text-purple-600 hover:text-purple-700 font-medium"
          >
            Next: SSR Example
            <ChevronRight className="w-4 h-4 ml-2" />
          </Link>
        </div>
      </div>
    </div>
  )
}
