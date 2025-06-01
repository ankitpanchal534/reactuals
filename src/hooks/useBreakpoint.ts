import { useEffect, useState, useCallback } from "react";

type Breakpoints = { [key: string]: number };

export function useBreakpoint(breakpoints: Breakpoints) {
  const [breakpoint, setBreakpoint] = useState<string>("");

  // Get current breakpoint name
  const getCurrentBreakpoint = useCallback(() => {
    const width = window.innerWidth;
    const bp = Object.entries(breakpoints).find(([_, value]) => width <= value);
    return bp ? bp[0] : "default";
  }, [breakpoints]);

  // Check if current breakpoint matches a given key
  const isBreakpoint = useCallback(
    (key: string) => breakpoint === key,
    [breakpoint]
  );

  // Check if current width is above a given breakpoint
  const isAbove = useCallback(
    (key: string) => window.innerWidth > (breakpoints[key] ?? 0),
    [breakpoints]
  );

  // Check if current width is below a given breakpoint
  const isBelow = useCallback(
    (key: string) => window.innerWidth <= (breakpoints[key] ?? 0),
    [breakpoints]
  );

  useEffect(() => {
    const updateBreakpoint = () => {
      setBreakpoint(getCurrentBreakpoint());
    };

    updateBreakpoint();
    window.addEventListener("resize", updateBreakpoint);
    return () => window.removeEventListener("resize", updateBreakpoint);
  }, [breakpoints, getCurrentBreakpoint]);

  return {
    breakpoint,
    isBreakpoint,
    isAbove,
    isBelow,
    getCurrentBreakpoint,
  };
}
