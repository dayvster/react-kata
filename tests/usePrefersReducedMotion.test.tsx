import { renderHook } from '@testing-library/react';
import { usePrefersReducedMotion } from '../src/usePrefersReducedMotion';

describe('usePrefersReducedMotion', () => {
  beforeEach(() => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation(query => ({
        matches: query === '(prefers-reduced-motion: reduce)',
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
      })),
    });
  });

  it('returns true if prefers-reduced-motion is reduce', () => {
    window.matchMedia = jest.fn().mockImplementation(query => ({
      matches: true,
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
    }));
    const { result } = renderHook(() => usePrefersReducedMotion());
    expect(result.current).toBe(true);
  });

  it('returns false if prefers-reduced-motion is no-preference', () => {
    window.matchMedia = jest.fn().mockImplementation(query => ({
      matches: false,
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
    }));
    const { result } = renderHook(() => usePrefersReducedMotion());
    expect(result.current).toBe(false);
  });
});
