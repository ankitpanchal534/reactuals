import { useEffect } from "react";

/**
 * Dynamically sets the favicon.
 *
 * Example:
 * useFavicon("/logo-dark.ico");
 */
export function useFavicon(href: string): void {
  useEffect(() => {
    let link = document.querySelector("link[rel~='icon']") as HTMLLinkElement;
    if (!link) {
      link = document.createElement("link");
      link.rel = "icon";
      document.head.appendChild(link);
    }
    link.href = href;
  }, [href]);
}
