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

  it('should return null on first render', () => {
    render(<DebounceTestComponent value="a" delay={500} />);
    expect(screen.getByTestId('debounced-value').textContent).toBe('');
  });

  it('should set the value after the delay', () => {
    render(<DebounceTestComponent value="a" delay={500} />);

    act(() => {
      jest.advanceTimersByTime(500);
    });

    expect(screen.getByTestId('debounced-value').textContent).toBe('a');
  });

  it('should keep old value until delay has passed', () => {
    const { rerender } = render(<DebounceTestComponent value="a" delay={500} />);

    act(() => {
      jest.advanceTimersByTime(500);
    });

    expect(screen.getByTestId('debounced-value').textContent).toBe('a');

    rerender(<DebounceTestComponent value="b" delay={500} />);

    // still "a" because debounce hasn’t finished
    expect(screen.getByTestId('debounced-value').textContent).toBe('a');

    act(() => {
      jest.advanceTimersByTime(500);
    });

    expect(screen.getByTestId('debounced-value').textContent).toBe('b');
  });

  it('should handle zero delay immediately', () => {
    const { rerender } = render(<DebounceTestComponent value="a" delay={0} />);

    act(() => {
      jest.advanceTimersByTime(0);
    });
    expect(screen.getByTestId('debounced-value').textContent).toBe('a');

    rerender(<DebounceTestComponent value="b" delay={0} />);
    act(() => {
      jest.advanceTimersByTime(0);
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