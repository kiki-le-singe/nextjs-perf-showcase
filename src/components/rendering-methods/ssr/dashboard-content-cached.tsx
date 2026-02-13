import { cacheLife, cacheTag } from 'next/cache'

import { fetchDashboardData } from '@/lib/api'

import { DashboardContent } from './dashboard-content'

export async function DashboardContentCached() {
  'use cache' // ← This directive caches EVERYTHING in this function
  cacheLife('hours')
  cacheTag('dashboard-data')

  const dashboardData = await fetchDashboardData() // ← Fetch is cached
  return <DashboardContent dashboardData={dashboardData} />
}
