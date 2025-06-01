import { useEffect, useRef } from "react";

export function usePortal(id: string = "portal-root"): HTMLElement {
  const rootElemRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    let existingParent = document.getElementById(id);
    let systemCreated = false;

    if (!existingParent) {
      existingParent = document.createElement("div");
      existingParent.setAttribute("id", id);
      document.body.appendChild(existingParent);
      systemCreated = true;
    }

    if (rootElemRef.current && existingParent) {
      existingParent.appendChild(rootElemRef.current);
    }

    return () => {
      if (rootElemRef.current && existingParent) {
        existingParent.removeChild(rootElemRef.current);
      }
      if (systemCreated && existingParent?.parentNode) {
        existingParent.parentNode.removeChild(existingParent);
      }
    };
  }, [id]);

  if (!rootElemRef.current) {
    rootElemRef.current = document.createElement("div");
  }

  return rootElemRef.current;
}
