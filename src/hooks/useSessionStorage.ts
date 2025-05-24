import { useState } from "react";

/**
 * A hook that synchronizes state with sessionStorage.
 *
 * Example:
 * const [sessionData, setSessionData] = useSessionStorage("data", {});
 */
export function useSessionStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T) => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.sessionStorage.getItem(key);
      return item ? (JSON.parse(item) as T) : initialValue;
    } catch (error) {
      console.warn(error);
      return initialValue;
    }
  });

  const setValue = (value: T) => {
    try {
      setStoredValue(value);
      window.sessionStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.warn(error);
    }
  };

  return [storedValue, setValue];
}
