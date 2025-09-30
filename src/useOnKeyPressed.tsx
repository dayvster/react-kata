import * as React from 'react';

/**
 * A React hook that triggers a callback when a specific key is pressed.
 * @param targetKey - The key to listen for (e.g., 'Enter', 'Escape')
 * @param handler - The function to call when the target key is pressed
 * @example
 * useOnKeyPressed('Enter', () => {
 *   console.log('Enter key was pressed');
 * });
 */
export function useOnKeyPressed(targetKey: string, handler: (event: KeyboardEvent) => void) {
  React.useEffect(() => {
    const keyHandler = (event: KeyboardEvent) => {
      if (event.key === targetKey) {
        handler(event);
      }
    };
    window.addEventListener('keydown', keyHandler);
    return () => {
      window.removeEventListener('keydown', keyHandler);
    };
  }, [targetKey, handler]);
}
