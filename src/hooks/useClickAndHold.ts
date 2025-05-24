import { useRef, useEffect } from "react";

/**
 * Triggers a callback after user holds mouse down for delay.
 *
 * Example:
 * const ref = useClickAndHold(() => console.log("Held!"), 1000);
 * return <button ref={ref}>Hold Me</button>;
 */
export function useClickAndHold(callback: () => void, delay = 1000) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    let timer: any;

    const start = () => (timer = setTimeout(callback, delay));
    const cancel = () => clearTimeout(timer);

    node.addEventListener("mousedown", start);
    node.addEventListener("mouseup", cancel);
    node.addEventListener("mouseleave", cancel);

    return () => {
      node.removeEventListener("mousedown", start);
      node.removeEventListener("mouseup", cancel);
      node.removeEventListener("mouseleave", cancel);
    };
  }, [callback, delay]);

  return ref;
}
