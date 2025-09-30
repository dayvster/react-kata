import { useEffect, useRef } from 'react';

/**
 * useFocusTrap
 *
 * Traps keyboard focus within a container element (e.g., modal, dialog).
 * Returns a ref to attach to the container. Focus will cycle through tabbable children.
 *
 * @param enabled - Whether the focus trap is active
 * @returns ref to attach to the container
 *
 * @example
 * const ref = useFocusTrap(true);
 * return <div ref={ref}>...</div>;
 */
export function useFocusTrap(enabled: boolean = true) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!enabled || !containerRef.current) return;
    const node = containerRef.current;
    const focusableSelectors = [
      'a[href]', 'button:not([disabled])', 'textarea:not([disabled])',
      'input:not([disabled])', 'select:not([disabled])', '[tabindex]:not([tabindex="-1"])'
    ];
    const getFocusable = () =>
      Array.from(node.querySelectorAll<HTMLElement>(focusableSelectors.join(',')))
        .filter(el => !el.hasAttribute('disabled') && !el.getAttribute('aria-hidden'));

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key !== 'Tab') return;
      const focusable = getFocusable();
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey) {
        if (document.activeElement === first) {
          last.focus();
          e.preventDefault();
        }
      } else {
        if (document.activeElement === last) {
          first.focus();
          e.preventDefault();
        }
      }
    }
    node.addEventListener('keydown', handleKeyDown);
    
    const focusable = getFocusable();
    if (focusable.length) focusable[0].focus();
    return () => {
      node.removeEventListener('keydown', handleKeyDown);
    };
  }, [enabled]);

  return containerRef;
}
