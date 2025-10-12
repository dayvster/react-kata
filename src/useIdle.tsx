import { useEffect, useState } from 'react';
import { useTimeout } from './useTimeout';

/**
 * useIdle - Tracks if the user is idle for a given timeout (ms).
 * @param timeout - Time in ms before considered idle (default: 60000)
 * @returns isIdle - boolean
 */
export function useIdle(timeout: number = 60000, defaultValue: boolean = false): boolean {
  const [isIdle, setIsIdle] = useState(defaultValue);
  const [timerKey, setTimerKey] = useState(0);

  useTimeout(() => setIsIdle(true), timeout && !isIdle ? timeout : null);

  useEffect(() => {
    const reset = () => {
      if (isIdle) setIsIdle(false);
  setTimerKey(k => k + 1);
    };
    const events = ['mousemove', 'mousedown', 'keydown', 'touchstart', 'scroll'];
    if (typeof window !== 'undefined') {
      events.forEach(e => window.addEventListener(e, reset));
    }
    reset();
    return () => {
      if (typeof window !== 'undefined') {
        events.forEach(e => window.removeEventListener(e, reset));
      }
    };
    
  }, [timeout, isIdle]);

  
  useEffect(() => {
    if (!isIdle) {
      setIsIdle(false);
    }
    
  }, [timerKey]);

  return isIdle;
}
