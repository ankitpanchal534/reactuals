import { useEffect, useState } from "react";

/**
 * Tracks the state of a media query.
 * @param query - The media query string.
 * @returns A boolean indicating if the query matches.
 *
 * Example:
 * const isLargeScreen = useMediaQuery("(min-width: 1024px)");
 * if (isLargeScreen) console.log("Large screen");
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(
    () => window.matchMedia(query).matches
  );

  useEffect(() => {
    const mediaQueryList = window.matchMedia(query);
    const listener = (event: MediaQueryListEvent) => setMatches(event.matches);
    mediaQueryList.addEventListener("change", listener);
    return () => mediaQueryList.removeEventListener("change", listener);
  }, [query]);

  return matches;
}
