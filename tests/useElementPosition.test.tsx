import React from 'react';
import { render } from '@testing-library/react';
import { useElementPosition } from '../src/useElementPosition';

describe('useElementPosition', () => {
  it('returns initial position 0,0,0,0', () => {
    type Position = { top: number; left: number; right: number; bottom: number };
    function Test() {
      const [ref, pos] = useElementPosition<HTMLDivElement>();
      return <div ref={ref} data-testid="el">{pos.top},{pos.left},{pos.right},{pos.bottom}</div>;
    }
    const { getByTestId } = render(<Test />);
    expect(getByTestId('el').textContent).toBe('0,0,0,0');
  });

  // JSDOM cannot update getBoundingClientRect, so we only test initial value
});
