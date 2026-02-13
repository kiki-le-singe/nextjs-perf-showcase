import { fetchDashboardData } from '@/lib/api'

import { DashboardStats } from './dashboard-stats'

export async function DashboardStatsDynamic() {
  // No 'use cache' - fresh data every time
  const dashboardData = await fetchDashboardData() // ← Fetch is NOT cached
  return <DashboardStats dashboardData={dashboardData} />
}
