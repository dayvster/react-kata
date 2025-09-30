import * as React from 'react';
/**
 * A hook that tracks the previous value of a state or prop.
 * @param value - The value to track
 * @returns The previous value before the current render
 */
export const usePrevious = <T,>(value: T): T | undefined => {
  const ref = React.useRef<T>();
  React.useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
};
