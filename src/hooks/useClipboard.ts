import { useState } from "react";

/**
 * Provides clipboard copy functionality.
 */
export function useClipboard(): [(text: string) => void, boolean] {
  const [copied, setCopied] = useState(false);

  const copy = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return [copy, copied];
}
