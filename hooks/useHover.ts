import { useRef, useState, useEffect } from "react";

/**
 * Detects hover state of an element.
 */
export function useHover<T extends HTMLElement>(): [
  React.RefObject<T | null>,
  boolean
] {
  const ref = useRef<T>(null);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onEnter = () => setHovered(true);
    const onLeave = () => setHovered(false);

    el.addEventListener("mouseenter", onEnter);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mouseenter", onEnter);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, [ref.current]);

  return [ref, hovered];
}
