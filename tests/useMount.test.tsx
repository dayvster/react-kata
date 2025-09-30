import React from 'react';
import { render } from '@testing-library/react';
import { useMount } from '../src/useMount';

describe('useMount', () => {
  it('calls the callback once on mount', () => {
    const cb = jest.fn();
    function Test() {
      useMount(cb);
      return <div />;
    }
    render(<Test />);
    expect(cb).toHaveBeenCalledTimes(1);
  });

  it('does not call the callback on update', () => {
    const cb = jest.fn();
    function Test({ value }: { value: number }) {
      useMount(cb);
      return <div>{value}</div>;
    }
    const { rerender } = render(<Test value={1} />);
    rerender(<Test value={2} />);
    expect(cb).toHaveBeenCalledTimes(1);
  });
});
