import { useState, useEffect, useCallback } from "react";

export function useWindowFocus() {
  const [isFocused, setIsFocused] = useState<boolean>(document.hasFocus());
  const [isVisible, setIsVisible] = useState<boolean>(!document.hidden);

  const handleFocus = useCallback(() => setIsFocused(true), []);
  const handleBlur = useCallback(() => setIsFocused(false), []);
  const handleVisibilityChange = useCallback(
    () => setIsVisible(!document.hidden),
    []
  );

  useEffect(() => {
    window.addEventListener("focus", handleFocus);
    window.addEventListener("blur", handleBlur);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      window.removeEventListener("focus", handleFocus);
      window.removeEventListener("blur", handleBlur);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [handleFocus, handleBlur, handleVisibilityChange]);

  return {
    isFocused,
    isVisible,
  };
}
