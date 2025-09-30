import * as React from 'react';

/**
 * A React hook that tracks if an element is visible in the viewport using Intersection Observer.
 * @param ref - A React ref object pointing to the target element
 * @param options - IntersectionObserver options
 * @returns A boolean indicating if the element is on screen
 * @example
 * const ref = useRef(null);
 * const isOnScreen = useOnScreen(ref);
 */
export function useOnScreen(
  ref: React.RefObject<Element>,
  options?: IntersectionObserverInit
): boolean {
  const [isIntersecting, setIntersecting] = React.useState(false);

  React.useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new window.IntersectionObserver(
      ([entry]) => setIntersecting(entry.isIntersecting),
      options
    );
    observer.observe(node);
    return () => {
      observer.disconnect();
    };
  }, [ref, options]);

  return isIntersecting;
}
