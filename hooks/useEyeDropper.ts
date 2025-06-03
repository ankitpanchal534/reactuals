import { useCallback, useRef, useState } from "react";

type EyeDropperResult = {
  sRGBHex: string;
};

export function useEyeDropper() {
  const [error, setError] = useState<Error | undefined>(undefined);
  const [pickedColor, setPickedColor] = useState<string | null>(null);

  const isSupported = useCallback((): boolean => {
    return typeof window !== "undefined" && !!(window as any).EyeDropper;
  }, []);

  const pickColor = useCallback(async (): Promise<{
    result: EyeDropperResult | null;
    error?: Error;
  }> => {
    if (!isSupported()) {
      const error = new Error(
        "EyeDropper API is not supported in this browser."
      );
      setError(error);
      setPickedColor(null);
      return { result: null, error };
    }
    try {
      const eyeDropper = new (window as any).EyeDropper();
      const result = await eyeDropper.open();
      setPickedColor(result.sRGBHex);
      setError(undefined);
      return { result };
    } catch (error: any) {
      const err = error instanceof Error ? error : new Error(String(error));
      setError(err);
      setPickedColor(null);
      return { result: null, error: err };
    }
  }, [isSupported]);

  const clearError = useCallback(() => setError(undefined), []);

  return {
    pickColor,
    isSupported,
    error,
    clearError,
    pickedColor,
  };
}
