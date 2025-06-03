import { useEffect, useRef } from "react";

/**
 * Returns the previous value of a variable.
 * @param value - Current value
 */
export function usePrevious<T>(value: T): T | undefined {
  const ref = useRef<T>(undefined);

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
}
