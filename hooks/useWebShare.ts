import { useCallback, useState } from "react";

export function useWebShare(): {
  share: (data: ShareData) => Promise<boolean>;
  isSupported: boolean;
  error: Error | null;
} {
  const [error, setError] = useState<Error | null>(null);
  const isSupported = typeof navigator !== "undefined" && "share" in navigator;

  const share = useCallback(
    async (data: ShareData): Promise<boolean> => {
      if (!isSupported) {
        setError(new Error("Web Share API not supported"));
        return false;
      }

      try {
        await navigator.share(data);
        setError(null);
        return true;
      } catch (err) {
        const error =
          err instanceof Error ? err : new Error("Failed to share content");
        setError(error);
        return false;
      }
    },
    [isSupported]
  );

  return { share, isSupported, error };
}
