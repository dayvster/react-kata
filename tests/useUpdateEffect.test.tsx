import React, { useState } from 'react';
import { render, act } from '@testing-library/react';
import { useUpdateEffect } from '../src/useUpdateEffect';

describe('useUpdateEffect', () => {
  it('should not run effect on initial mount', () => {
    const effect = jest.fn();
    function TestComponent() {
      const [count] = useState(0);
      useUpdateEffect(effect, [count]);
      return null;
    }
    render(<TestComponent />);
    expect(effect).not.toHaveBeenCalled();
  });

  it('should run effect on update', () => {
    const effect = jest.fn();
    function TestComponent() {
      const [count, setCount] = useState(0);
      useUpdateEffect(effect, [count]);
      return <button onClick={() => setCount((c) => c + 1)}>Inc</button>;
    }
    const { getByText } = render(<TestComponent />);
    act(() => {
      getByText('Inc').click();
    });
    expect(effect).toHaveBeenCalledTimes(1);
    act(() => {
      getByText('Inc').click();
    });
    expect(effect).toHaveBeenCalledTimes(2);
  });

  it('should support cleanup', () => {
    const cleanup = jest.fn();
    const effect = jest.fn(() => cleanup);
    function TestComponent() {
      const [count, setCount] = useState(0);
      useUpdateEffect(effect, [count]);
      return <button onClick={() => setCount((c) => c + 1)}>Inc</button>;
    }
    const { getByText, unmount } = render(<TestComponent />);
    act(() => {
      getByText('Inc').click();
    });
    unmount();
    expect(cleanup).toHaveBeenCalled();
  });
});
