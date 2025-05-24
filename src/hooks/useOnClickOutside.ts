import { useEffect, RefObject } from "react";

/**
 * Detects clicks outside a referenced element.
 * @param ref - The ref of the element
 * @param handler - The callback on outside click
 *
 * Example:
 * const ref = useRef(null);
 * useOnClickOutside(ref, () => setOpen(false));
 */
export function useOnClickOutside<T extends HTMLElement>(
  ref: RefObject<T>,
  handler: (event: MouseEvent | TouchEvent) => void
): void {
  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      if (!ref.current || ref.current.contains(event.target as Node)) return;
      handler(event);
    };
    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);
    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, handler]);
}
