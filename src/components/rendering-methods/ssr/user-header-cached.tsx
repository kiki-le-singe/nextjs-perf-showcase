import { cacheLife, cacheTag } from 'next/cache'

import { fetchUserData } from '@/lib/api'

import { UserHeader } from './user-header'

export async function UserHeaderCached() {
  'use cache' // ← This directive caches EVERYTHING in this function
  cacheLife('hours')
  cacheTag('user-data')

  const user = await fetchUserData() // ← Fetch is cached
  return <UserHeader user={user} />
}
