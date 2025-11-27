import { fetchDashboardData } from '@/lib/api'

import { DashboardContent } from './dashboard-content'

export async function DashboardContentDynamic() {
  // No 'use cache' - fresh data every time
  const dashboardData = await fetchDashboardData() // ← Fetch is NOT cached
  return <DashboardContent dashboardData={dashboardData} />
}
