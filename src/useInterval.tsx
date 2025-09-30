import * as React from 'react';

/**
 * A custom hook that sets up an interval to execute a callback function repeatedly at specified intervals.
 * @param callback - Function to be executed at each interval
 * @param delay - Delay in milliseconds. If null, the interval is not set.
 * @returns A function to manually stop the interval.
 *
 * @example
 * Basic usage
 * useInterval(() => {
 *   console.log('This will run every second');
 * }, 1000);
 *
 * @example
 * Usage with stop function
 * const stop = useInterval(() => {
 *   console.log('Tick');
 * }, 1000);
 *
 * To stop the interval manually:
 * stop();
 */
/**
 * @returns An object with a stop function to manually stop the interval.
 * @example
 * const { stop } = useInterval(() => { ... }, 1000);
 * stop();
 */
export const useInterval = (
  callback: () => void,
  delay: number | null
): { start: () => void; stop: () => void; pause: () => void } => {
  const savedCallback = React.useRef<() => void>();
  const intervalId = React.useRef<NodeJS.Timeout | null>(null);
  const paused = React.useRef<boolean>(false);
  const lastDelay = React.useRef<number | null>(delay);
  const lastTick = React.useRef<number | null>(null);
  const remaining = React.useRef<number | null>(null);

  React.useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  const clear = React.useCallback(() => {
    if (intervalId.current) {
      clearInterval(intervalId.current);
      intervalId.current = null;
    }
  }, []);

  const start = React.useCallback(() => {
    if (intervalId.current || delay === null) return;
    paused.current = false;
    let firstDelay = delay!;
    if (remaining.current !== null) {
      firstDelay = remaining.current;
      remaining.current = null;
    }
    intervalId.current = setTimeout(function tick() {
      if (savedCallback.current) {
        savedCallback.current();
      }
      lastTick.current = Date.now();
      intervalId.current = setInterval(() => {
        if (savedCallback.current) {
          savedCallback.current();
        }
        lastTick.current = Date.now();
      }, delay!);
    }, firstDelay);
    lastDelay.current = delay;
    lastTick.current = Date.now();
  }, [delay]);

  const stop = React.useCallback(() => {
    clear();
    paused.current = false;
    remaining.current = null;
  }, [clear]);

  const pause = React.useCallback(() => {
    if (intervalId.current) {
      if (lastTick.current !== null && delay !== null) {
        const elapsed = Date.now() - lastTick.current;
        remaining.current = Math.max(delay! - elapsed, 0);
      }
      clear();
      paused.current = true;
    }
  }, [clear, delay]);

  React.useEffect(() => {
    if (delay !== null && intervalId.current === null && !paused.current) {
      start();
    }
    return () => {
      clear();
    };
  }, [delay, start, clear]);

  return { start, stop, pause };
};