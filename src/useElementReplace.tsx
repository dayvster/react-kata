import { useMemo } from 'react';

/**
 * useElementReplace
 *
 * Returns a React element that can be used as a placeholder or replacement for loading states, similar to useShimmer,
 * but allows you to provide your own custom React element.
 *
 * @param element - The React element to use as the replacement
 * @param width - Optional width to apply to the element
 * @param height - Optional height to apply to the element
 * @returns The provided React element with optional width/height applied
 *
 * @example
 * const placeholder = useElementReplace(<div className="my-loader" />, 100, 40);
 *
 */
export function useElementReplace<T extends JSX.Element>(
  element: T,
  width?: number | string,
  height?: number | string
): T {
  return useMemo(() => {
    if (!element) return element;
    const style = {
      ...(element.props.style || {}),
      ...(width !== undefined ? { width } : {}),
      ...(height !== undefined ? { height } : {}),
    };
    return {
      ...element,
      props: {
        ...element.props,
        style,
      },
    };
  }, [element, width, height]);
}
