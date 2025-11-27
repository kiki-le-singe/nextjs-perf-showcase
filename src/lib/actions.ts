'use server'

import { revalidateTag } from 'next/cache'

export async function revalidateCache(tags: string[]) {
  try {
    console.log(
      `🔄 [REVALIDATE]%c Revalidating cache tags: %c${tags.join(', ')}`,
      'color: #8B5CF6; font-weight: bold',
      'color: #DC2626; font-weight: bold'
    )

    for (const tag of tags) {
      revalidateTag(tag, 'max') // Next.js 16: Uses stale-while-revalidate
    }

    console.log(
      `✅ [REVALIDATE]%c Successfully revalidated cache tags: %c${tags.join(', ')}`,
      'color: #8B5CF6; font-weight: bold',
      'color: #059669; font-weight: bold'
    )

    return { success: true, tags }
  } catch (error) {
    console.error(`❌ [REVALIDATE] Failed to revalidate cache:`, error)
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' }
  }
}

export async function revalidateAllCache() {
  return revalidateCache(['user-data', 'dashboard-data'])
}
