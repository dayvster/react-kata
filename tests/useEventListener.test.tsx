import React from 'react';
import { renderHook } from '@testing-library/react';
import { useEventListener } from '../src/useEventListener';

describe('useEventListener', () => {
  it('attaches and triggers event listener on window', () => {
    const handler = jest.fn();
    renderHook(() => useEventListener('resize', handler));
    const event = new window.Event('resize');
    window.dispatchEvent(event);
    expect(handler).toHaveBeenCalledWith(event);
  });

  it('attaches and triggers event listener on custom element', () => {
    const handler = jest.fn();
    const div = document.createElement('div');
    document.body.appendChild(div);
    renderHook(() => useEventListener('click', handler, div));
    const event = new window.Event('click');
    div.dispatchEvent(event);
    expect(handler).toHaveBeenCalledWith(event);
    document.body.removeChild(div);
  });

  it('cleans up event listener on unmount', () => {
    const handler = jest.fn();
    const div = document.createElement('div');
    document.body.appendChild(div);
    const { unmount } = renderHook(() => useEventListener('click', handler, div));
    unmount();
    const event = new window.Event('click');
    div.dispatchEvent(event);
    expect(handler).not.toHaveBeenCalled();
    document.body.removeChild(div);
  });
});
