import React from 'react';
import { render } from '@testing-library/react';
import { useUnmount } from '../src/useUnmount';

describe('useUnmount', () => {
  it('calls the callback once on unmount', () => {
    const cb = jest.fn();
    function Test() {
      useUnmount(cb);
      return <div />;
    }
    const { unmount } = render(<Test />);
    expect(cb).not.toHaveBeenCalled();
    unmount();
    expect(cb).toHaveBeenCalledTimes(1);
  });

  it('does not call the callback on update', () => {
    const cb = jest.fn();
    function Test({ value }: { value: number }) {
      useUnmount(cb);
      return <div>{value}</div>;
    }
    const { rerender, unmount } = render(<Test value={1} />);
    rerender(<Test value={2} />);
    expect(cb).not.toHaveBeenCalled();
    unmount();
    expect(cb).toHaveBeenCalledTimes(1);
  });
});
