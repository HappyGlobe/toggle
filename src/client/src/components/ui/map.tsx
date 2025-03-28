import React, { useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import tinycolor from 'tinycolor2';
import 'mapbox-gl/dist/mapbox-gl.css';

mapboxgl.accessToken = 'pk.eyJ1IjoibWFhamVudGEiLCJhIjoiY201cHdtcnFrMDV2OTJxcTEzZmt6eGQxNCJ9.R6XcC-4W1-uPX9MabJkE9g';

interface StatsMapProps {
  style?: React.CSSProperties;
  viewMode?: 'countries' | 'regions';
}

const StatsMap: React.FC<StatsMapProps> = ({ style }) => {
   useEffect(() => {
    const generateHappinessScore = () => Math.floor(Math.random() * 101);

    const getColorFromHappinessScore = (score: number) => {
      const startR = 0, startG = 145, startB = 255;
      const endR = 255, endG = 137, endB = 241;
      const percent = score / 100;
      const r = Math.floor(startR + (endR - startR) * percent);
      const g = Math.floor(startG + (endG - startG) * percent);
      const b = Math.floor(startB + (endB - startB) * percent);
      return `rgb(${r},${g},${b})`;
    };

    const map = new mapboxgl.Map({
      container: 'map',
      style: {
        version: 8,
        sources: {
          countries: {
            type: 'vector',
            url: 'mapbox://mapbox.country-boundaries-v1',
          },
        },
        layers: [
          {
            id: 'background',
            type: 'background',
            paint: {
              'background-color': '#bbfbf6',
            },
          },
          {
            id: 'country-fills',
            type: 'fill',
            source: 'countries',
            'source-layer': 'country_boundaries',
            paint: {
              'fill-color': '#f8f8f8',
            },
          },
          {
            id: 'country-boundaries',
            type: 'line',
            source: 'countries',
            'source-layer': 'country_boundaries',
            paint: {
              'line-color': '#808080',
              'line-width': [
                'interpolate',
                ['linear'],
                ['zoom'],
                0, 0,
                4, 0,
                8, 0,
              ],
            },
          },
        ],
      },
      center: [0, 20],
      zoom: 1.5,
      minZoom: 1.5,
      dragRotate: false, 
    });

    map.addControl(new mapboxgl.NavigationControl());

    const popup = new mapboxgl.Popup({
      closeButton: false,
      closeOnClick: false,
    });

    map.on('load', () => {
      const countryData: Record<string, { happiness: number; color: string }> = {};

      const features = map.querySourceFeatures('countries', {
        sourceLayer: 'country_boundaries',
      });

      features.forEach((feature) => {
        const countryCode = feature.properties?.iso_3166_1;
        if (countryCode && !countryData[countryCode]) {
          const happiness = generateHappinessScore();
          countryData[countryCode] = {
            happiness,
            color: getColorFromHappinessScore(happiness),
          };
        }
      });

      map.setPaintProperty('country-fills', 'fill-color', [
        'match',
        ['get', 'iso_3166_1'],
        ...Object.entries(countryData).flatMap(([code, data]) => [code, data.color]),
        '#f8f8f8',
      ]);

      map.on('mousemove', 'country-fills', (e) => {
        if (e.features && e.features.length > 0) {
          const feature = e.features[0];
          const countryCode = feature.properties?.iso_3166_1;
          const countryName = feature.properties?.name_en;

          if (countryCode && countryData[countryCode]) {
            const { happiness, color } = countryData[countryCode];

            const popupContent = document.createElement('div');
            popupContent.innerHTML = `<strong>${countryName}</strong><br>Happiness: ${happiness}`;

            popup
              .setLngLat(e.lngLat)
              .setDOMContent(popupContent)
              .addTo(map);

            const popupElement = popup.getElement();
            const content = popupElement.querySelector('.mapboxgl-popup-content');
            if (content) {
              content.style.backgroundColor = tinycolor(color).brighten(20).toString();
            }
          }
        }
      });

      map.on('mouseleave', 'country-fills', () => {
        popup.remove();
      });

      console.log('Map loaded successfully');
    });

    return () => {
      map.remove();
    };
  }, []);

  return <div id="map" style={{  width: '90%',height: '70vh', margin: '0 auto'}} className='rounded-lg shadow p-6'></div>;
};

export default StatsMap;
