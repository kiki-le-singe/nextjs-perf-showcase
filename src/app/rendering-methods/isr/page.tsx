import Link from "next/link";
import { fetchProductsData } from "@/lib/api";

// ISR: Fetch products with revalidation every 60 seconds
async function getProducts() {
  return fetchProductsData({
    next: { revalidate: 60 } // ISR: Revalidate every 60 seconds
  });
}

export default async function ISRPage() {
  // This data is generated at build time, then regenerated every 60 seconds
  const productsData = await getProducts();
  const generatedAt = new Date().toISOString();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
            <svg
              className="w-8 h-8 text-blue-600"
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
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            ISR - Incremental Static Regeneration
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-6">
            This product catalog demonstrates ISR using <code className="bg-gray-100 px-2 py-1 rounded text-sm">fetch(..., {`{ next: { revalidate: 60 } }`})</code>. 
            The page is statically generated but automatically regenerates in the background every 60 seconds.
          </p>
          
          {/* Generation Time Info */}
          <div className="bg-white rounded-lg shadow-md p-4 max-w-md mx-auto">
            <h3 className="font-semibold text-gray-900 mb-2">🔄 ISR Benefits</h3>
            <div className="text-sm text-gray-600 space-y-1">
              <p>✅ Fast like SSG</p>
              <p>✅ Auto-updates content</p>
              <p>✅ No build required</p>
              <p>✅ Background regeneration</p>
              <p className="text-xs pt-2 border-t">
                <span className="font-medium">Last generated:</span><br />
                {new Date(generatedAt).toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        {/* Code Example */}
        <div className="bg-gray-900 rounded-lg p-6 mb-12 overflow-x-auto">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-white font-semibold">Next.js 15 ISR Implementation</h3>
            <span className="bg-blue-600 text-white px-2 py-1 rounded text-xs">revalidate: 60</span>
          </div>
          <pre className="text-blue-400 text-sm">
            <code>{`// ISR with Next.js 15 App Router & Real API
import { fetchProductsData } from '@/lib/api';

async function getProducts() {
  // Real API call that revalidates every 60 seconds
  return fetchProductsData({
    next: { revalidate: 60 } // ISR strategy
  });
}

export default async function ProductCatalog() {
  const products = await getProducts(); // Auto-revalidates
  
  return (
    <div>
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}`}</code>
          </pre>
        </div>

        {/* Products Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {productsData.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-gray-100 relative"
            >
              {/* Discount Badge */}
              {product.discount > 0 && (
                <div className="absolute top-4 right-4 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                  -{product.discount}%
                </div>
              )}
              
              {/* Product Image Placeholder */}
              <div className="w-full h-48 bg-gradient-to-br from-blue-100 to-indigo-200 rounded-lg mb-4 flex items-center justify-center">
                <svg className="w-16 h-16 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              
              {/* Category */}
              <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full mb-3 inline-block">
                {product.category}
              </span>
              
              {/* Product Name */}
              <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
                {product.name}
              </h3>
              
              {/* Description */}
              <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                {product.description}
              </p>
              
              {/* Rating */}
              <div className="flex items-center mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'
                      }`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                  <span className="ml-2 text-sm text-gray-600">
                    {product.rating} ({product.reviews} reviews)
                  </span>
                </div>
              </div>
              
              {/* Stock Info */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <div className={`w-2 h-2 rounded-full mr-2 ${product.inStock ? 'bg-green-500' : 'bg-red-500'}`}></div>
                  <span className={`text-xs ${product.inStock ? 'text-green-600' : 'text-red-600'}`}>
                    {product.inStock ? `${product.stockLevel} in stock` : 'Out of stock'}
                  </span>
                </div>
                <span className="text-xs text-gray-500">
                  Updated: {new Date(product.lastUpdated).toLocaleTimeString()}
                </span>
              </div>
              
              {/* Price */}
              <div className="flex items-center justify-between mb-4">
                <div>
                  <span className="text-2xl font-bold text-gray-900">${product.price}</span>
                  {product.originalPrice > product.price && (
                    <span className="text-sm text-gray-500 line-through ml-2">
                      ${product.originalPrice}
                    </span>
                  )}
                </div>
              </div>
              
              {/* Action Button */}
              <button
                disabled={!product.inStock}
                className={`w-full py-3 px-4 rounded-lg font-medium transition-colors ${
                  product.inStock
                    ? 'bg-blue-600 hover:bg-blue-700 text-white'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
              >
                {product.inStock ? 'Add to Cart' : 'Out of Stock'}
              </button>
            </div>
          ))}
        </div>

        {/* ISR Explanation */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">How ISR Works</h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">The Process</h4>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                    <span className="text-blue-600 font-semibold text-sm">1</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Initial Build</p>
                    <p className="text-gray-600 text-sm">Page generated statically at build time</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                    <span className="text-blue-600 font-semibold text-sm">2</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Static Serving</p>
                    <p className="text-gray-600 text-sm">Fast static page served to users</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                    <span className="text-blue-600 font-semibold text-sm">3</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Background Regeneration</p>
                    <p className="text-gray-600 text-sm">Page regenerates after revalidate time</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                    <span className="text-blue-600 font-semibold text-sm">4</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Updated Content</p>
                    <p className="text-gray-600 text-sm">New content served to subsequent visitors</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Key Benefits</h4>
              <div className="space-y-3">
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">Performance of static sites</span>
                </div>
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">Content stays fresh automatically</span>
                </div>
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">No build required for updates</span>
                </div>
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">Excellent SEO like SSG</span>
                </div>
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">Handles traffic spikes well</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* When to Use ISR */}
        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl text-white p-8 mb-12">
          <h3 className="text-2xl font-bold mb-4">When to Use ISR</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-3 flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Perfect for:
              </h4>
              <ul className="space-y-2 text-blue-100">
                <li>• E-commerce product catalogs</li>
                <li>• News and blog sites</li>
                <li>• Content that updates regularly</li>
                <li>• API-driven content</li>
                <li>• High-traffic sites with changing data</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3 flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
                Consider alternatives for:
              </h4>
              <ul className="space-y-2 text-blue-100">
                <li>• Real-time data (use SSR)</li>
                <li>• User-specific content (use SSR)</li>
                <li>• Completely static content (use SSG)</li>
                <li>• Complex client interactions (use CSR)</li>
                <li>• Content requiring authentication</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <Link
            href="/rendering-methods/ssg"
            className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Previous: SSG Example
          </Link>
          
          <Link
            href="/rendering-methods/ssr"
            className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
          >
            Next: SSR Example
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}
