import React from 'react';
import { render } from '@testing-library/react';
import { useMediaQuery } from '../src/useMediaQuery';

describe('useMediaQuery', () => {
  beforeEach(() => {
    window.matchMedia = jest.fn().mockImplementation((query) => {
      return {
        matches: query === '(max-width: 600px)',
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        addListener: jest.fn(),
        removeListener: jest.fn(),
      };
    });
  });

  it('should return true if query matches', () => {
    function TestComponent() {
      const matches = useMediaQuery('(max-width: 600px)');
      return <span data-testid="val">{String(matches)}</span>;
    }
    const { getByTestId } = render(<TestComponent />);
    expect(getByTestId('val').textContent).toBe('true');
  });

  it('should return false if query does not match', () => {
    function TestComponent() {
      const matches = useMediaQuery('(min-width: 601px)');
      return <span data-testid="val">{String(matches)}</span>;
    }
    const { getByTestId } = render(<TestComponent />);
    expect(getByTestId('val').textContent).toBe('false');
  });
});
