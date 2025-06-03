import { useRef, useEffect, useCallback } from "react";

export function useElementFocus<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const focusOnMount = useRef(false);

  const focus = useCallback(() => {
    ref.current?.focus();
  }, []);

  const blur = useCallback(() => {
    ref.current?.blur();
  }, []);

  const select = useCallback(() => {
    if ("select" in (ref.current || {})) {
      (
        ref.current as unknown as HTMLInputElement | HTMLTextAreaElement
      ).select?.();
    }
  }, []);

  const scrollIntoView = useCallback((options?: ScrollIntoViewOptions) => {
    ref.current?.scrollIntoView(options);
  }, []);

  useEffect(() => {
    if (focusOnMount.current) {
      ref.current?.focus();
    }
  }, []);

  return {
    ref,
    focusOnMount, // Set focusOnMount.current = true before mount to focus on mount
    focus,
    blur,
    select,
    scrollIntoView,
  } as const;
}
