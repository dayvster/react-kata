import { useCallback } from 'react';


/**
 * useReload - Returns a function to reload the current page. Optionally accepts a predicate to conditionally reload.
 *
 * @param shouldReload Optional predicate function. If provided, reload only occurs if it returns true.
 * @param reloadFn Optional reload function for testing. Defaults to window.location.reload.
 * @returns Function to reload the page.
 *
 * @example
 * const reload = useReload();
 * // ...
 * reload();
 *
 * @example
 * // Only reload if predicate returns true
 * const reload = useReload(() => someCondition);
 * reload();
 */
export function useReload(
  shouldReload?: () => boolean,
  reloadFn?: () => void
) {
  const reload = reloadFn || (() => window.location.reload());
  return useCallback(() => {
    if (!shouldReload || shouldReload()) {
      reload();
    }
  }, [shouldReload, reload]);
}
