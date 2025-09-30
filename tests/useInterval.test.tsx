import React from 'react';
import { render, act } from '@testing-library/react';
import { useInterval } from '../src/useInterval';

describe('useInterval', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  it('should call the callback repeatedly at the given interval', () => {
    const callback = jest.fn();
    function TestComponent() {
      useInterval(callback, 200);
      return null;
    }
    render(<TestComponent />);
    expect(callback).not.toHaveBeenCalled();
    act(() => {
      jest.advanceTimersByTime(600);
    });
    expect(callback).toHaveBeenCalledTimes(3);
  });

  it('should not call the callback if delay is null', () => {
    const callback = jest.fn();
    function TestComponent() {
      useInterval(callback, null);
      return null;
    }
    render(<TestComponent />);
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    expect(callback).not.toHaveBeenCalled();
  });

  it('should allow manual stop of the interval', () => {
    const callback = jest.fn();
    function TestComponent() {
      const { stop } = useInterval(callback, 100);
      React.useEffect(() => {
        setTimeout(() => stop(), 250);
      }, [stop]);
      return null;
    }
    render(<TestComponent />);
    act(() => {
      jest.advanceTimersByTime(500);
    });
    // Should have called 2 times (at 100ms, 200ms), then stopped before 300ms
    expect(callback).toHaveBeenCalledTimes(2);
  });

  it('should allow pause and resume', () => {
    const callback = jest.fn();
    function TestComponent() {
      const { pause, start } = useInterval(callback, 100);
      React.useEffect(() => {
        setTimeout(() => pause(), 150);
        setTimeout(() => start(), 350);
      }, [pause, start]);
      return null;
    }
    render(<TestComponent />);
    act(() => {
      jest.advanceTimersByTime(600);
    });
    // Should call at 100ms, 200ms, then pause, then resume at 400ms, 500ms
    expect(callback).toHaveBeenCalledTimes(4);
  });

  it('should use the latest callback', () => {
    const callback1 = jest.fn();
    const callback2 = jest.fn();
    function TestComponent({ cb }: { cb: () => void }) {
      useInterval(cb, 100);
      return null;
    }
    const { rerender } = render(<TestComponent cb={callback1} />);
    rerender(<TestComponent cb={callback2} />);
    act(() => {
      jest.advanceTimersByTime(100);
    });
    expect(callback1).not.toHaveBeenCalled();
    expect(callback2).toHaveBeenCalledTimes(1);
  });

  it('should clear interval on unmount', () => {
    const callback = jest.fn();
    function TestComponent() {
      useInterval(callback, 100);
      return null;
    }
    const { unmount } = render(<TestComponent />);
    unmount();
    act(() => {
      jest.advanceTimersByTime(200);
    });
    expect(callback).not.toHaveBeenCalled();
  });
});
