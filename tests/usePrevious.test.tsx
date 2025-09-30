import React, { useState } from 'react';
import { render, screen, act } from '@testing-library/react';
import { usePrevious } from '../src/usePrevious';

describe('usePrevious', () => {
  it('should return undefined on first render', () => {
    function TestComponent() {
      const [value] = useState('a');
      const prev = usePrevious(value);
      return <span data-testid="prev">{String(prev)}</span>;
    }
    render(<TestComponent />);
    expect(screen.getByTestId('prev').textContent).toBe('undefined');
  });

  it('should return previous value after update', () => {
    function TestComponent() {
      const [value, setValue] = useState('a');
      const prev = usePrevious(value);
      return (
        <>
          <span data-testid="prev">{String(prev)}</span>
          <button onClick={() => setValue('b')}>Update</button>
        </>
      );
    }
    const { getByTestId, getByText } = render(<TestComponent />);
    expect(getByTestId('prev').textContent).toBe('undefined');
    act(() => {
      getByText('Update').click();
    });
    expect(getByTestId('prev').textContent).toBe('a');
  });

  it('should track multiple updates', () => {
    function TestComponent() {
      const [value, setValue] = useState('x');
      const prev = usePrevious(value);
      return (
        <>
          <span data-testid="prev">{String(prev)}</span>
          <button onClick={() => setValue('y')}>ToY</button>
          <button onClick={() => setValue('z')}>ToZ</button>
        </>
      );
    }
    const { getByTestId, getByText } = render(<TestComponent />);
    expect(getByTestId('prev').textContent).toBe('undefined');
    act(() => {
      getByText('ToY').click();
    });
    expect(getByTestId('prev').textContent).toBe('x');
    act(() => {
      getByText('ToZ').click();
    });
    expect(getByTestId('prev').textContent).toBe('y');
  });
});
