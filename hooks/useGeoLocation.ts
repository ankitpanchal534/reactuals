import { useState, useEffect } from "react";

export interface GeoLocationState {
  latitude: number | null;
  longitude: number | null;
  error: GeolocationPositionError | null;
}

export function useGeoLocation(
  options: PositionOptions = {}
): GeoLocationState {
  const [location, setLocation] = useState<GeoLocationState>({
    latitude: null,
    longitude: null,
    error: null,
  });

  useEffect(() => {
    if (!navigator.geolocation) {
      setLocation({
        latitude: null,
        longitude: null,
        error: new GeolocationPositionError(),
      });
      return;
    }

    const success = (position: GeolocationPosition) => {
      setLocation({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        error: null,
      });
    };

    const error = (err: GeolocationPositionError) => {
      setLocation({ latitude: null, longitude: null, error: err });
    };

    const watchId = navigator.geolocation.watchPosition(success, error, {
      enableHighAccuracy: false,
      timeout: 10000,
      maximumAge: 60000,
      ...options,
    });

    return () => navigator.geolocation.clearWatch(watchId);
  }, [options]);

  return location;
}
