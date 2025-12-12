export function BlogPostsSectionSkeleton() {
  return (
    <>
      {/* Build Time Skeleton */}
      <div className="bg-gradient-to-r from-green-100 to-emerald-100 rounded-xl p-4 max-w-2xl mx-auto mb-8 animate-pulse">
        <div className="text-center mb-2">
          <p className="text-xs text-gray-700 mb-1">Generated at Build Time:</p>
          <div className="h-7 bg-green-200 rounded w-64 mx-auto"></div>
        </div>
      </div>

      {/* Info Box Skeleton */}
      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 max-w-3xl mx-auto mb-8 animate-pulse">
        <div className="h-4 bg-blue-200 rounded w-full mb-2"></div>
        <div className="h-4 bg-blue-200 rounded w-3/4"></div>
      </div>

      {/* Blog Posts Grid Skeleton */}
      <div className="mb-12">
        <div className="h-8 bg-gray-200 rounded w-64 mx-auto mb-6 animate-pulse"></div>
        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          {[1, 2, 3, 4, 5, 6].map(i => (
            <div
              key={i}
              className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 animate-pulse"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="h-5 bg-green-100 rounded-full w-20"></div>
                <div className="h-4 bg-gray-200 rounded w-16"></div>
              </div>
              <div className="h-6 bg-gray-200 rounded w-3/4 mb-3"></div>
              <div className="space-y-2 mb-4">
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
              </div>
              <div className="flex gap-2 mb-4">
                <div className="h-6 bg-gray-100 rounded w-16"></div>
                <div className="h-6 bg-gray-100 rounded w-20"></div>
                <div className="h-6 bg-gray-100 rounded w-16"></div>
              </div>
              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-green-200 rounded-full"></div>
                  <div>
                    <div className="h-4 bg-gray-200 rounded w-24 mb-1"></div>
                    <div className="h-3 bg-gray-200 rounded w-16"></div>
                  </div>
                </div>
                <div className="h-4 bg-green-200 rounded w-20"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
