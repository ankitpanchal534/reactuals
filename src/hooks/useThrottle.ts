import { useState, useEffect } from "react";

/**
 * A hook that throttles a value by a specified delay.
 *
 * Example:
 * const throttledValue = useThrottle(value, 500);
 */
export function useThrottle<T>(value: T, delay: number): T {
  const [throttled, setThrottled] = useState<T>(value);
  const [lastExecuted, setLastExecuted] = useState<number>(Date.now());

  useEffect(() => {
    const handler = setTimeout(() => {
      if (Date.now() - lastExecuted >= delay) {
        setThrottled(value);
        setLastExecuted(Date.now());
      }
    }, delay - (Date.now() - lastExecuted));

    return () => clearTimeout(handler);
  }, [value, delay, lastExecuted]);

  return throttled;
}
