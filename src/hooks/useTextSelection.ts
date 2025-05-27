import { useState, useEffect, useRef } from "react";

export interface TextSelection {
  text: string;
  range: Range | null;
}

export function useTextSelection(
  elementRef?: React.RefObject<HTMLElement>
): TextSelection {
  const [selection, setSelection] = useState<TextSelection>({
    text: "",
    range: null,
  });
  const latestSelection = useRef<TextSelection>({ text: "", range: null });

  useEffect(() => {
    const handleSelectionChange = () => {
      const sel = window.getSelection();
      if (!sel || sel.rangeCount === 0) {
        latestSelection.current = { text: "", range: null };
        setSelection(latestSelection.current);
        return;
      }

      const range = sel.getRangeAt(0);
      const target = elementRef?.current;
      const isWithinElement = target
        ? range.commonAncestorContainer === target ||
          target.contains(range.commonAncestorContainer)
        : true;

      if (isWithinElement) {
        const text = sel.toString();
        latestSelection.current = { text, range: range.cloneRange() };
      } else {
        latestSelection.current = { text: "", range: null };
      }
      setSelection(latestSelection.current);
    };

    document.addEventListener("selectionchange", handleSelectionChange);
    return () =>
      document.removeEventListener("selectionchange", handleSelectionChange);
  }, [elementRef]);

  return selection;
}
