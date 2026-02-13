export function ProductsSectionSkeleton() {
  return (
    <>
      {/* Compact Info Box Skeleton */}
      <div className="bg-gradient-to-r from-purple-100 to-indigo-100 rounded-xl p-4 max-w-2xl mx-auto mb-4 animate-pulse">
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="text-left">
            <div className="h-3 bg-gray-300 rounded w-24 mb-2"></div>
            <div className="h-4 bg-gray-300 rounded w-40"></div>
          </div>
          <div className="text-right">
            <div className="h-3 bg-gray-300 rounded w-20 ml-auto mb-2"></div>
            <div className="h-4 bg-gray-300 rounded w-24 ml-auto"></div>
          </div>
        </div>
        <div className="flex items-center justify-center gap-4">
          <div className="h-12 bg-gray-300 rounded-lg w-64"></div>
        </div>
      </div>

      {/* Products Grid Skeleton */}
      <div className="mb-8 md:mb-12">
        <div className="h-8 bg-gray-200 rounded w-64 mb-6 animate-pulse"></div>
        <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 mb-6 animate-pulse">
          <div className="space-y-2">
            <div className="h-4 bg-yellow-200 rounded w-full"></div>
            <div className="h-4 bg-yellow-200 rounded w-5/6"></div>
            <div className="h-4 bg-yellow-200 rounded w-4/6"></div>
          </div>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-white rounded-xl shadow-md overflow-hidden animate-pulse">
              <div className="h-48 bg-gray-200"></div>
              <div className="p-4 space-y-3">
                <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                <div className="flex justify-between items-center mt-4">
                  <div className="h-6 bg-gray-200 rounded w-20"></div>
                  <div className="h-5 bg-gray-200 rounded w-16"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
