import * as React from "react";

/**
 * A React hook that adds an event listener to a specified element and cleans up on unmount.
 * @param eventName - The name of the event to listen for (e.g., 'click', 'resize')
 * @param handler - The function to call when the event is triggered
 * @param element - The target element to attach the event listener to (default is window)
 * @example
 * useEventListener('click', (event) => {
 *   console.log('Element clicked', event);
 * }, document.getElementById('my-element'));
 */
export const useEventListener = <K extends keyof HTMLElementEventMap>(
  eventName: K,
  handler: (event: HTMLElementEventMap[K]) => void,
  element: HTMLElement | Window = window
) => {
  const savedHandler = React.useRef<(event: HTMLElementEventMap[K]) => void>();

  React.useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  React.useEffect(() => {
    const isSupported = element && element.addEventListener;
    if (!isSupported) return;

    const eventListener = (event: Event) => {
      if (savedHandler.current) {
        savedHandler.current(event as HTMLElementEventMap[K]);
      }
    };

    element.addEventListener(eventName, eventListener);

    return () => {
      element.removeEventListener(eventName, eventListener);
    };
  }, [eventName, element]);
};