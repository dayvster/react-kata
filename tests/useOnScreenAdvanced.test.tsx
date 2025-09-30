import React from 'react';
import { renderHook, act } from '@testing-library/react';
import { useOnScreenAdvanced } from '../src/useOnScreenAdvanced';

describe('useOnScreenAdvanced', () => {
  // Helper to create a mock IntersectionObserverEntry
  const makeEntry = (ratio: number): IntersectionObserverEntry => ({
    boundingClientRect: {} as DOMRectReadOnly,
    intersectionRect: {} as DOMRectReadOnly,
    isIntersecting: ratio > 0,
    intersectionRatio: ratio,
    rootBounds: null,
    target: document.createElement('div'),
    time: 0,
  });
  let ref: React.RefObject<HTMLDivElement>;
  let observe: jest.Mock;
  let disconnect: jest.Mock;
  let intersectionCallback: IntersectionObserverCallback;

  beforeEach(() => {
    ref = { current: document.createElement('div') };
    observe = jest.fn();
    disconnect = jest.fn();
    // @ts-ignore
    window.IntersectionObserver = jest.fn(cb => {
      intersectionCallback = cb;
      return { observe, disconnect };
    });
  });

  it('returns true when threshold is met', () => {
    const { result } = renderHook(() => useOnScreenAdvanced(ref, 0.5, 0));
      act(() => {
        intersectionCallback([makeEntry(0.6)], {} as IntersectionObserver);
      });
    expect(result.current).toBe(true);
  });

  it('returns false when threshold is not met', () => {
    const { result } = renderHook(() => useOnScreenAdvanced(ref, 0.5, 0));
      act(() => {
        intersectionCallback([makeEntry(0.4)], {} as IntersectionObserver);
      });
    expect(result.current).toBe(false);
  });

  it('triggers callback after duration', async () => {
    jest.useFakeTimers();
    const callback = jest.fn();
    renderHook(() => useOnScreenAdvanced(ref, 0.5, 1000, callback));
      act(() => {
        intersectionCallback([makeEntry(0.6)], {} as IntersectionObserver);
      });
    expect(callback).not.toHaveBeenCalled();
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    expect(callback).toHaveBeenCalledTimes(1);
    jest.useRealTimers();
  });

  it('does not trigger callback if threshold lost before duration', () => {
    jest.useFakeTimers();
    const callback = jest.fn();
    renderHook(() => useOnScreenAdvanced(ref, 0.5, 1000, callback));
      act(() => {
        intersectionCallback([makeEntry(0.6)], {} as IntersectionObserver);
      });
      act(() => {
        intersectionCallback([makeEntry(0.4)], {} as IntersectionObserver);
      });
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    expect(callback).not.toHaveBeenCalled();
    jest.useRealTimers();
  });
});
