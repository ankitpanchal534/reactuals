import { useEffect } from "react";

/**
 * Runs useEffect only if condition is true.
 *
 * @param condition - Boolean to enable/disable the effect
 * @param callback - Effect callback
 * @param deps - Dependency array
 *
 * Example:
 * useConditionalEffect(isVisible, () => {
 *   console.log("Effect only runs when visible");
 * }, [isVisible]);
 */
export function useConditionalEffect(
  condition: boolean,
  callback: () => void | (() => void),
  deps: React.DependencyList
): void {
  useEffect(() => {
    if (condition) {
      return callback();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [condition, ...deps]);
}
