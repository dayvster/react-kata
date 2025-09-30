import { useEffect } from 'react';

/**
 * useMount - Runs a callback once when the component mounts.
 * @param callback - Function to run on mount
 */
export function useMount(callback: () => void) {
  useEffect(() => {
    callback();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
