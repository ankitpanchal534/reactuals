import { useEffect } from "react";

/**
 * Updates the document title on mount and when the title changes.
 * @param title - The string to set as document title
 */
export function useDocumentTitle(title: string): void {
  useEffect(() => {
    document.title = title;
  }, [title]);
}
