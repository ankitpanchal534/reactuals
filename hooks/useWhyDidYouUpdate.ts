import { useEffect, useRef } from "react";

/**
 * Logs why a component re-rendered by comparing props.
 *
 * @param name - Component name (for logs)
 * @param props - Props to track
 *
 * Example:
 * useWhyDidYouUpdate("MyComponent", props);
 */
export function useWhyDidYouUpdate<T extends Record<string, any>>(
  name: string,
  props: T
): void {
  const prevProps = useRef<T>(props);

  useEffect(() => {
    const changes: Record<string, { from: any; to: any }> = {};
    Object.keys(props).forEach((key) => {
      if (prevProps.current[key] !== props[key]) {
        changes[key] = { from: prevProps.current[key], to: props[key] };
      }
    });

    if (Object.keys(changes).length > 0) {
      console.log(`[why-did-you-update] ${name}`, changes);
    }

    prevProps.current = props;
  });
}
