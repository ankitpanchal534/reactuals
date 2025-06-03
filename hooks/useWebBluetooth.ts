import { useCallback, useState } from "react";

// Type definitions for Web Bluetooth API
// Minimal BluetoothDevice type definition for TypeScript environments without DOM lib
type BluetoothDevice = {
  id: string;
  name?: string;
  gatt?: {
    connected: boolean;
    disconnect(): void;
  };
};

type BluetoothDeviceType = BluetoothDevice & {
  gatt?: {
    connected: boolean;
    disconnect(): void;
  };
};

interface RequestDeviceOptions {
  filters?: Array<{
    services?: string[];
    name?: string;
    namePrefix?: string;
  }>;
  optionalServices?: string[];
  acceptAllDevices?: boolean;
}

export function useWebBluetooth(): {
  connect: (
    options: RequestDeviceOptions
  ) => Promise<BluetoothDeviceType | null>;
  disconnect: () => void;
  device: BluetoothDeviceType | null;
  isSupported: boolean;
  error: Error | null;
} {
  const [state, setState] = useState<{
    device: BluetoothDeviceType | null;
    error: Error | null;
  }>({ device: null, error: null });
  const isSupported =
    typeof navigator !== "undefined" &&
    "bluetooth" in navigator &&
    !!navigator?.bluetooth;

  const connect = useCallback(
    async (
      options: RequestDeviceOptions
    ): Promise<BluetoothDeviceType | null> => {
      if (!isSupported) {
        setState((prev) => ({
          ...prev,
          error: new Error("Web Bluetooth API not supported"),
        }));
        return null;
      }

      // Check if already connected
      if (state.device && state.device.gatt?.connected) {
        return state.device;
      }

      try {
        const device = await (navigator as any).bluetooth.requestDevice(
          options
        );
        setState((prev) => ({ ...prev, device, error: null }));
        return device;
      } catch (err) {
        const error =
          err instanceof Error
            ? err
            : new Error("Failed to connect to Bluetooth device");
        setState((prev) => ({ ...prev, device: null, error }));
        return null;
      }
    },
    [isSupported, state.device]
  );

  const disconnect = useCallback(() => {
    setState((prev) => {
      if (prev.device && prev.device.gatt?.connected) {
        prev.device.gatt.disconnect();
      }
      return { device: null, error: null };
    });
  }, []);

  return {
    connect,
    disconnect,
    device: state.device,
    isSupported,
    error: state.error,
  };
}
