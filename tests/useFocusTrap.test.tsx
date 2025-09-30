import React, { useRef } from 'react';
import { render, fireEvent } from '@testing-library/react';
import { useFocusTrap } from '../src/useFocusTrap';

function TrapTest({ enabled = true }: { enabled?: boolean }) {
  const ref = useFocusTrap(enabled);
  return (
    <div ref={ref}>
      <button data-testid="first">First</button>
      <input data-testid="second" />
      <button data-testid="last">Last</button>
    </div>
  );
}

describe('useFocusTrap', () => {
  it('focuses first element on mount', () => {
    const { getByTestId } = render(<TrapTest />);
    expect(document.activeElement).toBe(getByTestId('first'));
  });

  it('cycles focus forward with Tab', () => {
    const { getByTestId } = render(<TrapTest />);
    getByTestId('last').focus();
    fireEvent.keyDown(getByTestId('last'), { key: 'Tab' });
    expect(document.activeElement).toBe(getByTestId('first'));
  });

  it('cycles focus backward with Shift+Tab', () => {
    const { getByTestId } = render(<TrapTest />);
    getByTestId('first').focus();
    fireEvent.keyDown(getByTestId('first'), { key: 'Tab', shiftKey: true });
    expect(document.activeElement).toBe(getByTestId('last'));
  });

  it('does not trap focus if disabled', () => {
    const { getByTestId } = render(<TrapTest enabled={false} />);
    getByTestId('first').focus();
    fireEvent.keyDown(getByTestId('first'), { key: 'Tab', shiftKey: true });
    // Should not cycle, so focus remains on first
    expect(document.activeElement).toBe(getByTestId('first'));
  });
});
