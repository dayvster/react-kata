import * as React from 'react';


/**
 * A hook that triggers a handler when a click occurs outside the referenced element.
 * @param ref - A React ref object pointing to the element to detect outside clicks for
 * @param handler - A callback function to execute when an outside click is detected
 * @example
 * const ref = useRef(null);
 * useClickOutside(ref, () => {
 *   console.log('Clicked outside the element!');
 * });
 */
export const useClickOutside = <T extends HTMLElement = HTMLElement>(
  ref: React.RefObject<T>,
  handler: (event: MouseEvent | TouchEvent) => void
): void => {
  React.useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      const el = ref?.current;
      if (!el || el.contains(event.target as Node)) {
        return;
      }
      handler(event);
    };
    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);
    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, handler]);
};