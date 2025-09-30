import React from 'react';
import { render } from '@testing-library/react';
import { useImagePreload } from '../src/useImagePreload';

describe('useImagePreload', () => {
  let originalImage: typeof window.Image;
  beforeEach(() => {
    originalImage = window.Image;
  });
  afterEach(() => {
    window.Image = originalImage;
  });

  function mockImage({ shouldLoad }: { shouldLoad: boolean }) {
    // @ts-ignore
    window.Image = class {
      _src = '';
      onload: (() => void) | null = null;
      onerror: ((e?: any) => void) | null = null;
      set src(val: string) {
        this._src = val;
        if (shouldLoad && this.onload) {
          setTimeout(() => this.onload && this.onload(), 10);
        } else if (!shouldLoad && this.onerror) {
          setTimeout(() => this.onerror && this.onerror(), 10);
        }
      }
      get src() {
        return this._src;
      }
    };
  }

  function TestComponent({ src }: { src: string }) {
    const { status, error } = useImagePreload(src);
    return (
      <span data-testid="status">{status}</span>
    );
  }

  it('returns idle if no src', () => {
    const { getByTestId } = render(<TestComponent src="" />);
    expect(getByTestId('status').textContent).toBe('idle');
  });

  it('returns loaded if image loads', async () => {
    mockImage({ shouldLoad: true });
    const { getByTestId, findByText } = render(<TestComponent src="foo.jpg" />);
    expect(getByTestId('status').textContent).toBe('loading');
    await findByText('loaded');
  });

  it('returns error if image fails to load', async () => {
    mockImage({ shouldLoad: false });
    const { getByTestId, findByText } = render(<TestComponent src="bar.jpg" />);
    expect(getByTestId('status').textContent).toBe('loading');
    await findByText('error');
  });
});
