import { useEffect, useRef } from "react";

/**
 * A hook that runs an effect only on updates, not on initial mount.
 *
 * Example:
 * useUpdateEffect(() => {
 *   // Effect logic here
 * }, [value]);
 */
export function useUpdateEffect(
  effect: React.EffectCallback,
  deps: React.DependencyList
): void {
  const isInitialMount = useRef(true);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      return effect();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
