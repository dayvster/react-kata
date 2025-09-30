import { renderHook, act } from '@testing-library/react';
import { useKeyPress } from '../src/useKeyPress';

describe('useKeyPress', () => {
  it('returns last key pressed', () => {
    const { result } = renderHook(() => useKeyPress());
    const event = new window.KeyboardEvent('keydown', { key: 'a', code: 'KeyA' });
    act(() => {
      window.dispatchEvent(event);
    });
    expect(result.current.key).toBe('a');
    expect(result.current.code).toBe('KeyA');
    expect(result.current.event).toBe(event);
  });
});
