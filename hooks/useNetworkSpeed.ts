import { useState, useEffect } from "react";

export interface NetworkSpeed {
  effectiveType: string | null; // e.g., "4g", "3g", "slow-2g"
  downlinkMbps: number | null; // Downlink speed in Mbps
}

export function useNetworkSpeed(): NetworkSpeed {
  const [networkSpeed, setNetworkSpeed] = useState<NetworkSpeed>({
    effectiveType: null,
    downlinkMbps: null,
  });

  useEffect(() => {
    const updateNetworkInfo = () => {
      const connection =
        (navigator as any).connection ||
        (navigator as any).mozConnection ||
        (navigator as any).webkitConnection;
      if (connection) {
        setNetworkSpeed({
          effectiveType: connection.effectiveType || null,
          downlinkMbps: connection.downlink || null,
        });
      }
    };

    updateNetworkInfo();

    if ((navigator as any).connection) {
      (navigator as any).connection.addEventListener(
        "change",
        updateNetworkInfo
      );
      return () =>
        (navigator as any).connection.removeEventListener(
          "change",
          updateNetworkInfo
        );
    }
  }, []);

  return networkSpeed;
}
