import { useEffect } from "react";

// useClickAnywhere
export function useClickAnywhere(handler) {
  useEffect(() => {
    document.addEventListener("click", handler);
    window.addEventListener("click", handler);
    return () => {
      document.removeEventListener("click", handler);
      window.removeEventListener("click", handler);
    };
  }, []);
  return undefined;
}

// useWindowResize
export function useWindowResize(handler) {
  useEffect(() => {
    document.addEventListener("resize", handler);
    window.addEventListener("resize", handler);
    return () => {
      document.removeEventListener("resize", handler);
      window.removeEventListener("resize", handler);
    };
  }, []);
  return undefined;
}
