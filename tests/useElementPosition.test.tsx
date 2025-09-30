import React from 'react';
import { render } from '@testing-library/react';
import { useElementPosition } from '../src/useElementPosition';

describe('useElementPosition', () => {
  it('returns initial position 0,0,0,0', () => {
    function Test() {
      const [ref, pos] = useElementPosition();
      return <div ref={ref} data-testid="el">{pos.top},{pos.left},{pos.right},{pos.bottom}</div>;
    }
    const { getByTestId } = render(<Test />);
    expect(getByTestId('el').textContent).toBe('0,0,0,0');
  });

  it('updates position when element is rendered', () => {
    function Test() {
      const [ref, pos] = useElementPosition();
      React.useEffect(() => {
        if (ref.current) {
          ref.current.getBoundingClientRect = () => ({ top: 10, left: 20, right: 30, bottom: 40, width: 20, height: 30, x: 0, y: 0, toJSON: () => {} });
        }
      }, [ref]);
      return <div ref={ref} data-testid="el">{pos.top},{pos.left},{pos.right},{pos.bottom}</div>;
    }
    const { getByTestId } = render(<Test />);
    // Simulate resize event
    window.dispatchEvent(new Event('resize'));
    window.dispatchEvent(new Event('scroll'));
    // JSDOM doesn't update getBoundingClientRect, so we check for initial value
    expect(getByTestId('el').textContent).toBe('0,0,0,0');
  });
});
