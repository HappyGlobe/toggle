import { useState } from 'react';

interface LocationInfo {
  country: string;
  state: string;
  countryCode: string;
  formattedAddress: string;
}

export const useGeocoding = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [locationInfo, setLocationInfo] = useState<LocationInfo | null>(null);

  const getLocationInfo = (latitude: number, longitude: number): Promise<LocationInfo> => {
    return new Promise((resolve, reject) => {
      setLoading(true);
      setError(null);

      fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`,
        {
          headers: {
            'Accept': 'application/json',
            'User-Agent': 'Toggle/1.0'
          }
        }
      )
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        })
        .then(data => {
          const locationInfo: LocationInfo = {
            country: data.address.country || '',
            state: data.address.state || data.address.county || '',
            countryCode: data.address.country_code?.toUpperCase() || '',
            formattedAddress: data.display_name || ''
          };
          setLocationInfo(locationInfo);
          resolve(locationInfo);
        })
        .catch(err => {
          const error = err instanceof Error ? err : new Error('An unknown error occurred');
          setError(error);
          reject(error);
        })
        .finally(() => {
          setLoading(false);
        });
    });
  };

  return {
    getLocationInfo,
    locationInfo,
    loading,
    error
  };
};