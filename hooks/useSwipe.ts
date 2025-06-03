import { useRef, useState, useEffect } from "react";

export type SwipeDirection = "left" | "right" | "up" | "down" | null;

export interface UseSwipeOptions {
  threshold: number; // Minimum distance (px) to consider a swipe
}

export function useSwipe(
  options: UseSwipeOptions = { threshold: 50 }
): [React.RefObject<HTMLElement | null>, SwipeDirection] {
  const ref = useRef<HTMLElement>(null);
  const [direction, setDirection] = useState<SwipeDirection>(null);
  const startPos = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleTouchStart = (e: TouchEvent) => {
      const touch = e.touches[0];
      startPos.current = { x: touch.clientX, y: touch.clientY };
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (!startPos.current) return;
      const touch = e.changedTouches[0];
      const deltaX = touch.clientX - startPos.current.x;
      const deltaY = touch.clientY - startPos.current.y;

      if (
        Math.abs(deltaX) > Math.abs(deltaY) &&
        Math.abs(deltaX) > options.threshold
      ) {
        setDirection(deltaX > 0 ? "right" : "left");
      } else if (Math.abs(deltaY) > options.threshold) {
        setDirection(deltaY > 0 ? "down" : "up");
      }

      setTimeout(() => setDirection(null), 0); // Reset direction after detection
      startPos.current = null;
    };

    element.addEventListener("touchstart", handleTouchStart);
    element.addEventListener("touchend", handleTouchEnd);

    return () => {
      element.removeEventListener("touchstart", handleTouchStart);
      element.removeEventListener("touchend", handleTouchEnd);
    };
  }, [options.threshold]);

  return [ref, direction];
}
