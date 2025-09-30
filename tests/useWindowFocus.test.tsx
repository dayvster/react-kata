import React from 'react';
import { render } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { useWindowFocus } from '../src/useWindowFocus';

function fireWindowEvent(type: 'focus' | 'blur') {
  act(() => {
    window.dispatchEvent(new Event(type));
  });
}

describe('useWindowFocus', () => {
  let originalHasFocus: () => boolean;
  beforeEach(() => {
    originalHasFocus = document.hasFocus;
  });
  afterEach(() => {
    document.hasFocus = originalHasFocus;
  });

  function TestComponent() {
    const isFocused = useWindowFocus();
    return <span data-testid="focus-status">{isFocused ? 'focused' : 'blurred'}</span>;
  }

  it('returns initial focus state (mocked as focused)', () => {
    document.hasFocus = () => true;
    const { getByTestId } = render(<TestComponent />);
    expect(getByTestId('focus-status').textContent).toBe('focused');
  });

  it('returns initial focus state (mocked as blurred)', () => {
    document.hasFocus = () => false;
    const { getByTestId } = render(<TestComponent />);
    expect(getByTestId('focus-status').textContent).toBe('blurred');
  });

  it('updates to blurred when window loses focus', () => {
    document.hasFocus = () => true;
    const { getByTestId } = render(<TestComponent />);
    fireWindowEvent('blur');
    expect(getByTestId('focus-status').textContent).toBe('blurred');
  });

  it('updates to focused when window regains focus', () => {
    document.hasFocus = () => false;
    const { getByTestId } = render(<TestComponent />);
    fireWindowEvent('focus');
    expect(getByTestId('focus-status').textContent).toBe('focused');
  });
});
