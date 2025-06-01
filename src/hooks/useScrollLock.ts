import { useCallback, useEffect, useRef, useState } from "react";

export function useScrollLock(initialLocked = false) {
  const [locked, setLocked] = useState(initialLocked);
  const originalOverflow = useRef<string>("");

  useEffect(() => {
    if (locked) {
      originalOverflow.current = window.getComputedStyle(
        document.body
      ).overflow;
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = originalOverflow.current || "";
    }
    return () => {
      document.body.style.overflow = originalOverflow.current || "";
    };
  }, [locked]);

  const lock = useCallback(() => setLocked(true), []);
  const unlock = useCallback(() => setLocked(false), []);
  const toggle = useCallback(() => setLocked((prev) => !prev), []);

  return { locked, lock, unlock, toggle };
}
