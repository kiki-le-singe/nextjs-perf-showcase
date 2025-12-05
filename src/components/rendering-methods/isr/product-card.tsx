import type { Product } from '@shared'

export function ProductCard({ product }: { product: Product }) {
  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-gray-100 relative">
      {/* Discount Badge */}
      {product.discount > 0 && (
        <div className="absolute top-4 right-4 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
          -{product.discount}%
        </div>
      )}

      {/* Product Image Placeholder */}
      <div className="w-full h-48 bg-gradient-to-br from-blue-100 to-indigo-200 rounded-lg mb-4 flex items-center justify-center">
        <svg
          className="w-16 h-16 text-blue-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      </div>

      {/* Category */}
      <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full mb-3 inline-block">
        {product.category}
      </span>

      {/* Product Name */}
      <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">{product.name}</h3>

      {/* Description */}
      <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.description}</p>

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
          <div
            className={`w-2 h-2 rounded-full mr-2 ${product.inStock ? 'bg-green-500' : 'bg-red-500'}`}
          ></div>
          <span className={`text-xs ${product.inStock ? 'text-green-600' : 'text-red-600'}`}>
            {product.inStock ? `${product.stockLevel} in stock` : 'Out of stock'}
          </span>
        </div>
        <span className="text-xs text-gray-500">
          Updated: {new Date(product.lastUpdated || new Date()).toLocaleTimeString()}
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
  )
}
