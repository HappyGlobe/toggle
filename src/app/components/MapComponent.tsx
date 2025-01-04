import React from 'react';
import dynamic from 'next/dynamic';

// Importamos el componente Map dinámicamente para evitar errores de SSR
const MapComponent = () => {
  // Cargamos los componentes de react-leaflet dinámicamente
  const MapContainer = dynamic(
    () => import('react-leaflet').then((mod) => mod.MapContainer),
    {
      ssr: false, // Esto es necesario porque Leaflet necesita window
    }
  );
  const TileLayer = dynamic(
    () => import('react-leaflet').then((mod) => mod.TileLayer),
    {
      ssr: false,
    }
  );
  const Marker = dynamic(
    () => import('react-leaflet').then((mod) => mod.Marker),
    {
      ssr: false,
    }
  );
  const Popup = dynamic(
    () => import('react-leaflet').then((mod) => mod.Popup),
    {
      ssr: false,
    }
  );

  return (
    <div className="w-full h-96">
      {typeof window !== 'undefined' && (
        <MapContainer
          center={[40.416775, -3.703790]} // Coordenadas de Madrid
          zoom={13}
          className="w-full h-full"
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker position={[40.416775, -3.703790]}>
            <Popup>
              Madrid, España
            </Popup>
          </Marker>
        </MapContainer>
      )}
    </div>
  );
};

export default MapComponent;