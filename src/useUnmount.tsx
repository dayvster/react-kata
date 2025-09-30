import { useEffect } from 'react';

/**
 * useUnmount - Runs a callback once when the component unmounts.
 * @param callback - Function to run on unmount
 */
export function useUnmount(callback: () => void) {
  useEffect(() => {
    return () => {
      callback();
    };
    
  }, []);
}
