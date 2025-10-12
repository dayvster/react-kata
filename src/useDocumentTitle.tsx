import { useEffect } from 'react';

/**
 * useDocumentTitle - React hook to set the document title.
 *
 * @param title The title to set for the document.
 * @param options Optional object: { restoreOnUnmount?: boolean }
 *
 * @example
 * useDocumentTitle('My Page');
 *
 * @example
 * useDocumentTitle('My Page', { restoreOnUnmount: true });
 */
export function useDocumentTitle(
  title: string,
  options?: { restoreOnUnmount?: boolean }
) {
  useEffect(() => {
    if (typeof document !== 'undefined') {
      const prevTitle = document.title;
      document.title = title;
      return () => {
        if (options?.restoreOnUnmount) {
          document.title = prevTitle;
        }
      };
    }
  }, [title, options?.restoreOnUnmount]);
}
