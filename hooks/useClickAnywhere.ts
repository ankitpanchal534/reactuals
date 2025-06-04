import { useEffect } from "react";

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
