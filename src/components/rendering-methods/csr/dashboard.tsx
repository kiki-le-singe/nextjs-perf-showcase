'use client'

import { useMemo, useState } from 'react'
import { Clock } from 'lucide-react'
import { queryOptions, useQueryClient, useSuspenseQuery } from '@tanstack/react-query'

import { fetchDashboardData } from '@/lib/api'
import { CSR_QUERY_DEFAULTS } from '@/lib/query-client-provider'

const csrQueryKeys = {
  dashboard: ['csr', 'dashboard'] as const,
}

const dashboardQueryOptions = queryOptions({
  queryKey: csrQueryKeys.dashboard,
  queryFn: ({ signal }: { signal: AbortSignal }) => fetchDashboardData({ signal }),
})

type FetchIfStaleState =
  | { status: 'idle' }
  | { status: 'cache-hit'; at: number }
  | { status: 'network'; at: number }
  | { status: 'error'; message: string }

export function CSRDashboard() {
  const queryClient = useQueryClient()
  const [fetchIfStaleState, setFetchIfStaleState] = useState<FetchIfStaleState>({ status: 'idle' })

  const {
    isFetching,
    isStale,
    data: dashboard,
    dataUpdatedAt: lastUpdatedAt,
  } = useSuspenseQuery(dashboardQueryOptions)
  const lastUpdatedLabel = useMemo(
    () => (lastUpdatedAt ? new Date(lastUpdatedAt).toLocaleTimeString() : 'N/A'),
    [lastUpdatedAt]
  )

  const fetchIfStaleLabel = useMemo(() => {
    if (fetchIfStaleState.status === 'idle') {
      return null
    }

    if (fetchIfStaleState.status === 'error') {
      return `Error: ${fetchIfStaleState.message}`
    }

    const at = new Date(fetchIfStaleState.at).toLocaleTimeString()
    if (fetchIfStaleState.status === 'cache-hit') {
      return `Cache hit at ${at}: no network request (data still fresh).`
    }

    return `Network request at ${at}: data was stale, cache updated.`
  }, [fetchIfStaleState])

  const fetchIfStaleTone =
    fetchIfStaleState.status === 'error'
      ? 'text-red-700'
      : fetchIfStaleState.status === 'network'
        ? 'text-blue-700'
        : 'text-green-700'

  const handleFetchIfStale = async () => {
    const beforeUpdatedAt = queryClient.getQueryState(csrQueryKeys.dashboard)?.dataUpdatedAt ?? 0

    try {
      await queryClient.fetchQuery(dashboardQueryOptions)

      const afterUpdatedAt = queryClient.getQueryState(csrQueryKeys.dashboard)?.dataUpdatedAt ?? 0

      if (afterUpdatedAt > beforeUpdatedAt) {
        setFetchIfStaleState({ status: 'network', at: Date.now() })
      } else {
        setFetchIfStaleState({ status: 'cache-hit', at: Date.now() })
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unexpected fetch error'
      setFetchIfStaleState({ status: 'error', message })
    }
  }

  const statusLabel = isFetching ? 'Updating' : isStale ? 'Stale' : 'Fresh'

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-wide text-gray-500">Cache Status</p>
            <div className="flex items-center gap-3 mt-2">
              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  statusLabel === 'Fresh'
                    ? 'bg-green-100 text-green-700'
                    : statusLabel === 'Stale'
                      ? 'bg-yellow-100 text-yellow-700'
                      : 'bg-blue-100 text-blue-700'
                }`}
              >
                {statusLabel}
              </span>
              <span className="text-sm text-gray-600">
                Last updated: <strong>{lastUpdatedLabel}</strong>
              </span>
            </div>
          </div>
          <button
            onClick={handleFetchIfStale}
            disabled={isFetching}
            className="px-4 py-2 border border-pink-200 text-pink-700 rounded-lg text-sm font-medium hover:border-pink-300 hover:text-pink-800 disabled:opacity-60"
          >
            Fetch if stale (cache first)
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-4 mt-6 text-sm text-gray-600">
          <div className="flex items-start gap-2">
            <Clock className="w-4 h-4 text-pink-600 mt-0.5" />
            <div>
              <p className="font-medium text-gray-900">In-memory cache</p>
              <p>Stale after {CSR_QUERY_DEFAULTS.staleTime / 1000}s</p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <Clock className="w-4 h-4 text-pink-600 mt-0.5" />
            <div>
              <p className="font-medium text-gray-900">Garbage collection</p>
              <p>Unused cache removed after {CSR_QUERY_DEFAULTS.gcTime / 60_000} minutes</p>
            </div>
          </div>
        </div>

        {fetchIfStaleLabel && (
          <p className={`mt-4 text-sm font-medium ${fetchIfStaleTone}`}>{fetchIfStaleLabel}</p>
        )}
      </div>

      <div className="bg-pink-50 border border-pink-200 rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <p className="text-xs uppercase tracking-wide text-pink-700">Dashboard data</p>
          <span className="text-xs font-semibold px-2 py-1 rounded-full bg-pink-200 text-pink-800">
            useSuspenseQuery cache
          </span>
        </div>
        <div className="space-y-3 text-sm text-gray-700">
          <div className="flex items-center justify-between">
            <span>Current time</span>
            <strong>{dashboard.currentTime}</strong>
          </div>
          <div className="flex items-center justify-between">
            <span>Total orders</span>
            <strong>{dashboard.stats.totalOrders}</strong>
          </div>
          <div className="flex items-center justify-between">
            <span>Revenue</span>
            <strong>{`$${dashboard.stats.revenue}`}</strong>
          </div>
          <div className="flex items-center justify-between">
            <span>Active subscriptions</span>
            <strong>{dashboard.stats.activeSubscriptions}</strong>
          </div>
        </div>
        <p className="text-xs text-pink-700 mt-4">
          Open DevTools Network: click while cache is fresh (no request), then click after stale time
          (request appears).
        </p>
      </div>
    </div>
  )
}

export function CSRDashboardSkeleton() {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-lg p-6 animate-pulse">
        <div className="h-5 bg-gray-200 rounded w-32 mb-4" />
        <div className="h-4 bg-gray-200 rounded w-64" />
      </div>
      <div className="bg-white rounded-xl shadow-lg p-6 animate-pulse">
        <div className="h-4 bg-gray-200 rounded w-32 mb-3" />
        <div className="h-4 bg-gray-200 rounded w-40 mb-2" />
        <div className="h-4 bg-gray-200 rounded w-28" />
      </div>
    </div>
  )
}
