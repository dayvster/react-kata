import * as React from "react";

/**
 * A flexible React hook for managing toggleable state.
 *
 * Supports two modes:
 *
 * 1. Boolean mode (default):
 *    If no values are provided, the hook behaves like a boolean toggle.
 *
 * 2. Value toggle mode:
 *    If `initialValue` and `alternateValue` are provided, the hook toggles
 *    between those two values.
 *
 * @template T - The type of the state value.
 *
 * @param initialValue
 * The initial state value. If omitted, defaults to `false` (boolean mode).
 *
 * @param alternateValue
 * The alternate value used when toggling in value mode.
 * If omitted, the hook operates in boolean mode.
 *
 * @returns A tuple containing:
 * - The current state value
 * - An object with:
 *   - `toggle`: Switches between the two states
 *   - `set`: Manually sets the state to a specific value
 *
 * @example
 * // Boolean mode
 * const [open, { toggle }] = useToggle();
 *
 * @example
 * // Value mode
 * const [theme, { toggle }] = useToggle("light", "dark");
 *
 * @example
 * // Manual control
 * const [mode, { set }] = useToggle("edit", "preview");
 * set("preview");
 */
export function useToggle<T = boolean>(
  initialValue?: T,
  alternateValue?: T
): [T, { toggle: () => void; set: (v: T) => void }] {
  const isBoolean = typeof initialValue === "boolean" && alternateValue === undefined;

  const [value, setValue] = React.useState<T>(
    (initialValue ?? false) as T
  );

  const toggle = React.useCallback(() => {
    if (isBoolean) {
      setValue((v: T) => (!v as T));
    } else {
      setValue((v: T) =>
        v === initialValue ? (alternateValue as T) : (initialValue as T)
      );
    }
  }, [initialValue, alternateValue, isBoolean]);

  const set = React.useCallback((v: T) => setValue(v), []);

  return [value, { toggle, set }];
}