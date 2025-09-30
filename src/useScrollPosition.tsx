import * as React from 'react';
import { useThrottle } from './useThrottle';

/**
 * A React hook that tracks the scroll position of the window.
 * @param throttleMs - The number of milliseconds to throttle the scroll event handler (default is 100ms)
 * @returns An object containing the current scroll position { x, y }
 * @example
 * const { x, y } = useScrollPosition(200);
 */
export const useScrollPosition = (throttleMs: number = 100) => {
  const [scrollPosition, setScrollPosition] = React.useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });

  const throttledPosition = useThrottle(scrollPosition, throttleMs);

  React.useEffect(() => {
    const handleScroll = () => {
      setScrollPosition({
        x: window.scrollX,
        y: window.scrollY,
      });
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return throttledPosition;
};
