import React from 'react';
import { render, act } from '@testing-library/react';
import { useToggle } from '../src/useToggle';

describe('useToggle', () => {
  it('should toggle boolean by default', () => {
    function TestComponent() {
      const [value, { toggle }] = useToggle();
      return (
        <>
          <span data-testid="val">{String(value)}</span>
          <button onClick={toggle}>Toggle</button>
        </>
      );
    }
    const { getByTestId, getByText } = render(<TestComponent />);
    expect(getByTestId('val').textContent).toBe('false');
    act(() => {
      getByText('Toggle').click();
    });
    expect(getByTestId('val').textContent).toBe('true');
    act(() => {
      getByText('Toggle').click();
    });
    expect(getByTestId('val').textContent).toBe('false');
  });

  it('should toggle between custom values', () => {
    function TestComponent() {
      const [value, { toggle }] = useToggle('hello', 'world');
      return (
        <>
          <span data-testid="val">{value}</span>
          <button onClick={toggle}>Toggle</button>
        </>
      );
    }
    const { getByTestId, getByText } = render(<TestComponent />);
    expect(getByTestId('val').textContent).toBe('hello');
    act(() => {
      getByText('Toggle').click();
    });
    expect(getByTestId('val').textContent).toBe('world');
    act(() => {
      getByText('Toggle').click();
    });
    expect(getByTestId('val').textContent).toBe('hello');
  });

  it('should set value directly', () => {
    function TestComponent() {
      const [value, { set }] = useToggle('foo', 'bar');
      return (
        <>
          <span data-testid="val">{value}</span>
          <button onClick={() => set('bar')}>SetBar</button>
          <button onClick={() => set('foo')}>SetFoo</button>
        </>
      );
    }
    const { getByTestId, getByText } = render(<TestComponent />);
    expect(getByTestId('val').textContent).toBe('foo');
    act(() => {
      getByText('SetBar').click();
    });
    expect(getByTestId('val').textContent).toBe('bar');
    act(() => {
      getByText('SetFoo').click();
    });
    expect(getByTestId('val').textContent).toBe('foo');
  });
});
