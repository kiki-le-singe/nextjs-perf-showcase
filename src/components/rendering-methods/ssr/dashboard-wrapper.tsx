import { Suspense } from 'react'

import { DashboardContentCached } from './dashboard-content-cached'
import { DashboardContentDynamic } from './dashboard-content-dynamic'
import { DashboardContentSkeleton } from './dashboard-content-skeleton'
import { DashboardStatsCached } from './dashboard-stats-cached'
import { DashboardStatsDynamic } from './dashboard-stats-dynamic'
import { StatsSkeleton } from './dashboard-stats-skeleton'
import { UserHeaderCached } from './user-header-cached'
import { UserHeaderDynamic } from './user-header-dynamic'
import { UserHeaderSkeleton } from './user-header-skeleton'

export async function DashboardWrapper({
  searchParams,
}: {
  searchParams: Promise<{ cache?: string }>
}) {
  const useCache = (await searchParams)?.cache === 'force-cache'

  return (
    <>
      {/* User Header with individual Suspense and proper skeleton */}
      <Suspense fallback={<UserHeaderSkeleton />}>
        {useCache ? <UserHeaderCached /> : <UserHeaderDynamic />}
      </Suspense>

      {/* Dashboard Stats with individual Suspense and proper skeleton */}
      <Suspense fallback={<StatsSkeleton />}>
        {useCache ? <DashboardStatsCached /> : <DashboardStatsDynamic />}
      </Suspense>

      {/* Dashboard Content with individual Suspense and proper skeleton */}
      <Suspense fallback={<DashboardContentSkeleton />}>
        {useCache ? <DashboardContentCached /> : <DashboardContentDynamic />}
      </Suspense>
    </>
  )
}
