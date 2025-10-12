import * as React from 'react';

/**
 * A React hook that tracks whether a given element is focused.
 * @param ref - A React ref object pointing to the target element
 * @returns A boolean indicating whether the element is focused
 * @example
 * const inputRef = useRef(null);
 * const isFocused = useFocus(inputRef);
 */
export const useFocus = (ref: React.RefObject<HTMLElement | null>, defaultValue: boolean = false) => {
  const [isFocused, setIsFocused] = React.useState(defaultValue);

  React.useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const handleFocus = () => setIsFocused(true);
    const handleBlur = () => setIsFocused(false);

    node.addEventListener('focus', handleFocus);
    node.addEventListener('blur', handleBlur);

    return () => {
      node.removeEventListener('focus', handleFocus);
      node.removeEventListener('blur', handleBlur);
    };
  }, [ref]);

  return isFocused;
};