import * as React from 'react';

/**
 * A React hook that returns true if the given media query matches.
 * Handles browser compatibility for addEventListener/addListener.
 * @param query - The media query string (e.g. '(max-width: 600px)')
 * @returns boolean - true if the query matches, false otherwise
 *
 * @example
 * const isMobile = useMediaQuery('(max-width: 600px)');
 * if (isMobile) {
 *   Render mobile UI
 * }
 */
export const useMediaQuery = (query: string): boolean => {
  const [matches, setMatches] = React.useState<boolean>(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia === 'undefined') {
      return false;
    }
    return window.matchMedia(query).matches;
  });

  React.useEffect(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia === 'undefined') {
      return;
    }
    const mediaQueryList = window.matchMedia(query);
    const listener = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };
    if (mediaQueryList.addEventListener) {
      mediaQueryList.addEventListener('change', listener);
    } else if (mediaQueryList.addListener) {
      mediaQueryList.addListener(listener);
    }
    setMatches(mediaQueryList.matches);
    return () => {
      if (mediaQueryList.removeEventListener) {
        mediaQueryList.removeEventListener('change', listener);
      } else if (mediaQueryList.removeListener) {
        mediaQueryList.removeListener(listener);
      }
    };
  }, [query]);

  return matches;
};