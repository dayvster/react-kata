import React from 'react';
import { render, act, waitFor } from '@testing-library/react';
import { useScrollPosition } from '../src/useScrollPosition';

describe('useScrollPosition', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    window.scrollX = 0;
    window.scrollY = 0;
  });
  afterEach(() => {
    jest.useRealTimers();
  });

  it('should return initial scroll position', () => {
    function TestComponent() {
      const { x, y } = useScrollPosition();
      return <span data-testid="val">{x},{y}</span>;
    }
    const { getByTestId } = render(<TestComponent />);
    expect(getByTestId('val').textContent).toBe('0,0');
  });

  it('should update scroll position on scroll event (throttled)', async () => {
    function TestComponent() {
      const { x, y } = useScrollPosition(50);
      return <span data-testid="val">{x},{y}</span>;
    }
    const { getByTestId } = render(<TestComponent />);
    act(() => {
      Object.defineProperty(window, 'scrollX', { value: 100, configurable: true });
      Object.defineProperty(window, 'scrollY', { value: 200, configurable: true });
      window.dispatchEvent(new Event('scroll'));
      jest.advanceTimersByTime(51);
    });
    await waitFor(() => {
      expect(getByTestId('val').textContent).toBe('100,200');
    });
  });
});
