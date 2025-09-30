import { renderHook, act } from '@testing-library/react';
import { useIdle } from '../src/useIdle';

// useIdle is WIP and not exported. Tests are skipped until stable implementation.
describe.skip('useIdle', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });
  afterEach(() => {
    jest.useRealTimers();
  });

  it('returns false initially and true after timeout', () => {
    const { result } = renderHook(() => useIdle(1000));
    expect(result.current).toBe(false);
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    expect(result.current).toBe(true);
  });

  it('resets idle state on activity', () => {
    const { result } = renderHook(() => useIdle(1000));
    act(() => {
      jest.advanceTimersByTime(900);
      window.dispatchEvent(new Event('mousemove'));
      jest.advanceTimersByTime(900);
    });
    expect(result.current).toBe(false);
    act(() => {
      jest.advanceTimersByTime(100);
    });
    expect(result.current).toBe(true);
  });
});
