import { renderHook } from '@testing-library/react';
import { useOnKeyPressed } from '../src/useOnKeyPressed';

describe('useOnKeyPressed', () => {
  it('calls callback when target key is pressed', () => {
    const callback = jest.fn();
    renderHook(() => useOnKeyPressed('Enter', callback));
    const event = new window.KeyboardEvent('keydown', { key: 'Enter', code: 'Enter' });
    window.dispatchEvent(event);
    expect(callback).toHaveBeenCalledWith(event);
  });
  it('does not call callback for other keys', () => {
    const callback = jest.fn();
    renderHook(() => useOnKeyPressed('Enter', callback));
    const event = new window.KeyboardEvent('keydown', { key: 'Escape', code: 'Escape' });
    window.dispatchEvent(event);
    expect(callback).not.toHaveBeenCalled();
  });
});
