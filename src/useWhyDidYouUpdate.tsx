import { useEffect, useRef } from 'react';

/**
 * useWhyDidYouUpdate - Logs the props that changed between renders for a component, or calls a callback.
 * @param name - The name of the component (for logging)
 * @param props - The props object to watch
 * @param callback - Optional callback to receive changed props
 */
export function useWhyDidYouUpdate<T extends Record<string, any>>(
  name: string,
  props: T,
  callback?: (changedProps: Record<string, { from: any; to: any }>) => void
) {
  const prevProps = useRef<T>();

  useEffect(() => {
    if (prevProps.current) {
      const changedProps: Record<string, { from: any; to: any }> = {};
      Object.keys(props).forEach(key => {
        if (prevProps.current && prevProps.current[key] !== props[key]) {
          changedProps[key] = {
            from: prevProps.current[key],
            to: props[key],
          };
        }
      });
      if (Object.keys(changedProps).length > 0) {
        if (callback) {
          callback(changedProps);
        } else {
          // eslint-disable-next-line no-console
          console.log(`[why-did-you-update] ${name}`, changedProps);
        }
      }
    }
    prevProps.current = props;
  });
}
