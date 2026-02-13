import { DollarSign, Users, ShoppingBag, Target } from 'lucide-react'
import { Suspense } from 'react'

import BackTo from '@/components/back-to'

// Mock async components with different delays
async function RevenueCard() {
  await new Promise(resolve => setTimeout(resolve, 500))
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center">
        <div className="p-2 bg-green-100 rounded-full">
          <DollarSign className="w-6 h-6 text-green-600" />
        </div>
        <div className="ml-4">
          <p className="text-sm font-medium text-gray-600">Total Revenue</p>
          <p className="text-2xl font-bold text-gray-900">$45,231</p>
          <p className="text-sm text-green-600">+20.1% from last month</p>
        </div>
      </div>
    </div>
  )
}

async function UsersCard() {
  await new Promise(resolve => setTimeout(resolve, 1000))
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center">
        <div className="p-2 bg-blue-100 rounded-full">
          <Users className="w-6 h-6 text-blue-600" />
        </div>
        <div className="ml-4">
          <p className="text-sm font-medium text-gray-600">Active Users</p>
          <p className="text-2xl font-bold text-gray-900">2,350</p>
          <p className="text-sm text-blue-600">+180.1% from last month</p>
        </div>
      </div>
    </div>
  )
}

async function OrdersCard() {
  await new Promise(resolve => setTimeout(resolve, 1500))
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center">
        <div className="p-2 bg-purple-100 rounded-full">
          <ShoppingBag className="w-6 h-6 text-purple-600" />
        </div>
        <div className="ml-4">
          <p className="text-sm font-medium text-gray-600">Total Orders</p>
          <p className="text-2xl font-bold text-gray-900">12,234</p>
          <p className="text-sm text-purple-600">+19% from last month</p>
        </div>
      </div>
    </div>
  )
}

async function ConversionCard() {
  await new Promise(resolve => setTimeout(resolve, 2000))
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center">
        <div className="p-2 bg-orange-100 rounded-full">
          <Target className="w-6 h-6 text-orange-600" />
        </div>
        <div className="ml-4">
          <p className="text-sm font-medium text-gray-600">Conversion Rate</p>
          <p className="text-2xl font-bold text-gray-900">3.24%</p>
          <p className="text-sm text-orange-600">+1.3% from last month</p>
        </div>
      </div>
    </div>
  )
}

// Skeleton component for metric cards
function MetricCardSkeleton() {
  return (
    <div className="bg-white rounded-lg shadow p-6 animate-pulse">
      <div className="flex items-center">
        <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
        <div className="ml-4 flex-1">
          <div className="h-4 bg-gray-200 rounded w-24 mb-2"></div>
          <div className="h-8 bg-gray-200 rounded w-20 mb-1"></div>
          <div className="h-3 bg-gray-200 rounded w-32"></div>
        </div>
      </div>
    </div>
  )
}

export default function Page() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <BackTo
          href="/streaming"
          text="Back to Examples"
          className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6"
        />
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard Streaming</h1>
        <p className="text-gray-600 mb-8">Cards load progressively at different speeds</p>

        {/* Header loads immediately */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Analytics Overview</h2>
          <p className="text-gray-600">Your business metrics for this month</p>
        </div>

        {/* Grid of metric cards that stream in at different times */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Suspense fallback={<MetricCardSkeleton />}>
            <RevenueCard />
          </Suspense>

          <Suspense fallback={<MetricCardSkeleton />}>
            <UsersCard />
          </Suspense>

          <Suspense fallback={<MetricCardSkeleton />}>
            <OrdersCard />
          </Suspense>

          <Suspense fallback={<MetricCardSkeleton />}>
            <ConversionCard />
          </Suspense>
        </div>
      </div>
    </div>
  )
}
