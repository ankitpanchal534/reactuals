import { useCallback, useEffect, useState } from "react";

export function useFullscreen(ref: React.RefObject<HTMLElement>) {
  const [isFullscreen, setIsFullscreen] = useState(false);

  const enter = useCallback(() => {
    if (ref.current?.requestFullscreen) {
      ref.current.requestFullscreen().catch(console.error);
    }
  }, [ref]);

  const exit = useCallback(() => {
    if (document.exitFullscreen) {
      document.exitFullscreen().catch(console.error);
    }
  }, []);

  useEffect(() => {
    const handler = () =>
      setIsFullscreen(document.fullscreenElement === ref.current);
    document.addEventListener("fullscreenchange", handler);
    return () => document.removeEventListener("fullscreenchange", handler);
  }, [ref]);

  return { isFullscreen, enter, exit };
}
