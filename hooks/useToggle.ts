import { useCallback, useState } from "react";

/**
 * Toggle a boolean state.
 * @param initialValue - Initial value (default false)
 * @returns [value, toggleFunction]
 *
 * Example:
 * const [isOpen, toggle] = useToggle();
 * <button onClick={toggle}>{isOpen ? "Close" : "Open"}</button>
 */
export function useToggle(initialValue = false): [boolean, () => void] {
  const [value, setValue] = useState(initialValue);
  const toggle = useCallback(() => setValue((v) => !v), []);
  return [value, toggle];
}
