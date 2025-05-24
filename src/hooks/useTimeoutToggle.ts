import { useEffect, useState } from "react";

/**
 * Temporarily sets a boolean to true, then false after duration.
 *
 * Example:
 * const [active, trigger] = useTimeoutToggle(2000);
 * return <button onClick={trigger}>{active ? "ON" : "OFF"}</button>;
 */
export function useTimeoutToggle(duration = 1000): [boolean, () => void] {
  const [active, setActive] = useState(false);

  const trigger = () => {
    setActive(true);
    setTimeout(() => setActive(false), duration);
  };

  return [active, trigger];
}
