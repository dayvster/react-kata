import React from 'react';

export const useDebounce = <T,>(value: T, delay: number = 400): T => {
  const [debouncedValue, setDebouncedValue] = React.useState<T>(value);
  
  React.useEffect(() => {
      const handler = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);
      
      return () => {
        clearTimeout(handler);
      };
  }, [value, delay]);

  return debouncedValue;
};