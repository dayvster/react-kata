import * as React from "react";

export const useThrottle = <T,>(value: T, limit: number, defaultValue?: T): T => {
  const [throttledValue, setThrottledValue] = React.useState<T>(defaultValue !== undefined ? defaultValue : value);
  const lastRan = React.useRef(Date.now());

  React.useEffect(() => {
    if (limit <= 0) {
      setThrottledValue(value);
      lastRan.current = Date.now();
      return;
    }
    const delay = Math.max(limit - (Date.now() - lastRan.current), 0);
    const handler = setTimeout(() => {
      if (Date.now() - lastRan.current >= limit) {
        setThrottledValue(value);
        lastRan.current = Date.now();
      }
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, limit]);

  return throttledValue;
};