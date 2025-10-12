import { useEffect, useRef } from 'react';

/**
 * useWhyDidYouUpdate - Logs the props that changed between renders for a component, or calls a callback.
 * @param name - The name of the component (for logging)
 * @param props - The props object to watch
 * @param callback - Optional callback to receive changed props
 * @param dependencyArray - Optional array of dependencies to control when to check for changes
 */
export function useWhyDidYouUpdate<T extends Record<string, unknown>>(
  name: string,
  props: T,
  callback?: (changedProps: Record<string, { from: T[keyof T]; to: T[keyof T] }>) => void,
  dependencyArray?: Array<unknown>
) {
  const prevProps = useRef<T>();
  const deps = dependencyArray ?? [props];

  useEffect(() => {
    if (prevProps.current) {
      const changedProps: Record<string, { from: T[keyof T]; to: T[keyof T] }> = {};
      Object.keys(props).forEach(key => {
        if (prevProps.current && prevProps.current[key] !== props[key]) {
          changedProps[key] = {
            from: prevProps.current[key] as T[keyof T],
            to: props[key] as T[keyof T],
          };
        }
      });
      if (Object.keys(changedProps).length > 0) {
        if (callback) {
          callback(changedProps);
        } else {
          console.log(`[why-did-you-update] ${name}`, changedProps);
        }
      }
    }
    prevProps.current = props;
  }, deps);
}
