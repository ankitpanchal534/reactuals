import { useEffect, useState } from "react";

export function useScrollDirection(): "up" | "down" {
  const [direction, setDirection] = useState<"up" | "down">("down");

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const updateScrollDir = () => {
      const currentScrollY = window.scrollY;
      setDirection(currentScrollY > lastScrollY ? "down" : "up");
      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", updateScrollDir);
    return () => window.removeEventListener("scroll", updateScrollDir);
  }, []);

  return direction;
}

/*
Example:
const direction = useScrollDirection();
console.log(direction); // "up" or "down"
*/
