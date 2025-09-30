import * as React from "react";

/**
 * A hook that runs an effect only on updates, not on the initial mount.
 * @param effect - The effect callback to run on updates
 * @param deps - The dependency list that triggers the effect when changed
 * @example
 * useUpdateEffect(() => {
 *   console.log('This will run only on updates, not on initial mount');
 * }, [someDependency]);
 */
export const useUpdateEffect = (
  effect: React.EffectCallback,
  deps: React.DependencyList
): void => {
  const isInitialMount = React.useRef(true);

  React.useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    return effect();
  }, deps);
};