import { cacheLife, cacheTag } from 'next/cache'

import { fetchDashboardData } from '@/lib/api'

import { DashboardStats } from './dashboard-stats'

export async function DashboardStatsCached() {
  'use cache' // ← This directive caches EVERYTHING in this function
  cacheLife('hours')
  cacheTag('dashboard-data')

  const dashboardData = await fetchDashboardData() // ← Fetch is cached
  return <DashboardStats dashboardData={dashboardData} />
}
