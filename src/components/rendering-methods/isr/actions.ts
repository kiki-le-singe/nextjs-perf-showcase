'use server'

import { revalidateTag } from 'next/cache'

export async function revalidateProducts() {
  try {
    console.log('🔄 Revalidating products cache...')

    // Use revalidateTag with 'max' for stale-while-revalidate behavior
    // This is the modern Next.js 16 way
    revalidateTag('products', 'max')

    console.log('✅ Products cache revalidated successfully')

    return { success: true, timestamp: new Date().toISOString() }
  } catch (error) {
    console.error('❌ Failed to revalidate products cache:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}
