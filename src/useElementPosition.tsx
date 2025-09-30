import { useCallback, useLayoutEffect, useState } from 'react';

/**
 * useElementPosition
 *
 * Returns the position (top, left, right, bottom) of a DOM element via a ref.
 *
 * @returns [ref, { top, left, right, bottom }]
 *
 * @example
 * const [ref, pos] = useElementPosition();
 * <div ref={ref}>...</div>
 * // pos.top, pos.left, pos.right, pos.bottom
 */
export function useElementPosition<T extends HTMLElement = HTMLElement>() {
  const [position, setPosition] = useState({ top: 0, left: 0, right: 0, bottom: 0 });
  const ref = useCallback((node: T | null) => {
    if (!node) return;
    const updatePosition = () => {
      const rect = node.getBoundingClientRect();
      setPosition({ top: rect.top, left: rect.left, right: rect.right, bottom: rect.bottom });
    };
    updatePosition();
    window.addEventListener('resize', updatePosition);
    window.addEventListener('scroll', updatePosition);
    return () => {
      window.removeEventListener('resize', updatePosition);
      window.removeEventListener('scroll', updatePosition);
    };
  }, []);
  return [ref, position] as const;
}
