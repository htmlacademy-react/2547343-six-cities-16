import leaflet from 'leaflet';
import { Map } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useRef, useState, useEffect } from 'react';
import { MapDataType } from '../types';

// type UseMapProps = {
//   mapRef: React.MutableRefObject<null>;
//   city: MapDataType;
// }

function useMap(mapRef: React.MutableRefObject<null>, city: MapDataType): Map | null {

  const [map, setMap] = useState<Map | null>(null);
  const isRenderedRef = useRef<boolean>(false);

  useEffect(() => {

    if (mapRef.current !== null && !isRenderedRef.current && city.lat && city.lng) {
      const instance = leaflet.map(mapRef.current, {
        center: {
          lat: city.lat,
          lng: city.lng,
        },
        zoom: city.zoom || 10,
      });

      leaflet
        .tileLayer(
          'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
          // 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
          {
            attribution: '&amp;copy; &lt;a href="https://www.openstreetmap.org/copyright"&gt;OpenStreetMap&lt;/a&gt; contributors',
            // attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
          },
        )
        .addTo(instance);

      setMap(instance);
      isRenderedRef.current = true;

    }


  }, [mapRef, city]);

  return map;
}

export default useMap;
