import React from 'react';
import { render } from '@testing-library/react';
import { useShimmer } from '../src/useShimmer';

describe('useShimmer', () => {
  function TestComponent({ width, height, color, highlight }: { width: number; height: number; color?: string; highlight?: string }) {
    const shimmer = useShimmer(width, height, color, highlight);
    return <span data-testid="shimmer">{shimmer}</span>;
  }

  it('generates a shimmer SVG with default colors', () => {
    const { getByTestId } = render(<TestComponent width={100} height={50} />);
    const svg = getByTestId('shimmer').textContent;
    expect(svg).toContain('<svg');
    expect(svg).toContain('width=\'100\'');
    expect(svg).toContain('height=\'50\'');
    expect(svg).toContain('#f6f7f8');
    expect(svg).toContain('#edeef1');
  });

  it('generates a shimmer SVG with custom colors', () => {
    const { getByTestId } = render(<TestComponent width={200} height={80} color="#ccc" highlight="#eee" />);
    const svg = getByTestId('shimmer').textContent;
    expect(svg).toContain('width=\'200\'');
    expect(svg).toContain('height=\'80\'');
    expect(svg).toContain('#ccc');
    expect(svg).toContain('#eee');
  });
});
