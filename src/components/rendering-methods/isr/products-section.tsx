import { cacheLife, cacheTag } from 'next/cache'

import { fetchProductsData } from '@/lib/api'

import { ProductCard } from './product-card'
import { RevalidateButton } from './revalidate-button'

export async function ProductsSection() {
  'use cache' // Next.js 16: Component-level caching for ISR
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
    <>
      {/* Compact Info Box */}
      <div className="bg-gradient-to-r from-purple-100 to-indigo-100 rounded-xl p-4 max-w-2xl mx-auto mb-4">
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="text-left">
            <p className="text-xs text-gray-700 mb-1">Cache Config:</p>
            <p className="text-sm font-semibold text-gray-900">Stale: 60s | Revalidate: 2m</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-700 mb-1">Data Version:</p>
            <p className="text-sm font-mono font-bold text-purple-700">
              {new Date(dataVersion).toLocaleTimeString()}
            </p>
          </div>
        </div>
        <div className="flex items-center justify-center gap-4">
          <RevalidateButton />
        </div>
      </div>

      {/* Products Grid */}
      <div className="mb-8 md:mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Product Catalog (Live Demo)</h2>
        <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 mb-6">
          <p className="text-sm text-yellow-900">
            <strong>📊 Real ISR Demo:</strong> The backend API generates random data on every
            request (prices, stock levels, discounts change). But you're seeing cached data! The{' '}
            <strong className="text-purple-600">Data Version timestamp</strong> above proves the
            cache is working. Click <strong>"Revalidate Now"</strong> to fetch fresh data and watch
            everything update! 🔄
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {productsData.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </>
  )
}
