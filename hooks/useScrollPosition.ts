import { useEffect, useState } from "react";

/**
 * Returns the current scroll Y position of the window.
 * Automatically updates on scroll.
 */
export function useScrollPosition(): number {
  const [scrollY, setScrollY] = useState<number>(window.scrollY);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return scrollY;
}
