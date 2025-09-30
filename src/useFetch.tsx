import * as React from 'react';

/**
 * **NOTE:** This hook is very simple if you want more advanced features please check out tanstack query.
 * A React hook for fetching data from an API endpoint.
 * @param url - The URL to fetch data from
 * @param options - Optional fetch options (method, headers, body, etc.)
 * @returns An object containing the fetched data, loading state, error (if any), and a refetch function
 * @example
 * const { data, error, loading, refetch } = useFetch('https://api.example.com/data');
 */
export const useFetch = (url: string, options?: RequestInit) => {
  const [data, setData] = React.useState<any>(null);
  const [error, setError] = React.useState<Error | null>(null);
  const [loading, setLoading] = React.useState<boolean>(false);
  const abortRef = React.useRef<AbortController | null>(null);

  const fetchData = React.useCallback(async () => {
    if (abortRef.current) {
      abortRef.current.abort();
    }
    const controller = new AbortController();
    abortRef.current = controller;
    setLoading(true);
    try {
      const response = await fetch(url, { ...options, signal: controller.signal });
      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }
      const result = await response.json();
      setData(result);
      setError(null);
    } catch (err) {
      if ((err as Error).name === 'AbortError') return;
      setError(err as Error);
      setData(null);
    } finally {
      setLoading(false);
    }
  }, [url, options]);

  React.useEffect(() => {
    fetchData();
    return () => {
      if (abortRef.current) {
        abortRef.current.abort();
      }
    };
  }, [fetchData]);

  return { data, error, loading, refetch: fetchData };
};
