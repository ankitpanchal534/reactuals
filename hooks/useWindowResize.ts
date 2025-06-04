import { useEffect } from "react";

export function useWindowResize(handler: (event: UIEvent) => void): void {
  useEffect(() => {
    window.addEventListener("resize", handler);
    return () => {
      window.removeEventListener("resize", handler);
    };
  }, [handler]);
}
