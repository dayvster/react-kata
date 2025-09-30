import { useEffect, useState } from 'react';

/**
 * useGeolocation - Tracks the user's geolocation (latitude, longitude, etc.)
 * @returns { position, error, loading }
 */
export function useGeolocation(options?: PositionOptions) {
  const [position, setPosition] = useState<GeolocationPosition | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported');
      setLoading(false);
      return;
    }
    const success = (pos: GeolocationPosition) => {
      setPosition(pos);
      setError(null);
      setLoading(false);
    };
    const fail = (err: GeolocationPositionError) => {
      setError(err.message);
      setLoading(false);
    };
    navigator.geolocation.getCurrentPosition(success, fail, options);
  }, [options]);

  return { position, error, loading };
}
