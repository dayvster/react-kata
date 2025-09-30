import React, { useRef } from 'react';
import { render, fireEvent } from '@testing-library/react';
import { useClickOutside } from '../src/useClickOutside';

describe('useClickOutside', () => {
  it('should call handler when clicking outside the element', () => {
    const handler = jest.fn();
    function TestComponent() {
      const ref = useRef<HTMLDivElement>(null);
      useClickOutside(ref, handler);
      return (
        <>
          <div data-testid="outside">outside</div>
          <div ref={ref} data-testid="inside">inside</div>
        </>
      );
    }
    const { getByTestId } = render(<TestComponent />);
    // Click inside: should NOT call handler
    fireEvent.mouseDown(getByTestId('inside'));
    expect(handler).not.toHaveBeenCalled();
    // Click outside: should call handler
    fireEvent.mouseDown(getByTestId('outside'));
    expect(handler).toHaveBeenCalledTimes(1);
  });

  it('should call handler on touchstart outside', () => {
    const handler = jest.fn();
    function TestComponent() {
      const ref = useRef<HTMLDivElement>(null);
      useClickOutside(ref, handler);
      return (
        <>
          <div data-testid="outside">outside</div>
          <div ref={ref} data-testid="inside">inside</div>
        </>
      );
    }
    const { getByTestId } = render(<TestComponent />);
    fireEvent.touchStart(getByTestId('outside'));
    expect(handler).toHaveBeenCalledTimes(1);
  });
});
