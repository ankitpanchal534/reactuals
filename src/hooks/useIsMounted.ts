import { useEffect, useRef } from "react";

/**
 * Returns a ref that tells whether the component is mounted.
 */
export function useIsMounted(): () => boolean {
  const isMounted = useRef(false);

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  return () => isMounted.current;
}
