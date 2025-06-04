import { useEffect, useState } from "react";

export type InputDeviceType = "mouse" | "touch" | "keyboard" | "unknown";

export function useInputDevice(): InputDeviceType {
  const [deviceType, setDeviceType] = useState<InputDeviceType>("unknown");

  useEffect(() => {
    const handlePointerDown = (e: PointerEvent) => {
      if (e.pointerType === "mouse") {
        setDeviceType("mouse");
      } else if (e.pointerType === "touch") {
        setDeviceType("touch");
      }
    };

    const handleKeyDown = () => {
      setDeviceType("keyboard");
    };

    window.addEventListener("pointerdown", handlePointerDown);
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return deviceType;
}
