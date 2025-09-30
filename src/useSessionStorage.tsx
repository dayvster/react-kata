import * as React from 'react';

export function useSessionStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T | ((prev: T) => T)) => void] {
  const isSerializable = (val: unknown): boolean => {
    if (
      typeof val === 'string' ||
      typeof val === 'number' ||
      typeof val === 'boolean' ||
      val === null
    ) {
      return true;
    }
    if (typeof val === 'object' && val !== null) {
      try {
        JSON.stringify(val);
        return true;
      } catch {
        return false;
      }
    }
    return false;
  };

  const [storedValue, setStoredValue] = React.useState<T>(() => {
    if (typeof window === 'undefined') {
      return initialValue;
    }
    try {
      const item = window.sessionStorage.getItem(key);
      return item ? (JSON.parse(item) as T) : initialValue;
    } catch (error) {
      console.warn(`Error reading sessionStorage key "${key}":`, error);
      return initialValue;
    }
  });

  React.useEffect(() => {
    if (typeof window === 'undefined') return;
    const handleStorage = (event: StorageEvent) => {
      if (event.storageArea === window.sessionStorage && event.key === key) {
        try {
          if (event.newValue === null) {
            setStoredValue(initialValue);
          } else {
            const parsed = JSON.parse(event.newValue);
            if (isSerializable(parsed)) {
              setStoredValue(parsed as T);
            } else {
              console.warn(`Type error syncing sessionStorage key "${key}": value not serializable.`);
            }
          }
        } catch (error) {
          console.warn(`Error syncing sessionStorage key "${key}":`, error);
        }
      }
    };
    window.addEventListener('storage', handleStorage);
    return () => {
      window.removeEventListener('storage', handleStorage);
    };
  }, [key, initialValue]);

  const setValue = (value: T | ((prev: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      if (!isSerializable(valueToStore)) {
        throw new Error('Value must be serializable (object, string, number, boolean, or null)');
      }
      setStoredValue(valueToStore);
      if (typeof window !== 'undefined') {
        window.sessionStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.warn(`Error setting sessionStorage key "${key}":`, error);
    }
  };

  return [storedValue, setValue];
};