import { useEffect, useRef } from 'react';

/**
 * useKeySequence
 *
 * Detects a specific sequence of key presses and triggers a callback.
 *
 * @param sequence - Array of key values (e.g. ['ArrowUp', 'ArrowUp', 'ArrowDown'])
 * @param callback - Function to call when the sequence is matched
 * @param options - Optional: { resetOnMatch?: boolean, timeout?: number }
 * @returns lastMatched: boolean
 *
 * @example
 * useKeySequence(['a', 'b', 'c'], () => alert('Sequence!'));
 */
export function useKeySequence(
  sequence: string[],
  callback: () => void,
  options?: { resetOnMatch?: boolean; timeout?: number }
): boolean {
  const buffer = useRef<string[]>([]);
  const timeoutRef = useRef<number | null>(null);
  const lastMatched = useRef(false);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      buffer.current.push(e.key);
      if (buffer.current.length > sequence.length) buffer.current.shift();
      if (sequence.every((k, i) => buffer.current[i] === k)) {
        callback();
        lastMatched.current = true;
        if (options?.resetOnMatch) buffer.current = [];
      } else {
        lastMatched.current = false;
      }
      if (options?.timeout) {
        if (typeof window !== 'undefined') {
          if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
          timeoutRef.current = window.setTimeout(() => {
            buffer.current = [];
          }, options.timeout);
        }
      }
    }
    if (typeof window !== 'undefined') {
      window.addEventListener('keydown', onKeyDown);
    }
    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('keydown', onKeyDown);
        if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
      }
    };
  }, [sequence.join(','), callback, options?.resetOnMatch, options?.timeout]);

  return lastMatched.current;
}
