import React from 'react';
import { render, act } from '@testing-library/react';
import { useWindowSize } from '../src/useWindowSize';

describe('useWindowSize', () => {
  beforeEach(() => {
    // Set initial window size
    global.innerWidth = 800;
    global.innerHeight = 600;
  });

  it('should return initial window size', () => {
    function TestComponent() {
      const { width, height } = useWindowSize();
      return <span data-testid="val">{width}x{height}</span>;
    }
    const { getByTestId } = render(<TestComponent />);
    expect(getByTestId('val').textContent).toBe('800x600');
  });

  it('should update window size on resize', () => {
    function TestComponent() {
      const { width, height } = useWindowSize();
      return <span data-testid="val">{width}x{height}</span>;
    }
    const { getByTestId } = render(<TestComponent />);
    global.innerWidth = 1024;
    global.innerHeight = 768;
    act(() => {
      global.dispatchEvent(new Event('resize'));
    });
    expect(getByTestId('val').textContent).toBe('1024x768');
  });
});
