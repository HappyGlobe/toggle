import React from 'react';
import { useGeocoding } from "@/lib/getRegionNames";

export default function LocationComponent() {
  const { getLocationInfo, locationInfo, loading, error } = useGeocoding();

  const handleGetLocation = () => {
    // Example: Madrid coordinates
    getLocationInfo(40.4168, -3.7038);
  };

  return (
    <div className="p-4">
      <button 
        onClick={handleGetLocation}
        disabled={loading}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? 'Cargando...' : 'Obtener ubicación'}
      </button>

      {error && (
        <div className="mt-4 text-red-500">
          Error: {error instanceof Error ? error.message : 'Error desconocido'}
        </div>
      )}

      {locationInfo && (
        <div className="mt-4">
          <h3 className="text-xl font-semibold mb-2">Información de ubicación:</h3>
          <div className="space-y-2">
            <p>País: {locationInfo.country} ({locationInfo.countryCode})</p>
            <p>Estado/Provincia: {locationInfo.state}</p>
            <p>Dirección completa: {locationInfo.formattedAddress}</p>
          </div>
        </div>
      )}
    </div>
  );
}