import { useEffect, useRef } from "react";

/**
 * Runs a function after a delay.
 * @param callback - Function to run
 * @param delay - Delay in milliseconds
 *
 * Example:
 * useTimeout(() => setMessage("Done!"), 2000);
 */
export function useTimeout(callback: () => void, delay: number): void {
  const savedCallback = useRef(callback);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    const id = setTimeout(() => savedCallback.current(), delay);
    return () => clearTimeout(id);
  }, [delay]);
}
