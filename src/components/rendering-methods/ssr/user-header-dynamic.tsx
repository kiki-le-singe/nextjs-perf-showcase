import { fetchUserData } from '@/lib/api'

import { UserHeader } from './user-header'

export async function UserHeaderDynamic() {
  // No 'use cache' - fresh data every time
  const user = await fetchUserData() // ← Fetch is NOT cached
  return <UserHeader user={user} />
}
