'use client'

export default function CSRError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-100">
      <div className="container mx-auto px-4 md:px-6 py-8 md:py-12">
        <div className="max-w-2xl mx-auto bg-red-50 border-l-4 border-red-500 p-6 rounded-lg">
          <h2 className="text-red-800 text-xl font-semibold mb-2">Failed to load CSR dashboard</h2>
          <p className="text-red-700 text-sm mb-4">
            {error.message || 'Unexpected error while loading client data.'}
          </p>
          <button
            onClick={reset}
            className="bg-pink-600 hover:bg-pink-700 text-white px-4 py-2 rounded-lg text-sm font-medium"
          >
            Retry
          </button>
        </div>
      </div>
    </div>
  )
}
