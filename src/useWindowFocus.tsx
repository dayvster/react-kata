import { useEffect, useState } from 'react';

/**
 * useWindowFocus - React hook to track if the window is focused.
 *
 * @returns isFocused - boolean indicating if the window is focused
 *
 * @example
 * const isFocused = useWindowFocus();
 * if (isFocused) {
 *   // Do something when window is focused
 * }
 */
export function useWindowFocus(): boolean {
  const [isFocused, setIsFocused] = useState(() => typeof document !== 'undefined' ? document.hasFocus() : true);

  useEffect(() => {
    function handleFocus() {
      setIsFocused(true);
    }
    function handleBlur() {
      setIsFocused(false);
    }
    window.addEventListener('focus', handleFocus);
    window.addEventListener('blur', handleBlur);
    return () => {
      window.removeEventListener('focus', handleFocus);
      window.removeEventListener('blur', handleBlur);
    };
  }, []);

  return isFocused;
}
