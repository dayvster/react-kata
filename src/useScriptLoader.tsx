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
    if (!src) {
      setStatus('idle');
      setRef(null);
      return;
    }
    let script = document.querySelector(`script[src="${src}"]`) as HTMLScriptElement | null;
    let created = false;
    if (!script) {
      script = document.createElement('script');
      script.src = src;
      Object.entries(options || {}).forEach(([key, value]) => {
        // @ts-ignore
        script[key] = value;
      });
      created = true;
      document.body.appendChild(script);
    }
    setRef(script);
    // If script is already loaded, set status immediately
    if (script.getAttribute('data-loaded') === 'true') {
      setStatus('loaded');
    } else {
      setStatus('loading');
    }
    const onLoad = () => {
      setStatus('loaded');
      script.setAttribute('data-loaded', 'true');
    };
    const onError = (e: any) => {
      setStatus('error');
      setError(e instanceof Error ? e : new Error('Script load error'));
    };
    script.addEventListener('load', onLoad);
    script.addEventListener('error', onError);
    return () => {
      script?.removeEventListener('load', onLoad);
      script?.removeEventListener('error', onError);
      // Optionally remove script if created by this hook
      // if (created && script?.parentNode) script.parentNode.removeChild(script);
    };
  }, [src, JSON.stringify(options)]);

  return { status, error, ref };
}
