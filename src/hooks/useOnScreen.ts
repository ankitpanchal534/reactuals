import { useEffect, useState, RefObject } from "react";

/**
 * Detects if a given element is in the viewport.
 * @param ref - React ref to the element
 * @param rootMargin - Margin around the root (optional)
 */
export function useOnScreen(
  ref: RefObject<Element>,
  rootMargin = "0px"
): boolean {
  const [isIntersecting, setIntersecting] = useState(false);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIntersecting(entry.isIntersecting),
      { rootMargin }
    );

    observer.observe(ref.current);
    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, [ref, rootMargin]);

  return isIntersecting;
}
