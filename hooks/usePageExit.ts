import { useEffect } from "react";

/**
 * Detects when the user's mouse leaves the page (e.g. for exit intent).
 *
 * @param onExit - Callback when page is left
 *
 * Example:
 * usePageLeave(() => console.log("User is leaving!"));
 */
export function usePageExit(onExit: () => void): void {
  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0) onExit();
    };
    document.addEventListener("mouseout", handleMouseLeave);
    return () => document.removeEventListener("mouseout", handleMouseLeave);
  }, [onExit]);
}
