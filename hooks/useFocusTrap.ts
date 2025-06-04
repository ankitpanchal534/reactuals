import { useEffect } from "react";

export function useFocusTrap(ref: React.RefObject<HTMLElement>) {
  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const focusable = node.querySelectorAll<HTMLElement>(
      'a[href], button, textarea, input, select, [tabindex]:not([tabindex="-1"])'
    );
    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    const handleTab = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;

      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    node.addEventListener("keydown", handleTab);
    return () => node.removeEventListener("keydown", handleTab);
  }, [ref]);
}

/*
Example:
const modalRef = useRef(null);
useFocusTrap(modalRef);
return <div ref={modalRef}>Modal</div>;
*/
