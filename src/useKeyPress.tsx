import * as React from 'react';

/**
 * A React hook that listens for key presses and triggers a handler when a specific key is pressed.
 * @param targetKey - The key to listen for (e.g., 'Enter', 'Escape'). If not provided, all key presses are tracked.
 * @param handler - A callback function to execute when the target key is pressed.
 * @returns An object containing the last key pressed, its code, and the original keyboard event.
 * @example
 * const lastKey = useKeyPress('Enter', () => console.log('Enter key pressed'));
 * console.log(lastKey);
 */
export function useKeyPress() {
  const [lastKey, setLastKey] = React.useState<{ key: string | null; code: string | null; event: KeyboardEvent | null }>({ key: null, code: null, event: null });
  React.useEffect(() => {
    const keyHandler = (event: KeyboardEvent) => {
      setLastKey({ key: event.key, code: event.code, event });
    };
    window.addEventListener('keydown', keyHandler);
    return () => {
      window.removeEventListener('keydown', keyHandler);
    };
  }, []);
  return lastKey;
}