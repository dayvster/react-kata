import React from 'react';
import { render } from '@testing-library/react';
import { useElementSize } from '../src/useElementSize';

describe('useElementSize', () => {
  it('returns initial size 0,0', () => {
    function Test() {
      const [ref, size] = useElementSize();
      return <div ref={ref} data-testid="el">{size.width},{size.height}</div>;
    }
    const { getByTestId } = render(<Test />);
    expect(getByTestId('el').textContent).toBe('0,0');
  });

  // JSDOM cannot update offsetWidth/offsetHeight, so we only test initial value
});
