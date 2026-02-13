'use client'

import { useState, useTransition } from 'react'
import { revalidateCache } from '@/lib/actions'

export function RevalidateButton() {
  const [isPending, startTransition] = useTransition()
  const [lastRevalidated, setLastRevalidated] = useState<string | null>(null)
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleRevalidate = () => {
    startTransition(async () => {
      try {
        const result = await revalidateCache(['products'])
        if (result.success) {
          setStatus('success')
          setLastRevalidated(new Date().toLocaleTimeString())
          setTimeout(() => setStatus('idle'), 3000)
        } else {
          setStatus('error')
          setTimeout(() => setStatus('idle'), 3000)
        }
      } catch {
        setStatus('error')
        setTimeout(() => setStatus('idle'), 3000)
      }
    })
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <button
        onClick={handleRevalidate}
        disabled={isPending}
        className={`
          px-6 py-3 rounded-lg font-medium transition-all duration-200
          flex items-center gap-2 shadow-md
          ${
            status === 'success'
              ? 'bg-green-600 text-white'
              : status === 'error'
                ? 'bg-red-600 text-white'
                : 'bg-blue-600 hover:bg-blue-700 text-white disabled:bg-gray-400'
          }
        `}
      >
        {isPending ? (
          <>
            <svg
              className="animate-spin h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            Revalidating...
          </>
        ) : status === 'success' ? (
          <>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
            Revalidated!
          </>
        ) : status === 'error' ? (
          <>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
            Error
          </>
        ) : (
          <>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
            Revalidate Now (On-Demand)
          </>
        )}
      </button>

      {lastRevalidated && (
        <p className="text-sm text-gray-600">Last revalidated: {lastRevalidated}</p>
      )}

      <p className="text-xs text-gray-500 max-w-md text-center">
        Click to trigger on-demand revalidation using{' '}
        <code className="bg-gray-100 px-1 rounded">revalidateTag</code>
      </p>
    </div>
  )
}
