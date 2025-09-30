import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { useCookie } from '../src/useCookie';

function setDocumentCookie(cookie: string) {
  Object.defineProperty(document, 'cookie', {
    writable: true,
    value: cookie,
    configurable: true,
  });
}

describe('useCookie', () => {
  beforeEach(() => {
    setDocumentCookie('');
  });

  function TestComponent({ name }: { name: string }) {
    const [cookie, setCookie, deleteCookie] = useCookie(name);
    return (
      <>
        <span data-testid="cookie-value">{cookie}</span>
        <button onClick={() => setCookie('abc')}>Set</button>
        <button onClick={deleteCookie}>Delete</button>
      </>
    );
  }

  it('gets initial cookie value', () => {
    setDocumentCookie('myCookie=initValue');
    const { getByTestId } = render(<TestComponent name="myCookie" />);
    expect(getByTestId('cookie-value').textContent).toBe('initValue');
  });

  it('sets cookie value', () => {
    const { getByText, getByTestId } = render(<TestComponent name="myCookie" />);
    fireEvent.click(getByText('Set'));
    expect(getByTestId('cookie-value').textContent).toBe('abc');
    expect(document.cookie).toContain('myCookie=abc');
  });

  it('deletes cookie value', () => {
    setDocumentCookie('myCookie=abc');
    const { getByText, getByTestId } = render(<TestComponent name="myCookie" />);
    fireEvent.click(getByText('Delete'));
    expect(getByTestId('cookie-value').textContent).toBe('');
    expect(document.cookie).toContain('myCookie=');
  });
});
