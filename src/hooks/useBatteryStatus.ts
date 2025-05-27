import { useState, useEffect } from "react";

export interface BatteryState {
  level: number | null; // Battery level (0 to 1)
  charging: boolean | null; // Whether the device is charging
}

export function useBatteryStatus(): BatteryState {
  const [batteryState, setBatteryState] = useState<BatteryState>({
    level: null,
    charging: null,
  });

  useEffect(() => {
    let isMounted = true;

    const updateBattery = (battery: any) => {
      if (isMounted) {
        setBatteryState({
          level: battery.level !== null ? battery.level : null,
          charging: battery.charging !== null ? battery.charging : null,
        });
      }
    };

    if ("getBattery" in navigator) {
      (navigator as any).getBattery().then((battery: any) => {
        updateBattery(battery);
        battery.addEventListener("levelchange", () => updateBattery(battery));
        battery.addEventListener("chargingchange", () =>
          updateBattery(battery)
        );
      });

      return () => {
        isMounted = false;
      };
    }
  }, []);

  return batteryState;
}
