import { useCallback, useState } from "react";

export function useClipboardRead(): {
  readText: () => Promise<string | null>;
  error: Error | null;
} {
  const [error, setError] = useState<Error | null>(null);

  const readText = useCallback(async (): Promise<string | null> => {
    try {
      if (!navigator.clipboard) {
        throw new Error("Clipboard API not supported");
      }
      const text = await navigator.clipboard.readText();
      setError(null);
      return text;
    } catch (err) {
      const error =
        err instanceof Error ? err : new Error("Failed to read clipboard");
      setError(error);
      return null;
    }
  }, []);

  return { readText, error };
}
