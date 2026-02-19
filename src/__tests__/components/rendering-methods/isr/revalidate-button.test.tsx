import { describe, it, expect, vi, afterEach } from 'vitest'
import { render, screen, waitFor, act, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { RevalidateButton } from '@/components/rendering-methods/isr/revalidate-button'
import { revalidateCache } from '@/lib/actions'

vi.mock('@/lib/actions', () => ({
  revalidateCache: vi.fn(),
  revalidateAllCache: vi.fn(),
}))

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function setup(user = userEvent.setup()) {
  render(<RevalidateButton />)
  return { user }
}

// ---------------------------------------------------------------------------
// Idle state
// ---------------------------------------------------------------------------

describe('RevalidateButton — idle state', () => {
  it('renders the button in idle state on mount', () => {
    setup()
    const button = screen.getByRole('button')
    expect(button).toHaveTextContent('Revalidate Now (On-Demand)')
    expect(button).toBeEnabled()
  })

  it('does not display the "Last revalidated" line on mount', () => {
    setup()
    expect(screen.queryByText(/Last revalidated/)).not.toBeInTheDocument()
  })
})

// ---------------------------------------------------------------------------
// Success state
// ---------------------------------------------------------------------------

describe('RevalidateButton — success state', () => {
  beforeEach(() => {
    vi.mocked(revalidateCache).mockResolvedValue({ success: true, tags: ['products'] })
  })

  afterEach(() => vi.clearAllMocks())

  it('shows "Revalidated!" after a successful revalidation', async () => {
    const { user } = setup()
    await user.click(screen.getByRole('button'))

    await waitFor(() => {
      expect(screen.getByRole('button')).toHaveTextContent('Revalidated!')
    })
  })

  it('displays the last revalidated time after success', async () => {
    const { user } = setup()
    await user.click(screen.getByRole('button'))

    await waitFor(() => {
      expect(screen.getByText(/Last revalidated:/)).toBeInTheDocument()
    })
  })

  it('calls revalidateCache with the products tag', async () => {
    const { user } = setup()
    await user.click(screen.getByRole('button'))

    await waitFor(() => expect(vi.mocked(revalidateCache)).toHaveBeenCalledTimes(1))
    expect(vi.mocked(revalidateCache)).toHaveBeenCalledWith(['products'])
  })
})

// ---------------------------------------------------------------------------
// Error state
// ---------------------------------------------------------------------------

describe('RevalidateButton — error state', () => {
  afterEach(() => vi.clearAllMocks())

  it('shows "Error" when revalidateCache returns { success: false }', async () => {
    vi.mocked(revalidateCache).mockResolvedValue({
      success: false,
      error: 'Revalidation failed',
    })
    const { user } = setup()
    await user.click(screen.getByRole('button'))

    await waitFor(() => {
      expect(screen.getByRole('button')).toHaveTextContent('Error')
    })
  })

  it('shows "Error" when revalidateCache throws an exception', async () => {
    vi.mocked(revalidateCache).mockRejectedValue(new Error('Network error'))
    const { user } = setup()
    await user.click(screen.getByRole('button'))

    await waitFor(() => {
      expect(screen.getByRole('button')).toHaveTextContent('Error')
    })
  })
})

// ---------------------------------------------------------------------------
// Auto-reset after 3 s (fake timers)
// Using vi.advanceTimersByTimeAsync inside act() drives both React's
// scheduler timers and the component's 3-second reset timeout without
// the waitFor-vs-fake-timer polling conflict.
// ---------------------------------------------------------------------------

describe('RevalidateButton — auto-reset after 3s', () => {
  afterEach(() => {
    vi.useRealTimers()
    vi.clearAllMocks()
  })

  it('resets to idle 3 seconds after a successful revalidation', async () => {
    vi.useFakeTimers()
    vi.mocked(revalidateCache).mockResolvedValue({ success: true, tags: ['products'] })
    render(<RevalidateButton />)

    // Fire click + advance timers to let the async transition + React scheduler settle
    await act(async () => {
      fireEvent.click(screen.getByRole('button'))
      await vi.advanceTimersByTimeAsync(100)
    })

    expect(screen.getByRole('button')).toHaveTextContent('Revalidated!')

    // Advance 3 s to trigger the reset setTimeout
    await act(async () => {
      await vi.advanceTimersByTimeAsync(3000)
    })

    expect(screen.getByRole('button')).toHaveTextContent('Revalidate Now (On-Demand)')
  })

  it('resets to idle 3 seconds after a failed revalidation', async () => {
    vi.useFakeTimers()
    vi.mocked(revalidateCache).mockResolvedValue({
      success: false,
      error: 'Revalidation failed',
    })
    render(<RevalidateButton />)

    await act(async () => {
      fireEvent.click(screen.getByRole('button'))
      await vi.advanceTimersByTimeAsync(100)
    })

    expect(screen.getByRole('button')).toHaveTextContent('Error')

    await act(async () => {
      await vi.advanceTimersByTimeAsync(3000)
    })

    expect(screen.getByRole('button')).toHaveTextContent('Revalidate Now (On-Demand)')
  })
})
