import { useEffect } from "react";

// useClickAnywhere
export function useClickAnywhere(handler: (event: MouseEvent) => void): void {
  useEffect(() => {
    document.addEventListener("click", handler);
    window.addEventListener("click", handler);
    return () => {
      document.removeEventListener("click", handler);
      window.removeEventListener("click", handler);
    };
  }, [handler]);
}

// useWindowResize
export function useWindowResize(handler: (event: UIEvent) => void): void {
  useEffect(() => {
    window.addEventListener("resize", handler);
    return () => {
      window.removeEventListener("resize", handler);
    };
  }, [handler]);
}
