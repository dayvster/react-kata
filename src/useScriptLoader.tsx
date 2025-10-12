import { useEffect, useState } from 'react';

/**
 * useScriptLoader
 *
 * Dynamically loads an external script and tracks its loading status.
 *
 * @param src - The script URL to load
 * @param options - Optional attributes for the script element (async, defer, etc.)
 * @returns { status, error, ref } - Status: 'idle' | 'loading' | 'loaded' | 'error', error: Error|null, ref: script element
 *
 * @example
 * const { status, error } = useScriptLoader('https://example.com/script.js');
 * if (status === 'loading') return <div>Loading script...</div>;
 * if (status === 'error') return <div>Error: {error?.message}</div>;
 */
export function useScriptLoader(
  src: string,
  options?: Partial<Omit<HTMLScriptElement, 'src'>>
): {
  status: 'idle' | 'loading' | 'loaded' | 'error';
  error: Error | null;
  ref: HTMLScriptElement | null;
} {
  const [status, setStatus] = useState<'idle' | 'loading' | 'loaded' | 'error'>(src ? 'loading' : 'idle');
  const [error, setError] = useState<Error | null>(null);
  const [ref, setRef] = useState<HTMLScriptElement | null>(null);

  useEffect(() => {
    if (!src || typeof document === 'undefined') {
      setStatus('idle');
      setRef(null);
      return;
    }
    let script: HTMLScriptElement | null = document.querySelector(`script[src="${src}"]`);
    let created = false;
    if (!script) {
      script = document.createElement('script');
      script.src = src;
      Object.entries(options || {}).forEach(([key, value]) => {
        (script as any)[key] = value;
      });
      created = true;
      document.body.appendChild(script);
    }
    setRef(script);

    if (script && script.getAttribute('data-loaded') === 'true') {
      setStatus('loaded');
    } else {
      setStatus('loading');
    }

    const onLoad = () => {
      setStatus('loaded');
      script && script.setAttribute('data-loaded', 'true');
    };
    const onError = (e: any) => {
      setStatus('error');
      setError(e instanceof Error ? e : new Error('Script load error'));
    };

    if (script) {
      script.addEventListener('load', onLoad);
      script.addEventListener('error', onError);
    }
    return () => {
      if (script) {
        script.removeEventListener('load', onLoad);
        script.removeEventListener('error', onError);
      }
    };
  }, [src, JSON.stringify(options)]);

  return { status, error, ref };
}
