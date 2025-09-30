import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { useReload } from '../src/useReload';

describe('useReload', () => {
  function TestComponent({ predicate, reloadFn }: { predicate?: () => boolean; reloadFn?: () => void }) {
    const reload = useReload(predicate, reloadFn);
    return <button onClick={reload}>Reload</button>;
  }

  it('calls reloadFn when button is clicked', () => {
    const reloadFn = jest.fn();
    const { getByText } = render(<TestComponent reloadFn={reloadFn} />);
    fireEvent.click(getByText('Reload'));
    expect(reloadFn).toHaveBeenCalled();
  });

  it('does not call reloadFn if predicate returns false', () => {
    const reloadFn = jest.fn();
    const { getByText } = render(<TestComponent predicate={() => false} reloadFn={reloadFn} />);
    fireEvent.click(getByText('Reload'));
    expect(reloadFn).not.toHaveBeenCalled();
  });

  it('calls reloadFn if predicate returns true', () => {
    const reloadFn = jest.fn();
    const { getByText } = render(<TestComponent predicate={() => true} reloadFn={reloadFn} />);
    fireEvent.click(getByText('Reload'));
    expect(reloadFn).toHaveBeenCalled();
  });
});
