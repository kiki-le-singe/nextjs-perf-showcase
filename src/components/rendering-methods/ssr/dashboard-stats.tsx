import { ShoppingBag, DollarSign, Users, Target } from 'lucide-react'

import type { DashboardData } from '@/lib/types'

export function DashboardStats({ dashboardData }: { dashboardData: DashboardData }) {
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
