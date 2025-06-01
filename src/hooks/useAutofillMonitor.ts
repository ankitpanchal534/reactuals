import { useEffect, useState } from "react";

export function useAutofillMonitor<
  T extends HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
>(ref: React.RefObject<T>): { name: string; value: string } | null {
  const [autofillData, setAutofillData] = useState<{
    name: string;
    value: string;
  } | null>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleAnimationStart = (e: Event) => {
      const animEvent = e as AnimationEvent;
      if (
        animEvent.animationName === "autofill" &&
        element.name &&
        element.value
      ) {
        setAutofillData({ name: element.name, value: element.value });
      }
    };

    element.addEventListener("animationstart", handleAnimationStart);
    return () =>
      element.removeEventListener("animationstart", handleAnimationStart);
  }, [ref]);

  return autofillData;
}
