import { useCallback, useState } from 'react';

/**
 * useCopyToClipboard - Provides a function to copy text to clipboard and status.
 * @returns [copy, { success, error }]
 */
export function useCopyToClipboard(): [
  (text: string) => Promise<void>,
  { success: boolean; error: string | null }
] {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const copy = useCallback(async (text: string) => {
    setSuccess(false);
    setError(null);
    if (typeof navigator === 'undefined' || !navigator.clipboard) {
      setError('Clipboard API not available');
      setSuccess(false);
      return;
    }
    try {
      await navigator.clipboard.writeText(text);
      setSuccess(true);
    } catch (err: any) {
      setError(err?.message || 'Failed to copy');
      setSuccess(false);
    }
  }, []);

  return [copy, { success, error }];
}
