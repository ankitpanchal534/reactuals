import { useCallback, useEffect, useState } from "react";

export function useColorScheme() {
  const getPreferredScheme = () => {
    const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    return isDark ? "dark" : "light";
  };

  const [scheme, setScheme] = useState<"light" | "dark">(() => {
    const preferred = getPreferredScheme();
    document.documentElement.setAttribute("data-theme", preferred);
    return preferred;
  });

  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const listener = () => setScheme(media.matches ? "dark" : "light");
    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, []);

  const toggleScheme = useCallback(() => {
    const newScheme = scheme === "dark" ? "light" : "dark";
    setScheme(newScheme);
    document.documentElement.setAttribute("data-theme", newScheme);
  }, [scheme]);

  const setColorScheme = useCallback((newScheme: "light" | "dark") => {
    setScheme(newScheme);
    document.documentElement.setAttribute("data-theme", newScheme);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", scheme);
  }, [scheme]);

  return { scheme, toggleScheme, setScheme: setColorScheme };
}
