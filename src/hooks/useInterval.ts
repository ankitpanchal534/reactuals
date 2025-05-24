import { useEffect, useRef } from "react";

/**
 * Runs a function repeatedly at a set interval.
 * @param callback - Function to call
 * @param delay - Delay in ms (set null to pause)
 */
export function useInterval(callback: () => void, delay: number | null): void {
  const savedCallback = useRef(callback);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    if (delay === null) return;
    const id = setInterval(() => savedCallback.current(), delay);
    return () => clearInterval(id);
  }, [delay]);
}
