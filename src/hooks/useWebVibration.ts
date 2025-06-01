import { useCallback, useState } from "react";

export function useWebVibration(): {
  vibrate: (pattern: number | number[]) => boolean;
  isSupported: boolean;
  error: Error | null;
} {
  const [error, setError] = useState<Error | null>(null);
  const isSupported =
    typeof navigator !== "undefined" && "vibrate" in navigator;

  const vibrate = useCallback(
    (pattern: number | number[]): boolean => {
      if (!isSupported) {
        setError(new Error("Vibration API not supported"));
        return false;
      }

      try {
        const success = navigator.vibrate(pattern);
        setError(null);
        return success;
      } catch (err) {
        const error =
          err instanceof Error ? err : new Error("Failed to vibrate");
        setError(error);
        return false;
      }
    },
    [isSupported]
  );

  return { vibrate, isSupported, error };
}
