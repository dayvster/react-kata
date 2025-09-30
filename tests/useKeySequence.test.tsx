import React from 'react';
import { render } from '@testing-library/react';
import { useKeySequence } from '../src/useKeySequence';

describe('useKeySequence', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });
  afterEach(() => {
    jest.useRealTimers();
  });

  it('calls callback when sequence is matched', () => {
    const callback = jest.fn();
    function Test() {
      useKeySequence(['a', 'b', 'c'], callback);
      return null;
    }
    render(<Test />);
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'a' }));
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'b' }));
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'c' }));
    expect(callback).toHaveBeenCalledTimes(1);
  });

  it('does not call callback for wrong sequence', () => {
    const callback = jest.fn();
    function Test() {
      useKeySequence(['x', 'y', 'z'], callback);
      return null;
    }
    render(<Test />);
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'x' }));
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'y' }));
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'a' }));
    expect(callback).not.toHaveBeenCalled();
  });

  it('resets buffer on timeout', () => {
    const callback = jest.fn();
    function Test() {
      useKeySequence(['a', 'b'], callback, { timeout: 1000 });
      return null;
    }
    render(<Test />);
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'a' }));
    jest.advanceTimersByTime(1001);
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'b' }));
    expect(callback).not.toHaveBeenCalled();
  });

  it('resets buffer on match if resetOnMatch is true', () => {
    const callback = jest.fn();
    function Test() {
      useKeySequence(['a', 'b'], callback, { resetOnMatch: true });
      return null;
    }
    render(<Test />);
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'a' }));
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'b' }));
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'a' }));
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'b' }));
    expect(callback).toHaveBeenCalledTimes(2);
  });
});
