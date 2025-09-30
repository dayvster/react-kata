import React from 'react';
import { render, act } from '@testing-library/react';
import { useScriptLoader } from '../src/useScriptLoader';

function TestComponent({ src, options }: { src: string; options?: any }) {
  const { status, error, ref } = useScriptLoader(src, options);
  return (
    <div>
      <span data-testid="status">{status}</span>
      <span data-testid="error">{error ? error.message : ''}</span>
      <span data-testid="ref">{ref ? 'yes' : 'no'}</span>
    </div>
  );
}

describe('useScriptLoader', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  it('returns idle if src is empty', () => {
    const { getByTestId } = render(<TestComponent src="" />);
    expect(getByTestId('status').textContent).toBe('idle');
    expect(getByTestId('ref').textContent).toBe('no');
  });

  it('loads a script and sets status to loaded', async () => {
    const src = 'https://example.com/test-script.js';
    const { getByTestId } = render(<TestComponent src={src} />);
    const script = document.querySelector(`script[src='${src}']`);
    expect(script).toBeTruthy();
    expect(getByTestId('status').textContent).toBe('loading');
    act(() => {
      script?.dispatchEvent(new Event('load'));
    });
    expect(getByTestId('status').textContent).toBe('loaded');
  });

  it('handles script load error', () => {
    const src = 'https://example.com/error-script.js';
    const { getByTestId } = render(<TestComponent src={src} />);
    const script = document.querySelector(`script[src='${src}']`);
    act(() => {
      script?.dispatchEvent(new Event('error'));
    });
    expect(getByTestId('status').textContent).toBe('error');
    expect(getByTestId('error').textContent).toBe('Script load error');
  });

  it('does not create duplicate script elements', () => {
    const src = 'https://example.com/unique-script.js';
    document.body.innerHTML = `<script src='${src}'></script>`;
    const { getByTestId } = render(<TestComponent src={src} />);
    expect(document.querySelectorAll(`script[src='${src}']`).length).toBe(1);
    expect(getByTestId('status').textContent).toBe('loading');
  });

  it('applies options to the script element', () => {
    const src = 'https://example.com/opt-script.js';
    const { getByTestId } = render(<TestComponent src={src} options={{ async: true, defer: true }} />);
    const script = document.querySelector(`script[src='${src}']`);
  const scriptEl = script as HTMLScriptElement;
  expect(scriptEl.async).toBe(true);
  expect(scriptEl.defer).toBe(true);
  });
});
