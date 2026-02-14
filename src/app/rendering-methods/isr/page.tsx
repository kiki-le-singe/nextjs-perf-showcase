import Link from 'next/link'
import { Check, X, ChevronRight, Zap } from 'lucide-react'
import { Suspense } from 'react'

import BackTo from '@/components/back-to'
import { ProductsSection } from '@/components/rendering-methods/isr/products-section'
import { ProductsSectionSkeleton } from '@/components/rendering-methods/isr/products-section-skeleton'

export default function ISRPage() {
  return (
    <div className="min-h-screen bg-linear-to-br from-purple-50 to-indigo-100">
      <div className="container mx-auto px-4 md:px-6 py-8 md:py-12">
        <BackTo href="/rendering-methods" text="Back to Rendering Methods" />

        {/* Header - More Compact */}
        <div className="text-center mb-6">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            ISR - Incremental Static Regeneration
          </h1>
          <p className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto mb-6">
            ISR combines the best of SSG and SSR: static performance with automatic updates.
          </p>
        </div>

        {/* Products Section with Suspense - Component-Level Caching */}
        <Suspense fallback={<ProductsSectionSkeleton />}>
          <ProductsSection />
        </Suspense>

        {/* ISR Behavior Explanation - MOVED DOWN */}
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
                ].map(step => (
                  <div key={step.num} className="flex items-start">
                    <div className="shrink-0 w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mr-3">
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
                ].map(benefit => (
                  <div key={benefit} className="flex items-center">
                    <Check className="w-5 h-5 text-green-500 mr-3 shrink-0" />
                    <span className="text-gray-700 text-sm">{benefit}</span>
                  </div>
                ))}
              </div>

              <h3 className="font-semibold text-gray-900 mb-4">Trade-offs</h3>
              <div className="space-y-3">
                {['Data may be slightly stale', 'Complexity in cache invalidation'].map(
                  tradeoff => (
                    <div key={tradeoff} className="flex items-center">
                      <X className="w-5 h-5 text-orange-500 mr-3 shrink-0" />
                      <span className="text-gray-700 text-sm">{tradeoff}</span>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Next.js 16 Code Example */}
        <div className="bg-gray-900 rounded-lg p-4 md:p-6 mb-8 md:mb-12 overflow-x-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-2">
            <h3 className="text-white font-semibold">
              Next.js 16 ISR Implementation (Modern Pattern)
            </h3>
            <div className="flex gap-2 flex-wrap">
              <span className="bg-purple-600 text-white px-2 py-1 rounded text-xs">use cache</span>
              <span className="bg-blue-600 text-white px-2 py-1 rounded text-xs">Suspense</span>
              <span className="bg-indigo-600 text-white px-2 py-1 rounded text-xs">
                component-level
              </span>
            </div>
          </div>
          <pre className="text-blue-400 text-xs md:text-sm overflow-x-auto">
            <code>{`// ISR with Next.js 16 - Component-Level Caching
import { cacheLife, cacheTag } from 'next/cache'
import { Suspense } from 'react'

// Page - Just layout (not cached)
export default function ProductsPage() {
  return (
    <div>
      <Header />  {/* Static content */}

      <Suspense fallback={<ProductsSkeleton />}>
        <ProductsSection />  {/* Cached component */}
      </Suspense>

      <Footer />  {/* Static content */}
    </div>
  )
}

// Cached component - This is where ISR happens
async function ProductsSection() {
  'use cache'              // Component-level cache

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
  revalidateTag('products', 'max')  // Stale-while-revalidate
}`}</code>
          </pre>
        </div>

        {/* When to Use ISR */}
        <div className="bg-linear-to-r from-purple-500 to-indigo-600 rounded-xl text-white p-6 md:p-8 mb-8 md:mb-12">
          <h3 className="text-xl md:text-2xl font-bold mb-2">When to Use ISR</h3>
          <p className="text-sm text-purple-100 mb-4">
            Non-exhaustive examples to guide the decision between ISR and other rendering methods.
          </p>
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
            SSG vs ISR vs SSR vs CSR
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold text-gray-900 bg-green-50">
                    Feature
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">SSG</th>
                  <th className="text-left py-3 px-4 font-semibold text-purple-600 bg-purple-50">
                    ISR
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">SSR</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">CSR</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                <tr>
                  <td className="py-3 px-4 font-medium text-gray-900 bg-green-50">Performance</td>
                  <td className="py-3 px-4 text-gray-900">
                    <Zap className="w-5 h-5 text-green-500 inline" /> Fastest
                  </td>
                  <td className="py-3 px-4 text-gray-900 bg-purple-50">
                    <Zap className="w-5 h-5 text-green-500 inline" /> Fast
                  </td>
                  <td className="py-3 px-4 text-gray-900">
                    <Zap className="w-5 h-5 text-yellow-500 inline" /> Slower
                  </td>
                  <td className="py-3 px-4 text-gray-900">
                    <Zap className="w-5 h-5 text-yellow-500 inline" /> Variable
                  </td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-medium text-gray-900 bg-green-50">
                    Content Freshness
                  </td>
                  <td className="py-3 px-4 text-gray-900">Static (build time)</td>
                  <td className="py-3 px-4 text-gray-900 bg-purple-50">Auto-updates</td>
                  <td className="py-3 px-4 text-gray-900">Always fresh</td>
                  <td className="py-3 px-4 text-gray-900">Real-time possible</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-medium text-gray-900 bg-green-50">SEO</td>
                  <td className="py-3 px-4 text-gray-900">
                    <Check className="w-5 h-5 text-green-500 inline" /> Excellent
                  </td>
                  <td className="py-3 px-4 text-gray-900 bg-purple-50">
                    <Check className="w-5 h-5 text-green-500 inline" /> Excellent
                  </td>
                  <td className="py-3 px-4 text-gray-900">
                    <Check className="w-5 h-5 text-green-500 inline" /> Excellent
                  </td>
                  <td className="py-3 px-4 text-gray-900">
                    <X className="w-5 h-5 text-red-500 inline" /> Limited
                  </td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-medium text-gray-900 bg-green-50">Build Time</td>
                  <td className="py-3 px-4 text-gray-900">Can be long</td>
                  <td className="py-3 px-4 text-gray-900 bg-purple-50">Fast (on-demand)</td>
                  <td className="py-3 px-4 text-gray-900">N/A</td>
                  <td className="py-3 px-4 text-gray-900">Fast</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-medium text-gray-900 bg-green-50">Server Load</td>
                  <td className="py-3 px-4 text-gray-900">
                    <Check className="w-5 h-5 text-green-500 inline" /> Minimal
                  </td>
                  <td className="py-3 px-4 text-gray-900 bg-purple-50">
                    <Check className="w-5 h-5 text-green-500 inline" /> Low
                  </td>
                  <td className="py-3 px-4 text-gray-900">
                    <X className="w-5 h-5 text-red-500 inline" /> High
                  </td>
                  <td className="py-3 px-4 text-gray-900">
                    <Check className="w-5 h-5 text-green-500 inline" /> Minimal
                  </td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-medium text-gray-900 bg-green-50">Best For</td>
                  <td className="py-3 px-4 text-gray-900">Static content</td>
                  <td className="py-3 px-4 text-gray-900 bg-purple-50">Changing content</td>
                  <td className="py-3 px-4 text-gray-900">Real-time data</td>
                  <td className="py-3 px-4 text-gray-900">Interactive apps</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <BackTo
            href="/rendering-methods/isr-page"
            text="Previous: ISR Page-Level Example"
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
