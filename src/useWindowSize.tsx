import * as React from 'react';

/**
 * A React hook that provides the current window size and updates on resize.
 * @returns An object containing the current width and height of the window
 * @example
 * const { width, height } = useWindowSize();
 */
export const useWindowSize = () => {
  const getSize = () => ({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  });

  const [windowSize, setWindowSize] = React.useState(getSize);

  React.useEffect(() => {
    if (typeof window === 'undefined') return;
    const handleResize = () => {
      setWindowSize(getSize());
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return windowSize;
};