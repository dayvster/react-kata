import React, { useState } from 'react';
import { render, screen, act } from '@testing-library/react';
import { useDebounce } from '../src/useDebounce';

function DebounceTestComponent({ value, delay }: { value: string; delay: number }) {
  const debounced = useDebounce(value, delay);
  return <div data-testid="debounced-value">{debounced}</div>;
}

describe('useDebounce', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  it('should return the initial value immediately', () => {
    render(<DebounceTestComponent value="test" delay={500} />);
    expect(screen.getByTestId('debounced-value').textContent).toBe('test');
  });

  it('should update the debounced value after the delay', () => {
    const { rerender } = render(<DebounceTestComponent value="a" delay={300} />);
    rerender(<DebounceTestComponent value="b" delay={300} />);
    expect(screen.getByTestId('debounced-value').textContent).toBe('a');
    act(() => {
      jest.advanceTimersByTime(300);
    });
    expect(screen.getByTestId('debounced-value').textContent).toBe('b');
  });

  it('should reset timer if value changes quickly', () => {
    const { rerender } = render(<DebounceTestComponent value="a" delay={200} />);
    rerender(<DebounceTestComponent value="b" delay={200} />);
    act(() => {
      jest.advanceTimersByTime(100);
    });
    rerender(<DebounceTestComponent value="c" delay={200} />);
    act(() => {
      jest.advanceTimersByTime(200);
    });
    expect(screen.getByTestId('debounced-value').textContent).toBe('c');
  });

  it('should clear timer on unmount', () => {
    const { rerender, unmount } = render(<DebounceTestComponent value="a" delay={100} />);
    rerender(<DebounceTestComponent value="b" delay={100} />);
    unmount();
  });
});