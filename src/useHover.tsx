import * as React from 'react';

/**
 * A React hook that tracks whether a given element is currently hovered.
 * @param ref - A React ref object pointing to the target HTML element
 * @returns A boolean indicating whether the element is hovered
 * @example
 * const ref = useRef(null);
 * const isHovered = useHovered(ref);
 */
export const useHovered = (ref: React.RefObject<HTMLElement>) => {
  const [isHovered, setIsHovered] = React.useState(false);

  React.useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const handleMouseEnter = () => setIsHovered(true);
    const handleMouseLeave = () => setIsHovered(false);

    node.addEventListener('mouseenter', handleMouseEnter);
    node.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      node.removeEventListener('mouseenter', handleMouseEnter);
      node.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [ref]);

  return isHovered;
};