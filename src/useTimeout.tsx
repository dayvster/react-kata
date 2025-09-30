import * as React from 'react';

/**
 * A custom hook that sets up a timeout to execute a callback function after a specified delay.
 * @param callback - Function to be executed after the timeout
 * @param delay - Delay in milliseconds. If null, the timeout is not set.
 * @example
 * useTimeout(() => {
 *   console.log('This will run after 1 second');
 * }, 1000);
 */
export const useTimeout = (callback: () => void, delay: number | null) => {
  const savedCallback = React.useRef<() => void>();

  React.useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  React.useEffect(() => {
    if (delay === null) {
      return;
    }
    const id = setTimeout(() => {
      if (savedCallback.current) {
        savedCallback.current();
      }
    }, delay);
    return () => clearTimeout(id);
  }, [delay]);
};