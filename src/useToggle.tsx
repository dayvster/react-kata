import * as React from "react";

/**
 * A custom hook that manages a toggleable state.
 * @param initialValue - The initial value of the state. If not provided, defaults to false.
 * @param alternateValue - The alternate value to toggle to. If not provided, toggles between true and false.
 * @returns A tuple containing the current value and an object with `toggle` and `set` functions.
 * @example
 * const [val, { toggle, set }] = useToggle("hello", "world");
 * const [bool, { toggle }] = useToggle();
 */
export function useToggle<T = boolean>(
  initialValue?: T,
  alternateValue?: T
): [T, { toggle: () => void; set: (v: T) => void }] {
  const isBoolean =
    initialValue === undefined && alternateValue === undefined;
  const [value, setValue] = React.useState<T>(
    isBoolean ? (false as T) : (initialValue as T)
  );

  const toggle = React.useCallback(() => {
    if (isBoolean) {
      setValue((v) => (!v as T));
    } else {
      setValue((v) => (v === initialValue ? alternateValue! : initialValue!));
    }
  }, [initialValue, alternateValue, isBoolean]);

  const set = React.useCallback((v: T) => {
    setValue(v);
  }, []);

  return [value, { toggle, set }];
}