import React from 'react';
import { render } from '@testing-library/react';
import { useDocumentTitle } from '../src/useDocumentTitle';

describe('useDocumentTitle', () => {
  let originalTitle: string;
  beforeEach(() => {
    originalTitle = document.title;
  });
  afterEach(() => {
    document.title = originalTitle;
  });

  function TestComponent({ title, restore }: { title: string; restore?: boolean }) {
    useDocumentTitle(title, restore ? { restoreOnUnmount: true } : undefined);
    return <span data-testid="title">{document.title}</span>;
  }

  it('sets document title on mount', () => {
    render(<TestComponent title="Test Title" />);
    expect(document.title).toBe('Test Title');
  });

  it('restores document title on unmount if restoreOnUnmount is true', () => {
    const { unmount } = render(<TestComponent title="Temp Title" restore />);
    expect(document.title).toBe('Temp Title');
    unmount();
    expect(document.title).toBe(originalTitle);
  });

  it('does not restore document title on unmount if restoreOnUnmount is false', () => {
    const { unmount } = render(<TestComponent title="No Restore Title" />);
    expect(document.title).toBe('No Restore Title');
    unmount();
    expect(document.title).toBe('No Restore Title');
  });
});
