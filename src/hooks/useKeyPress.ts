import { useEffect } from "react";

/**
 * Detect when a specific keyboard key is pressed.
 * @param targetKey - The key to listen for (e.g. "Enter", "Escape")
 * @param handler - Function to call when key is pressed
 */
export function useKeyPress(
  targetKey: string,
  handler: (event: KeyboardEvent) => void
): void {
  useEffect(() => {
    const keyListener = (event: KeyboardEvent) => {
      if (event.key === targetKey) {
        handler(event);
      }
    };
    window.addEventListener("keydown", keyListener);
    return () => window.removeEventListener("keydown", keyListener);
  }, [targetKey, handler]);
}
