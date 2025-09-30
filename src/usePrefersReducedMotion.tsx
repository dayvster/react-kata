import { useEffect, useState } from 'react';

/**
 * usePrefersReducedMotion - Tracks if the user prefers reduced motion (accessibility).
 * @returns prefersReducedMotion - boolean
 */
export function usePrefersReducedMotion(): boolean {
  const getPref = () =>
    window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const [prefersReducedMotion, setPrefersReducedMotion] = useState(getPref());

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handler = () => setPrefersReducedMotion(mq.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  return prefersReducedMotion;
}
