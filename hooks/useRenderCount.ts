import { useRef } from "react";

/**
 * Tracks how many times a component has rendered.
 *
 * Example:
 * const count = useRenderCount();
 * return <div>Rendered {count} times</div>;
 */
export function useRenderCount(): number {
  const count = useRef(1);
  count.current += 1;
  return count.current;
}
