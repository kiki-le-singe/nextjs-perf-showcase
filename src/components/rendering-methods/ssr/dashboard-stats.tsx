import { ShoppingBag, DollarSign, Users, Target } from 'lucide-react'

import { fetchDashboardData } from '@/lib/api'
import type { DashboardData } from '@/lib/types'

export async function DashboardStats({
  searchParams,
}: {
  searchParams?: Promise<{ cache?: string }>
}) {
  const resolvedSearchParams = await searchParams
  const cacheMode = resolvedSearchParams?.cache === 'force-cache' ? 'force-cache' : 'no-store'

  console.log(
    `%c📊 [DASHBOARD STATS]%c Fetching stats data with cache: %c${cacheMode}%c...`,
    'color: #2563EB; font-weight: bold',
    'color: #6B7280',
    'color: #DC2626; font-weight: bold',
    'color: #6B7280'
  )
  const dashboardData: DashboardData =
    cacheMode === 'force-cache'
      ? await fetchDashboardData({ cache: 'force-cache' })
      : await fetchDashboardData()

  console.log(
    `%c✅ [DASHBOARD STATS]%c Stats data fetched (%c${cacheMode}%c): Orders: %c${dashboardData.stats.totalOrders}%c | Revenue: %c$${dashboardData.stats.revenue}%c | Subscriptions: %c${dashboardData.stats.activeSubscriptions}%c | Tickets: %c${dashboardData.stats.supportTickets}`,
    'color: #2563EB; font-weight: bold',
    'color: #374151',
    'color: #DC2626; font-weight: bold',
    'color: #374151',
    'color: #059669; font-weight: bold',
    'color: #374151',
    'color: #059669; font-weight: bold',
    'color: #374151',
    'color: #059669; font-weight: bold',
    'color: #374151',
    'color: #059669; font-weight: bold'
  )

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
            <ShoppingBag className="w-6 h-6 text-blue-600" />
          </div>
          <span className="text-sm text-gray-500">+5.4%</span>
        </div>
        <div className="text-2xl font-bold text-gray-900">{dashboardData.stats.totalOrders}</div>
        <p className="text-gray-600 text-sm">Total Orders</p>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
            <DollarSign className="w-6 h-6 text-green-600" />
          </div>
          <span className="text-sm text-gray-500">+12.5%</span>
        </div>
        <div className="text-2xl font-bold text-gray-900">${dashboardData.stats.revenue}</div>
        <p className="text-gray-600 text-sm">Revenue</p>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
            <Users className="w-6 h-6 text-purple-600" />
          </div>
          <span className="text-sm text-gray-500">+3.2%</span>
        </div>
        <div className="text-2xl font-bold text-gray-900">
          {dashboardData.stats.activeSubscriptions}
        </div>
        <p className="text-gray-600 text-sm">Active Subscriptions</p>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
            <Target className="w-6 h-6 text-yellow-600" />
          </div>
          <span className="text-sm text-gray-500">-2.4%</span>
        </div>
        <div className="text-2xl font-bold text-gray-900">{dashboardData.stats.supportTickets}</div>
        <p className="text-gray-600 text-sm">Support Tickets</p>
      </div>
    </div>
  )
}
