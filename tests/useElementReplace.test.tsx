import React from 'react';
import { render } from '@testing-library/react';
import { useElementReplace } from '../src/useElementReplace';

function TestComponent({ element, width, height }: { element: JSX.Element; width?: number; height?: number }) {
  const replaced = useElementReplace(element, width, height);
  return replaced;
}

describe('useElementReplace', () => {
  it('renders the provided element unchanged if no width/height', () => {
    const { container } = render(
      <TestComponent element={<span data-testid="custom">Hello</span>} />
    );
    expect(container.querySelector('[data-testid="custom"]')).toBeTruthy();
    expect(container.textContent).toBe('Hello');
  });

  it('applies width and height styles to the element', () => {
    const { container } = render(
      <TestComponent element={<div data-testid="custom" style={{ background: 'red' }}>X</div>} width={123} height={45} />
    );
    const el = container.querySelector('[data-testid="custom"]') as HTMLDivElement;
    expect(el).toBeTruthy();
    expect(el.style.width).toBe('123px');
    expect(el.style.height).toBe('45px');
    expect(el.style.background).toBe('red');
  });

  it('merges with existing style object', () => {
    const { container } = render(
      <TestComponent element={<div data-testid="custom" style={{ color: 'blue' }}>Y</div>} width={50} />
    );
    const el = container.querySelector('[data-testid="custom"]') as HTMLDivElement;
    expect(el.style.width).toBe('50px');
    expect(el.style.color).toBe('blue');
  });

  it('returns null if element is null', () => {
    const { container } = render(
      <TestComponent element={null as any} width={100} height={100} />
    );
    expect(container.firstChild).toBeNull();
  });
});
