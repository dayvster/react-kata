import React from 'react';
import { render, screen, act } from '@testing-library/react';
import { useThrottle } from '../src/useThrottle';

type Props = { value: string; limit: number };
function ThrottleTestComponent({ value, limit }: Props) {
  const throttled = useThrottle(value, limit);
  return <div data-testid="throttled-value">{throttled}</div>;
}

describe('useThrottle', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  it('should return the initial value immediately', () => {
    render(<ThrottleTestComponent value="test" limit={500} />);
    expect(screen.getByTestId('throttled-value').textContent).toBe('test');
  });

  it('should throttle value updates', () => {
    const { rerender } = render(<ThrottleTestComponent value="a" limit={300} />);
    rerender(<ThrottleTestComponent value="b" limit={300} />);
    expect(screen.getByTestId('throttled-value').textContent).toBe('a');
    act(() => {
      jest.advanceTimersByTime(299);
    });
    expect(screen.getByTestId('throttled-value').textContent).toBe('a');
    act(() => {
      jest.advanceTimersByTime(1);
    });
    expect(screen.getByTestId('throttled-value').textContent).toBe('b');
  });

  it('should update immediately if limit is zero', () => {
    const { rerender } = render(<ThrottleTestComponent value="a" limit={0} />);
    rerender(<ThrottleTestComponent value="b" limit={0} />);
    expect(screen.getByTestId('throttled-value').textContent).toBe('b');
  });

  it('should update immediately if limit is negative', () => {
    const { rerender } = render(<ThrottleTestComponent value="a" limit={-100} />);
    rerender(<ThrottleTestComponent value="b" limit={-100} />);
    expect(screen.getByTestId('throttled-value').textContent).toBe('b');
  });

  it('should clear timer on unmount', () => {
    const { rerender, unmount } = render(<ThrottleTestComponent value="a" limit={100} />);
    rerender(<ThrottleTestComponent value="b" limit={100} />);
    unmount();
  });
});
