import React from 'react';

export const useDebounce = <T,>(value: T, delay: number = 400): T | null => {
  const [debouncedValue, setDebouncedValue] = React.useState<T | null>(null);
  
  React.useEffect(() => {
    if (value) {
      const handler = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);
      
      return () => {
        clearTimeout(handler);
      };
    }
  }, [value, delay]);

  return debouncedValue;
};