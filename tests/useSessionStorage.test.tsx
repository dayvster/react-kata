import React from 'react';
import { render, screen, act } from '@testing-library/react';
import { useSessionStorage } from '../src/useSessionStorage';

type Props = { value: string; limit?: number };
function SessionStorageTestComponent({ value }: { value: string }) {
  const [stored, setStored] = useSessionStorage('test-key', 'initial');
  React.useEffect(() => {
    setStored(value);
  }, [value, setStored]);
  return <div data-testid="session-value">{stored}</div>;
}

describe('useSessionStorage', () => {
  beforeEach(() => {
    window.sessionStorage.clear();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
    window.sessionStorage.clear();
  });

  it('should return the initial value if sessionStorage is empty', () => {
    render(<SessionStorageTestComponent value="initial" />);
    expect(screen.getByTestId('session-value').textContent).toBe('initial');
  });

  it('should update the value in sessionStorage', () => {
    render(<SessionStorageTestComponent value="foo" />);
    expect(window.sessionStorage.getItem('test-key')).toBe(JSON.stringify('foo'));
    expect(screen.getByTestId('session-value').textContent).toBe('foo');
  });

  it('should support functional updates', () => {
    function FuncUpdateComponent() {
      const [stored, setStored] = useSessionStorage('func-key', 1);
      return (
        <>
          <span data-testid="func-value">{stored}</span>
          <button onClick={() => setStored(prev => prev + 1)}>Inc</button>
        </>
      );
    }
    render(<FuncUpdateComponent />);
    expect(screen.getByTestId('func-value').textContent).toBe('1');
    act(() => {
      screen.getByText('Inc').click();
    });
    expect(screen.getByTestId('func-value').textContent).toBe('2');
    expect(window.sessionStorage.getItem('func-key')).toBe('2');
  });


  it('should not allow non-serializable values', () => {
    function ErrorComponent() {
      
      const [_, setStored] = useSessionStorage('err-key', 'ok');
      React.useEffect(() => {
        // @ts-expect-error
        setStored(() => Symbol('bad'));
      }, [setStored]);
      return null;
    }
    const spy = jest.spyOn(console, 'warn').mockImplementation(() => {});
    render(<ErrorComponent />);
    expect(spy).toHaveBeenCalledWith(
      expect.stringContaining('Error setting sessionStorage key'),
      expect.any(Error)
    );
    spy.mockRestore();
  });
});
