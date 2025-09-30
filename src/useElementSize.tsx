import { useCallback, useLayoutEffect, useState } from 'react';

/**
 * useElementSize
 *
 * Returns the size (width, height) of a DOM element via a ref.
 *
 * @returns [ref, { width, height }]
 *
 * @example
 * const [ref, size] = useElementSize();
 * <div ref={ref}>...</div>
 * // size.width, size.height
 */
export function useElementSize<T extends HTMLElement = HTMLElement>() {
  const [size, setSize] = useState({ width: 0, height: 0 });
  const ref = useCallback((node: T | null) => {
    if (!node) return;
    const updateSize = () => {
      setSize({ width: node.offsetWidth, height: node.offsetHeight });
    };
    updateSize();
    window.addEventListener('resize', updateSize);
    return () => {
      window.removeEventListener('resize', updateSize);
    };
  }, []);
  return [ref, size] as const;
}
