import { useEffect, useState } from 'react';

/**
 * useImagePreload - React hook to preload an image and track its loading status.
 *
 * @param src The image URL to preload.
 * @returns { status, error } - status: 'idle' | 'loading' | 'loaded' | 'error', error: Error | null
 *
 * @example
 * const { status, error } = useImagePreload('https://example.com/image.jpg');
 */
export function useImagePreload(src: string): { status: 'idle' | 'loading' | 'loaded' | 'error'; error: Error | null } {
  const [status, setStatus] = useState<'idle' | 'loading' | 'loaded' | 'error'>(src ? 'loading' : 'idle');
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!src) {
      setStatus('idle');
      setError(null);
      return;
    }
    setStatus('loading');
    setError(null);
    const img = new window.Image();
    img.onload = () => setStatus('loaded');
    img.onerror = (e) => {
      setStatus('error');
      setError(new Error('Image failed to load'));
    };
    img.src = src;
    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [src]);

  return { status, error };
}
