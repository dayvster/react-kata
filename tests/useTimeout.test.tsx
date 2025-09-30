import React from 'react';
import { render, act } from '@testing-library/react';
import { useTimeout } from '../src/useTimeout';

describe('useTimeout', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  it('should call the callback after the delay', () => {
    const callback = jest.fn();
    function TestComponent() {
      useTimeout(callback, 500);
      return null;
    }
    render(<TestComponent />);
    expect(callback).not.toHaveBeenCalled();
    act(() => {
      jest.advanceTimersByTime(500);
    });
    expect(callback).toHaveBeenCalledTimes(1);
  });

  it('should not call the callback if delay is null', () => {
    const callback = jest.fn();
    function TestComponent() {
      useTimeout(callback, null);
      return null;
    }
    render(<TestComponent />);
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    expect(callback).not.toHaveBeenCalled();
  });

  it('should use the latest callback', () => {
    const callback1 = jest.fn();
    const callback2 = jest.fn();
    function TestComponent({ cb }: { cb: () => void }) {
      useTimeout(cb, 300);
      return null;
    }
    const { rerender } = render(<TestComponent cb={callback1} />);
    rerender(<TestComponent cb={callback2} />);
    act(() => {
      jest.advanceTimersByTime(300);
    });
    expect(callback1).not.toHaveBeenCalled();
    expect(callback2).toHaveBeenCalledTimes(1);
  });

  it('should clear timeout on unmount', () => {
    const callback = jest.fn();
    function TestComponent() {
      useTimeout(callback, 200);
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
