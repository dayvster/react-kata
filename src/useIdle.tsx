import { useEffect, useState } from 'react';
import { useTimeout } from './useTimeout';

/**
 * useIdle - Tracks if the user is idle for a given timeout (ms).
 * @param timeout - Time in ms before considered idle (default: 60000)
 * @returns isIdle - boolean
 */
export function useIdle(timeout: number = 60000): boolean {
  const [isIdle, setIsIdle] = useState(false);
  const [timerKey, setTimerKey] = useState(0);

  useTimeout(() => setIsIdle(true), timeout && !isIdle ? timeout : null);

  useEffect(() => {
    const reset = () => {
      if (isIdle) setIsIdle(false);
      setTimerKey(k => k + 1); // force rerender to restart timer
    };
    const events = ['mousemove', 'mousedown', 'keydown', 'touchstart', 'scroll'];
    events.forEach(e => window.addEventListener(e, reset));
    reset();
    return () => {
      events.forEach(e => window.removeEventListener(e, reset));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeout, isIdle]);

  // Restart timer when timerKey changes
  useEffect(() => {
    if (!isIdle) {
      setIsIdle(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timerKey]);

  return isIdle;
}
