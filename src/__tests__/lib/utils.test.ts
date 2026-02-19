import { describe, it, expect } from 'vitest'
import { cn } from '../../lib/utils'

describe('cn', () => {
  it('returns a single class unchanged', () => {
    expect(cn('text-red-500')).toBe('text-red-500')
  })

  it('merges multiple classes with a space', () => {
    expect(cn('px-4', 'py-2')).toBe('px-4 py-2')
  })

  it('ignores falsy values (false, undefined, null, empty string)', () => {
    expect(cn('px-4', false, undefined, null, '')).toBe('px-4')
  })

  it('resolves Tailwind conflicts — last class wins', () => {
    // twMerge keeps only the last conflicting utility
    expect(cn('text-red-500', 'text-blue-500')).toBe('text-blue-500')
  })

  it('resolves conflicting background colors', () => {
    expect(cn('bg-gray-400', 'bg-blue-600')).toBe('bg-blue-600')
  })

  it('handles conditional class objects (clsx)', () => {
    expect(cn({ 'bg-green-500': true, 'bg-red-500': false })).toBe('bg-green-500')
  })

  it('handles array inputs', () => {
    expect(cn(['px-4', 'py-2'])).toBe('px-4 py-2')
  })

  it('returns an empty string with no arguments', () => {
    expect(cn()).toBe('')
  })

  it('combines conditional objects and plain strings', () => {
    const isActive = true
    expect(cn('base-class', { 'active-class': isActive, 'inactive-class': !isActive })).toBe(
      'base-class active-class',
    )
  })
})
