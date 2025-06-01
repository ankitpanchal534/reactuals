import { useEffect, useState } from "react";

type DeviceType = "mobile" | "tablet" | "desktop";

function getDeviceType(width: number): DeviceType {
  if (width < 768) return "mobile";
  if (width < 1024) return "tablet";
  return "desktop";
}

export function useDeviceType() {
  const [deviceType, setDeviceType] = useState<DeviceType>(
    getDeviceType(window.innerWidth)
  );

  useEffect(() => {
    const handleResize = () => {
      setDeviceType(getDeviceType(window.innerWidth));
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return {
    deviceType,
    isTab: deviceType === "tablet",
    isMobile: deviceType === "mobile",
    isDesktop: deviceType === "desktop",
  };
}
