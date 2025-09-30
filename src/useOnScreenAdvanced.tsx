import * as React from 'react';

/**
 * A React hook that triggers a callback when an element is visible on screen for a given duration and threshold.
 * @param ref - React ref to the target element
 * @param threshold - Percentage (0-1) of the element that must be visible (default: 0)
 * @param duration - Time in ms the element must be visible before triggering (default: 0)
 * @param callback - Function to call when the element is visible for the duration
 * @returns isOnScreen: boolean
 * @example
 * useOnScreenAdvanced(ref, 0.5, 1000, () => console.log('Half visible for 1s!'))
 */
export function useOnScreenAdvanced(
  ref: React.RefObject<Element>,
  threshold: number = 0,
  duration: number = 0,
  callback?: () => void
) {
  const [isOnScreen, setIsOnScreen] = React.useState(false);
  const timerRef = React.useRef<NodeJS.Timeout | null>(null);

  React.useEffect(() => {
    if (!ref.current) return;
    let triggered = false;
    const observer = new window.IntersectionObserver(
      ([entry]) => {
        setIsOnScreen(entry.intersectionRatio >= threshold);
        if (entry.intersectionRatio >= threshold) {
          if (!triggered && callback) {
            if (duration > 0) {
              timerRef.current = setTimeout(() => {
                callback();
                triggered = true;
              }, duration);
            } else {
              callback();
              triggered = true;
            }
          }
        } else {
          if (timerRef.current) {
            clearTimeout(timerRef.current);
            timerRef.current = null;
          }
          triggered = false;
        }
      },
      { threshold }
    );
    observer.observe(ref.current);
    return () => {
      observer.disconnect();
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [ref, threshold, duration, callback]);

  return isOnScreen;
}
