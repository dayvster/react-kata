import React from 'react';
import { render, act } from '@testing-library/react';
import { useLocalStorage } from '../src/useLocalStorage';

describe('useLocalStorage', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it('should return initial value if localStorage is empty', () => {
    function TestComponent() {
      const [value] = useLocalStorage('key', 'init');
      return <span data-testid="val">{value}</span>;
    }
    const { getByTestId } = render(<TestComponent />);
    expect(getByTestId('val').textContent).toBe('init');
  });

  it('should update localStorage when setValue is called', () => {
    function TestComponent() {
      const [value, setValue] = useLocalStorage('key', 'init');
      return (
        <>
          <span data-testid="val">{value}</span>
          <button onClick={() => setValue('new')}>Set</button>
        </>
      );
    }
    const { getByTestId, getByText } = render(<TestComponent />);
    act(() => {
      getByText('Set').click();
    });
    expect(getByTestId('val').textContent).toBe('new');
    expect(window.localStorage.getItem('key')).toBe(JSON.stringify('new'));
  });

  it('should support functional updates', () => {
    function TestComponent() {
      const [value, setValue] = useLocalStorage('num', 1);
      return (
        <>
          <span data-testid="val">{String(value)}</span>
          <button onClick={() => setValue((prev) => prev + 1)}>Inc</button>
        </>
      );
    }
    const { getByTestId, getByText } = render(<TestComponent />);
    act(() => {
      getByText('Inc').click();
    });
    expect(getByTestId('val').textContent).toBe('2');
    expect(window.localStorage.getItem('num')).toBe('2');
  });
});
